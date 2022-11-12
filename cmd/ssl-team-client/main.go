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
	"math/rand"
	"net"
	"time"
)

var udpAddress = flag.String("udpAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var autoDetectAddress = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var refBoxAddr = flag.String("address", "localhost:10008", "Address to connect to")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var teamName = flag.String("teamName", "Test Team", "The name of the team as it is sent by the referee")
var teamColor = flag.String("teamColor", "", "The color of the team as it is sent by the referee (YELLOW or BLUE)")
var verbose = flag.Bool("verbose", false, "Verbose logging")

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

	for {
		run()
		time.Sleep(5 * time.Second)
	}
}

func run() {
	conn, err := net.Dial("tcp", *refBoxAddr)
	if err != nil {
		log.Print("could not connect to game-controller at ", *refBoxAddr)
		return
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

	registered := c.register()
	if !registered {
		return
	}
	c.sendDesiredKeeper(3)

	advantageChoice := rcon.AdvantageChoice_CONTINUE
	for {
		_, failed := c.SendAdvantageChoice(advantageChoice)
		if failed {
			return
		}
		if advantageChoice == rcon.AdvantageChoice_CONTINUE {
			advantageChoice = rcon.AdvantageChoice_STOP
		} else {
			advantageChoice = rcon.AdvantageChoice_CONTINUE
		}
		time.Sleep(time.Second * time.Duration((5*rand.Float32())+1))
	}
}

func (c *Client) register() bool {
	reply := rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Print("Failed receiving controller reply: ", err)
		return false
	}
	if reply.GetControllerReply().NextToken == nil {
		log.Print("Missing next token")
		return false
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
		log.Print("Failed sending registration: ", err)
		return false
	}
	log.Print("Sent registration, waiting for reply")
	reply = rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Print("Failed receiving controller reply: ", err)
		return false
	}
	if reply.GetControllerReply().StatusCode == nil || *reply.GetControllerReply().StatusCode != rcon.ControllerReply_OK {
		reason := ""
		if reply.GetControllerReply().Reason != nil {
			reason = *reply.GetControllerReply().Reason
		}
		log.Print("Registration rejected: ", reason)
		return false
	}
	log.Printf("Successfully registered as %v", *teamName)
	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}
	return true
}

func (c *Client) sendDesiredKeeper(id int32) (accepted, failed bool) {
	message := rcon.TeamToController_DesiredKeeper{DesiredKeeper: id}
	request := rcon.TeamToController{Msg: &message}
	return c.sendRequest(&request)
}

func (c *Client) SendAdvantageChoice(choice rcon.AdvantageChoice) (accepted, failed bool) {
	reply := rcon.TeamToController_AdvantageChoice{AdvantageChoice: choice}
	response := rcon.TeamToController{Msg: &reply}
	return c.sendRequest(&response)
}

func (c *Client) sendRequest(request *rcon.TeamToController) (accepted, failed bool) {
	if privateKey != nil {
		request.Signature = &rcon.Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = client.Sign(privateKey, request)
	}

	if *verbose {
		log.Print("Sending ", request.String())
	}

	if err := sslconn.SendMessage(c.conn, request); err != nil {
		log.Printf("Failed sending request: %v (%v)", request, err)
		failed = true
		return
	}

	if *verbose {
		log.Print("Waiting for reply...")
	}
	reply := rcon.ControllerToTeam{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Print("Failed receiving controller reply: ", err)
		failed = true
		return
	}

	if *verbose {
		log.Print("Received reply: ", reply.String())
	}
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
