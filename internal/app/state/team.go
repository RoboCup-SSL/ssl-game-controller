package state

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
