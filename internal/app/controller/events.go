package controller

import (
	"encoding/json"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"reflect"
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
	CardID   int           `json:"cardId" yaml:"cardId"`
	TimeLeft time.Duration `json:"timeLeft" yaml:"timeLeft"`
}

// EventCard is an event that can be applied
type EventCard struct {
	ForTeam      Team             `json:"forTeam" yaml:"forTeam"`
	Type         CardType         `json:"cardType" yaml:"type"`
	Operation    CardOperation    `json:"operation" yaml:"operation"`
	Modification CardModification `json:"modification" yaml:"modification"`
}

// EventCommand is an event that can be applied
type EventCommand struct {
	ForTeam  *Team      `json:"forTeam" yaml:"forTeam"`
	Type     RefCommand `json:"commandType" yaml:"type"`
	Location *Location  `json:"location" yaml:"location"`
}

func (c EventCommand) String() string {
	if c.ForTeam == nil {
		return string(c.Type)
	}
	if c.Location == nil {
		return fmt.Sprintf("%v for %v", c.Type, *c.ForTeam)
	}
	return fmt.Sprintf("%v for %v at %v", c.Type, *c.ForTeam, *c.Location)
}

// EventModifyCardTime holds the duration for a certain yellow card duration
type EventModifyCardTime struct {
	CardID   int    `json:"cardId" yaml:"cardId"`
	Duration string `json:"duration" yaml:"duration"`
}

// EventModifyGameEventBehavior holds the type to behavior mapping
type EventModifyGameEventBehavior struct {
	GameEventType     GameEventType     `json:"gameEventType" yaml:"gameEventType"`
	GameEventBehavior GameEventBehavior `json:"gameEventBehavior" yaml:"gameEventBehavior"`
}

// EventModifyValue is an event that can be applied
type EventModifyValue struct {
	ForTeam Team `json:"forTeam,omitempty"`

	Goals                 *int                          `json:"goals,omitempty" yaml:"goals"`
	Goalkeeper            *int                          `json:"goalkeeper,omitempty" yaml:"goalkeeper"`
	YellowCards           *int                          `json:"yellowCards,omitempty" yaml:"yellowCards"`
	YellowCardTime        *EventModifyCardTime          `json:"yellowCardTime,omitempty" yaml:"yellowCardTime"`
	RedCards              *int                          `json:"redCards,omitempty" yaml:"redCards"`
	TimeoutsLeft          *int                          `json:"timeoutsLeft,omitempty" yaml:"timeoutsLeft"`
	TimeoutTimeLeft       *string                       `json:"timeoutTimeLeft,omitempty" yaml:"timeoutTimeLeft"`
	OnPositiveHalf        *bool                         `json:"onPositiveHalf,omitempty" yaml:"onPositiveHalf"`
	TeamName              *string                       `json:"teamName,omitempty" yaml:"teamName"`
	FoulCounter           *int                          `json:"foulCounter,omitempty" yaml:"foulCounter"`
	BallPlacementFailures *int                          `json:"ballPlacementFailures,omitempty" yaml:"ballPlacementFailures"`
	CanPlaceBall          *bool                         `json:"canPlaceBall,omitempty" yaml:"canPlaceBall"`
	Division              *config.Division              `json:"division,omitempty" yaml:"division"`
	AutoContinue          *bool                         `json:"autoContinue,omitempty" yaml:"autoContinue"`
	GameEventBehavior     *EventModifyGameEventBehavior `json:"gameEventBehavior,omitempty" yaml:"gameEventBehavior"`
	BotSubstitutionIntend *bool                         `json:"botSubstitutionIntend,omitempty" yaml:"botSubstitutionIntend"`
	RemoveGameEvent       *int                          `json:"removeGameEvent,omitempty" yaml:"removeGameEvent"`
	Timestamp             *int64                        `json:"timestamp,omitempty" yaml:"timestamp"`
}

func (m EventModifyValue) String() string {
	b, _ := json.Marshal(&m)
	return string(b)
}

func (m EventModifyValue) Type() string {
	v := reflect.ValueOf(m)
	for i := 0; i < v.NumField(); i++ {
		fieldName := v.Type().Field(i).Name
		if fieldName != "ForTeam" && !v.Field(i).IsNil() {
			return fieldName
		}
	}
	return "unknown"
}

func (m EventModifyValue) Value() string {
	v := reflect.ValueOf(m)
	for i := 0; i < v.NumField(); i++ {
		fieldName := v.Type().Field(i).Name
		if fieldName != "ForTeam" && !v.Field(i).IsNil() {
			b, _ := json.Marshal(v.Field(i).Interface())
			return string(b)
		}
	}
	return "unknown"
}

// EventTrigger is an event that can be applied
type EventTrigger struct {
	Type TriggerType `json:"triggerType" yaml:"type"`
}

// EventStage is an event that can be applied
type EventStage struct {
	StageOperation StageOperation `json:"stageOperation" yaml:"stageOperation"`
}

// Event holds all possible events. Only one at a time can be applied
type Event struct {
	Card      *EventCard        `json:"card" yaml:"card"`
	Command   *EventCommand     `json:"command" yaml:"command"`
	Modify    *EventModifyValue `json:"modify" yaml:"modify"`
	Stage     *EventStage       `json:"stage" yaml:"stage"`
	Trigger   *EventTrigger     `json:"trigger" yaml:"trigger"`
	GameEvent *GameEvent        `json:"gameEvent" yaml:"gameEvent"`
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
