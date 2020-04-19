package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) processChangeContinue(newState *state.State) (changes []*Change) {
	substituteBots := false
	for _, team := range state.BothTeams() {
		if *newState.TeamInfo(team).BotSubstitutionIntent {
			changes = append(changes, s.botSubstitutionIntentEventChange(team))
			substituteBots = true
		}
	}
	if substituteBots {
		log.Print("Can not continue yet: A bot substitution was requested.")
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
func (s *StateMachine) botSubstitutionIntentEventChange(byTeam state.Team) *Change {
	eventType := state.GameEvent_BOT_SUBSTITUTION
	return createGameEventChange(state.GameEvent_BOT_SUBSTITUTION, state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BotSubstitution_{
			BotSubstitution: &state.GameEvent_BotSubstitution{
				ByTeam: &byTeam,
			},
		},
	})
}
