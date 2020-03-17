package state

import (
	"encoding/json"
	"time"
)

type YellowCard struct {
	Id                int
	TimeRemaining     time.Duration
	CausedByGameEvent *GameEvent
}
type RedCard struct {
	Id                int
	CausedByGameEvent *GameEvent
}

type Foul struct {
	Id                int
	CausedByGameEvent *GameEvent
}

// TeamInfo about a team
type TeamInfo struct {
	Name                         string        `json:"name" yaml:"name"`
	Goals                        int           `json:"goals" yaml:"goals"`
	Goalkeeper                   int           `json:"goalkeeper" yaml:"goalkeeper"`
	YellowCards                  []YellowCard  `json:"yellowCards" yaml:"yellowCards"`
	RedCards                     []RedCard     `json:"redCards" yaml:"redCards"`
	TimeoutsLeft                 int           `json:"timeoutsLeft" yaml:"timeoutsLeft"`
	TimeoutTimeLeft              time.Duration `json:"timeoutTimeLeft" yaml:"timeoutTimeLeft"`
	OnPositiveHalf               bool          `json:"onPositiveHalf" yaml:"onPositiveHalf"`
	Fouls                        []Foul        `json:"fouls" yaml:"fouls"`
	BallPlacementFailures        int           `json:"ballPlacementFailures" yaml:"ballPlacementFailures"`
	BallPlacementFailuresReached bool          `json:"ballPlacementFailuresReached" yaml:"ballPlacementFailuresReached"`
	CanPlaceBall                 bool          `json:"canPlaceBall" yaml:"canPlaceBall"`
	MaxAllowedBots               int           `json:"maxAllowedBots" yaml:"maxAllowedBots"`
	BotSubstitutionIntend        bool          `json:"botSubstitutionIntend" yaml:"botSubstitutionIntend"`
}

func newTeamInfo() (t TeamInfo) {
	t.Name = ""
	t.Goals = 0
	t.Goalkeeper = 0
	t.YellowCards = []YellowCard{}
	t.RedCards = []RedCard{}
	t.TimeoutsLeft = 0
	t.TimeoutTimeLeft = 0
	t.OnPositiveHalf = true
	t.Fouls = []Foul{}
	t.BallPlacementFailures = 0
	t.BallPlacementFailuresReached = false
	t.CanPlaceBall = true
	t.MaxAllowedBots = 0
	return
}

func (t TeamInfo) String() string {
	bytes, e := json.Marshal(t)
	if e != nil {
		return e.Error()
	}
	return string(bytes)
}

func (t TeamInfo) DeepCopy() (c TeamInfo) {
	c = t
	copy(c.YellowCards, t.YellowCards)
	return
}

func (t *TeamInfo) BallPlacementAllowed() bool {
	return t.CanPlaceBall && !t.BallPlacementFailuresReached
}

func (t *TeamInfo) ResetBallPlacementFailures() {
	t.BallPlacementFailuresReached = false
	t.BallPlacementFailures = 0
}

func (t *TeamInfo) AddYellowCard(duration time.Duration, causedByGameEvent *GameEvent) {
	id := 0
	numCards := len(t.YellowCards)
	if numCards > 0 {
		id = t.YellowCards[numCards-1].Id + 1
	}
	t.YellowCards = append(t.YellowCards, YellowCard{
		Id:                id,
		TimeRemaining:     duration,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}

func (t *TeamInfo) AddRedCard(causedByGameEvent *GameEvent) {
	id := 0
	numCards := len(t.RedCards)
	if numCards > 0 {
		id = t.RedCards[numCards-1].Id + 1
	}
	t.RedCards = append(t.RedCards, RedCard{
		Id:                id,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}

func (t *TeamInfo) AddFoul(causedByGameEvent *GameEvent) {
	id := 0
	numCards := len(t.Fouls)
	if numCards > 0 {
		id = t.Fouls[numCards-1].Id + 1
	}
	t.Fouls = append(t.Fouls, Foul{
		Id:                id,
		CausedByGameEvent: causedByGameEvent,
	})
	return
}
