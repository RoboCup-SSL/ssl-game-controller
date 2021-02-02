package sslnet

import (
	"log"
	"net"
	"sync"
	"time"
)

const maxDatagramSize = 8192

type MulticastReceiver struct {
	activeIfis     map[string]bool
	connections    []*net.UDPConn
	running        bool
	consumer       func([]byte)
	mutex          sync.Mutex
	SkipInterfaces []string
}

func NewMulticastReceiver(consumer func([]byte)) (r *MulticastReceiver) {
	r = new(MulticastReceiver)
	r.activeIfis = map[string]bool{}
	r.consumer = consumer
	return
}

func (r *MulticastReceiver) Start(multicastAddress string) {
	r.running = true
	go r.receive(multicastAddress)
}

func (r *MulticastReceiver) Stop() {
	r.mutex.Lock()
	defer r.mutex.Unlock()
	r.running = false
	for _, c := range r.connections {
		if err := c.Close(); err != nil {
			log.Println("Could not close connection: ", err)
		}
	}
}

func (r *MulticastReceiver) receive(multicastAddress string) {
	for r.isRunning() {
		ifis, _ := net.Interfaces()
		for _, ifi := range ifis {
			if ifi.Flags&net.FlagMulticast == 0 || // No multicast support
				r.skipInterface(ifi.Name) {
				continue
			}
			r.mutex.Lock()
			if _, ok := r.activeIfis[ifi.Name]; !ok {
				// interface not active, (re-)start receiving
				go r.receiveOnInterface(multicastAddress, ifi)
			}
			r.mutex.Unlock()
		}
		time.Sleep(1 * time.Second)
	}
}

func (r *MulticastReceiver) isRunning() bool {
	r.mutex.Lock()
	defer r.mutex.Unlock()
	return r.running
}

func (r *MulticastReceiver) skipInterface(ifiName string) bool {
	for _, skipIfi := range r.SkipInterfaces {
		if skipIfi == ifiName {
			return true
		}
	}
	return false
}

func (r *MulticastReceiver) receiveOnInterface(multicastAddress string, ifi net.Interface) {
	addr, err := net.ResolveUDPAddr("udp", multicastAddress)
	if err != nil {
		log.Printf("Could resolve multicast address %v: %v", multicastAddress, err)
		return
	}

	listener, err := net.ListenMulticastUDP("udp", &ifi, addr)
	if err != nil {
		log.Printf("Could not listen at %v: %v", multicastAddress, err)
		return
	}

	if err := listener.SetReadBuffer(maxDatagramSize); err != nil {
		log.Println("Could not set read buffer: ", err)
	}

	r.mutex.Lock()
	r.connections = append(r.connections, listener)
	r.activeIfis[ifi.Name] = true
	r.mutex.Unlock()

	log.Printf("Listening on %s (%s)", multicastAddress, ifi.Name)

	data := make([]byte, maxDatagramSize)
	for {
		n, _, err := listener.ReadFrom(data)
		if err != nil {
			log.Println("ReadFromUDP failed:", err)
			break
		}

		r.consumer(data[:n])
	}

	log.Printf("Stop listening on %s (%s)", multicastAddress, ifi.Name)

	if err := listener.Close(); err != nil {
		log.Println("Could not close listener: ", err)
	}
	r.mutex.Lock()
	delete(r.activeIfis, ifi.Name)
	for i, c := range r.connections {
		if c == listener {
			r.connections = append(r.connections[:i], r.connections[i+1:]...)
		}
	}
	r.mutex.Unlock()
}
