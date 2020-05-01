package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
)

type HookOut struct {
	Change *statemachine.Change
	State  *state.State
}

// RegisterHook registers given hook for post processing after each change
func (e *Engine) RegisterHook(name string, hook chan HookOut) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	if _, ok := e.hooks[name]; ok {
		log.Printf("Hook %v already registered!", name)
	}
	e.hooks[name] = hook
}

// UnregisterHook unregisters hooks that were registered before
func (e *Engine) UnregisterHook(name string) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	if hook, ok := e.hooks[name]; ok {
		select {
		case <-hook:
		default:
		}
	}
	delete(e.hooks, name)
}
