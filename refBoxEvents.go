package main

import (
	"github.com/pkg/errors"
	"log"
	"time"
)

type CardType string
type CardOperation string
type RefCommand string

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

type RefBoxEvent struct {
	Card    *RefBoxEventCard    `json:"card"`
	Command *RefBoxEventCommand `json:"command"`
}

func processEvent(event *RefBoxEvent) error {
	if event.Card != nil {
		return processCard(event.Card)
	} else if event.Command != nil {
		return processCommand(event.Command)
	} else {
		return errors.New("Unknown event.")
	}
	return nil
}

func processCommand(c *RefBoxEventCommand) error {
	if c.Type == CommandHalt {
		refBox.State.GameState = GameStateHalted
		refBox.timer.Stop()
	} else if c.Type == CommandStop {
		refBox.State.GameState = GameStateStopped
		refBox.timer.Stop()
	} else if c.Type == CommandForceStart || c.Type == CommandNormalStart {
		refBox.State.GameState = GameStateRunning
		refBox.timer.Start()
	}

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
