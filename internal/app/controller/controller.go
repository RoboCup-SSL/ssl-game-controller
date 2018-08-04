package controller

import (
	"encoding/json"
	"github.com/g3force/ssl-game-controller/pkg/timer"
	"io"
	"log"
	"os"
	"time"
)

const logDir = "logs"
const lastStateFileName = logDir + "/lastState.json"
const configFileName = "config/ssl-game-controller.yaml"

// GameController controls a game
type GameController struct {
	Config           Config
	stateHistoryFile *os.File
	lastStateFile    *os.File
	Publisher        Publisher
	ApiServer        ApiServer
	Engine           Engine
	timer            timer.Timer
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

	r.openStateFiles()
	r.readLastState()

	go func() {
		if r.stateHistoryFile != nil {
			defer r.stateHistoryFile.Close()
		}
		if r.lastStateFile != nil {
			defer r.lastStateFile.Close()
		}
		for {
			r.timer.WaitTillNextFullSecond()
			r.Engine.Tick(r.timer.Delta())
			r.publish(nil)
		}
	}()
	return nil
}

func (r *GameController) OnNewEvent(event Event) {
	cmd, err := r.Engine.Process(event)
	if err != nil {
		log.Println("Could not process event:", event, err)
	} else {
		r.publish(cmd)
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
		log.Printf("Warning: Could not load config: %v", err)
	}
	return config
}

func (r *GameController) openStateFiles() {
	os.MkdirAll(logDir, os.ModePerm)

	stateHistoryLogFileName := logDir + "/state-history_" + time.Now().Format("2006-01-02_15-04-05") + ".log"
	f, err := os.OpenFile(stateHistoryLogFileName, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		log.Fatal("Can not open state history log file", err)
	}
	r.stateHistoryFile = f

	f, err = os.OpenFile(lastStateFileName, os.O_RDWR|os.O_CREATE, 0600)
	if err != nil {
		log.Fatal("Can not open last state file", err)
	}
	r.lastStateFile = f
}

func (r *GameController) readLastState() {
	bufSize := 10000
	b := make([]byte, bufSize)
	n, err := r.lastStateFile.Read(b)
	if err != nil && err != io.EOF {
		log.Fatal("Could not read from last state file ", err)
	}
	if n == bufSize {
		log.Fatal("Buffer size too small")
	}
	if n > 0 {
		err = json.Unmarshal(b[:n], r.Engine.State)
		if err != nil {
			log.Fatalf("Could not read last state: %v %v", string(b), err)
		}
	}
}

// publish publishes the state to the UI and the teams
func (r *GameController) publish(command *EventCommand) {
	if command != nil {
		r.saveLatestState()
		r.saveStateHistory()
	}
	r.ApiServer.PublishState(*r.Engine.State)
	r.Publisher.Publish(r.Engine.State, command)
}

// saveLatestState writes the current state into a file
func (r *GameController) saveLatestState() {
	jsonState, err := json.MarshalIndent(r.Engine.State, "", "  ")
	if err != nil {
		log.Print("Can not marshal state ", err)
		return
	}

	err = r.lastStateFile.Truncate(0)
	if err != nil {
		log.Fatal("Can not truncate last state file ", err)
	}
	_, err = r.lastStateFile.WriteAt(jsonState, 0)
	if err != nil {
		log.Print("Could not write last state ", err)
	}
	r.lastStateFile.Sync()
}

// saveStateHistory writes the current state to the history file
func (r *GameController) saveStateHistory() {

	jsonState, err := json.Marshal(r.Engine.State)
	if err != nil {
		log.Print("Can not marshal state ", err)
		return
	}

	r.stateHistoryFile.Write(jsonState)
	r.stateHistoryFile.WriteString("\n")
	r.stateHistoryFile.Sync()
}
