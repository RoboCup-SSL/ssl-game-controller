package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"reflect"
	"testing"
	"time"
)

func Test_updateMessage(t *testing.T) {
	s := state.NewState()
	c := statemachine.StateChange{
		State: &s,
		Change: statemachine.Change{
			ChangeType: statemachine.ChangeTypeTick,
		},
	}

	p := NewPublisher("")
	rs := p.GenerateRefereeMessages(c)
	if len(rs) != 1 {
		t.Errorf("Expected only one referee message, got: %v", rs)
	}
	r := rs[0]

	if *r.PacketTimestamp <= 0 {
		t.Errorf("Wrong packet timestamp: %v", *r.PacketTimestamp)
	}
	if *r.Stage != state.Referee_NORMAL_FIRST_HALF_PRE {
		t.Errorf("Wrong Stage: %v", *r.Stage)
	}
	if *r.StageTimeLeft != 0 {
		t.Errorf("Wrong StageTimeLeft: %v", *r.StageTimeLeft)
	}
	if *r.Command != state.Referee_HALT {
		t.Errorf("Wrong command: %v", *r.Command)
	}
	if *r.CommandCounter == 1 {
		t.Errorf("Wrong CommandCounter: %v", *r.CommandCounter)
	}
	if *r.CommandTimestamp != 0 {
		t.Errorf("Wrong CommandTimestamp: %v", *r.CommandTimestamp)
	}
	if *r.BlueTeamOnPositiveHalf {
		t.Errorf("Wrong half: %v", *r.BlueTeamOnPositiveHalf)
	}
	if r.Yellow == nil {
		t.Errorf("Missing Yellow")
	}
	if r.Blue == nil {
		t.Errorf("Missing Blue")
	}
}

func Test_mapTimes(t *testing.T) {
	type args struct {
		durations []time.Duration
	}
	tests := []struct {
		name string
		args args
		want []uint32
	}{
		{"zero", args{durations: []time.Duration{0}}, []uint32{0}},
		{"second", args{durations: []time.Duration{1 * time.Second}}, []uint32{1000000}},
		{"multiple", args{durations: []time.Duration{1 * time.Millisecond, 5 * time.Millisecond}}, []uint32{1000, 5000}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := mapTimes(tt.args.durations); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("mapTimes() = %v, want %v", got, tt.want)
			}
		})
	}
}
