package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (e *Engine) performContinueAction(action *ContinueAction) {
	switch *action.Type {
	case ContinueAction_HALT:
		e.Enqueue(createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	case ContinueAction_RESUME_FROM_HALT,
		ContinueAction_TIMEOUT_STOP,
		ContinueAction_STOP_GAME,
		ContinueAction_BALL_PLACEMENT_CANCEL:
		e.Enqueue(createCommandChange(state.NewCommandNeutral(state.Command_STOP)))
	case ContinueAction_RESUME_FROM_STOP:
		e.Enqueue(createCommandChange(state.NewCommandNeutral(state.Command_FORCE_START)))
	case ContinueAction_NEXT_COMMAND:
		e.Enqueue(createCommandChange(e.currentState.NextCommand))
	case ContinueAction_BALL_PLACEMENT_START:
		if action.ForTeam.Known() {
			e.Enqueue(createCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, *action.ForTeam)))
		} else {
			logWillNotContinue("No team for ball placement specified")
		}
	case ContinueAction_TIMEOUT_START:
		if action.ForTeam.Known() {
			e.Enqueue(createCommandChange(state.NewCommand(state.Command_TIMEOUT, *action.ForTeam)))
		} else {
			logWillNotContinue("No team for timeout specified")
		}
	case ContinueAction_BOT_SUBSTITUTION:
		e.Enqueue(createBotSubstitutionEventChange(*action.ForTeam))
	case ContinueAction_NEXT_STAGE:
		e.Enqueue(createStageChange(e.currentState.Stage.Next()))
	}
}

func logWillNotContinue(message string) {
	log.Println("Will not continue: ", message)
}
