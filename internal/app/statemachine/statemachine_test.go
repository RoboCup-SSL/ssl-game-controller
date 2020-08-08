package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/go-test/deep"
	"github.com/golang/protobuf/ptypes"
	"testing"
	"time"
)

func Test_Statemachine(t *testing.T) {

	gameConfig := config.DefaultControllerConfig().Game
	type args struct {
		initState func(*state.State)
		change    *Change
	}
	firstHalf := state.Referee_NORMAL_FIRST_HALF
	tests := []struct {
		name         string
		args         args
		wantNewState func(*state.State)
	}{
		{
			name: "Command",
			args: args{
				initState: func(s *state.State) {
				},
				change: &Change{
					Change: &Change_NewCommand{
						NewCommand: &NewCommand{
							Command: state.NewCommand(state.Command_DIRECT, state.SSL_Team_BLUE),
						},
					},
				}},
			wantNewState: func(s *state.State) {
				s.Command = state.NewCommand(state.Command_DIRECT, state.SSL_Team_BLUE)
				s.CurrentActionTimeRemaining = ptypes.DurationProto(gameConfig.FreeKickTimeout[config.DivA])
				s.GameState = state.NewGameStateWithTeam(state.GameState_FREE_KICK, state.SSL_Team_BLUE)
			},
		},
		{
			name: "Stage",
			args: args{
				initState: func(s *state.State) {
					*s.Stage = state.Referee_NORMAL_FIRST_HALF_PRE
				},
				change: &Change{
					Change: &Change_ChangeStage{
						ChangeStage: &ChangeStage{
							NewStage: &firstHalf,
						},
					},
				},
			},
			wantNewState: func(s *state.State) {
				*s.Stage = state.Referee_NORMAL_FIRST_HALF
				s.StageTimeLeft = ptypes.DurationProto(gameConfig.Normal.HalfDuration)
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			sm := NewStateMachine(gameConfig)
			sm.timeProvider = func() time.Time { return time.Now() }
			currentState := state.NewState()
			tt.args.initState(currentState)
			newState := state.NewState()
			tt.wantNewState(newState)

			gotNewState, _ := sm.Process(currentState, tt.args.change)
			diffs := deep.Equal(gotNewState, newState)
			if len(diffs) > 0 {
				t.Error("Entries differ: ", diffs)
			}
		})
	}
}
