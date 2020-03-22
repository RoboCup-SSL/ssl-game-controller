package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"time"
)

// Tick updates the timers of the state and triggers changes if required
func (e *Engine) Tick() {
	currentTime := e.timeProvider()
	delta := currentTime.Sub(e.lastTimeUpdate)
	e.lastTimeUpdate = currentTime

	if e.countStageTime() {
		e.currentState.StageTimeElapsed += delta
		e.currentState.StageTimeLeft -= delta

		e.currentState.CurrentActionTimeRemaining -= delta
		minimumTimeRemaining := -time.Minute * 30
		if e.currentState.CurrentActionTimeRemaining < minimumTimeRemaining {
			// limit how small this time can get to avoid overflow in referee message
			e.currentState.CurrentActionTimeRemaining = minimumTimeRemaining
		}
	}

	if e.countCardTime() {
		for _, teamState := range e.currentState.TeamState {
			e.updateYellowCardTimes(teamState, delta)
		}
	}

	if e.currentState.GameState() == state.GameStateTimeout && e.currentState.CommandFor.Known() {
		e.currentState.TeamState[e.currentState.CommandFor].TimeoutTimeLeft -= delta
	}

	if e.currentState.MatchTimeStart.After(time.Unix(0, 0)) {
		newMatchDuration := currentTime.Sub(e.currentState.MatchTimeStart)
		e.currentState.MatchDuration = newMatchDuration
	}
}

func (e *Engine) countStageTime() bool {
	return e.currentState.Stage.IsPausedStage() || e.currentState.GameState() == state.GameStateRunning
}

func (e *Engine) countCardTime() bool {
	return e.currentState.GameState() == state.GameStateRunning
}

func (e *Engine) updateYellowCardTimes(teamState *state.TeamInfo, delta time.Duration) {
	for i := range teamState.YellowCards {
		if teamState.YellowCards[i].TimeRemaining < 0 {
			continue
		}
		teamState.YellowCards[i].TimeRemaining -= delta
		if teamState.YellowCards[i].TimeRemaining <= 0 {
			teamState.YellowCards[i].TimeRemaining = 0
			e.queue <- statemachine.Change{
				ChangeOrigin:   changeOriginEngine,
				YellowCardOver: &statemachine.YellowCardOver{},
			}
		}
	}
}
