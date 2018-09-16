package controller

import (
	"time"
)

type RefereeEventType string

const (
	RefereeEventCommand          RefereeEventType = "command"
	RefereeEventStage            RefereeEventType = "stage"
	RefereeEventCard             RefereeEventType = "card"
	RefereeEventTime             RefereeEventType = "time"
	RefereeEventGameEvent        RefereeEventType = "gameEvent"
	RefereeEventGameEventIgnored RefereeEventType = "ignoredGameEvent"
	RefereeEventModify           RefereeEventType = "modify"
)

type RefereeEvent struct {
	Timestamp   int64            `json:"timestamp"`
	StageTime   time.Duration    `json:"stageTime"`
	Type        RefereeEventType `json:"type"`
	Name        string           `json:"name"`
	Team        Team             `json:"team"`
	Description string           `json:"description"`
}
