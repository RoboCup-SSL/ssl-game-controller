package state

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"reflect"
)

// ByTeam extracts the `ByTeam` attribute from the game event details
func (e GameEvent) ByTeam() Team {
	v := reflect.ValueOf(e.Event)
	for i := 0; i < v.NumField(); i++ {
		if !v.Field(i).IsNil() {
			byTeamValue := v.Field(i).Elem().FieldByName("ByTeam")
			if byTeamValue.IsValid() && !byTeamValue.IsNil() {
				return Team(refproto.Team(byTeamValue.Elem().Int()))
			}
		}
	}
	return Team_UNKNOWN
}
