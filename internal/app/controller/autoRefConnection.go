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
	gameEvent := GameEvent{Type: details.EventType(), Details: details}
	gameEvent.Origins = []string{id}

	c.Engine.applyGameEventFilters(&gameEvent)

	validUntil := c.Engine.TimeProvider().Add(c.Config.Game.AutoRefProposalTimeout)
	proposal := GameEventProposal{GameEvent: gameEvent, ProposerId: id, ValidUntil: validUntil}
	proposal.GameEvent.Origins = []string{id}

	recentGameEvent := c.Engine.IsRecentGameEvent(&gameEvent)
	if !recentGameEvent && c.Engine.applyMajority(&gameEvent) {
		log.Printf("Apply majority logic to autoRef proposal %v", proposal)
		if c.Engine.isNewProposal(&proposal) {
			// the autoRef has not submitted the same event recently, so add it to the proposals - waiting for majority
			c.Engine.GcState.GameEventProposals = append(c.Engine.GcState.GameEventProposals, &proposal)
		}

		matchingProposals := c.Engine.collectAllMatchingProposals(&gameEvent)
		numProposals := len(matchingProposals)
		majority := int(math.Floor(float64(len(c.AutoRefServer.Clients)) / 2.0))
		if numProposals > majority {
			// there is a majority for a game event that has not yet been submitted to the GC
			// remove the matching proposals and submit the events to the GC
			log.Printf("Majority (%v > %v) for %v", numProposals, majority, gameEvent)
			for _, proposal := range matchingProposals {
				c.OnNewEvent(Event{GameEvent: &proposal.GameEvent})
			}
			c.Engine.GcState.GameEventProposals = c.Engine.collectNonMatchingProposals(gameEvent.Type)
		}
	} else {
		// no majority required or event submitted recently. Submit event to engine
		log.Printf("Submit %v game event proposal to engine: %v", recentGameEventString(recentGameEvent), gameEvent)
		c.OnNewEvent(Event{GameEvent: &gameEvent})
	}

	return nil
}

func recentGameEventString(isRecent bool) string {
	if isRecent {
		return "recent"
	}
	return "new"
}

func (e *Engine) collectAllMatchingProposals(event *GameEvent) []*GameEventProposal {
	var proposals []*GameEventProposal
	for _, proposal := range e.GcState.GameEventProposals {
		if proposal.GameEvent.Type == event.Type && e.proposalValid(proposal) {
			proposals = append(proposals, proposal)
		}
	}
	return proposals
}

func (e *Engine) collectNonMatchingProposals(eventType GameEventType) []*GameEventProposal {
	var proposals []*GameEventProposal
	for _, proposal := range e.GcState.GameEventProposals {
		if proposal.GameEvent.Type != eventType {
			proposals = append(proposals, proposal)
		}
	}
	return proposals
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

func (e *Engine) applyMajority(event *GameEvent) bool {
	return e.GcState.GameEventBehavior[event.Type] == GameEventBehaviorMajority
}
