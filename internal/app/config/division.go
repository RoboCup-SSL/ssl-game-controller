package config

type Division string

const (
	DivA Division = "DIV_A"
	DivB Division = "DIV_B"
)

// Divisions contain all known command enum constants
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
