package state

// BothTeams returns a list with both teams
func BothTeams() []Team {
	return []Team{Team_YELLOW, Team_BLUE}
}

// Unknown returns true if the team is not blue or yellow
func (x Team) Unknown() bool {
	return x != Team_YELLOW && x != Team_BLUE
}

// Known returns true if the team is blue or yellow
func (x Team) Known() bool {
	return x == Team_YELLOW || x == Team_BLUE
}

// Opposite returns the other team
// if the team is not Yellow or Blue, return the same team
func (x Team) Opposite() Team {
	if x == Team_YELLOW {
		return Team_BLUE
	} else if x == Team_BLUE {
		return Team_YELLOW
	}
	return x
}

// NewTeam allocates a new Team object and assigns the given value
func NewTeam(team Team) *Team {
	t := new(Team)
	*t = team
	return t
}
