package controller

import "time"

type GameEventType string

type RefereeEventType string

const (
	RefereeEventCommand   RefereeEventType = "command"
	RefereeEventGameEvent RefereeEventType = "gameEvent"
)

type RefereeEvent struct {
	Timestamp     time.Time        `json:"timestamp"`
	StageTime     time.Duration    `json:"stageTime"`
	Type          RefereeEventType `json:"type"`
	GameEventType *GameEventType   `json:"gameEventType"`
	Command       *RefCommand      `json:"command"`
	Team          *Team            `json:"team"`
	Description   *string          `json:"description"`
}
