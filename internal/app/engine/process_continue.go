package engine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
	"time"
)

const minPreparationTime = time.Second * 2

func (e *Engine) processContinue() {

	nextActionType, nextActionForTeam := e.nextAction()
	if nextActionType == ContinueAction_TYPE_UNKNOWN {
		e.gcState.ContinueAction = nil
		return
	}

	if e.gcState.ContinueAction == nil {
		e.gcState.ContinueAction = &ContinueAction{}
	}

	var actionState = ContinueAction_STATE_UNKNOWN
	var continuationIssues []string
	if nextActionType == ContinueAction_NEXT_COMMAND {
		continuationIssues = e.findIssuesForContinuation()
		issuesPresent := len(continuationIssues) > 0

		if issuesPresent {
			e.gcState.ContinueAction.ReadyAt = nil
			actionState = ContinueAction_BLOCKED
		} else if e.gcState.ContinueAction.ReadyAt == nil {
			e.gcState.ContinueAction.ReadyAt = timestamppb.New(e.timeProvider().Add(e.preparationTime()))
			actionState = ContinueAction_WAITING
		} else {
			preparationTimeLeft := e.gcState.ContinueAction.ReadyAt.AsTime().Sub(e.timeProvider())
			if preparationTimeLeft > 0 {
				continuationIssues = append(continuationIssues, fmt.Sprintf("%.1fs left for preparation", preparationTimeLeft.Seconds()))
				actionState = ContinueAction_WAITING
			} else {
				actionState = ContinueAction_READY_AUTO
			}
		}
	} else if e.autoContinueFromAction(nextActionType) {
		actionState = ContinueAction_READY_AUTO
	} else {
		actionState = ContinueAction_READY_MANUAL
	}

	e.gcState.ContinueAction.Type = &nextActionType
	e.gcState.ContinueAction.ForTeam = &nextActionForTeam
	e.gcState.ContinueAction.ContinuationIssues = continuationIssues
	e.gcState.ContinueAction.State = &actionState

	if *e.config.AutoContinue && actionState == ContinueAction_READY_AUTO {
		e.Continue(e.gcState.ContinueAction)
	}
}

func (e *Engine) autoContinueFromAction(action ContinueAction_Type) bool {
	switch action {
	case ContinueAction_RESUME_FROM_HALT:
		return e.gameConfig.ContinueFromHalt
	case ContinueAction_TYPE_UNKNOWN,
		ContinueAction_HALT,
		ContinueAction_TIMEOUT_START,
		ContinueAction_TIMEOUT_STOP,
		ContinueAction_BOT_SUBSTITUTION,
		ContinueAction_NEXT_STAGE,
		ContinueAction_BALL_PLACEMENT_CANCEL,
		ContinueAction_STOP_GAME:
		return false
	case ContinueAction_NEXT_COMMAND,
		ContinueAction_BALL_PLACEMENT_START:
		return true
	default:
		log.Println("Unhandled action: ", action)
		return false
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
