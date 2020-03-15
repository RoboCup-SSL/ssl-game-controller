package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) AddYellowCard(newState *state.State, change *AddYellowCard) (changes []Change) {
	id := 0
	numCards := len(newState.TeamState[change.ForTeam].YellowCards)
	if numCards > 0 {
		id = newState.TeamState[change.ForTeam].YellowCards[numCards-1].Id + 1
	}
	newState.TeamState[change.ForTeam].YellowCards = append(newState.TeamState[change.ForTeam].YellowCards, state.YellowCard{
		Id:                id,
		TimeRemaining:     s.gameConfig.YellowCardDuration,
		CausedByGameEvent: change.CausedByGameEvent,
	})
	return
}

func (s *StateMachine) AddRedCard(newState *state.State, change *AddRedCard) (changes []Change) {
	id := 0
	numCards := len(newState.TeamState[change.ForTeam].RedCards)
	if numCards > 0 {
		id = newState.TeamState[change.ForTeam].RedCards[numCards-1].Id + 1
	}
	newState.TeamState[change.ForTeam].RedCards = append(newState.TeamState[change.ForTeam].RedCards, state.RedCard{
		Id:                id,
		CausedByGameEvent: change.CausedByGameEvent,
	})
	return
}

func (s *StateMachine) YellowCardOver(newState *state.State) (changes []Change) {
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) updateMaxBots(newState *state.State) {
	for _, team := range state.BothTeams() {
		max := s.gameConfig.MaxBots[s.cfg.Division]
		yellowCards := activeYellowCards(newState.TeamState[team].YellowCards)
		redCards := len(newState.TeamState[team].RedCards)
		newState.TeamState[team].MaxAllowedBots = max - yellowCards - redCards
	}
}

func activeYellowCards(cards []state.YellowCard) (count int) {
	for _, c := range cards {
		if c.TimeRemaining > 0 {
			count++
		}
	}
	return
}
