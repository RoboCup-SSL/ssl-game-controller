package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/pem"
	"flag"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"github.com/golang/protobuf/proto"
	"io/ioutil"
	"log"
	"net"
)

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

	loadPrivateKey()

	conn, err := net.Dial("tcp", *refBoxAddr)
	if err != nil {
		log.Fatal("could not connect to game-controller at ", *refBoxAddr)
	}
	defer conn.Close()
	log.Printf("Connected to game-controller at %v", *refBoxAddr)
	client := Client{}
	client.conn = conn

	client.register()
	client.sendGameEvent()
	client.sendAutoRefMessage("Hello World")
}

func loadPrivateKey() {
	if *privateKeyLocation != "" {
		privateKey = readPrivateKey()
		if privateKey != nil {
			log.Print("Found private key")
		} else {
			log.Print("No private key available")
		}
	}
}

func readPrivateKey() *rsa.PrivateKey {
	b, err := ioutil.ReadFile(*privateKeyLocation)
	if err != nil {
		log.Fatal("Could not find private key at ", *privateKeyLocation)
	}
	p, _ := pem.Decode(b)
	if p.Type != "RSA PRIVATE KEY" {
		log.Fatal("Private key type is wrong: ", p.Type)
	}
	privateKey, err := x509.ParsePKCS1PrivateKey(p.Bytes)
	if err != nil {
		log.Fatal(err)
	}
	return privateKey
}

func (c *Client) register() {
	controllerReply := refproto.ControllerReply{}
	if err := sslconn.ReceiveMessage(c.conn, &controllerReply); err != nil {
		log.Fatal("Failed receiving controller reply: ", err)
	}
	if controllerReply.NextToken == "" {
		log.Fatal("Missing next token")
	}

	registration := refproto.AutoRefRegistration{}
	registration.Identifier = *clientIdentifier
	if privateKey != nil {
		registration.Signature = &refproto.Signature{Token: controllerReply.NextToken}
		registration.Signature.Pkcs1V15 = sign(privateKey, &registration)
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
	if controllerReply.StatusCode != refproto.ControllerReply_OK {
		log.Fatal("Registration rejected: ", controllerReply.Reason)
	}
	log.Printf("Successfully registered as %v", *clientIdentifier)
	c.token = controllerReply.NextToken
}

func (c *Client) sendGameEvent() {
	event := refproto.GameEvent_BallLeftFieldTouchLine{}
	event.BallLeftFieldTouchLine = new(refproto.GameEvent_BallLeftFieldEvent)
	event.BallLeftFieldTouchLine.ByBot = &refproto.BotId{Id: 1, Team: refproto.Team_BLUE}
	event.BallLeftFieldTouchLine.Location = &refproto.Location{X: 1000, Y: 4500}
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
		request.Signature = &refproto.Signature{Token: c.token}
		request.Signature.Pkcs1V15 = sign(privateKey, request)
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
	if controllerReply.StatusCode != refproto.ControllerReply_OK {
		log.Fatal("Message rejected: ", controllerReply.Reason)
	}
	c.token = controllerReply.NextToken
}

func sign(privateKey *rsa.PrivateKey, message proto.Message) []byte {
	messageBytes, err := proto.Marshal(message)
	if err != nil {
		log.Fatal(err)
	}
	hash := sha256.New()
	hash.Write(messageBytes)
	d := hash.Sum(nil)
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, d)
	if err != nil {
		log.Fatal(err)
	}
	return signature
}
