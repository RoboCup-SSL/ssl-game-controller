package state

// Valid checks if the Stage enum value is among the known values
func (x Referee_Stage) Valid() bool {
	_, ok := Referee_Stage_name[int32(x)]
	return ok
}

// Next returns the next stage if there is one, or itself else
func (x Referee_Stage) Next() *Referee_Stage {
	next := Referee_Stage(int32(x) + 1)
	if next.Valid() {
		return &next
	}
	return &x
}

// Previous returns the previous stage if there is one, or itself else
func (x Referee_Stage) Previous() *Referee_Stage {
	next := Referee_Stage(int32(x) - 1)
	if next.Valid() {
		return &next
	}
	return &x
}

// IsPreStage returns true if this is one of the pre stages
func (x Referee_Stage) IsPreStage() bool {
	switch x {
	case Referee_NORMAL_FIRST_HALF_PRE, Referee_NORMAL_SECOND_HALF_PRE, Referee_EXTRA_FIRST_HALF_PRE, Referee_EXTRA_SECOND_HALF_PRE:
		return true
	}
	return false
}

// IsPausedStage returns true if this stage indicates a break
func (x Referee_Stage) IsPausedStage() bool {
	switch x {
	case Referee_NORMAL_HALF_TIME, Referee_EXTRA_TIME_BREAK, Referee_EXTRA_HALF_TIME, Referee_PENALTY_SHOOTOUT_BREAK:
		return true
	}
	return false
}

// SuggestEndMatch returns true if end match should be suggested to user
func (x Referee_Stage) SuggestEndMatch() bool {
	switch x {
	case Referee_NORMAL_SECOND_HALF,
		Referee_EXTRA_TIME_BREAK,
		Referee_EXTRA_SECOND_HALF,
		Referee_PENALTY_SHOOTOUT_BREAK:
		return true
	}
	return false
}
