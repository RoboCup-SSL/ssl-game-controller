package main

import (
	"flag"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

var refereeAddress = flag.String("refereeAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var visionAddress = flag.String("visionAddress", "224.5.23.2:10006", "The multicast address of ssl-vision")

var refereeRemotes []string

func main() {
	flag.Parse()

	go watchAddress(*refereeAddress)
	watchAddress(*visionAddress)
}

func watchAddress(address string) {
	addr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		log.Fatal(err)
	}
	conn, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		log.Fatal(err)
	}
	if err := conn.SetReadBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set read buffer to %v.", maxDatagramSize)
	}
	log.Println("Receiving from", address)
	for {
		_, udpAddr, err := conn.ReadFromUDP([]byte{0})
		if err != nil {
			log.Print("Could not read", err)
			time.Sleep(1 * time.Second)
			continue
		}
		addRemote(address, udpAddr.IP.String())
	}
}

func addRemote(address string, remote string) {
	for _, a := range refereeRemotes {
		if a == remote {
			return
		}
	}
	refereeRemotes = append(refereeRemotes, remote)
	log.Printf("remote ip on %v: %v\n", address, remote)
}
