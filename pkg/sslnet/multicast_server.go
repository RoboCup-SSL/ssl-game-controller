package sslnet

import (
	"log"
	"net"
	"net/netip"
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
	var badIfis []string
	for r.isRunning() {
		ifis := r.interfaces(badIfis)
		if len(ifis) == 0 {
			log.Println("No valid interfaces found to listen on")
			return
		}
		currentIfiIdx = currentIfiIdx % len(ifis)
		ifi := ifis[currentIfiIdx]
		badIfi := r.receiveOnInterface(multicastAddress, ifi)
		if badIfi {
			badIfis = append(badIfis, ifi.Name)
		}

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

func (r *MulticastServer) interfaces(ignoreIfis []string) (interfaces []net.Interface) {
	interfaces = []net.Interface{}
	ifis, err := net.Interfaces()
	if err != nil {
		log.Println("Could not get available interfaces: ", err)
	}
	for _, ifi := range ifis {
		if ifi.Flags&net.FlagMulticast == 0 || // No multicast support
			ifi.Flags&net.FlagUp == 0 || // Not up
			ifi.Flags&net.FlagRunning == 0 || // Not running
			r.skipInterface(r.SkipInterfaces, ifi.Name) ||
			r.skipInterface(ignoreIfis, ifi.Name) ||
			isInvalidInterface(&ifi) {
			continue
		}
		interfaces = append(interfaces, ifi)
	}
	return
}

func isInvalidInterface(ifi *net.Interface) bool {
	addrs, err := ifi.Addrs()
	if err != nil {
		log.Printf("Could not get addresses of interface %v: %v", ifi, err)
		return false
	}
	for _, addr := range addrs {
		ipNet := addr.(*net.IPNet)
		ip := netip.MustParseAddr(ipNet.IP.String())
		if ip.Is4() {
			return false
		}
	}
	return true
}

func (r *MulticastServer) skipInterface(ifis []string, ifiName string) bool {
	for _, skipIfi := range ifis {
		if skipIfi == ifiName {
			return true
		}
	}
	return false
}

func (r *MulticastServer) receiveOnInterface(multicastAddress string, ifi net.Interface) (badIfi bool) {
	badIfi = false

	addr, err := net.ResolveUDPAddr("udp", multicastAddress)
	if err != nil {
		log.Printf("Could resolve multicast address %v: %v", multicastAddress, err)
		badIfi = true
		return
	}

	r.connection, err = net.ListenMulticastUDP("udp", &ifi, addr)
	if err != nil {
		log.Printf("Could not listen at %v (%v): %v", multicastAddress, ifi.Name, err)
		badIfi = true
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
			badIfi = true
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
		badIfi = true
		log.Println("Could not close listener: ", err)
	}
	return
}
