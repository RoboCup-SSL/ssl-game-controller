package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
	"math"
)

func (c *GameController) ProcessAutoRefRequests(id string, request refproto.AutoRefToController) error {
	c.ConnectionMutex.Lock()
	defer c.ConnectionMutex.Unlock()

	if request.GameEvent == nil {
		return nil
	}

	log.Printf("Received request from autoRef '%v': %v", id, request)

	details := GameEventDetailsFromProto(*request.GameEvent)
	event := Event{GameEvent: &GameEvent{Type: details.EventType(), Details: details}}

	c.Engine.applyGameEventFilters(event.GameEvent)

	validUntil := c.Engine.TimeProvider().Add(c.Config.Game.AutoRefProposalTimeout)
	proposal := GameEventProposal{GameEvent: *event.GameEvent, ProposerId: id, ValidUntil: validUntil}

	if matchingEvent := c.Engine.State.FindMatchingRecentGameEvent(event.GameEvent); matchingEvent != nil {
		// there was already such a game event recently. Just add the proposer to the existing event.
		matchingEvent.Origins = append(matchingEvent.Origins, id)
	} else if c.Engine.applyMajority(&event) { // look for a majority

		if c.Engine.isNewProposal(&proposal) {
			// the autoRef has not submitted the same event recently, so add it to the proposals - waiting for majority
			c.Engine.GcState.GameEventProposals = append(c.Engine.GcState.GameEventProposals, &proposal)
		}

		numProposals := c.Engine.numberOfMatchingProposals(event.GameEvent)
		majority := int(math.Floor(float64(len(c.AutoRefServer.Clients)) / 2.0))
		if numProposals > majority {
			// there is a majority for a game event that has not yet been submitted to the GC
			// remove the matching proposals and submit the event to the GC
			c.OnNewEvent(event)
		}

	} else {
		// game event has not been submitted recently (by any autoRef) and no majority required.
		// Just submit this event
		event.GameEvent.Origins = []string{id}
		c.OnNewEvent(event)
	}

	return nil
}

func (e *Engine) numberOfMatchingProposals(event *GameEvent) (count int) {
	count = 0
	for _, proposal := range e.GcState.GameEventProposals {
		if proposal.GameEvent.Type == event.Type && e.proposalValid(proposal) {
			count++
		}
	}
	return
}

func (e *Engine) collectAllMatchingProposals(event *GameEvent) []*GameEventProposal {
	var proposals []*GameEventProposal
	for _, proposal := range e.GcState.GameEventProposals {
		if proposal.GameEvent.Type == event.Type {
			proposals = append(proposals, proposal)
		}
	}
	return proposals
}

func (e *Engine) collectNonMatchingProposals(event *GameEvent) []*GameEventProposal {
	var proposals []*GameEventProposal
	for _, proposal := range e.GcState.GameEventProposals {
		if proposal.GameEvent.Type != event.Type {
			proposals = append(proposals, proposal)
		}
	}
	return proposals
}

func collectAllOrigins(proposals []*GameEventProposal) []string {
	var origins []string
	for _, proposal := range proposals {
		origins = append(origins, proposal.ProposerId)
	}
	return origins
}

func (e *Engine) proposalValid(proposal *GameEventProposal) bool {
	return proposal.ValidUntil.After(e.TimeProvider())
}

func (e *Engine) isNewProposal(newProposal *GameEventProposal) bool {
	for _, proposal := range e.GcState.GameEventProposals {
		if proposal.GameEvent.Type == newProposal.GameEvent.Type &&
			proposal.ProposerId == newProposal.ProposerId &&
			e.proposalValid(proposal) {
			return false
		}
	}
	return true
}

func (e *Engine) applyMajority(event *Event) bool {
	return e.GcState.GameEventBehavior[event.GameEvent.Type] == GameEventBehaviorMajority
}
