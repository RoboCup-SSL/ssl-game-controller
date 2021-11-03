package state

import (
	"google.golang.org/protobuf/types/known/durationpb"
	"time"
)

func newTeamInfo() (t *TeamInfo) {
	t = new(TeamInfo)
	t.Name = new(string)
	t.Goals = new(int32)
	t.Goalkeeper = new(int32)
	t.TimeoutsLeft = new(int32)
	t.TimeoutTimeLeft = new(durationpb.Duration)
	t.OnPositiveHalf = new(bool)
	t.BallPlacementFailures = new(int32)
	t.BallPlacementFailuresReached = new(bool)
	t.CanPlaceBall = new(bool)
	t.MaxAllowedBots = new(int32)
	t.ChallengeFlags = new(int32)

	*t.CanPlaceBall = true
	*t.Name = "Unknown"
	return
}

// BallPlacementAllowed returns true, if the team has ball placement enabled and has not yet failed too often
func (x *TeamInfo) BallPlacementAllowed() bool {
	return *x.CanPlaceBall && !*x.BallPlacementFailuresReached
}

// AddYellowCard adds a new yellow card to the team
func (x *TeamInfo) AddYellowCard(d time.Duration, causedByGameEvent *GameEvent) {
	id := uint32(0)
	numCards := len(x.YellowCards)
	if numCards > 0 {
		id = *x.YellowCards[numCards-1].Id + 1
	}
	x.YellowCards = append(x.YellowCards, &YellowCard{
		Id:                &id,
		TimeRemaining:     durationpb.New(d),
		CausedByGameEvent: causedByGameEvent,
	})
	return
}

// AddRedCard adds a new red card to the team
func (x *TeamInfo) AddRedCard(causedByGameEvent *GameEvent) {
	id := uint32(0)
	numCards := len(x.RedCards)
	if numCards > 0 {
		id = *x.RedCards[numCards-1].Id + 1
	}
	x.RedCards = append(x.RedCards, &RedCard{
		Id:                &id,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}

// AddFoul adds a new foul to the team
func (x *TeamInfo) AddFoul(causedByGameEvent *GameEvent) {
	id := uint32(0)
	numCards := len(x.Fouls)
	if numCards > 0 {
		id = *x.Fouls[numCards-1].Id + 1
	}
	x.Fouls = append(x.Fouls, &Foul{
		Id:                &id,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}
