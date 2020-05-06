package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/jsonpb"
	"github.com/pkg/errors"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
)

func DefaultConfig() (c Config) {
	c.AutoRefConfigs = map[string]*AutoRefConfig{}
	c.GameEventBehavior = map[string]Config_Behavior{}
	for _, event := range state.AllGameEvents() {
		c.GameEventBehavior[event.String()] = Config_BEHAVIOR_ACCEPT
	}
	return
}

// ReadFrom loads a config from given file
func (m *Config) ReadFrom(fileName string) (err error) {

	f, err := os.OpenFile(fileName, os.O_RDONLY, 0600)
	if err != nil {
		return
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		return
	}

	err = jsonpb.UnmarshalString(string(b), m)
	if err != nil {
		err = errors.Wrapf(err, "Could not unmarshal config file %v", fileName)
	}

	return
}

// LoadControllerConfig loads the controller config, creating a default one if it is not present yet
func (m *Config) LoadControllerConfig(configFileName string) {
	err := m.ReadFrom(configFileName)
	if err != nil {
		log.Printf("Could not load config: %v", err)
		*m = DefaultConfig()
		err = m.WriteTo(configFileName)
		if err != nil {
			log.Printf("Failed to write a default config file to %v: %v", configFileName, err)
		} else {
			log.Println("New default config has been written to ", configFileName)
		}
	}
	return
}

// WriteTo writes the config to the given file
func (m *Config) WriteTo(fileName string) (err error) {
	marshaler := jsonpb.Marshaler{Indent: "  "}
	jsonStr, err := marshaler.MarshalToString(m)
	if err != nil {
		err = errors.Wrapf(err, "Could not marshal config %v", m)
		return
	}
	err = os.MkdirAll(filepath.Dir(fileName), 0755)
	if err != nil {
		err = errors.Wrapf(err, "Could not create directory for config file: %v", fileName)
		return
	}
	err = ioutil.WriteFile(fileName, []byte(jsonStr), 0600)
	log.Printf("Written to %v", fileName)
	return
}
