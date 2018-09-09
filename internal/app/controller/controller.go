package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/pkg/errors"
	"log"
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

func (c *GameController) ProcessAutoRefRequests(request refproto.AutoRefToControllerRequest) error {
	c.Mutex.Lock()
	defer c.Mutex.Unlock()
	log.Print("Received request from autoRef: ", request)
	return nil
}

func (c *GameController) ProcessTeamRequests(teamName string, request refproto.TeamToControllerRequest) error {
	c.Mutex.Lock()
	defer c.Mutex.Unlock()
	log.Print("Received request from team: ", request)

	if x, ok := request.GetRequest().(*refproto.TeamToControllerRequest_AdvantageResponse_); ok {
		if x.AdvantageResponse == refproto.TeamToControllerRequest_CONTINUE {
			c.outstandingTeamChoice = nil
		} else if c.outstandingTeamChoice != nil {
			c.OnNewEvent(c.outstandingTeamChoice.Event)
			c.outstandingTeamChoice = nil
			return nil
		} else {
			return errors.New("No outstanding choice available. You are probably too late.")
		}
	}

	if c.Engine.State.GameState() != GameStateStopped {
		return errors.New("Game is not stopped.")
	}

	team := c.Engine.State.TeamByName(teamName)
	if team == "" {
		return errors.New("Your team is not playing?!")
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
		c.Engine.Tick(c.timer.Delta())
		c.historyPreserver.Save(c.Engine.History)
		c.publish()
	}
}

func (c *GameController) publishNetwork() {
	for {
		c.timer.WaitTillNextFull(100 * time.Millisecond)
		c.Publisher.Publish(c.Engine.State)
	}
}

func (c *GameController) OnNewEvent(event Event) {
	if event.GameEvent != nil {
		var victimTeam Team
		if event.GameEvent.BotCrashUnique != nil {
			victimTeam = event.GameEvent.BotCrashUnique.Victim
		} else if event.GameEvent.BotPushing != nil {
			victimTeam = event.GameEvent.BotPushing.Victim
		}

		if victimTeam != "" {
			victim := event.GameEvent.BotCrashUnique.Victim
			teamName := c.Engine.State.TeamState[victim].Name
			choiceType := refproto.ControllerToTeamRequest_AdvantageChoice_COLLISION
			choice := refproto.ControllerToTeamRequest_AdvantageChoice{Foul: &choiceType}
			requestPayload := refproto.ControllerToTeamRequest_AdvantageChoice_{AdvantageChoice: &choice}
			request := refproto.ControllerToTeamRequest{Request: &requestPayload}
			err := c.TeamServer.SendRequest(teamName, request)
			if err != nil {
				log.Print("Failed to ask for advantage choice: ", err)
			} else {
				c.outstandingTeamChoice = &TeamChoice{Team: victim, Event: event, IssueTime: c.Engine.TimeProvider()}
				go c.timeoutTeamChoice()
				return
			}
		}
	}

	err := c.Engine.Process(event)
	if err != nil {
		log.Println("Could not process event:", event, err)
	} else {
		c.historyPreserver.Save(c.Engine.History)
		c.publish()
	}
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
	publisher, err := NewPublisher(config.Publish.Address)
	if err != nil {
		log.Printf("Could not start publisher on %v. %v", config.Publish.Address, err)
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
