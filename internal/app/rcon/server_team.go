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
		if err := c.Client.verifyMessage(&registration); err != nil {
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
		team := s.gcEngine.CurrentState().TeamByName(client.id)
		s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
			if teamState, ok := gcState.TeamState[team.String()]; ok {
				connected := false
				teamState.Connected = &connected
				teamState.ConnectionVerified = &connected
			}
		})
		s.CloseConnection(client.id)
	}()

	log.Printf("Team Client %v connected", client.id)
	team := s.gcEngine.CurrentState().TeamByName(client.id)
	s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
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
			if err := client.verifyMessage(&req); err != nil {
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
		return sslconn.SendMessage(client.conn, &request)
	}
	return errors.Errorf("Team Client '%v' not connected", teamName)
}

func (c *TeamClient) reply(reply ControllerReply) {
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
		if *timeSet(teamState.RequestsBotSubstitutionSince) != x.SubstituteBot {
			log.Printf("Team %v requests to change bot substituation intent to %v", team, x.SubstituteBot)
			s.gcEngine.Enqueue(&statemachine.Change{
				Origin: &teamName,
				Change: &statemachine.Change_UpdateTeamState{
					UpdateTeamState: &statemachine.UpdateTeamState{
						ForTeam:                 &team,
						RequestsBotSubstitution: &x.SubstituteBot,
					}},
			})
		}
		return nil
	}

	if x, ok := request.GetMsg().(*TeamToController_DesiredKeeper); ok && *teamState.Goalkeeper != x.DesiredKeeper {
		if currentState.Command.IsRunning() || currentState.Command.IsPrepare() {
			return errors.New("Can not change keeper while game is running.")
		}

		if err := mayChangeKeeper(s.gcEngine.CurrentGcState(), &teamState); err != nil {
			return errors.Wrap(err, "Team requests to change keeper, but: ")
		}
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

	return nil
}

func mayChangeKeeper(gcState *engine.GcState, teamState *state.TeamInfo) error {
	ball := gcState.TrackerStateGc.Ball
	if ball == nil {
		return errors.New("GC does not know the ball position.")
	}
	if (*teamState.OnPositiveHalf && *ball.Pos.X > 0) ||
		(!*teamState.OnPositiveHalf && *ball.Pos.X < 0) {
		return errors.New("Ball is not in the opponents half.")
	}
	return nil
}
