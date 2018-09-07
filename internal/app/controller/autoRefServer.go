package controller

import (
	"crypto"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/pem"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"github.com/golang/protobuf/proto"
	"github.com/odeke-em/go-uuid"
	"github.com/pkg/errors"
	"io"
	"io/ioutil"
	"log"
	"net"
	"strings"
)

type AutoRefServer struct {
	Clients        map[string]AutoRefClient
	ProcessRequest func(refproto.AutoRefToControllerRequest) error
	trustedKeys    map[string]*rsa.PublicKey
}

type AutoRefClient struct {
	id     string
	conn   net.Conn
	token  string
	pubKey *rsa.PublicKey
}

func NewAutoRefServer() (clientServer AutoRefServer) {
	clientServer.ProcessRequest = func(refproto.AutoRefToControllerRequest) error { return nil }
	clientServer.Clients = map[string]AutoRefClient{}
	clientServer.trustedKeys = map[string]*rsa.PublicKey{}
	return
}

func (s *AutoRefServer) LoadTrustedKeys(trustedKeysDir string) {
	files, err := ioutil.ReadDir(trustedKeysDir)
	if err != nil {
		log.Print("Could not read trusted keys: ", err)
		return
	}
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".pub.pem") {
			pubKey := readPublicKey(trustedKeysDir + "/" + file.Name())
			if pubKey != nil {
				name := strings.Replace(file.Name(), ".pub.pem", "", 1)
				s.trustedKeys[name] = pubKey
				log.Printf("Loaded public key for %v", name)
			}
		}
	}
	log.Printf("Loaded %v public keys", len(s.trustedKeys))
}

func (s *AutoRefServer) Listen(address string) error {
	listener, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}
	defer listener.Close()
	log.Print("Listening for autoRefs on ", address)

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print("Could not accept connection: ", err)
		} else {
			go s.handleClientConnection(conn)
		}

	}
}

func (c *AutoRefClient) receiveRegistration(server *AutoRefServer) error {
	registration := refproto.AutoRefRegistration{}
	sslconn.ReceiveMessage(c.conn, &registration)

	if registration.Identifier == nil || len(*registration.Identifier) < 1 {
		return errors.New("No identifier specified")
	}
	c.id = *registration.Identifier
	if _, exists := server.Clients[c.id]; exists {
		return errors.New("Client with given identifier already registered: " + c.id)
	}
	c.pubKey = server.trustedKeys[c.id]
	if c.pubKey != nil {
		err := c.verifyRegistration(registration)
		if err != nil {
			return err
		}
	} else {
		c.token = ""
	}

	c.ok()

	return nil
}

func (c *AutoRefClient) verifyRegistration(registration refproto.AutoRefRegistration) error {
	if registration.Signature == nil {
		return errors.New("Missing signature")
	}
	if registration.Signature.Token == nil || *registration.Signature.Token != c.token {
		sendToken := ""
		if registration.Signature.Token != nil {
			sendToken = *registration.Signature.Token
		}
		return errors.Errorf("Client %v sent an invalid token: %v != %v", c.id, sendToken, c.token)
	}
	signature := registration.Signature.Pkcs1V15
	registration.Signature.Pkcs1V15 = []byte{}
	err := verifySignature(c.pubKey, &registration, signature)
	registration.Signature.Pkcs1V15 = signature
	if err != nil {
		return errors.New("Invalid signature")
	}
	c.token = uuid.New()
	return nil
}

func (c *AutoRefClient) verifyRequest(req refproto.AutoRefToControllerRequest) error {
	if req.Signature == nil {
		return errors.New("Missing signature")
	}
	if req.Signature.Token == nil || *req.Signature.Token != c.token {
		sendToken := ""
		if req.Signature.Token != nil {
			sendToken = *req.Signature.Token
		}
		return errors.Errorf("Invalid token: %v != %v", sendToken, c.token)
	}
	signature := req.Signature.Pkcs1V15
	req.Signature.Pkcs1V15 = []byte{}
	err := verifySignature(c.pubKey, &req, signature)
	req.Signature.Pkcs1V15 = signature
	if err != nil {
		return errors.Wrap(err, "Verification failed.")
	}
	c.token = uuid.New()
	return nil
}

func (s *AutoRefServer) handleClientConnection(conn net.Conn) {
	defer conn.Close()

	client := AutoRefClient{conn: conn, token: uuid.New()}
	client.ok()

	err := client.receiveRegistration(s)
	if err != nil {
		client.reject(err.Error())
		return
	}

	s.Clients[client.id] = client
	defer s.closeConnection(conn, client.id)
	log.Printf("Client %v connected", client.id)

	for {
		req := refproto.AutoRefToControllerRequest{}
		if err := sslconn.ReceiveMessage(conn, &req); err != nil {
			if err == io.EOF {
				return
			}
			log.Print(err)
			continue
		}
		if client.pubKey != nil {
			if err := client.verifyRequest(req); err != nil {
				client.reject(err.Error())
				continue
			}
		}
		if err := s.ProcessRequest(req); err != nil {
			client.reject(err.Error())
		} else {
			client.ok()
		}
	}
}

func (s *AutoRefServer) closeConnection(conn net.Conn, id string) {
	delete(s.Clients, id)
	log.Printf("Connection to %v closed", id)
}

func (c *AutoRefClient) reject(reason string) {
	log.Print("Reject connection: " + reason)
	reply := refproto.ControllerReply{}
	reply.StatusCode = new(refproto.ControllerReply_StatusCode)
	*reply.StatusCode = refproto.ControllerReply_REJECTED
	reply.Reason = new(string)
	*reply.Reason = reason
	if err := sslconn.SendMessage(c.conn, &reply); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (c *AutoRefClient) ok() {
	reply := refproto.ControllerReply{}
	reply.StatusCode = new(refproto.ControllerReply_StatusCode)
	*reply.StatusCode = refproto.ControllerReply_OK
	reply.Verification = new(refproto.ControllerReply_Verification)
	if c.token != "" {
		reply.NextToken = new(string)
		*reply.NextToken = c.token
		*reply.Verification = refproto.ControllerReply_VERIFIED
	} else {
		*reply.Verification = refproto.ControllerReply_UNVERIFIED
	}
	if err := sslconn.SendMessage(c.conn, &reply); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func readPublicKey(filename string) *rsa.PublicKey {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Print("Could not find private key at ", filename)
		return nil
	}
	p, rest := pem.Decode(b)
	if p == nil {
		log.Print("Could not decode public key. Remaining data: ", string(rest))
		return nil
	}
	if p.Type != "PUBLIC KEY" {
		log.Print("Public key type is wrong: ", p.Type)
		return nil
	}
	publicKey, err := x509.ParsePKIXPublicKey(p.Bytes)
	if err != nil {
		log.Print("Failed to parse public key: ", err)
		return nil
	}
	switch pub := publicKey.(type) {
	case *rsa.PublicKey:
		return pub
	default:
		log.Print("Unsupported public key: ", pub)
		return nil
	}
}

func verifySignature(key *rsa.PublicKey, message proto.Message, signature []byte) error {
	messageBytes, err := proto.Marshal(message)
	if err != nil {
		log.Fatal("Failed to marshal message: ", err)
	}
	hash := sha256.New()
	hash.Write(messageBytes)
	d := hash.Sum(nil)
	return rsa.VerifyPKCS1v15(key, crypto.SHA256, d, signature)
}
