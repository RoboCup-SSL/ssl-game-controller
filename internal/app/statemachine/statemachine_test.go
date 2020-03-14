package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"reflect"
	"testing"
)

func Test_process(t *testing.T) {

	type args struct {
		currentState *state.State
		change       Change
	}
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
					ChangeType: ChangeTypeCommand,
					NewCommand: NewCommand{
						Command:    state.CommandBallPlacement,
						CommandFor: state.TeamBlue,
					},
				}},
			wantNewState: &state.State{
				Command:    state.CommandBallPlacement,
				CommandFor: state.TeamBlue,
			},
		},
		{
			name: "GameEvent",
			args: args{
				currentState: &state.State{
					GameEvents: []state.GameEvent{{Type: state.GameEventBotCrashDrawn}},
				},
				change: Change{
					ChangeType: ChangeTypeGameEvent,
					AddGameEvent: AddGameEvent{
						GameEvent: state.GameEvent{Type: state.GameEventBallLeftFieldGoalLine},
					},
				}},
			wantNewState: &state.State{
				GameEvents: []state.GameEvent{
					{Type: state.GameEventBotCrashDrawn},
					{Type: state.GameEventBallLeftFieldGoalLine},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotNewState := process(tt.args.currentState, tt.args.change); !reflect.DeepEqual(gotNewState, tt.wantNewState) {
				t.Errorf("process() != want:\n%v\n%v", gotNewState, tt.wantNewState)
			}
		})
	}
}
