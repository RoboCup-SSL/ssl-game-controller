package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"time"
)

// processAutoRefFlags processes the flags send by the autoRefs and triggers changes based on them
func (e *Engine) processAutoRefFlags() {
	if len(e.gcState.AutoRefState) == 0 {
		return
	}

	if e.stateStore.LatestEntry() != nil {
		lastChangeTs := goTime(e.stateStore.LatestEntry().Timestamp)
		now := e.timeProvider()
		if lastChangeTs.Before(now.Add(time.Millisecond * 200)) {
			// Do nothing within the first 200ms after any change
			return
		}
	}

	readyToContinue := true
	ballPlaced := true
	var lastProgressSum, lastProgressNum uint64
	for _, autoRefState := range e.gcState.AutoRefState {
		if autoRefState.ReadyToContinue != nil {
			readyToContinue = readyToContinue && *autoRefState.ReadyToContinue
		}
		if autoRefState.BallPlaced != nil {
			ballPlaced = ballPlaced && *autoRefState.BallPlaced
		}
		if autoRefState.LastProgress != nil {
			lastProgressNum++
			lastProgressSum += *autoRefState.LastProgress
		}
	}

	if *e.currentState.Command.Type == state.Command_BALL_PLACEMENT && readyToContinue {
		e.Enqueue(createGameEventChange(state.GameEvent_PLACEMENT_SUCCEEDED, state.GameEvent{
			Event: &state.GameEvent_PlacementSucceeded_{
				PlacementSucceeded: &state.GameEvent_PlacementSucceeded{
					ByTeam:    e.currentState.Command.ForTeam,
					TimeTaken: nil, // TODO
					Precision: nil,
					Distance:  nil,
				},
			},
		}))
	} else if (e.currentState.Command.IsPrepare()) &&
		readyToContinue &&
		e.currentState.NextCommand != nil &&
		e.currentState.GetAutoContinue() {
		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_Continue{
				Continue: &statemachine.Continue{},
			},
		})
	} else if *e.currentState.Command.Type == state.Command_STOP &&
		readyToContinue &&
		e.currentState.NextCommand != nil &&
		e.currentState.GetAutoContinue() {
		if ballPlaced {
			e.Enqueue(&statemachine.Change{
				Origin: &changeOriginEngine,
				Change: &statemachine.Change_Continue{
					Continue: &statemachine.Continue{},
				},
			})
		} else {
			e.Enqueue(&statemachine.Change{
				Origin: &changeOriginEngine,
				Change: &statemachine.Change_StartBallPlacement{
					StartBallPlacement: &statemachine.StartBallPlacement{},
				},
			})
		}
	} else if e.currentState.Command.IsRunning() && lastProgressNum > 0 {
		lastProgress := lastProgressSum / lastProgressNum
		lastProgressS := lastProgress / 1000000
		lastProgressNs := (lastProgress - lastProgressS*1000000) * 1000
		lastProgressDt := e.timeProvider().Sub(time.Unix(int64(lastProgressS), int64(lastProgressNs)))
		if lastProgressDt > e.gameConfig.NoProgressTimeout[e.currentState.Division.Div()] {
			duration := float32(lastProgressDt.Seconds())
			e.Enqueue(createGameEventChange(state.GameEvent_NO_PROGRESS_IN_GAME, state.GameEvent{
				Event: &state.GameEvent_NoProgressInGame_{
					NoProgressInGame: &state.GameEvent_NoProgressInGame{
						Location: nil, // TODO required for ball placement
						Time:     &duration,
					},
				},
			}))
		}
	}
}

func createGameEventChange(eventType state.GameEvent_Type, event state.GameEvent) *statemachine.Change {
	event.Type = &eventType
	event.Origin = []string{changeOriginEngine}
	return &statemachine.Change{
		Origin: &changeOriginEngine,
		Change: &statemachine.Change_AddGameEvent{
			AddGameEvent: &statemachine.AddGameEvent{
				GameEvent: &event,
			},
		},
	}
}
