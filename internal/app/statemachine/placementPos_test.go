package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
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
		want  *geom.Vector2
	}{
		// ball left field touch line
		{
			name:  "ball left field over touch line 1",
			event: createBallLeftFieldTouchLine(geom.NewVector2(0, fw/2)),
			want:  geom.NewVector2(0, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 2",
			event: createBallLeftFieldTouchLine(geom.NewVector2(0.1, fw/2)),
			want:  geom.NewVector2(0.1, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 3",
			event: createBallLeftFieldTouchLine(geom.NewVector2(0, 42)),
			want:  geom.NewVector2(0, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 4",
			event: createBallLeftFieldTouchLine(geom.NewVector2(0, 1)),
			want:  geom.NewVector2(0, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 5",
			event: createBallLeftFieldTouchLine(geom.NewVector2(0, -fw/2)),
			want:  geom.NewVector2(0, -(fw/2 - ot)),
		},
		{
			name:  "ball left field over touch line 6",
			event: createBallLeftFieldTouchLine(geom.NewVector2(fl/2, fw/2)),
			want:  geom.NewVector2(fl/2-og, fw/2-ot),
		},
		{
			name:  "ball left field over touch line 7",
			event: createBallLeftFieldTouchLine(geom.NewVector2(-fl/2, fw/2)),
			want:  geom.NewVector2(-(fl/2 - og), fw/2-ot),
		},
		{
			name:  "ball left field over goal line 1",
			event: createBallLeftFieldGoalLine(geom.NewVector2(fl/2, fw/2), state.Team_YELLOW),
			want:  geom.NewVector2(fl/2-ogg, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 2",
			event: createBallLeftFieldGoalLine(geom.NewVector2(-fl/2, fw/2), state.Team_YELLOW),
			want:  geom.NewVector2(-(fl/2 - og), fw/2-ot),
		},
		{
			name:  "ball left field over goal line 3",
			event: createBallLeftFieldGoalLine(geom.NewVector2(fl/2, fw/4), state.Team_YELLOW),
			want:  geom.NewVector2(fl/2-ogg, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 4",
			event: createBallLeftFieldGoalLine(geom.NewVector2(fl/2, fw/4), state.Team_BLUE),
			want:  geom.NewVector2(fl/2-og, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 5",
			event: createBallLeftFieldGoalLine(geom.NewVector2(fl/2, 0), state.Team_BLUE),
			want:  geom.NewVector2(fl/2-og, fw/2-ot),
		},
		{
			name:  "ball left field over goal line 6",
			event: createBallLeftFieldGoalLine(geom.NewVector2(fl/2, -fw), state.Team_BLUE),
			want:  geom.NewVector2(fl/2-og, -(fw/2 - ot)),
		},
		{
			name:  "bot dribbled too far 1",
			event: createBotDribbledTooFarEvent(geom.NewVector2(0, 0)),
			want:  geom.NewVector2(0, 0),
		},
		{
			name:  "bot dribbled too far 2",
			event: createBotDribbledTooFarEvent(geom.NewVector2(1, -2)),
			want:  geom.NewVector2(1, -2),
		},
		{
			name:  "bot dribbled too far 3",
			event: createBotDribbledTooFarEvent(geom.NewVector2(1, -42)),
			want:  geom.NewVector2(1, -(fw/2 - ot)),
		},
		{
			name:  "bot dribbled too far 4",
			event: createBotDribbledTooFarEvent(geom.NewVector2(1, 42)),
			want:  geom.NewVector2(1, fw/2-ot),
		},
		{
			name:  "bot dribbled too far 5",
			event: createBotDribbledTooFarEvent(geom.NewVector2(fl/2, -42)),
			want:  geom.NewVector2(fl/2-og, -(fw/2 - ot)),
		},
		{
			name:  "bot dribbled too far 6",
			event: createBotDribbledTooFarEvent(geom.NewVector2(-fl/2, -42)),
			want:  geom.NewVector2(-(fl/2 - og), -(fw/2 - ot)),
		},
		{
			name:  "bot dribbled too far 7",
			event: createBotDribbledTooFarEvent(geom.NewVector2(42, 0)),
			want:  geom.NewVector2(fl/2-dd-od, 0),
		},
		{
			name:  "bot dribbled too far 8",
			event: createBotDribbledTooFarEvent(geom.NewVector2(fl/2-0.1, dw/2-0.1)),
			want:  geom.NewVector2(fl/2-og, dw/2+od),
		},
		{
			name:  "bot dribbled too far 9",
			event: createBotDribbledTooFarEvent(geom.NewVector2(fl/2-dd, dw/2-0.1)),
			want:  geom.NewVector2(fl/2-dd-od, dw/2-0.1),
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			placementPosDeterminer.Event = test.event
			location := placementPosDeterminer.Location()
			if location == nil {
				t.Errorf("Expected placement pos to be %v, but was nil", test.want)
			} else if !similar(test.want, location) {
				t.Errorf("Expected placement pos to be %v, but was %v", test.want.StringPretty(), location.StringPretty())
			}
		})
	}
}

func createBallLeftFieldTouchLine(eventLocation *geom.Vector2) *state.GameEvent {
	var byTeam = state.Team_YELLOW
	eventType := state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE
	return &state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BallLeftFieldTouchLine{
			BallLeftFieldTouchLine: &state.GameEvent_BallLeftField{
				ByTeam:   &byTeam,
				Location: eventLocation,
			},
		},
	}
}

func createBallLeftFieldGoalLine(eventLocation *geom.Vector2, placingTeam state.Team) *state.GameEvent {
	var byTeam = placingTeam.Opposite()
	eventType := state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE
	return &state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BallLeftFieldGoalLine{
			BallLeftFieldGoalLine: &state.GameEvent_BallLeftField{
				ByTeam:   &byTeam,
				Location: eventLocation,
			},
		},
	}
}
func createBotDribbledTooFarEvent(eventLocation *geom.Vector2) *state.GameEvent {
	var byTeam = state.Team_YELLOW
	eventType := state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR
	return &state.GameEvent{
		Type: &eventType,
		Event: &state.GameEvent_BotDribbledBallTooFar_{
			BotDribbledBallTooFar: &state.GameEvent_BotDribbledBallTooFar{
				ByTeam: &byTeam,
				Start:  eventLocation,
			},
		},
	}
}

func similar(l1 *geom.Vector2, l2 *geom.Vector2) bool {
	return math.Abs(l1.GetX64()-l2.GetX64()) < 1e-4 && math.Abs(l1.GetY64()-l2.GetY64()) < 1e-4
}
