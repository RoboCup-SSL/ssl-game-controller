package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/go-test/deep"
	"io/ioutil"
	"os"
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

	gameConfig := config.DefaultControllerConfig().Game
	sm := statemachine.NewStateMachine(gameConfig, "/tmp/foo")
	engine := NewEngine(sm, 0, tmpDir+"/store.json.stream")
	hook := make(chan statemachine.StateChange)
	engine.RegisterHook(hook)
	if err := engine.Start(); err != nil {
		t.Fatal("Could not start engine")
	}
	engine.Enqueue(statemachine.Change{
		ChangeType: statemachine.ChangeTypeNewCommand,
		NewCommand: &statemachine.NewCommand{
			Command: state.CommandHalt,
		},
	})
	gameEventType := state.GameEventType_TOO_MANY_ROBOTS
	byTeam := state.Team_YELLOW
	engine.Enqueue(statemachine.Change{
		ChangeType: statemachine.ChangeTypeAddGameEvent,
		AddGameEvent: &statemachine.AddGameEvent{
			GameEvent: state.GameEvent{
				Type: &gameEventType,
				Event: &state.GameEvent_TooManyRobots_{
					TooManyRobots: &state.GameEvent_TooManyRobots{
						ByTeam: &byTeam,
					},
				},
			},
		},
	})
	// wait for the changes to be processed
	<-hook
	<-hook
	engine.UnregisterHook(hook)
	engine.Stop()

	wantNewState := state.NewState()
	wantNewState.Command = state.CommandHalt

	gotNewState := engine.LatestStateInStore()
	diffs := deep.Equal(gotNewState, &wantNewState)
	if len(diffs) > 0 {
		t.Error("States differ: ", diffs)
	}
}
