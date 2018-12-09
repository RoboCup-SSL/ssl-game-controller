package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/go-test/deep"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

type TestState struct {
	Stage                       *Stage                               `yaml:"stage"`
	Command                     *RefCommand                          `yaml:"command"`
	CommandFor                  *Team                                `yaml:"commandFor"`
	GameEvents                  []*GameEvent                         `yaml:"gameEvents"`
	StageTimeElapsed            *time.Duration                       `yaml:"stageTimeElapsed"`
	StageTimeLeft               *time.Duration                       `yaml:"stageTimeLeft"`
	MatchTimeStart              *time.Time                           `yaml:"matchTimeStart"`
	MatchDuration               *time.Duration                       `yaml:"matchDuration"`
	TeamState                   map[Team]*TestTeamInfo               `yaml:"teamState"`
	Division                    *config.Division                     `yaml:"division"`
	PlacementPos                *Location                            `yaml:"placementPos"`
	AutoContinue                *bool                                `yaml:"autoContinue"`
	NextCommand                 *RefCommand                          `yaml:"nextCommand"`
	NextCommandFor              *Team                                `yaml:"nextCommandFor"`
	GameEventBehavior           *map[GameEventType]GameEventBehavior `yaml:"gameEventBehavior"`
	GameEventProposals          []*GameEventProposal                 `yaml:"gameEventProposals"`
	LackOfProgressDeadline      *time.Time                           `yaml:"lackOfProgressDeadline"`
	LackOfProgressTimeRemaining *time.Duration                       `yaml:"lackOfProgressTimeRemaining"`
}

type TestTeamInfo struct {
	Name                  *string          `yaml:"name"`
	Goals                 *int             `yaml:"goals"`
	Goalkeeper            *int             `yaml:"goalkeeper"`
	YellowCards           *int             `yaml:"yellowCards"`
	YellowCardTimes       *[]time.Duration `yaml:"yellowCardTimes"`
	RedCards              *int             `yaml:"redCards"`
	TimeoutsLeft          *int             `yaml:"timeoutsLeft"`
	TimeoutTimeLeft       *time.Duration   `yaml:"timeoutTimeLeft"`
	OnPositiveHalf        *bool            `yaml:"onPositiveHalf"`
	FoulCounter           *int             `yaml:"foulCounter"`
	BallPlacementFailures *int             `yaml:"ballPlacementFailures"`
	CanPlaceBall          *bool            `yaml:"canPlaceBall"`
	MaxAllowedBots        *int             `yaml:"maxAllowedBots"`
	Connected             *bool            `yaml:"connected"`
	BotSubstitutionIntend *bool            `yaml:"botSubstitutionIntend"`
}

type StateTransitions struct {
	InitialState *TestState        `yaml:"initialState"`
	Transitions  []StateTransition `yaml:"transitions"`
}

type StateTransition struct {
	Event             *Event         `yaml:"event"`
	Tick              *time.Duration `yaml:"tick"`
	ExpectedStateDiff *TestState     `yaml:"expectedStateDiff"`
}

func Test_engine(t *testing.T) {
	files, err := ioutil.ReadDir("testdata")
	if err != nil {
		t.Fatal(err)
	}
	for _, f := range files {
		if !f.IsDir() && strings.HasPrefix(f.Name(), "engine_test_") {
			processTransitionFile(t, f.Name())
		}
	}
}

func processTransitionFile(t *testing.T, fileName string) {
	log.Printf("Process %v", fileName)
	path := filepath.Join("testdata", fileName)
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	stateTransitions := new(StateTransitions)
	if err := yaml.UnmarshalStrict(bytes, &stateTransitions); err != nil {
		t.Fatal("Could not unmarshal state transitions:", err)
	}
	cfg := config.DefaultControllerConfig().Game
	e := NewEngine(cfg)
	initialTime := initialTime()
	elapsedTime := time.Duration(0)
	e.TimeProvider = func() time.Time {
		return initialTime.Add(elapsedTime)
	}

	if stateTransitions.InitialState == nil {
		t.Fatalf("No initial state given: %v", stateTransitions)
	}

	// apply the initial state to the engine
	stateTransitions.InitialState.applyTo(e.State)
	// initialize the expected state with the current engine state
	expectedState := e.State.DeepCopy()

	for i, s := range stateTransitions.Transitions {

		if s.Event != nil {
			if err := e.Process(*s.Event); err != nil {
				t.Fatalf("Could not process event '%v': %v", *s.Event, err)
			}
		}

		if s.Tick != nil {
			elapsedTime += *s.Tick
			e.Tick(*s.Tick)
		}

		if s.ExpectedStateDiff != nil {
			// apply the expected state diff to the expected state
			s.ExpectedStateDiff.applyTo(&expectedState)
		}

		// check if the engine state is equal to the expected state
		if diff := deep.Equal(*e.State, expectedState); diff != nil {
			t.Errorf("Step %v of %v failed. engine vs expected diff: %v", i+1, fileName, diff)
		}

	}
}

