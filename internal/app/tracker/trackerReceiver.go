package tracker

import (
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

type Receiver struct {
	address  string
	Callback func(*TrackerWrapperPacket)
	conn     *net.UDPConn
}

// NewReceiver creates a new receiver
func NewReceiver(address string) (v *Receiver) {
	v = new(Receiver)
	v.address = address
	v.Callback = func(*TrackerWrapperPacket) {}
	return
}

// Start starts the receiver
func (v *Receiver) Start() {
	addr, err := net.ResolveUDPAddr("udp", v.address)
	if err != nil {
		log.Print(err)
		return
	}
	conn, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		log.Print(err)
		return
	}

	if err := conn.SetReadBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set read buffer to %v.", maxDatagramSize)
	}
	log.Println("Receiving vision from", v.address)

	v.conn = conn
	go v.receive()
}

// Stop stops the receiver
func (v *Receiver) Stop() {
	if err := v.conn.Close(); err != nil {
		log.Printf("Could not close vision receiver: %v", err)
	}
}

func (v *Receiver) receive() {
	b := make([]byte, maxDatagramSize)
	for {
		n, err := v.conn.Read(b)
		if err != nil {
			log.Print("Could not read", err)
			time.Sleep(1 * time.Second)
			continue
		}
		if n >= maxDatagramSize {
			log.Fatal("Buffer size too small")
		}
		wrapper := TrackerWrapperPacket{}
		if err := proto.Unmarshal(b[0:n], &wrapper); err != nil {
			log.Println("Could not unmarshal referee message")
			continue
		}

		v.Callback(&wrapper)
	}
}
