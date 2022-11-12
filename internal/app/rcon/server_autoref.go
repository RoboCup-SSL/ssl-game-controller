package rcon

import (
	"bufio"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/google/uuid"
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
	s.loadDefaultTrustedKeys("auto_ref")
	return
}

func (c *AutoRefClient) receiveRegistration(reader *bufio.Reader, server *AutoRefServer) error {
	registration := AutoRefRegistration{}
	if err := sslconn.ReceiveMessage(reader, &registration); err != nil {
		return err
	}

	if registration.Identifier == nil || len(*registration.Identifier) < 1 {
		return errors.New("No identifier specified")
	}
	c.id = *registration.Identifier
	if _, exists := server.GetClient(c.id); exists {
		return errors.Errorf("AutoRef Client with given identifier already registered: %v", server.GetClientIds())
	}
	c.pubKey = server.trustedKeys[c.id]
	if c.pubKey != nil {
		if err := c.Client.verifyMessage(&registration); err != nil {
			return err
		}
	} else {
		c.token = ""
	}

	c.reply(c.Ok())

	return nil
}

func (s *AutoRefServer) handleClientConnection(conn net.Conn) {
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close autoRef client connection: %v", err)
		}
	}()

	reader := bufio.NewReaderSize(conn, 1)

	client := AutoRefClient{Client: &Client{conn: conn, token: uuid.NewString()}}
	client.reply(client.Ok())

	err := client.receiveRegistration(reader, s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.PutClient(client.id, client.Client)
	defer func() {
		s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
			delete(gcState.AutoRefState, client.id)
		})
		s.CloseConnection(client.id)
	}()

	log.Printf("AutoRef Client %v connected", client.id)
	s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
		s := new(engine.GcStateAutoRef)
		gcState.AutoRefState[client.id] = s
	})

	if _, ok := s.gcEngine.GetConfig().AutoRefConfigs[client.id]; !ok {
		cfg := new(engine.AutoRefConfig)
		cfg.GameEventBehavior = map[string]engine.AutoRefConfig_Behavior{}
		for _, event := range state.GameEventsForBehaviorConfig() {
			cfg.GameEventBehavior[event.String()] = engine.AutoRefConfig_BEHAVIOR_ACCEPT
		}
		s.gcEngine.UpdateConfig(&engine.Config{
			AutoRefConfigs: map[string]*engine.AutoRefConfig{client.id: cfg},
		})
	}

	for {
		req := AutoRefToController{}
		if err := sslconn.ReceiveMessage(reader, &req); err != nil {
			if err == io.EOF {
				return
			}
			log.Print(err)
			continue
		}
		if client.pubKey != nil {
			if err := client.verifyMessage(&req); err != nil {
				client.reply(client.Reject(err.Error()))
				continue
			}
		}
		if err := s.processRequest(client.id, &req); err != nil {
			client.reply(client.Reject(err.Error()))
		} else {
			client.reply(client.Ok())
		}
	}
}

func (c *AutoRefClient) reply(reply *ControllerReply) {
	msg := ControllerToAutoRef_ControllerReply{ControllerReply: reply}
	response := ControllerToAutoRef{Msg: &msg}
	if err := sslconn.SendMessage(c.conn, &response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (s *AutoRefServer) processRequest(id string, request *AutoRefToController) error {

	if request.GameEvent != nil {
		request.GameEvent.Origin = []string{id}
		s.gcEngine.EnqueueGameEvent(request.GameEvent)
	}

	return nil
}