func initialTime() time.Time {
	ts, err := time.Parse("2006-01-02T15:04:05Z", "2010-01-01T00:00:00Z")
	if err != nil {
		panic("Could not parse time")
	}
	return ts
}

func (t *TestState) applyTo(s *State) {
	if t.Stage != nil {
		s.Stage = *t.Stage
	}
	if t.Command != nil {
		s.Command = *t.Command
	}
	if t.CommandFor != nil {
		s.CommandFor = *t.CommandFor
	}
	if t.GameEvents != nil {
		s.GameEvents = t.GameEvents
	}
	if t.StageTimeElapsed != nil {
		s.StageTimeElapsed = *t.StageTimeElapsed
	}
	if t.StageTimeLeft != nil {
		s.StageTimeLeft = *t.StageTimeLeft
	}
	if t.MatchTimeStart != nil {
		s.MatchTimeStart = *t.MatchTimeStart
	}
	if t.MatchDuration != nil {
		s.MatchDuration = *t.MatchDuration
	}
	if t.TeamState[TeamYellow] != nil {
		t.TeamState[TeamYellow].applyTo(s.TeamState[TeamYellow])
	}
	if t.TeamState[TeamBlue] != nil {
		t.TeamState[TeamBlue].applyTo(s.TeamState[TeamBlue])
	}
	if t.Division != nil {
		s.Division = *t.Division
	}
	if t.PlacementPos != nil {
		s.PlacementPos = t.PlacementPos
	}
	if t.AutoContinue != nil {
		s.AutoContinue = *t.AutoContinue
	}
	if t.NextCommand != nil {
		s.NextCommand = *t.NextCommand
	}
	if t.NextCommandFor != nil {
		s.NextCommandFor = *t.NextCommandFor
	}
	if t.GameEventBehavior != nil {
		s.GameEventBehavior = *t.GameEventBehavior
	}
	if t.GameEventProposals != nil {
		s.GameEventProposals = t.GameEventProposals
	}
	if t.LackOfProgressDeadline != nil {
		s.LackOfProgressDeadline = *t.LackOfProgressDeadline
	}
	if t.LackOfProgressTimeRemaining != nil {
		s.LackOfProgressTimeRemaining = *t.LackOfProgressTimeRemaining
	}
}

func (t *TestTeamInfo) applyTo(info *TeamInfo) {
	if t.Name != nil {
		info.Name = *t.Name
	}
	if t.Goals != nil {
		info.Goals = *t.Goals
	}
	if t.Goalkeeper != nil {
		info.Goalkeeper = *t.Goalkeeper
	}
	if t.YellowCards != nil {
		info.YellowCards = *t.YellowCards
	}
	if t.YellowCardTimes != nil {
		info.YellowCardTimes = *t.YellowCardTimes
	}
	if t.RedCards != nil {
		info.RedCards = *t.RedCards
	}
	if t.TimeoutsLeft != nil {
		info.TimeoutsLeft = *t.TimeoutsLeft
	}
	if t.TimeoutTimeLeft != nil {
		info.TimeoutTimeLeft = *t.TimeoutTimeLeft
	}
	if t.OnPositiveHalf != nil {
		info.OnPositiveHalf = *t.OnPositiveHalf
	}
	if t.FoulCounter != nil {
		info.FoulCounter = *t.FoulCounter
	}
	if t.BallPlacementFailures != nil {
		info.BallPlacementFailures = *t.BallPlacementFailures
	}
	if t.CanPlaceBall != nil {
		info.CanPlaceBall = *t.CanPlaceBall
	}
	if t.MaxAllowedBots != nil {
		info.MaxAllowedBots = *t.MaxAllowedBots
	}
	if t.Connected != nil {
		info.Connected = *t.Connected
	}
	if t.BotSubstitutionIntend != nil {
		info.BotSubstitutionIntend = *t.BotSubstitutionIntend
	}
}
