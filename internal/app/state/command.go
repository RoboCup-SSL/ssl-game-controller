package state

import "log"

// NewCommand creates a new command
func NewCommand(t Command_Type, forTeam Team) (c *Command) {
	return &Command{Type: &t, ForTeam: &forTeam}
}

// NewCommandNeutral creates a new command without a team
func NewCommandNeutral(t Command_Type) (c *Command) {
	return &Command{Type: &t}
}

// NeedsTeam returns true if the command must be specialized with a team
func (m Command) NeedsTeam() bool {
	switch *m.Type {
	case Command_UNKNOWN,
		Command_HALT,
		Command_STOP,
		Command_NORMAL_START,
		Command_FORCE_START:
		return false
	case Command_DIRECT,
		Command_INDIRECT,
		Command_KICKOFF,
		Command_PENALTY,
		Command_TIMEOUT,
		Command_BALL_PLACEMENT:
		return true
	default:
		log.Fatal("Missing case for command ", m)
		return false
	}
}

func (m Command) IsRunning() bool {
	switch *m.Type {
	case Command_DIRECT,
		Command_INDIRECT,
		Command_NORMAL_START,
		Command_FORCE_START:
		return true
	}
	return false
}

func (m Command) IsPrepare() bool {
	switch *m.Type {
	case Command_PENALTY,
		Command_KICKOFF:
		return true
	}
	return false
}
