package main

import (
	"github.com/pkg/errors"
	"log"
	"strconv"
	"strings"
	"time"
)

type CardType string
type CardOperation string
type RefCommand string
type ModifyType string

const (
	CardTypeYellow CardType = "yellow"
	CardTypeRed    CardType = "red"

	CardOperationAdd    CardOperation = "add"
	CardOperationRevoke CardOperation = "revoke"
	CardOperationModify CardOperation = "modify"

	CommandHalt          RefCommand = "halt"
	CommandStop          RefCommand = "stop"
	CommandNormalStart   RefCommand = "normalStart"
	CommandForceStart    RefCommand = "forceStart"
	CommandDirect        RefCommand = "direct"
	CommandIndirect      RefCommand = "indirect"
	CommandKickoff       RefCommand = "kickoff"
	CommandPenalty       RefCommand = "penalty"
	CommandTimeout       RefCommand = "timeout"
	CommandBallPlacement RefCommand = "ballPlacement"
	CommandGoal          RefCommand = "goal"

	ModifyGoals           ModifyType = "goals"
	ModifyGoalie          ModifyType = "goalie"
	ModifyYellowCards     ModifyType = "yellowCards"
	ModifyRedCards        ModifyType = "redCards"
	ModifyTimeoutsLeft    ModifyType = "timeoutsLeft"
	ModifyTimeoutTimeLeft ModifyType = "timeoutTimeLeft"
	ModifyOnPositiveHalf  ModifyType = "onPositiveHalf"
	ModifyTeamName        ModifyType = "teamName"
)

type CardModification struct {
	CardId   int           `json:"cardId"`
	TimeLeft time.Duration `json:"timeLeft"`
}

type RefBoxEventCard struct {
	ForTeam      Team             `json:"forTeam"`
	Type         CardType         `json:"cardType"`
	Operation    CardOperation    `json:"operation"`
	Modification CardModification `json:"modification"`
}

type RefBoxEventCommand struct {
	ForTeam *Team      `json:"forTeam"`
	Type    RefCommand `json:"commandType"`
}

type RefBoxEventModifyValue struct {
	Type      ModifyType `json:"modifyType"`
	ForTeam   Team       `json:"forTeam"`
	ValueStr  *string    `json:"valueStr"`
	ValueInt  *int       `json:"valueInt"`
	ValueBool *bool      `json:"valueBool"`
}

type RefBoxEvent struct {
	Card    *RefBoxEventCard        `json:"card"`
	Command *RefBoxEventCommand     `json:"command"`
	Modify  *RefBoxEventModifyValue `json:"modify"`
}

func processEvent(event *RefBoxEvent) error {
	if event.Card != nil {
		return processCard(event.Card)
	} else if event.Command != nil {
		return processCommand(event.Command)
	} else if event.Modify != nil {
		return processModify(event.Modify)
	} else {
		return errors.New("Unknown event.")
	}
	return nil
}

func processModify(m *RefBoxEventModifyValue) error {
	if unknownTeam(m.ForTeam) {
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
	default:
		return errors.Errorf("Unknown modify: %v", m)
	}
	log.Printf("Processed modification %v", m)
	return nil
}

func processCommand(c *RefBoxEventCommand) error {
	switch c.Type {
	case CommandHalt:
		refBox.State.GameState = GameStateHalted
		refBox.State.GameStateFor = nil
		refBox.timer.Stop()
	case CommandStop:
		refBox.State.GameState = GameStateStopped
		refBox.State.GameStateFor = nil
		refBox.timer.Stop()
	case CommandForceStart, CommandNormalStart, CommandDirect, CommandIndirect:
		refBox.State.GameState = GameStateRunning
		refBox.State.GameStateFor = nil
		refBox.timer.Start()
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
			return errors.New("Team required for kickoff")
		}
		refBox.State.GameState = GameStateTimeout
		refBox.State.GameStateFor = c.ForTeam
	default:
		return errors.Errorf("Unknown command: %v", c)
	}

	log.Printf("Processed command %v", c)
	return nil
}

func processCard(card *RefBoxEventCard) error {
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

func modifyCard(card *RefBoxEventCard, teamState *RefBoxTeamState) error {
	if card.Type == CardTypeRed {
		return errors.New("Red cards can not be modified")
	}
	nCardTimes := len(teamState.YellowCardTimes)
	if card.Modification.CardId >= nCardTimes {
		return errors.Errorf("Invalid card id %v. Only %v card times available", card.Modification.CardId, nCardTimes)
	}
	teamState.YellowCardTimes[card.Modification.CardId] = card.Modification.TimeLeft
	return nil
}

func addCard(card *RefBoxEventCard, teamState *RefBoxTeamState) error {
	if card.Type == CardTypeYellow {
		log.Printf("Add yellow card for team %v", card.ForTeam)
		teamState.YellowCards++
		teamState.YellowCardTimes = append(teamState.YellowCardTimes, 2*time.Minute)
	} else if card.Type == CardTypeRed {
		log.Printf("Add red card for team %v", card.ForTeam)
		teamState.RedCards++
	}
	return nil
}

func revokeCard(card *RefBoxEventCard, teamState *RefBoxTeamState) error {
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

func unknownTeam(team Team) bool {
	return team != "Yellow" && team != "Blue"
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
