package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

func (e *Engine) processEmergencyStop() {
	for _, team := range state.BothTeams() {
		if e.emergencyEventPresent(team) {
			continue
		}
		dueIn := e.EmergencyStopDueIn(team)
		if dueIn != nil &&
			(*e.currentState.GameState.Type != state.GameState_RUNNING || *dueIn <= 0) {
			byTeam := team
			e.Enqueue(createGameEventChange(state.GameEvent_EMERGENCY_STOP,
				&state.GameEvent{
					Event: &state.GameEvent_EmergencyStop_{
						EmergencyStop: &state.GameEvent_EmergencyStop{
							ByTeam: &byTeam,
						},
					},
				},
			))
		}
	}
}

func (e *Engine) EmergencyStopDueIn(team state.Team) *time.Duration {
	now := e.timeProvider()
	emergencyStopSince := e.currentState.TeamInfo(team).RequestsEmergencyStopSince
	if emergencyStopSince == nil {
		return nil
	}
	timeSinceEmergencyStopRequest := now.Sub(goTime(emergencyStopSince))
	due := e.gameConfig.EmergencyStopGracePeriod - timeSinceEmergencyStopRequest
	return &due
}

func (e *Engine) emergencyEventPresent(team state.Team) bool {
	for _, event := range e.currentState.GameEvents {
		if *event.Type == state.GameEvent_EMERGENCY_STOP &&
			event.ByTeam() == team {
			return true
		}
	}
	return false
}
