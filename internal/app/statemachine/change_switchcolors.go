package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) SwitchColors(newState *state.State) (changes []*Change) {
	yellow := newState.TeamInfo(state.Team_YELLOW)
	newState.TeamState[int32(state.Team_YELLOW)] = newState.TeamInfo(state.Team_BLUE)
	newState.TeamState[int32(state.Team_BLUE)] = yellow
	return
}
