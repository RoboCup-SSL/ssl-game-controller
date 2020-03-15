package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

const changeOriginStateMachine = "StateMachine"

type StateChange struct {
	Id     int
	State  *state.State
	Change Change
}

type StateMachine struct {
	cfg         *Config
	cfgFilename string
	gameConfig  config.Game
	geometry    config.Geometry
	stageTimes  map[state.Stage]time.Duration
}

func NewStateMachine(gameConfig config.Game, cfgFilename string) (s *StateMachine) {
	s = new(StateMachine)
	s.cfg = DefaultConfig()
	s.cfgFilename = cfgFilename
	s.cfg.LoadFrom(s.cfgFilename)
	s.cfg.Division = gameConfig.DefaultDivision
	s.gameConfig = gameConfig
	s.geometry = *gameConfig.DefaultGeometry[s.cfg.Division]
	s.stageTimes = loadStageTimes(gameConfig)
	return
}

// Save saves the state machine config to a file
func (s *StateMachine) Save() error {
	return s.cfg.SaveTo(s.cfgFilename)
}

func (s *StateMachine) Process(currentState *state.State, change Change) (newState *state.State, newChanges []Change) {
	newState = currentState.DeepCopy()
	switch change.ChangeType {
	case ChangeTypeNewCommand:
		newChanges = s.NewCommand(newState, change.NewCommand)
	case ChangeTypeChangeStage:
		newState.Stage = change.ChangeStage.NewStage
	case ChangeTypeYellowCardOver:
		s.updateMaxBots(newState)
	}
	return
}

func (s *StateMachine) updateMaxBots(newState *state.State) {
	for _, team := range state.BothTeams() {
		max := s.gameConfig.MaxBots[s.cfg.Division]
		yellowCards := activeYellowCards(newState.TeamState[team].YellowCards)
		redCards := len(newState.TeamState[team].RedCards)
		newState.TeamState[team].MaxAllowedBots = max - yellowCards - redCards
	}
}

func (s *StateMachine) NewCommand(newState *state.State, newCommand *NewCommand) (changes []Change) {
	newState.Command = newCommand.Command
	newState.CommandFor = newCommand.CommandFor

	switch newState.Command {
	case state.CommandBallPlacement:
		newState.CurrentActionTimeRemaining = s.gameConfig.BallPlacementTime
	case state.CommandDirect, state.CommandIndirect:
		newState.CurrentActionTimeRemaining = s.gameConfig.FreeKickTime[s.cfg.Division]
	case state.CommandKickoff, state.CommandPenalty:
		newState.CurrentActionTimeRemaining = s.gameConfig.GeneralTime
	case state.CommandTimeout:
		newState.TeamState[newState.CommandFor].TimeoutsLeft--
	}

	if newState.GameState() == state.GameStateRunning {
		if newState.Stage.IsPreStage() {
			changes = append(changes, Change{
				ChangeType:   ChangeTypeChangeStage,
				ChangeOrigin: changeOriginStateMachine,
				ChangeStage:  &ChangeStage{NewStage: newState.Stage.Next()},
			})
		}

		// reset game event proposals
		newState.ProposedGameEvents = nil

		// reset ball placement pos and follow ups
		newState.PlacementPos = nil
		newState.NextCommand = state.CommandUnknown
		newState.NextCommandFor = state.Team_UNKNOWN
	}

	return
}

func activeYellowCards(cards []state.YellowCard) (count int) {
	for _, c := range cards {
		if c.TimeRemaining > 0 {
			count++
		}
	}
	return
}
