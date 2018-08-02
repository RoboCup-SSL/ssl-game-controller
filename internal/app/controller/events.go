package controller

import (
	"fmt"
	"github.com/pkg/errors"
	"log"
	"strconv"
	"strings"
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

// EventModifyValue is an event that can be applied
type EventModifyValue struct {
	Type      ModifyType `json:"modifyType"`
	ForTeam   Team       `json:"forTeam"`
	ValueStr  *string    `json:"valueStr"`
	ValueInt  *int       `json:"valueInt"`
	ValueBool *bool      `json:"valueBool"`
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

func processEvent(event *Event) error {
	if event.Card != nil {
		return processCard(event.Card)
	} else if event.Command != nil {
		return processCommand(event.Command)
	} else if event.Modify != nil {
		return processModify(event.Modify)
	} else if event.Stage != nil {
		return processStage(event.Stage)
	} else if event.Trigger != nil {
		return processTrigger(event.Trigger)
	}
	return errors.New("unknown event")
}

func processTrigger(t *EventTrigger) error {
	if t.Type == TriggerResetMatch {
		refBox.State = NewState(refBox.Config)
		refBox.MatchTimeStart = time.Unix(0, 0)
	} else if t.Type == TriggerSwitchColor {
		yellow := refBox.State.TeamState[TeamYellow]
		refBox.State.TeamState[TeamYellow] = refBox.State.TeamState[TeamBlue]
		refBox.State.TeamState[TeamBlue] = yellow
	} else if t.Type == TriggerUndo {
		refBox.UndoLastAction()
	} else {
		return errors.Errorf("Unknown trigger: %v", t.Type)
	}
	log.Printf("Processed trigger %v", t.Type)
	return nil
}

func processStage(s *EventStage) error {
	if refBox.State.GameState != GameStateHalted && refBox.State.GameState != GameStateStopped {
		return errors.New("The game state must be halted or stopped to change the stage")
	}

	index, err := refBox.State.Stage.index()
	if err != nil {
		return err
	}
	if s.StageOperation == StageNext {
		nextIndex := index + 1
		if nextIndex >= len(Stages) {
			return errors.New("No next stage")
		}
		refBox.State.Stage = Stages[nextIndex]
	} else if s.StageOperation == StagePrevious {
		nextIndex := index - 1
		if nextIndex < 0 {
			return errors.New("No previous stage")
		}
		refBox.State.Stage = Stages[nextIndex]
	} else {
		return errors.Errorf("Unknown stage operation: %v", s.StageOperation)
	}

	refBox.State.StageTimeLeft = refBox.StageTimes[refBox.State.Stage]
	refBox.State.StageTimeElapsed = 0

	if refBox.State.Stage == StageFirstHalf {
		refBox.MatchTimeStart = time.Now()
	}
	if refBox.State.Stage == StageOvertimeFirstHalfPre {
		refBox.State.TeamState[TeamYellow].TimeoutsLeft = refBox.Config.Overtime.Timeouts
		refBox.State.TeamState[TeamYellow].TimeoutTimeLeft = refBox.Config.Overtime.TimeoutDuration
		refBox.State.TeamState[TeamBlue].TimeoutsLeft = refBox.Config.Overtime.Timeouts
		refBox.State.TeamState[TeamBlue].TimeoutTimeLeft = refBox.Config.Overtime.TimeoutDuration
	}

	log.Printf("Processed stage %v", s.StageOperation)

	return nil
}

func processModify(m *EventModifyValue) error {
	if m.ForTeam.Unknown() {
		return errors.Errorf("Unknown team: %v", m.ForTeam)
	}
	teamState := refBox.State.TeamState[m.ForTeam]
	switch m.Type {
	case ModifyGoalie:
		if m.ValueInt != nil {
			teamState.Goalie = *m.ValueInt
		}
	case ModifyGoals:
		if m.ValueInt != nil {
			teamState.Goals = *m.ValueInt
		}
	case ModifyOnPositiveHalf:
		if m.ValueBool != nil {
			teamState.OnPositiveHalf = *m.ValueBool
			refBox.State.TeamState[m.ForTeam.Other()].OnPositiveHalf = !*m.ValueBool
		}
	case ModifyRedCards:
		if m.ValueInt != nil {
			teamState.RedCards = *m.ValueInt
		}
	case ModifyYellowCards:
		if m.ValueInt != nil {
			teamState.YellowCards = *m.ValueInt
		}
	case ModifyTeamName:
		if m.ValueStr != nil {
			teamState.Name = *m.ValueStr
		}
	case ModifyTimeoutsLeft:
		if m.ValueInt != nil {
			teamState.TimeoutsLeft = *m.ValueInt
		}
	case ModifyTimeoutTimeLeft:
		if m.ValueStr != nil {
			if duration, err := strToDuration(*m.ValueStr); err == nil {
				teamState.TimeoutTimeLeft = duration
			} else {
				return err
			}
		}
	case ModifyYellowCardTime:
		if m.ValueStr != nil && m.ValueInt != nil {
			if *m.ValueInt < 0 || *m.ValueInt >= len(teamState.YellowCardTimes) {
				return errors.Errorf("Invalid card index: %v", *m.ValueInt)
			}
			if duration, err := strToDuration(*m.ValueStr); err == nil {
				teamState.YellowCardTimes[*m.ValueInt] = duration
			}
		}
	default:
		return errors.Errorf("Unknown modify: %v", m)
	}
	log.Printf("Processed modification %v", m)
	return nil
}

func processCommand(c *EventCommand) error {
	switch c.Type {
	case CommandHalt:
		refBox.State.GameState = GameStateHalted
		refBox.State.GameStateFor = nil
	case CommandStop:
		refBox.State.GameState = GameStateStopped
		refBox.State.GameStateFor = nil
	case CommandForceStart, CommandNormalStart, CommandDirect, CommandIndirect:
		refBox.State.GameState = GameStateRunning
		refBox.State.GameStateFor = nil
	case CommandKickoff:
		if c.ForTeam == nil {
			return errors.New("Team required for kickoff")
		}
		refBox.State.GameState = GameStatePreKickoff
		refBox.State.GameStateFor = c.ForTeam
	case CommandPenalty:
		if c.ForTeam == nil {
			return errors.New("Team required for penalty")
		}
		refBox.State.GameState = GameStatePrePenalty
		refBox.State.GameStateFor = c.ForTeam
	case CommandBallPlacement:
		if c.ForTeam == nil {
			return errors.New("Team required for ball placement")
		}
		refBox.State.GameState = GameStateBallPlacement
		refBox.State.GameStateFor = c.ForTeam
	case CommandGoal:
		if c.ForTeam == nil {
			return errors.New("Team required for goal")
		}
		refBox.State.TeamState[*c.ForTeam].Goals++
	case CommandTimeout:
		if c.ForTeam == nil {
			return errors.New("Team required for timeout")
		}
		refBox.State.TeamState[*c.ForTeam].TimeoutsLeft--
		refBox.State.GameState = GameStateTimeout
		refBox.State.GameStateFor = c.ForTeam
	default:
		return errors.Errorf("Unknown command: %v", c)
	}

	log.Printf("Processed command %v", *c)
	return nil
}

func processCard(card *EventCard) error {
	if card.ForTeam != TeamYellow && card.ForTeam != TeamBlue {
		return errors.Errorf("Unknown team: %v", card.ForTeam)
	}
	if card.Type != CardTypeYellow && card.Type != CardTypeRed {
		return errors.Errorf("Unknown card type: %v", card.Type)
	}
	teamState := refBox.State.TeamState[card.ForTeam]
	if card.Operation == CardOperationAdd {
		return addCard(card, teamState)
	} else if card.Operation == CardOperationRevoke {
		return revokeCard(card, teamState)
	} else if card.Operation == CardOperationModify {
		return modifyCard(card, teamState)
	}
	return errors.Errorf("Unknown operation: %v", card.Operation)
}

func modifyCard(card *EventCard, teamState *TeamInfo) error {
	if card.Type == CardTypeRed {
		return errors.New("Red cards can not be modified")
	}
	nCardTimes := len(teamState.YellowCardTimes)
	if card.Modification.CardID >= nCardTimes {
		return errors.Errorf("Invalid card id %v. Only %v card times available", card.Modification.CardID, nCardTimes)
	}
	teamState.YellowCardTimes[card.Modification.CardID] = card.Modification.TimeLeft
	return nil
}

func addCard(card *EventCard, teamState *TeamInfo) error {
	if card.Type == CardTypeYellow {
		log.Printf("Add yellow card for team %v", card.ForTeam)
		teamState.YellowCards++
		teamState.YellowCardTimes = append(teamState.YellowCardTimes, refBox.Config.Global.YellowCardDuration)
	} else if card.Type == CardTypeRed {
		log.Printf("Add red card for team %v", card.ForTeam)
		teamState.RedCards++
	}
	return nil
}

func revokeCard(card *EventCard, teamState *TeamInfo) error {
	if card.Type == CardTypeYellow {
		if teamState.YellowCards > 0 {
			log.Printf("Revoke yellow card for team %v", card.ForTeam)
			teamState.YellowCards--
			nCardTimes := len(teamState.YellowCardTimes)
			if nCardTimes > 0 {
				log.Printf("Revoke yellow card time for team %v", card.ForTeam)
				teamState.YellowCardTimes = teamState.YellowCardTimes[:nCardTimes-1]
			}
		} else {
			return errors.Errorf("No yellow cards left to revoke for team %v", card.ForTeam)
		}
	} else if card.Type == CardTypeRed {
		if teamState.RedCards > 0 {
			log.Printf("Revoke red card for team %v", card.ForTeam)
			teamState.RedCards--
		} else {
			return errors.Errorf("No red cards left to revoke for team %v", card.ForTeam)
		}
	}
	return nil
}

// Unknown returns true if the team is not blue or yellow
func (t Team) Unknown() bool {
	return t != "Yellow" && t != "Blue"
}

func strToDuration(s string) (duration time.Duration, err error) {
	duration = 0
	err = nil

	parts := strings.Split(s, ":")
	if len(parts) > 2 {
		err = errors.Errorf("Invalid duration format: %v", s)
		return
	}

	var secondsIndex int
	var minutes int
	if len(parts) == 1 {
		secondsIndex = 0
		minutes = 0
	} else {
		secondsIndex = 1
		minutes, err = strconv.Atoi(parts[0])
		if err != nil {
			return
		}
	}
	seconds, err := strconv.Atoi(parts[secondsIndex])
	if err != nil {
		return
	}

	duration += time.Minute * time.Duration(minutes)
	duration += time.Second * time.Duration(seconds)
	return
}

func (c EventCommand) String() string {
	if c.ForTeam == nil {
		return string(c.Type)
	}
	return fmt.Sprintf("%v for %v", c.Type, *c.ForTeam)
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

func (s Stage) index() (int, error) {
	for i, v := range Stages {
		if v == s {
			return i, nil
		}
	}
	return 0, errors.Errorf("unknown stage: %v", s)
}
