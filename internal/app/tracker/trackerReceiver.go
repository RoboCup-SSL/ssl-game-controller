package tracker

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/sslnet"
	"google.golang.org/protobuf/proto"
	"log"
	"sync"
)

type Receiver struct {
	address         string
	Callback        func(*TrackerWrapperPacket)
	mutex           sync.Mutex
	MulticastServer *sslnet.MulticastServer
}

// NewReceiver creates a new receiver
func NewReceiver(address string) (v *Receiver) {
	v = new(Receiver)
	v.address = address
	v.Callback = func(*TrackerWrapperPacket) {}
	v.MulticastServer = sslnet.NewMulticastServer(v.consumeData)
	return
}

// Start starts the receiver
func (v *Receiver) Start() {
	v.MulticastServer.Start(v.address)
}

// Stop stops the receiver
func (v *Receiver) Stop() {
	v.MulticastServer.Stop()
}

func (v *Receiver) consumeData(data []byte) {
	v.mutex.Lock()
	defer v.mutex.Unlock()

	wrapper := TrackerWrapperPacket{}
	if err := proto.Unmarshal(data, &wrapper); err != nil {
		log.Println("Could not unmarshal referee message")
		return
	}

	v.Callback(&wrapper)
}
