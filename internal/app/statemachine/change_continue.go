package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) processChangeContinue(newState *state.State) (changes []*Change) {
	continueCanceled := false

	for _, team := range state.BothTeams() {
		if newState.TeamInfo(team).RequestsBotSubstitutionSince != nil {
			changes = append(changes, s.botSubstitutionIntentEventChange(team))
			continueCanceled = true
		}
	}

	if newState.TeamInfo(state.SSL_Team_BLUE).RequestsTimeoutSince != nil &&
		newState.TeamInfo(state.SSL_Team_YELLOW).RequestsTimeoutSince != nil {
		if goTime(newState.TeamInfo(state.SSL_Team_BLUE).RequestsTimeoutSince).
			Before(goTime(newState.TeamInfo(state.SSL_Team_YELLOW).RequestsTimeoutSince)) {
			changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_TIMEOUT, state.SSL_Team_BLUE)))
		} else {
			changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_TIMEOUT, state.SSL_Team_YELLOW)))
		}
		continueCanceled = true
	} else {
		for _, team := range state.BothTeams() {
			if newState.TeamInfo(team).RequestsTimeoutSince != nil {
				changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_TIMEOUT, team)))
				continueCanceled = true
			}
		}
	}

	if continueCanceled {
		return
	}

	if *newState.Command.Type == state.Command_HALT {
		log.Printf("Continue with STOP after HALT")
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_STOP)))
	} else if newState.NextCommand != nil {
		log.Printf("Continue with next command: %v", *newState.NextCommand)
		changes = append(changes, s.createCommandChange(newState.NextCommand))
	} else if *newState.Command.Type != state.Command_HALT {
		log.Println("Halting the game as there is no known next command to continue with")
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	}
	return
}

// botSubstitutionIntentEventChange creates a new change for bot substitution
func (s *StateMachine) botSubstitutionIntentEventChange(byTeam state.SSL_Team) *Change {
	return createGameEventChange(state.GameEvent_BOT_SUBSTITUTION, state.GameEvent{
		Event: &state.GameEvent_BotSubstitution_{
			BotSubstitution: &state.GameEvent_BotSubstitution{
				ByTeam: &byTeam,
			},
		},
	})
}
