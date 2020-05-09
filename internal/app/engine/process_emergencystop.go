package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

func (e *Engine) processEmergencyStop() {
	if *e.currentState.GameState.Type != state.GameState_RUNNING {
		return
	}

	for _, team := range state.BothTeams() {
		emergencyStopSince := e.currentState.TeamInfo(team).RequestsEmergencyStopSince
		if emergencyStopSince != nil {
			now := e.timeProvider()
			if now.Sub(goTime(emergencyStopSince)) > e.gameConfig.EmergencyStopGracePeriod {
				eventType := state.GameEvent_EMERGENCY_STOP
				e.EnqueueGameEvent(&state.GameEvent{
					Type: &eventType,
					Event: &state.GameEvent_EmergencyStop_{
						EmergencyStop: &state.GameEvent_EmergencyStop{
							ByTeam: &team,
						},
					},
				})
			}
		}
	}
}
