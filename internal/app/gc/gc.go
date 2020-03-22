package gc

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/api"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/publish"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
)

// GameController contains all the different connected modules of the game controller
type GameController struct {
	config         config.Controller
	gcEngine       *engine.Engine
	publisher      *publish.Publisher
	apiServer      *api.Server
	visionReceiver *vision.Receiver
	// TODO recon
}

// NewGameController creates a new GameController
func NewGameController(cfg config.Controller) (c *GameController) {
	c = new(GameController)
	c.config = cfg
	c.gcEngine = engine.NewEngine(cfg.Game)
	c.publisher = publish.NewPublisher(c.gcEngine, c.config.Network.PublishAddress)
	c.apiServer = api.NewServer(c.gcEngine)
	return
}

// Start starts all go routines
func (c *GameController) Start() {
	if err := c.gcEngine.Start(); err != nil {
		panic(err)
	}
	c.publisher.Start()
}

// Stop stops all go routines
func (c *GameController) Stop() {
	c.publisher.Stop()
	c.gcEngine.Stop()
}

// ApiServer returns a reference to the api server
func (c *GameController) ApiServer() *api.Server {
	return c.apiServer
}
