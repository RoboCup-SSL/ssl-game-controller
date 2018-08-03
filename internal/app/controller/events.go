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

// ModifyType is something to be modified
type ModifyType string

const (
	// ModifyGoals goals
	ModifyGoals ModifyType = "goals"
	// ModifyGoalie goalie
	ModifyGoalie ModifyType = "goalie"
	// ModifyYellowCards yellow cards
	ModifyYellowCards ModifyType = "yellowCards"
	// ModifyYellowCardTime yellow card time
	ModifyYellowCardTime ModifyType = "yellowCardTime"
	// ModifyRedCards red cards
	ModifyRedCards ModifyType = "redCards"
	// ModifyTimeoutsLeft number of timeouts left
	ModifyTimeoutsLeft ModifyType = "timeoutsLeft"
	// ModifyTimeoutTimeLeft timeout time left
	ModifyTimeoutTimeLeft ModifyType = "timeoutTimeLeft"
	// ModifyOnPositiveHalf on positive half?
	ModifyOnPositiveHalf ModifyType = "onPositiveHalf"
	// ModifyTeamName name of the team
	ModifyTeamName ModifyType = "teamName"
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

// EventModifyValue is an event that can be applied
type EventModifyValue struct {
	Type      ModifyType `json:"modifyType"`
	ForTeam   Team       `json:"forTeam"`
	ValueStr  *string    `json:"valueStr"`
	ValueInt  *int       `json:"valueInt"`
	ValueBool *bool      `json:"valueBool"`
}

func (m EventModifyValue) String() string {
	str := fmt.Sprintf("%v for %v", m.Type, m.ForTeam)
	if m.ValueBool != nil {
		if *m.ValueBool {
			str += " bool:true"
		} else {
			str += " bool:false"
		}
	}
	if m.ValueStr != nil {
		str += " str:" + *m.ValueStr
	}
	if m.ValueInt != nil {
		str += " int:" + string(*m.ValueInt)
	}
	return str
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
