package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslproto"
	"github.com/pkg/errors"
	"log"
	"math"
	"sync"
	"time"
)

const configFileName = "config/ssl-game-controller.yaml"

// GameController controls a game
type GameController struct {
	Config                      Config
	Publisher                   Publisher
	ApiServer                   ApiServer
	AutoRefServer               *rcon.AutoRefServer
	TeamServer                  *rcon.TeamServer
	Engine                      Engine
	timer                       timer.Timer
	historyPreserver            HistoryPreserver
	numRefereeEventsLastPublish int
	outstandingTeamChoice       *TeamChoice
	Mutex                       sync.Mutex
	VisionReceiver              *VisionReceiver
}

type TeamChoice struct {
	Team      Team
	Event     Event
	IssueTime time.Time
}

// NewGameController creates a new RefBox
func NewGameController() (c *GameController) {

	c = new(GameController)
	c.Config = loadConfig()
	c.Publisher = loadPublisher(c.Config)
	c.ApiServer = ApiServer{}
	c.ApiServer.Consumer = c

	c.VisionReceiver = NewVisionReceiver(c.Config.Network.VisionAddress)
	c.VisionReceiver.GeometryCallback = c.ProcessGeometry

	c.AutoRefServer = rcon.NewAutoRefServer()
	c.AutoRefServer.LoadTrustedKeys(c.Config.Server.AutoRef.TrustedKeysDir)
	c.AutoRefServer.ProcessRequest = c.ProcessAutoRefRequests
	go c.AutoRefServer.Listen(c.Config.Server.AutoRef.Address)

	c.TeamServer = rcon.NewTeamServer()
	c.TeamServer.LoadTrustedKeys(c.Config.Server.Team.TrustedKeysDir)
	c.TeamServer.ProcessTeamRequest = c.ProcessTeamRequests
	go c.TeamServer.Listen(c.Config.Server.Team.Address)

	c.Engine = NewEngine(c.Config.Game)
	c.timer = timer.NewTimer()
	c.timer.Start()

	return
}

func (c *GameController) ProcessGeometry(data *sslproto.SSL_GeometryData) {
	if int32(math.Round(c.Engine.Geometry.FieldWidth*1000.0)) != *data.Field.FieldWidth {
		newFieldWidth := float64(*data.Field.FieldWidth) / 1000.0
		log.Printf("FieldWidth changed from %v to %v", c.Engine.Geometry.FieldWidth, newFieldWidth)
		c.Engine.Geometry.FieldWidth = newFieldWidth
	}
	if int32(math.Round(c.Engine.Geometry.FieldLength*1000)) != *data.Field.FieldLength {
		newFieldLength := float64(*data.Field.FieldLength) / 1000.0
		log.Printf("FieldLength changed from %v to %v", c.Engine.Geometry.FieldLength, newFieldLength)
		c.Engine.Geometry.FieldLength = newFieldLength
	}
	for _, line := range data.Field.FieldLines {
		if *line.Name == "LeftFieldLeftPenaltyStretch" {
			defenseAreaDepth := math.Abs(float64(*line.P1.X-*line.P2.X)) / 1000.0
			if math.Abs(defenseAreaDepth-c.Engine.Geometry.DefenseAreaDepth) > 1e-3 {
				log.Printf("DefenseAreaDepth changed from %v to %v", c.Engine.Geometry.DefenseAreaDepth, defenseAreaDepth)
				c.Engine.Geometry.DefenseAreaDepth = defenseAreaDepth
			}
		} else if *line.Name == "LeftPenaltyStretch" {
			defenseAreaWidth := math.Abs(float64(*line.P1.Y-*line.P2.Y)) / 1000.0
			if math.Abs(defenseAreaWidth-c.Engine.Geometry.DefenseAreaWidth) > 1e-3 {
				log.Printf("DefenseAreaDepth changed from %v to %v", c.Engine.Geometry.DefenseAreaWidth, defenseAreaWidth)
				c.Engine.Geometry.DefenseAreaWidth = defenseAreaWidth
			}
		}
	}
}

