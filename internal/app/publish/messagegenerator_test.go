package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"testing"
)

func Test_generateMessages(t *testing.T) {
	s := state.NewState()
	hookOut := engine.HookOut{
		State: s,
		Change: &statemachine.Change{
			Change: &statemachine.Change_YellowCardOverChange{
				YellowCardOverChange: &statemachine.Change_YellowCardOver{},
			},
		},
	}

	g := NewMessageGenerator()
	rs := g.GenerateRefereeMessages(hookOut)
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
