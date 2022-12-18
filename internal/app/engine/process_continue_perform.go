package engine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
)

func (e *Engine) performContinueAction(action *ContinueAction) {
	if e.gcState.ContinueAction == nil {
		logWillNotContinue("No action available anymore")
		return
	}
	if *e.gcState.ContinueAction.Type != *action.Type {
		logWillNotContinue(fmt.Sprintf("Continue action type changed from %s to %s",
			e.gcState.ContinueAction.Type.String(), action.Type.String()))
		return
	}

	switch *action.Type {
	case ContinueAction_HALT:
		e.Enqueue(statemachine.CreateCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	case ContinueAction_STOP, ContinueAction_TIMEOUT_STOP:
		e.Enqueue(statemachine.CreateCommandChange(state.NewCommandNeutral(state.Command_STOP)))
	case ContinueAction_NEXT_COMMAND:
		e.Enqueue(statemachine.CreateCommandChange(e.currentState.NextCommand))
	case ContinueAction_BALL_PLACEMENT:
		if action.ForTeam != nil {
			e.Enqueue(statemachine.CreateCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, *action.ForTeam)))
		} else {
			logWillNotContinue("No team for ball placement specified")
		}
	case ContinueAction_TIMEOUT_START:
		if action.ForTeam != nil {
			e.Enqueue(statemachine.CreateCommandChange(state.NewCommand(state.Command_TIMEOUT, *action.ForTeam)))
		} else {
			logWillNotContinue("No team for timeout specified")
		}
	case ContinueAction_BOT_SUBSTITUTION:
		e.Enqueue(statemachine.CreateBotSubstitutionEventChange(action.ForTeam))
	}
}

func logWillNotContinue(message string) {
	log.Println("Will not continue: ", message)
}
