package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
	"math"
)

func (e *Engine) processProposals() {
	for _, group := range e.currentState.ProposalGroups {
		latestGameEvent := group.Proposals[len(group.Proposals)-1].GameEvent
		behavior := e.config.GameEventBehavior[latestGameEvent.Type.String()]
		if *group.Accepted ||
			e.groupIsStillAcceptingProposals(group) ||
			behavior == Config_BEHAVIOR_PROPOSE_ONLY {
			continue
		}
		numProposals := e.uniqueAcceptingOrigins(group)
		numAutoRefs := e.numAutoRefs(latestGameEvent)
		majority := int(math.Floor(float64(numAutoRefs) / 2.0))

		var acceptedBy string
		if behavior == Config_BEHAVIOR_ACCEPT {
			acceptedBy = "Engine"
		} else if behavior == Config_BEHAVIOR_ACCEPT_MAJORITY && numProposals > majority {
			log.Printf("Majority of %v reached with %v out of %v for %v.", majority, numProposals, numAutoRefs, latestGameEvent.Type)
			acceptedBy = "Majority"
		} else {
			continue
		}

		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AcceptProposalGroupChange{
				AcceptProposalGroupChange: &statemachine.Change_AcceptProposalGroup{
					GroupId:    group.Id,
					AcceptedBy: &acceptedBy,
				},
			},
		})
	}
}

func (e *Engine) uniqueAcceptingOrigins(group *state.ProposalGroup) int {
	origins := map[string]bool{}
	for _, p := range group.Proposals {
		for _, o := range p.GameEvent.Origin {
			if _, ok := e.config.AutoRefConfigs[o]; !ok {
				continue
			}
			if e.config.AutoRefConfigs[o].GameEventBehavior[p.GameEvent.Type.String()] == AutoRefConfig_BEHAVIOR_ACCEPT {
				origins[o] = true
			}
		}
	}
	return len(origins)
}

func (e *Engine) groupIsStillAcceptingProposals(group *state.ProposalGroup) bool {
	firstProposal := group.Proposals[0]

	now := e.timeProvider()
	proposalTimeout := e.gameConfig.AutoRefProposalTimeout

	return now.Sub(firstProposal.Timestamp.AsTime()) < proposalTimeout
}

func (e *Engine) numAutoRefs(gameEvent *state.GameEvent) (n int) {
	autoRefs := make([]string, 0, len(e.gcState.AutoRefState))
	for autoRef := range e.gcState.AutoRefState {
		autoRefs = append(autoRefs, autoRef)
	}
	for _, autoRef := range autoRefs {
		behavior := e.config.AutoRefConfigs[autoRef].GameEventBehavior[gameEvent.Type.String()]
		if behavior == AutoRefConfig_BEHAVIOR_ACCEPT {
			n++
		}
	}
	return
}
