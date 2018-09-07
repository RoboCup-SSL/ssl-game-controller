package rcon

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"github.com/odeke-em/go-uuid"
	"github.com/pkg/errors"
	"io"
	"log"
	"net"
)

type AutoRefServer struct {
	ProcessRequest func(refproto.AutoRefToControllerRequest) error
	Server
}

type AutoRefClient struct {
	Client
}

func NewAutoRefServer() (s AutoRefServer) {
	s.ProcessRequest = func(refproto.AutoRefToControllerRequest) error { return nil }
	s.Server = NewServer()
	s.ConnectionHandler = s.handleClientConnection
	return
}

func (c *AutoRefClient) receiveRegistration(server *AutoRefServer) error {
	registration := refproto.AutoRefRegistration{}
	sslconn.ReceiveMessage(c.Conn, &registration)

	if registration.Identifier == nil || len(*registration.Identifier) < 1 {
		return errors.New("No identifier specified")
	}
	c.Id = *registration.Identifier
	if _, exists := server.Clients[c.Id]; exists {
		return errors.New("Client with given identifier already registered: " + c.Id)
	}
	c.PubKey = server.TrustedKeys[c.Id]
	if c.PubKey != nil {
		err := c.verifyRegistration(registration)
		if err != nil {
			return err
		}
	} else {
		c.Token = ""
	}

	c.Ok()

	return nil
}

func (c *AutoRefClient) verifyRegistration(registration refproto.AutoRefRegistration) error {
	if registration.Signature == nil {
		return errors.New("Missing signature")
	}
	if registration.Signature.Token == nil || *registration.Signature.Token != c.Token {
		sendToken := ""
		if registration.Signature.Token != nil {
			sendToken = *registration.Signature.Token
		}
		return errors.Errorf("Client %v sent an invalid token: %v != %v", c.Id, sendToken, c.Token)
	}
	signature := registration.Signature.Pkcs1V15
	registration.Signature.Pkcs1V15 = []byte{}
	err := VerifySignature(c.PubKey, &registration, signature)
	registration.Signature.Pkcs1V15 = signature
	if err != nil {
		return errors.New("Invalid signature")
	}
	c.Token = uuid.New()
	return nil
}

func (c *AutoRefClient) verifyRequest(req refproto.AutoRefToControllerRequest) error {
	if req.Signature == nil {
		return errors.New("Missing signature")
	}
	if req.Signature.Token == nil || *req.Signature.Token != c.Token {
		sendToken := ""
		if req.Signature.Token != nil {
			sendToken = *req.Signature.Token
		}
		return errors.Errorf("Invalid token: %v != %v", sendToken, c.Token)
	}
	signature := req.Signature.Pkcs1V15
	req.Signature.Pkcs1V15 = []byte{}
	err := VerifySignature(c.PubKey, &req, signature)
	req.Signature.Pkcs1V15 = signature
	if err != nil {
		return errors.Wrap(err, "Verification failed.")
	}
	c.Token = uuid.New()
	return nil
}

func (s *AutoRefServer) handleClientConnection(conn net.Conn) {
	defer conn.Close()

	client := AutoRefClient{Client: Client{Conn: conn, Token: uuid.New()}}
	client.Ok()

	err := client.receiveRegistration(s)
	if err != nil {
		client.Reject(err.Error())
		return
	}

	s.Clients[client.Id] = client.Client
	defer s.CloseConnection(conn, client.Id)
	log.Printf("Client %v connected", client.Id)

	for {
		req := refproto.AutoRefToControllerRequest{}
		if err := sslconn.ReceiveMessage(conn, &req); err != nil {
			if err == io.EOF {
				return
			}
			log.Print(err)
			continue
		}
		if client.PubKey != nil {
			if err := client.verifyRequest(req); err != nil {
				client.Reject(err.Error())
				continue
			}
		}
		if err := s.ProcessRequest(req); err != nil {
			client.Reject(err.Error())
		} else {
			client.Ok()
		}
	}
}
