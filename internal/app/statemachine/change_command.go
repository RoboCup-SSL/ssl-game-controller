package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
)

func (s *StateMachine) processChangeNewCommand(newState *state.State, newCommand *Change_NewCommand) (changes []*Change) {
	prevGameState := newState.GameState
	newState.GameState = s.newGameState(newState, newCommand)
	newState.Command = newCommand.Command

	switch *newState.Command.Type {
	case state.Command_BALL_PLACEMENT:
		newState.CurrentActionTimeRemaining = durationpb.New(s.gameConfig.BallPlacementTime)
	case state.Command_DIRECT:
		newState.CurrentActionTimeRemaining = durationpb.New(s.gameConfig.FreeKickTimeout[newState.Division.Div()])
	case state.Command_KICKOFF, state.Command_PENALTY:
		newState.CurrentActionTimeRemaining = durationpb.New(s.gameConfig.PrepareTimeout)
	case state.Command_TIMEOUT:
		*newState.TeamInfo(*newState.Command.ForTeam).TimeoutsLeft--
		newState.TeamInfo(*newState.Command.ForTeam).RequestsTimeoutSince = nil
	}

	if *newState.GameState.Type == state.GameState_STOP {
		if prevGameState.IsHalted() {
			newState.ReadyContinueTime = timestamppb.New(s.timeProvider().Add(s.gameConfig.PreparationTimeAfterHalt))
			// reset robot substitution flags
			for _, team := range state.BothTeams() {
				newState.TeamInfo(team).RequestsBotSubstitutionSince = nil
				*newState.TeamInfo(team).BotSubstitutionAllowed = false
			}
		} else if newState.ReadyContinueTime == nil {
			newState.ReadyContinueTime = timestamppb.New(s.timeProvider().Add(s.gameConfig.PreparationTimeBeforeResume))
		}
	} else {
		newState.ReadyContinueTime = nil
	}

	if newState.Command.IsRunning() {
		if newState.Stage.IsPreStage() {
			log.Print("Pre-Stage is over, because game is running now")
			changes = append(changes, &Change{
				Change: &Change_ChangeStageChange{
					ChangeStageChange: &Change_ChangeStage{
						NewStage: newState.Stage.Next(),
					},
				},
			})
		}

		// reset game events and proposals
		newState.ProposalGroups = nil
		newState.GameEvents = nil

		// reset ball placement pos and follow ups
		newState.PlacementPos = nil
		newState.NextCommand = nil
	}

	if *newState.Stage == state.Referee_PENALTY_SHOOTOUT &&
		newState.ShootoutState != nil {
		if *newCommand.Command.Type == state.Command_NORMAL_START {
			newState.ShootoutState.NumberOfAttempts[newState.ShootoutState.NextTeam.String()]++
			*newState.ShootoutState.NextTeam = newState.ShootoutState.NextTeam.Opposite()
		} else if *newState.GameState.Type == state.GameState_STOP {
			forTeam := *newState.ShootoutState.NextTeam
			newState.NextCommand = state.NewCommand(state.Command_PENALTY, forTeam)
		}
	}

	return
}

func (s *StateMachine) newGameState(newState *state.State, newCommand *Change_NewCommand) *state.GameState {
	switch *newCommand.Command.Type {
	case state.Command_HALT:
		return state.NewGameStateNeutral(state.GameState_HALT)
	case state.Command_STOP:
		return state.NewGameStateNeutral(state.GameState_STOP)
	case state.Command_NORMAL_START:
		// Keep previous state
		return newState.GameState
	case state.Command_FORCE_START:
		return state.NewGameStateNeutral(state.GameState_RUNNING)
	case state.Command_DIRECT:
		return state.NewGameStateWithTeam(state.GameState_FREE_KICK, *newCommand.Command.ForTeam)
	case state.Command_KICKOFF:
		return state.NewGameStateWithTeam(state.GameState_KICKOFF, *newCommand.Command.ForTeam)
	case state.Command_PENALTY:
		return state.NewGameStateWithTeam(state.GameState_PENALTY, *newCommand.Command.ForTeam)
	case state.Command_TIMEOUT:
		return state.NewGameStateWithTeam(state.GameState_TIMEOUT, *newCommand.Command.ForTeam)
	case state.Command_BALL_PLACEMENT:
		return state.NewGameStateWithTeam(state.GameState_BALL_PLACEMENT, *newCommand.Command.ForTeam)
	case state.Command_UNKNOWN:
		return state.NewGameStateNeutral(state.GameState_UNKNOWN)
	default:
		return state.NewGameStateNeutral(state.GameState_UNKNOWN)
	}
}
