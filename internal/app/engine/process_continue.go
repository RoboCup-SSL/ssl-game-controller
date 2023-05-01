package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

func (e *Engine) processContinue() {

	e.gcState.ContinueActions, e.gcState.ContinueHints = e.nextActions()

	var defaultAction = e.defaultAction()
	if *e.config.AutoContinue &&
		defaultAction != nil &&
		*defaultAction.State == ContinueAction_READY_AUTO {
		e.Continue(defaultAction)
	}
}

func (e *Engine) defaultAction() *ContinueAction {
	if len(e.gcState.ContinueActions) > 0 {
		return e.gcState.ContinueActions[0]
	}
	return nil
}

func createContinueAction(
	actionType ContinueAction_Type,
	forTeam state.Team,
	actionState ContinueAction_State,
) *ContinueAction {
	return &ContinueAction{
		Type:    &actionType,
		ForTeam: &forTeam,
		State:   &actionState,
	}
}
