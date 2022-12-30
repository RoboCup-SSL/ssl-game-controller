package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

func (e *Engine) processPenalty() {
	if e.IsGameEventEnabled(state.GameEvent_PENALTY_KICK_FAILED) &&
		*e.currentState.GameState.Type == state.GameState_PENALTY &&
		goDur(e.currentState.CurrentActionTimeRemaining) < 0 {
		var location *geom.Vector2
		if e.trackerStateGc.Ball != nil {
			location = e.trackerStateGc.Ball.Pos.ToVector2()
		}
		reason := "Time run out"
		e.Enqueue(createGameEventChange(state.GameEvent_PENALTY_KICK_FAILED, &state.GameEvent{
			Event: &state.GameEvent_PenaltyKickFailed_{
				PenaltyKickFailed: &state.GameEvent_PenaltyKickFailed{
					ByTeam:   e.currentState.GameState.ForTeam,
					Location: location,
					Reason:   &reason,
				},
			},
		}))
	}
}
