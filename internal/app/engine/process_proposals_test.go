package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
	"reflect"
	"testing"
	"time"
)

func Test_gameEventsSimilar(t *testing.T) {
	type args struct {
		e1 *state.GameEvent
		e2 *state.GameEvent
	}

	yellow := state.Team_YELLOW
	blue := state.Team_BLUE
	bot := uint32(1)
	otherBot := uint32(2)
	location := geom.NewVector2(1, 1)
	locationOther := geom.NewVector2(1, 3)
	botTooFastType := state.GameEvent_BOT_TOO_FAST_IN_STOP
	botTooFast := &state.GameEvent{
		Type: &botTooFastType,
		Event: &state.GameEvent_BotTooFastInStop_{
			BotTooFastInStop: &state.GameEvent_BotTooFastInStop{
				ByTeam: &yellow,
				ByBot:  &bot,
			},
		},
	}
	botTooFastOtherBot := &state.GameEvent{
		Type: &botTooFastType,
		Event: &state.GameEvent_BotTooFastInStop_{
			BotTooFastInStop: &state.GameEvent_BotTooFastInStop{
				ByTeam: &yellow,
				ByBot:  &otherBot,
			},
		},
	}
	ballLeftFieldType := state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE
	ballLeftField := &state.GameEvent{
		Type: &ballLeftFieldType,
		Event: &state.GameEvent_BallLeftFieldTouchLine{
			BallLeftFieldTouchLine: &state.GameEvent_BallLeftField{
				ByTeam: &blue,
				ByBot:  &bot,
			},
		},
	}
	botCrashDrawnType := state.GameEvent_BOT_CRASH_DRAWN
	botCrashDrawn := &state.GameEvent{
		Type: &botCrashDrawnType,
		Event: &state.GameEvent_BotCrashDrawn_{
			BotCrashDrawn: &state.GameEvent_BotCrashDrawn{
				BotYellow: &bot,
				BotBlue:   &otherBot,
				Location:  location,
			},
		},
	}
	botCrashDrawnOther := &state.GameEvent{
		Type: &botCrashDrawnType,
		Event: &state.GameEvent_BotCrashDrawn_{
			BotCrashDrawn: &state.GameEvent_BotCrashDrawn{
				BotYellow: &bot,
				BotBlue:   &otherBot,
				Location:  locationOther,
			},
		},
	}

	tests := []struct {
		name string
		args args
		want bool
	}{
		{
			name: "Same events with team and bot",
			args: args{e1: botTooFast, e2: botTooFast},
			want: true,
		},
		{
			name: "Same events type only",
			args: args{e1: ballLeftField, e2: ballLeftField},
			want: true,
		},
		{
			name: "Different events",
			args: args{e1: botTooFast, e2: ballLeftField},
			want: false,
		},
		{
			name: "Same events with different bot",
			args: args{e1: botTooFast, e2: botTooFastOtherBot},
			want: false,
		},
		{
			name: "Same events with location",
			args: args{e1: botCrashDrawn, e2: botCrashDrawn},
			want: true,
		},
		{
			name: "Same events with different location",
			args: args{e1: botCrashDrawn, e2: botCrashDrawnOther},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := gameEventsSimilar(tt.args.e1, tt.args.e2); got != tt.want {
				t.Errorf("gameEventsSimilar() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_collectMatchingProposals(t *testing.T) {
	type args struct {
		events []*state.GameEventProposal
	}

	deadline := time.Date(2020, 3, 10, 0, 0, 0, 0, time.UTC)
	dateBefore, _ := ptypes.TimestampProto(deadline.Add(-time.Second))
	dateAfter, _ := ptypes.TimestampProto(deadline.Add(time.Second))

	botTooFastType := state.GameEvent_BOT_TOO_FAST_IN_STOP
	botTooFastOne := &state.GameEvent{
		Type:   &botTooFastType,
		Origin: []string{"One"},
		Event: &state.GameEvent_BotTooFastInStop_{
			BotTooFastInStop: &state.GameEvent_BotTooFastInStop{},
		},
	}
	botTooFastTwo := &state.GameEvent{
		Type:   &botTooFastType,
		Origin: []string{"Two"},
		Event: &state.GameEvent_BotTooFastInStop_{
			BotTooFastInStop: &state.GameEvent_BotTooFastInStop{},
		},
	}
	ballLeftFieldType := state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE
	ballLeftFieldOne := &state.GameEvent{
		Type:   &ballLeftFieldType,
		Origin: []string{"One"},
		Event: &state.GameEvent_BallLeftFieldTouchLine{
			BallLeftFieldTouchLine: &state.GameEvent_BallLeftField{},
		},
	}
	botCrashDrawnType := state.GameEvent_BOT_CRASH_DRAWN
	botCrashDrawnOne := &state.GameEvent{
		Type:   &botCrashDrawnType,
		Origin: []string{"One"},
		Event: &state.GameEvent_BotCrashDrawn_{
			BotCrashDrawn: &state.GameEvent_BotCrashDrawn{},
		},
	}
	botCrashDrawnTwo := &state.GameEvent{
		Type:   &botCrashDrawnType,
		Origin: []string{"Two"},
		Event: &state.GameEvent_BotCrashDrawn_{
			BotCrashDrawn: &state.GameEvent_BotCrashDrawn{},
		},
	}
	botCrashDrawnThree := &state.GameEvent{
		Type:   &botCrashDrawnType,
		Origin: []string{"Three"},
		Event: &state.GameEvent_BotCrashDrawn_{
			BotCrashDrawn: &state.GameEvent_BotCrashDrawn{},
		},
	}

	oneProp1 := &state.GameEventProposal{
		Timestamp: dateBefore,
		GameEvent: botTooFastOne,
	}
	oneProp1Old := &state.GameEventProposal{
		Timestamp: dateAfter,
		GameEvent: botTooFastOne,
	}
	oneProp2 := &state.GameEventProposal{
		Timestamp: dateBefore,
		GameEvent: ballLeftFieldOne,
	}
	twoProp1 := &state.GameEventProposal{
		Timestamp: dateBefore,
		GameEvent: botTooFastTwo,
	}
	oneProp3 := &state.GameEventProposal{
		Timestamp: dateBefore,
		GameEvent: botCrashDrawnOne,
	}
	twoProp3 := &state.GameEventProposal{
		Timestamp: dateBefore,
		GameEvent: botCrashDrawnTwo,
	}
	threeProp3 := &state.GameEventProposal{
		Timestamp: dateBefore,
		GameEvent: botCrashDrawnThree,
	}

	tests := []struct {
		name string
		args args
		want []*state.GameEventProposal
	}{
		{
			name: "Match by type",
			args: args{
				events: []*state.GameEventProposal{oneProp1, oneProp2, twoProp1},
			},
			want: []*state.GameEventProposal{oneProp1, twoProp1},
		},
		{
			name: "Filter event after deadline",
			args: args{
				events: []*state.GameEventProposal{oneProp1, twoProp1, oneProp1Old},
			},
			want: []*state.GameEventProposal{oneProp1, twoProp1},
		},
		{
			name: "Match larger group",
			args: args{
				events: []*state.GameEventProposal{oneProp1, twoProp1, oneProp2, oneProp3, twoProp3, threeProp3},
			},
			want: []*state.GameEventProposal{oneProp3, twoProp3, threeProp3},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := collectMatchingProposals(tt.args.events, deadline); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("collectMatchingProposals() = %v, want %v", got, tt.want)
			}
		})
	}
}
