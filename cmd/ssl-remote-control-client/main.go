package main

import (
	"bufio"
	"crypto/rsa"
	"flag"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/client"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
	"time"
)

var udpAddress = flag.String("udpAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var autoDetectAddress = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var refBoxAddr = flag.String("address", "localhost:10011", "Address to connect to")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var team = flag.String("team", "YELLOW", "The team to control, either YELLOW or BLUE")

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

	commands := map[string]func([]string){}
	commands["ping"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_Request_{Request: rcon.RemoteControlToController_PING},
		})
	}
	commands["keeper"] = func(args []string) {
		if len(args) != 1 {
			log.Printf("Missing keeper id")
		} else if id, err := strconv.Atoi(args[0]); err != nil {
			log.Printf("Could not parse keeper id '%v'", args[0])
		} else {
			c.sendDesiredKeeper(int32(id))
		}
	}
	commands["substitution"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_RequestRobotSubstitution{RequestRobotSubstitution: true},
		})
	}
	commands["no_substitution"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_RequestRobotSubstitution{RequestRobotSubstitution: false},
		})
	}
	commands["timeout"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_RequestTimeout{RequestTimeout: true},
		})
	}
	commands["no_timeout"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_RequestTimeout{RequestTimeout: false},
		})
	}
	commands["challenge"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_Request_{Request: rcon.RemoteControlToController_CHALLENGE_FLAG},
		})
	}
	commands["emergency"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_RequestEmergencyStop{RequestEmergencyStop: true},
		})
	}
	commands["no_emergency"] = func(args []string) {
		c.sendRequest(&rcon.RemoteControlToController{
			Msg: &rcon.RemoteControlToController_RequestEmergencyStop{RequestEmergencyStop: false},
		})
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

func (c *Client) register() {
	reply := rcon.ControllerToRemoteControl{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if reply.GetControllerReply().NextToken == nil {
		log.Fatal("Missing next token")
	}

	registration := rcon.RemoteControlRegistration{}
	registration.Team = new(state.Team)
	*registration.Team = state.Team(state.Team_value[*team])
	if privateKey != nil {
		registration.Signature = &rcon.Signature{Token: reply.GetControllerReply().NextToken, Pkcs1V15: []byte{}}
		registration.Signature.Pkcs1V15 = client.Sign(privateKey, &registration)
	}
	log.Print("Sending registration")
	if err := sslconn.SendMessage(c.conn, &registration); err != nil {
		log.Fatal("Failed sending registration: ", err)
	}
	log.Print("Sent registration, waiting for reply")
	reply = rcon.ControllerToRemoteControl{}
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
	log.Printf("Successfully registered as %v", *team)
	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}
}

func (c *Client) sendDesiredKeeper(id int32) (accepted bool) {
	message := rcon.RemoteControlToController_DesiredKeeper{DesiredKeeper: id}
	request := rcon.RemoteControlToController{Msg: &message}
	return c.sendRequest(&request)
}

func (c *Client) sendRequest(request *rcon.RemoteControlToController) (accepted bool) {
	if privateKey != nil {
		request.Signature = &rcon.Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = client.Sign(privateKey, request)
	}

	log.Print("Sending ", request.String())

	if err := sslconn.SendMessage(c.conn, request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}

	log.Print("Waiting for reply...")
	reply := rcon.ControllerToRemoteControl{}
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
