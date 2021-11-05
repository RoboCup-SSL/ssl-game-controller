package state

import (
	"testing"
)

func TestGameEvent_ByTeam(t *testing.T) {
	teamYellow := Team_YELLOW
	tests := []struct {
		name  string
		event isGameEvent_Event
		want  Team
	}{
		{
			name: "Event with ByTeam",
			event: &GameEvent_BallLeftFieldTouchLine{
				BallLeftFieldTouchLine: &GameEvent_BallLeftField{
					ByTeam: &teamYellow,
				},
			},
			want: Team_YELLOW,
		},
		{
			name:  "Nil event",
			event: nil,
			want:  Team_UNKNOWN,
		},
		{
			name: "Nil ByTeam",
			event: &GameEvent_BallLeftFieldTouchLine{
				BallLeftFieldTouchLine: &GameEvent_BallLeftField{
					ByTeam: nil,
				},
			},
			want: Team_UNKNOWN,
		},
		{
			name: "Event without ByTeam",
			event: &GameEvent_NoProgressInGame_{
				NoProgressInGame: &GameEvent_NoProgressInGame{},
			},
			want: Team_UNKNOWN,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			m := GameEvent{
				Event: tt.event,
			}
			if got := m.ByTeam(); got != tt.want {
				t.Errorf("ByTeam() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestGameEvent_SetByTeam(t *testing.T) {
	teamYellow := Team_YELLOW
	tests := []struct {
		name  string
		event isGameEvent_Event
		want  Team
	}{
		{
			name: "Event with ByTeam",
			event: &GameEvent_BallLeftFieldTouchLine{
				BallLeftFieldTouchLine: &GameEvent_BallLeftField{
					ByTeam: &teamYellow,
				},
			},
			want: Team_YELLOW,
		},
		{
			name:  "Nil event",
			event: nil,
			want:  Team_UNKNOWN,
		},
		{
			name: "Nil ByTeam",
			event: &GameEvent_BallLeftFieldTouchLine{
				BallLeftFieldTouchLine: &GameEvent_BallLeftField{
					ByTeam: nil,
				},
			},
			want: Team_UNKNOWN,
		},
		{
			name: "Event without ByTeam",
			event: &GameEvent_NoProgressInGame_{
				NoProgressInGame: &GameEvent_NoProgressInGame{},
			},
			want: Team_UNKNOWN,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			m := GameEvent{
				Event: tt.event,
			}
			m.SetByTeam(tt.want)
			if got := m.ByTeam(); got != tt.want {
				t.Errorf("ByTeam() = %v, want %v", got, tt.want)
			}
		})
	}
}
