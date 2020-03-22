package api

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
)

type Output struct {
	MatchState state.State         `json:"matchState"`
	GcState    GameControllerState `json:"gcState"`
}

type GameControllerState struct {
	AutoRefsConnected      []string            `json:"autoRefsConnected" yaml:"autoRefsConnected"`
	TeamConnected          map[state.Team]bool `json:"teamConnected" yaml:"teamConnected"`
	TeamConnectionVerified map[state.Team]bool `json:"teamConnectionVerified" yaml:"teamConnectionVerified"`
}
