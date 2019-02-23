package config

import (
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)

// Special holds configs that are different between normal and overtime halves
type Special struct {
	HalfDuration     time.Duration `yaml:"half-duration"`
	HalfTimeDuration time.Duration `yaml:"half-time-duration"`
	TimeoutDuration  time.Duration `yaml:"timeout-duration"`
	Timeouts         int           `yaml:"timeouts"`
	BreakAfter       time.Duration `yaml:"break-after"`
}

// Geometry holds sizes of the field and distance for certain rules
type Geometry struct {
	FieldLength                     float64 `yaml:"field-length"`
	FieldWidth                      float64 `yaml:"field-width"`
	DefenseAreaDepth                float64 `yaml:"defense-area-depth"`
	DefenseAreaWidth                float64 `yaml:"defense-area-width"`
	PlacementOffsetTouchLine        float64 `yaml:"placement-offset-touch-line"`
	PlacementOffsetGoalLine         float64 `yaml:"placement-offset-goal-line"`
	PlacementOffsetGoalLineGoalKick float64 `yaml:"placement-offset-goal-line-goal-kick"`
	PlacementOffsetDefenseArea      float64 `yaml:"placement-offset-defense-area"`
}

// Game holds configs that are valid for the whole game
type Game struct {
	YellowCardDuration        time.Duration              `yaml:"yellow-card-duration"`
	DefaultDivision           Division                   `yaml:"default-division"`
	Normal                    Special                    `yaml:"normal"`
	Overtime                  Special                    `yaml:"overtime"`
	TeamChoiceTimeout         time.Duration              `yaml:"team-choice-timeout"`
	DefaultGeometry           map[Division]*Geometry     `yaml:"default-geometry"`
	MultipleCardStep          int                        `yaml:"multiple-card-step"`
	MultipleFoulStep          int                        `yaml:"multiple-foul-step"`
	MultiplePlacementFailures int                        `yaml:"multiple-placement-failures"`
	MaxBots                   map[Division]int           `yaml:"max-bots"`
	AutoRefProposalTimeout    time.Duration              `yaml:"auto-ref-proposal-timeout"`
	FreeKickTime              map[Division]time.Duration `yaml:"free-kick-time"`
	GeneralTime               time.Duration              `yaml:"general-time"`
	BallPlacementTime         time.Duration              `yaml:"ball-placement-time"`
}

// Network holds configs for network communication
type Network struct {
	PublishAddress string `yaml:"publish-address"`
	VisionAddress  string `yaml:"vision-address"`
}

// Server holds configs for the available server services
type Server struct {
	AutoRef ServerAutoRef `yaml:"auto-ref"`
	Team    ServerTeam    `yaml:"team"`
	Ci      ServerCi      `yaml:"ci"`
}

// ServerAutoRef holds configs for the autoRef server
type ServerAutoRef struct {
	Address        string `yaml:"address"`
	AddressTls     string `yaml:"address-tls"`
	TrustedKeysDir string `yaml:"trusted-keys-dir"`
}

// ServerTeam holds configs for the team server
type ServerTeam struct {
	Address        string `yaml:"address"`
	AddressTls     string `yaml:"address-tls"`
	TrustedKeysDir string `yaml:"trusted-keys-dir"`
}

// ServerCi holds configs for the CI server
type ServerCi struct {
	Address string `yaml:"address"`
}

// Controller structure for the game controller
type Controller struct {
	Network             Network             `yaml:"network"`
	Game                Game                `yaml:"game"`
	Server              Server              `yaml:"server"`
	TimeAcquisitionMode TimeAcquisitionMode `yaml:"timeAcquisitionMode"`
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
	b, err := ioutil.ReadAll(f)
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
		err = errors.Wrapf(err, "Could not create directly for config file: %v", fileName)
		return
	}
	err = ioutil.WriteFile(fileName, b, 0600)
	return
}

// DefaultControllerConfig creates a config with default values
func DefaultControllerConfig() (c Controller) {
	c.Network.PublishAddress = "224.5.23.1:10003"
	c.Network.VisionAddress = "224.5.23.2:10006"
	c.Game.YellowCardDuration = 2 * time.Minute
	c.Game.TeamChoiceTimeout = 200 * time.Millisecond
	c.Game.MultipleCardStep = 3
	c.Game.MultipleFoulStep = 3
	c.Game.MultiplePlacementFailures = 5
	c.Game.AutoRefProposalTimeout = 5 * time.Second
	c.Game.GeneralTime = time.Second * 10
	c.Game.FreeKickTime = map[Division]time.Duration{DivA: time.Second * 5, DivB: time.Second * 10}
	c.Game.BallPlacementTime = time.Second * 30

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

	c.Game.DefaultDivision = DivA

	c.Server.AutoRef.Address = ":10007"
	c.Server.AutoRef.AddressTls = ":10107"
	c.Server.AutoRef.TrustedKeysDir = "config/trusted_keys/auto_ref"
	c.Server.Team.Address = ":10008"
	c.Server.Team.AddressTls = ":10108"
	c.Server.Team.TrustedKeysDir = "config/trusted_keys/team"
	c.Server.Ci.Address = ":10009"

	c.Game.DefaultGeometry = map[Division]*Geometry{}
	c.Game.DefaultGeometry[DivA] = new(Geometry)
	c.Game.DefaultGeometry[DivA].FieldLength = 12
	c.Game.DefaultGeometry[DivA].FieldWidth = 9
	c.Game.DefaultGeometry[DivA].DefenseAreaDepth = 1.2
	c.Game.DefaultGeometry[DivA].DefenseAreaWidth = 2.4
	c.Game.DefaultGeometry[DivA].PlacementOffsetGoalLine = 0.2
	c.Game.DefaultGeometry[DivA].PlacementOffsetGoalLineGoalKick = 1.0
	c.Game.DefaultGeometry[DivA].PlacementOffsetTouchLine = 0.2
	c.Game.DefaultGeometry[DivA].PlacementOffsetDefenseArea = 1.0

	c.Game.DefaultGeometry[DivB] = new(Geometry)
	c.Game.DefaultGeometry[DivB].FieldLength = 9
	c.Game.DefaultGeometry[DivB].FieldWidth = 6
	c.Game.DefaultGeometry[DivB].DefenseAreaDepth = 1
	c.Game.DefaultGeometry[DivB].DefenseAreaWidth = 2
	c.Game.DefaultGeometry[DivB].PlacementOffsetGoalLine = 0.2
	c.Game.DefaultGeometry[DivB].PlacementOffsetGoalLineGoalKick = 1.0
	c.Game.DefaultGeometry[DivB].PlacementOffsetTouchLine = 0.2
	c.Game.DefaultGeometry[DivB].PlacementOffsetDefenseArea = 1.0

	c.Game.MaxBots = map[Division]int{DivA: 8, DivB: 6}

	c.TimeAcquisitionMode = TimeAcquisitionModeSystem

	return
}
