package state

import (
	"encoding/json"
	"time"
)

// TeamInfo about a team
type TeamInfo struct {
	Name                         string        `json:"name" yaml:"name"`
	Goals                        int           `json:"goals" yaml:"goals"`
	Goalkeeper                   int           `json:"goalkeeper" yaml:"goalkeeper"`
	YellowCards                  int           `json:"yellowCards" yaml:"yellowCards"`
	YellowCardDeadlines          []time.Time   `json:"yellowCardDeadlines" yaml:"yellowCardDeadlines"`
	RedCards                     int           `json:"redCards" yaml:"redCards"`
	TimeoutsLeft                 int           `json:"timeoutsLeft" yaml:"timeoutsLeft"`
	TimeoutTimeLeft              time.Duration `json:"timeoutTimeLeft" yaml:"timeoutTimeLeft"`
	TimeoutStart                 time.Time     `json:"timeoutStart" yaml:"timeoutStart"`
	OnPositiveHalf               bool          `json:"onPositiveHalf" yaml:"onPositiveHalf"`
	FoulCounter                  int           `json:"foulCounter" yaml:"foulCounter"`
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
	t.YellowCards = 0
	t.YellowCardDeadlines = []time.Time{}
	t.RedCards = 0
	t.TimeoutsLeft = 0
	t.TimeoutStart = time.Unix(0, 0)
	t.OnPositiveHalf = true
	t.FoulCounter = 0
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
	copy(c.YellowCardDeadlines, t.YellowCardDeadlines)
	return
}

func (t *TeamInfo) BallPlacementAllowed() bool {
	return t.CanPlaceBall && !t.BallPlacementFailuresReached
}

func (t *TeamInfo) ResetBallPlacementFailures() {
	t.BallPlacementFailuresReached = false
	t.BallPlacementFailures = 0
}
