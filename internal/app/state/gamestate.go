package state

func NewGameStateNeutral(t GameState_Type) *GameState {
	return &GameState{
		Type:    &t,
		ForTeam: nil,
	}
}

func NewGameStateWithTeam(t GameState_Type, forTeam SSL_Team) *GameState {
	return &GameState{
		Type:    &t,
		ForTeam: &forTeam,
	}
}
