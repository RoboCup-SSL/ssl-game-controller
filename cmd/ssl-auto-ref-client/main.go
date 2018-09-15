package main

import (
	"crypto/rsa"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/client"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"log"
	"net"
)

var udpAddress = flag.String("udpAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var autoDetectAddress = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var refBoxAddr = flag.String("address", "localhost:10007", "Address to connect to")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var clientIdentifier = flag.String("identifier", "test", "The identifier of the client")

var privateKey *rsa.PrivateKey

type Client struct {
	conn  net.Conn
	token string
}

func main() {
	flag.Parse()

	client.LoadPrivateKey(*privateKeyLocation)

	if *autoDetectAddress {
		host := client.DetectHost(*udpAddress)
		if host != "" {
			log.Print("Detected game-controller host: ", host)
			*refBoxAddr = client.SetHost(*refBoxAddr, host)
		}
	}

	conn, err := net.Dial("tcp", *refBoxAddr)
	if err != nil {
		log.Fatal("could not connect to game-controller at ", *refBoxAddr)
	}
	defer conn.Close()
	log.Printf("Connected to game-controller at %v", *refBoxAddr)
	c := Client{}
	c.conn = conn

	c.register()
	c.sendGameEvent()
	c.sendAutoRefMessage("Hello World")
}

func (c *Client) register() {
	controllerReply := refproto.ControllerReply{}
	if err := sslconn.ReceiveMessage(c.conn, &controllerReply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if controllerReply.NextToken == nil {
		log.Fatal("Missing next token")
	}

	registration := refproto.AutoRefRegistration{}
	registration.Identifier = clientIdentifier
	if privateKey != nil {
		registration.Signature = &refproto.Signature{Token: controllerReply.NextToken, Pkcs1V15: []byte{}}
		registration.Signature.Pkcs1V15 = client.Sign(privateKey, &registration)
	}
	log.Print("Sending registration")
	if err := sslconn.SendMessage(c.conn, &registration); err != nil {
		log.Fatal("Failed sending registration: ", err)
	}
	log.Print("Sent registration, waiting for reply")
	controllerReply = refproto.ControllerReply{}
	if err := sslconn.ReceiveMessage(c.conn, &controllerReply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if controllerReply.StatusCode == nil || *controllerReply.StatusCode != refproto.ControllerReply_OK {
		reason := ""
		if controllerReply.Reason != nil {
			reason = *controllerReply.Reason
		}
		log.Fatal("Registration rejected: ", reason)
	}
	log.Printf("Successfully registered as %v", *clientIdentifier)
	if controllerReply.NextToken != nil {
		c.token = *controllerReply.NextToken
	} else {
		c.token = ""
	}
}

func (c *Client) sendGameEvent() {
	event := refproto.GameEvent_BallLeftFieldTouchLine{}
	event.BallLeftFieldTouchLine = new(refproto.GameEvent_BallLeftFieldEvent)
	event.BallLeftFieldTouchLine.ByBot = new(uint32)
	*event.BallLeftFieldTouchLine.ByBot = 2
	event.BallLeftFieldTouchLine.ByTeam = new(refproto.Team)
	*event.BallLeftFieldTouchLine.ByTeam = refproto.Team_BLUE
	event.BallLeftFieldTouchLine.Location = &refproto.Location{X: new(float32), Y: new(float32)}
	*event.BallLeftFieldTouchLine.Location.X = 1000
	*event.BallLeftFieldTouchLine.Location.Y = 4500
	gameEvent := refproto.GameEvent{Event: &event}
	request := refproto.AutoRefToControllerRequest{GameEvent: &gameEvent}
	c.sendRequest(&request)
}

func (c *Client) sendAutoRefMessage(msg string) {
	message := refproto.AutoRefMessage{Message: &refproto.AutoRefMessage_Custom{Custom: msg}}
	request := refproto.AutoRefToControllerRequest{AutoRefMessage: &message}
	c.sendRequest(&request)
}

func (c *Client) sendRequest(request *refproto.AutoRefToControllerRequest) {
	if privateKey != nil {
		request.Signature = &refproto.Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = client.Sign(privateKey, request)
	}

	log.Print("Sending ", request)

	if err := sslconn.SendMessage(c.conn, request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}

	log.Print("Waiting for reply...")
	controllerReply := refproto.ControllerReply{}
	if err := sslconn.ReceiveMessage(c.conn, &controllerReply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	log.Print("Received reply: ", controllerReply)
	if controllerReply.StatusCode == nil || *controllerReply.StatusCode != refproto.ControllerReply_OK {
		log.Fatal("Message rejected: ", controllerReply.Reason)
	}
	if controllerReply.NextToken != nil {
		c.token = *controllerReply.NextToken
	} else {
		c.token = ""
	}
}
