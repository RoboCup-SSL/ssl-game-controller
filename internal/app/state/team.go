package state

import "github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"

// Team is one of Yellow or Blue
type Team string

const (
	// TeamYellow is the yellow team
	TeamYellow Team = "Yellow"
	// TeamBlue is the blue team
	TeamBlue Team = "Blue"
	// TeamUnknown is an unknown team
	TeamUnknown Team = ""
	// TeamBoth are both teams
	TeamBoth = "Both"
)

// Opposite returns the other team
// if the team is not Yellow or Blue, return the same team
func (t Team) Opposite() Team {
	if t == TeamYellow {
		return TeamBlue
	} else if t == TeamBlue {
		return TeamYellow
	}
	return t
}

// Unknown returns true if the team is not blue or yellow
func (t Team) Unknown() bool {
	return t != "Yellow" && t != "Blue"
}

// Known returns true if the team is blue or yellow
func (t Team) Known() bool {
	return !t.Unknown()
}

// toProto converts the Team to a protobuf Team
func (t Team) toProto() refproto.Team {
	if t == TeamYellow {
		return refproto.Team_YELLOW
	} else if t == TeamBlue {
		return refproto.Team_BLUE
	}
	return refproto.Team_UNKNOWN
}

// Is returns true, if the team is equal to given team, respecting unknown and both accordingly
func (t Team) Is(team Team) bool {
	if team == TeamUnknown {
		return false
	}
	if t == TeamBoth {
		return true
	}
	return t == team
}

// NewTeam creates a team from a protobuf team. Its either a single team or unknown. Not both.
func NewTeam(team refproto.Team) Team {
	if team == refproto.Team_YELLOW {
		return TeamYellow
	} else if team == refproto.Team_BLUE {
		return TeamBlue
	}
	return TeamUnknown
}

// Teams contain all known team enum constants
var Teams = []Team{TeamYellow, TeamBlue, TeamBoth, TeamUnknown}

// Valid checks if the Team enum value is among the known values
func (t Team) Valid() bool {
	for _, team := range Teams {
		if team == t {
			return true
		}
	}
	return false
}
