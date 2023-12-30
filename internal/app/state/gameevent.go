package state

import (
	"reflect"
)

// ByTeam extracts the `ByTeam` attribute from the game event details, if present
func (x *GameEvent) ByTeam() Team {
	if x.GetEvent() == nil {
		return Team_UNKNOWN
	}
	event := reflect.ValueOf(x.GetEvent())
	if event.Elem().NumField() == 0 {
		return Team_UNKNOWN
	}
	// all structs have a single field that we need to access
	v := event.Elem().Field(0)
	if !v.IsNil() {
		byTeamValue := v.Elem().FieldByName("ByTeam")
		if byTeamValue.IsValid() && !byTeamValue.IsNil() {
			return Team(byTeamValue.Elem().Int())
		}
	}
	return Team_UNKNOWN
}

// SetByTeam sets the value of the `ByTeam` attribute to the given value, if present and not nil
func (x *GameEvent) SetByTeam(team Team) {
	if x.GetEvent() == nil {
		return
	}
	event := reflect.ValueOf(x.GetEvent())
	if event.Elem().NumField() == 0 {
		return
	}
	// all structs have a single field that we need to access
	v := event.Elem().Field(0)
	if !v.IsNil() {
		byTeamValue := v.Elem().FieldByName("ByTeam")
		if byTeamValue.IsValid() && !byTeamValue.IsNil() {
			byTeamValue.Set(reflect.ValueOf(&team))
		}
	}
	return
}

// GameEventsForBehaviorConfig returns a list with all game event types that should have configurable behavior
func GameEventsForBehaviorConfig() (a []GameEvent_Type) {
	for t := range GameEvent_Type_name {
		eventType := GameEvent_Type(t)
		switch eventType {
		case
			GameEvent_BALL_LEFT_FIELD_TOUCH_LINE,
			GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
			GameEvent_AIMLESS_KICK,
			GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
			GameEvent_DEFENDER_IN_DEFENSE_AREA,
			GameEvent_BOUNDARY_CROSSING,
			GameEvent_KEEPER_HELD_BALL,
			GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
			GameEvent_BOT_PUSHED_BOT,
			GameEvent_BOT_HELD_BALL_DELIBERATELY,
			GameEvent_BOT_TIPPED_OVER,
			GameEvent_BOT_DROPPED_PARTS,
			GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
			GameEvent_BOT_KICKED_BALL_TOO_FAST,
			GameEvent_BOT_CRASH_UNIQUE,
			GameEvent_BOT_CRASH_DRAWN,
			GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT,
			GameEvent_BOT_TOO_FAST_IN_STOP,
			GameEvent_BOT_INTERFERED_PLACEMENT,
			GameEvent_POSSIBLE_GOAL,
			GameEvent_GOAL,
			GameEvent_INVALID_GOAL,
			GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL,
			GameEvent_PLACEMENT_SUCCEEDED,
			GameEvent_PENALTY_KICK_FAILED,
			GameEvent_NO_PROGRESS_IN_GAME,
			GameEvent_TOO_MANY_ROBOTS:
			a = append(a, eventType)
		default:
			// ignore
		}
	}
	return
}
