package controller

import (
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"os"
)

const historyFileName = "history.json"

type HistoryPreserver struct {
	historyFile *os.File
}

type HistoryEntry struct {
	State         State
	RefereeEvents []RefereeEvent
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
