package controller

import (
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
	"os"
	"time"
)

// special configs that are different between normal and overtime halves
type ConfigSpecial struct {
	HalfDuration     time.Duration `yaml:"half-duration"`
	HalfTimeDuration time.Duration `yaml:"half-time-duration"`
	TimeoutDuration  time.Duration `yaml:"timeout-duration"`
	Timeouts         int           `yaml:"timeouts"`
	BreakAfter       time.Duration `yaml:"break-after"`
}

// global configs
type ConfigGlobal struct {
	YellowCardDuration time.Duration `yaml:"yellow-card-duration"`
}

// publish configs
type ConfigPublish struct {
	Address string `yaml:"address"`
}

// Config structure for the game controller
type Config struct {
	Publish  ConfigPublish `yaml:"publish"`
	Global   ConfigGlobal  `yaml:"global"`
	Normal   ConfigSpecial `yaml:"normal"`
	Overtime ConfigSpecial `yaml:"overtime"`
}

// Load a config from given file
func LoadConfig(fileName string) (config Config, err error) {

	config = DefaultConfig()

	f, err := os.OpenFile(fileName, os.O_RDONLY, 0600)
	if err != nil {
		err = errors.Errorf("Can not open config file %v. %v", fileName, err)
		return
	}

	b, err := readAll(f)

	err = yaml.Unmarshal(b, &config)
	if err != nil {
		err = errors.Errorf("Could not unmarshal config file %v. %v", fileName, err)
	}

	return
}

// Create a config with default values
func DefaultConfig() (c Config) {
	c.Publish.Address = "224.5.23.1:10003"
	c.Global.YellowCardDuration = 2 * time.Minute

	c.Normal.HalfDuration = 5 * time.Minute
	c.Normal.HalfTimeDuration = 5 * time.Minute
	c.Normal.Timeouts = 4
	c.Normal.TimeoutDuration = 5 * time.Minute
	c.Normal.BreakAfter = 5 * time.Minute

	c.Overtime.HalfDuration = 2*time.Minute + 30*time.Second
	c.Overtime.HalfTimeDuration = 2 * time.Minute
	c.Overtime.Timeouts = 2
	c.Overtime.TimeoutDuration = 5 * time.Minute
	c.Overtime.BreakAfter = 2 * time.Minute

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
