package state

import "log"

// NewCommand creates a new command
func NewCommand(t Command_Type, forTeam Team) (c *Command) {
	return &Command{Type: &t, ForTeam: &forTeam}
}

// NewCommandNeutral creates a new command without a team
func NewCommandNeutral(t Command_Type) (c *Command) {
	forTeam := Team_UNKNOWN
	return &Command{Type: &t, ForTeam: &forTeam}
}

// NeedsTeam returns true if the command must be specialized with a team
func (x *Command) NeedsTeam() bool {
	switch *x.Type {
	case Command_UNKNOWN,
		Command_HALT,
		Command_STOP,
		Command_NORMAL_START,
		Command_FORCE_START:
		return false
	case Command_DIRECT,
		Command_KICKOFF,
		Command_PENALTY,
		Command_TIMEOUT,
		Command_BALL_PLACEMENT:
		return true
	default:
		log.Fatal("Missing case for command ", x)
		return false
	}
}

// IsRunning returns true, if the current commands indicates that the game is running (the ball is in play)
func (x *Command) IsRunning() bool {
	switch *x.Type {
	case Command_DIRECT,
		Command_NORMAL_START,
		Command_FORCE_START:
		return true
	}
	return false
}

// IsPrepare returns true, if the current command is a prepare command
func (x *Command) IsPrepare() bool {
	switch *x.Type {
	case Command_PENALTY,
		Command_KICKOFF:
		return true
	}
	return false
}
