package engine

import (
	"time"

	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
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

func (e *Engine) NumTeamRobotsExcludingSubstitutionZone(team state.Team) (count int32) {
	bWidthTouchLine := e.getGeometry().BoundaryWidthTouchLine
	bWidthGoalLine := e.getGeometry().BoundaryWidthGoalLine
	fieldMaxX := e.getGeometry().FieldLength / 2
	fieldMaxY := e.getGeometry().FieldWidth / 2
	goalSubstitutionDepth := e.getGeometry().GoalSubstitutionAreaWidth

	// The substitution area is only checked behind the team's own goal.
	// A team's own goal is on the positive X side when it is on the positive half.
	var substitutionZone *geom.Rectangle
	if *e.currentState.TeamState[team.String()].OnPositiveHalf {
		substitutionZone = geom.NewRectangleFromPoints(
			geom.NewVector2(fieldMaxX+bWidthGoalLine-goalSubstitutionDepth+robotRadius, -(fieldMaxY+bWidthTouchLine)),
			geom.NewVector2(fieldMaxX+bWidthGoalLine, fieldMaxY+bWidthTouchLine),
		)
	} else {
		substitutionZone = geom.NewRectangleFromPoints(
			geom.NewVector2(-(fieldMaxX+bWidthGoalLine), -(fieldMaxY+bWidthTouchLine)),
			geom.NewVector2(-(fieldMaxX+bWidthGoalLine-goalSubstitutionDepth+robotRadius), fieldMaxY+bWidthTouchLine),
		)
	}

	for _, robot := range e.trackerStateGc.Robots {
		if *robot.Id.Team != team {
			continue
		}
		if !substitutionZone.IsPointInside(robot.Pos) {
			count++
		}
	}
	return
}

func (e *Engine) isBallInAnyDefenseArea() (bool, state.Team) {
	for _, team := range state.BothTeams() {
		defenseArea := geom.NewDefenseArea(e.getGeometry(), *e.currentState.TeamState[team.String()].OnPositiveHalf)
		if defenseArea.IsPointInside(e.trackerStateGc.Ball.Pos.ToVector2()) {
			return true, team
		}
	}
	return false, state.Team_UNKNOWN
}

// ballTooCloseToDefenseArea returns true if the ball is within BallPlacementMinDistanceToDefenseArea of either
// defense area. This is the single source of truth for the placement keep-out check and must be used by both
// the check that decides whether placement is required and the check that gates auto-continue readiness,
// otherwise the two can silently drift apart.
func (e *Engine) ballTooCloseToDefenseArea(ballPos *geom.Vector2) bool {
	for _, sign := range []float64{1, -1} {
		defenseArea := geom.NewDefenseAreaBySign(e.getGeometry(), sign)
		forbiddenArea := defenseArea.WithMargin(e.gameConfig.BallPlacementMinDistanceToDefenseArea)
		if forbiddenArea.IsPointInside(ballPos) {
			return true
		}
	}
	return false
}