func (c *GameController) ProcessAutoRefRequests(id string, request refproto.AutoRefToControllerRequest) error {
	c.Mutex.Lock()
	defer c.Mutex.Unlock()
	log.Printf("Received request from autoRef '%v': %v", id, request)

	if request.GameEvent != nil {
		details := NewGameEventDetails(*request.GameEvent)
		gameEventType := details.EventType()
		event := Event{GameEvent: &GameEvent{Type: gameEventType, Details: details}}

		if c.Engine.State.GameEventBehavior[event.GameEvent.Type] == GameEventBehaviorMajority {
			validUntil := c.Engine.TimeProvider().Add(c.Config.Game.AutoRefProposalTimeout)
			newProposal := GameEventProposal{GameEvent: *event.GameEvent, ProposerId: id, ValidUntil: validUntil}

			eventPresent := false
			for _, proposal := range c.Engine.State.GameEventProposals {
				if proposal.GameEvent.Type == event.GameEvent.Type && proposal.ProposerId == newProposal.ProposerId {
					// update proposal
					*proposal = newProposal
					eventPresent = true
				}
			}
			if !eventPresent {
				c.Engine.State.GameEventProposals = append(c.Engine.State.GameEventProposals, &newProposal)
			}

			totalProposals := 0
			for _, proposal := range c.Engine.State.GameEventProposals {
				if proposal.GameEvent.Type == event.GameEvent.Type && proposal.ValidUntil.After(c.Engine.TimeProvider()) {
					totalProposals++
				}
			}

			majority := int(math.Floor(float64(len(c.AutoRefServer.Clients)) / 2.0))
			if totalProposals > majority {
				c.OnNewEvent(event)
			}
		} else {
			c.OnNewEvent(event)
		}
	}

	return nil
}

func (c *GameController) ProcessTeamRequests(teamName string, request refproto.TeamToControllerRequest) error {
	c.Mutex.Lock()
	defer c.Mutex.Unlock()
	log.Print("Received request from team: ", request)

	if x, ok := request.GetRequest().(*refproto.TeamToControllerRequest_AdvantageResponse_); ok {
		if c.outstandingTeamChoice == nil {
			return errors.New("No outstanding choice available. You are probably too late.")
		}
		responseTime := c.Engine.TimeProvider().Sub(c.outstandingTeamChoice.IssueTime)
		if x.AdvantageResponse == refproto.TeamToControllerRequest_CONTINUE {
			log.Printf("Team %v decided to continue the game within %v", c.outstandingTeamChoice.Team, responseTime)
			switch c.outstandingTeamChoice.Event.GameEvent.Type {
			case GameEventBotCrashUnique:
				c.outstandingTeamChoice.Event.GameEvent.Details.BotCrashUniqueSkipped = c.outstandingTeamChoice.Event.GameEvent.Details.BotCrashUnique
				c.outstandingTeamChoice.Event.GameEvent.Details.BotCrashUnique = nil
				c.outstandingTeamChoice.Event.GameEvent.Type = GameEventBotCrashUniqueSkipped
			case GameEventBotPushedBot:
				c.outstandingTeamChoice.Event.GameEvent.Details.BotPushedBotSkipped = c.outstandingTeamChoice.Event.GameEvent.Details.BotPushedBot
				c.outstandingTeamChoice.Event.GameEvent.Details.BotPushedBot = nil
				c.outstandingTeamChoice.Event.GameEvent.Type = GameEventBotPushedBotSkipped
			default:
				return errors.Errorf("Unsupported advantage choice game event: %v", c.outstandingTeamChoice.Event.GameEvent.Type)
			}
		} else {
			log.Printf("Team %v decided to stop the game within %v", c.outstandingTeamChoice.Team, responseTime)
		}
		c.OnNewEvent(c.outstandingTeamChoice.Event)
		c.outstandingTeamChoice = nil
		return nil
	}

	team := c.Engine.State.TeamByName(teamName)
	if team == TeamUnknown {
		return errors.New("Your team is not playing?!")
	}

	if x, ok := request.GetRequest().(*refproto.TeamToControllerRequest_SubstituteBot); ok {
		log.Printf("Team %v updated bot substituation intend to %v", team, x.SubstituteBot)
		c.Engine.State.TeamState[team].BotSubstitutionIntend = x.SubstituteBot
	}

	if c.Engine.State.GameState() != GameStateStopped {
		return errors.New("Game is not stopped.")
	}

	if x, ok := request.GetRequest().(*refproto.TeamToControllerRequest_DesiredKeeper); ok {
		log.Printf("Changing goalie for team %v to %v", team, x.DesiredKeeper)
		c.Engine.State.TeamState[team].Goalie = int(x.DesiredKeeper)
	}

	return nil
}

// Run the GameController by starting an endless loop in the background
func (c *GameController) Run() {

	if err := c.historyPreserver.Open(); err != nil {
		log.Print("Could not open history", err)
	} else {
		history, err := c.historyPreserver.Load()
		if err != nil {
			log.Print("Could not load history", err)
		} else if len(*history) > 0 {
			c.Engine.History = *history
			*c.Engine.State = c.Engine.History[len(c.Engine.History)-1].State
			c.Engine.RefereeEvents = c.Engine.History[len(c.Engine.History)-1].RefereeEvents
		}
	}

	c.ApiServer.PublishState(*c.Engine.State)
	c.ApiServer.PublishRefereeEvents(c.Engine.RefereeEvents)

	go c.publishApi()
	go c.publishNetwork()
}

