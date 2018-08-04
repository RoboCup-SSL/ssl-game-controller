package controller

import (
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
	"os"
	"time"
)

// ConfigSpecial holds configs that are different between normal and overtime halves
type ConfigSpecial struct {
	HalfDuration     time.Duration `yaml:"half-duration"`
	HalfTimeDuration time.Duration `yaml:"half-time-duration"`
	TimeoutDuration  time.Duration `yaml:"timeout-duration"`
	Timeouts         int           `yaml:"timeouts"`
	BreakAfter       time.Duration `yaml:"break-after"`
}

// ConfigGame holds configs that are valid for the whole game
type ConfigGame struct {
	YellowCardDuration time.Duration `yaml:"yellow-card-duration"`
	Normal             ConfigSpecial `yaml:"normal"`
	Overtime           ConfigSpecial `yaml:"overtime"`
}

// ConfigPublish holds configs for publishing the state and commands to the teams
type ConfigPublish struct {
	Address string `yaml:"address"`
}

// Config structure for the game controller
type Config struct {
	Publish ConfigPublish `yaml:"publish"`
	Game    ConfigGame    `yaml:"game"`
}

// LoadConfig loads a config from given file
func LoadConfig(fileName string) (config Config, err error) {

	config = DefaultConfig()

	f, err := os.OpenFile(fileName, os.O_RDONLY, 0600)
	if err != nil {
		return
	}

	b, err := readAll(f)

	err = yaml.Unmarshal(b, &config)
	if err != nil {
		err = errors.Errorf("Could not unmarshal config file %v. %v", fileName, err)
	}

	return
}

// DefaultConfig creates a config with default values
func DefaultConfig() (c Config) {
	c.Publish.Address = "224.5.23.1:10003"
	c.Game.YellowCardDuration = 2 * time.Minute

	c.Game.Normal.HalfDuration = 5 * time.Minute
	c.Game.Normal.HalfTimeDuration = 5 * time.Minute
	c.Game.Normal.Timeouts = 4
	c.Game.Normal.TimeoutDuration = 5 * time.Minute
	c.Game.Normal.BreakAfter = 5 * time.Minute

	c.Game.Overtime.HalfDuration = 2*time.Minute + 30*time.Second
	c.Game.Overtime.HalfTimeDuration = 2 * time.Minute
	c.Game.Overtime.Timeouts = 2
	c.Game.Overtime.TimeoutDuration = 5 * time.Minute
	c.Game.Overtime.BreakAfter = 2 * time.Minute

	return
}

func readAll(f *os.File) ([]byte, error) {
	b := make([]byte, 10000)
	n, err := f.Read(b)
	if err != nil {
		return []byte{}, errors.Errorf("Can not read config files: %v", err)
	}
	if n == len(b) {
		return []byte{}, errors.New("Buffer size for reading config file is too small")
	}
	return b[:n], nil
}
