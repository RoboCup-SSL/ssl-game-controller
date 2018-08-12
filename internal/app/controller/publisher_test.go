package controller

import (
	"reflect"
	"testing"
	"time"

	"github.com/RoboCup-SSL/ssl-game-controller/pkg/proto"
)

func Test_updateMessage(t *testing.T) {
	proto := sslproto.SSL_Referee{}
	initRefereeMessage(&proto)
	state := NewState()
	team := TeamYellow
	command := EventCommand{ForTeam: &team, Type: CommandDirect}

	updateMessage(&proto, state, &command)

	if *proto.PacketTimestamp <= 0 {
		t.Errorf("Wrong packet timestamp: %v", *proto.PacketTimestamp)
	}
	if *proto.Stage != sslproto.SSL_Referee_NORMAL_FIRST_HALF_PRE {
		t.Errorf("Wrong Stage: %v", *proto.Stage)
	}
	if *proto.StageTimeLeft != 0 {
		t.Errorf("Wrong StageTimeLeft: %v", *proto.StageTimeLeft)
	}
	if *proto.Command != sslproto.SSL_Referee_DIRECT_FREE_YELLOW {
		t.Errorf("Wrong command: %v", *proto.Command)
	}
	if *proto.CommandCounter != 1 {
		t.Errorf("Wrong CommandCounter: %v", *proto.CommandCounter)
	}
	if *proto.CommandTimestamp <= 0 {
		t.Errorf("Wrong CommandTimestamp: %v", *proto.CommandTimestamp)
	}
	if *proto.BlueTeamOnPositiveHalf != false {
		t.Errorf("Wrong half: %v", *proto.BlueTeamOnPositiveHalf)
	}
	if proto.Yellow == nil {
		t.Errorf("Missing Yellow")
	}
	if proto.Blue == nil {
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
