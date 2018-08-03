package controller

import (
	"encoding/json"
	"io/ioutil"
	"path/filepath"
	"reflect"
	"testing"
)

type StateTransitions struct {
	Event *Event `json:"event"`
	State *State `json:"state"`
}

func Test_transitions(t *testing.T) {
	path := filepath.Join("testdata", "stateTransitions.json")
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	stateTransitions := make([]StateTransitions, 0)
	json.Unmarshal(bytes, &stateTransitions)

	config := DefaultConfig().Game
	e := NewEngine(config)
	for _, s := range stateTransitions {

		if s.Event != nil {
			e.Process(*s.Event)

			if s.State != nil && !reflect.DeepEqual(*e.State, *s.State) {
				t.Errorf("\nExpected: %v\n     got: %v", *s.State, *e.State)
			}
		}

		if s.State != nil {
			e.State = s.State
		}
	}
}
