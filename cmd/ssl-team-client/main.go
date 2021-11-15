package main

import (
	"bufio"
	"crypto/rsa"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/client"
	"log"
	"net"
	"time"
)

var udpAddress = flag.String("udpAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var autoDetectAddress = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var refBoxAddr = flag.String("address", "localhost:10008", "Address to connect to")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var teamName = flag.String("teamName", "Test Team", "The name of the team as it is sent by the referee")
var teamColor = flag.String("teamColor", "", "The color of the team as it is sent by the referee")

var privateKey *rsa.PrivateKey

type Client struct {
	conn   net.Conn
	reader *bufio.Reader
	token  string
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
		} else {
			log.Println("No host detected")
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
	c.reader = bufio.NewReaderSize(conn, 1)

	c.register()
	c.sendDesiredKeeper(3)

	for {
		c.SendAdvantageChoice(rcon.AdvantageResponse_CONTINUE)
		time.Sleep(time.Millisecond * 1000)
		c.SendAdvantageChoice(rcon.AdvantageResponse_STOP)
		time.Sleep(time.Millisecond * 1000)
	}
}

func (c *Client) register() {
	reply := rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if reply.GetControllerReply().NextToken == nil {
		log.Fatal("Missing next token")
	}

	registration := rcon.TeamRegistration{}
	registration.TeamName = teamName

	if color, validColor := state.Team_value[*teamColor]; validColor {
		registration.Team = new(state.Team)
		*registration.Team = state.Team(color)
	}
	if privateKey != nil {
		registration.Signature = &rcon.Signature{Token: reply.GetControllerReply().NextToken, Pkcs1V15: []byte{}}
		registration.Signature.Pkcs1V15 = client.Sign(privateKey, &registration)
	}
	log.Print("Sending registration: ", registration.String())
	if err := sslconn.SendMessage(c.conn, &registration); err != nil {
		log.Fatal("Failed sending registration: ", err)
	}
	log.Print("Sent registration, waiting for reply")
	reply = rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
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

func (c *Client) SendAdvantageChoice(choice rcon.AdvantageResponse) {
	reply := rcon.TeamToController_AdvantageResponse{AdvantageResponse: choice}
	response := rcon.TeamToController{Msg: &reply}
	c.sendRequest(&response)
}

func (c *Client) sendRequest(request *rcon.TeamToController) (accepted bool) {
	if privateKey != nil {
		request.Signature = &rcon.Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = client.Sign(privateKey, request)
	}

	log.Print("Sending ", request.String())

	if err := sslconn.SendMessage(c.conn, request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}

	log.Print("Waiting for reply...")
	reply := rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	log.Print("Received reply: ", reply.String())
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
