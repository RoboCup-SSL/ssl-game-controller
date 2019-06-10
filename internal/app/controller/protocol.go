package controller

import (
	"fmt"
	"github.com/odeke-em/go-uuid"
	"log"
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
	// UiProtocolGameEvent represents an issued game event
	UiProtocolGameEventQueued UiProtocolType = "gameEventQueued"
	// UiProtocolGameEventIgnored represents a detected game event that was not issued
	UiProtocolGameEventIgnored UiProtocolType = "ignoredGameEvent"
	// UiProtocolModify represents a manual modification on the state
	UiProtocolModify UiProtocolType = "modify"
	// UiProtocolTeamAction represents an action from a team
	UiProtocolTeamAction UiProtocolType = "teamAction"
	// UiProtocolHint represents a hint to the human game-controller operator
	UiProtocolHint UiProtocolType = "hint"
)

func (e *Engine) newGlobalProtocolEntryId() string {
	return uuid.New()
}

// ProtocolEntry represents a single protocol entry as should be displayed in the UI table
type ProtocolEntry struct {
	Id            string         `json:"id"`
	Timestamp     int64          `json:"timestamp"`
	StageTime     time.Duration  `json:"stageTime"`
	Type          UiProtocolType `json:"type"`
	Name          string         `json:"name"`
	Team          Team           `json:"team"`
	Description   string         `json:"description"`
	PreviousState *State         `json:"previousState"`
}

// LogGameEvent adds a game event to the protocol
func (e *Engine) LogGameEvent(event *GameEvent, prevState *State) {
	log.Printf("Log game event: %v", event)
	entry := ProtocolEntry{
		Id:            e.newGlobalProtocolEntryId(),
		Timestamp:     e.TimeProvider().UnixNano(),
		StageTime:     e.State.StageTimeElapsed,
		Type:          UiProtocolGameEvent,
		Name:          string(event.Type),
		Team:          event.ByTeam(),
		Description:   event.Details.String(),
		PreviousState: prevState,
	}
	e.PersistentState.Add(&entry)
}

// LogGameEvent adds a game event to the protocol
func (e *Engine) LogGameEventQueued(event *GameEvent, prevState *State) {
	log.Printf("Log queued game event: %v", event)
	entry := ProtocolEntry{
		Id:            e.newGlobalProtocolEntryId(),
		Timestamp:     e.TimeProvider().UnixNano(),
		StageTime:     e.State.StageTimeElapsed,
		Type:          UiProtocolGameEventQueued,
		Name:          string(event.Type),
		Team:          event.ByTeam(),
		Description:   event.Details.String(),
		PreviousState: prevState,
	}
	e.PersistentState.Add(&entry)
}

// LogIgnoredGameEvent adds an ignored game event to the protocol
func (e *Engine) LogIgnoredGameEvent(event *GameEvent) {
	log.Printf("Log ignored game event: %v", event)
	entry := ProtocolEntry{
		Id:          e.newGlobalProtocolEntryId(),
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolGameEventIgnored,
		Name:        string(event.Type),
		Team:        event.ByTeam(),
		Description: event.Details.String(),
	}
	e.PersistentState.Add(&entry)
}

// LogCommand adds a command to the protocol
func (e *Engine) LogCommand(command RefCommand, commandFor Team, prevState *State) {
	description := ""
	if e.State.PlacementPos != nil {
		description = fmt.Sprintf("place pos: %v", e.State.PlacementPos)
	}
	log.Printf("Log command '%v' for '%v': %v", string(command), commandFor, description)
	entry := ProtocolEntry{
		Id:            e.newGlobalProtocolEntryId(),
		Timestamp:     e.TimeProvider().UnixNano(),
		StageTime:     e.State.StageTimeElapsed,
		Type:          UiProtocolCommand,
		Name:          string(command),
		Team:          commandFor,
		Description:   description,
		PreviousState: prevState,
	}
	e.PersistentState.Add(&entry)
}

// LogCard adds a card to the protocol
func (e *Engine) LogCard(card *EventCard, prevState *State) {
	log.Printf("Log card: %v", card)
	entry := ProtocolEntry{
		Id:            e.newGlobalProtocolEntryId(),
		Timestamp:     e.TimeProvider().UnixNano(),
		StageTime:     e.State.StageTimeElapsed,
		Type:          UiProtocolCard,
		Name:          fmt.Sprintf("%v %v card", card.Operation, card.Type),
		Team:          card.ForTeam,
		PreviousState: prevState,
	}
	e.PersistentState.Add(&entry)
}

// LogTime adds a time event (like stage time ends or card time ends) to the protocol
func (e *Engine) LogTime(description string, forTeam Team) {
	log.Printf("Log time for %v: %v", forTeam, description)
	entry := ProtocolEntry{
		Id:        e.newGlobalProtocolEntryId(),
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      UiProtocolTime,
		Name:      description,
		Team:      forTeam,
	}
	e.PersistentState.Add(&entry)
}

// LogStage adds a stage change to the protocol
func (e *Engine) LogStage(stage Stage, prevState *State) {
	log.Printf("Log stage: %v", stage)
	entry := ProtocolEntry{
		Id:            e.newGlobalProtocolEntryId(),
		Timestamp:     e.TimeProvider().UnixNano(),
		StageTime:     e.State.StageTimeElapsed,
		Type:          UiProtocolStage,
		Name:          string(stage),
		PreviousState: prevState,
	}
	e.PersistentState.Add(&entry)
}

// LogModify adds a modification to the protocol
func (e *Engine) LogModify(m EventModifyValue) {
	log.Printf("Log modify: %v", m)
	entry := ProtocolEntry{
		Id:          e.newGlobalProtocolEntryId(),
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolModify,
		Name:        m.Type(),
		Team:        m.ForTeam,
		Description: m.Value(),
	}
	e.PersistentState.Add(&entry)
}

// LogTeamGoalkeeperChange adds a goalkeeper change from a team to the protocol
func (e *Engine) LogTeamGoalkeeperChange(forTeam Team, oldGoalkeeperId int, newGoalkeeperId int) {
	description := fmt.Sprintf("%v -> %v", oldGoalkeeperId, newGoalkeeperId)
	log.Printf("Log goal keeper change for %v: %v", forTeam, description)
	entry := ProtocolEntry{
		Id:          e.newGlobalProtocolEntryId(),
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolTeamAction,
		Name:        "Goalkeeper",
		Team:        forTeam,
		Description: description,
	}
	e.PersistentState.Add(&entry)
}

// LogTeamBotSubstitutionChange adds a bot substitution intend change from a team to the protocol
func (e *Engine) LogTeamBotSubstitutionChange(forTeam Team, substituteBot bool) {
	log.Printf("Log bot substitution for %v: %v", forTeam, substituteBot)
	description := fmt.Sprintf("%v", substituteBot)
	entry := ProtocolEntry{
		Id:          e.newGlobalProtocolEntryId(),
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolTeamAction,
		Name:        "BotSubstitutionIntend",
		Team:        forTeam,
		Description: description,
	}
	e.PersistentState.Add(&entry)
}

// LogHint adds a hint for the game-controller operator to the protocol
func (e *Engine) LogHint(hint string, description string, team Team) {
	log.Printf("Log hint '%v' for %v: %v", hint, team, description)
	entry := ProtocolEntry{
		Id:          e.newGlobalProtocolEntryId(),
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        UiProtocolHint,
		Team:        team,
		Name:        hint,
		Description: description,
	}
	e.PersistentState.Add(&entry)
}
