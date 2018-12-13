package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslproto"
	"log"
	"sync"
	"time"
)

const configFileName = "config/ssl-game-controller.yaml"

// GameController controls a game
type GameController struct {
	Config                    config.Controller
	Publisher                 Publisher
	ApiServer                 ApiServer
	AutoRefServer             *rcon.AutoRefServer
	TeamServer                *rcon.TeamServer
	Engine                    Engine
	timer                     timer.Timer
	historyPreserver          HistoryPreserver
	numUiProtocolsLastPublish int
	outstandingTeamChoice     *TeamChoice
	ConnectionMutex           sync.Mutex
	PublishMutex              sync.Mutex
	VisionReceiver            *vision.Receiver
}

// NewGameController creates a new RefBox
func NewGameController() (c *GameController) {

	c = new(GameController)
	c.Config = loadConfig()
	c.Publisher = NewPublisher(c.Config.Network.PublishAddress)
	c.ApiServer = ApiServer{}
	c.ApiServer.Consumer = c

	c.VisionReceiver = vision.NewReceiver(c.Config.Network.VisionAddress)
	c.VisionReceiver.GeometryCallback = c.ProcessGeometry

	c.AutoRefServer = rcon.NewAutoRefServer()
	c.AutoRefServer.LoadTrustedKeys(c.Config.Server.AutoRef.TrustedKeysDir)
	c.AutoRefServer.ProcessRequest = c.ProcessAutoRefRequests

	c.TeamServer = rcon.NewTeamServer()
	c.TeamServer.LoadTrustedKeys(c.Config.Server.Team.TrustedKeysDir)
	c.TeamServer.ProcessTeamRequest = c.ProcessTeamRequests

	c.Engine = NewEngine(c.Config.Game, time.Now().Unix())
	c.timer = timer.NewTimer()

	c.setupTimeProvider()

	return
}

// Run the GameController by starting several go-routines. This method will not block.
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
			c.Engine.UiProtocol = c.Engine.History[len(c.Engine.History)-1].UiProtocol
		}
	}

	c.ApiServer.PublishState(*c.Engine.State)
	c.ApiServer.PublishUiProtocol(c.Engine.UiProtocol)
	c.TeamServer.AllowedTeamNames = []string{c.Engine.State.TeamState[TeamYellow].Name,
		c.Engine.State.TeamState[TeamBlue].Name}

	c.timer.Start()
	go c.mainLoop()
	go c.publishToNetwork()
	go c.AutoRefServer.Listen(c.Config.Server.AutoRef.Address)
	go c.TeamServer.Listen(c.Config.Server.Team.Address)
}

// setupTimeProvider changes the time provider to the vision receiver, if configured
func (c *GameController) setupTimeProvider() {
	if c.Config.TimeFromVision {
		c.timer.TimeProvider = func() time.Time {
			return time.Unix(0, 0)
		}
		c.Engine.TimeProvider = c.timer.TimeProvider
		c.VisionReceiver.DetectionCallback = func(frame *sslproto.SSL_DetectionFrame) {
			sec := int64(*frame.TCapture)
			nsec := int64((*frame.TCapture - float64(sec)) * 1e9)
			c.timer.TimeProvider = func() time.Time {
				return time.Unix(sec, nsec)
			}
			c.Engine.TimeProvider = c.timer.TimeProvider
		}
	}
}

// mainLoop updates several states every full second and publishes the new state
func (c *GameController) mainLoop() {
	defer c.historyPreserver.Close()
	for {
		c.timer.WaitTillNextFullSecond()
		c.Engine.Tick(c.timer.Delta())

		c.publish()
	}
}

// publish publishes the state to the UI and the teams
func (c *GameController) publish() {
	c.PublishMutex.Lock()
	defer c.PublishMutex.Unlock()

	c.updateOnlineStates()
	c.historyPreserver.Save(c.Engine.History)

	c.TeamServer.AllowedTeamNames = []string{
		c.Engine.State.TeamState[TeamYellow].Name,
		c.Engine.State.TeamState[TeamBlue].Name}

	c.publishUiProtocol()
	c.ApiServer.PublishState(*c.Engine.State)
}

// publishUiProtocol publishes the UI protocol, if it has changed
func (c *GameController) publishUiProtocol() {
	if len(c.Engine.UiProtocol) != c.numUiProtocolsLastPublish {
		c.ApiServer.PublishUiProtocol(c.Engine.UiProtocol)
		c.numUiProtocolsLastPublish = len(c.Engine.UiProtocol)
	}
}

// updateOnlineStates checks if teams and autoRefs are online and writes this into the state
func (c *GameController) updateOnlineStates() {
	for _, team := range []Team{TeamYellow, TeamBlue} {
		c.Engine.State.TeamState[team].Connected, c.Engine.State.TeamState[team].ConnectionVerified = c.teamConnected(team)
	}
	var autoRefs []string
	for _, autoRef := range c.AutoRefServer.Clients {
		autoRefs = append(autoRefs, autoRef.Id)
	}
	c.Engine.State.AutoRefsConnected = autoRefs
}

// publishToNetwork publishes the current state to the network (multicast) every 100ms
func (c *GameController) publishToNetwork() {
	for {
		c.timer.WaitTillNextFull(100 * time.Millisecond)
		c.Publisher.Publish(c.Engine.State)
	}
}

// OnNewEvent processes the given event
func (c *GameController) OnNewEvent(event Event) {

	if event.GameEvent != nil && !c.Engine.disabledGameEvent(event.GameEvent.Type) && c.askForTeamDecisionIfRequired(event) {
		return
	}

	err := c.Engine.Process(event)
	if err != nil {
		log.Println("Could not process event:", event, err)
	} else {
		c.publish()
	}
}

// loadConfig loads the controller config
func loadConfig() config.Controller {
	cfg, err := config.LoadControllerConfig(configFileName)
	if err != nil {
		log.Printf("Could not load config: %v", err)
	}
	return cfg
}
