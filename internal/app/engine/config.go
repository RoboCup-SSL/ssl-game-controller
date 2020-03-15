package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"math/rand"
	"time"
)

type Config struct {
	Division          config.Division                           `json:"division" yaml:"division"`
	FirstKickoffTeam  state.Team                                `json:"firstKickoffTeam" yaml:"firstKickoffTeam"`
	AutoContinue      bool                                      `json:"autoContinue" yaml:"autoContinue"`
	GameEventBehavior map[state.GameEventType]GameEventBehavior `json:"gameEventBehavior" yaml:"gameEventBehavior"`
	config            config.Game
	geometry          config.Geometry
	stageTimes        map[state.Stage]time.Duration
	rand              *rand.Rand
}

func DefaultConfig(gameConfig config.Game, seed int64) (s *Config) {
	s = new(Config)

	s.Division = gameConfig.DefaultDivision
	s.FirstKickoffTeam = state.Team_YELLOW
	s.AutoContinue = true

	s.GameEventBehavior = map[state.GameEventType]GameEventBehavior{}
	for _, event := range state.AllGameEvents() {
		s.GameEventBehavior[event] = GameEventBehaviorOn
	}

	s.config = gameConfig
	s.geometry = *gameConfig.DefaultGeometry[s.Division]
	s.stageTimes = loadStages(gameConfig)
	s.rand = rand.New(rand.NewSource(seed))

	return
}

func loadStages(gameConfig config.Game) (s map[state.Stage]time.Duration) {
	s = map[state.Stage]time.Duration{}
	for _, stage := range state.Stages {
		s[stage] = 0
	}
	s[state.StageFirstHalf] = gameConfig.Normal.HalfDuration
	s[state.StageHalfTime] = gameConfig.Normal.HalfTimeDuration
	s[state.StageSecondHalf] = gameConfig.Normal.HalfDuration
	s[state.StageOvertimeBreak] = gameConfig.Normal.BreakAfter
	s[state.StageOvertimeFirstHalf] = gameConfig.Overtime.HalfDuration
	s[state.StageOvertimeHalfTime] = gameConfig.Overtime.HalfTimeDuration
	s[state.StageOvertimeSecondHalf] = gameConfig.Overtime.HalfDuration
	s[state.StageShootoutBreak] = gameConfig.Overtime.BreakAfter
	return
}
