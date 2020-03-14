package store

import (
	"bufio"
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/pkg/errors"
	"log"
	"os"
	"os/signal"
	"syscall"
)

type StateEntry struct {
	State  state.State
	Change statemachine.Change
}

type Store struct {
	filename string
	file     *os.File
	states   []*StateEntry
}

func NewStore(filename string) (s *Store) {
	s = new(Store)
	s.filename = filename
	s.states = []*StateEntry{}
	return
}

func (s *Store) States() []*StateEntry {
	return s.states
}

func (s *Store) LatestState() *state.State {
	if len(s.states) > 0 {
		return &s.states[len(s.states)-1].State
	}
	return nil
}

// Open opens the store file
func (s *Store) Open() error {
	f, err := os.OpenFile(s.filename, os.O_RDWR|os.O_CREATE, 0600)
	if err != nil {
		return err
	}
	s.file = f
	return nil
}

// CloseOnExit makes sure to close the file when program exists
func (s *Store) CloseOnExit() {
	var gracefulStop = make(chan os.Signal)
	signal.Notify(gracefulStop, syscall.SIGTERM)
	signal.Notify(gracefulStop, syscall.SIGINT)
	go func() {
		<-gracefulStop
		if err := s.Close(); err != nil {
			log.Print(err)
		}
		os.Exit(0)
	}()
}

func (s *Store) Close() error {
	if s.file == nil {
		return nil
	}
	if err := s.file.Close(); err != nil {
		return errors.Wrap(err, "Could not close state file")
	}
	s.file = nil
	return nil
}

func (s *Store) Load() error {
	s.states = []*StateEntry{}
	scanner := bufio.NewScanner(s.file)
	for scanner.Scan() {
		b := scanner.Bytes()
		entry := StateEntry{}
		if err := json.Unmarshal(b, &entry); err != nil {
			return errors.Errorf("Could not unmarshal state: %v %v", string(b), err)
		}
		s.states = append(s.states, &entry)
	}

	if err := scanner.Err(); err != nil {
		return errors.Wrap(err, "Could not read from store")
	}

	return nil
}

func (s *Store) Add(entry StateEntry) error {
	s.states = append(s.states, &entry)

	jsonState, err := json.Marshal(entry)
	if err != nil {
		return errors.Wrap(err, "Can not marshal state")
	}

	_, err = s.file.Write(jsonState)
	if err != nil {
		return errors.Wrap(err, "Could not write to store")
	}
	_, err = s.file.WriteString("\n")
	if err != nil {
		return errors.Wrap(err, "Could not write to store")
	}
	err = s.file.Sync()
	if err != nil {
		return errors.Wrap(err, "Could not write to store")
	}
	return nil
}
