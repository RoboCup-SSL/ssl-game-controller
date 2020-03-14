package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/store"
	"io/ioutil"
	"os"
	"reflect"
	"testing"
)

func Test_Engine(t *testing.T) {
	tmpDir, err := ioutil.TempDir("", "")
	if err != nil {
		t.Fatal("Could not create a temporary directory: ", err)
	}
	defer func() {
		if err := os.RemoveAll(tmpDir); err != nil {
			t.Fatalf("Could not cleanup tmpDir %v: %v", tmpDir, err)
		}
	}()

	engine := NewEngine(tmpDir + "/store.json.stream")
	hook := make(chan store.StateEntry)
	engine.RegisterHook(hook)
	if err := engine.Start(); err != nil {
		t.Fatal("Could not start engine")
	}
	engine.Enqueue(statemachine.Change{
		ChangeType: statemachine.ChangeTypeCommand,
		NewCommand: statemachine.NewCommand{
			Command:    state.CommandBallPlacement,
			CommandFor: state.TeamBlue,
		},
	})
	engine.Enqueue(statemachine.Change{
		ChangeType: statemachine.ChangeTypeGameEvent,
		AddGameEvent: statemachine.AddGameEvent{
			GameEvent: state.GameEvent{Type: state.GameEventBallLeftFieldGoalLine},
		},
	})
	// wait for the changes to be processed
	<-hook
	<-hook

	engine.Stop()

	wantNewState := &state.State{
		Command:    state.CommandBallPlacement,
		CommandFor: state.TeamBlue,
		GameEvents: []state.GameEvent{
			{Type: state.GameEventBallLeftFieldGoalLine},
		},
	}

	if gotNewState := engine.State(); !reflect.DeepEqual(gotNewState, wantNewState) {
		t.Errorf("State mismatch:\n%v\n%v", gotNewState, wantNewState)
	}
}
