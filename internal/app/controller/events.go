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

// RefCommand is a command to be send to the teams
type RefCommand string

const (
	// CommandHalt HALT
	CommandHalt RefCommand = "halt"
	// CommandStop STOP
	CommandStop RefCommand = "stop"
	// CommandNormalStart NORMAL_START
	CommandNormalStart RefCommand = "normalStart"
	// CommandForceStart FORCE_START
	CommandForceStart RefCommand = "forceStart"
	// CommandDirect DIRECT
	CommandDirect RefCommand = "direct"
	// CommandIndirect INDIRECT
	CommandIndirect RefCommand = "indirect"
	// CommandKickoff KICKOFF
	CommandKickoff RefCommand = "kickoff"
	// CommandPenalty PENALTY
	CommandPenalty RefCommand = "penalty"
	// CommandTimeout TIMEOUT
	CommandTimeout RefCommand = "timeout"
	// CommandBallPlacement BALL_PLACEMENT
	CommandBallPlacement RefCommand = "ballPlacement"
	// CommandGoal GOAL
	CommandGoal RefCommand = "goal"
)

// StageOperation to apply on the current stage
type StageOperation string

const (
	// StageNext next stage
	StageNext StageOperation = "next"
	// StagePrevious previous stage
	StagePrevious StageOperation = "previous"
)

// TriggerType is something that can be triggered
type TriggerType string

const (
	// TriggerResetMatch reset match
	TriggerResetMatch TriggerType = "resetMatch"
	// TriggerSwitchColor switch color
	TriggerSwitchColor TriggerType = "switchColor"
	// TriggerUndo undo last action
	TriggerUndo TriggerType = "undo"
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

	Goals           *int                 `json:"goals"`
	Goalie          *int                 `json:"goalie"`
	YellowCards     *int                 `json:"yellowCards"`
	YellowCardTime  *EventModifyCardTime `json:"yellowCardTime"`
	RedCards        *int                 `json:"redCards"`
	TimeoutsLeft    *int                 `json:"timeoutsLeft"`
	TimeoutTimeLeft *string              `json:"timeoutTimeLeft"`
	OnPositiveHalf  *bool                `json:"onPositiveHalf"`
	TeamName        *string              `json:"teamName"`
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
	Card    *EventCard        `json:"card"`
	Command *EventCommand     `json:"command"`
	Modify  *EventModifyValue `json:"modify"`
	Stage   *EventStage       `json:"stage"`
	Trigger *EventTrigger     `json:"trigger"`
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
	return "empty event"
}
