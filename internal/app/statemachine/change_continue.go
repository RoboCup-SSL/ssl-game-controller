package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) Continue(newState *state.State) (changes []Change) {
	substituteBots := false
	for _, team := range state.BothTeams() {
		if newState.TeamState[team].BotSubstitutionIntend {
			changes = append(changes, s.botSubstitutionIntentEventChange(team))
			substituteBots = true
		}
	}
	if substituteBots {
		log.Print("Can not continue yet: A bot substitution was requested.")
		return
	}

	if newState.NextCommand != state.CommandUnknown {
		log.Printf("Continue with next command: %v %v", newState.NextCommand, newState.NextCommandFor)
		changes = append(changes, s.newCommandWithTeamChange(newState.NextCommand, newState.NextCommandFor))
	} else if newState.GameState() != state.GameStateStopped {
		log.Println("Halting the game as there is no known next command to continue with")
		// halt the game, if not in STOP.
		// Rational: After ball placement and no next command, halt the game to indicate that manual action is required
		// If in STOP, that was most likely triggered manually already and a suddenly halted game might be confusing and not intended
		changes = append(changes, s.newCommandChange(state.CommandHalt))
	}
	return
}

func (s *StateMachine) botSubstitutionIntentEventChange(byTeam state.Team) Change {
	eventType := state.GameEventType_BOT_SUBSTITUTION
	return Change{
		ChangeType:   ChangeTypeAddGameEvent,
		ChangeOrigin: changeOriginStateMachine,
		AddGameEvent: &AddGameEvent{
			GameEvent: state.GameEvent{
				Type:   &eventType,
				Origin: []string{changeOriginStateMachine},
				Event: &state.GameEvent_BotSubstitution_{
					BotSubstitution: &state.GameEvent_BotSubstitution{
						ByTeam: &byTeam,
					},
				},
			},
		},
	}
}
