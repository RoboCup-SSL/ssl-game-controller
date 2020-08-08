package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) processChangeStartBallPlacement(newState *state.State) (changes []*Change) {

	if newState.NextCommand == nil || newState.PlacementPos == nil || noTeamCanPlaceBall(newState) {
		log.Print("placement not possible, human ref must help out")
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
		return
	}

	if *newState.NextCommand.Type == state.Command_PENALTY || *newState.NextCommand.Type == state.Command_KICKOFF {
		log.Printf("Human ref places the ball for %v", *newState.NextCommand)
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	}

	var teamInFavor state.SSL_Team
	if newState.NextCommand.ForTeam.Unknown() {
		// select a team by 50% chance
		teamInFavor = s.randomTeam()
		log.Printf("No team in favor. Chose one randomly.")
	} else {
		teamInFavor = *newState.NextCommand.ForTeam
	}
	log.Printf("Start ball placement for %v", teamInFavor)

	if !*newState.TeamInfo(teamInFavor).CanPlaceBall {
		log.Printf("Placement for team %v is disabled, team %v places the ball for team %v", teamInFavor, teamInFavor.Opposite(), teamInFavor)
		changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, teamInFavor.Opposite())))
	} else if !*newState.TeamInfo(teamInFavor).BallPlacementFailuresReached {
		log.Printf("SSL_Team %v places the ball for itself", teamInFavor)
		changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, teamInFavor)))
	} else if ballLeftField(newState) {
		log.Printf("SSL_Team %v reached the maximum allowed placement failures and ball left the field. SSL_Team %v places ball for its own free kick", teamInFavor, teamInFavor.Opposite())
		newState.NextCommand = state.NewCommand(state.Command_DIRECT, teamInFavor.Opposite())
		changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, teamInFavor.Opposite())))
	} else {
		log.Printf("SSL_Team %v reached the maximum allowed placement failures, but ball has not left the field. Human ref places the ball for team %v", teamInFavor, teamInFavor)
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	}

	return
}

// randomTeam selects a team by 50% chance
func (s *StateMachine) randomTeam() state.SSL_Team {
	if s.rand.Intn(2) == 0 {
		return state.SSL_Team_YELLOW
	}
	return state.SSL_Team_BLUE
}

// ballLeftField returns true if the game was stopped because the ball left the field
func ballLeftField(newState *state.State) bool {
	for _, gameEvent := range newState.GameEvents {
		switch *gameEvent.Type {
		case
			state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
			state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE,
			state.GameEvent_AIMLESS_KICK,
			state.GameEvent_POSSIBLE_GOAL:
			return true
		}
	}
	return false
}

// noTeamCanPlaceBall returns true if no team can or is allowed to place the ball
func noTeamCanPlaceBall(s *state.State) bool {
	return !s.TeamInfo(state.SSL_Team_YELLOW).BallPlacementAllowed() && !s.TeamInfo(state.SSL_Team_BLUE).BallPlacementAllowed()
}
