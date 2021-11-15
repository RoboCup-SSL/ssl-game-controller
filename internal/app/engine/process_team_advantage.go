package engine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

var defaultResponse = TeamAdvantageResponse_STOP

func (e *Engine) processTeamAdvantageResponse() {

	for _, team := range state.BothTeams() {
		advantageResponse := e.gcState.TeamState[team.String()].LastAdvantageResponse
		if advantageResponse == nil {
			e.gcState.TeamState[team.String()].LastAdvantageResponse = &TeamAdvantageResponse{
				Response: &defaultResponse,
			}
		}
	}
}
