package state

import (
	"reflect"
)

// ByTeam extracts the `ByTeam` attribute from the game event details, if present
func (m GameEvent) ByTeam() Team {
	if m.GetEvent() == nil {
		return Team_UNKNOWN
	}
	event := reflect.ValueOf(m.GetEvent())
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
func (m GameEvent) SetByTeam(team Team) {
	if m.GetEvent() == nil {
		return
	}
	event := reflect.ValueOf(m.GetEvent())
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

// AllGameEvents returns a list with all known game event types
func AllGameEvents() (a []GameEvent_Type) {
	for t := range GameEvent_Type_name {
		eventType := GameEvent_Type(t)
		switch eventType {
		case GameEvent_UNKNOWN_GAME_EVENT_TYPE,
			GameEvent_PREPARED,
			GameEvent_INDIRECT_GOAL,
			GameEvent_CHIPPED_GOAL,
			GameEvent_KICK_TIMEOUT,
			GameEvent_ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA,
			GameEvent_ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED,
			GameEvent_BOT_CRASH_UNIQUE_SKIPPED,
			GameEvent_BOT_PUSHED_BOT_SKIPPED,
			GameEvent_DEFENDER_IN_DEFENSE_AREA_PARTIALLY,
			GameEvent_MULTIPLE_PLACEMENT_FAILURES:
			// ignore
		default:
			a = append(a, eventType)
		}
	}
	return
}
