package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/pkg/errors"
	"google.golang.org/protobuf/encoding/protojson"
	"io"
	"log"
	"os"
	"path/filepath"
)

var defaultTeams = []string{
	"AIS",
	"AMC",
	"A-Team",
	"CMμs",
	"ER-Force",
	"Immortals",
	"ITAndroids",
	"KgpKubs",
	"KIKS",
	"luhbots",
	"MCT Susano Logics",
	"MIT Roboteam",
	"MRL",
	"NAELIC",
	"NAMeC",
	"NEUIslanders",
	"OMID",
	"OP-AmP",
	"OrcaBOT",
	"Parsian",
	"RFC Cambridge",
	"Ri-one",
	"RobôCin",
	"RoboDragons",
	"RoboFEI",
	"RoboIME",
	"RoboJackets",
	"RoboTeam Twente",
	"SRC",
	"SSH",
	"STOx’s",
	"Sysmic Robotics",
	"Test Team",
	"TIGERs Mannheim",
	"Tritons RCSC",
	"UBC Thunderbots",
	"ULtron",
	"UMass Minutebots",
	"Unknown",
	"URoboRus",
	"Warthog Robotics",
	"ZJUNlict",
}

func DefaultConfig() (x Config) {
	x.AutoRefConfigs = map[string]*AutoRefConfig{}
	x.GameEventBehavior = map[string]Config_Behavior{}
	for _, event := range state.GameEventsForBehaviorConfig() {
		x.GameEventBehavior[event.String()] = Config_BEHAVIOR_ACCEPT_MAJORITY
	}
	x.Teams = defaultTeams
	x.AutoContinue = new(bool)
	*x.AutoContinue = true
	return
}

// ReadFrom loads a config from given file
func (x *Config) ReadFrom(fileName string) (err error) {

	f, err := os.OpenFile(fileName, os.O_RDONLY, 0600)
	if err != nil {
		return
	}
	b, err := io.ReadAll(f)
	if err != nil {
		return
	}

	err = protojson.Unmarshal(b, x)
	if err != nil {
		err = errors.Wrapf(err, "Could not unmarshal config file %v", fileName)
	}

	defConfig := DefaultConfig()
	if x.AutoRefConfigs == nil {
		x.AutoRefConfigs = defConfig.AutoRefConfigs
	}
	for key, value := range defConfig.AutoRefConfigs {
		if _, ok := x.AutoRefConfigs[key]; !ok {
			x.AutoRefConfigs[key] = value
		}
	}
	if x.GameEventBehavior == nil {
		x.GameEventBehavior = map[string]Config_Behavior{}
	}
	for key, value := range defConfig.GameEventBehavior {
		if _, ok := x.GameEventBehavior[key]; !ok {
			x.GameEventBehavior[key] = value
		}
	}

	uniqueTeams := map[string]bool{}
	for _, t := range defaultTeams {
		uniqueTeams[t] = true
	}
	for _, t := range x.Teams {
		uniqueTeams[t] = true
	}
	x.Teams = make([]string, 0, len(uniqueTeams))
	for t := range uniqueTeams {
		x.Teams = append(x.Teams, t)
	}

	if x.AutoContinue == nil {
		x.AutoContinue = defConfig.AutoContinue
	}

	return
}

// LoadControllerConfig loads the controller config, creating a default one if it is not present yet
func (x *Config) LoadControllerConfig(configFileName string) {
	err := x.ReadFrom(configFileName)
	if err != nil {
		log.Printf("Could not load config: %v", err)
		*x = DefaultConfig()
		err = x.WriteTo(configFileName)
		if err != nil {
			log.Printf("Failed to write a default config file to %v: %v", configFileName, err)
		} else {
			log.Println("New default config has been written to ", configFileName)
		}
	}
	return
}

// WriteTo writes the config to the given file
func (x *Config) WriteTo(fileName string) (err error) {
	marshaler := protojson.MarshalOptions{Indent: "  "}
	b, err := marshaler.Marshal(x)
	if err != nil {
		err = errors.Wrapf(err, "Could not marshal config %v", x)
		return
	}
	err = os.MkdirAll(filepath.Dir(fileName), 0755)
	if err != nil {
		err = errors.Wrapf(err, "Could not create directory for config file: %v", fileName)
		return
	}
	err = os.WriteFile(fileName, b, 0600)
	return
}

func (x *Config) StringJson() string {
	if b, err := protojson.Marshal(x); err != nil {
		return err.Error()
	} else {
		return string(b)
	}
}
