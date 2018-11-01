package controller

import (
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"io/ioutil"
	"log"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
	"time"
)

type StateTransitions struct {
	Event *Event `json:"event"`
	State *State `json:"state"`
}

func Test_transitions(t *testing.T) {
	files, err := ioutil.ReadDir("testdata")
	if err != nil {
		t.Fatal(err)
	}
	for _, f := range files {
		if !f.IsDir() && strings.HasPrefix(f.Name(), "transition_") {
			processTransitionFile(t, f.Name())
		}
	}
}

func processTransitionFile(t *testing.T, fileName string) {
	log.Printf("Process %v", fileName)
	path := filepath.Join("testdata", fileName)
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	stateTransitions := make([]StateTransitions, 0)
	if err := json.Unmarshal(bytes, &stateTransitions); err != nil {
		t.Fatal("Could not unmarshal state transitions:", err)
	}
	cfg := config.DefaultControllerConfig().Game
	e := NewEngine(cfg)
	e.TimeProvider = func() time.Time {
		ts, err := time.Parse("2006-01-02T15:04:05Z", "2006-01-02T15:04:05Z")
		if err != nil {
			t.Fatal("Could not parse time")
		}
		return ts
	}
	for i, s := range stateTransitions {

		if s.Event != nil {
			if err := e.Process(*s.Event); err != nil {
				t.Fatalf("Could not process event: %v", *s.Event)
			}

			if s.State != nil && !reflect.DeepEqual(*e.State, *s.State) {
				t.Errorf("Step %v of %v failed.\nExpected: %v\n     got: %v", i+1, fileName, *s.State, *e.State)
			}
		}

		if s.State != nil {
			e.State = s.State
		}
	}
}
