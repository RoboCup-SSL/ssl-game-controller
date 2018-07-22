package main

import "log"

type RefBoxEventYellowCard struct {
	ForTeam Team `json:"for_team"`
}

type RefBoxEventRedCard struct {
	ForTeam Team `json:"for_team"`
}

type RefBoxEvent struct {
	YellowCard *RefBoxEventYellowCard `json:"yellow_card"`
	RedCard    *RefBoxEventRedCard    `json:"red_card"`
}

func processEvent(event RefBoxEvent) {
	if event.YellowCard != nil {
		log.Println("yellow card for team", event.YellowCard.ForTeam)
		teamState := refBoxState.TeamState[event.YellowCard.ForTeam]
		teamState.YellowCards++
	}
	if event.RedCard != nil {
		log.Println("red card for team", event.RedCard.ForTeam)
		teamState := refBoxState.TeamState[event.RedCard.ForTeam]
		teamState.RedCards++
	}
}
