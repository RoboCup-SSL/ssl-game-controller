package api

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
)

type Input struct {
	Change *statemachine.Change `json:"change,omitempty" yaml:"change"`
}
