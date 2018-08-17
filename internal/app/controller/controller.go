package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"log"
)

const configFileName = "config/ssl-game-controller.yaml"

// GameController controls a game
type GameController struct {
	Config           Config
	Publisher        Publisher
	ApiServer        ApiServer
	Engine           Engine
	timer            timer.Timer
	historyPreserver HistoryPreserver
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
func (r *GameController) Run() (err error) {

	if err := r.historyPreserver.Open(); err != nil {
		log.Print("Could not open history", err)
	} else {
		history, err := r.historyPreserver.Load()
		if err != nil {
			log.Print("Could not load history", err)
		} else if len(*history) > 0 {
			r.Engine.History = *history
			*r.Engine.State = r.Engine.History[len(r.Engine.History)-1].State
			r.Engine.RefereeEvents = r.Engine.History[len(r.Engine.History)-1].RefereeEvents
		}
	}

	r.ApiServer.PublishState(*r.Engine.State)
	r.ApiServer.PublishGameEvents(r.Engine.RefereeEvents)

	go func() {
		defer r.historyPreserver.Close()
		for {
			r.timer.WaitTillNextFullSecond()
			r.Engine.Tick(r.timer.Delta())
			r.historyPreserver.Save(r.Engine.History)
			r.publish()
		}
	}()
	return nil
}

func (r *GameController) OnNewEvent(event Event) {
	err := r.Engine.Process(event)
	if err != nil {
		log.Println("Could not process event:", event, err)
	} else {
		r.historyPreserver.Save(r.Engine.History)
		r.publish()
		r.publishGameEvents()
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
func (r *GameController) publish() {
	r.ApiServer.PublishState(*r.Engine.State)
	r.Publisher.Publish(r.Engine.State)
}

// publishGameEvents publishes the current list of game events
func (r *GameController) publishGameEvents() {
	r.ApiServer.PublishGameEvents(r.Engine.RefereeEvents)
}
