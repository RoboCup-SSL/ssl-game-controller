package rcon

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
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
	s.connectionHandler = s.handleClientConnection
	return
}

func (c *AutoRefClient) receiveRegistration(server *AutoRefServer) error {
	registration := AutoRefRegistration{}
	if err := sslconn.ReceiveMessage(c.conn, &registration); err != nil {
		return err
	}

	if registration.Identifier == nil || len(*registration.Identifier) < 1 {
		return errors.New("No identifier specified")
	}
	c.id = *registration.Identifier
	if _, exists := server.clients[c.id]; exists {
		var clients []string
		for k := range server.clients {
			clients = append(clients, k)
		}
		return errors.Errorf("Client with given identifier already registered: %v", clients)
	}
	c.pubKey = server.trustedKeys[c.id]
	if c.pubKey != nil {
		if err := c.verifyRegistration(registration); err != nil {
			return err
		}
	} else {
		c.token = ""
	}

	c.reply(c.Ok())

	return nil
}

func (c *AutoRefClient) verifyRegistration(registration AutoRefRegistration) error {
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
	err := VerifySignature(c.pubKey, &registration, signature)
	registration.Signature.Pkcs1V15 = signature
	if err != nil {
		return errors.New("Invalid signature")
	}
	c.token = uuid.New()
	return nil
}

func (c *AutoRefClient) verifyRequest(req AutoRefToController) error {
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
	err := VerifySignature(c.pubKey, &req, signature)
	req.Signature.Pkcs1V15 = signature
	if err != nil {
		return errors.Wrap(err, "Verification failed.")
	}
	c.token = uuid.New()
	return nil
}

func (s *AutoRefServer) handleClientConnection(conn net.Conn) {
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close autoRef client connection: %v", err)
		}
	}()

	client := AutoRefClient{Client: &Client{conn: conn, token: uuid.New()}}
	client.reply(client.Ok())

	err := client.receiveRegistration(s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.clients[client.id] = client.Client
	defer func() {
		s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
			delete(gcState.AutoRefState, client.id)
		})
		s.CloseConnection(client.id)
	}()

	log.Printf("Client %v connected", client.id)
	s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
		s := new(engine.GcStateAutoRef)
		gcState.AutoRefState[client.id] = s
	})

	for {
		req := AutoRefToController{}
		if err := sslconn.ReceiveMessage(conn, &req); err != nil {
			if err == io.EOF {
				return
			}
			log.Print(err)
			continue
		}
		if client.pubKey != nil {
			if err := client.verifyRequest(req); err != nil {
				client.reply(client.Reject(err.Error()))
				continue
			}
		}
		if err := s.processRequest(client.id, req); err != nil {
			client.reply(client.Reject(err.Error()))
		} else {
			client.reply(client.Ok())
		}
	}
}

func (c *AutoRefClient) reply(reply ControllerReply) {
	msg := ControllerToAutoRef_ControllerReply{ControllerReply: &reply}
	response := ControllerToAutoRef{Msg: &msg}
	if err := sslconn.SendMessage(c.conn, &response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (s *AutoRefServer) processRequest(id string, request AutoRefToController) error {

	if request.GameEvent != nil {
		request.GameEvent.Origin = []string{id}
		s.gcEngine.EnqueueGameEvent(request.GameEvent)
	}

	return nil
}
