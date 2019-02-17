package controller

import (
	"reflect"
	"testing"
	"time"

	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
)

func Test_updateMessage(t *testing.T) {
	state := NewState()

	r := &RefMessage{Send: func() {}, ProtoMsg: new(refproto.Referee)}
	referee := r.ProtoMsg
	initRefereeMessage(referee)
	r.Publish(state)

	if *referee.PacketTimestamp <= 0 {
		t.Errorf("Wrong packet timestamp: %v", *referee.PacketTimestamp)
	}
	if *referee.Stage != refproto.Referee_NORMAL_FIRST_HALF_PRE {
		t.Errorf("Wrong Stage: %v", *referee.Stage)
	}
	if *referee.StageTimeLeft != 0 {
		t.Errorf("Wrong StageTimeLeft: %v", *referee.StageTimeLeft)
	}
	if *referee.Command != refproto.Referee_HALT {
		t.Errorf("Wrong command: %v", *referee.Command)
	}
	if *referee.CommandCounter == 1 {
		t.Errorf("Wrong CommandCounter: %v", *referee.CommandCounter)
	}
	if *referee.CommandTimestamp != 0 {
		t.Errorf("Wrong CommandTimestamp: %v", *referee.CommandTimestamp)
	}
	if *referee.BlueTeamOnPositiveHalf {
		t.Errorf("Wrong half: %v", *referee.BlueTeamOnPositiveHalf)
	}
	if referee.Yellow == nil {
		t.Errorf("Missing Yellow")
	}
	if referee.Blue == nil {
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
