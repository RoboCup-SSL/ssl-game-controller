package controller

import (
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"os"
	"os/signal"
	"syscall"
)

const maxHistorySize = 10
const stateFilename = "gc-state.json"
const backupFilename = "gc-state.backup"

type PersistentState struct {
	CurrentState *GameControllerState `json:"currentState"`
	Protocol     []*ProtocolEntry     `json:"protocol"`
}

// Add adds the entry and prunes the protocol afterwards, if a new previous state was added
func (s *PersistentState) Add(entry *ProtocolEntry) {
	s.Protocol = append(s.Protocol, entry)
	if entry.PreviousState != nil {
		s.Prune()
	}
}

// Prune removes all except 20 latest previous states from protocol
func (s *PersistentState) Prune() {
	maxPreviousStates := maxHistorySize
	for i := len(s.Protocol) - 1; i > 0; i-- {
		entry := s.Protocol[i]
		if maxPreviousStates > 0 {
			if entry.PreviousState != nil {
				maxPreviousStates--
			}
		} else {
			entry.PreviousState = nil
		}
	}
}

// GetProtocolEntry returns the protocol entry with given id
func (s *PersistentState) GetProtocolEntry(id int) *ProtocolEntry {
	for i := len(s.Protocol) - 1; i > 0; i-- {
		if s.Protocol[i].Id == id {
			return s.Protocol[i]
		}
	}
	return nil
}

// GetProtocolEntry returns the protocol entry with given id
func (s *PersistentState) RevertProtocolEntry(id int) error {
	for i := len(s.Protocol) - 1; i > 0; i-- {
		entry := s.Protocol[i]
		if entry.Id == id {
			if entry.PreviousState == nil {
				return errors.Errorf("Can not revert %v. No previous state present.", entry)
			} else {
				s.CurrentState.MatchState = entry.PreviousState
				s.Protocol = s.Protocol[0:i]
				return nil
			}
		}
	}
	return errors.Errorf("No protocol entry with id %v found", id)
}

type StatePreserver struct {
	file       *os.File
	backupFile *os.File
}

// Open opens the state and backup file
func (r *StatePreserver) Open() error {
	f, err := os.OpenFile(stateFilename, os.O_RDWR|os.O_CREATE, 0600)
	if err != nil {
		return err
	}
	r.file = f

	f, err = os.OpenFile(backupFilename, os.O_APPEND|os.O_WRONLY, os.ModeAppend)
	if err != nil {
		return err
	}
	r.backupFile = f
	return nil
}

// CloseOnExit makes sure to close the file when program exists
func (r *StatePreserver) CloseOnExit() {
	var gracefulStop = make(chan os.Signal)
	signal.Notify(gracefulStop, syscall.SIGTERM)
	signal.Notify(gracefulStop, syscall.SIGINT)
	go func() {
		<-gracefulStop
		r.Close()
		os.Exit(0)
	}()
}

// Close closes the state and backup file
func (r *StatePreserver) Close() {
	if r.file != nil {
		if err := r.file.Close(); err != nil {
			log.Print("Could not close state file", err)
		}
	}
	if r.backupFile != nil {
		if err := r.backupFile.Close(); err != nil {
			log.Print("Could not close backup file", err)
		}
	}
}

// Load loads the state from the filesystem
func (r *StatePreserver) Load() (*PersistentState, error) {
	b, err := ioutil.ReadAll(r.file)
	if err != nil {
		return nil, errors.Errorf("Could not read from state file %v", err)
	}
	if len(b) == 0 {
		return &PersistentState{}, nil
	}
	state := PersistentState{}
	err = json.Unmarshal(b, &state)
	if err != nil {
		return nil, errors.Errorf("Could not unmarshal state: %v %v", string(b), err)
	}
	return &state, nil
}

// Save writes the current state into a file
func (r *StatePreserver) Save(state *PersistentState) {
	jsonState, err := json.MarshalIndent(state, "", "  ")
	if err != nil {
		log.Print("Can not marshal state ", err)
		return
	}

	err = r.file.Truncate(0)
	if err != nil {
		log.Print("Can not truncate last state file", err)
	}
	_, err = r.file.WriteAt(jsonState, 0)
	if err != nil {
		log.Print("Could not write last state: ", err)
	}
	err = r.file.Sync()
	if err != nil {
		log.Print("Could not sync state file: ", err)
	}

	jsonCompact, err := json.Marshal(state)
	if err != nil {
		log.Print("Could not marshal state for backup")
		return
	}
	jsonCompact = append(jsonCompact, []byte("\n")...)
	_, err = r.backupFile.Write(jsonCompact)
	if err != nil {
		log.Print("Could not write to backup file: ", err)
	}
}
