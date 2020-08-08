package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) processChangeSwitchColors(newState *state.State) (changes []*Change) {
	yellow := newState.TeamInfo(state.SSL_Team_YELLOW)
	newState.TeamState[state.SSL_Team_YELLOW.String()] = newState.TeamInfo(state.SSL_Team_BLUE)
	newState.TeamState[state.SSL_Team_BLUE.String()] = yellow
	return
}
