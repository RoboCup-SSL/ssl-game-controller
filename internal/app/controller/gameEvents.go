package controller

import "time"

type GameEventType string

const (
	GameEventNone                   GameEventType = "none"
	GameEventBallLeftFieldTouchLine GameEventType = "ballLeftFieldTouchLine"
	GameEventBallLeftFieldGoalLine  GameEventType = "ballLeftFieldGoalLine"
)

type RefereeEventType string

const (
	RefereeEventCommand   RefereeEventType = "command"
	RefereeEventStage     RefereeEventType = "stage"
	RefereeEventCard      RefereeEventType = "card"
	RefereeEventGameEvent RefereeEventType = "gameEvent"
)

type RefereeEvent struct {
	Timestamp   time.Time        `json:"timestamp"`
	StageTime   time.Duration    `json:"stageTime"`
	Type        RefereeEventType `json:"type"`
	Name        string           `json:"name"`
	Team        Team             `json:"team"`
	Description string           `json:"description"`
}
