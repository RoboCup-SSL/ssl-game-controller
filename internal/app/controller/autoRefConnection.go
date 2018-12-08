package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
	"math"
)

func (c *GameController) ProcessAutoRefRequests(id string, request refproto.AutoRefToControllerRequest) error {
	c.ConnectionMutex.Lock()
	defer c.ConnectionMutex.Unlock()
	log.Printf("Received request from autoRef '%v': %v", id, request)

	if request.GameEvent != nil {
		details := GameEventDetailsFromProto(*request.GameEvent)
		event := Event{GameEvent: &GameEvent{Type: details.EventType(), Details: details}}

		c.Engine.applyGameEventFilters(event.GameEvent)

		if c.Engine.State.GameEventBehavior[event.GameEvent.Type] == GameEventBehaviorMajority {
			validUntil := c.Engine.TimeProvider().Add(c.Config.Game.AutoRefProposalTimeout)
			newProposal := GameEventProposal{GameEvent: *event.GameEvent, ProposerId: id, ValidUntil: validUntil}

			eventPresent := false
			for _, proposal := range c.Engine.State.GameEventProposals {
				if proposal.GameEvent.Type == event.GameEvent.Type && proposal.ProposerId == newProposal.ProposerId {
					// update proposal
					*proposal = newProposal
					eventPresent = true
				}
			}
			if !eventPresent {
				c.Engine.State.GameEventProposals = append(c.Engine.State.GameEventProposals, &newProposal)
			}

			totalProposals := 0
			for _, proposal := range c.Engine.State.GameEventProposals {
				if proposal.GameEvent.Type == event.GameEvent.Type && proposal.ValidUntil.After(c.Engine.TimeProvider()) {
					totalProposals++
				}
			}

			majority := int(math.Floor(float64(len(c.AutoRefServer.Clients)) / 2.0))
			if totalProposals > majority {
				c.OnNewEvent(event)
			}
		} else {
			c.OnNewEvent(event)
		}
	}

	return nil
}
