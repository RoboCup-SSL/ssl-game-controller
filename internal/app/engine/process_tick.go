package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/ptypes"
	"log"
	"time"
)

// processTick updates the timers of the state and triggers changes if required
func (e *Engine) processTick() {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	currentTime := e.timeProvider()
	delta := currentTime.Sub(e.lastTimeUpdate)
	e.lastTimeUpdate = currentTime

	if e.countStageTime() {
		addDur(e.currentState.StageTimeElapsed, delta)
		addDur(e.currentState.StageTimeLeft, -delta)
	}

	if e.countCurrentActionTime() {
		addDur(e.currentState.CurrentActionTimeRemaining, -delta)
		minimumTimeRemaining := -time.Minute * 30
		if goDur(e.currentState.CurrentActionTimeRemaining) < minimumTimeRemaining {
			// limit how small this time can get to avoid overflow in referee message
			e.currentState.CurrentActionTimeRemaining = ptypes.DurationProto(minimumTimeRemaining)
		}
	}

	if e.countCardTime() {
		for _, teamState := range e.currentState.TeamState {
			e.updateYellowCardTimes(teamState, delta)
		}
	}

	if *e.currentState.Command.Type == state.Command_TIMEOUT {
		addDur(e.currentState.TeamInfo(*e.currentState.Command.ForTeam).TimeoutTimeLeft, -delta)
	}

	if goDur(e.currentState.CurrentActionTimeRemaining) < 0 {
		switch *e.currentState.GameState.Type {
		case state.GameState_KICKOFF, state.GameState_FREE_KICK:
			revertible := false
			e.Enqueue(&statemachine.Change{
				Origin:     &changeOriginEngine,
				Revertible: &revertible,
				Change: &statemachine.Change_NewGameState{
					NewGameState: &statemachine.NewGameState{
						GameState: state.NewGameStateNeutral(state.GameState_RUNNING),
					},
				},
			})
		}
	}

	e.noProgressDetector.process()
	e.ballPlacementCoordinator.process()
	e.processContinue()
	e.processBotNumber()
	e.processPenalty()
	e.processProposals()
	e.processTrackerSources()

	stateCopy := e.currentState.Clone()
	hookOut := HookOut{State: stateCopy}
	for _, hook := range e.hooks {
		select {
		case hook <- hookOut:
		case <-time.After(1 * time.Second):
			log.Printf("processTick: Hook unresponsive! Failed to sent %v", hookOut)
		}
	}
}

func (e *Engine) countStageTime() bool {
	return e.currentState.Stage.IsPausedStage() || e.currentState.Command.IsRunning()
}

func (e *Engine) countCurrentActionTime() bool {
	return e.countStageTime() || *e.currentState.Command.Type == state.Command_BALL_PLACEMENT
}

func (e *Engine) countCardTime() bool {
	return e.currentState.Command.IsRunning()
}

func (e *Engine) updateYellowCardTimes(teamState *state.TeamInfo, delta time.Duration) {
	for i := range teamState.YellowCards {
		if goDur(teamState.YellowCards[i].TimeRemaining) <= 0 {
			continue
		}
		addDur(teamState.YellowCards[i].TimeRemaining, -delta)
		if goDur(teamState.YellowCards[i].TimeRemaining) <= 0 {
			teamState.YellowCards[i].TimeRemaining = ptypes.DurationProto(0)
			e.queue <- &statemachine.Change{
				Origin: &changeOriginEngine,
				Change: &statemachine.Change_YellowCardOver{
					YellowCardOver: &statemachine.YellowCardOver{},
				},
			}
		}
	}
}
