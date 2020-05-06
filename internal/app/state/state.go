package state

import (
	"github.com/golang/protobuf/jsonpb"
	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/ptypes/duration"
	"github.com/golang/protobuf/ptypes/timestamp"
)

// NewState creates a new state, initialized for the start of a new game
func NewState() (s *State) {
	s = new(State)
	s.Stage = new(Referee_Stage)
	s.Command = NewCommandNeutral(Command_HALT)
	s.GameState = NewGameStateNeutral(GameState_HALT)
	s.StageTimeElapsed = new(duration.Duration)
	s.StageTimeLeft = new(duration.Duration)
	s.MatchTimeStart = new(timestamp.Timestamp)
	s.CurrentActionTimeRemaining = new(duration.Duration)
	s.Division = new(Division)
	s.AutoContinue = new(bool)
	s.FirstKickoffTeam = new(Team)

	*s.Stage = Referee_NORMAL_FIRST_HALF_PRE

	s.TeamState = map[string]*TeamInfo{}
	s.TeamState[Team_YELLOW.String()] = newTeamInfo()
	s.TeamState[Team_BLUE.String()] = newTeamInfo()
	*s.TeamState[Team_YELLOW.String()].OnPositiveHalf = !*s.TeamState[Team_BLUE.String()].OnPositiveHalf

	*s.Division = Division_DIV_A
	*s.FirstKickoffTeam = Team_YELLOW
	*s.AutoContinue = true

	return
}

func (m *State) Clone() *State {
	s := new(State)
	proto.Merge(s, m)
	return s
}

// TeamInfo returns the team info for the given team
func (m *State) TeamInfo(team Team) *TeamInfo {
	return m.TeamState[team.String()]
}

// TeamByName returns the team for the given team name
func (m *State) TeamByName(name string) Team {
	for teamColor, teamInfo := range m.TeamState {
		if *teamInfo.Name == name {
			return Team(Team_value[teamColor])
		}
	}
	return Team_UNKNOWN
}

func (m *State) StringJson() string {
	marshaler := jsonpb.Marshaler{}
	if str, err := marshaler.MarshalToString(m); err != nil {
		return err.Error()
	} else {
		return str
	}
}
