package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
)

func (s *StateMachine) processChangeAddYellowCard(newState *state.State, change *AddYellowCard) (changes []*Change) {
	newState.TeamInfo(*change.ForTeam).AddYellowCard(s.gameConfig.YellowCardDuration, change.CausedByGameEvent)
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) processChangeAddRedCard(newState *state.State, change *AddRedCard) (changes []*Change) {
	newState.TeamInfo(*change.ForTeam).AddRedCard(change.CausedByGameEvent)
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) processChangeYellowCardOver(newState *state.State) (changes []*Change) {
	s.updateMaxBots(newState)
	return
}

func (s *StateMachine) updateMaxBots(newState *state.State) {
	for _, team := range state.BothTeams() {
		max := s.gameConfig.MaxBots[newState.Division.Div()]
		yellowCards := activeYellowCards(newState.TeamInfo(team).YellowCards)
		redCards := int32(len(newState.TeamInfo(team).RedCards))
		*newState.TeamInfo(team).MaxAllowedBots = max - yellowCards - redCards
	}
}

func activeYellowCards(cards []*state.YellowCard) (count int32) {
	for _, c := range cards {
		d, _ := ptypes.Duration(c.TimeRemaining)
		if d > 0 {
			count++
		}
	}
	return
}
