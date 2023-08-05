package config

import (
	"github.com/pkg/errors"
	"gopkg.in/yaml.v3"
	"io"
	"log"
	"os"
	"path/filepath"
	"time"
)

// Special holds configs that are different between normal and overtime halves
type Special struct {
	HalfDuration     time.Duration `yaml:"half-duration"`
	HalfTimeDuration time.Duration `yaml:"half-time-duration"`
	TimeoutDuration  time.Duration `yaml:"timeout-duration"`
	Timeouts         int32         `yaml:"timeouts"`
	BreakAfter       time.Duration `yaml:"break-after"`
}

// Geometry holds sizes of the field and distance for certain rules
type Geometry struct {
	FieldLength                     float64 `yaml:"field-length"`
	FieldWidth                      float64 `yaml:"field-width"`
	DefenseAreaDepth                float64 `yaml:"defense-area-depth"`
	DefenseAreaWidth                float64 `yaml:"defense-area-width"`
	PenaltyKickDistToGoal           float64 `yaml:"penalty-kick-dist-to-goal"`
	GoalWidth                       float64 `yaml:"goal-width"`
	CenterCircleRadius              float64 `yaml:"center-circle-radius"`
	PlacementOffsetTouchLine        float64 `yaml:"placement-offset-touch-line"`
	PlacementOffsetGoalLine         float64 `yaml:"placement-offset-goal-line"`
	PlacementOffsetGoalLineGoalKick float64 `yaml:"placement-offset-goal-line-goal-kick"`
	PlacementOffsetDefenseArea      float64 `yaml:"placement-offset-defense-area"`
}

// Game holds configs that are valid for the whole game
type Game struct {
	YellowCardDuration                    time.Duration              `yaml:"yellow-card-duration"`
	YellowCardBotRemovalTime              time.Duration              `yaml:"yellow-card-bot-removal-time"`
	DefaultDivision                       Division                   `yaml:"default-division"`
	Normal                                Special                    `yaml:"normal"`
	Overtime                              Special                    `yaml:"overtime"`
	TeamChoiceTimeout                     time.Duration              `yaml:"team-choice-timeout"`
	DefaultGeometry                       map[Division]Geometry      `yaml:"default-geometry"`
	MultipleCardStep                      int32                      `yaml:"multiple-card-step"`
	MultipleFoulStep                      int32                      `yaml:"multiple-foul-step"`
	MultiplePlacementFailures             int32                      `yaml:"multiple-placement-failures"`
	MaxBots                               map[Division]int32         `yaml:"max-bots"`
	AutoRefProposalTimeout                time.Duration              `yaml:"auto-ref-proposal-timeout"`
	PrepareTimeout                        time.Duration              `yaml:"prepare-timeout"`
	FreeKickTimeout                       map[Division]time.Duration `yaml:"free-kick-timeout"`
	NoProgressTimeout                     map[Division]time.Duration `yaml:"no-progress-timeout"`
	BallPlacementTime                     time.Duration              `yaml:"ball-placement-time"`
	BallPlacementTimeTopUp                time.Duration              `yaml:"ball-placement-time-top-up"`
	StateStoreFile                        string                     `yaml:"state-store-file"`
	BallPlacementRequiredDistance         float64                    `yaml:"ball-placement-required-distance"`
	BallPlacementMinDistanceToDefenseArea float64                    `yaml:"ball-placement-min-distance-to-defense-area"`
	BallPlacementTolerance                float64                    `yaml:"ball-placement-tolerance"`
	BallPlacementMinRobotDistance         float64                    `yaml:"ball-placement-min-robot-distance"`
	DistanceToBallInStop                  float64                    `yaml:"distance-to-ball-in-stop"`
	AutoApproveGoals                      bool                       `yaml:"auto-approve-goals"`
	ContinueFromHalt                      bool                       `yaml:"continue-from-halt"`
	RecommendHalfTimes                    bool                       `yaml:"recommend-half-times"`
	ChallengeFlags                        int32                      `yaml:"challenge-flags"`
	EmergencyStopGracePeriod              time.Duration              `yaml:"emergency-stop-grace-period"`
	PreparationTimeAfterHalt              time.Duration              `yaml:"preparation-time-after-halt"`
	PreparationTimeBeforeResume           time.Duration              `yaml:"preparation-time-before-resume"`
}

