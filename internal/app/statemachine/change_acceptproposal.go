package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/proto"
	"log"
)

func (s *StateMachine) processChangeAcceptProposals(newState *state.State, change *AcceptProposalGroup) (changes []*Change) {

	numGroups := len(newState.ProposalGroups)
	if int(*change.GroupId) >= numGroups {
		log.Printf("Proposal group id %v invalid, there are only  %v groups", *change.GroupId, numGroups)
		return
	}

	group := newState.ProposalGroups[*change.GroupId]
	majorityEvent := s.createMergedGameEvent(group.Proposals, change.AcceptedBy)
	changes = append(changes, &Change{
		Change: &Change_AddGameEvent{
			AddGameEvent: &AddGameEvent{
				GameEvent: majorityEvent,
			},
		},
	})

	*group.Accepted = true

	return
}

func (s *StateMachine) createMergedGameEvent(events []*state.Proposal, acceptedBy *string) *state.GameEvent {
	event := new(state.GameEvent)
	proto.Merge(event, events[0].GameEvent)
	event.Origin = []string{}
	byTeam := map[state.Team]int{}
	origins := map[string]struct{}{}
	for _, e := range events {
		for _, origin := range e.GameEvent.Origin {
			origins[origin] = struct{}{}
		}
		byTeam[event.ByTeam()]++
	}
	for origin := range origins {
		event.Origin = append(event.Origin, origin)
	}
	if acceptedBy != nil {
		event.Origin = append(event.Origin, *acceptedBy)
	}
	if byTeam[state.Team_YELLOW] > byTeam[state.Team_BLUE] {
		event.SetByTeam(state.Team_YELLOW)
	} else if byTeam[state.Team_YELLOW] < byTeam[state.Team_BLUE] {
		event.SetByTeam(state.Team_BLUE)
	} else {
		log.Printf("autoRefs undecided on team: %v. Throwing a dice.", byTeam)
		event.SetByTeam(state.Team(s.rand.Intn(2) + 1))
	}
	return event
}
