package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/proto"
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
	case ContinueAction_FORCE_START:
		e.Enqueue(createCommandChange(state.NewCommandNeutral(state.Command_FORCE_START)))
	case ContinueAction_FREE_KICK:
		e.Enqueue(createCommandChange(state.NewCommand(state.Command_DIRECT, *action.ForTeam)))
	case ContinueAction_NEXT_COMMAND:
		e.Enqueue(createCommandChange(e.currentState.NextCommand))
	case ContinueAction_BALL_PLACEMENT_START:
		if action.ForTeam.Known() {
			e.Enqueue(createCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, *action.ForTeam)))
		} else {
			logWillNotContinue("No team for ball placement specified")
		}
	case ContinueAction_BALL_PLACEMENT_COMPLETE:
		forTeam := e.currentState.GameState.ForTeam
		if forTeam != nil {
			e.Enqueue(createBallPlacementSucceededEventChange(*forTeam))
		}
	case ContinueAction_BALL_PLACEMENT_FAIL:
		forTeam := e.currentState.GameState.ForTeam
		if forTeam != nil {
			e.Enqueue(createBallPlacementFailedEventChange(*forTeam))
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
	case ContinueAction_END_GAME:
		postGameStage := state.Referee_POST_GAME
		e.Enqueue(createStageChange(&postGameStage))
	case ContinueAction_ACCEPT_GOAL:
		possibleGoals := e.currentState.FindGameEventsByTeam(state.GameEvent_POSSIBLE_GOAL, *action.ForTeam)
		if len(possibleGoals) == 1 {
			possibleGoal := possibleGoals[0]
			goal := state.GameEvent_Goal{}
			proto.Merge(&goal, possibleGoal.GetPossibleGoal())
			goal.Message = new(string)
			*goal.Message = "Accepted by GC operator"
			goalEvent := &state.GameEvent{
				Event: &state.GameEvent_Goal_{
					Goal: &goal,
				},
			}
			e.Enqueue(createGameEventChange(state.GameEvent_GOAL, goalEvent))
		} else {
			log.Println("No possible goal event present to accept")
		}
	case ContinueAction_NORMAL_START:
		e.Enqueue(createCommandChange(state.NewCommandNeutral(state.Command_NORMAL_START)))
	case ContinueAction_CHALLENGE_ACCEPT:
		e.Enqueue(createChallengeFlagHandledEventChange(*action.ForTeam, true))
	case ContinueAction_CHALLENGE_REJECT:
		e.Enqueue(createChallengeFlagHandledEventChange(*action.ForTeam, false))
	default:
		log.Println("Unknown continue action: ", *action.Type)
	}
}

func logWillNotContinue(message string) {
	log.Println("Will not continue: ", message)
}
