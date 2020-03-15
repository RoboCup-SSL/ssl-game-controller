package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"testing"
)

func Test_Config(t *testing.T) {

	gameConfig := config.DefaultControllerConfig().Game
	cfg := DefaultConfig(gameConfig, 0)

	if len(cfg.stageTimes) == 0 {
		t.Errorf("Expected loaded stage times")
	}

	if len(cfg.GameEventBehavior) == 0 {
		t.Errorf("Expcted loaded game event behaviors")
	}
}
