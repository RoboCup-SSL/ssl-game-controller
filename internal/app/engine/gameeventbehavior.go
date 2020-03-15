package engine

type GameEventBehavior string

const (
	GameEventBehaviorOn       GameEventBehavior = "on"
	GameEventBehaviorMajority GameEventBehavior = "majority"
	GameEventBehaviorOff      GameEventBehavior = "off"
)

// GameEventBehaviors contain all known command enum constants
var GameEventBehaviors = []GameEventBehavior{GameEventBehaviorOn, GameEventBehaviorMajority, GameEventBehaviorOff}

// Valid checks if the GameEventBehavior enum value is among the known values
func (b GameEventBehavior) Valid() bool {
	for _, behavior := range GameEventBehaviors {
		if behavior == b {
			return true
		}
	}
	return false
}
