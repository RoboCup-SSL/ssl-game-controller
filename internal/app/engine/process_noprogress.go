package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

const distanceTolerance = 0.1

type NoProgressDetector struct {
	gcEngine    *Engine
	lastBallPos *geom.Vector2
	lastTime    *time.Time
}

func (d *NoProgressDetector) process() {

	if !d.gcEngine.currentState.Command.IsRunning() ||
		d.gcEngine.trackerStateGc.Ball == nil ||
		(d.gcEngine.currentState.CurrentActionTimeRemaining != nil && goDur(d.gcEngine.currentState.CurrentActionTimeRemaining) > 0) {
		d.lastBallPos = nil
		d.lastTime = nil
		return
	}

	if d.lastBallPos == nil {
		d.lastBallPos = d.gcEngine.trackerStateGc.Ball.Pos.ToVector2()
		return
	}

	if d.lastBallPos.DistanceTo(d.gcEngine.trackerStateGc.Ball.Pos.ToVector2()) > distanceTolerance {
		d.lastTime = nil
		d.lastBallPos = d.gcEngine.trackerStateGc.Ball.Pos.ToVector2()
		return
	}

	if d.lastTime == nil {
		d.lastTime = new(time.Time)
		*d.lastTime = d.gcEngine.timeProvider()
		return
	}

	timeSinceLastProgress := d.gcEngine.timeProvider().Sub(*d.lastTime)
	if timeSinceLastProgress > d.gcEngine.gameConfig.NoProgressTimeout[d.gcEngine.currentState.Division.Div()] {
		duration := float32(timeSinceLastProgress.Seconds())
		location := d.gcEngine.trackerStateGc.Ball.Pos.ToVector2()
		if d.gcEngine.IsGameEventEnabled(state.GameEvent_KEEPER_HELD_BALL) {
			if ok, team := d.isBallInAnyDefenseArea(); ok {
				d.gcEngine.Enqueue(createGameEventChange(state.GameEvent_KEEPER_HELD_BALL, &state.GameEvent{
					Event: &state.GameEvent_KeeperHeldBall_{
						KeeperHeldBall: &state.GameEvent_KeeperHeldBall{
							ByTeam:   &team,
							Location: location,
							Duration: &duration,
						},
					},
				}))
				return
			}
		}
		if d.gcEngine.IsGameEventEnabled(state.GameEvent_NO_PROGRESS_IN_GAME) {
			d.gcEngine.Enqueue(createGameEventChange(state.GameEvent_NO_PROGRESS_IN_GAME, &state.GameEvent{
				Event: &state.GameEvent_NoProgressInGame_{
					NoProgressInGame: &state.GameEvent_NoProgressInGame{
						Location: location,
						Time:     &duration,
					},
				},
			}))
		}
	}
}

func (d *NoProgressDetector) isBallInAnyDefenseArea() (bool, state.Team) {
	for _, team := range state.BothTeams() {
		defenseArea := geom.NewDefenseArea(d.gcEngine.getGeometry(), *d.gcEngine.currentState.TeamState[team.String()].OnPositiveHalf)
		if defenseArea.IsPointInside(d.gcEngine.trackerStateGc.Ball.Pos.ToVector2()) {
			return true, team
		}
	}
	return false, state.Team_UNKNOWN
}
