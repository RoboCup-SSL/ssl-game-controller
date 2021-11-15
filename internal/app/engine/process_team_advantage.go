package engine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

var defaultChoice = TeamAdvantageChoice_STOP

func (e *Engine) processTeamAdvantageChoice() {

	for _, team := range state.BothTeams() {
		advantageChoice := e.gcState.TeamState[team.String()].AdvantageChoice
		if advantageChoice == nil {
			e.gcState.TeamState[team.String()].AdvantageChoice = &TeamAdvantageChoice{
				Choice: &defaultChoice,
			}
		}
	}
}