// Network holds configs for network communication
type Network struct {
	PublishAddress string   `yaml:"publish-address"`
	PublishNif     string   `yaml:"publish-nif"`
	VisionAddress  string   `yaml:"vision-address"`
	TrackerAddress string   `yaml:"tracker-address"`
	SkipInterfaces []string `yaml:"skip-interfaces"`
}

// Server holds configs for the available server services
type Server struct {
	AutoRef       ServerAutoRef     `yaml:"auto-ref"`
	Team          ServerTeam        `yaml:"team"`
	Ci            ServerCi          `yaml:"ci"`
	RemoteControl RemoteControlTeam `yaml:"remote-control"`
}

// ServerAutoRef holds configs for the autoRef server
type ServerAutoRef struct {
	Address        string `yaml:"address"`
	TrustedKeysDir string `yaml:"trusted-keys-dir"`
}

// ServerTeam holds configs for the team server
type ServerTeam struct {
	Address        string `yaml:"address"`
	TrustedKeysDir string `yaml:"trusted-keys-dir"`
}

// RemoteControlTeam holds configs for the remote control server
type RemoteControlTeam struct {
	Address        string `yaml:"address"`
	TrustedKeysDir string `yaml:"trusted-keys-dir"`
}

// ServerCi holds configs for the CI server
type ServerCi struct {
	Address string `yaml:"address"`
}

type Engine struct {
	ConfigFilename string `yaml:"config-filename"`
}

// Controller structure for the game controller
type Controller struct {
	Network             Network             `yaml:"network"`
	Game                Game                `yaml:"game"`
	Server              Server              `yaml:"server"`
	TimeAcquisitionMode TimeAcquisitionMode `yaml:"time-acquisition-mode"`
	Engine              Engine              `yaml:"engine"`
}

type TimeAcquisitionMode string

const (
	TimeAcquisitionModeSystem TimeAcquisitionMode = "system"
	TimeAcquisitionModeVision TimeAcquisitionMode = "vision"
	TimeAcquisitionModeCi     TimeAcquisitionMode = "ci"
)

// LoadControllerConfig loads a config from given file
func LoadControllerConfig(fileName string) (config Controller, err error) {

	config = DefaultControllerConfig()

	f, err := os.OpenFile(fileName, os.O_RDONLY, 0600)
	if err != nil {
		return
	}
	b, err := io.ReadAll(f)
	if err != nil {
		return
	}

	err = yaml.Unmarshal(b, &config)
	if err != nil {
		err = errors.Wrapf(err, "Could not unmarshal config file %v", fileName)
	}

	return
}

