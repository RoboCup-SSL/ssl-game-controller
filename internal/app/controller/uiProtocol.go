package controller

import (
	"fmt"
	"time"
)

type UiProtocolType string

const (
	UiProtocolCommand          UiProtocolType = "command"
	UiProtocolStage            UiProtocolType = "stage"
	UiProtocolCard             UiProtocolType = "card"
	UiProtocolTime             UiProtocolType = "time"
	UiProtocolGameEvent        UiProtocolType = "gameEvent"
	UiProtocolGameEventIgnored UiProtocolType = "ignoredGameEvent"
	UiProtocolModify           UiProtocolType = "modify"
)

type UiProtocolEntry struct {
	Timestamp   int64          `json:"timestamp"`
	StageTime   time.Duration  `json:"stageTime"`
	Type        UiProtocolType `json:"type"`
	Name        string         `json:"name"`
	Team        Team           `json:"team"`
	Description string         `json:"description"`
}

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

func (e *Engine) LogCommand() {
	entry := UiProtocolEntry{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      UiProtocolCommand,
		Name:      string(e.State.Command),
		Team:      e.State.CommandFor,
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

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

func (e *Engine) LogStage(stage Stage) {
	entry := UiProtocolEntry{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      UiProtocolStage,
		Name:      string(stage),
	}
	e.UiProtocol = append(e.UiProtocol, entry)
}

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
