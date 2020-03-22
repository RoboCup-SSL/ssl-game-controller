package state

// GameState of a game
type GameState string

const (
	// GameStateHalted halted
	GameStateHalted GameState = "Halted"
	// GameStateStopped stopped
	GameStateStopped GameState = "Stopped"
	// GameStateRunning running
	GameStateRunning GameState = "Running"
	// GameStatePreKickoff kickoff
	GameStatePreKickoff GameState = "Prepare Kickoff"
	// GameStatePrePenalty penalty
	GameStatePrePenalty GameState = "Prepare Penalty"
	// GameStateTimeout timeout
	GameStateTimeout GameState = "Timeout"
	// GameStateBallPlacement ball placement
	GameStateBallPlacement GameState = "Ball Placement"
)

// GameStates contain all known enum constants
var GameStates = []GameState{
	GameStateHalted,
	GameStateStopped,
	GameStateRunning,
	GameStatePreKickoff,
	GameStatePrePenalty,
	GameStateTimeout,
	GameStateBallPlacement,
}

// Valid checks if the GameState enum value is among the known values
func (g GameState) Valid() bool {
	for _, gameState := range GameStates {
		if gameState == g {
			return true
		}
	}
	return false
}
