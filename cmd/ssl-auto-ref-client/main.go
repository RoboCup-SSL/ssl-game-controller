package main

import (
	"bufio"
	"crypto/rsa"
	"flag"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/client"
	"log"
	"net"
	"os"
	"strings"
	"time"
)

var udpAddress = flag.String("udpAddress", "224.5.23.1:10003", "The multicast address of ssl-game-controller")
var autoDetectAddress = flag.Bool("autoDetectHost", true, "Automatically detect the game-controller host and replace it with the host given in address")
var refBoxAddr = flag.String("address", "localhost:10007", "Address to connect to")
var privateKeyLocation = flag.String("privateKey", "", "A private key to be used to sign messages")
var clientIdentifier = flag.String("identifier", "test", "The identifier of the client")

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

	go func() {
		for {
			time.Sleep(1 * time.Second)
			c.sendEmptyMessage()
		}
	}()

	commands := map[string]func([]string){}
	commands["ballLeftField"] = func(_ []string) {
		c.sendBallLeftField()
	}
	commands["botCrashUnique"] = func(_ []string) {
		c.sendBotCrashUnique()
	}
	commands["doubleTouch"] = func(_ []string) {
		c.sendDoubleTouch()
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
	reply := rcon.ControllerToAutoRef{}
	if err := sslconn.ReceiveMessage(c.reader, &reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if reply.GetControllerReply() == nil || reply.GetControllerReply().NextToken == nil {
		log.Fatal("Missing next token")
	}

	registration := rcon.AutoRefRegistration{}
	registration.Identifier = clientIdentifier
	if privateKey != nil {
		registration.Signature = &rcon.Signature{Token: reply.GetControllerReply().NextToken, Pkcs1V15: []byte{}}
		registration.Signature.Pkcs1V15 = client.Sign(privateKey, &registration)
	}
	log.Print("Sending registration")
	if err := sslconn.SendMessage(c.conn, &registration); err != nil {
		log.Fatal("Failed sending registration: ", err)
	}
	log.Print("Sent registration, waiting for reply")
	reply = rcon.ControllerToAutoRef{}
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
	log.Printf("Successfully registered as %v", *clientIdentifier)
	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}
}

func (c *Client) sendBallLeftField() {
	event := state.GameEvent_BallLeftFieldTouchLine{}
	event.BallLeftFieldTouchLine = new(state.GameEvent_BallLeftField)
	event.BallLeftFieldTouchLine.ByBot = new(uint32)
	*event.BallLeftFieldTouchLine.ByBot = 2
	event.BallLeftFieldTouchLine.ByTeam = new(state.Team)
	*event.BallLeftFieldTouchLine.ByTeam = state.Team_BLUE
	event.BallLeftFieldTouchLine.Location = &geom.Vector2{X: new(float32), Y: new(float32)}
	*event.BallLeftFieldTouchLine.Location.X = 1
	*event.BallLeftFieldTouchLine.Location.Y = 4.5
	gameEvent := state.GameEvent{Event: &event, Type: new(state.GameEvent_Type)}
	*gameEvent.Type = state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE
	request := rcon.AutoRefToController{GameEvent: &gameEvent}
	c.sendRequest(&request, true)
}

func (c *Client) sendDoubleTouch() {
	event := state.GameEvent_AttackerDoubleTouchedBall_{}
	event.AttackerDoubleTouchedBall = new(state.GameEvent_AttackerDoubleTouchedBall)
	event.AttackerDoubleTouchedBall.ByBot = new(uint32)
	*event.AttackerDoubleTouchedBall.ByBot = 2
	event.AttackerDoubleTouchedBall.ByTeam = new(state.Team)
	*event.AttackerDoubleTouchedBall.ByTeam = state.Team_BLUE
	event.AttackerDoubleTouchedBall.Location = &geom.Vector2{X: new(float32), Y: new(float32)}
	*event.AttackerDoubleTouchedBall.Location.X = 1
	*event.AttackerDoubleTouchedBall.Location.Y = 4.5
	gameEvent := state.GameEvent{Event: &event, Type: new(state.GameEvent_Type)}
	*gameEvent.Type = state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL
	request := rcon.AutoRefToController{GameEvent: &gameEvent}
	c.sendRequest(&request, true)
}

func (c *Client) sendBotCrashUnique() {
	event := state.GameEvent_BotCrashUnique_{}
	event.BotCrashUnique = new(state.GameEvent_BotCrashUnique)
	event.BotCrashUnique.Violator = new(uint32)
	*event.BotCrashUnique.Violator = 2
	event.BotCrashUnique.Victim = new(uint32)
	*event.BotCrashUnique.Victim = 5
	event.BotCrashUnique.ByTeam = new(state.Team)
	*event.BotCrashUnique.ByTeam = state.Team_BLUE
	event.BotCrashUnique.Location = &geom.Vector2{X: new(float32), Y: new(float32)}
	*event.BotCrashUnique.Location.X = 1
	*event.BotCrashUnique.Location.Y = 4.5
	gameEvent := state.GameEvent{Event: &event, Type: new(state.GameEvent_Type)}
	*gameEvent.Type = state.GameEvent_BOT_CRASH_UNIQUE
	request := rcon.AutoRefToController{GameEvent: &gameEvent}
	c.sendRequest(&request, true)
}

func (c *Client) sendEmptyMessage() {
	request := rcon.AutoRefToController{}
	c.sendRequest(&request, false)
}

func (c *Client) sendRequest(request *rcon.AutoRefToController, doLog bool) {
	if privateKey != nil {
		request.Signature = &rcon.Signature{Token: &c.token, Pkcs1V15: []byte{}}
		request.Signature.Pkcs1V15 = client.Sign(privateKey, request)
	}

	logIf(doLog, "Sending ", request)

	if err := sslconn.SendMessage(c.conn, request); err != nil {
		log.Fatalf("Failed sending request: %v (%v)", request, err)
	}

	logIf(doLog, "Waiting for reply...")
	reply := &rcon.ControllerToAutoRef{}
	if err := sslconn.ReceiveMessage(c.reader, reply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	logIf(doLog, "Received reply: ", reply)
	if reply.GetControllerReply() == nil || reply.GetControllerReply().StatusCode == nil || *reply.GetControllerReply().StatusCode != rcon.ControllerReply_OK {
		log.Fatal("Message rejected: ", *reply.GetControllerReply().Reason)
	}
	if reply.GetControllerReply().NextToken != nil {
		c.token = *reply.GetControllerReply().NextToken
	} else {
		c.token = ""
	}
}

func logIf(doLog bool, v ...interface{}) {
	if doLog {
		log.Print(v...)
	}
}
