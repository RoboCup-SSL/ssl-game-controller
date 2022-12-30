package rcon

import (
	"crypto"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"embed"
	"encoding/pem"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"google.golang.org/protobuf/proto"
	"log"
	"net"
	"os"
	"strings"
	"sync"
)

//go:embed trusted_keys/**/*
var defaultTrustKeys embed.FS

type Server struct {
	address           string
	clients           map[string]*Client
	trustedKeys       map[string]*rsa.PublicKey
	connectionHandler func(net.Conn)
	listener          net.Listener
	running           bool
	mutex             sync.Mutex
	clientsMutex      sync.Mutex
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
	s.running = true
	s.listener, err = s.createListener()
	if err != nil {
		s.running = false
		log.Printf("Failed to listen on %v: %v", s.address, err)
		return
	}
	go s.listen()
}

func (s *Server) Stop() {
	if s.listener == nil {
		return
	}
	s.mutex.Lock()
	defer s.mutex.Unlock()
	s.running = false
	if err := s.listener.Close(); err != nil {
		log.Printf("Could not close listener: %v", err)
	}
	for _, id := range s.GetClientIds() {
		s.CloseConnection(id)
	}
	s.listener = nil
}

func (s *Server) GetClient(id string) (*Client, bool) {
	s.clientsMutex.Lock()
	defer s.clientsMutex.Unlock()
	client, ok := s.clients[id]
	return client, ok
}

func (s *Server) PutClient(id string, client *Client) {
	s.clientsMutex.Lock()
	defer s.clientsMutex.Unlock()
	s.clients[id] = client
}

func (s *Server) GetClientIds() []string {
	s.clientsMutex.Lock()
	defer s.clientsMutex.Unlock()
	var clients []string
	for k := range s.clients {
		clients = append(clients, k)
	}
	return clients
}

func (s *Server) listen() {
	log.Print("Listening on ", s.address)

	for s.isRunning() {
		conn, err := s.listener.Accept()
		if err != nil {
			log.Print("Could not accept connection: ", err)
		} else {
			go s.connectionHandler(conn)
		}
	}
}

func (s *Server) isRunning() bool {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	return s.running
}

func (s *Server) createListener() (net.Listener, error) {
	return net.Listen("tcp", s.address)
}

func (s *Server) CloseConnection(id string) {
	s.clientsMutex.Lock()
	defer s.clientsMutex.Unlock()
	delete(s.clients, id)
	log.Printf("Connection to %v closed", id)
}

func (c *Client) Ok() (reply *ControllerReply) {
	reply = new(ControllerReply)
	reply.StatusCode = new(ControllerReply_StatusCode)
	*reply.StatusCode = ControllerReply_OK
	c.addVerification(reply)
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

func (c *Client) Reject(reason string) (reply *ControllerReply) {
	log.Print("Reject request: " + reason)
	reply = new(ControllerReply)
	reply.StatusCode = new(ControllerReply_StatusCode)
	*reply.StatusCode = ControllerReply_REJECTED
	reply.Reason = new(string)
	*reply.Reason = reason
	c.addVerification(reply)
	return
}

func (s *Server) loadDefaultTrustedKeys(dirName string) {
	baseDir := "trusted_keys/" + dirName
	defaultFiles, err := defaultTrustKeys.ReadDir(baseDir)
	if err != nil {
		log.Print("Could not read default trusted keys: ", err)
	} else {
		for _, file := range defaultFiles {
			if !file.IsDir() {
				b, err := defaultTrustKeys.ReadFile(baseDir + "/" + file.Name())
				if err != nil {
					log.Print("Could not read default public key", err)
				} else {
					s.LoadTrustedKey(file.Name(), b)
				}
			}
		}
	}
	log.Printf("Loaded %v embedded public keys", len(s.trustedKeys))
}

func (s *Server) LoadTrustedKeys(trustedKeysDir string) {
	if _, err := os.Stat(trustedKeysDir); errors.Is(err, os.ErrNotExist) {
		return
	}
	files, err := os.ReadDir(trustedKeysDir)
	if err != nil {
		log.Print("Could not read trusted keys: ", err)
		return
	}
	for _, file := range files {
		if !file.IsDir() {
			fullPath := trustedKeysDir + "/" + file.Name()
			b, err := os.ReadFile(fullPath)
			if err != nil {
				log.Print("Could not read public key at ", fullPath)
			} else {
				s.LoadTrustedKey(file.Name(), b)
			}
		}
	}
	log.Printf("Loaded %v public keys", len(s.trustedKeys))
}

func (s *Server) LoadTrustedKey(filename string, data []byte) {
	if strings.HasSuffix(filename, ".pub.pem") {
		pubKey := readPublicKey(data)
		if pubKey != nil {
			name := strings.Replace(filename, ".pub.pem", "", 1)
			s.trustedKeys[name] = pubKey
			log.Printf("Loaded public key for %v", name)
		}
	}
}

func readPublicKey(b []byte) *rsa.PublicKey {
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
	c.token = uuid.NewString()
	return nil
}
