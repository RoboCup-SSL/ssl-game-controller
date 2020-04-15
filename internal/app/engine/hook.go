package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
)

type HookOut struct {
	Change *statemachine.Change
	State  *state.State
}

// RegisterHook registers given hook for post processing after each change
func (e *Engine) RegisterHook(hook chan HookOut) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	e.hooks = append(e.hooks, hook)
}

// UnregisterHook unregisters hooks that were registered before
func (e *Engine) UnregisterHook(hook chan HookOut) bool {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	for i, h := range e.hooks {
		if h == hook {
			e.hooks = append(e.hooks[:i], e.hooks[i+1:]...)
			select {
			case <-hook:
			default:
			}
			return true
		}
	}
	return false
}
