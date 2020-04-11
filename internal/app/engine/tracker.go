package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
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
	e.gcState.TrackerState[*wrapperFrame.Uuid] = &state

	// TODO update tracker GC state as well
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

//func (e *Engine) steadyCommonlyAgreedOnBallPos() *geom.Vector2 {
//	var ballPos *geom.Vector2
//	for _, trackerState := range e.gcState.TrackerState {
//		if trackerState.BallPos != nil &&
//			trackerState.BallVel != nil {
//			if trackerState.BallVel.Length() > ballSteadyThreshold {
//				// ball is still moving
//				return nil
//			}
//			if ballPos == nil {
//				// first steady ball pos
//				ballPos = trackerState.BallPos
//			} else if ballPos.DistanceTo(trackerState.BallPos) > 0.1 {
//				// additional steady ball pos that differs from the first one
//				return nil
//			}
//		}
//	}
//	return ballPos
//}

//func (e *Engine) uniqueBallPoss() (ballPoss []*geom.Vector2) {
//	for _, trackerState := range e.gcState.TrackerState {
//		if trackerState.BallPos != nil && !containsPos(ballPoss, trackerState.BallPos) {
//			ballPoss = append(ballPoss, trackerState.BallPos)
//		}
//	}
//	return
//}

func containsPos(l []*geom.Vector2, v *geom.Vector2) bool {
	for _, ballPos := range l {
		if ballPos.DistanceTo(v) < 0.1 {
			return true
		}
	}
	return false
}
