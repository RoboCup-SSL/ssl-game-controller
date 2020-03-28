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

func AllGameEvents() (a []GameEvent_Type) {
	for t := range GameEvent_Type_name {
		a = append(a, GameEvent_Type(t))
	}
	return
}
