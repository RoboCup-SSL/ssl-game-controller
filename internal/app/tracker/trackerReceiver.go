package tracker

import (
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslnet"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
	"sync"
)

type Receiver struct {
	Callback        func(*TrackerWrapperPacket)
	mutex           sync.Mutex
	MulticastServer *sslnet.MulticastServer
}

// NewReceiver creates a new receiver
func NewReceiver(address string) (v *Receiver) {
	v = new(Receiver)
	v.Callback = func(*TrackerWrapperPacket) {
		// noop by default
	}
	v.MulticastServer = sslnet.NewMulticastServer(address)
	v.MulticastServer.Consumer = v.consumeData
	return
}

// Start starts the receiver
func (v *Receiver) Start() {
	v.MulticastServer.Start()
}

// Stop stops the receiver
func (v *Receiver) Stop() {
	v.MulticastServer.Stop()
}

func (v *Receiver) consumeData(data []byte, _ *net.UDPAddr) {
	v.mutex.Lock()
	defer v.mutex.Unlock()

	wrapper := TrackerWrapperPacket{}
	if err := proto.Unmarshal(data, &wrapper); err != nil {
		log.Println("Could not unmarshal referee message")
		return
	}

	v.Callback(&wrapper)
}
