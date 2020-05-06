package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/tracker"
	"log"
	"time"
)

func (e *Engine) ProcessTrackerFrame(wrapperFrame *tracker.TrackerWrapperPacket) {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	if wrapperFrame.TrackedFrame == nil {
		return
	}

	now := e.timeProvider()
	state := GcStateTracker{
		SourceName: wrapperFrame.SourceName,
		Uuid:       wrapperFrame.Uuid,
		Ball:       convertBalls(wrapperFrame.TrackedFrame.Balls),
		Robots:     convertRobots(wrapperFrame.TrackedFrame.Robots),
	}
	e.trackerLastUpdate[*wrapperFrame.Uuid] = now

	e.gcState.TrackerState[*wrapperFrame.Uuid] = &state

	for sourceId, state := range e.gcState.TrackerState {
		if now.Sub(e.trackerLastUpdate[*state.Uuid]) > time.Second {
			delete(e.gcState.TrackerState, sourceId)
		}
	}

	e.updateTrackerSourcePriority(*wrapperFrame.SourceName)

	if e.gcState.TrackerStateGc == nil {
		e.gcState.TrackerStateGc = &state
		log.Printf("Initial tracker source is %v (%v)", *e.gcState.TrackerStateGc.Uuid, *e.gcState.TrackerStateGc.SourceName)
	} else if *e.gcState.TrackerStateGc.Uuid == *wrapperFrame.Uuid {
		e.gcState.TrackerStateGc = &state
	} else if now.Sub(e.trackerLastUpdate[*e.gcState.TrackerStateGc.Uuid]) > time.Second {
		e.gcState.TrackerStateGc = e.findNewTrackerSourceState()
		if e.gcState.TrackerStateGc == nil {
			e.gcState.TrackerStateGc = &state
		}
		log.Printf("Switched tracker source to %v (%v)", *e.gcState.TrackerStateGc.Uuid, *e.gcState.TrackerStateGc.SourceName)
	}
}

func (e *Engine) findNewTrackerSourceState() *GcStateTracker {
	for _, sourceName := range e.config.TrackerSourcePriority {
		for _, state := range e.gcState.TrackerState {
			if *state.SourceName == sourceName {
				return state
			}
		}
	}
	return nil
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

func (e *Engine) updateTrackerSourcePriority(s string) {
	for _, sourceName := range e.config.TrackerSourcePriority {
		if sourceName == s {
			return
		}
	}
	e.config.TrackerSourcePriority = append(e.config.TrackerSourcePriority, s)
}
