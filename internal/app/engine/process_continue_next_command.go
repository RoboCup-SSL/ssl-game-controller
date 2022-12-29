package engine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"
)

const distanceToBallDuringPenalty = 1.0

func (e *Engine) createNextCommandContinueAction() *ContinueAction {
	var actionState = ContinueAction_STATE_UNKNOWN
	var continuationIssues = e.findIssuesForContinuation(*e.currentState.Command.Type)
	var readyAt *timestamppb.Timestamp
	var issuesPresent = len(continuationIssues) > 0
	var lastReadyAt *timestamppb.Timestamp

	if len(e.gcState.ContinueActions) > 0 {
		lastReadyAt = e.gcState.ContinueActions[0].ReadyAt
	}

	if issuesPresent {
		readyAt = nil
		actionState = ContinueAction_BLOCKED
	} else if lastReadyAt == nil {
		readyAt = timestamppb.New(e.timeProvider().Add(e.preparationTime()))
		actionState = ContinueAction_WAITING
	} else {
		readyAt = lastReadyAt
		preparationTimeLeft := lastReadyAt.AsTime().Sub(e.timeProvider())
		if preparationTimeLeft > 0 {
			continuationIssues = append(continuationIssues, fmt.Sprintf("%.1fs left for preparation", preparationTimeLeft.Seconds()))
			actionState = ContinueAction_WAITING
		} else {
			actionState = ContinueAction_READY_AUTO
		}
	}

	nextActionType := ContinueAction_NEXT_COMMAND
	return &ContinueAction{
		Type:               &nextActionType,
		ForTeam:            e.currentState.NextCommand.ForTeam,
		State:              &actionState,
		ContinuationIssues: continuationIssues,
		ReadyAt:            readyAt,
	}
}

func (e *Engine) findIssuesForContinuation(command state.Command_Type) []string {

	if e.gcState.TrackerStateGc.Ball == nil {
		// No tracking data, can not check for issues
		return []string{}
	}

	switch command {
	case state.Command_KICKOFF:
		return e.readyToContinueKickoff()
	case state.Command_PENALTY:
		return e.readyToContinuePenalty()
	case state.Command_STOP:
		return e.readyToContinueFromStop()
	}

	return []string{}
}

func (e *Engine) readyToContinueKickoff() (issues []string) {
	ballToCenterCircleDist := e.gcState.TrackerStateGc.Ball.Pos.ToVector2().Length() - e.getGeometry().CenterCircleRadius
	if ballToCenterCircleDist > 0 {
		issues = append(issues, fmt.Sprintf("Ball is %.1f m away from center circle", ballToCenterCircleDist))
	}

	for _, robot := range e.gcState.TrackerStateGc.Robots {
		if *e.currentState.TeamState[robot.Id.Team.String()].OnPositiveHalf {
			if *robot.Pos.X < robotRadius {
				issues = append(issues, fmt.Sprintf("Robot %s is not in its own half", robot.Id.PrettyString()))
			}
		} else if *robot.Pos.X > -robotRadius {
			issues = append(issues, fmt.Sprintf("Robot %s is not in its own half", robot.Id.PrettyString()))
		}
	}
	return issues
}

func (e *Engine) readyToContinuePenalty() (issues []string) {
	keeperId := e.penaltyKeeperId()
	if keeperId == nil {
		issues = append(issues, "There is no keeper")
		return
	}
	keeperPos := e.robotPos(keeperId)
	if keeperPos == nil {
		issues = append(issues, "Keeper position is unknown")
	} else if !e.posInsideGoal(keeperPos) {
		issues = append(issues, "Keeper is not inside goal")
	}

	keeperTeamInfo := e.currentState.TeamState[keeperId.Team.String()]
	ballPos := e.gcState.TrackerStateGc.Ball.Pos

	numAttackersInFrontOfBall := 0
	for _, robot := range e.gcState.TrackerStateGc.Robots {
		if *robot.Id.Id == *keeperId.Id && *robot.Id.Team == *keeperId.Team {
			// it's the keeper
			continue
		}
		if *keeperTeamInfo.OnPositiveHalf &&
			*robot.Pos.X < *ballPos.X-distanceToBallDuringPenalty {
			continue
		} else if !*keeperTeamInfo.OnPositiveHalf &&
			*robot.Pos.X > *ballPos.X+distanceToBallDuringPenalty {
			continue
		}
		if *robot.Id.Team == *keeperId.Team {
			issues = append(issues, fmt.Sprintf(
				"Robot %s does not keep required distance to ball", robot.Id.PrettyString()))
		} else if numAttackersInFrontOfBall >= 1 {
			issues = append(issues, fmt.Sprintf(
				"Robot %s does not keep required distance to ball", robot.Id.PrettyString()))
		} else {
			numAttackersInFrontOfBall++
		}
	}
	return
}

