package controller

import (
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslproto"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

type VisionReceiver struct {
	DetectionCallback func(*sslproto.SSL_DetectionFrame)
	GeometryCallback  func(*sslproto.SSL_GeometryData)
}

func NewVisionReceiver(address string) (v *VisionReceiver) {
	v = new(VisionReceiver)
	v.DetectionCallback = func(*sslproto.SSL_DetectionFrame) {}
	v.GeometryCallback = func(data *sslproto.SSL_GeometryData) {}

	addr, err := net.ResolveUDPAddr("udp", address)
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
	log.Println("Receiving vision from", address)

	go v.receive(conn)
	return
}

func (v *VisionReceiver) receive(conn *net.UDPConn) {
	b := make([]byte, maxDatagramSize)
	for {
		n, err := conn.Read(b)
		if err != nil {
			log.Print("Could not read", err)
			time.Sleep(1 * time.Second)
			continue
		}
		if n >= maxDatagramSize {
			log.Fatal("Buffer size too small")
		}
		wrapper := sslproto.SSL_WrapperPacket{}
		if err := proto.Unmarshal(b[0:n], &wrapper); err != nil {
			log.Println("Could not unmarshal referee message")
			continue
		}

		if wrapper.Geometry != nil {
			v.GeometryCallback(wrapper.Geometry)
		}
		if wrapper.Detection != nil {
			v.DetectionCallback(wrapper.Detection)
		}
	}
}
