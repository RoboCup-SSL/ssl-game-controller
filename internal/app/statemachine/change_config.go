package statemachine

import (
	"log"
	"time"

	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

func (s *StateMachine) processChangeUpdateConfig(newState *state.State, change *Change_UpdateConfig) (changes []*Change) {
	if change.Division != nil {
		log.Printf("Change division to %v", *change.Division)
		newState.Division = change.Division
		*newState.MaxBotsPerTeam = s.gameConfig.MaxBots[change.Division.Div()]
		s.updateMaxBots(newState)

		if s.timeProvider().Sub(s.GeometryUpdated) > time.Minute*5 {
			log.Printf("Set geometry to default for division %v", change.Division.Div())
			s.UpdateGeometry(s.gameConfig.DefaultGeometry[change.Division.Div()], time.Time{})
		}
		if *change.Division == state.Division_DIV_A {
			// in division A, both teams must be able to place ball
			for _, team := range state.BothTeams() {
				*newState.TeamState[team.String()].CanPlaceBall = true
			}
		}
	}
	if change.FirstKickoffTeam != nil && *change.FirstKickoffTeam != state.Team_UNKNOWN {
		log.Printf("Change first kickoff team to %v", *change.FirstKickoffTeam)
		newState.FirstKickoffTeam = change.FirstKickoffTeam
		if *newState.Stage == state.Referee_NORMAL_FIRST_HALF_PRE {
			newState.NextCommand = state.NewCommand(state.Command_KICKOFF, *newState.FirstKickoffTeam)
		}
	}
	if change.MatchType != nil {
		log.Printf("Change match type to %s", change.MatchType.String())
		newState.MatchType = change.MatchType
	}
	if change.MaxRobotsPerTeam != nil {
		maxRobots := change.MaxRobotsPerTeam.GetValue()
		if maxRobots <= 0 {
			log.Printf("Ignoring invalid max robots per team: %d", maxRobots)
		} else {
			log.Printf("Change max robots per team to %d", maxRobots)
			*newState.MaxBotsPerTeam = maxRobots
			s.updateMaxBots(newState)
		}
	}
	return
}
