package statemachine

import (
	"testing"
	"time"

	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

func Test_isGoalValid(t *testing.T) {
	chippedGoal := func() *state.GameEvent {
		byTeam := state.Team_BLUE
		maxBallHeight := float32(0.3)
		return &state.GameEvent{
			Event: &state.GameEvent_PossibleGoal{
				PossibleGoal: &state.GameEvent_Goal{
					ByTeam:        &byTeam,
					KickingTeam:   &byTeam,
					MaxBallHeight: &maxBallHeight,
				},
			},
		}
	}

	tests := []struct {
		name      string
		gameState *state.GameState
		wantValid bool
	}{
		{
			name:      "chipped goal during running game",
			gameState: state.NewGameStateNeutral(state.GameState_RUNNING),
			wantValid: false,
		},
		{
			name:      "chipped goal during free kick",
			gameState: state.NewGameStateWithTeam(state.GameState_FREE_KICK, state.Team_BLUE),
			wantValid: false,
		},
		{
			name:      "chipped goal during penalty kick",
			gameState: state.NewGameStateWithTeam(state.GameState_PENALTY, state.Team_BLUE),
			wantValid: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			sm := NewStateMachine(config.DefaultControllerConfig().Game)
			sm.timeProvider = func() time.Time { return time.Now() }
			newState := state.NewState()
			newState.GameState = tt.gameState

			valid, message := sm.isGoalValid(newState, chippedGoal())
			if valid != tt.wantValid {
				t.Errorf("isGoalValid() = %v (%q), want %v", valid, message, tt.wantValid)
			}
		})
	}
}
