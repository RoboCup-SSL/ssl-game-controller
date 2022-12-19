package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

// CreateCommandChange creates a change with a new command
func CreateCommandChange(command *state.Command) *Change {
	return &Change{
		Change: &Change_NewCommandChange{
			NewCommandChange: &Change_NewCommand{
				Command: command,
			},
		},
	}
}

// CreateGameEventChange creates a change with a new game event
func CreateGameEventChange(eventType state.GameEvent_Type, event *state.GameEvent) *Change {
	event.Type = &eventType
	event.Origin = []string{changeOriginStateMachine}
	return &Change{
		Origin: &changeOriginStateMachine,
		Change: &Change_AddGameEventChange{
			AddGameEventChange: &Change_AddGameEvent{
				GameEvent: event,
			},
		},
	}
}

// CreateBotSubstitutionEventChange creates a new change for bot substitution
func CreateBotSubstitutionEventChange(byTeam state.Team) *Change {
	return CreateGameEventChange(state.GameEvent_BOT_SUBSTITUTION, &state.GameEvent{
		Event: &state.GameEvent_BotSubstitution_{
			BotSubstitution: &state.GameEvent_BotSubstitution{
				ByTeam: &byTeam,
			},
		},
	})
}

// CreateStageChange creates a change with a new stage
func CreateStageChange(stage *state.Referee_Stage) *Change {
	return &Change{
		Change: &Change_ChangeStageChange{
			ChangeStageChange: &Change_ChangeStage{
				NewStage: stage,
			},
		},
	}
}
