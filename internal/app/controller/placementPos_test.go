package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"math"
	"testing"
)

func TestEngine_BallPlacementPos(t *testing.T) {
	cfg := config.DefaultControllerConfig().Game
	engine := NewEngine(cfg, 0)
	engine.State.TeamState[TeamYellow].OnPositiveHalf = true
	engine.State.TeamState[TeamBlue].OnPositiveHalf = false
	engine.Geometry.PlacementOffsetTouchLine = 0.2
	engine.Geometry.PlacementOffsetGoalLine = 0.3 // avoid confusion with touchLine value
	engine.Geometry.PlacementOffsetGoalLineGoalKick = 1.0
	fw := engine.Geometry.FieldWidth
	fl := engine.Geometry.FieldLength
	dd := engine.Geometry.DefenseAreaDepth
	dw := engine.Geometry.DefenseAreaWidth
	ot := engine.Geometry.PlacementOffsetTouchLine
	og := engine.Geometry.PlacementOffsetGoalLine
	ogg := engine.Geometry.PlacementOffsetGoalLineGoalKick
	od := engine.Geometry.PlacementOffsetDefenseArea

	// ball left field touch line
	setBallLeftFieldTouchLine(&engine, Location{0, fw / 2}.toProto())
	assertSimilar(t, &engine, Location{0, fw/2 - ot})

	setBallLeftFieldTouchLine(&engine, Location{0.1, fw / 2}.toProto())
	assertSimilar(t, &engine, Location{0.1, fw/2 - ot})

	setBallLeftFieldTouchLine(&engine, Location{0, 42}.toProto())
	assertSimilar(t, &engine, Location{0, fw/2 - ot})

	setBallLeftFieldTouchLine(&engine, Location{0, 1}.toProto())
	assertSimilar(t, &engine, Location{0, fw/2 - ot})

	setBallLeftFieldTouchLine(&engine, Location{0, -fw / 2}.toProto())
	assertSimilar(t, &engine, Location{0, -(fw/2 - ot)})

	setBallLeftFieldTouchLine(&engine, Location{fl / 2, fw / 2}.toProto())
	assertSimilar(t, &engine, Location{fl/2 - og, fw/2 - ot})

	setBallLeftFieldTouchLine(&engine, Location{-fl / 2, fw / 2}.toProto())
	assertSimilar(t, &engine, Location{-(fl/2 - og), fw/2 - ot})

	// ball left field goal line
	setBallLeftFieldGoalLine(&engine, Location{fl / 2, fw / 2}.toProto(), TeamYellow)
	assertSimilar(t, &engine, Location{fl/2 - ogg, fw/2 - ot})

	setBallLeftFieldGoalLine(&engine, Location{-fl / 2, fw / 2}.toProto(), TeamYellow)
	assertSimilar(t, &engine, Location{-(fl/2 - og), fw/2 - ot})

	setBallLeftFieldGoalLine(&engine, Location{fl / 2, fw / 4}.toProto(), TeamYellow)
	assertSimilar(t, &engine, Location{fl/2 - ogg, fw/2 - ot})

	setBallLeftFieldGoalLine(&engine, Location{fl / 2, fw / 4}.toProto(), TeamBlue)
	assertSimilar(t, &engine, Location{fl/2 - og, fw/2 - ot})

	setBallLeftFieldGoalLine(&engine, Location{fl / 2, 0}.toProto(), TeamBlue)
	assertSimilar(t, &engine, Location{fl/2 - og, fw/2 - ot})

	setBallLeftFieldGoalLine(&engine, Location{fl / 2, -fw}.toProto(), TeamBlue)
	assertSimilar(t, &engine, Location{fl/2 - og, -(fw/2 - ot)})

	// bot crash unique
	setBotCrashUnique(&engine, Location{0, 0}.toProto())
	assertSimilar(t, &engine, Location{0, 0})

	setBotCrashUnique(&engine, Location{1, -2}.toProto())
	assertSimilar(t, &engine, Location{1, -2})

	setBotCrashUnique(&engine, Location{1, -42}.toProto())
	assertSimilar(t, &engine, Location{1, -(fw/2 - ot)})

	setBotCrashUnique(&engine, Location{1, 42}.toProto())
	assertSimilar(t, &engine, Location{1, fw/2 - ot})

	setBotCrashUnique(&engine, Location{fl / 2, -42}.toProto())
	assertSimilar(t, &engine, Location{fl/2 - og, -(fw/2 - ot)})

	setBotCrashUnique(&engine, Location{-fl / 2, -42}.toProto())
	assertSimilar(t, &engine, Location{-(fl/2 - og), -(fw/2 - ot)})

	setBotCrashUnique(&engine, Location{42, 0}.toProto())
	assertSimilar(t, &engine, Location{fl/2 - dd - od, 0})

	setBotCrashUnique(&engine, Location{fl/2 - 0.1, dw/2 - 0.1}.toProto())
	assertSimilar(t, &engine, Location{fl/2 - og, dw/2 + od})

	setBotCrashUnique(&engine, Location{fl/2 - dd, dw/2 - 0.1}.toProto())
	assertSimilar(t, &engine, Location{fl/2 - dd - od, dw/2 - 0.1})
}

func assertSimilar(t *testing.T, engine *Engine, expected Location) {
	placementPos := engine.BallPlacementPos()
	if placementPos == nil {
		t.Fatalf("Expected placement pos to be %v, but was nil", expected)
	} else if !similar(expected, *placementPos) {
		t.Fatalf("Expected placement pos to be %v, but was %v", expected, *placementPos)
	}
}

func setBallLeftFieldTouchLine(engine *Engine, eventLocation *refproto.Location) {
	var byTeam = TeamYellow.toProto()
	engine.State.GameEvents = []*GameEvent{{
		Type: GameEventBallLeftFieldTouchLine,
		Details: GameEventDetails{
			BallLeftFieldTouchLine: &refproto.GameEvent_BallLeftField{
				ByTeam:   &byTeam,
				Location: eventLocation}}}}
}

func setBallLeftFieldGoalLine(engine *Engine, eventLocation *refproto.Location, placingTeam Team) {
	var byTeam = placingTeam.Opposite().toProto()
	engine.State.GameEvents = []*GameEvent{{
		Type: GameEventBallLeftFieldGoalLine,
		Details: GameEventDetails{
			BallLeftFieldGoalLine: &refproto.GameEvent_BallLeftField{
				ByTeam:   &byTeam,
				Location: eventLocation}}}}
}

func setBotCrashUnique(engine *Engine, eventLocation *refproto.Location) {
	var byTeam = TeamYellow.toProto()
	engine.State.GameEvents = []*GameEvent{{
		Type: GameEventBotCrashUnique,
		Details: GameEventDetails{
			BotCrashUnique: &refproto.GameEvent_BotCrashUnique{
				ByTeam:   &byTeam,
				Location: eventLocation}}}}
}

func similar(l1 Location, l2 Location) bool {
	return math.Abs(l1.X-l2.X) < 1e-4 && math.Abs(l1.Y-l2.Y) < 1e-4
}
