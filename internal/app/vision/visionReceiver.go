package vision

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/sslnet"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/golang/protobuf/proto"
	"log"
	"sync"
	"time"
)

type Receiver struct {
	address           string
	DetectionCallback func(*SSL_DetectionFrame)
	GeometryCallback  func(*SSL_GeometryData)
	latestTimestamp   time.Time
	mutex             sync.Mutex
	MulticastServer   *sslnet.MulticastServer
}

// NewReceiver creates a new receiver
func NewReceiver(address string) (v *Receiver) {
	v = new(Receiver)
	v.address = address
	v.DetectionCallback = func(*SSL_DetectionFrame) {}
	v.GeometryCallback = func(data *SSL_GeometryData) {}
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

	wrapper := SSL_WrapperPacket{}
	if err := proto.Unmarshal(data, &wrapper); err != nil {
		log.Println("Could not unmarshal vision wrapper packet", err)
		return
	}

	if wrapper.Geometry != nil {
		v.GeometryCallback(wrapper.Geometry)
	}
	if wrapper.Detection != nil {
		v.latestTimestamp = timer.TimestampToTime(*wrapper.Detection.TCapture)
		v.DetectionCallback(wrapper.Detection)
	}
}

func (v *Receiver) Time() time.Time {
	v.mutex.Lock()
	defer v.mutex.Unlock()
	return v.latestTimestamp
}
