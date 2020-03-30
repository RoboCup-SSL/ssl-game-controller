package rcon

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslconn"
	"github.com/golang/protobuf/proto"
	"github.com/odeke-em/go-uuid"
	"github.com/pkg/errors"
	"io"
	"log"
	"net"
)

type TeamServer struct {
	gcEngine *engine.Engine
	*Server
}

type TeamClient struct {
	*Client
}

func NewTeamServer(address string, gcEngine *engine.Engine) (s *TeamServer) {
	s = new(TeamServer)
	s.gcEngine = gcEngine
	s.Server = NewServer(address)
	s.connectionHandler = s.handleClientConnection
	return
}

func (c *TeamClient) receiveRegistration(server *TeamServer) error {
	registration := TeamRegistration{}
	if err := sslconn.ReceiveMessage(c.conn, &registration); err != nil {
		return err
	}

	var allowedTeamNames []string
	for _, teamInfo := range server.gcEngine.CurrentState().TeamState {
		allowedTeamNames = append(allowedTeamNames, *teamInfo.Name)
	}

	if registration.TeamName == nil {
		return errors.New("No team name specified")
	}
	if !isAllowedTeamName(*registration.TeamName, allowedTeamNames) {
		return errors.Errorf("Invalid team name: '%v'. Expecting one of these: %v", *registration.TeamName, allowedTeamNames)
	}
	c.id = *registration.TeamName
	if _, exists := server.clients[c.id]; exists {
		return errors.New("Team with given name already registered: " + c.id)
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

	c.reply(c.Ok())

	log.Printf("Team %v connected.", *registration.TeamName)

	return nil
}

func isAllowedTeamName(teamName string, allowed []string) bool {
	for _, name := range allowed {
		if name == teamName {
			return true
		}
	}
	return false
}

func (c *TeamClient) verifyRegistration(registration TeamRegistration) error {
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

func (c *TeamClient) verifyRequest(req TeamToController) error {
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

func (s *TeamServer) handleClientConnection(conn net.Conn) {
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close team client connection: %v", err)
		}
	}()

	client := TeamClient{Client: &Client{conn: conn, token: uuid.New()}}
	client.reply(client.Ok())

	err := client.receiveRegistration(s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.clients[client.id] = client.Client
	defer func() {
		s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
			team := s.gcEngine.CurrentState().TeamByName(client.id)
			if teamState, ok := gcState.TeamState[team.String()]; ok {
				connected := false
				teamState.Connected = &connected
				teamState.ConnectionVerified = &connected
			}
		})
		s.CloseConnection(client.id)
	}()

	log.Printf("Client %v connected", client.id)
	s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
		team := s.gcEngine.CurrentState().TeamByName(client.id)
		if teamState, ok := gcState.TeamState[team.String()]; ok {
			connected := true
			teamState.Connected = &connected
			teamState.ConnectionVerified = &client.verifiedConnection
		}
	})

	for {
		req := TeamToController{}
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

func (s *TeamServer) SendRequest(teamName string, request ControllerToTeam) error {
	if client, ok := s.clients[teamName]; ok {
		return client.SendRequest(request)
	}
	return errors.Errorf("Client '%v' not connected", teamName)
}

func (c *Client) SendRequest(request ControllerToTeam) error {
	return sslconn.SendMessage(c.conn, &request)
}

func (c *Client) reply(reply ControllerReply) {
	msg := ControllerToTeam_ControllerReply{ControllerReply: &reply}
	response := ControllerToTeam{Msg: &msg}
	if err := sslconn.SendMessage(c.conn, &response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (s *TeamServer) processRequest(teamName string, request TeamToController) error {

	if request.GetPing() {
		return nil
	}

	log.Print("Received request from team: ", proto.MarshalTextString(&request))

	currentState := s.gcEngine.CurrentState()
	team := currentState.TeamByName(teamName)
	if team == state.Team_UNKNOWN {
		return errors.New("Your team is not playing?!")
	}

	teamState := *currentState.TeamInfo(team)

	if x, ok := request.GetMsg().(*TeamToController_SubstituteBot); ok {
		if *teamState.BotSubstitutionIntent != x.SubstituteBot {
			log.Printf("Team %v requests to change bot substituation intent to %v", team, x.SubstituteBot)
			s.gcEngine.Enqueue(&statemachine.Change{
				Origin: &teamName,
				Change: &statemachine.Change_UpdateTeamState{
					UpdateTeamState: &statemachine.UpdateTeamState{
						ForTeam:               &team,
						BotSubstitutionIntent: &x.SubstituteBot,
					}},
			})
		}
		return nil
	}

	var mayChangeKeeper *bool
	for _, t := range s.gcEngine.CurrentGcState().AutoRefState {
		aMayChangeKeeper := t.TeamState[team.String()].MayChangeKeeper
		if aMayChangeKeeper != nil && *aMayChangeKeeper {
			mayChangeKeeper = aMayChangeKeeper
		}
	}

	if (currentState.Command.IsRunning() || currentState.Command.IsPrepare()) &&
		mayChangeKeeper != nil && !*mayChangeKeeper {
		return errors.New("Ball is in play and not at a position that allows changing the keeper.")
	}

	if x, ok := request.GetMsg().(*TeamToController_DesiredKeeper); ok {
		if *teamState.Goalkeeper != x.DesiredKeeper {
			log.Printf("Team %v requests to change keeper to %v", team, x.DesiredKeeper)
			s.gcEngine.Enqueue(&statemachine.Change{
				Origin: &teamName,
				Change: &statemachine.Change_UpdateTeamState{
					UpdateTeamState: &statemachine.UpdateTeamState{
						ForTeam:    &team,
						Goalkeeper: &x.DesiredKeeper,
					}},
			})
		}
	}

	return nil
}
