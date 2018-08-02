package ssl_game_controller

import (
	"gopkg.in/yaml.v2"
	"log"
	"os"
	"time"
)

type RefBoxConfigSpecial struct {
	HalfDuration     time.Duration `yaml:"half-duration"`
	HalfTimeDuration time.Duration `yaml:"half-time-duration"`
	TimeoutDuration  time.Duration `yaml:"timeout-duration"`
	Timeouts         int           `yaml:"timeouts"`
	BreakAfter       time.Duration `yaml:"break-after"`
}

type RefBoxConfigGlobal struct {
	YellowCardDuration time.Duration `yaml:"yellow-card-duration"`
}

type RefBoxConfigPublish struct {
	Address string `yaml:"address"`
}

type RefBoxConfig struct {
	Publish  RefBoxConfigPublish `yaml:"publish"`
	Global   RefBoxConfigGlobal  `yaml:"global"`
	Normal   RefBoxConfigSpecial `yaml:"normal"`
	Overtime RefBoxConfigSpecial `yaml:"overtime"`
}

func LoadRefBoxConfig(fileName string) RefBoxConfig {

	f, err := os.OpenFile(fileName, os.O_RDONLY, 0600)
	if err != nil {
		log.Fatal("Can not open config files ", err)
	}

	b := make([]byte, 10000)
	n, err := f.Read(b)
	if err != nil {
		log.Fatal("Can not read config files ", err)
	}
	if n == len(b) {
		log.Fatal("Buffer size for reading config file is too small")
	}

	config := RefBoxConfig{}
	err = yaml.Unmarshal(b[:n], &config)
	if err != nil {
		log.Fatal("Could not unmarshal config file ", err)
	}

	return config
}
