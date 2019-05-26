package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
	"math"
)

func (c *GameController) ProcessAutoRefRequests(id string, request refproto.AutoRefToController) error {
	c.ConnectionMutex.Lock()
	defer c.ConnectionMutex.Unlock()
	log.Printf("Received request from autoRef '%v': %v", id, request)

	if request.GameEvent != nil {
		details := GameEventDetailsFromProto(*request.GameEvent)
		event := Event{GameEvent: &GameEvent{Type: details.EventType(), Details: details}}

		c.Engine.applyGameEventFilters(event.GameEvent)

		if c.Engine.GcState.GameEventBehavior[event.GameEvent.Type] == GameEventBehaviorMajority {
			validUntil := c.Engine.TimeProvider().Add(c.Config.Game.AutoRefProposalTimeout)
			newProposal := GameEventProposal{GameEvent: *event.GameEvent, ProposerId: id, ValidUntil: validUntil}

			eventPresent := false
			for _, proposal := range c.Engine.GcState.GameEventProposals {
				if proposal.GameEvent.Type == event.GameEvent.Type && proposal.ProposerId == newProposal.ProposerId {
					// update proposal
					*proposal = newProposal
					eventPresent = true
				}
			}
			if !eventPresent {
				c.Engine.GcState.GameEventProposals = append(c.Engine.GcState.GameEventProposals, &newProposal)
			}

			totalProposals := 0
			var origins []string
			for _, proposal := range c.Engine.GcState.GameEventProposals {
				if proposal.GameEvent.Type == event.GameEvent.Type && proposal.ValidUntil.After(c.Engine.TimeProvider()) {
					totalProposals++
					origins = append(origins, proposal.ProposerId)
				}
			}

			majority := int(math.Floor(float64(len(c.AutoRefServer.Clients)) / 2.0))
			if totalProposals > majority {
				event.GameEvent.Origins = origins
				c.OnNewEvent(event)
			}
		} else {
			event.GameEvent.Origins = []string{id}
			c.OnNewEvent(event)
		}
	}

	return nil
}
