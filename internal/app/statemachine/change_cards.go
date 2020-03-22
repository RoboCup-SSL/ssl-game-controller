package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

func (s *StateMachine) AddYellowCard(newState *state.State, change *AddYellowCard) (changes []Change) {
	newState.TeamState[change.ForTeam].AddYellowCard(s.gameConfig.YellowCardDuration, change.CausedByGameEvent)
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) AddRedCard(newState *state.State, change *AddRedCard) (changes []Change) {
	newState.TeamState[change.ForTeam].AddRedCard(change.CausedByGameEvent)
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) YellowCardOver(newState *state.State) (changes []Change) {
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) updateMaxBots(newState *state.State) {
	for _, team := range state.BothTeams() {
		max := s.gameConfig.MaxBots[newState.Division]
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
