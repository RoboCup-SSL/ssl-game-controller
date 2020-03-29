package rcon

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"github.com/odeke-em/go-uuid"
	"github.com/pkg/errors"
	"io"
	"log"
	"net"
)

type AutoRefServer struct {
	gcEngine *engine.Engine
	*Server
}

type AutoRefClient struct {
	*Client
}

func NewAutoRefServer(address string, gcEngine *engine.Engine) (s *AutoRefServer) {
	s = new(AutoRefServer)
	s.gcEngine = gcEngine
	s.Server = NewServer(address)
	s.ConnectionHandler = s.handleClientConnection
	return
}

func (c *AutoRefClient) receiveRegistration(server *AutoRefServer) error {
	registration := AutoRefRegistration{}
	if err := sslconn.ReceiveMessage(c.Conn, &registration); err != nil {
		return err
	}

	if registration.Identifier == nil || len(*registration.Identifier) < 1 {
		return errors.New("No identifier specified")
	}
	c.Id = *registration.Identifier
	if _, exists := server.Clients[c.Id]; exists {
		var clients []string
		for k := range server.Clients {
			clients = append(clients, k)
		}
		return errors.Errorf("Client with given identifier already registered: %v", clients)
	}
	c.PubKey = server.TrustedKeys[c.Id]
	if c.PubKey != nil {
		if err := c.verifyRegistration(registration); err != nil {
			return err
		}
	} else {
		c.Token = ""
	}

	c.reply(c.Ok())

	return nil
}

func (c *AutoRefClient) verifyRegistration(registration AutoRefRegistration) error {
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

func (c *AutoRefClient) verifyRequest(req AutoRefToController) error {
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
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close autoRef client connection: %v", err)
		}
	}()

	client := AutoRefClient{Client: &Client{Conn: conn, Token: uuid.New()}}
	client.reply(client.Ok())

	err := client.receiveRegistration(s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.Clients[client.Id] = client.Client
	defer s.CloseConnection(client.Id)
	log.Printf("Client %v connected", client.Id)
	for _, observer := range s.ClientsChangedObservers {
		observer()
	}

	for {
		req := AutoRefToController{}
		if err := sslconn.ReceiveMessage(conn, &req); err != nil {
			if err == io.EOF {
				return
			}
			log.Print(err)
			continue
		}
		if client.PubKey != nil {
			if err := client.verifyRequest(req); err != nil {
				client.reply(client.Reject(err.Error()))
				continue
			}
		}
		if err := s.processRequest(client.Id, req); err != nil {
			client.reply(client.Reject(err.Error()))
		} else {
			client.reply(client.Ok())
		}
	}
}

func (c *AutoRefClient) reply(reply ControllerReply) {
	msg := ControllerToAutoRef_ControllerReply{ControllerReply: &reply}
	response := ControllerToAutoRef{Msg: &msg}
	if err := sslconn.SendMessage(c.Conn, &response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (s *AutoRefServer) processRequest(id string, request AutoRefToController) error {

	if request.GameEvent != nil {
		s.gcEngine.Enqueue(&statemachine.Change{
			Origin: &id,
			Change: &statemachine.Change_AddGameEvent{
				AddGameEvent: &statemachine.AddGameEvent{
					GameEvent: request.GameEvent,
				}},
		})
	}

	return nil
}
