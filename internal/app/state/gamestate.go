package state

func NewGameStateNeutral(t GameState_Type) *GameState {
	return &GameState{
		Type:    &t,
		ForTeam: nil,
	}
}

func NewGameStateWithTeam(t GameState_Type, forTeam Team) *GameState {
	return &GameState{
		Type:    &t,
		ForTeam: &forTeam,
	}
}
