package state

// BothTeams returns a list with both teams
func BothTeams() []SSL_Team {
	return []SSL_Team{SSL_Team_YELLOW, SSL_Team_BLUE}
}

// Unknown returns true if the team is not blue or yellow
func (x SSL_Team) Unknown() bool {
	return x != SSL_Team_YELLOW && x != SSL_Team_BLUE
}

// Known returns true if the team is blue or yellow
func (x SSL_Team) Known() bool {
	return x == SSL_Team_YELLOW || x == SSL_Team_BLUE
}

// Opposite returns the other team
// if the team is not Yellow or Blue, return the same team
func (x SSL_Team) Opposite() SSL_Team {
	if x == SSL_Team_YELLOW {
		return SSL_Team_BLUE
	} else if x == SSL_Team_BLUE {
		return SSL_Team_YELLOW
	}
	return x
}
