package store

import (
	"bufio"
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/pkg/errors"
	"io"
	"log"
	"os"
	"os/signal"
	"syscall"
)

type Entry statemachine.StateChange

type Store struct {
	filename string
	file     *os.File
	entries  []*Entry
}

func NewStore(filename string) (s *Store) {
	s = new(Store)
	s.filename = filename
	s.entries = []*Entry{}
	return
}

func (s *Store) States() []*Entry {
	return s.entries
}

func (s *Store) LatestEntry() *Entry {
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
		return errors.Wrap(err, "Could not close store file")
	}
	s.file = nil
	return nil
}

func (s *Store) Load() error {
	s.entries = []*Entry{}
	scanner := bufio.NewScanner(s.file)
	for scanner.Scan() {
		b := scanner.Bytes()
		entry := Entry{}
		if err := json.Unmarshal(b, &entry); err != nil {
			return errors.Errorf("Could not unmarshal entry: %v %v", string(b), err)
		}
		s.entries = append(s.entries, &entry)
	}

	if err := scanner.Err(); err != nil {
		return errors.Wrap(err, "Could not read from store")
	}

	return nil
}

func (s *Store) Add(entry Entry) error {
	s.entries = append(s.entries, &entry)

	jsonState, err := json.Marshal(entry)
	if err != nil {
		return errors.Wrap(err, "Can not marshal entry")
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
