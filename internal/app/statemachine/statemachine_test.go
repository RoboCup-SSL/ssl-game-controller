package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"reflect"
	"testing"
)

func Test_Statemachine(t *testing.T) {

	type args struct {
		currentState *state.State
		change       Change
	}
	gameEventTypeGoalLine := state.GameEventType_BALL_LEFT_FIELD_GOAL_LINE
	gameEventTypeCrash := state.GameEventType_BOT_CRASH_DRAWN
	tests := []struct {
		name         string
		args         args
		wantNewState *state.State
	}{
		{
			name: "Command",
			args: args{
				currentState: &state.State{},
				change: Change{
					ChangeType: ChangeTypeNewCommand,
					NewCommand: &NewCommand{
						Command:    state.CommandBallPlacement,
						CommandFor: state.Team_BLUE,
					},
				}},
			wantNewState: &state.State{
				Command:    state.CommandBallPlacement,
				CommandFor: state.Team_BLUE,
			},
		},
		{
			name: "GameEvent",
			args: args{
				currentState: &state.State{
					GameEvents: []state.GameEvent{{Type: &gameEventTypeCrash}},
				},
				change: Change{
					ChangeType: ChangeTypeAddGameEvent,
					AddGameEvent: &AddGameEvent{
						GameEvent: state.GameEvent{Type: &gameEventTypeGoalLine},
					},
				},
			},
			wantNewState: &state.State{
				GameEvents: []state.GameEvent{
					{Type: &gameEventTypeCrash},
					{Type: &gameEventTypeGoalLine},
				},
			},
		},
	}
	gameConfig := config.DefaultControllerConfig().Game
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			sm := NewStateMachine(gameConfig, "/tmp/foo")
			if gotNewState, _ := sm.Process(tt.args.currentState, tt.args.change); !reflect.DeepEqual(gotNewState, tt.wantNewState) {
				t.Errorf("Process() != want:\n%v\n%v", gotNewState, tt.wantNewState)
			}
		})
	}
}
