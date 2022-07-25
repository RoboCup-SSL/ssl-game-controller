package rcon

import (
	"bufio"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/google/uuid"
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

func (c *RemoteControlClient) receiveRegistration(reader *bufio.Reader, server *RemoteControlServer) error {
	registration := RemoteControlRegistration{}
	if err := sslconn.ReceiveMessage(reader, &registration); err != nil {
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
	if _, exists := server.GetClient(c.id); exists {
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

	reader := bufio.NewReaderSize(conn, 1)

	client := RemoteControlClient{
		Client:   &Client{conn: conn, token: uuid.NewString()},
		gcEngine: s.gcEngine,
	}
	client.reply(client.Ok())

	err := client.receiveRegistration(reader, s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.PutClient(client.id, client.Client)
	defer func() {
		s.updateConnectionState(client, false)
		s.CloseConnection(client.id)
	}()

	log.Printf("Remote control Client %v connected", client.id)
	s.updateConnectionState(client, true)

	for {
		req := RemoteControlToController{}
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
		if err := client.processRequest(&req); err != nil {
			client.reply(client.Reject(err.Error()))
		} else {
			client.replyWithState(client.Ok())
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

func (s *RemoteControlServer) SendRequest(teamName string, request *ControllerToRemoteControl) error {
	if client, ok := s.GetClient(teamName); ok {
		return sslconn.SendMessage(client.conn, request)
	}
	return errors.Errorf("Remote control client '%v' not connected", teamName)
}

func (c *RemoteControlClient) reply(reply *ControllerReply) {
	response := &ControllerToRemoteControl{
		ControllerReply: reply,
	}

	if err := sslconn.SendMessage(c.conn, response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (c *RemoteControlClient) replyWithState(reply *ControllerReply) {
	teamState := c.gcEngine.CurrentState().TeamState[c.team.String()]
	emergencyStopIn := c.findEmergencyStopDueIn()
	yellowCardsDue := c.findYellowCardDueTimes()
	availableRequests := c.findAvailableRequestTypes()
	activeRequests := c.findActiveRequestTypes()
	robotsOnField := c.gcEngine.CurrentGcState().TrackerStateGc.NumTeamRobots(*c.team)

	response := &ControllerToRemoteControl{
		State: &RemoteControlTeamState{
			KeeperId:           teamState.Goalkeeper,
			AvailableRequests:  availableRequests,
			ActiveRequests:     activeRequests,
			EmergencyStopIn:    &emergencyStopIn,
			TimeoutsLeft:       teamState.TimeoutsLeft,
			ChallengeFlagsLeft: teamState.ChallengeFlags,
			MaxRobots:          teamState.MaxAllowedBots,
			RobotsOnField:      &robotsOnField,
			YellowCardsDue:     yellowCardsDue,
		},
		ControllerReply: reply,
	}

	if err := sslconn.SendMessage(c.conn, response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (c *RemoteControlClient) findEmergencyStopDueIn() float32 {
	emergencyStopDueIn := c.gcEngine.EmergencyStopDueIn(*c.team)
	var emergencyStopIn float32
	if emergencyStopDueIn != nil {
		emergencyStopIn = float32(emergencyStopDueIn.Seconds())
	}
	return emergencyStopIn
}

func (c *RemoteControlClient) findYellowCardDueTimes() []float32 {
	teamState := c.gcEngine.CurrentState().TeamState[c.team.String()]
	var yellowCardsDue []float32
	for _, yc := range teamState.YellowCards {
		if yc.TimeRemaining != nil && yc.TimeRemaining.AsDuration() > 0 {
			yellowCardsDue = append(yellowCardsDue, float32(yc.TimeRemaining.AsDuration().Seconds()))
		}
	}
	return yellowCardsDue
}

func (c *RemoteControlClient) findActiveRequestTypes() []RemoteControlRequestType {
	currentState := c.gcEngine.CurrentState()
	teamState := currentState.TeamState[c.team.String()]

	var activeRequests []RemoteControlRequestType
	if teamState.RequestsBotSubstitutionSince != nil {
		activeRequests = append(activeRequests, RemoteControlRequestType_ROBOT_SUBSTITUTION)
	}
	if teamState.RequestsTimeoutSince != nil {
		activeRequests = append(activeRequests, RemoteControlRequestType_TIMEOUT)
	}
	if currentState.HasGameEventByTeam(state.GameEvent_CHALLENGE_FLAG, *c.team) {
		activeRequests = append(activeRequests, RemoteControlRequestType_CHALLENGE_FLAG)
	}
	if teamState.RequestsEmergencyStopSince != nil {
		activeRequests = append(activeRequests, RemoteControlRequestType_EMERGENCY_STOP)
	}
	return activeRequests
}

func (c *RemoteControlClient) findAvailableRequestTypes() []RemoteControlRequestType {
	var availableRequests []RemoteControlRequestType
	if c.checkRequestEmergencyStop() == nil {
		availableRequests = append(availableRequests, RemoteControlRequestType_EMERGENCY_STOP)
	}
	if c.checkRequestTimeout() == nil {
		availableRequests = append(availableRequests, RemoteControlRequestType_TIMEOUT)
	}
	if c.checkRequestRobotSubstitution() == nil {
		availableRequests = append(availableRequests, RemoteControlRequestType_ROBOT_SUBSTITUTION)
	}
	if c.checkRequestChallengeFlag() == nil {
		availableRequests = append(availableRequests, RemoteControlRequestType_CHALLENGE_FLAG)
	}
	if c.checkChangeKeeper() == nil {
		availableRequests = append(availableRequests, RemoteControlRequestType_CHANGE_KEEPER_ID)
	}
	return availableRequests
}

func (c *RemoteControlClient) checkRequestEmergencyStop() error {
	gameStateType := *c.gcEngine.CurrentState().GameState.Type
	switch gameStateType {
	case state.GameState_RUNNING,
		state.GameState_KICKOFF,
		state.GameState_PENALTY,
		state.GameState_FREE_KICK:
		return nil
	}
	return errors.Errorf("Game state is invalid: %s", gameStateType)
}

func (c *RemoteControlClient) checkRequestTimeout() error {
	gameStateType := *c.gcEngine.CurrentState().GameState.Type
	if gameStateType == state.GameState_TIMEOUT {
		return errors.New("Timeout is active")
	}
	if *c.gcEngine.CurrentState().TeamState[c.team.String()].TimeoutsLeft <= 0 {
		return errors.New("No timeouts left")
	}
	return nil
}

func (c *RemoteControlClient) checkRequestRobotSubstitution() error {
	gameStateType := *c.gcEngine.CurrentState().GameState.Type
	if gameStateType == state.GameState_HALT {
		return errors.New("Game is halted")
	}
	return nil
}

func (c *RemoteControlClient) checkRequestChallengeFlag() error {
	currentState := c.gcEngine.CurrentState()
	teamState := currentState.TeamState[c.team.String()]
	if currentState.HasGameEventByTeam(state.GameEvent_CHALLENGE_FLAG, *c.team) {
		return errors.New("Challenge flag already requested")
	}
	if *teamState.ChallengeFlags <= 0 {
		return errors.New("No more challenge flags left")
	} else if *teamState.TimeoutsLeft <= 0 {
		return errors.New("No more timeouts left")
	}
	return nil
}

func (c *RemoteControlClient) checkChangeKeeper() error {
	currentState := c.gcEngine.CurrentState()
	teamState := currentState.TeamState[c.team.String()]
	return mayChangeKeeper(c.gcEngine.CurrentGcState(), currentState, teamState)
}

func (c *RemoteControlClient) processRequest(request *RemoteControlToController) error {

	currentState := c.gcEngine.CurrentState()
	teamState := currentState.TeamInfo(*c.team)

	if x, ok := request.GetMsg().(*RemoteControlToController_DesiredKeeper); ok && *teamState.Goalkeeper != x.DesiredKeeper {
		if err := mayChangeKeeper(c.gcEngine.CurrentGcState(), currentState, teamState); err != nil {
			return errors.Wrap(err, "Can not change keeper id")
		}
		c.updateTeamConfig(&statemachine.UpdateTeamState{
			Goalkeeper: &x.DesiredKeeper,
		})
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_RequestRobotSubstitution); ok {
		robotSubstitutionRequested := teamState.RequestsBotSubstitutionSince != nil
		if robotSubstitutionRequested != x.RequestRobotSubstitution {
			if err := c.checkRequestRobotSubstitution(); err != nil {
				return errors.Wrap(err, "Can not request robot substitution")
			}
			c.updateTeamConfig(&statemachine.UpdateTeamState{
				RequestsBotSubstitution: &x.RequestRobotSubstitution,
			})
		}
		return nil
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_RequestTimeout); ok {
		timeoutRequested := teamState.RequestsTimeoutSince != nil
		if timeoutRequested != x.RequestTimeout {
			if err := c.checkRequestTimeout(); err != nil {
				return errors.Wrap(err, "Can not request timeout")
			}
			c.updateTeamConfig(&statemachine.UpdateTeamState{
				RequestsTimeout: &x.RequestTimeout,
			})
		}
		return nil
	}

	if request.GetRequest() == RemoteControlToController_CHALLENGE_FLAG {
		if err := c.checkRequestChallengeFlag(); err != nil {
			return errors.Wrap(err, "Can not request challenge flag")
		}
		eventType := state.GameEvent_CHALLENGE_FLAG
		c.gcEngine.EnqueueGameEvent(&state.GameEvent{
			Type:   &eventType,
			Origin: []string{*origin(c.team)},
			Event: &state.GameEvent_ChallengeFlag_{
				ChallengeFlag: &state.GameEvent_ChallengeFlag{
					ByTeam: c.team,
				},
			},
		})
		return nil
	}

	if x, ok := request.GetMsg().(*RemoteControlToController_RequestEmergencyStop); ok {
		emergencyStopRequested := teamState.RequestsEmergencyStopSince != nil
		if emergencyStopRequested != x.RequestEmergencyStop {
			if err := c.checkRequestEmergencyStop(); err != nil {
				return errors.Wrap(err, "Can not request emergency stop")
			}
			c.updateTeamConfig(&statemachine.UpdateTeamState{
				RequestsEmergencyStop: &x.RequestEmergencyStop,
			})
		}
		return nil
	}

	return nil
}

func (c *RemoteControlClient) updateTeamConfig(update *statemachine.UpdateTeamState) {
	log.Println("Update team config via remote control: ", update.String())
	update.ForTeam = c.team
	err := c.gcEngine.EnqueueBlocking(&statemachine.Change{
		Origin: origin(c.team),
		Change: &statemachine.Change_UpdateTeamState{
			UpdateTeamState: update,
		},
	})
	if err != nil {
		log.Println("Failed to update team state: ", err)
	}
}

func origin(team *state.Team) *string {
	origin := "Remote Control " + team.String()
	return &origin
}
