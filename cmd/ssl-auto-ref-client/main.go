package main

import (
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"log"
	"net"
)

var refBoxAddr = flag.String("address", "localhost:10007", "Address to connect to")

func main() {

	conn, err := net.Dial("tcp", *refBoxAddr)
	if err != nil {
		log.Fatal("could not connect to game-controller at ", *refBoxAddr)
	}

	defer conn.Close()
	log.Printf("Connected to game-controller at %v", *refBoxAddr)

	register(conn)

	sendGameEvent(conn)

	sendMessage(conn)
}

func register(conn net.Conn) {
	registration := refproto.AutoRefRegistration{}
	registration.Identifier = "Test"
	if err := sslconn.SendMessage(conn, &registration); err != nil {
		log.Fatal("Failed sending registration: ", err)
	}
	log.Print("Sent registration, waiting for reply")
	controllerReply := refproto.ControllerReply{}
	if err := sslconn.ReceiveMessage(conn, &controllerReply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if controllerReply.StatusCode != refproto.ControllerReply_OK {
		log.Fatal("Registration rejected: ", controllerReply.Reason)
	}
	log.Print("Successfully registered")
}

func sendGameEvent(conn net.Conn) {
	event := refproto.GameEvent_BallLeftFieldTouchLine{}
	event.BallLeftFieldTouchLine = new(refproto.GameEvent_BallLeftFieldEvent)
	event.BallLeftFieldTouchLine.ByBot = &refproto.BotId{Id: 1, Team: refproto.Team_BLUE}
	event.BallLeftFieldTouchLine.Location = &refproto.Location{X: 1000, Y: 4500}
	gameEvent := refproto.GameEvent{Event: &event}
	request := refproto.AutoRefToControllerRequest{GameEvent: &gameEvent}

	if err := sslconn.SendMessage(conn, &request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}
}

func sendMessage(conn net.Conn) {
	msg := "Hello"
	message := refproto.AutoRefMessage{Message: &refproto.AutoRefMessage_Custom{Custom: msg}}
	request := refproto.AutoRefToControllerRequest{AutoRefMessage: &message}
	if err := sslconn.SendMessage(conn, &request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}
}
