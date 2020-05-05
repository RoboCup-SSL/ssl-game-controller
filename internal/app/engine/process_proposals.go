package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
	"math"
	"time"
)

func (e *Engine) processProposals() {

	now := e.timeProvider()
	proposalTimeout := e.gameConfig.AutoRefProposalTimeout
	minTime := now.Add(-proposalTimeout)

	for i, group := range e.currentState.ProposalGroups {
		if *group.Accepted || groupHasRecentProposal(group, minTime) {
			continue
		}
		numProposals := uniqueOrigins(group)
		latestGameEvent := group.Proposals[len(group.Proposals)-1].GameEvent
		numAutoRefs := e.numAutoRefs(latestGameEvent)
		majority := int(math.Floor(float64(numAutoRefs) / 2.0))

		if numProposals > majority {
			log.Printf("Majority of %v reached with %v out of %v for %v.", majority, numProposals, numAutoRefs, latestGameEvent.Type)
			groupId := uint32(i)
			acceptedBy := "Majority"
			e.Enqueue(&statemachine.Change{
				Change: &statemachine.Change_AcceptProposalGroup{
					AcceptProposalGroup: &statemachine.AcceptProposalGroup{
						GroupId:    &groupId,
						AcceptedBy: &acceptedBy,
					},
				},
			})
		}
	}
}

func uniqueOrigins(group *state.ProposalGroup) int {
	origins := map[string]bool{}
	for _, p := range group.Proposals {
		for _, o := range p.GameEvent.Origin {
			origins[o] = true
		}
	}
	return len(origins)
}

func groupHasRecentProposal(group *state.ProposalGroup, minTime time.Time) bool {
	latestProposal := group.Proposals[len(group.Proposals)-1]
	return goTime(latestProposal.Timestamp).Before(minTime)
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
