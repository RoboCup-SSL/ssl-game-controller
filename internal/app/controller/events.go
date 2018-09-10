package controller

import (
	"fmt"
	"time"
)

// CardType is one of yellow or red
type CardType string

const (
	// CardTypeYellow yellow card
	CardTypeYellow CardType = "yellow"
	// CardTypeRed red card
	CardTypeRed CardType = "red"
)

// CardOperation on a card
type CardOperation string

const (
	// CardOperationAdd add a card
	CardOperationAdd CardOperation = "add"
	// CardOperationRevoke revoke a card
	CardOperationRevoke CardOperation = "revoke"
	// CardOperationModify modify a card
	CardOperationModify CardOperation = "modify"
)

// StageOperation to apply on the current stage
type StageOperation string

const (
	// StageNext next stage
	StageNext StageOperation = "next"
	// StagePrevious previous stage
	StagePrevious StageOperation = "previous"
	// StageEndGame ends the game
	StageEndGame StageOperation = "endGame"
)

// TriggerType is something that can be triggered
type TriggerType string

const (
	// TriggerResetMatch reset match
	TriggerResetMatch TriggerType = "resetMatch"
	// TriggerSwitchColor switch color
	TriggerSwitchColor TriggerType = "switchColor"
	// TriggerSwitchSides switch sides/goals (onPositiveHalf)
	TriggerSwitchSides TriggerType = "switchSides"
	// TriggerUndo undo last action
	TriggerUndo TriggerType = "undo"
	// TriggerContinue continues based on the current game event
	TriggerContinue TriggerType = "continue"
)

// CardModification to apply to a card
type CardModification struct {
	CardID   int           `json:"cardId"`
	TimeLeft time.Duration `json:"timeLeft"`
}

// EventCard is an event that can be applied
type EventCard struct {
	ForTeam      Team             `json:"forTeam"`
	Type         CardType         `json:"cardType"`
	Operation    CardOperation    `json:"operation"`
	Modification CardModification `json:"modification"`
}

// EventCommand is an event that can be applied
type EventCommand struct {
	ForTeam *Team      `json:"forTeam"`
	Type    RefCommand `json:"commandType"`
}

func (c EventCommand) String() string {
	if c.ForTeam == nil {
		return string(c.Type)
	}
	return fmt.Sprintf("%v for %v", c.Type, *c.ForTeam)
}

// EventModifyCardTime holds the duration for a certain yellow card duration
type EventModifyCardTime struct {
	CardID   int    `json:"cardId"`
	Duration string `json:"duration"`
}

// EventModifyValue is an event that can be applied
type EventModifyValue struct {
	ForTeam Team `json:"forTeam"`

	Goals                 *int                 `json:"goals"`
	Goalie                *int                 `json:"goalie"`
	YellowCards           *int                 `json:"yellowCards"`
	YellowCardTime        *EventModifyCardTime `json:"yellowCardTime"`
	RedCards              *int                 `json:"redCards"`
	TimeoutsLeft          *int                 `json:"timeoutsLeft"`
	TimeoutTimeLeft       *string              `json:"timeoutTimeLeft"`
	OnPositiveHalf        *bool                `json:"onPositiveHalf"`
	TeamName              *string              `json:"teamName"`
	FoulCounter           *int                 `json:"foulCounter"`
	BallPlacementFailures *int                 `json:"ballPlacementFailures"`
	CanPlaceBall          *bool                `json:"canPlaceBall"`
	Division              *Division            `json:"division"`
}

func (m EventModifyValue) String() string {
	str := fmt.Sprintf("modify for %v:", m.ForTeam)
	if m.Goals != nil {
		return fmt.Sprintf("%v Goals=%v", str, *m.Goals)
	}
	if m.Goalie != nil {
		return fmt.Sprintf("%v Goalie=%v", str, *m.Goalie)
	}
	if m.YellowCards != nil {
		return fmt.Sprintf("%v YellowCards=%v", str, *m.YellowCards)
	}
	if m.YellowCardTime != nil {
		return fmt.Sprintf("%v YellowCardTime=%v", str, *m.YellowCardTime)
	}
	if m.RedCards != nil {
		return fmt.Sprintf("%v RedCards=%v", str, *m.RedCards)
	}
	if m.TimeoutsLeft != nil {
		return fmt.Sprintf("%v TimeoutsLeft=%v", str, *m.TimeoutsLeft)
	}
	if m.TimeoutTimeLeft != nil {
		return fmt.Sprintf("%v TimeoutTimeLeft=%v", str, *m.TimeoutTimeLeft)
	}
	if m.OnPositiveHalf != nil {
		return fmt.Sprintf("%v OnPositiveHalf=%v", str, *m.OnPositiveHalf)
	}
	if m.TeamName != nil {
		return fmt.Sprintf("%v TeamName=%v", str, *m.TeamName)
	}
	if m.FoulCounter != nil {
		return fmt.Sprintf("%v FoulCounter=%v", str, *m.FoulCounter)
	}
	if m.BallPlacementFailures != nil {
		return fmt.Sprintf("%v BallPlacementFailures=%v", str, *m.BallPlacementFailures)
	}
	if m.CanPlaceBall != nil {
		return fmt.Sprintf("%v CanPlaceBall=%v", str, *m.CanPlaceBall)
	}
	if m.Division != nil {
		return fmt.Sprintf("%v Division=%v", str, *m.Division)
	}
	return fmt.Sprintf("%v undefined", str)
}

// EventTrigger is an event that can be applied
type EventTrigger struct {
	Type TriggerType `json:"triggerType"`
}

// EventStage is an event that can be applied
type EventStage struct {
	StageOperation StageOperation `json:"stageOperation"`
}

// Event holds all possible events. Only one at a time can be applied
type Event struct {
	Card      *EventCard        `json:"card"`
	Command   *EventCommand     `json:"command"`
	Modify    *EventModifyValue `json:"modify"`
	Stage     *EventStage       `json:"stage"`
	Trigger   *EventTrigger     `json:"trigger"`
	GameEvent *GameEvent        `json:"gameEvent"`
}

func (e Event) String() string {
	if e.Card != nil {
		return fmt.Sprintf("Card: %v", *e.Card)
	}
	if e.Command != nil {
		return fmt.Sprintf("Command: %v", *e.Command)
	}
	if e.Modify != nil {
		return fmt.Sprintf("Modify: %v", *e.Modify)
	}
	if e.Stage != nil {
		return fmt.Sprintf("Stage: %v", *e.Stage)
	}
	if e.Trigger != nil {
		return fmt.Sprintf("Trigger: %v", *e.Trigger)
	}
	if e.GameEvent != nil {
		return fmt.Sprintf("GameEvent: %v", *e.GameEvent)
	}
	return "empty event"
}
