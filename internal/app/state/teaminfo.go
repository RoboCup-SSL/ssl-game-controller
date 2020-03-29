package state

import (
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/duration"
	"time"
)

func newTeamInfo() (t *TeamInfo) {
	t = new(TeamInfo)
	t.Name = new(string)
	t.Goals = new(int32)
	t.Goalkeeper = new(int32)
	t.YellowCards = []*YellowCard{}
	t.RedCards = []*RedCard{}
	t.TimeoutsLeft = new(int32)
	t.TimeoutTimeLeft = new(duration.Duration)
	t.OnPositiveHalf = new(bool)
	t.Fouls = []*Foul{}
	t.BallPlacementFailures = new(int32)
	t.BallPlacementFailuresReached = new(bool)
	t.CanPlaceBall = new(bool)
	t.MaxAllowedBots = new(int32)
	t.BotSubstitutionIntent = new(bool)

	*t.CanPlaceBall = true
	return
}

// BallPlacementAllowed returns true, if the team has ball placement enabled and has not yet failed too often
func (m *TeamInfo) BallPlacementAllowed() bool {
	return *m.CanPlaceBall && !*m.BallPlacementFailuresReached
}

// AddYellowCard adds a new yellow card to the team
func (m *TeamInfo) AddYellowCard(d time.Duration, causedByGameEvent *GameEvent) {
	id := uint32(0)
	numCards := len(m.YellowCards)
	if numCards > 0 {
		id = *m.YellowCards[numCards-1].Id + 1
	}
	m.YellowCards = append(m.YellowCards, &YellowCard{
		Id:                &id,
		TimeRemaining:     ptypes.DurationProto(d),
		CausedByGameEvent: causedByGameEvent,
	})
	return
}

// AddRedCard adds a new red card to the team
func (m *TeamInfo) AddRedCard(causedByGameEvent *GameEvent) {
	id := uint32(0)
	numCards := len(m.RedCards)
	if numCards > 0 {
		id = *m.RedCards[numCards-1].Id + 1
	}
	m.RedCards = append(m.RedCards, &RedCard{
		Id:                &id,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}

// AddFoul adds a new foul to the team
func (m *TeamInfo) AddFoul(causedByGameEvent *GameEvent) {
	id := uint32(0)
	numCards := len(m.Fouls)
	if numCards > 0 {
		id = *m.Fouls[numCards-1].Id + 1
	}
	m.Fouls = append(m.Fouls, &Foul{
		Id:                &id,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}
