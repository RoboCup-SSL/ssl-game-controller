package tracker

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/sslnet"
	"github.com/golang/protobuf/proto"
	"log"
	"sync"
)

type Receiver struct {
	address           string
	Callback          func(*TrackerWrapperPacket)
	mutex             sync.Mutex
	MulticastReceiver *sslnet.MulticastReceiver
}

// NewReceiver creates a new receiver
func NewReceiver(address string) (v *Receiver) {
	v = new(Receiver)
	v.address = address
	v.Callback = func(*TrackerWrapperPacket) {}
	v.MulticastReceiver = sslnet.NewMulticastReceiver(v.consumeData)
	return
}

// Start starts the receiver
func (v *Receiver) Start() {
	v.MulticastReceiver.Start(v.address)
}

// Stop stops the receiver
func (v *Receiver) Stop() {
	v.MulticastReceiver.Stop()
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
