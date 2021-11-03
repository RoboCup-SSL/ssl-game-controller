package main

import (
	"bufio"
	"flag"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/ci"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"github.com/google/uuid"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
	"time"
)

var address = flag.String("address", "localhost:10009", "The address of the ssl-game-controller CI interface")

var id = uuid.NewString()
var name = "Test client"
var trackerPacket = createTrackerPacket()

func main() {
	flag.Parse()

	conn, err := net.Dial("tcp", *address)
	if err != nil {
		log.Fatal("could not connect to game-controller at ", *address)
	}
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close connection: %v", err)
		}
	}()
	log.Printf("Connected to game-controller at %v", *address)

	go receive(conn)
	send(conn)

	commands := map[string]func([]string){}
	commands["ball"] = func(args []string) {
		trackerPacket.TrackedFrame.Balls = []*tracker.TrackedBall{createBall(args)}
	}

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

func createBall(args []string) (ball *tracker.TrackedBall) {
	ball = new(tracker.TrackedBall)
	var pos, vel *geom.Vector3
	if len(args) >= 2 {
		pos = new(geom.Vector3)
		pos.X = new(float32)
		pos.Y = new(float32)
		pos.Z = new(float32)
		x, _ := strconv.ParseFloat(args[0], 64)
		*pos.X = float32(x)
		y, _ := strconv.ParseFloat(args[1], 64)
		*pos.Y = float32(y)
		if len(args) >= 3 {
			z, _ := strconv.ParseFloat(args[2], 64)
			*pos.Z = float32(z)
		}
	}
	if len(args) >= 5 {
		vel = new(geom.Vector3)
		vel.X = new(float32)
		vel.Y = new(float32)
		x, _ := strconv.ParseFloat(args[3], 64)
		y, _ := strconv.ParseFloat(args[4], 64)
		*vel.X = float32(x)
		*vel.Y = float32(y)
	}
	ball.Pos = pos
	ball.Vel = vel
	return
}

func createTrackerPacket() (p tracker.TrackerWrapperPacket) {
	p.Uuid = &id
	p.SourceName = &name
	p.TrackedFrame = new(tracker.TrackedFrame)
	p.TrackedFrame.Timestamp = new(float64)
	p.TrackedFrame.FrameNumber = new(uint32)
	return
}

func send(conn net.Conn) {
	for {
		timestamp := time.Now().UnixNano()
		*trackerPacket.TrackedFrame.Timestamp = float64(timestamp / 1e9)
		*trackerPacket.TrackedFrame.FrameNumber++
		input := ci.CiInput{Timestamp: &timestamp, TrackerPacket: &trackerPacket}
		if err := sslconn.SendMessage(conn, &input); err != nil {
			log.Println("Could not send message: ", err)
		}
		time.Sleep(time.Millisecond * 25)
	}
}

func receive(conn net.Conn) {
	reader := bufio.NewReaderSize(conn, 1)
	for {
		output := ci.CiOutput{}
		if err := sslconn.ReceiveMessage(reader, &output); err != nil {
			log.Println("Could not receive message: ", err)
		}
		log.Println("RefereeMsg: ", output.RefereeMsg)
	}
}
