package state

import "github.com/pkg/errors"

// Stage represents the different stages of a game
type Stage string

const (
	// StagePreGame before game has started
	StagePreGame Stage = "Pre-First Half"
	// StageFirstHalf in first half
	StageFirstHalf Stage = "First Half"
	// StageHalfTime in half time
	StageHalfTime Stage = "Half Time"
	// StageSecondHalfPre before second half
	StageSecondHalfPre Stage = "Pre-Second Half"
	// StageSecondHalf in second half
	StageSecondHalf Stage = "Second Half"
	// StageOvertimeBreak in break to overtime
	StageOvertimeBreak Stage = "Overtime Break"
	// StageOvertimeFirstHalfPre before first overtime half
	StageOvertimeFirstHalfPre Stage = "Pre-Overtime First Half"
	// StageOvertimeFirstHalf in first overtime half
	StageOvertimeFirstHalf Stage = "Overtime First Half"
	// StageOvertimeHalfTime in overtime half time
	StageOvertimeHalfTime Stage = "Overtime Half Time"
	// StageOvertimeSecondHalfPre before second overtime half
	StageOvertimeSecondHalfPre Stage = "Pre-Overtime Second Half"
	// StageOvertimeSecondHalf in second overtime half
	StageOvertimeSecondHalf Stage = "Overtime Second Half"
	// StageShootoutBreak in break to shootout
	StageShootoutBreak Stage = "Shootout Break"
	// StageShootout in Shootout
	StageShootout Stage = "Shootout"
	// StagePostGame after game ended
	StagePostGame Stage = "End of Game"
)

// Stages include all available stages, ordered
var Stages = []Stage{
	StagePreGame,
	StageFirstHalf,
	StageHalfTime,
	StageSecondHalfPre,
	StageSecondHalf,
	StageOvertimeBreak,
	StageOvertimeFirstHalfPre,
	StageOvertimeFirstHalf,
	StageOvertimeHalfTime,
	StageOvertimeSecondHalfPre,
	StageOvertimeSecondHalf,
	StageShootoutBreak,
	StageShootout,
	StagePostGame,
}

// Valid checks if the Stage enum value is among the known values
func (s Stage) Valid() bool {
	for _, stage := range Stages {
		if stage == s {
			return true
		}
	}
	return false
}

func (s Stage) index() (int, error) {
	for i, v := range Stages {
		if v == s {
			return i, nil
		}
	}
	return 0, errors.Errorf("unknown stage: %v", s)
}

func (s Stage) Next() Stage {
	index, err := s.index()
	if err != nil {
		return s
	}
	nextIndex := index + 1
	if nextIndex >= len(Stages) {
		return s
	}
	return Stages[nextIndex]
}

func (s Stage) Previous() Stage {
	index, err := s.index()
	if err != nil {
		return s
	}
	nextIndex := index - 1
	if nextIndex < 0 {
		return s
	}
	return Stages[nextIndex]
}

func (s Stage) IsPreStage() bool {
	switch s {
	case StagePreGame, StageSecondHalfPre, StageOvertimeFirstHalfPre, StageOvertimeSecondHalfPre:
		return true
	}
	return false
}

func (s Stage) IsPausedStage() bool {
	switch s {
	case StageHalfTime, StageOvertimeBreak, StageOvertimeHalfTime, StageShootoutBreak:
		return true
	}
	return false
}
