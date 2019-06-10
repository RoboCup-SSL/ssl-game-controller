package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslproto"
	"log"
	"sort"
	"sync"
	"time"
)

const configFileName = "config/ssl-game-controller.yaml"

// GameController controls a game
type GameController struct {
	Config                config.Controller
	Publisher             Publisher
	ApiServer             ApiServer
	AutoRefServer         *rcon.AutoRefServer
	TeamServer            *rcon.TeamServer
	CiServer              rcon.CiServer
	Engine                Engine
	statePreserver        StatePreserver
	uiProtocolLastPublish []*ProtocolEntry
	outstandingTeamChoice *TeamChoice
	ConnectionMutex       sync.Mutex
	PublishMutex          sync.Mutex
	StateMutex            sync.Mutex
	VisionReceiver        *vision.Receiver
}

// NewGameController creates a new RefBox
func NewGameController() (c *GameController) {

	c = new(GameController)
	c.Config = loadConfig()
	c.Publisher = NewPublisher(c.Config.Network.PublishAddress)
	c.ApiServer = ApiServer{}
	c.ApiServer.Consumer = c
	c.uiProtocolLastPublish = []*ProtocolEntry{}

	c.VisionReceiver = vision.NewReceiver(c.Config.Network.VisionAddress)
	c.VisionReceiver.GeometryCallback = c.ProcessGeometry

	c.AutoRefServer = rcon.NewAutoRefServer()
	c.AutoRefServer.LoadTrustedKeys(c.Config.Server.AutoRef.TrustedKeysDir)
	c.AutoRefServer.ProcessRequest = c.ProcessAutoRefRequests
	c.AutoRefServer.ClientsChangedObservers = []func(){c.updateOnlineStates}

	c.TeamServer = rcon.NewTeamServer()
	c.TeamServer.LoadTrustedKeys(c.Config.Server.Team.TrustedKeysDir)
	c.TeamServer.ProcessTeamRequest = c.ProcessTeamRequests
	c.TeamServer.ClientsChangedObservers = []func(){c.updateOnlineStates}

	c.CiServer = rcon.NewCiServer()

	c.Engine = NewEngine(c.Config.Game, time.Now().Unix())

	c.setupTimeProvider()

	return
}

// Run the GameController by starting several go-routines. This method will not block.
func (c *GameController) Run() {

	if err := c.statePreserver.Open(); err != nil {
		log.Print("Could not open state", err)
	} else {
		state, err := c.statePreserver.Load()
		if err != nil {
			log.Print("Could not load state", err)
		} else if state != nil && state.CurrentState != nil {
			c.Engine.PersistentState = state
			c.Engine.GcState = state.CurrentState
			c.Engine.State = state.CurrentState.MatchState
		}
	}
	c.statePreserver.CloseOnExit()

	c.ApiServer.PublishState(c.Engine.GcState)
	c.ApiServer.PublishUiProtocol(c.Engine.PersistentState.Protocol)
	c.TeamServer.AllowedTeamNames = []string{c.Engine.State.TeamState[TeamYellow].Name,
		c.Engine.State.TeamState[TeamBlue].Name}
	c.updateOnlineStates()

	go c.AutoRefServer.Listen(c.Config.Server.AutoRef.Address)
	go c.AutoRefServer.ListenTls(c.Config.Server.AutoRef.AddressTls)
	go c.TeamServer.Listen(c.Config.Server.Team.Address)
	go c.TeamServer.ListenTls(c.Config.Server.Team.AddressTls)

	if c.Config.TimeAcquisitionMode == config.TimeAcquisitionModeSystem ||
		c.Config.TimeAcquisitionMode == config.TimeAcquisitionModeVision {
		go c.updateLoop()
		go c.publishToNetwork()
	} else if c.Config.TimeAcquisitionMode == config.TimeAcquisitionModeCi {
		// do not send multicast packages - mainly for network performance issues, because publish will be called
		// more frequently in the CI mode
		c.Publisher.Message.Send = func() {}
		c.CiServer.TimeConsumer = c.updateCi
		go c.CiServer.Listen(c.Config.Server.Ci.Address)
	} else {
		log.Println("Unknown time acquisition mode: ", c.Config.TimeAcquisitionMode)
	}
}

