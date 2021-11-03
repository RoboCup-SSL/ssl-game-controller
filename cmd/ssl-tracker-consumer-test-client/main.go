package main

import (
	"flag"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"google.golang.org/protobuf/encoding/prototext"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
	"sort"
	"time"
)

const maxDatagramSize = 8192

var trackerAddress = flag.String("address", "224.5.23.2:10010", "The multicast address of the tracker")
var fullScreen = flag.Bool("fullScreen", false, "Print the formatted message to the console, clearing the screen during print")

func main() {
	flag.Parse()

	addr, err := net.ResolveUDPAddr("udp", *trackerAddress)
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
	log.Println("Receiving from", *trackerAddress)

	sourcePackets := map[string]*tracker.TrackerWrapperPacket{}
	b := make([]byte, maxDatagramSize)
	for {
		n, err := conn.Read(b)
		if err != nil {
			log.Print("Could not read: ", err)
			time.Sleep(1 * time.Second)
			continue
		}
		if n >= maxDatagramSize {
			log.Fatal("Buffer size too small")
		}
		packet := tracker.TrackerWrapperPacket{}
		if err := proto.Unmarshal(b[0:n], &packet); err != nil {
			log.Println("Could not unmarshal referee message")
			continue
		}
		sourcePackets[*packet.Uuid] = &packet

		if *fullScreen {
			// clear screen, move cursor to upper left corner
			fmt.Print("\033[H\033[2J")

			var sources []string
			for source := range sourcePackets {
				sources = append(sources, source)
			}
			sort.Strings(sources)

			// print message formatted with line breaks
			for _, source := range sources {
				fmt.Print(prototext.MarshalOptions{Multiline: true}.Format(sourcePackets[source]))
			}
		} else {
			log.Print(prototext.MarshalOptions{Multiline: false}.Format(&packet))
		}
	}
}
