package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"reflect"
	"testing"
	"time"
)

func Test_updateMessage(t *testing.T) {
	s := state.NewState()

	p := NewPublisher("")
	p.update(&s)

	if *p.ProtoMsg.PacketTimestamp <= 0 {
		t.Errorf("Wrong packet timestamp: %v", *p.ProtoMsg.PacketTimestamp)
	}
	if *p.ProtoMsg.Stage != state.Referee_NORMAL_FIRST_HALF_PRE {
		t.Errorf("Wrong Stage: %v", *p.ProtoMsg.Stage)
	}
	if *p.ProtoMsg.StageTimeLeft != 0 {
		t.Errorf("Wrong StageTimeLeft: %v", *p.ProtoMsg.StageTimeLeft)
	}
	if *p.ProtoMsg.Command != state.Referee_HALT {
		t.Errorf("Wrong command: %v", *p.ProtoMsg.Command)
	}
	if *p.ProtoMsg.CommandCounter == 1 {
		t.Errorf("Wrong CommandCounter: %v", *p.ProtoMsg.CommandCounter)
	}
	if *p.ProtoMsg.CommandTimestamp != 0 {
		t.Errorf("Wrong CommandTimestamp: %v", *p.ProtoMsg.CommandTimestamp)
	}
	if *p.ProtoMsg.BlueTeamOnPositiveHalf {
		t.Errorf("Wrong half: %v", *p.ProtoMsg.BlueTeamOnPositiveHalf)
	}
	if p.ProtoMsg.Yellow == nil {
		t.Errorf("Missing Yellow")
	}
	if p.ProtoMsg.Blue == nil {
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
