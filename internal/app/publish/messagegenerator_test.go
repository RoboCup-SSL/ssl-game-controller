package publish

import (
	"testing"

	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
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

func Test_nextCommand(t *testing.T) {
	tests := []struct {
		name                string
		command             *state.Command
		nextCommand         *state.Command
		expectedNextCommand *state.Referee_Command
	}{
		{
			name:                "stop with next kickoff",
			command:             state.NewCommandNeutral(state.Command_STOP),
			nextCommand:         state.NewCommand(state.Command_KICKOFF, state.Team_BLUE),
			expectedNextCommand: refereeCommand(state.Referee_PREPARE_KICKOFF_BLUE),
		},
		{
			name:                "prepare kickoff",
			command:             state.NewCommand(state.Command_KICKOFF, state.Team_BLUE),
			nextCommand:         state.NewCommand(state.Command_KICKOFF, state.Team_BLUE),
			expectedNextCommand: refereeCommand(state.Referee_NORMAL_START),
		},
		{
			name:                "prepare penalty",
			command:             state.NewCommand(state.Command_PENALTY, state.Team_YELLOW),
			nextCommand:         state.NewCommand(state.Command_PENALTY, state.Team_YELLOW),
			expectedNextCommand: refereeCommand(state.Referee_NORMAL_START),
		},
		{
			name:                "running without next command",
			command:             state.NewCommandNeutral(state.Command_NORMAL_START),
			nextCommand:         nil,
			expectedNextCommand: nil,
		},
	}

	g := NewMessageGenerator()
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := state.NewState()
			s.Command = tt.command
			s.NextCommand = tt.nextCommand

			r := g.StateToRefereeMessage(s)

			if tt.expectedNextCommand == nil {
				if r.NextCommand != nil {
					t.Errorf("Expected no next command, got: %v", *r.NextCommand)
				}
			} else if r.NextCommand == nil {
				t.Errorf("Expected next command %v, got none", *tt.expectedNextCommand)
			} else if *r.NextCommand != *tt.expectedNextCommand {
				t.Errorf("Expected next command %v, got: %v", *tt.expectedNextCommand, *r.NextCommand)
			}
		})
	}
}

func refereeCommand(c state.Referee_Command) *state.Referee_Command {
	return &c
}
