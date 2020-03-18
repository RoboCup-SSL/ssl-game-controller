package ballplace

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"math"
	"testing"
)

func Test_BallPlacementPos(t *testing.T) {

	geometry := config.DefaultControllerConfig().Game.DefaultGeometry[config.DivA]
	geometry.PlacementOffsetTouchLine = 0.2
	geometry.PlacementOffsetGoalLine = 0.3 // avoid confusion with touchLine value
	geometry.PlacementOffsetGoalLineGoalKick = 1.0
	fw := geometry.FieldWidth
	fl := geometry.FieldLength
	dd := geometry.DefenseAreaDepth
	dw := geometry.DefenseAreaWidth
	ot := geometry.PlacementOffsetTouchLine
	og := geometry.PlacementOffsetGoalLine
	ogg := geometry.PlacementOffsetGoalLineGoalKick
	od := geometry.PlacementOffsetDefenseArea

	placementPosDeterminer := BallPlacementPosDeterminer{
		Event:               nil,
		Geometry:            geometry,
		CurrentPlacementPos: nil,
		OnPositiveHalf: map[state.Team]bool{
			state.Team_BLUE:   false,
			state.Team_YELLOW: true,
		},
	}

	tests := []struct {
		name  string
		event *state.GameEvent
		want  state.Location
	}{
		// ball left field touch line
		{
			name:  "ball left field over touch line 1",
			event: createBallLeftFieldTouchLine(state.NewLocation64(0, fw/2)),
			want:  state.NewLocation64(0, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 2",
			event: createBallLeftFieldTouchLine(state.NewLocation64(0.1, fw/2)),
			want:  state.NewLocation64(0.1, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 3",
			event: createBallLeftFieldTouchLine(state.NewLocation64(0, 42)),
			want:  state.NewLocation64(0, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 4",
			event: createBallLeftFieldTouchLine(state.NewLocation64(0, 1)),
			want:  state.NewLocation64(0, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 5",
			event: createBallLeftFieldTouchLine(state.NewLocation64(0, -fw/2)),
			want:  state.NewLocation64(0, -(fw/2 - ot)),
		},
		{
			name:  "ball left field over touch line 6",
			event: createBallLeftFieldTouchLine(state.NewLocation64(fl/2, fw/2)),
			want:  state.NewLocation64(fl/2-og, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 7",
			event: createBallLeftFieldTouchLine(state.NewLocation64(-fl/2, fw/2)),
			want:  state.NewLocation64(-(fl/2 - og), fw/2-ot),
		},
		{
			name:  "ball left field over goal line 1",
			event: createBallLeftFieldGoalLine(state.NewLocation64(fl/2, fw/2), state.Team_YELLOW),
			want:  state.NewLocation64(fl/2-ogg, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 2",
			event: createBallLeftFieldGoalLine(state.NewLocation64(-fl/2, fw/2), state.Team_YELLOW),
			want:  state.NewLocation64(-(fl/2 - og), fw/2-ot),
		},
		{
			name:  "ball left field over goal line 3",
			event: createBallLeftFieldGoalLine(state.NewLocation64(fl/2, fw/4), state.Team_YELLOW),
			want:  state.NewLocation64(fl/2-ogg, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 4",
			event: createBallLeftFieldGoalLine(state.NewLocation64(fl/2, fw/4), state.Team_BLUE),
			want:  state.NewLocation64(fl/2-og, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 5",
			event: createBallLeftFieldGoalLine(state.NewLocation64(fl/2, 0), state.Team_BLUE),
			want:  state.NewLocation64(fl/2-og, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 6",
			event: createBallLeftFieldGoalLine(state.NewLocation64(fl/2, -fw), state.Team_BLUE),
			want:  state.NewLocation64(fl/2-og, -(fw/2 - ot)),
		},
		{
			name:  "bot crash unique 1",
			event: createBotCrashUnique(state.NewLocation64(0, 0)),
			want:  state.NewLocation64(0, 0),
		},
		{
			name:  "bot crash unique 2",
			event: createBotCrashUnique(state.NewLocation64(1, -2)),
			want:  state.NewLocation64(1, -2),
		},
		{
			name:  "bot crash unique 3",
			event: createBotCrashUnique(state.NewLocation64(1, -42)),
			want:  state.NewLocation64(1, -(fw/2 - ot)),
		},
		{
			name:  "bot crash unique 4",
			event: createBotCrashUnique(state.NewLocation64(1, 42)),
			want:  state.NewLocation64(1, fw/2-ot),
		},
		{
			name:  "bot crash unique 5",
			event: createBotCrashUnique(state.NewLocation64(fl/2, -42)),
			want:  state.NewLocation64(fl/2-og, -(fw/2 - ot)),
		},
		{
			name:  "bot crash unique 6",
			event: createBotCrashUnique(state.NewLocation64(-fl/2, -42)),
			want:  state.NewLocation64(-(fl/2 - og), -(fw/2 - ot)),
		},
		{
			name:  "bot crash unique 7",
			event: createBotCrashUnique(state.NewLocation64(42, 0)),
			want:  state.NewLocation64(fl/2-dd-od, 0),
		},
		{
			name:  "bot crash unique 8",
			event: createBotCrashUnique(state.NewLocation64(fl/2-0.1, dw/2-0.1)),
			want:  state.NewLocation64(fl/2-og, dw/2+od),
		},
		{
			name:  "bot crash unique 9",
			event: createBotCrashUnique(state.NewLocation64(fl/2-dd, dw/2-0.1)),
			want:  state.NewLocation64(fl/2-dd-od, dw/2-0.1),
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			placementPosDeterminer.Event = test.event
			location := placementPosDeterminer.Location()
			if location == nil {
				t.Errorf("Expected placement pos to be %v, but was nil", test.want)
			} else if !similar(test.want, *location) {
				t.Errorf("Expected placement pos to be %v, but was %v", test.want.StringPretty(), location.StringPretty())
			}
		})
	}
}

func createBallLeftFieldTouchLine(eventLocation state.Location) *state.GameEvent {
	var byTeam = state.Team_YELLOW
	eventType := state.GameEventType_BALL_LEFT_FIELD_TOUCH_LINE
	return &state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BallLeftFieldTouchLine{
			BallLeftFieldTouchLine: &state.GameEvent_BallLeftField{
				ByTeam:   &byTeam,
				Location: &eventLocation,
			},
		},
	}
}

func createBallLeftFieldGoalLine(eventLocation state.Location, placingTeam state.Team) *state.GameEvent {
	var byTeam = placingTeam.Opposite()
	eventType := state.GameEventType_BALL_LEFT_FIELD_GOAL_LINE
	return &state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BallLeftFieldGoalLine{
			BallLeftFieldGoalLine: &state.GameEvent_BallLeftField{
				ByTeam:   &byTeam,
				Location: &eventLocation,
			},
		},
	}
}
func createBotCrashUnique(eventLocation state.Location) *state.GameEvent {
	var byTeam = state.Team_YELLOW
	eventType := state.GameEventType_BOT_CRASH_UNIQUE
	return &state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BotCrashUnique_{
			BotCrashUnique: &state.GameEvent_BotCrashUnique{
				ByTeam:   &byTeam,
				Location: &eventLocation,
			},
		},
	}
}

func similar(l1 state.Location, l2 state.Location) bool {
	return math.Abs(float64(*l1.X-*l2.X)) < 1e-4 && math.Abs(float64(*l1.Y-*l2.Y)) < 1e-4
}
