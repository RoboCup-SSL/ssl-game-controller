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

var refBox = NewRefBox()

// RefBox controls a game
type RefBox struct {
	State             *State
	timer             timer.Timer
	MatchTimeStart    time.Time
	notifyUpdateState chan struct{}
	StateHistory      []State
	Config            Config
	stateHistoryFile  *os.File
	lastStateFile     *os.File
	StageTimes        map[Stage]time.Duration
	Publisher         Publisher
}

// NewRefBox creates a new refBox
func NewRefBox() (refBox *RefBox) {

	refBox = new(RefBox)
	refBox.Config = loadConfig()
	refBox.timer = timer.NewTimer()
	refBox.notifyUpdateState = make(chan struct{})
	refBox.MatchTimeStart = time.Unix(0, 0)
	refBox.State = NewState(refBox.Config)
	refBox.Publisher = loadPublisher(refBox.Config)

	return
}

// RunRefBox starts the global refBox
func RunRefBox() {
	refBox.Run()
}

// Run the refBox by loading configs, states, timer, etc.
func (r *RefBox) Run() (err error) {

	os.MkdirAll(logDir, os.ModePerm)
	r.openStateFiles()
	r.readLastState()
	r.loadStages()
	r.timer.Start()

	go func() {
		if r.stateHistoryFile != nil {
			defer r.stateHistoryFile.Close()
		}
		if r.lastStateFile != nil {
			defer r.lastStateFile.Close()
		}
		for {
			r.timer.WaitTillNextFullSecond()
			r.Tick()
			r.Update(nil)
		}
	}()
	return nil
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

func (r *RefBox) openStateFiles() {
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

func (r *RefBox) readLastState() {
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
		err = json.Unmarshal(b[:n], refBox.State)
		if err != nil {
			log.Fatalf("Could not read last state: %v %v", string(b), err)
		}
	}
}

// Tick updates the times of the state and removes cards, if necessary
func (r *RefBox) Tick() {
	delta := r.timer.Delta()
	updateTimes(r, delta)

	if r.MatchTimeStart.After(time.Unix(0, 0)) {
		r.State.MatchDuration = time.Now().Sub(r.MatchTimeStart)
	}
}

// Update publishes the state to the UI and the teams
func (r *RefBox) Update(command *EventCommand) {
	r.notifyUpdateState <- struct{}{}
	refBox.Publisher.Publish(refBox.State, command)
}

// SaveState writes the latest state out and logs the state history
func (r *RefBox) SaveState() {
	r.SaveLatestState()
	r.SaveStateHistory()
}

// SaveLatestState writes the current state into a file
func (r *RefBox) SaveLatestState() {
	jsonState, err := json.MarshalIndent(r.State, "", "  ")
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

// SaveStateHistory writes the current state to the history file
func (r *RefBox) SaveStateHistory() {

	r.StateHistory = append(r.StateHistory, *r.State)

	jsonState, err := json.Marshal(r.State)
	if err != nil {
		log.Print("Can not marshal state ", err)
		return
	}

	r.stateHistoryFile.Write(jsonState)
	r.stateHistoryFile.WriteString("\n")
	r.stateHistoryFile.Sync()
}

// UndoLastAction restores the last state from internal history
func (r *RefBox) UndoLastAction() {
	lastIndex := len(r.StateHistory) - 2
	if lastIndex >= 0 {
		*r.State = r.StateHistory[lastIndex]
		r.StateHistory = r.StateHistory[0:lastIndex]
	}
}

func (r *RefBox) loadStages() {
	r.StageTimes = map[Stage]time.Duration{}
	for _, stage := range Stages {
		r.StageTimes[stage] = 0
	}
	r.StageTimes[StageFirstHalf] = r.Config.Normal.HalfDuration
	r.StageTimes[StageHalfTime] = r.Config.Normal.HalfTimeDuration
	r.StageTimes[StageSecondHalf] = r.Config.Normal.HalfDuration
	r.StageTimes[StageOvertimeBreak] = r.Config.Normal.BreakAfter
	r.StageTimes[StageOvertimeFirstHalf] = r.Config.Overtime.HalfDuration
	r.StageTimes[StageOvertimeHalfTime] = r.Config.Overtime.HalfTimeDuration
	r.StageTimes[StageOvertimeSecondHalf] = r.Config.Overtime.HalfDuration
	r.StageTimes[StageShootoutBreak] = r.Config.Overtime.BreakAfter
}

func updateTimes(r *RefBox, delta time.Duration) {
	if r.State.GameState == GameStateRunning {
		r.State.StageTimeElapsed += delta
		r.State.StageTimeLeft -= delta

		for _, teamState := range r.State.TeamState {
			reduceYellowCardTimes(teamState, delta)
			removeElapsedYellowCards(teamState)
		}
	}

	if r.State.GameState == GameStateTimeout && r.State.GameStateFor != nil {
		r.State.TeamState[*r.State.GameStateFor].TimeoutTimeLeft -= delta
	}
}

func reduceYellowCardTimes(teamState *TeamInfo, delta time.Duration) {
	for i := range teamState.YellowCardTimes {
		teamState.YellowCardTimes[i] -= delta
	}
}

func removeElapsedYellowCards(teamState *TeamInfo) {
	b := teamState.YellowCardTimes[:0]
	for _, x := range teamState.YellowCardTimes {
		if x > 0 {
			b = append(b, x)
		}
	}
	teamState.YellowCardTimes = b
}
