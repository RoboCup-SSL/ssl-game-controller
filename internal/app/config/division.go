package config

type Division string

const (
	DivA Division = "DivA"
	DivB Division = "DivB"
)

// Division contain all known command enum constants
var Divisions = []Division{DivA, DivB}

// Valid checks if the Division enum value is among the known values
func (g Division) Valid() bool {
	for _, division := range Divisions {
		if division == g {
			return true
		}
	}
	return false
}
