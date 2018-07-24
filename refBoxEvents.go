package main

import (
	"github.com/pkg/errors"
	"log"
	"time"
)

type CardType string
type CardOperation string

const (
	CardTypeYellow CardType = "yellow"
	CardTypeRed    CardType = "red"

	CardOperationAdd    CardOperation = "add"
	CardOperationRevoke CardOperation = "revoke"
	CardOperationModify CardOperation = "modify"
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

type RefBoxEvent struct {
	Card *RefBoxEventCard `json:"card"`
}

func processEvent(event *RefBoxEvent) error {
	if event.Card != nil {
		return processCard(event.Card)
	} else {
		return errors.New("Unknown event.")
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
	teamState := refBoxState.TeamState[card.ForTeam]
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
