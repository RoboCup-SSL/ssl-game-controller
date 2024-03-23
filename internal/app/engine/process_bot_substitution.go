package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

func (e *Engine) processBotSubstitution() {
	if e.currentState.GameState.IsHalted() {
		for _, team := range state.BothTeams() {
			if !*e.currentState.TeamInfo(team).BotSubstitutionAllowed {
				continue
			}
			events := e.currentState.FindGameEventsByTeam(state.GameEvent_BOT_SUBSTITUTION, team)
			if len(events) == 0 {
				continue
			}
			botSubstitutionEvent := events[len(events)-1]
			eventCreated := time.UnixMicro(int64(*botSubstitutionEvent.CreatedTimestamp))
			if e.timeProvider().Sub(eventCreated) > e.gameConfig.BotSubstitutionTime {
				e.Enqueue(createBotSubstitutionEventChange(team))
			}
		}
	}
}
