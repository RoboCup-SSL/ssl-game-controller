package state

import "log"

// RefCommand is a command to be send to the teams
type RefCommand string

const (
	// CommandUnknown not set
	CommandUnknown RefCommand = ""
	// CommandHalt HALT
	CommandHalt RefCommand = "halt"
	// CommandStop STOP
	CommandStop RefCommand = "stop"
	// CommandNormalStart NORMAL_START
	CommandNormalStart RefCommand = "normalStart"
	// CommandForceStart FORCE_START
	CommandForceStart RefCommand = "forceStart"
	// CommandDirect DIRECT
	CommandDirect RefCommand = "direct"
	// CommandIndirect INDIRECT
	CommandIndirect RefCommand = "indirect"
	// CommandKickoff KICKOFF
	CommandKickoff RefCommand = "kickoff"
	// CommandPenalty PENALTY
	CommandPenalty RefCommand = "penalty"
	// CommandTimeout TIMEOUT
	CommandTimeout RefCommand = "timeout"
	// CommandBallPlacement BALL_PLACEMENT
	CommandBallPlacement RefCommand = "ballPlacement"
)

// Commands contain all known command enum constants
var RefCommands = []RefCommand{
	CommandUnknown,
	CommandHalt,
	CommandStop,
	CommandNormalStart,
	CommandForceStart,
	CommandDirect,
	CommandIndirect,
	CommandKickoff,
	CommandPenalty,
	CommandTimeout,
	CommandBallPlacement,
}

// Valid checks if the RefCommand enum value is among the known values
func (c RefCommand) Valid() bool {
	for _, command := range RefCommands {
		if command == c {
			return true
		}
	}
	return false
}

func (c RefCommand) ContinuesGame() bool {
	switch c {
	case CommandNormalStart,
		CommandForceStart,
		CommandDirect,
		CommandIndirect,
		CommandPenalty,
		CommandKickoff:
		return true
	default:
		return false
	}
}

func (c RefCommand) NeedsTeam() bool {
	switch c {
	case CommandUnknown,
		CommandHalt,
		CommandStop,
		CommandNormalStart,
		CommandForceStart:
		return false
	case CommandDirect,
		CommandIndirect,
		CommandKickoff,
		CommandPenalty,
		CommandTimeout,
		CommandBallPlacement:
		return true
	default:
		log.Fatal("Missing case for command ", c)
		return false
	}
}

func (c RefCommand) IsFreeKick() bool {
	return c == CommandDirect || c == CommandIndirect
}

func (c RefCommand) IsPrepare() bool {
	return c == CommandKickoff || c == CommandPenalty
}
