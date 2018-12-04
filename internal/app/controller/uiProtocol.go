package controller

import (
	"fmt"
	"time"
)

// UiProtocolType represents the type of a protocol entry
type UiProtocolType string

const (
	// UiProtocolCommand represents an issued referee command
	UiProtocolCommand UiProtocolType = "command"
	// UiProtocolStage represents a changed stage
	UiProtocolStage UiProtocolType = "stage"
	// UiProtocolCard represents an issued card
	UiProtocolCard UiProtocolType = "card"
	// UiProtocolTime represents an elapsed time, like stage time or card time
	UiProtocolTime UiProtocolType = "time"
	// UiProtocolGameEvent represents an issued game event
	UiProtocolGameEvent UiProtocolType = "gameEvent"
	// UiProtocolGameEventIgnored represents a detected game event that was not issued
	UiProtocolGameEventIgnored UiProtocolType = "ignoredGameEvent"
	// UiProtocolModify represents a manual modification on the state
	UiProtocolModify UiProtocolType = "modify"
	// UiProtocolTeamAction represents an action from a team
	UiProtocolTeamAction UiProtocolType = "teamAction"
)

// UiProtocolEntry represents a single protocol entry as should be displayed in the UI table
type UiProtocolEntry struct {
	Timestamp   int64          `json:"timestamp"`
	StageTime   time.Duration  `json:"stageTime"`
	Type        UiProtocolType `json:"type"`
	Name        string         `json:"name"`
	Team        Team           `json:"team"`
	Description string         `json:"description"`
}

// LogGameEvent adds a game event to the protocol
func (e *Engine) LogGameEvent(event GameEvent) {
	entry := UiProtocolEntry{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolGameEvent,
		Name:        string(event.Type),
		Team:        event.ByTeam(),
		Description: event.Details.String(),
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogIgnoredGameEvent adds an ignored game event to the protocol
func (e *Engine) LogIgnoredGameEvent(event GameEvent) {
	entry := UiProtocolEntry{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolGameEventIgnored,
		Name:        string(event.Type),
		Team:        event.ByTeam(),
		Description: event.Details.String(),
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogCommand adds a command to the protocol
func (e *Engine) LogCommand() {
	description := ""
	if e.State.PlacementPos != nil {
		description = e.State.PlacementPos.String()
	}
	entry := UiProtocolEntry{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolCommand,
		Name:        string(e.State.Command),
		Team:        e.State.CommandFor,
		Description: description,
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogCard adds a card to the protocol
func (e *Engine) LogCard(card *EventCard) {
	entry := UiProtocolEntry{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      UiProtocolCard,
		Name:      fmt.Sprintf("%v %v card", card.Operation, card.Type),
		Team:      card.ForTeam,
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogTime adds a time event (like stage time ends or card time ends) to the protocol
func (e *Engine) LogTime(description string, forTeam Team) {
	entry := UiProtocolEntry{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      UiProtocolTime,
		Name:      description,
		Team:      forTeam,
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogStage adds a stage change to the protocol
func (e *Engine) LogStage(stage Stage) {
	entry := UiProtocolEntry{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      UiProtocolStage,
		Name:      string(stage),
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogModify adds a modification to the protocol
func (e *Engine) LogModify(m EventModifyValue) {
	entry := UiProtocolEntry{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolModify,
		Name:        m.Type(),
		Team:        m.ForTeam,
		Description: m.Value(),
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogTeamGoalkeeperChange adds a goalkeeper change from a team to the protocol
func (e *Engine) LogTeamGoalkeeperChange(forTeam Team, oldGoalkeeperId int, newGoalkeeperId int) {
	description := fmt.Sprintf("%v -> %v", oldGoalkeeperId, newGoalkeeperId)
	entry := UiProtocolEntry{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolTeamAction,
		Name:        "Goalkeeper",
		Team:        forTeam,
		Description: description,
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

// LogTeamBotSubstitutionChange adds a bot substitution intend change from a team to the protocol
func (e *Engine) LogTeamBotSubstitutionChange(forTeam Team, substituteBot bool) {
	description := fmt.Sprintf("%v", substituteBot)
	entry := UiProtocolEntry{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolTeamAction,
		Name:        "BotSubstitutionIntend",
		Team:        forTeam,
		Description: description,
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}
