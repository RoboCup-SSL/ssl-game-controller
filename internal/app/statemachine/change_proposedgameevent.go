package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/google/uuid"
	"time"
)

const similarLocationTolerance = 0.5

func (s *StateMachine) processChangeAddProposal(newState *state.State, change *Change_AddProposal) (changes []*Change) {

	if ok, pid := findGroup(change.Proposal, newState.ProposalGroups, s.gameConfig.AutoRefProposalTimeout); ok {
		newState.ProposalGroups[pid].Proposals = append(newState.ProposalGroups[pid].Proposals, change.Proposal)
	} else {
		groupId := uuid.NewString()
		newState.ProposalGroups = append(newState.ProposalGroups, &state.ProposalGroup{
			Proposals: []*state.Proposal{change.Proposal},
			Accepted:  new(bool),
			Id:        &groupId,
		})
	}

	return
}

func findGroup(proposal *state.Proposal, proposals []*state.ProposalGroup, timeout time.Duration) (bool, int) {
	for i, group := range proposals {
		latestProposal := group.Proposals[len(group.Proposals)-1]
		if gameEventsSimilar(proposal.GameEvent, latestProposal.GameEvent) &&
			(isNonTimeoutEvent(proposal) || proposal.Timestamp.AsTime().Sub(latestProposal.Timestamp.AsTime()) < timeout) {
			return true, i
		}
	}
	return false, -1
}

func isNonTimeoutEvent(proposal *state.Proposal) bool {
	switch *proposal.GameEvent.Type {
	case state.GameEvent_PLACEMENT_SUCCEEDED,
		state.GameEvent_PLACEMENT_FAILED,
		state.GameEvent_PENALTY_KICK_FAILED:
		// Do not apply timeout to those events, as they are valid for the whole game stage
		return true
	}
	return false
}

func isBallLeftFieldEvent(e *state.GameEvent) bool {
	switch *e.Type {
	case state.GameEvent_AIMLESS_KICK,
		state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
		state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE:
		return true
	}
	return false
}

func gameEventsSimilar(e1, e2 *state.GameEvent) bool {
	if isBallLeftFieldEvent(e1) && isBallLeftFieldEvent(e2) {
		// All ball left field events are similar
		return true
	}

	if *e1.Type != *e2.Type {
		return false
	}
	// check similarity based on details for some events:
	switch *e1.Type {
	case state.GameEvent_BOT_TOO_FAST_IN_STOP:
		return similarTeam(e1.GetBotTooFastInStop().ByTeam, e2.GetBotTooFastInStop().ByTeam) &&
			similarBot(e1.GetBotTooFastInStop().ByBot, e2.GetBotTooFastInStop().ByBot)
	case state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT:
		return similarTeam(e1.GetDefenderTooCloseToKickPoint().ByTeam, e2.GetDefenderTooCloseToKickPoint().ByTeam) &&
			similarBot(e1.GetDefenderTooCloseToKickPoint().ByBot, e2.GetDefenderTooCloseToKickPoint().ByBot)
	case state.GameEvent_BOT_CRASH_DRAWN:
		return similarBot(e1.GetBotCrashDrawn().BotYellow, e2.GetBotCrashDrawn().BotYellow) &&
			similarBot(e1.GetBotCrashDrawn().BotBlue, e2.GetBotCrashDrawn().BotBlue) &&
			similarLocation(e1.GetBotCrashDrawn().Location, e2.GetBotCrashDrawn().Location, similarLocationTolerance)
	case state.GameEvent_BOT_CRASH_UNIQUE:
		return similarTeam(e1.GetBotCrashUnique().ByTeam, e2.GetBotCrashUnique().ByTeam) &&
			similarBot(e1.GetBotCrashUnique().Violator, e2.GetBotCrashUnique().Violator) &&
			similarBot(e1.GetBotCrashUnique().Victim, e2.GetBotCrashUnique().Victim) &&
			similarLocation(e1.GetBotCrashUnique().Location, e2.GetBotCrashUnique().Location, similarLocationTolerance)
	case state.GameEvent_BOT_PUSHED_BOT:
		return similarTeam(e1.GetBotPushedBot().ByTeam, e2.GetBotPushedBot().ByTeam) &&
			similarBot(e1.GetBotPushedBot().Violator, e2.GetBotPushedBot().Violator) &&
			similarBot(e1.GetBotPushedBot().Victim, e2.GetBotPushedBot().Victim) &&
			similarLocation(e1.GetBotPushedBot().Location, e2.GetBotPushedBot().Location, similarLocationTolerance)
	case state.GameEvent_DEFENDER_IN_DEFENSE_AREA:
		return similarTeam(e1.GetDefenderInDefenseArea().ByTeam, e2.GetDefenderInDefenseArea().ByTeam) &&
			similarBot(e1.GetDefenderInDefenseArea().ByBot, e2.GetDefenderInDefenseArea().ByBot)
	case state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA:
		return similarTeam(e1.GetAttackerTouchedBallInDefenseArea().ByTeam, e2.GetAttackerTouchedBallInDefenseArea().ByTeam) &&
			similarBot(e1.GetAttackerTouchedBallInDefenseArea().ByBot, e2.GetAttackerTouchedBallInDefenseArea().ByBot)
	case state.GameEvent_BOT_KICKED_BALL_TOO_FAST:
		return similarTeam(e1.GetBotKickedBallTooFast().ByTeam, e2.GetBotKickedBallTooFast().ByTeam)
	case state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR:
		return similarTeam(e1.GetBotDribbledBallTooFar().ByTeam, e2.GetBotDribbledBallTooFar().ByTeam)
	case state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL:
		return similarTeam(e1.GetAttackerDoubleTouchedBall().ByTeam, e2.GetAttackerDoubleTouchedBall().ByTeam)
	case state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA:
		return similarTeam(e1.GetAttackerTooCloseToDefenseArea().ByTeam, e2.GetAttackerTooCloseToDefenseArea().ByTeam) &&
			similarBot(e1.GetAttackerTooCloseToDefenseArea().ByBot, e2.GetAttackerTooCloseToDefenseArea().ByBot)
	case state.GameEvent_BOT_INTERFERED_PLACEMENT:
		return similarTeam(e1.GetBotInterferedPlacement().ByTeam, e2.GetBotInterferedPlacement().ByTeam) &&
			similarBot(e1.GetBotInterferedPlacement().ByBot, e2.GetBotInterferedPlacement().ByBot)
	}

	// all others are considered similar based on the type only
	return true
}

func similarTeam(t1, t2 *state.Team) bool {
	return (t1 == nil && t2 == nil) || (t1 != nil && t2 != nil && *t1 == *t2)
}

func similarBot(b1, b2 *uint32) bool {
	return (b1 == nil && b2 == nil) || (b1 != nil && b2 != nil && *b1 == *b2)
}

func similarLocation(l1, l2 *geom.Vector2, tolerance float64) bool {
	return (l1 == nil && l2 == nil) || (l1 != nil && l2 != nil && l1.DistanceTo(l2) <= tolerance)
}
