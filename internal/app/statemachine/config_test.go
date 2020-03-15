package statemachine

import (
	"testing"
)

func Test_Config(t *testing.T) {

	cfg := DefaultConfig()

	if len(cfg.GameEventBehavior) == 0 {
		t.Errorf("Expcted loaded game event behaviors")
	}
}
