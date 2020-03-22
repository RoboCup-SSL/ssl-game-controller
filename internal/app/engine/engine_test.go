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
	gameConfig.StateStoreFile = tmpDir + "/store.json.stream"
	engine := NewEngine(gameConfig)
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
	// wait for the changes to be processed
	<-hook
	engine.UnregisterHook(hook)
	engine.Stop()

	wantNewState := state.NewState()
	wantNewState.Command = state.CommandHalt

	gotNewState := engine.currentState
	diffs := deep.Equal(gotNewState, &wantNewState)
	if len(diffs) > 0 {
		t.Error("States differ: ", diffs)
	}
}
