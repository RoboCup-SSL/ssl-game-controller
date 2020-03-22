package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) StartBallPlacement(newState *state.State) (changes []Change) {

	if newState.PlacementPos == nil || noTeamCanPlaceBall(newState) {
		log.Print("placement not possible, human ref must help out")
		changes = append(changes, s.newCommandChange(state.CommandHalt))
		return
	}

	if newState.NextCommand == state.CommandPenalty || newState.NextCommand == state.CommandKickoff {
		log.Printf("Human ref places the ball for %v for %v", newState.NextCommand, newState.NextCommandFor)
		changes = append(changes, s.newCommandChange(state.CommandHalt))
	}

	var teamInFavor state.Team
	if newState.NextCommandFor.Unknown() {
		// select a team by 50% chance
		teamInFavor = s.randomTeam()
		log.Printf("No team in favor. Chose one randomly.")
	} else {
		teamInFavor = newState.NextCommandFor
	}
	log.Printf("Start ball placement for %v", teamInFavor)

	if !newState.TeamState[teamInFavor].CanPlaceBall {
		log.Printf("Placement for team %v is disabled, team %v places the ball for team %v", teamInFavor, teamInFavor.Opposite(), teamInFavor)
		changes = append(changes, s.newCommandWithTeamChange(state.CommandBallPlacement, teamInFavor.Opposite()))
	} else if !newState.TeamState[teamInFavor].BallPlacementFailuresReached {
		log.Printf("Team %v places the ball for itself", teamInFavor)
		changes = append(changes, s.newCommandWithTeamChange(state.CommandBallPlacement, teamInFavor))
	} else if ballLeftField(newState) {
		log.Printf("Team %v reached the maximum allowed placement failures and ball left the field. Team %v places ball for its own free kick", teamInFavor, teamInFavor.Opposite())
		newState.NextCommand = state.CommandDirect
		newState.NextCommandFor = teamInFavor.Opposite()
		changes = append(changes, s.newCommandWithTeamChange(state.CommandBallPlacement, teamInFavor.Opposite()))
	} else {
		log.Printf("Team %v reached the maximum allowed placement failures, but ball has not left the field. Human ref places the ball for team %v", teamInFavor, teamInFavor)
		changes = append(changes, s.newCommandChange(state.CommandHalt))
	}

	return
}

// randomTeam selects a team by 50% chance
func (s *StateMachine) randomTeam() state.Team {
	if s.rand.Intn(2) == 0 {
		return state.Team_YELLOW
	}
	return state.Team_BLUE
}

// ballLeftField returns true if the game was stopped because the ball left the field
func ballLeftField(newState *state.State) bool {
	for _, gameEvent := range newState.GameEvents {
		switch *gameEvent.Type {
		case
			state.GameEventType_BALL_LEFT_FIELD_GOAL_LINE,
			state.GameEventType_BALL_LEFT_FIELD_TOUCH_LINE,
			state.GameEventType_AIMLESS_KICK,
			state.GameEventType_POSSIBLE_GOAL:
			return true
		}
	}
	return false
}

// noTeamCanPlaceBall returns true if no team can or is allowed to place the ball
func noTeamCanPlaceBall(s *state.State) bool {
	return !s.TeamState[state.Team_YELLOW].BallPlacementAllowed() && !s.TeamState[state.Team_BLUE].BallPlacementAllowed()
}
