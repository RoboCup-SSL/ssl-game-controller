package sslnet

import (
	"log"
	"net"
	"sync"
	"time"
)

const maxDatagramSize = 8192

type MulticastServer struct {
	connection     *net.UDPConn
	running        bool
	consumer       func([]byte)
	mutex          sync.Mutex
	SkipInterfaces []string
	Verbose        bool
}

func NewMulticastServer(consumer func([]byte)) (r *MulticastServer) {
	r = new(MulticastServer)
	r.consumer = consumer
	return
}

func (r *MulticastServer) Start(multicastAddress string) {
	r.running = true
	go r.receive(multicastAddress)
}

func (r *MulticastServer) Stop() {
	r.mutex.Lock()
	defer r.mutex.Unlock()
	r.running = false
	if err := r.connection.Close(); err != nil {
		log.Println("Could not close connection: ", err)
	}
}

func (r *MulticastServer) receive(multicastAddress string) {
	var currentIfiIdx = 0
	for r.isRunning() {
		ifis := r.interfaces()
		currentIfiIdx = currentIfiIdx % len(ifis)
		ifi := ifis[currentIfiIdx]
		r.receiveOnInterface(multicastAddress, ifi)
		currentIfiIdx++
		if currentIfiIdx >= len(ifis) {
			// cycled though all interfaces once, make a short break to avoid producing endless log messages
			time.Sleep(1 * time.Second)
		}
	}
}

func (r *MulticastServer) isRunning() bool {
	r.mutex.Lock()
	defer r.mutex.Unlock()
	return r.running
}

func (r *MulticastServer) interfaces() (interfaces []net.Interface) {
	interfaces = []net.Interface{}
	ifis, err := net.Interfaces()
	if err != nil {
		log.Println("Could not get available interfaces: ", err)
	}
	for _, ifi := range ifis {
		if ifi.Flags&net.FlagMulticast == 0 || // No multicast support
			r.skipInterface(ifi.Name) {
			continue
		}
		interfaces = append(interfaces, ifi)
	}
	return
}

func (r *MulticastServer) skipInterface(ifiName string) bool {
	for _, skipIfi := range r.SkipInterfaces {
		if skipIfi == ifiName {
			return true
		}
	}
	return false
}

func (r *MulticastServer) receiveOnInterface(multicastAddress string, ifi net.Interface) {
	addr, err := net.ResolveUDPAddr("udp", multicastAddress)
	if err != nil {
		log.Printf("Could resolve multicast address %v: %v", multicastAddress, err)
		return
	}

	r.connection, err = net.ListenMulticastUDP("udp", &ifi, addr)
	if err != nil {
		log.Printf("Could not listen at %v: %v", multicastAddress, err)
		return
	}

	if err := r.connection.SetReadBuffer(maxDatagramSize); err != nil {
		log.Println("Could not set read buffer: ", err)
	}

	if r.Verbose {
		log.Printf("Listening on %s (%s)", multicastAddress, ifi.Name)
	}

	first := true
	data := make([]byte, maxDatagramSize)
	for {
		if err := r.connection.SetDeadline(time.Now().Add(300 * time.Millisecond)); err != nil {
			log.Println("Could not set deadline on connection: ", err)
		}
		n, _, err := r.connection.ReadFromUDP(data)
		if err != nil {
			if r.Verbose {
				log.Println("ReadFromUDP failed:", err)
			}
			break
		}

		if first && r.Verbose {
			log.Printf("Got first data packets from %s (%s)", multicastAddress, ifi.Name)
			first = false
		}

		r.consumer(data[:n])
	}

	if r.Verbose {
		log.Printf("Stop listening on %s (%s)", multicastAddress, ifi.Name)
	}

	if err := r.connection.Close(); err != nil {
		log.Println("Could not close listener: ", err)
	}
	return
}
