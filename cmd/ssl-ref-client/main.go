package main

import (
	"encoding/json"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

var refereeAddress = flag.String("address", "224.5.23.1:10003", "The multicast address of ssl-game-controller, default: 224.5.23.1:10003")

func main() {
	flag.Parse()

	addr, err := net.ResolveUDPAddr("udp", *refereeAddress)
	if err != nil {
		log.Fatal(err)
	}
	conn, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		log.Fatal(err)
	}

	conn.SetReadBuffer(maxDatagramSize)
	log.Println("Receiving from", *refereeAddress)

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
		refMsg := refproto.Referee{}
		proto.Unmarshal(b[0:n], &refMsg)

		b, err := json.Marshal(refMsg)
		if err != nil {
			log.Fatal(err)
		}
		log.Print(string(b))
	}
}
