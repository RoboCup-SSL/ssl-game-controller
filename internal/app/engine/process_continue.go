package engine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"time"
)

const minPreparationTime = time.Second * 2
const distanceToBallDuringPenalty = 1.0

func (e *Engine) processContinue() {
	if !(e.currentState.Command.IsPrepare() ||
		*e.currentState.Command.Type == state.Command_STOP ||
		(e.gameConfig.ContinueFromHalt && *e.currentState.Command.Type == state.Command_HALT)) ||
		e.gcState.TrackerStateGc.Ball == nil {
		// Reset ready to continue
		e.gcState.ReadyToContinue = nil
		e.gcState.ContinuationIssues = []string{}
		return
	}

	e.gcState.ContinuationIssues = e.findIssueForContinuation()
	readyToContinue := len(e.gcState.ContinuationIssues) == 0
	e.gcState.ReadyToContinue = &readyToContinue

	if readyToContinue && e.currentState.GetAutoContinue() {
		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_Continue{
				Continue: &statemachine.Continue{},
			},
		})
	}
}

func (e *Engine) findIssueForContinuation() (issues []string) {
	preparationTimeLeft := e.timeSinceLastChange() - minPreparationTime
	if preparationTimeLeft < 0 {
		issues = append(issues, fmt.Sprintf("%.1fs left for preparation", -preparationTimeLeft.Seconds()))
	}

	if *e.currentState.Command.Type == state.Command_KICKOFF {
		issues = append(issues, e.readyToContinueKickoff()...)
	}

	if *e.currentState.Command.Type == state.Command_PENALTY {
		issues = append(issues, e.readyToContinuePenalty()...)
	}

	if *e.currentState.Command.Type == state.Command_STOP {
		issues = append(issues, e.readyToContinueFromStop()...)
	}

	return
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
		if ballToPlacementPosDist > e.gameConfig.BallPlacementTolerance {
			issues = append(issues, fmt.Sprintf("Ball is %.1fm (>%.1fm) away from placement pos",
				ballToPlacementPosDist, e.gameConfig.BallPlacementTolerance))
		}
	}
	if !e.ballSteady() {
		issues = append(issues, "Ball position is not steady")
	}
	if e.currentState.NextCommand == nil {
		issues = append(issues, "No next command")
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

func (e *Engine) timeSinceLastChange() time.Duration {
	if e.stateStore.LatestEntry() != nil {
		lastChangeTs := goTime(e.stateStore.LatestEntry().Timestamp)
		now := e.timeProvider()
		return now.Sub(lastChangeTs)
	}
	return 0
}
