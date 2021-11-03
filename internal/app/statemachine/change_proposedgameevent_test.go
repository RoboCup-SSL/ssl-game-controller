package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/timestamppb"
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
		groups   []*state.ProposalGroup
		proposal *state.Proposal
		timeout  time.Duration
	}

	now := time.Date(2020, 3, 10, 0, 0, 0, 0, time.UTC)
	dateNew := timestamppb.New(now.Add(time.Second))
	dateOld := timestamppb.New(now.Add(-time.Second))

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

	oneProp1 := &state.Proposal{
		Timestamp: dateNew,
		GameEvent: botTooFastOne,
	}
	oneProp1Old := &state.Proposal{
		Timestamp: dateOld,
		GameEvent: botTooFastOne,
	}
	oneProp2 := &state.Proposal{
		Timestamp: dateNew,
		GameEvent: ballLeftFieldOne,
	}
	twoProp1 := &state.Proposal{
		Timestamp: dateNew,
		GameEvent: botTooFastTwo,
	}
	oneProp3 := &state.Proposal{
		Timestamp: dateNew,
		GameEvent: botCrashDrawnOne,
	}
	twoProp3 := &state.Proposal{
		Timestamp: dateNew,
		GameEvent: botCrashDrawnTwo,
	}
	threeProp3 := &state.Proposal{
		Timestamp: dateNew,
		GameEvent: botCrashDrawnThree,
	}

	tests := []struct {
		name string
		args args
		want int
	}{
		{
			name: "Match by type",
			args: args{
				groups:   []*state.ProposalGroup{{Proposals: []*state.Proposal{oneProp1}}},
				proposal: twoProp1,
				timeout:  1,
			},
			want: 0,
		},
		{
			name: "Filter event after deadline",
			args: args{
				groups:   []*state.ProposalGroup{{Proposals: []*state.Proposal{oneProp1Old}}},
				proposal: oneProp1,
				timeout:  1,
			},
			want: -1,
		},
		{
			name: "Match larger group",
			args: args{
				groups: []*state.ProposalGroup{
					{Proposals: []*state.Proposal{oneProp1, twoProp1}},
					{Proposals: []*state.Proposal{oneProp2}},
					{Proposals: []*state.Proposal{oneProp3, twoProp3}},
				},
				proposal: threeProp3,
				timeout:  1,
			},
			want: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if _, gid := findGroup(tt.args.proposal, tt.args.groups, tt.args.timeout); tt.want != gid {
				t.Errorf("findGroup() = %v, want %v", gid, tt.want)
			}
		})
	}
}
