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

func (x *GameState) IsHalted() bool {
	switch *x.Type {
	case GameState_HALT, GameState_TIMEOUT:
		return true
	}
	return false
}
