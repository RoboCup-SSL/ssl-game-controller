package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"log"
	"time"
)

const configFileName = "config/ssl-game-controller.yaml"

// GameController controls a game
type GameController struct {
	Config                      Config
	Publisher                   Publisher
	ApiServer                   ApiServer
	Engine                      Engine
	timer                       timer.Timer
	historyPreserver            HistoryPreserver
	numRefereeEventsLastPublish int
}

// NewGameController creates a new RefBox
func NewGameController() (r *GameController) {

	r = new(GameController)
	r.Config = loadConfig()
	r.ApiServer = ApiServer{}
	r.ApiServer.Consumer = r
	r.Publisher = loadPublisher(r.Config)
	r.Engine = NewEngine(r.Config.Game)
	r.timer = timer.NewTimer()
	r.timer.Start()

	return
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
	err := c.Engine.Process(event)
	if err != nil {
		log.Println("Could not process event:", event, err)
	} else {
		c.historyPreserver.Save(c.Engine.History)
		c.publish()
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

	c.ApiServer.PublishState(*c.Engine.State)
}
