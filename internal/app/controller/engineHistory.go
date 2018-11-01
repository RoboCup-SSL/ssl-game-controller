package controller

import (
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"os"
)

const maxHistorySize = 10
const historyFileName = "history.json"

type HistoryPreserver struct {
	historyFile *os.File
}

type HistoryEntry struct {
	State      State
	UiProtocol []UiProtocolEntry
}

type History []HistoryEntry

// Open opens the history file
func (r *HistoryPreserver) Open() error {
	f, err := os.OpenFile(historyFileName, os.O_RDWR|os.O_CREATE, 0600)
	if err != nil {
		return err
	}
	r.historyFile = f
	return nil
}

// Close closes the history file
func (r *HistoryPreserver) Close() {
	if r.historyFile == nil {
		return
	}
	if err := r.historyFile.Close(); err != nil {
		log.Print("Could not close history file", err)
	}
}

// Load loads the history from the filesystem
func (r *HistoryPreserver) Load() (*History, error) {
	b, err := ioutil.ReadAll(r.historyFile)
	if err != nil {
		return nil, errors.Errorf("Could not read from history file %v", err)
	}
	if len(b) == 0 {
		return &History{}, nil
	}
	history := History{}
	err = json.Unmarshal(b, &history)
	if err != nil {
		return nil, errors.Errorf("Could not unmarshal history: %v %v", string(b), err)
	}
	return &history, nil
}

// Save writes the current state into a file
func (r *HistoryPreserver) Save(history History) {
	jsonState, err := json.MarshalIndent(history, "", "  ")
	if err != nil {
		log.Print("Can not marshal state ", err)
		return
	}

	err = r.historyFile.Truncate(0)
	if err != nil {
		log.Print("Can not truncate last state file ", err)
	}
	_, err = r.historyFile.WriteAt(jsonState, 0)
	if err != nil {
		log.Print("Could not write last state ", err)
	}
	err = r.historyFile.Sync()
	if err != nil {
		log.Print("Could not sync history file", err)
	}
}

// UndoLastAction restores the last state from internal history
func (e *Engine) UndoLastAction() {
	lastIndex := len(e.History) - 2
	if lastIndex >= 0 {
		*e.State = e.History[lastIndex].State.DeepCopy()
		e.UiProtocol = append(e.History[lastIndex].UiProtocol[:0:0],
			e.History[lastIndex].UiProtocol...)
		e.History = e.History[0:lastIndex]
	}
}

// appendHistory appends the current state to the history
func (e *Engine) appendHistory() {
	var entry HistoryEntry
	entry.State = e.State.DeepCopy()
	entry.UiProtocol = append(e.UiProtocol[:0:0], e.UiProtocol...)
	e.History = append(e.History, entry)
	if len(e.History) > maxHistorySize {
		e.History = e.History[1:]
	}
}
