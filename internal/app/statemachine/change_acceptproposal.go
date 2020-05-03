package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/proto"
	"log"
	"reflect"
)

func (s *StateMachine) processChangeAcceptGameEventProposals(newState *state.State, change *AcceptGameEventProposals) (changes []*Change) {

	majorityEvent := s.createMergedGameEvent(change.Proposals)
	changes = append(changes, &Change{
		Change: &Change_AddGameEvent{
			AddGameEvent: &AddGameEvent{
				GameEvent: majorityEvent,
			},
		},
	})

	for _, proposal := range newState.GameEventProposals {
		for _, acceptedProposal := range change.Proposals {
			if reflect.DeepEqual(proposal, acceptedProposal) {
				proposal.Accepted = new(bool)
				*proposal.Accepted = true
				break
			}
		}
	}

	return
}

func (s *StateMachine) createMergedGameEvent(events []*state.GameEventProposal) *state.GameEvent {
	event := new(state.GameEvent)
	proto.Merge(event, events[0].GameEvent)
	event.Origin = []string{}
	byTeam := map[state.Team]int{}
	for _, e := range events {
		event.Origin = append(event.Origin, e.GameEvent.Origin...)
		byTeam[event.ByTeam()]++
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
