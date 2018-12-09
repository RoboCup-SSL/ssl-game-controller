package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/go-test/deep"
	"github.com/pkg/errors"
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
			t.Run(f.Name(), func(t *testing.T) {
				processTransitionFile(t, f.Name())
			})
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
	if err := stateTransitions.InitialState.valid(); err != nil {
		t.Fatal(err)
	}
	stateTransitions.InitialState.applyTo(e.State)
	// initialize the expected state with the current engine state
	expectedState := e.State.DeepCopy()

	for i, s := range stateTransitions.Transitions {

		if s.Event != nil {
			if err := s.Event.valid(); err != nil {
				t.Fatal(err)
			}
			if err := e.Process(*s.Event); err != nil {
				t.Fatalf("Could not process event '%v': %v", *s.Event, err)
			}
		}

		if s.Tick != nil {
			elapsedTime += *s.Tick
			e.Tick(*s.Tick)
		}

		if s.ExpectedStateDiff != nil {
			if err := s.ExpectedStateDiff.valid(); err != nil {
				t.Fatal(err)
			}
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

func (e *Event) valid() error {
	if e.Card != nil && !e.Card.ForTeam.Valid() {
		return errors.Errorf("Event.Card.ForTeam has an invalid value: %v", e.Card.ForTeam)
	}
	if e.Command != nil {
		if e.Command.ForTeam != nil && !e.Command.ForTeam.Valid() {
			return errors.Errorf("Event.Command.ForTeam has an invalid value: %v", e.Command.ForTeam)
		}
		if !e.Command.Type.Valid() {
			return errors.Errorf("Event.Command.Type has an invalid value: %v", e.Command.Type)
		}
	}
	if e.GameEvent != nil && !e.GameEvent.Type.Valid() {
		return errors.Errorf("Event.GameEvent.Type has an invalid value: %v", e.GameEvent.Type)
	}
	return nil
}

func (t *TestState) valid() error {
	if t.Stage != nil && !t.Stage.Valid() {
		return errors.Errorf("TestState.Stage has an invalid value: %v", t.Stage)
	}
	if t.Command != nil && !t.Command.Valid() {
		return errors.Errorf("TestState.Command has an invalid value: %v", t.Command)
	}
	if t.CommandFor != nil && !t.CommandFor.Valid() {
		return errors.Errorf("TestState.CommandFor has an invalid value: %v", t.CommandFor)
	}
	for i, gameEvent := range t.GameEvents {
		if !gameEvent.Type.Valid() {
			return errors.Errorf("TestState.GameEvents[%v].Type has an invalid value: %v", i, gameEvent.Type)
		}
	}
	for team := range t.TeamState {
		if !team.Valid() {
			return errors.Errorf("TestState.TeamState has an invalid key: %v", team)
		}
	}
	if t.Division != nil && !t.Division.Valid() {
		return errors.Errorf("TestState.Division has an invalid value: %v", t.Division)
	}
	if t.NextCommand != nil && !t.NextCommand.Valid() {
		return errors.Errorf("TestState.NextCommand has an invalid value: %v", t.NextCommand)
	}
	if t.NextCommandFor != nil && !t.NextCommandFor.Valid() {
		return errors.Errorf("TestState.NextCommandFor has an invalid value: %v", t.NextCommandFor)
	}
	if t.GameEventBehavior != nil {
		for gameEventType, gameEventBehavior := range *t.GameEventBehavior {
			if !gameEventType.Valid() {
				return errors.Errorf("TestState.GameEventBehavior has an invalid key: %v", gameEventType)
			}
			if !gameEventBehavior.Valid() {
				return errors.Errorf("TestState.GameEventBehavior[%v] has an invalid value: %v", gameEventType, gameEventBehavior)
			}
		}
	}
	for _, proposal := range t.GameEventProposals {
		if !proposal.GameEvent.Type.Valid() {
			return errors.Errorf("TestState.GameEventProposals.GameEvent.Type has an invalid value: %v", proposal.GameEvent.Type)
		}
	}
	return nil
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
	// special case: always apply placement pos in order to make it resettable
	s.PlacementPos = t.PlacementPos
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
