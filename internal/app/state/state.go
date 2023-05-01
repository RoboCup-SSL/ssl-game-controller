package state

import (
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// NewState creates a new state, initialized for the start of a new game
func NewState() (s *State) {
	s = new(State)
	s.Stage = new(Referee_Stage)
	s.Command = NewCommandNeutral(Command_HALT)
	s.GameState = NewGameStateNeutral(GameState_HALT)
	s.StageTimeElapsed = new(durationpb.Duration)
	s.StageTimeLeft = new(durationpb.Duration)
	s.MatchTimeStart = new(timestamppb.Timestamp)
	s.CurrentActionTimeRemaining = new(durationpb.Duration)
	s.Division = new(Division)
	s.FirstKickoffTeam = new(Team)
	s.MatchType = new(MatchType)

	*s.MatchType = MatchType_UNKNOWN_MATCH
	*s.Stage = Referee_NORMAL_FIRST_HALF_PRE

	s.TeamState = map[string]*TeamInfo{}
	s.TeamState[Team_YELLOW.String()] = newTeamInfo()
	s.TeamState[Team_BLUE.String()] = newTeamInfo()
	*s.TeamState[Team_YELLOW.String()].OnPositiveHalf = !*s.TeamState[Team_BLUE.String()].OnPositiveHalf

	*s.Division = Division_DIV_A
	*s.FirstKickoffTeam = Team_YELLOW

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

func (x *State) StringJson() string {
	if b, err := protojson.Marshal(x); err != nil {
		return err.Error()
	} else {
		return string(b)
	}
}

func (x *State) HasGameEventByTeam(t GameEvent_Type, team Team) bool {
	for _, gameEvent := range x.GameEvents {
		if *gameEvent.Type == t && gameEvent.ByTeam() == team {
			return true
		}
	}
	return false
}

func (x *State) FindGameEvents(eventType GameEvent_Type) (events []*GameEvent) {
	events = []*GameEvent{}
	for _, event := range x.GameEvents {
		if *event.Type == eventType {
			events = append(events, event)
		}
	}
	return events
}

func (x *State) FindGameEventsByTeam(eventType GameEvent_Type, team Team) (events []*GameEvent) {
	events = []*GameEvent{}
	for _, event := range x.GameEvents {
		if *event.Type == eventType && (team.Unknown() || event.ByTeam() == team) {
			events = append(events, event)
		}
	}
	return events
}
