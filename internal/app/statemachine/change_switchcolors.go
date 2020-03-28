package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) SwitchColors(newState *state.State) (changes []*Change) {
	yellow := newState.TeamInfo(state.Team_YELLOW)
	newState.TeamState[state.Team_YELLOW.String()] = newState.TeamInfo(state.Team_BLUE)
	newState.TeamState[state.Team_BLUE.String()] = yellow
	return
}
