package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) processChangeSwitchColors(newState *state.State) (changes []*Change) {
	yellow := newState.TeamInfo(state.Team_YELLOW)
	newState.TeamState[state.Team_YELLOW.String()] = newState.TeamInfo(state.Team_BLUE)
	newState.TeamState[state.Team_BLUE.String()] = yellow

	// 'FirstKickoffTeam' is bound to the team, not the color, so we have to also switch this
	*newState.FirstKickoffTeam = newState.FirstKickoffTeam.Opposite()
	return
}
