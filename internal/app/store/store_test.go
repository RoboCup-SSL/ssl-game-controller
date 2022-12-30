package store

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/go-test/deep"
	"os"
	"testing"
)

func TestStore(t *testing.T) {
	tmpDir, err := os.MkdirTemp("", "")
	if err != nil {
		t.Fatal("Could not create a temporary directory: ", err)
	}
	defer func() {
		if err := os.RemoveAll(tmpDir); err != nil {
			t.Fatalf("Could not cleanup tmpDir %v: %v", tmpDir, err)
		}
	}()

	d := NewStore(tmpDir + "/store.json.stream")
	if err := d.Open(); err != nil {
		t.Fatal("Could not open db: ", err)
	}

	s1 := state.NewState()
	s1.Command = state.NewCommand(state.Command_BALL_PLACEMENT, state.Team_BLUE)
	if err := d.Add(&statemachine.StateChange{State: s1}); err != nil {
		t.Fatalf("Could not save state %v: %v", s1, err)
	}
	s2 := state.NewState()
	*s2.Stage = state.Referee_NORMAL_FIRST_HALF_PRE
	if err := d.Add(&statemachine.StateChange{State: s2}); err != nil {
		t.Fatalf("Could not save state %v: %v", s2, err)
	}

	createdStates := d.Entries()
	if len(createdStates) != 2 {
		t.Errorf("Expected 2 states: %v", createdStates)
	}

	if err := d.Close(); err != nil {
		t.Error("Could not close db: ", err)
	}

	d = NewStore(tmpDir + "/store.json.stream")
	if err := d.Open(); err != nil {
		t.Fatal("Could not open db: ", err)
	}
	if err := d.Load(); err != nil {
		t.Fatal("Could not open db: ", err)
	}

	loadedStates := d.Entries()
	if len(loadedStates) != 2 {
		t.Errorf("Expected 2 states: %v", loadedStates)
	}

	for i, createdState := range createdStates {
		loadedState := loadedStates[i]
		diffs := deep.Equal(loadedState, createdState)
		if len(diffs) > 0 {
			t.Error("Entries differ: ", diffs)
		}
	}
}
