package main

import (
	"crypto/rsa"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/client"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

var udpAddress = flag.String("udpAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var autoDetectAddress = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var refBoxAddr = flag.String("address", "localhost:10008", "Address to connect to")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var teamName = flag.String("teamName", "Test Team", "The name of the team as it is sent by the referee")

var privateKey *rsa.PrivateKey

type Client struct {
	conn  net.Conn
	token string
}

func main() {
	flag.Parse()

	privateKey = client.LoadPrivateKey(*privateKeyLocation)

	if *autoDetectAddress {
		log.Print("Trying to detect host based on incoming referee messages...")
		host := client.DetectHost(*udpAddress)
		if host != "" {
			log.Print("Detected game-controller host: ", host)
			*refBoxAddr = client.GetConnectionString(*refBoxAddr, host)
		}
	}

	conn, err := net.Dial("tcp", *refBoxAddr)
	if err != nil {
		log.Fatal("could not connect to game-controller at ", *refBoxAddr)
	}
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close connection: %v", err)
		}
	}()
	log.Printf("Connected to game-controller at %v", *refBoxAddr)
	c := Client{}
	c.conn = conn

	c.register()
	for !c.sendDesiredKeeper(3) {
		time.Sleep(time.Second)
	}

	for {
		time.Sleep(time.Second)
	}
}

func (c *Client) register() {
	reply := rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.conn, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if reply.GetControllerReply().NextToken == nil {
		log.Fatal("Missing next token")
	}

	registration := rcon.TeamRegistration{}
	registration.TeamName = teamName
	if privateKey != nil {
		registration.Signature = &rcon.Signature{Token: reply.GetControllerReply().NextToken, Pkcs1V15: []byte{}}
		registration.Signature.Pkcs1V15 = client.Sign(privateKey, &registration)
	}
	log.Print("Sending registration")
	if err := sslconn.SendMessage(c.conn, &registration); err != nil {
		log.Fatal("Failed sending registration: ", err)
	}
	log.Print("Sent registration, waiting for reply")
	reply = rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.conn, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if reply.GetControllerReply().StatusCode == nil || *reply.GetControllerReply().StatusCode != rcon.ControllerReply_OK {
		reason := ""
		if reply.GetControllerReply().Reason != nil {
			reason = *reply.GetControllerReply().Reason
		}
		log.Fatal("Registration rejected: ", reason)
	}
	log.Printf("Successfully registered as %v", *teamName)
	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}
}

func (c *Client) sendDesiredKeeper(id int32) (accepted bool) {
	message := rcon.TeamToController_DesiredKeeper{DesiredKeeper: id}
	request := rcon.TeamToController{Msg: &message}
	return c.sendRequest(&request)
}

func (c *Client) sendRequest(request *rcon.TeamToController) (accepted bool) {
	if privateKey != nil {
		request.Signature = &rcon.Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = client.Sign(privateKey, request)
	}

	log.Print("Sending ", proto.MarshalTextString(request))

	if err := sslconn.SendMessage(c.conn, request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}

	log.Print("Waiting for reply...")
	reply := rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.conn, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	log.Print("Received reply: ", proto.MarshalTextString(&reply))
	if reply.GetControllerReply().StatusCode == nil || *reply.GetControllerReply().StatusCode != rcon.ControllerReply_OK {
		log.Print("Message rejected: ", *reply.GetControllerReply().Reason)
		accepted = false
	} else {
		accepted = true
	}

	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}

	return
}
