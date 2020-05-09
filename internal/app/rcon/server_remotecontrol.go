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

type RemoteControlServer struct {
	gcEngine *engine.Engine
	*Server
}

type RemoteControlClient struct {
	gcEngine *engine.Engine
	team     *state.Team
	*Client
}

func NewRemoteControlServer(address string, gcEngine *engine.Engine) (s *RemoteControlServer) {
	s = new(RemoteControlServer)
	s.gcEngine = gcEngine
	s.Server = NewServer(address)
	s.connectionHandler = s.handleClientConnection
	return
}

func (c *RemoteControlClient) receiveRegistration(server *RemoteControlServer) error {
	registration := RemoteControlRegistration{}
	if err := sslconn.ReceiveMessage(c.conn, &registration); err != nil {
		return err
	}

	if registration.Team == nil {
		return errors.New("No team specified")
	}
	if !registration.Team.Known() {
		return errors.Errorf("Invalid team: '%v'", registration.Team.String())
	}
	c.team = registration.Team
	c.id = registration.Team.String()
	if _, exists := server.clients[c.id]; exists {
		return errors.New("Team already registered: " + c.id)
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

	log.Printf("Team %v connected.", registration.Team.String())

	return nil
}

func (s *RemoteControlServer) handleClientConnection(conn net.Conn) {
	defer func() {
		if err := conn.Close(); err != nil {
			log.Printf("Could not close remote control client connection: %v", err)
		}
	}()

	client := RemoteControlClient{
		Client:   &Client{conn: conn, token: uuid.New()},
		gcEngine: s.gcEngine,
	}
	client.reply(client.Ok())

	err := client.receiveRegistration(s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.clients[client.id] = client.Client
	defer func() {
		s.updateConnectionState(client, false)
		s.CloseConnection(client.id)
	}()

	log.Printf("Remote control Client %v connected", client.id)
	s.updateConnectionState(client, true)

	for {
		req := RemoteControlToController{}
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
		if err := s.processRequest(*client.team, req); err != nil {
			client.reply(client.Reject(err.Error()))
		} else {
			client.reply(client.Ok())
		}
	}
}

func (s *RemoteControlServer) updateConnectionState(client RemoteControlClient, connected bool) {
	s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
		if teamState, ok := gcState.TeamState[client.team.String()]; ok {
			teamState.RemoteControlConnected = &connected
			teamState.RemoteControlConnectionVerified = &client.verifiedConnection
		}
	})
}

func (s *RemoteControlServer) SendRequest(teamName string, request ControllerToRemoteControl) error {
	if client, ok := s.clients[teamName]; ok {
		return sslconn.SendMessage(client.conn, &request)
	}
	return errors.Errorf("Remote control client '%v' not connected", teamName)
}

func (c *RemoteControlClient) reply(reply ControllerReply) {
	response := ControllerToRemoteControl{ControllerReply: &reply}

	teamState := c.gcEngine.CurrentState().TeamState[c.team.String()]
	response.Keeper = teamState.Goalkeeper
	response.SubstituteBot = teamState.RequestsBotSubstitution
	response.EmergencyStop = teamState.RequestsEmergencyStop
	response.Timeout = teamState.RequestsTimeout
	response.ChallengeFlag = teamState.RequestsChallenge

	if err := sslconn.SendMessage(c.conn, &response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (s *RemoteControlServer) processRequest(team state.Team, request RemoteControlToController) error {

	if request.GetPing() {
		return nil
	}

	log.Print("Received request from remote-control: ", proto.MarshalTextString(&request))

	currentState := s.gcEngine.CurrentState()
	teamState := *currentState.TeamInfo(team)

	if x, ok := request.GetMsg().(*RemoteControlToController_DesiredKeeper); ok && *teamState.Goalkeeper != x.DesiredKeeper {
		if err := mayChangeKeeper(s.gcEngine.CurrentGcState(), &teamState); err != nil {
			return errors.Wrap(err, "Remote control requests to change keeper, but: ")
		}
		s.updateTeamConfig(team, &statemachine.UpdateTeamState{
			Goalkeeper: &x.DesiredKeeper,
		})
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_SubstituteBot); ok {
		if *teamState.RequestsBotSubstitution != x.SubstituteBot {
			s.updateTeamConfig(team, &statemachine.UpdateTeamState{
				RequestsBotSubstitution: &x.SubstituteBot,
			})
		}
		return nil
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_Timeout); ok {
		if *teamState.RequestsTimeout != x.Timeout {
			s.updateTeamConfig(team, &statemachine.UpdateTeamState{
				RequestsTimeout: &x.Timeout,
			})
		}
		return nil
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_ChallengeFlag); ok {
		if *teamState.RequestsChallenge != x.ChallengeFlag {
			s.updateTeamConfig(team, &statemachine.UpdateTeamState{
				RequestsChallenge: &x.ChallengeFlag,
			})
		}
		return nil
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_EmergencyStop); ok {
		// note: emergency stop can not be disabled again
		if x.EmergencyStop {
			s.updateTeamConfig(team, &statemachine.UpdateTeamState{
				RequestsEmergencyStop: &x.EmergencyStop,
			})
		}
		return nil
	}

	return nil
}

func (s *RemoteControlServer) updateTeamConfig(team state.Team, update *statemachine.UpdateTeamState) {
	origin := "Remote Control " + team.String()
	update.ForTeam = &team
	s.gcEngine.Enqueue(&statemachine.Change{
		Origin: &origin,
		Change: &statemachine.Change_UpdateTeamState{
			UpdateTeamState: update,
		},
	})
}
