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
	c.sendDesiredKeeper(3)

	for {
		c.ReplyToChoices()
	}
}

func (c *Client) register() {
	controllerReply := refproto.ControllerReply{}
	if err := sslconn.ReceiveMessage(c.conn, &controllerReply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if controllerReply.NextToken == nil {
		log.Fatal("Missing next token")
	}

	registration := refproto.TeamRegistration{}
	registration.TeamName = teamName
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
	log.Printf("Successfully registered as %v", *teamName)
	if controllerReply.NextToken != nil {
		c.token = *controllerReply.NextToken
	} else {
		c.token = ""
	}
}

func (c *Client) sendDesiredKeeper(id int32) {
	message := refproto.TeamToControllerRequest_DesiredKeeper{DesiredKeeper: id}
	request := refproto.TeamToControllerRequest{Request: &message}
	c.sendRequest(&request)
}

func (c *Client) ReplyToChoices() {
	request := refproto.ControllerToTeamRequest{}
	if err := sslconn.ReceiveMessage(c.conn, &request); err != nil {
		log.Fatal("Failed receiving controller request: ", err)
	}
	if request.GetAdvantageChoice() != nil {
		log.Printf("Received choice for: %v", *request.GetAdvantageChoice().Foul)
	}
	reply := refproto.TeamToControllerRequest_AdvantageResponse_{AdvantageResponse: refproto.TeamToControllerRequest_CONTINUE}
	response := refproto.TeamToControllerRequest{Request: &reply}
	c.sendRequest(&response)
}

func (c *Client) sendRequest(request *refproto.TeamToControllerRequest) {
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
