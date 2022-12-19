package engine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"
)

const minPreparationTime = time.Second * 2

func (e *Engine) processContinue() {

	nextActionType, nextActionForTeam := e.nextAction()
	if nextActionType == nil {
		e.gcState.ContinueAction = nil
		return
	}

	if e.gcState.ContinueAction == nil {
		e.gcState.ContinueAction = &ContinueAction{}
	}

	var continuationIssues []string
	if *nextActionType == ContinueAction_NEXT_COMMAND {
		continuationIssues = e.findIssuesForContinuation()
		issuesPresent := len(continuationIssues) > 0

		if issuesPresent {
			e.gcState.ContinueAction.ReadyAt = nil
		} else if e.gcState.ContinueAction.ReadyAt == nil {
			e.gcState.ContinueAction.ReadyAt = timestamppb.New(e.timeProvider().Add(e.preparationTime()))
		} else {
			preparationTimeLeft := e.gcState.ContinueAction.ReadyAt.AsTime().Sub(e.timeProvider())
			if preparationTimeLeft > 0 {
				continuationIssues = append(continuationIssues, fmt.Sprintf("%.1fs left for preparation", preparationTimeLeft.Seconds()))
			}
		}
	}

	e.gcState.ContinueAction.Type = nextActionType
	e.gcState.ContinueAction.ForTeam = nextActionForTeam
	e.gcState.ContinueAction.ContinuationIssues = continuationIssues

	if len(continuationIssues) == 0 &&
		*e.config.AutoContinue &&
		(e.gameConfig.ContinueFromHalt || *e.currentState.Command.Type != state.Command_HALT) {
		e.Continue(e.gcState.ContinueAction)
	}
}

func (e *Engine) preparationTime() time.Duration {
	events := e.currentState.GameEvents
	if len(events) > 0 {
		lastEvent := events[len(events)-1]
		if *lastEvent.Type == state.GameEvent_PLACEMENT_SUCCEEDED &&
			lastEvent.ByTeam() == *e.currentState.NextCommand.ForTeam {
			return 0
		}
	}
	return minPreparationTime
}
