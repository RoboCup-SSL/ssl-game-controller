package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) newCommandChange(command state.RefCommand) Change {
	return s.newCommandWithTeamChange(command, state.Team_UNKNOWN)
}

func (s *StateMachine) newCommandWithTeamChange(command state.RefCommand, team state.Team) Change {
	return Change{
		NewCommand: &NewCommand{
			Command:    command,
			CommandFor: team,
		},
	}
}