func (c *Controller) WriteTo(fileName string) (err error) {
	b, err := yaml.Marshal(c)
	if err != nil {
		err = errors.Wrapf(err, "Could not marshal config %v", c)
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

// DefaultControllerConfig creates a config with default values
func DefaultControllerConfig() (c Controller) {
	c.Network.PublishAddress = "224.5.23.1:10003"
	c.Network.PublishNif = ""
	c.Network.VisionAddress = "224.5.23.2:10006"
	c.Network.TrackerAddress = "224.5.23.2:10010"
	c.Network.SkipInterfaces = []string{}
	c.Game.StateStoreFile = "config/state-store.json.stream"
	c.Game.YellowCardDuration = 2 * time.Minute
	c.Game.YellowCardBotRemovalTime = 10 * time.Second
	c.Game.TeamChoiceTimeout = 200 * time.Millisecond
	c.Game.MultipleCardStep = 2
	c.Game.MultipleFoulStep = 3
	c.Game.MultiplePlacementFailures = 5
	c.Game.AutoRefProposalTimeout = 1 * time.Second
	c.Game.PrepareTimeout = time.Second * 10
	c.Game.FreeKickTimeout = map[Division]time.Duration{DivA: time.Second * 5, DivB: time.Second * 10}
	c.Game.NoProgressTimeout = map[Division]time.Duration{DivA: time.Second * 5, DivB: time.Second * 10}
	c.Game.BallPlacementTime = time.Second * 30
	c.Game.BallPlacementTimeTopUp = time.Second * 10
	c.Game.BallPlacementRequiredDistance = 1.0
	c.Game.BallPlacementMinDistanceToDefenseArea = 0.7
	c.Game.BallPlacementTolerance = 0.15
	c.Game.BallPlacementMinRobotDistance = 0.05
	c.Game.DistanceToBallInStop = 0.5
	c.Game.AutoApproveGoals = false
	c.Game.ContinueFromHalt = false
	c.Game.RecommendHalfTimes = true
	c.Game.ChallengeFlags = 3
	c.Game.EmergencyStopGracePeriod = 10 * time.Second
	c.Game.PreparationTimeAfterHalt = 10 * time.Second
	c.Game.PreparationTimeBeforeResume = 2 * time.Second

	c.Game.Normal.HalfDuration = 5 * time.Minute
	c.Game.Normal.HalfTimeDuration = 5 * time.Minute
	c.Game.Normal.Timeouts = 4
	c.Game.Normal.TimeoutDuration = 5 * time.Minute
	c.Game.Normal.BreakAfter = 5 * time.Minute

	c.Game.Overtime.HalfDuration = 2*time.Minute + 30*time.Second
	c.Game.Overtime.HalfTimeDuration = 2 * time.Minute
	c.Game.Overtime.Timeouts = 2
	c.Game.Overtime.TimeoutDuration = 2*time.Minute + 30*time.Second
	c.Game.Overtime.BreakAfter = 2 * time.Minute

	c.Game.DefaultDivision = DivA

	c.Server.AutoRef.Address = ":10007"
	c.Server.AutoRef.TrustedKeysDir = "config/trusted_keys/auto_ref"
	c.Server.Team.Address = ":10008"
	c.Server.Team.TrustedKeysDir = "config/trusted_keys/team"
	c.Server.RemoteControl.Address = ":10011"
	c.Server.RemoteControl.TrustedKeysDir = "config/trusted_keys/remote-control"
	c.Server.Ci.Address = ":10009"

	c.Game.DefaultGeometry = map[Division]Geometry{}
	c.Game.DefaultGeometry[DivA] = Geometry{
		FieldLength:                     12,
		FieldWidth:                      9,
		DefenseAreaDepth:                1.8,
		DefenseAreaWidth:                3.6,
		PenaltyKickDistToGoal:           8.0,
		GoalWidth:                       1.8,
		CenterCircleRadius:              0.5,
		PlacementOffsetTouchLine:        0.2,
		PlacementOffsetGoalLine:         0.2,
		PlacementOffsetGoalLineGoalKick: 1.0,
		PlacementOffsetDefenseArea:      1.0,
	}
	c.Game.DefaultGeometry[DivB] = Geometry{
		FieldLength:                     9,
		FieldWidth:                      6,
		DefenseAreaDepth:                1,
		DefenseAreaWidth:                2,
		PenaltyKickDistToGoal:           6.0,
		GoalWidth:                       1.0,
		CenterCircleRadius:              0.5,
		PlacementOffsetTouchLine:        0.2,
		PlacementOffsetGoalLine:         0.2,
		PlacementOffsetGoalLineGoalKick: 1.0,
		PlacementOffsetDefenseArea:      1.0,
	}

	c.Game.MaxBots = map[Division]int32{DivA: 11, DivB: 6}

	c.TimeAcquisitionMode = TimeAcquisitionModeSystem

	c.Engine.ConfigFilename = "config/engine.yaml"

	return
}

// LoadConfig loads the controller config
func LoadConfig(configFileName string) Controller {
	cfg, err := LoadControllerConfig(configFileName)
	if err != nil {
		log.Printf("Could not load config: %v", err)
		err = cfg.WriteTo(configFileName)
		if err != nil {
			log.Printf("Failed to write a default config file to %v: %v", configFileName, err)
		} else {
			log.Println("New default config has been written to ", configFileName)
		}
	}
	return cfg
}
