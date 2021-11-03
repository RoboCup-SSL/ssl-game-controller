package main

import (
	"bufio"
	"flag"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"github.com/google/uuid"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
	"time"
)

const maxDatagramSize = 8192

var sourceName = flag.String("sourceName", "tracker-test-client", "The name of the client")
var trackerAddress = flag.String("address", "224.5.23.2:10010", "The multicast address of the tracker")

func main() {
	flag.Parse()

	addr, err := net.ResolveUDPAddr("udp", *trackerAddress)
	if err != nil {
		log.Fatal(err)
	}
	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Fatal(err)
	}

	if err := conn.SetReadBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set read buffer to %v.", maxDatagramSize)
	}

	frame := &tracker.TrackedFrame{
		FrameNumber: new(uint32),
		Timestamp:   new(float64),
		Balls: []*tracker.TrackedBall{
			{
				Pos: &geom.Vector3{
					X: new(float32),
					Y: new(float32),
					Z: new(float32),
				},
				Vel: &geom.Vector3{
					X: new(float32),
					Y: new(float32),
					Z: new(float32),
				},
			},
		},
	}

	commands := map[string]func([]string){}
	commands["ballpos"] = func(args []string) {
		if len(args) != 3 {
			log.Printf("x, y, z required")
		} else {
			x, _ := strconv.ParseFloat(args[0], 32)
			y, _ := strconv.ParseFloat(args[1], 32)
			z, _ := strconv.ParseFloat(args[2], 32)
			*frame.Balls[0].Pos.X = float32(x)
			*frame.Balls[0].Pos.Y = float32(y)
			*frame.Balls[0].Pos.Z = float32(z)
			log.Printf("Ball changed: %v", frame.Balls[0])
		}
	}

	go publish(frame, conn)

	reader := bufio.NewReader(os.Stdin)
	for {
		fmt.Print("-> ")
		text, err := reader.ReadString('\n')
		if err != nil {
			log.Print("Can not read from stdin: ", err)
			for {
				time.Sleep(1 * time.Second)
			}
		}
		// convert CRLF to LF
		text = strings.Replace(text, "\n", "", -1)
		cmd := strings.Split(text, " ")
		if fn, ok := commands[cmd[0]]; ok {
			fn(cmd[1:])
		} else {
			fmt.Println("Available commands:")
			for cmd := range commands {
				fmt.Printf("  %-20s\n", cmd)
			}
		}
	}
}

func publish(frame *tracker.TrackedFrame, conn *net.UDPConn) {
	id := uuid.NewString()
	wrapperPacket := &tracker.TrackerWrapperPacket{
		Uuid:         &id,
		SourceName:   sourceName,
		TrackedFrame: frame,
	}

	log.Println("Sending to ", *trackerAddress)
	for {
		*frame.Timestamp = float64(time.Now().UnixNano()) / 1e9
		if bytes, err := proto.Marshal(wrapperPacket); err != nil {
			log.Printf("Could not marshal packet: %v\nError: %v", wrapperPacket, err)
			return
		} else {
			if _, err = conn.Write(bytes); err != nil {
				log.Println("Could not write tracker message:", err)
				return
			}
		}
		time.Sleep(time.Millisecond * 10)
		*frame.FrameNumber++
	}
}
