package store

import (
	"bufio"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/jsonpb"
	"github.com/pkg/errors"
	"io"
	"log"
	"os"
	"os/signal"
	"syscall"
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

// States returns a list of all entries
func (s *Store) States() []*statemachine.StateChange {
	return s.entries
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

// CloseOnExit makes sure to close the file when program exits
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

// Backup copies the current store file to the given backup file
func (s *Store) Backup(backupFilename string) error {
	if s.file == nil {
		return errors.New("Store is not open")
	}
	backupFile, err := os.Create(backupFilename)
	if err != nil {
		return errors.Wrapf(err, "Could not create backup file %v", backupFilename)
	}
	defer func() {
		if err := backupFile.Close(); err != nil {
			log.Println("Could not close backup file")
		}
	}()
	if _, err := io.Copy(backupFile, s.file); err != nil {
		return errors.Wrapf(err, "Could not copy store file (%v) to backup file (%v)", s.filename, backupFilename)
	}
	return nil
}
