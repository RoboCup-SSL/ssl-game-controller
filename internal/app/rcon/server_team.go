package rcon

import (
	"bufio"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/sslconn"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"google.golang.org/protobuf/types/known/wrapperspb"
	"io"
	"log"
	"net"
)

type TeamServer struct {
	gcEngine *engine.Engine
	*Server
}

type TeamClient struct {
	teamName string
	team     state.Team
	*Client
}

func NewTeamServer(address string, gcEngine *engine.Engine) (s *TeamServer) {
	s = new(TeamServer)
	s.gcEngine = gcEngine
	s.Server = NewServer(address)
	s.connectionHandler = s.handleClientConnection
	s.loadDefaultTrustedKeys("team")
	return
}

func (c *TeamClient) receiveRegistration(reader *bufio.Reader, server *TeamServer) error {
	registration := TeamRegistration{}
	if err := sslconn.ReceiveMessage(reader, &registration); err != nil {
		return err
	}

	var allowedTeamNames []string
	nameToTeamMap := map[string]state.Team{}
	for team, teamInfo := range server.gcEngine.CurrentState().TeamState {
		allowedTeamNames = append(allowedTeamNames, *teamInfo.Name)
		nameToTeamMap[*teamInfo.Name] = state.Team(state.Team_value[team])
	}

	if registration.TeamName == nil {
		return errors.New("No team name specified")
	}
	if !isAllowedTeamName(*registration.TeamName, allowedTeamNames) {
		return errors.Errorf("Invalid team name: '%v'. Expecting one of these: %v", *registration.TeamName, allowedTeamNames)
	}
	var team state.Team
	if registration.Team != nil {
		team = *registration.Team
	} else if len(nameToTeamMap) == 2 {
		team = nameToTeamMap[*registration.TeamName]
	} else {
		return errors.Errorf("No team specified and both teams have the same name. Specify the team (-color).")
	}

	c.id = team.String() + "-" + *registration.TeamName
	c.team = team
	c.teamName = *registration.TeamName
	if _, exists := server.GetClient(c.id); exists {
		return errors.New("Team with given name already registered: " + c.id)
	}
	c.pubKey = server.trustedKeys[*registration.TeamName]
	if c.pubKey != nil {
		if err := c.Client.verifyMessage(&registration); err != nil {
			return err
		}
	} else {
		log.Printf("No public key found: Connection is unverified")
		c.token = ""
	}

	c.reply(c.Ok())

	log.Printf("Team %v connected", *registration.TeamName)

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

	reader := bufio.NewReaderSize(conn, 1)

	client := TeamClient{Client: &Client{conn: conn, token: uuid.NewString()}}
	client.reply(client.Ok())

	err := client.receiveRegistration(reader, s)
	if err != nil {
		client.reply(client.Reject(err.Error()))
		return
	}

	s.PutClient(client.id, client.Client)
	defer func() {
		s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
			if teamState, ok := gcState.TeamState[client.team.String()]; ok {
				connected := false
				teamState.Connected = &connected
				teamState.ConnectionVerified = &connected
				teamState.AdvantageChoice = nil
			} else {
				log.Println("Team not connected: " + client.team.String())
			}
		})
		s.CloseConnection(client.id)
	}()

	log.Printf("Team Client %v connected", client.id)
	s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
		if teamState, ok := gcState.TeamState[client.team.String()]; ok {
			connected := true
			teamState.Connected = &connected
			teamState.ConnectionVerified = &client.verifiedConnection
		}
	})

	for {
		req := TeamToController{}
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
		if err := s.processRequest(client, &req); err != nil {
			client.reply(client.Reject(err.Error()))
		} else {
			client.reply(client.Ok())
		}
	}
}

func (s *TeamServer) SendRequest(teamName string, request *ControllerToTeam) error {
	if client, ok := s.GetClient(teamName); ok {
		return sslconn.SendMessage(client.conn, request)
	}
	return errors.Errorf("Team Client '%v' not connected", teamName)
}

func (c *TeamClient) reply(reply *ControllerReply) {
	msg := ControllerToTeam_ControllerReply{ControllerReply: reply}
	response := ControllerToTeam{Msg: &msg}
	if err := sslconn.SendMessage(c.conn, &response); err != nil {
		log.Print("Failed to send reply: ", err)
	}
}

func (s *TeamServer) processRequest(teamClient TeamClient, request *TeamToController) error {

	if request.GetPing() {
		return nil
	}

	if x, ok := request.GetMsg().(*TeamToController_AdvantageChoice); ok {
		responseType := engine.TeamAdvantageChoice_STOP
		if x.AdvantageChoice == AdvantageChoice_CONTINUE {
			responseType = engine.TeamAdvantageChoice_CONTINUE
		}
		s.gcEngine.UpdateGcState(func(gcState *engine.GcState) {
			gcState.TeamState[teamClient.team.String()].AdvantageChoice = &engine.TeamAdvantageChoice{
				Choice: &responseType,
			}
		})
		// exit early to avoid spamming the log
		return nil
	}

	log.Print("Received request from team: ", request)

	currentState := s.gcEngine.CurrentState()
	if teamClient.team == state.Team_UNKNOWN {
		return errors.New("Your team is not playing?!")
	}

	teamState := *currentState.TeamInfo(teamClient.team)

	if x, ok := request.GetMsg().(*TeamToController_SubstituteBot); ok {
		robotSubstitutionRequested := teamState.RequestsBotSubstitutionSince != nil
		if robotSubstitutionRequested != x.SubstituteBot {
			log.Printf("Team %v requests to change bot substituation intent to %v", teamClient.id, x.SubstituteBot)
			s.gcEngine.Enqueue(&statemachine.Change{
				Origin: &teamClient.id,
				Change: &statemachine.Change_UpdateTeamStateChange{
					UpdateTeamStateChange: &statemachine.Change_UpdateTeamState{
						ForTeam:                 &teamClient.team,
						RequestsBotSubstitution: wrapperspb.Bool(x.SubstituteBot),
					}},
			})
		}
		return nil
	}

	if x, ok := request.GetMsg().(*TeamToController_DesiredKeeper); ok && *teamState.Goalkeeper != x.DesiredKeeper {
		if currentState.Command.IsRunning() || currentState.Command.IsPrepare() {
			return errors.New("Can not change keeper while game is running.")
		}

		if err := mayChangeKeeper(s.gcEngine.TrackerState(), s.gcEngine.CurrentState(), &teamState); err != nil {
			return errors.Wrap(err, "Team requests to change keeper, but: ")
		}
		log.Printf("Team %v requests to change keeper to %v", teamClient.team, x.DesiredKeeper)
		s.gcEngine.Enqueue(&statemachine.Change{
			Origin: &teamClient.teamName,
			Change: &statemachine.Change_UpdateTeamStateChange{
				UpdateTeamStateChange: &statemachine.Change_UpdateTeamState{
					ForTeam:    &teamClient.team,
					Goalkeeper: wrapperspb.Int32(x.DesiredKeeper),
				}},
		})
	}

	return nil
}

func mayChangeKeeper(trackerState *engine.GcStateTracker, currentState *state.State, teamState *state.TeamInfo) error {
	if !currentState.GameState.IsRunning() {
		return nil
	}
	ball := trackerState.Ball
	if ball != nil &&
		((*teamState.OnPositiveHalf && *ball.Pos.X > 0) ||
			(!*teamState.OnPositiveHalf && *ball.Pos.X < 0)) {
		return errors.New("Ball is not in the opponents half")
	}
	return nil
}
