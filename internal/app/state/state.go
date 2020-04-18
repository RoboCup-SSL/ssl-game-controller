package state

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/ptypes/duration"
	"github.com/golang/protobuf/ptypes/timestamp"
)

// NewState creates a new state, initialized for the start of a new game
func NewState() (s *State) {
	s = new(State)
	s.Stage = new(Referee_Stage)
	s.Command = NewCommandNeutral(Command_HALT)
	s.StageTimeElapsed = new(duration.Duration)
	s.StageTimeLeft = new(duration.Duration)
	s.MatchTimeStart = new(timestamp.Timestamp)
	s.CurrentActionTimeRemaining = new(duration.Duration)
	s.Division = new(State_Division)
	s.AutoContinue = new(bool)
	s.FirstKickoffTeam = new(Team)
	s.GameEventBehavior = map[string]State_GameEventBehavior{}

	*s.Stage = Referee_NORMAL_FIRST_HALF_PRE

	s.TeamState = map[string]*TeamInfo{}
	s.TeamState[Team_YELLOW.String()] = newTeamInfo()
	s.TeamState[Team_BLUE.String()] = newTeamInfo()
	*s.TeamState[Team_YELLOW.String()].OnPositiveHalf = !*s.TeamState[Team_BLUE.String()].OnPositiveHalf

	*s.Division = State_DIV_A
	*s.FirstKickoffTeam = Team_YELLOW
	*s.AutoContinue = true

	s.GameEventBehavior = map[string]State_GameEventBehavior{}
	for _, event := range AllGameEvents() {
		s.GameEventBehavior[event.String()] = State_GAME_EVENT_BEHAVIOR_ON
	}

	return
}

func (x *State) Clone() *State {
	s := new(State)
	proto.Merge(s, x)
	return s
}

// TeamInfo returns the team info for the given team
func (x *State) TeamInfo(team Team) *TeamInfo {
	return x.TeamState[team.String()]
}

// TeamByName returns the team for the given team name
func (x *State) TeamByName(name string) Team {
	for teamColor, teamInfo := range x.TeamState {
		if *teamInfo.Name == name {
			return Team(Team_value[teamColor])
		}
	}
	return Team_UNKNOWN
}

// Div converts the protobuf division into the config division
func (x *State_Division) Div() config.Division {
	return config.Division(x.String())
}

// ToDiv converts the config division into the protobuf division
func ToDiv(div config.Division) *State_Division {
	protoDiv := State_Division(State_Division_value[string(div)])
	return &protoDiv
}
