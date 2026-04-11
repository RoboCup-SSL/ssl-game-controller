package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) processChangeSwitchColors(newState *state.State) (changes []*Change) {
	yellow := newState.TeamInfo(state.Team_YELLOW)
	newState.TeamState[state.Team_YELLOW.String()] = newState.TeamInfo(state.Team_BLUE)
	newState.TeamState[state.Team_BLUE.String()] = yellow

	// 'FirstKickoffTeam' is bound to the team, not the color, so we have to also switch this
	*newState.FirstKickoffTeam = newState.FirstKickoffTeam.Opposite()

	// 'NextCommand' and 'Command' are bound to the team, not the color, so we have to also switch these
	if newState.NextCommand != nil && newState.NextCommand.ForTeam != nil {
		*newState.NextCommand.ForTeam = newState.NextCommand.ForTeam.Opposite()
	}
	if newState.Command != nil && newState.Command.ForTeam != nil {
		*newState.Command.ForTeam = newState.Command.ForTeam.Opposite()
	}
	return
}
