package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"reflect"
	"testing"
)

func Test_mergeGameEventData(t *testing.T) {
	type args struct {
		event         *state.GameEvent
		expectedEvent *state.GameEvent
		events        []*state.GameEvent
	}
	ballTooFastEventType := state.GameEvent_BOT_KICKED_BALL_TOO_FAST
	byTeam := state.Team_YELLOW
	chipped := true
	notChipped := false
	ballSpeed2 := float32(2)
	ballSpeed3 := float32(3)
	ballSpeed4 := float32(4)

	tests := []struct {
		name string
		args args
	}{
		{"Two different",
			args{
				event: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam: &byTeam,
						},
					},
				},
				expectedEvent: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam:           &byTeam,
							Chipped:          &notChipped,
							InitialBallSpeed: &ballSpeed3,
						},
					},
				},
				events: []*state.GameEvent{
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed2,
							},
						},
					},
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &notChipped,
								InitialBallSpeed: &ballSpeed4,
							},
						},
					},
				},
			},
		},
		{"Only one",
			args{
				event: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam: &byTeam,
						},
					},
				},
				expectedEvent: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam:           &byTeam,
							Chipped:          &chipped,
							InitialBallSpeed: &ballSpeed2,
						},
					},
				},
				events: []*state.GameEvent{
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed2,
							},
						},
					},
				},
			},
		},
		{"Two equal",
			args{
				event: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam: &byTeam,
						},
					},
				},
				expectedEvent: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam:           &byTeam,
							Chipped:          &chipped,
							InitialBallSpeed: &ballSpeed2,
						},
					},
				},
				events: []*state.GameEvent{
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed2,
							},
						},
					},
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed2,
							},
						},
					},
				},
			},
		},
		{"Three events",
			args{
				event: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam: &byTeam,
						},
					},
				},
				expectedEvent: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam:           &byTeam,
							Chipped:          &chipped,
							InitialBallSpeed: &ballSpeed3,
						},
					},
				},
				events: []*state.GameEvent{
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed2,
							},
						},
					},
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed3,
							},
						},
					},
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &notChipped,
								InitialBallSpeed: &ballSpeed4,
							},
						},
					},
				},
			},
		},
		{"One with, one without data",
			args{
				event: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam: &byTeam,
						},
					},
				},
				expectedEvent: &state.GameEvent{
					Type: &ballTooFastEventType,
					Event: &state.GameEvent_BotKickedBallTooFast_{
						BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
							ByTeam:           &byTeam,
							Chipped:          &chipped,
							InitialBallSpeed: &ballSpeed2,
						},
					},
				},
				events: []*state.GameEvent{
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam:           &byTeam,
								Chipped:          &chipped,
								InitialBallSpeed: &ballSpeed2,
							},
						},
					},
					{
						Type: &ballTooFastEventType,
						Event: &state.GameEvent_BotKickedBallTooFast_{
							BotKickedBallTooFast: &state.GameEvent_BotKickedBallTooFast{
								ByTeam: &byTeam,
							},
						},
					},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mergeGameEventData(tt.args.event, tt.args.events)
			if !reflect.DeepEqual(tt.args.event, tt.args.expectedEvent) {
				t.Fatalf("Events are not equal:\nresult:\n%v\nexpected:\n%v", tt.args.event, tt.args.expectedEvent)
			}
		})
	}
}
