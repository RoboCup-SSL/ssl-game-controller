package statemachine

func (s *StateMachine) UpdateConfig(change *UpdateConfig) (changes []Change) {
	if change.Division != nil {
		s.cfg.Division = *change.Division
	}
	if change.FirstKickoffTeam != nil {
		s.cfg.FirstKickoffTeam = *change.FirstKickoffTeam
	}
	if change.AutoContinue != nil {
		s.cfg.AutoContinue = *change.AutoContinue
	}
	for eventType, behavior := range change.GameEventBehavior {
		s.cfg.GameEventBehavior[eventType] = behavior
	}
	return
}
