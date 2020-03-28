package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/duration"
	"github.com/golang/protobuf/ptypes/timestamp"
	"log"
	"time"
)

// Tick updates the timers of the state and triggers changes if required
func (e *Engine) Tick() {
	currentTime := e.timeProvider()
	delta := currentTime.Sub(e.lastTimeUpdate)
	e.lastTimeUpdate = currentTime

	if e.countStageTime() {
		addDur(e.currentState.StageTimeElapsed, delta)
		addDur(e.currentState.StageTimeLeft, -delta)

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
}

func (e *Engine) countStageTime() bool {
	return e.currentState.Stage.IsPausedStage() || e.currentState.Command.IsRunning()
}

func (e *Engine) countCardTime() bool {
	return e.currentState.Command.IsRunning()
}

func (e *Engine) updateYellowCardTimes(teamState *state.TeamInfo, delta time.Duration) {
	for i := range teamState.YellowCards {
		if goDur(teamState.YellowCards[i].TimeRemaining) < 0 {
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

func goDur(duration *duration.Duration) time.Duration {
	goDur, err := ptypes.Duration(duration)
	if err != nil {
		log.Printf("Could not parse duration: %v", duration)
	}
	return goDur
}

func goTime(timestamp *timestamp.Timestamp) time.Time {
	goTime, err := ptypes.Timestamp(timestamp)
	if err != nil {
		log.Printf("Could not parse timestamp: %v", timestamp)
	}
	return goTime
}

func addDur(duration *duration.Duration, delta time.Duration) {
	goDur, err := ptypes.Duration(duration)
	if err != nil {
		log.Printf("Could not parse duration: %v", duration)
	}
	*duration = *ptypes.DurationProto(goDur + delta)
}