func (c *GameController) publishApi() {
	defer c.historyPreserver.Close()
	for {
		c.timer.WaitTillNextFullSecond()
		c.updateOnlineStates()
		c.Engine.Tick(c.timer.Delta())
		c.historyPreserver.Save(c.Engine.History)
		c.publish()
	}
}

func (c *GameController) updateOnlineStates() {
	for _, team := range []Team{TeamYellow, TeamBlue} {
		c.Engine.State.TeamState[team].Connected = c.teamConnected(team)
	}
	var autoRefs []string
	for _, autoRef := range c.AutoRefServer.Clients {
		autoRefs = append(autoRefs, autoRef.Id)
	}
	c.Engine.State.AutoRefsConnected = autoRefs
}

func (c *GameController) teamConnected(team Team) bool {
	teamName := c.Engine.State.TeamState[team].Name
	if _, ok := c.TeamServer.Clients[teamName]; ok {
		return true
	}
	return false
}

func (c *GameController) publishNetwork() {
	for {
		c.timer.WaitTillNextFull(100 * time.Millisecond)
		c.Publisher.Publish(c.Engine.State)
	}
}

func (c *GameController) OnNewEvent(event Event) {

	if event.GameEvent != nil && !c.Engine.disabledGameEvent(event.GameEvent.Type) && c.askForTeamDecisionIfRequired(event) {
		return
	}

	err := c.Engine.Process(event)
	if err != nil {
		log.Println("Could not process event:", event, err)
	} else {
		c.historyPreserver.Save(c.Engine.History)
		c.publish()
	}
}

func (c *GameController) askForTeamDecisionIfRequired(event Event) (handled bool) {
	handled = false
	if c.outstandingTeamChoice == nil && c.Engine.State.GameState() == GameStateRunning {
		var byTeamProto refproto.Team
		var choiceType refproto.ControllerToTeamRequest_AdvantageChoice_Foul
		if event.GameEvent.Details.BotCrashUnique != nil {
			byTeamProto = *event.GameEvent.Details.BotCrashUnique.ByTeam
			choiceType = refproto.ControllerToTeamRequest_AdvantageChoice_COLLISION
		} else if event.GameEvent.Details.BotPushedBot != nil {
			byTeamProto = *event.GameEvent.Details.BotPushedBot.ByTeam
			choiceType = refproto.ControllerToTeamRequest_AdvantageChoice_PUSHING
		}

		forTeam := NewTeam(byTeamProto).Opposite()
		if forTeam != "" {
			teamName := c.Engine.State.TeamState[forTeam].Name
			choice := refproto.ControllerToTeamRequest_AdvantageChoice{Foul: &choiceType}
			requestPayload := refproto.ControllerToTeamRequest_AdvantageChoice_{AdvantageChoice: &choice}
			request := refproto.ControllerToTeamRequest{Request: &requestPayload}
			err := c.TeamServer.SendRequest(teamName, request)
			if err != nil {
				log.Print("Failed to ask for advantage choice: ", err)
			} else {
				c.outstandingTeamChoice = &TeamChoice{Team: forTeam, Event: event, IssueTime: c.Engine.TimeProvider()}
				go c.timeoutTeamChoice()
				handled = true
			}
		}
	}
	return
}

func (c *GameController) timeoutTeamChoice() {
	time.Sleep(c.Config.Game.TeamChoiceTimeout)
	c.Mutex.Lock()
	defer c.Mutex.Unlock()
	if c.outstandingTeamChoice != nil {
		c.OnNewEvent(c.outstandingTeamChoice.Event)
	}
}

func loadPublisher(config Config) Publisher {
	publisher, err := NewPublisher(config.Network.PublishAddress)
	if err != nil {
		log.Printf("Could not start publisher on %v. %v", config.Network.PublishAddress, err)
	}
	return publisher
}

func loadConfig() Config {
	config, err := LoadConfig(configFileName)
	if err != nil {
		log.Printf("Could not load config: %v", err)
	}
	return config
}

// publish publishes the state to the UI and the teams
func (c *GameController) publish() {
	if len(c.Engine.RefereeEvents) != c.numRefereeEventsLastPublish {
		c.ApiServer.PublishRefereeEvents(c.Engine.RefereeEvents)
		c.numRefereeEventsLastPublish = len(c.Engine.RefereeEvents)
	}

	c.TeamServer.AllowedTeamNames = []string{c.Engine.State.TeamState[TeamYellow].Name,
		c.Engine.State.TeamState[TeamBlue].Name}
	c.ApiServer.PublishState(*c.Engine.State)
}
