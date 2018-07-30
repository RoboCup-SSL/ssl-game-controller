package main

import (
	"encoding/json"
	"io"
	"log"
	"os"
	"time"
)

const lastStateFileName = "lastState.json"

type RefBox struct {
	State            *RefBoxState
	timer            Timer
	MatchTimeStart   time.Time
	newEventChannel  chan RefBoxEvent
	StateHistory     []RefBoxState
	stateHistoryFile *os.File
	lastStateFile    *os.File
}

func NewRefBox() (refBox *RefBox) {
	refBox = new(RefBox)
	refBox.State = NewRefBoxState()
	refBox.timer = NewTimer()
	refBox.newEventChannel = make(chan RefBoxEvent)
	refBox.MatchTimeStart = time.Unix(0, 0)

	return
}

func (r *RefBox) Run() (err error) {

	r.openStateFiles()
	r.readLastState()
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
			r.newEventChannel <- RefBoxEvent{}
		}
	}()
	return nil
}

func (r *RefBox) openStateFiles() {
	stateHistoryLogFileName := "state-history_" + time.Now().Format("2006-01-02_15-04-05") + ".log"
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

func (r *RefBox) Tick() {
	delta := r.timer.Delta()
	updateTimes(r, delta)

	if r.MatchTimeStart.After(time.Unix(0, 0)) {
		r.State.MatchDuration = time.Now().Sub(r.MatchTimeStart)
	}
}

func (r *RefBox) SaveState() {
	r.SaveLatestState()
	r.SaveStateHistory()
}

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

func (r *RefBox) UndoLastAction() {
	lastIndex := len(r.StateHistory) - 2
	if lastIndex >= 0 {
		*r.State = r.StateHistory[lastIndex]
		r.StateHistory = r.StateHistory[0:lastIndex]
	}
}

func updateTimes(r *RefBox, delta time.Duration) {
	if r.State.GameState == GameStateRunning {
		r.State.GameTimeElapsed += delta
		r.State.GameTimeLeft -= delta

		for _, teamState := range r.State.TeamState {
			reduceYellowCardTimes(teamState, delta)
			removeElapsedYellowCards(teamState)
		}
	}

	if r.State.GameState == GameStateTimeout && r.State.GameStateFor != nil {
		r.State.TeamState[*r.State.GameStateFor].TimeoutTimeLeft -= delta
	}
}

func reduceYellowCardTimes(teamState *RefBoxTeamState, delta time.Duration) {
	for i := range teamState.YellowCardTimes {
		teamState.YellowCardTimes[i] -= delta
	}
}

func removeElapsedYellowCards(teamState *RefBoxTeamState) {
	b := teamState.YellowCardTimes[:0]
	for _, x := range teamState.YellowCardTimes {
		if x > 0 {
			b = append(b, x)
		}
	}
	teamState.YellowCardTimes = b
}