// setupTimeProvider changes the time provider to the vision receiver, if configured
func (c *GameController) setupTimeProvider() {
	if c.Config.TimeAcquisitionMode == config.TimeAcquisitionModeVision {
		c.Engine.TimeProvider = func() time.Time {
			return time.Unix(0, 0)
		}
		c.VisionReceiver.DetectionCallback = func(frame *sslproto.SSL_DetectionFrame) {
			c.Engine.TimeProvider = timer.NewFixedTimeProviderFromSeconds(*frame.TCapture)
		}
	}
}

// updateLoop calls update() regularly
func (c *GameController) updateLoop() {
	for {
		time.Sleep(time.Millisecond * 10)
		c.StateMutex.Lock()
		c.update()
		c.StateMutex.Unlock()
	}
}

// updateCi updates the current time to the given time and returns the updated referee message
func (c *GameController) updateCi(t time.Time) *refproto.Referee {
	c.StateMutex.Lock()
	defer c.StateMutex.Unlock()
	c.Engine.TimeProvider = func() time.Time { return t }
	c.update()
	c.Publisher.Publish(c.Engine.GcState)
	return c.Publisher.Message.ProtoMsg
}

// update updates several states and publishes the new state to the UI every full second or on events
func (c *GameController) update() {
	timeChanged, eventTriggered := c.Engine.Update()
	if eventTriggered || timeChanged {
		c.publish()
	}
}

// publish publishes the state to the UI and the teams
func (c *GameController) publish() {
	c.PublishMutex.Lock()
	defer c.PublishMutex.Unlock()

	c.statePreserver.Save(c.Engine.PersistentState)

	c.TeamServer.AllowedTeamNames = []string{
		c.Engine.State.TeamState[TeamYellow].Name,
		c.Engine.State.TeamState[TeamBlue].Name}

	c.publishUiProtocol()
	c.ApiServer.PublishState(c.Engine.GcState)
}

// publishUiProtocol publishes the UI protocol, if it has changed
func (c *GameController) publishUiProtocol() {
	numNewEntries := len(c.Engine.PersistentState.Protocol)
	numPreEntries := len(c.uiProtocolLastPublish)
	if numNewEntries != numPreEntries ||
		(numNewEntries > 0 && c.Engine.PersistentState.Protocol[numNewEntries-1] != c.uiProtocolLastPublish[numPreEntries-1]) {
		c.ApiServer.PublishUiProtocol(c.Engine.PersistentState.Protocol)
		c.uiProtocolLastPublish = make([]*ProtocolEntry, numNewEntries)
		copy(c.uiProtocolLastPublish, c.Engine.PersistentState.Protocol)
	}
}

// updateOnlineStates checks if teams and autoRefs are online and writes this into the state
func (c *GameController) updateOnlineStates() {
	for _, team := range []Team{TeamYellow, TeamBlue} {
		c.Engine.GcState.TeamConnected[team], c.Engine.GcState.TeamConnectionVerified[team] = c.teamConnected(team)
	}
	var autoRefs []string
	for _, autoRef := range c.AutoRefServer.Clients {
		autoRefs = append(autoRefs, autoRef.Id)
	}
	sort.Strings(autoRefs)
	c.Engine.GcState.AutoRefsConnected = autoRefs

	c.publish()
}

// publishToNetwork publishes the current state to the network (multicast) every 25ms
func (c *GameController) publishToNetwork() {
	for {
		time.Sleep(25 * time.Millisecond)
		c.StateMutex.Lock()
		c.Publisher.Publish(c.Engine.GcState)
		c.StateMutex.Unlock()
	}
}

// OnNewEvent processes the given event
func (c *GameController) OnNewEvent(event Event) {
	c.StateMutex.Lock()
	defer c.StateMutex.Unlock()
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
		err = cfg.WriteTo(configFileName)
		if err != nil {
			log.Printf("Failed to write a default config file to %v: %v", configFileName, err)
		} else {
			log.Println("New default config has been written to ", configFileName)
		}
	}
	return cfg
}
