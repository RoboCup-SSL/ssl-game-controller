package store

import (
	"bufio"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/jsonpb"
	"github.com/pkg/errors"
	"os"
	"path/filepath"
	"time"
)

// Store streams entries into a file store
type Store struct {
	filename  string
	file      *os.File
	entries   []*statemachine.StateChange
	marshaler jsonpb.Marshaler
}

// NewStore creates a new store
func NewStore(filename string) (s *Store) {
	s = new(Store)
	s.filename = filename
	s.entries = []*statemachine.StateChange{}
	return
}

// Entries returns a list of all entries
func (s *Store) Entries() []*statemachine.StateChange {
	return s.entries
}

// FindEntry searches for an entry with the given id and returns it, if found
func (s *Store) FindEntry(id int32) *statemachine.StateChange {
	for _, change := range s.entries {
		if *change.Id == id {
			return change
		}
	}
	return nil
}

// LatestEntry returns the latest entry in the store or nil if there is none yet
func (s *Store) LatestEntry() *statemachine.StateChange {
	if len(s.entries) > 0 {
		return s.entries[len(s.entries)-1]
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

// Close closes the store and underlying file
func (s *Store) Close() error {
	if s.file == nil {
		return nil
	}
	if err := s.file.Close(); err != nil {
		return errors.Wrap(err, "Could not close store file")
	}
	s.file = nil
	return nil
}

// Load loads all entries from the store file into memory
func (s *Store) Load() error {
	s.entries = []*statemachine.StateChange{}
	scanner := bufio.NewScanner(s.file)
	for scanner.Scan() {
		b := scanner.Text()
		entry := new(statemachine.StateChange)
		if err := jsonpb.UnmarshalString(b, entry); err != nil {
			return errors.Errorf("Could not unmarshal entry: %v %v", b, err)
		}
		s.entries = append(s.entries, entry)
	}

	if err := scanner.Err(); err != nil {
		return errors.Wrap(err, "Could not read from store")
	}

	return nil
}

// Add adds a new entry to the store
func (s *Store) Add(entry *statemachine.StateChange) error {
	entry.Id = new(int32)
	*entry.Id = int32(len(s.entries))
	s.entries = append(s.entries, entry)

	jsonState, err := s.marshaler.MarshalToString(entry)
	if err != nil {
		return errors.Wrap(err, "Can not marshal entry")
	}

	_, err = s.file.WriteString(jsonState)
	if err != nil {
		return errors.Wrapf(err, "Could not write '%v' to store", jsonState)
	}
	_, err = s.file.WriteString("\n")
	if err != nil {
		return errors.Wrap(err, "Could not write '\n' to store")
	}
	return nil
}

// Reset closes the store, creates a backup and initializes the store with an empty state
func (s *Store) Reset() error {
	if err := s.Close(); err != nil {
		return errors.Wrap(err, "Could not close current store file")
	}
	if len(s.entries) > 0 {
		base := filepath.Base(s.filename)
		path := filepath.Dir(s.filename)
		backupFile := filepath.Join(path, time.Now().Format("2006-01-02_15-04-05-MST")+"_"+base)
		if err := os.Rename(s.filename, backupFile); err != nil {
			return errors.Wrap(err, "Could not rename store file")
		}
	}
	if err := s.Open(); err != nil {
		return errors.Wrap(err, "Could not reopen new empty store")
	}
	s.entries = []*statemachine.StateChange{}
	return nil
}
