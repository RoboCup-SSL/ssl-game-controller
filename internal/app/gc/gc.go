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
	config           config.Controller
	gcEngine         *engine.Engine
	publisher        *publish.Publisher
	messageGenerator *publish.MessageGenerator
	apiServer        *api.Server
	autoRefServer    *rcon.AutoRefServer
	autoRefServerTls *rcon.AutoRefServer
	teamServer       *rcon.TeamServer
	teamServerTls    *rcon.TeamServer
	ciServer         *ci.Server
	visionReceiver   *vision.Receiver
	trackerReceiver  *tracker.Receiver
}

// NewGameController creates a new GameController
func NewGameController(cfg config.Controller) (c *GameController) {
	c = new(GameController)
	c.config = cfg
	c.gcEngine = engine.NewEngine(cfg.Game)
	c.messageGenerator = publish.NewMessageGenerator()
	c.publisher = publish.NewPublisher(c.config.Network.PublishAddress)
	c.apiServer = api.NewServer(c.gcEngine)
	c.autoRefServer = rcon.NewAutoRefServer(cfg.Server.AutoRef.Address, c.gcEngine)
	c.autoRefServerTls = rcon.NewAutoRefServer(cfg.Server.AutoRef.AddressTls, c.gcEngine)
	c.autoRefServerTls.Server.Tls = true
	c.teamServer = rcon.NewTeamServer(cfg.Server.Team.Address, c.gcEngine)
	c.teamServerTls = rcon.NewTeamServer(cfg.Server.Team.AddressTls, c.gcEngine)
	c.teamServerTls.Tls = true
	c.ciServer = ci.NewServer(cfg.Server.Ci.Address)
	c.visionReceiver = vision.NewReceiver(cfg.Network.VisionAddress)
	c.visionReceiver.GeometryCallback = c.gcEngine.ProcessGeometry
	c.trackerReceiver = tracker.NewReceiver(cfg.Network.TrackerAddress)
	c.trackerReceiver.Callback = c.gcEngine.ProcessTrackerFrame
	return
}

// Start starts all go routines
func (c *GameController) Start() {
	if err := c.gcEngine.Start(); err != nil {
		panic(err)
	}

	switch c.config.TimeAcquisitionMode {
	case config.TimeAcquisitionModeSystem:
		c.messageGenerator.MessageConsumer = c.publisher.SendMessage
		c.visionReceiver.Start()
		c.trackerReceiver.Start()
		break
	case config.TimeAcquisitionModeVision:
		c.messageGenerator.MessageConsumer = c.publisher.SendMessage
		c.gcEngine.SetTimeProvider(c.visionReceiver.Time)
		c.visionReceiver.Start()
		c.trackerReceiver.Start()
	case config.TimeAcquisitionModeCi:
		c.messageGenerator.MessageConsumer = c.ciServer.SendMessage
		c.gcEngine.SetTimeProvider(c.ciServer.Time)
		c.gcEngine.SetTickChanProvider(c.ciServer.TickChanProvider)
		c.ciServer.TrackerConsumer = c.gcEngine.ProcessTrackerFrame
		c.ciServer.Start()
	}

	c.gcEngine.RegisterHook(c.messageGenerator.EngineHook)
	c.messageGenerator.Start()
	c.autoRefServer.Server.Start()
	c.autoRefServerTls.Server.Start()
	c.teamServer.Server.Start()
	c.teamServerTls.Server.Start()
}

// Stop stops all go routines
func (c *GameController) Stop() {
	// Note: Stopping is not (yet) implemented correctly by all servers.
	c.gcEngine.UnregisterHook(c.messageGenerator.EngineHook)
	c.messageGenerator.Stop()
	c.ciServer.Stop()
	c.trackerReceiver.Stop()
	c.visionReceiver.Stop()
	c.autoRefServer.Server.Stop()
	c.autoRefServerTls.Server.Stop()
	c.teamServer.Server.Stop()
	c.teamServerTls.Server.Stop()
	c.gcEngine.Stop()
}

// ApiServer returns a reference to the api server
func (c *GameController) ApiServer() *api.Server {
	return c.apiServer
}
