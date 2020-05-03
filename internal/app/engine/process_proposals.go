package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
	"math"
	"sort"
	"time"
)

const similarLocationTolerance = 0.5

func (e *Engine) processProposals() {

	deadline := e.timeProvider().Add(-e.gameConfig.AutoRefProposalTimeout)
	matchingProposals := collectMatchingProposals(e.currentState.GameEventProposals, deadline)
	numProposals := len(matchingProposals)
	if numProposals == 0 {
		return
	}

	sort.Slice(matchingProposals, func(i, j int) bool {
		return goTime(matchingProposals[i].Timestamp).Before(goTime(matchingProposals[j].Timestamp))
	})

	firstGameEvent := matchingProposals[0].GameEvent
	numAutoRefs := e.numAutoRefs(firstGameEvent)
	majority := int(math.Floor(float64(numAutoRefs) / 2.0))

	if numProposals > majority {
		log.Printf("Majority (%v > %v) reached for %v.", numProposals, majority, firstGameEvent.Type)
		e.Enqueue(&statemachine.Change{
			Change: &statemachine.Change_AcceptGameEventProposals{
				AcceptGameEventProposals: &statemachine.AcceptGameEventProposals{
					Proposals: matchingProposals,
				},
			},
		})
	}
}

func (e *Engine) numAutoRefs(gameEvent *state.GameEvent) (n int) {
	autoRefs := make([]string, 0, len(e.gcState.AutoRefState))
	for autoRef := range e.gcState.AutoRefState {
		autoRefs = append(autoRefs, autoRef)
	}
	for _, autoRef := range autoRefs {
		if e.config.AutoRefConfigs[autoRef].GameEventEnabled[gameEvent.Type.String()] {
			n++
		}
	}
	return
}

func collectMatchingProposals(events []*state.GameEventProposal, deadline time.Time) []*state.GameEventProposal {
	proposals := [][]*state.GameEventProposal{}
	for _, proposal := range events {
		if (proposal.Accepted != nil && *proposal.Accepted) ||
			goTime(proposal.Timestamp).After(deadline) {
			continue
		}
		if ok, pid := findGroup(proposal, proposals); ok {
			proposals[pid] = append(proposals[pid], proposal)
			continue
		}
		proposals = append(proposals, []*state.GameEventProposal{proposal})
	}

	if len(proposals) == 0 {
		return []*state.GameEventProposal{}
	}

	sort.SliceStable(proposals, func(i, j int) bool {
		return len(proposals[i]) > len(proposals[j])
	})

	return proposals[0]
}

func findGroup(proposal *state.GameEventProposal, proposals [][]*state.GameEventProposal) (bool, int) {
	for i, p := range proposals {
		if gameEventsSimilar(proposal.GameEvent, p[0].GameEvent) {
			return true, i
		}
	}
	return false, -1
}

func gameEventsSimilar(e1, e2 *state.GameEvent) bool {
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
