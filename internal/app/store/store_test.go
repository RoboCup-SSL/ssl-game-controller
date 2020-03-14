package store

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/go-test/deep"
	"io/ioutil"
	"os"
	"testing"
)

func TestStore(t *testing.T) {
	t.Run("TestStore", func(t *testing.T) {
		tmpDir, err := ioutil.TempDir("", "")
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
		s1.Command = state.CommandBallPlacement
		if err := d.Add(StateEntry{s1}); err != nil {
			t.Fatalf("Could not save state %v: %v", s1, err)
		}
		s2 := state.NewState()
		s2.GameEvents = append(s2.GameEvents, &state.GameEvent{})
		if err := d.Add(StateEntry{s2}); err != nil {
			t.Fatalf("Could not save state %v: %v", s2, err)
		}

		createdStates := d.States()
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

		loadedStates := d.States()
		if len(loadedStates) != 2 {
			t.Errorf("Expected 2 states: %v", loadedStates)
		}

		for i, createdState := range createdStates {
			loadedState := loadedStates[i]
			diffs := deep.Equal(loadedState, createdState)
			if len(diffs) > 0 {
				t.Error("States differ: ", diffs)
			}
		}
	})
}
