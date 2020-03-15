package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)

// Config contains mutable and persistent configuration parameters for the engine
type Config struct {
	Division          config.Division                           `json:"division" yaml:"division"`
	FirstKickoffTeam  state.Team                                `json:"firstKickoffTeam" yaml:"firstKickoffTeam"`
	AutoContinue      bool                                      `json:"autoContinue" yaml:"autoContinue"`
	GameEventBehavior map[state.GameEventType]GameEventBehavior `json:"gameEventBehavior" yaml:"gameEventBehavior"`
}

// DefaultConfig creates a default config populated with reasonable values
func DefaultConfig() (s *Config) {
	s = new(Config)

	s.Division = config.DivA
	s.FirstKickoffTeam = state.Team_YELLOW
	s.AutoContinue = true

	s.GameEventBehavior = map[state.GameEventType]GameEventBehavior{}
	for _, event := range state.AllGameEvents() {
		s.GameEventBehavior[event] = GameEventBehaviorOn
	}

	return
}

// SaveTo saves the current config to the given file
func (c *Config) SaveTo(filename string) (err error) {
	b, err := yaml.Marshal(c)
	if err != nil {
		err = errors.Wrapf(err, "Could not marshal config %v", c)
		return
	}
	err = os.MkdirAll(filepath.Dir(filename), 0755)
	if err != nil {
		err = errors.Wrapf(err, "Could not create directory for config file: %v", filename)
		return
	}
	err = ioutil.WriteFile(filename, b, 0600)
	return
}

// LoadFrom loads the config from a file, if the file is present and merges it with the current values
func (c *Config) LoadFrom(filename string) {
	f, err := os.OpenFile(filename, os.O_RDONLY, 0600)
	if err != nil {
		return
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		return
	}

	err = yaml.Unmarshal(b, &c)
	if err != nil {
		err = errors.Wrapf(err, "Could not unmarshal config file %v", filename)
	}
}

// loadStageTimes loads the stage time durations from the game config into a map
func loadStageTimes(gameConfig config.Game) (s map[state.Stage]time.Duration) {
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
