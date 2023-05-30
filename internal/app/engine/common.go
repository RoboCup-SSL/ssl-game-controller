package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"
)

const ballSteadyThreshold = 0.2
const robotRadius = 0.09
const distanceThreshold = 0.05

func createGameEventChange(eventType state.GameEvent_Type, event *state.GameEvent) *statemachine.Change {
	event.Type = &eventType
	event.Origin = []string{changeOriginEngine}
	return &statemachine.Change{
		Origin: &changeOriginEngine,
		Change: &statemachine.Change_AddGameEventChange{
			AddGameEventChange: &statemachine.Change_AddGameEvent{
				GameEvent: event,
			},
		},
	}
}

// createCommandChange creates a change with a new command
func createCommandChange(command *state.Command) *statemachine.Change {
	return &statemachine.Change{
		Origin: &changeOriginEngine,
		Change: &statemachine.Change_NewCommandChange{
			NewCommandChange: &statemachine.Change_NewCommand{
				Command: command,
			},
		},
	}
}

// createBotSubstitutionEventChange creates a new change for bot substitution
func createBotSubstitutionEventChange(byTeam state.Team) *statemachine.Change {
	return createGameEventChange(state.GameEvent_BOT_SUBSTITUTION, &state.GameEvent{
		Event: &state.GameEvent_BotSubstitution_{
			BotSubstitution: &state.GameEvent_BotSubstitution{
				ByTeam: &byTeam,
			},
		},
	})
}

// createBallPlacementSucceededEventChange creates a new change for ball placement success
func createBallPlacementSucceededEventChange(byTeam state.Team) *statemachine.Change {
	return createGameEventChange(state.GameEvent_PLACEMENT_SUCCEEDED, &state.GameEvent{
		Event: &state.GameEvent_PlacementSucceeded_{
			PlacementSucceeded: &state.GameEvent_PlacementSucceeded{
				ByTeam: &byTeam,
			},
		},
	})
}

// createBallPlacementFailedEventChange creates a new change for ball placement success
func createBallPlacementFailedEventChange(byTeam state.Team) *statemachine.Change {
	return createGameEventChange(state.GameEvent_PLACEMENT_FAILED, &state.GameEvent{
		Event: &state.GameEvent_PlacementFailed_{
			PlacementFailed: &state.GameEvent_PlacementFailed{
				ByTeam: &byTeam,
			},
		},
	})
}

// createChallengeFlagHandledEventChange creates a new change for handled challenge flags
func createChallengeFlagHandledEventChange(byTeam state.Team, accepted bool) *statemachine.Change {
	return createGameEventChange(state.GameEvent_CHALLENGE_FLAG_HANDLED, &state.GameEvent{
		Event: &state.GameEvent_ChallengeFlagHandled_{
			ChallengeFlagHandled: &state.GameEvent_ChallengeFlagHandled{
				ByTeam:   &byTeam,
				Accepted: &accepted,
			},
		},
	})
}

// createStageChange creates a change with a new stage
func createStageChange(stage *state.Referee_Stage) *statemachine.Change {
	return &statemachine.Change{
		Origin: &changeOriginEngine,
		Change: &statemachine.Change_ChangeStageChange{
			ChangeStageChange: &statemachine.Change_ChangeStage{
				NewStage: stage,
			},
		},
	}
}

func (e *Engine) findRobotInsideRadius(robots []*Robot, pos *geom.Vector2, radius float64) (matchingRobots []*Robot) {
	for _, robot := range robots {
		distance := robot.Pos.DistanceTo(pos)
		if distance < radius {
			matchingRobots = append(matchingRobots, robot)
		}
	}

	return
}

func goDur(duration *durationpb.Duration) time.Duration {
	return duration.AsDuration()
}

func goTime(timestamp *timestamppb.Timestamp) time.Time {
	return timestamp.AsTime()
}

func addDur(duration *durationpb.Duration, delta time.Duration) {
	*duration = *durationpb.New(duration.AsDuration() + delta)
}

func (e *Ball) IsSteady() bool {
	return e.Vel == nil || e.Vel.ToVector2().Length() < ballSteadyThreshold
}

func (x *GcStateTracker) NumTeamRobots(team state.Team) (count int32) {
	for _, robot := range x.Robots {
		if *robot.Id.Team == team {
			count++
		}
	}
	return
}
