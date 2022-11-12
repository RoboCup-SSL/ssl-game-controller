package gc

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/api"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/ci"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/publish"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/rcon"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
)

// GameController contains all the different connected modules of the game controller
type GameController struct {
	config              config.Controller
	gcEngine            *engine.Engine
	publisher           *publish.Publisher
	messageGenerator    *publish.MessageGenerator
	apiServer           *api.Server
	autoRefServer       *rcon.AutoRefServer
	teamServer          *rcon.TeamServer
	remoteControlServer *rcon.RemoteControlServer
	ciServer            *ci.Server
	visionReceiver      *vision.Receiver
	trackerReceiver     *tracker.Receiver
}

// NewGameController creates a new GameController
func NewGameController(cfg config.Controller) (c *GameController) {
	c = new(GameController)
	c.config = cfg
	c.gcEngine = engine.NewEngine(cfg.Game, cfg.Engine)
	c.messageGenerator = publish.NewMessageGenerator()
	c.publisher = publish.NewPublisher(c.config.Network.PublishAddress, c.config.Network.PublishNif)
	c.apiServer = api.NewServer(c.gcEngine)

	c.autoRefServer = rcon.NewAutoRefServer(cfg.Server.AutoRef.Address, c.gcEngine)
	c.autoRefServer.LoadTrustedKeys(cfg.Server.AutoRef.TrustedKeysDir)

	c.teamServer = rcon.NewTeamServer(cfg.Server.Team.Address, c.gcEngine)
	c.teamServer.LoadTrustedKeys(cfg.Server.Team.TrustedKeysDir)

	c.remoteControlServer = rcon.NewRemoteControlServer(cfg.Server.RemoteControl.Address, c.gcEngine)
	c.remoteControlServer.LoadTrustedKeys(cfg.Server.RemoteControl.TrustedKeysDir)

	c.ciServer = ci.NewServer(cfg.Server.Ci.Address)

	c.visionReceiver = vision.NewReceiver(cfg.Network.VisionAddress)
	c.visionReceiver.GeometryCallback = c.gcEngine.ProcessGeometry
	c.visionReceiver.MulticastServer.SkipInterfaces = cfg.Network.SkipInterfaces

	c.trackerReceiver = tracker.NewReceiver(cfg.Network.TrackerAddress)
	c.trackerReceiver.Callback = c.gcEngine.ProcessTrackerFrame
	c.trackerReceiver.MulticastServer.SkipInterfaces = cfg.Network.SkipInterfaces

	return
}

func (c *GameController) SetVerbose(verbose bool) {
	c.visionReceiver.MulticastServer.Verbose = verbose
	c.trackerReceiver.MulticastServer.Verbose = verbose
}

// Start starts all go routines
func (c *GameController) Start() {

	if len(c.config.Network.PublishAddress) > 0 {
		c.messageGenerator.MessageConsumers = append(c.messageGenerator.MessageConsumers, c.publisher.SendMessage)
	}

	switch c.config.TimeAcquisitionMode {
	case config.TimeAcquisitionModeSystem:
		c.visionReceiver.Start()
		c.trackerReceiver.Start()
		break
	case config.TimeAcquisitionModeVision:
		c.gcEngine.SetTimeProvider(c.visionReceiver.Time)
		c.visionReceiver.Start()
		c.trackerReceiver.Start()
	case config.TimeAcquisitionModeCi:
		c.messageGenerator.MessageConsumers = append(c.messageGenerator.MessageConsumers, c.ciServer.SendMessage)
		c.gcEngine.SetTimeProvider(c.ciServer.Time)
		c.gcEngine.SetTickChanProvider(c.ciServer.TickChanProvider)
		c.ciServer.SetEngine(c.gcEngine)
		c.ciServer.Start()
	}

	c.gcEngine.RegisterHook("messageGen", c.messageGenerator.EngineHook)
	c.messageGenerator.Start()
	c.autoRefServer.Server.Start()
	c.teamServer.Server.Start()
	c.remoteControlServer.Server.Start()

	if err := c.gcEngine.Start(); err != nil {
		panic(err)
	}
}

// Stop stops all go routines
func (c *GameController) Stop() {

	switch c.config.TimeAcquisitionMode {
	case config.TimeAcquisitionModeSystem:
		c.visionReceiver.Stop()
		c.trackerReceiver.Stop()
		break
	case config.TimeAcquisitionModeVision:
		c.visionReceiver.Stop()
		c.trackerReceiver.Stop()
	case config.TimeAcquisitionModeCi:
		c.ciServer.Stop()
	}

	c.gcEngine.UnregisterHook("messageGen")
	c.messageGenerator.Stop()
	c.autoRefServer.Server.Stop()
	c.teamServer.Server.Stop()
	c.remoteControlServer.Server.Stop()
	c.gcEngine.Stop()
}

// ApiServer returns a reference to the api server
func (c *GameController) ApiServer() *api.Server {
	return c.apiServer
}