func (e *Engine) readyToContinueFromStop() (issues []string) {
	if e.tooManyRobots(state.Team_YELLOW) {
		issues = append(issues, "Yellow team has too many robots")
	}
	if e.tooManyRobots(state.Team_BLUE) {
		issues = append(issues, "Blue team has too many robots")
	}
	radius := e.gameConfig.DistanceToBallInStop + robotRadius - distanceThreshold
	robotNearBall := e.findRobotInsideRadius(e.gcState.TrackerStateGc.Robots, e.gcState.TrackerStateGc.Ball.Pos.ToVector2(), radius)
	if robotNearBall != nil {
		issues = append(issues, fmt.Sprintf("Robot %s is too close to ball", robotNearBall.Id.PrettyString()))
	}
	if e.currentState.PlacementPos != nil {
		ballToPlacementPosDist := e.currentState.PlacementPos.DistanceTo(e.gcState.TrackerStateGc.Ball.Pos.ToVector2())
		if ballToPlacementPosDist > e.gameConfig.BallPlacementRequiredDistance {
			issues = append(issues, fmt.Sprintf("Ball is %.2fm (>%.2fm) away from placement pos",
				ballToPlacementPosDist, e.gameConfig.BallPlacementRequiredDistance))
		}
	}
	if !e.gcState.TrackerStateGc.Ball.IsSteady() {
		issues = append(issues, "Ball position is not steady")
	}
	return
}

func (e *Engine) penaltyKeeperId() *state.RobotId {
	forTeam := e.currentState.Command.ForTeam.Opposite()
	teamInfo := e.currentState.TeamState[forTeam.String()]
	keeperId := uint32(*teamInfo.Goalkeeper)
	return &state.RobotId{
		Id:   &keeperId,
		Team: &forTeam,
	}
}

func (e *Engine) robotPos(robotId *state.RobotId) *geom.Vector2 {
	for _, robot := range e.gcState.TrackerStateGc.Robots {
		if *robot.Id.Id == *robotId.Id && *robot.Id.Team == *robotId.Team {
			return robot.Pos
		}
	}
	return nil
}

func (e *Engine) posInsideGoal(pos *geom.Vector2) bool {
	goalTeam := e.currentState.Command.ForTeam.Opposite()
	teamInfo := e.currentState.TeamState[goalTeam.String()]
	goalCenter := geom.GoalCenter(e.getGeometry(), *teamInfo.OnPositiveHalf)
	goalArea := geom.NewRectangleFromCenter(goalCenter, robotRadius*2, e.getGeometry().GoalWidth)
	return goalArea.IsPointInside(pos)
}

func (e *Engine) tooManyRobots(team state.Team) bool {
	maxAllowed := *e.currentState.TeamState[team.String()].MaxAllowedBots
	current := e.gcState.TrackerStateGc.NumTeamRobots(team)
	return current > maxAllowed
}

func (e *Engine) preparationTime() time.Duration {
	events := e.currentState.GameEvents
	if len(events) > 0 {
		lastEvent := events[len(events)-1]
		if *lastEvent.Type == state.GameEvent_PLACEMENT_SUCCEEDED &&
			lastEvent.ByTeam() == *e.currentState.NextCommand.ForTeam {
			return 0
		}
	}
	return minPreparationTime
}
