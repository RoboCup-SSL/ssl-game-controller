package engine

import (
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
		e.gcState.ReadyToContinue = nil
		return
	}

	readyToContinue := false

	defer func() {
		// set at the end of this function when the flag has its final value
		e.gcState.ReadyToContinue = &readyToContinue
	}()

	if e.timeSinceLastChange() < minPreparationTime {
		// Too early
		return
	}

	if *e.currentState.Command.Type == state.Command_KICKOFF {
		// ball in center circle
		if e.gcState.TrackerStateGc.Ball.Pos.ToVector2().Length() > e.gameConfig.DistanceToBallInStop {
			return
		}

		// bots on wrong side
		for _, robot := range e.gcState.TrackerStateGc.Robots {
			if *e.currentState.TeamState[robot.Id.Team.String()].OnPositiveHalf {
				if *robot.Pos.X < robotRadius {
					return
				}
			} else if *robot.Pos.X > -robotRadius {
				return
			}
		}
	}

	if *e.currentState.Command.Type == state.Command_PENALTY {
		keeperId := e.penaltyKeeperId()
		if keeperId == nil {
			return
		}
		keeperPos := e.robotPos(keeperId)
		if keeperPos == nil || !e.posInsideGoal(keeperPos) {
			return
		}

		keeperTeamInfo := e.currentState.TeamState[keeperId.Team.String()]
		ballPos := e.gcState.TrackerStateGc.Ball.Pos

		numAttackersInFrontOfBall := 0
		for _, robot := range e.gcState.TrackerStateGc.Robots {
			if *robot.Id.Id == *keeperId.Id && *robot.Id.Team == *keeperId.Team {
				// its the keeper
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
				return
			} else if numAttackersInFrontOfBall >= 1 {
				return
			} else {
				numAttackersInFrontOfBall++
			}
		}
	}

	if *e.currentState.Command.Type == state.Command_STOP &&
		(e.currentState.NextCommand == nil ||
			!e.readyToContinueFromStop()) {
		return
	}

	if *e.currentState.Command.Type == state.Command_STOP &&
		(e.currentState.NextCommand == nil ||
			!e.readyToContinueFromHalt()) {
		return
	}

	readyToContinue = true

	if e.currentState.GetAutoContinue() {
		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_Continue{
				Continue: &statemachine.Continue{},
			},
		})
	}
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

func (e *Engine) readyToContinueFromStop() bool {
	radius := e.gameConfig.DistanceToBallInStop + robotRadius - distanceThreshold
	if e.gcState.TrackerStateGc.Ball == nil ||
		!e.ballSteady() ||
		e.robotsInsideRadius(e.gcState.TrackerStateGc.Robots, e.gcState.TrackerStateGc.Ball.Pos.ToVector2(), radius) {
		return false
	}
	return true
}

func (e *Engine) readyToContinueFromHalt() bool {
	if e.gcState.TrackerStateGc.Ball == nil ||
		e.currentState.PlacementPos == nil ||
		!e.ballSteady() ||
		e.currentState.PlacementPos.DistanceTo(e.gcState.TrackerStateGc.Ball.Pos.ToVector2()) > e.gameConfig.BallPlacementTolerance ||
		e.tooManyRobots(state.Team_BLUE) ||
		e.tooManyRobots(state.Team_YELLOW) {
		return false
	}
	return true
}

func (e *Engine) tooManyRobots(team state.Team) bool {
	maxAllowed := *e.currentState.TeamState[team.String()].MaxAllowedBots
	current := numRobotsOfTeam(e.gcState.TrackerStateGc.Robots, team)
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
