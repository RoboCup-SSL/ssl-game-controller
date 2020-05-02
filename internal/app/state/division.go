package state

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"

// Div converts the protobuf division into the config division
func (x *Division) Div() config.Division {
	return config.Division(x.String())
}

// ToDiv converts the config division into the protobuf division
func ToDiv(div config.Division) *Division {
	protoDiv := Division(Division_value[string(div)])
	return &protoDiv
}
