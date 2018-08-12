package controller

import (
	"encoding/json"
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
	json.Unmarshal(bytes, &stateTransitions)
	config := DefaultConfig().Game
	e := NewEngine(config)
	e.TimeProvider = func() time.Time {
		return time.Unix(1, 0)
	}
	for i, s := range stateTransitions {

		if s.Event != nil {
			e.Process(*s.Event)

			if s.State != nil && !reflect.DeepEqual(*e.State, *s.State) {
				t.Errorf("Step %v of %v failed.\nExpected: %v\n     got: %v", i+1, fileName, *s.State, *e.State)
			}
		}

		if s.State != nil {
			e.State = s.State
		}
	}
}
