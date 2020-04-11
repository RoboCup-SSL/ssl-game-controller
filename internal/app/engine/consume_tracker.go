package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
)

func (e *Engine) ProcessTrackerFrame(wrapperFrame *tracker.TrackerWrapperPacket) {
	if wrapperFrame.TrackedFrame == nil {
		return
	}

	state := GcStateTracker{
		SourceName: wrapperFrame.SourceName,
		Ball:       convertBalls(wrapperFrame.TrackedFrame.Balls),
		Robots:     convertRobots(wrapperFrame.TrackedFrame.Robots),
	}

	e.UpdateGcState(func(gcState *GcState) {
		gcState.TrackerState[*wrapperFrame.Uuid] = &state

		// for now, all tracker sources update the GC state
		e.gcState.TrackerStateGc = &state
	})
}

func convertRobots(robots []*tracker.TrackedRobot) (rs []*Robot) {
	for _, robot := range robots {
		rs = append(rs, &Robot{
			Id:  robot.RobotId,
			Pos: robot.Pos,
		})
	}
	return
}

func convertBalls(balls []*tracker.TrackedBall) *Ball {
	if len(balls) == 0 {
		return nil
	}
	ball := Ball{
		Pos: balls[0].Pos,
		Vel: balls[0].Vel,
	}
	return &ball
}
