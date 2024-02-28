package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

type KeeperHeldBallDetector struct {
	gcEngine *Engine
	lastTime *time.Time
}

func (d *KeeperHeldBallDetector) process() {

	if !d.gcEngine.currentState.Command.IsRunning() ||
		d.gcEngine.trackerStateGc.Ball == nil {
		d.lastTime = nil
		return
	}

	if ok, team := d.gcEngine.isBallInAnyDefenseArea(); ok {
		if d.lastTime == nil {
			d.lastTime = new(time.Time)
			*d.lastTime = d.gcEngine.timeProvider()
			return
		}

		timeSinceLastProgress := d.gcEngine.timeProvider().Sub(*d.lastTime)
		if timeSinceLastProgress > d.gcEngine.gameConfig.KeeperHeldBallTimeout[d.gcEngine.currentState.Division.Div()] {
			duration := float32(timeSinceLastProgress.Seconds())
			location := d.gcEngine.trackerStateGc.Ball.Pos.ToVector2()
			if d.gcEngine.IsGameEventEnabled(state.GameEvent_KEEPER_HELD_BALL) {
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
	} else {
		d.lastTime = nil
	}
}
