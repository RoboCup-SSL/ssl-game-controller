package rcon

import (
	"crypto"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/tls"
	"crypto/x509"
	"encoding/pem"
	"github.com/golang/protobuf/proto"
	"github.com/odeke-em/go-uuid"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"net"
	"os"
	"strings"
)

type Server struct {
	Tls               bool
	address           string
	clients           map[string]*Client
	trustedKeys       map[string]*rsa.PublicKey
	connectionHandler func(net.Conn)
	listener          net.Listener
}

type Client struct {
	id                 string
	conn               net.Conn
	token              string
	pubKey             *rsa.PublicKey
	verifiedConnection bool
}

type SignedMessage interface {
	GetSignature() *Signature
	proto.Message
}

func NewServer(address string) (s *Server) {
	s = new(Server)
	s.address = address
	s.clients = map[string]*Client{}
	s.trustedKeys = map[string]*rsa.PublicKey{}
	return
}

func (s *Server) Start() {
	var err error
	if s.Tls {
		s.listener, err = s.createTlsListener()
	} else {
		s.listener, err = s.createListener()
	}
	if err != nil {
		log.Printf("Failed to listen on %v: %v", s.address, err)
		return
	}
	go s.listen()
}

func (s *Server) Stop() {
	if err := s.listener.Close(); err != nil {
		log.Printf("Could not close listener: %v", err)
	}
	for id := range s.clients {
		s.CloseConnection(id)
	}
}

func (s *Server) listen() {
	log.Print("Listening on ", s.address)

	for {
		conn, err := s.listener.Accept()
		if err != nil {
			log.Print("Could not accept connection: ", err)
		} else {
			go s.connectionHandler(conn)
		}
	}
}

func (s *Server) createListener() (net.Listener, error) {
	return net.Listen("tcp", s.address)
}

func (s *Server) createTlsListener() (net.Listener, error) {
	config, err := s.loadTlsConfig()
	if err != nil {
		return nil, err
	}

	return tls.Listen("tcp", s.address, config)
}

func (s *Server) loadTlsConfig() (*tls.Config, error) {
	if _, err := os.Stat("server.crt"); os.IsNotExist(err) {
		return nil, errors.Wrap(err, "Missing certificate for TLS endpoint. Put a server.crt in the working dir")
	}
	if _, err := os.Stat("server.key"); os.IsNotExist(err) {
		return nil, errors.Wrap(err, "Missing certificate key for TLS endpoint. Put a server.key in the working dir")
	}

	cer, err := tls.LoadX509KeyPair("server.crt", "server.key")
	if err != nil {
		return nil, errors.Wrap(err, "Could not load X509 key pair")
	}

	config := &tls.Config{Certificates: []tls.Certificate{cer}}
	return config, nil
}

func (s *Server) CloseConnection(id string) {
	delete(s.clients, id)
	log.Printf("Connection to %v closed", id)
}

func (c *Client) Ok() (reply ControllerReply) {
	reply.StatusCode = new(ControllerReply_StatusCode)
	*reply.StatusCode = ControllerReply_OK
	c.addVerification(&reply)
	return
}

func (c *Client) addVerification(reply *ControllerReply) {
	reply.Verification = new(ControllerReply_Verification)
	if c.token != "" {
		reply.NextToken = new(string)
		*reply.NextToken = c.token
		*reply.Verification = ControllerReply_VERIFIED
		c.verifiedConnection = true
	} else {
		*reply.Verification = ControllerReply_UNVERIFIED
		c.verifiedConnection = false
	}
}

func (c *Client) Reject(reason string) (reply ControllerReply) {
	log.Print("Reject request: " + reason)
	reply.StatusCode = new(ControllerReply_StatusCode)
	*reply.StatusCode = ControllerReply_REJECTED
	reply.Reason = new(string)
	*reply.Reason = reason
	c.addVerification(&reply)
	return
}

func (s *Server) LoadTrustedKeys(trustedKeysDir string) {
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

func VerifySignature(key *rsa.PublicKey, message proto.Message, signature []byte) error {
	messageBytes, err := proto.Marshal(message)
	if err != nil {
		log.Fatal("Failed to marshal message: ", err)
	}
	hash := sha256.New()
	hash.Write(messageBytes)
	d := hash.Sum(nil)
	return rsa.VerifyPKCS1v15(key, crypto.SHA256, d, signature)
}

func (c *Client) verifyMessage(message SignedMessage) error {
	signature := message.GetSignature()
	if signature == nil {
		return errors.New("Missing signature")
	}
	if signature.Token == nil || *signature.Token != c.token {
		sendToken := ""
		if signature.Token != nil {
			sendToken = *signature.Token
		}
		return errors.Errorf("Client %v sent an invalid token: %v != %v", c.id, sendToken, c.token)
	}
	sig := signature.Pkcs1V15
	signature.Pkcs1V15 = []byte{}
	err := VerifySignature(c.pubKey, message, sig)
	signature.Pkcs1V15 = sig
	if err != nil {
		return errors.New("Invalid signature")
	}
	c.token = uuid.New()
	return nil
}
