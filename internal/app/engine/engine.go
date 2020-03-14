package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/store"
	"github.com/pkg/errors"
	"log"
)

type Engine struct {
	stateStore *store.Store
	queue      chan statemachine.Change
	quit       chan int
	hooks      []chan store.StateEntry
}

func NewEngine(stateStoreFilename string) (s *Engine) {
	s = new(Engine)
	s.stateStore = store.NewStore(stateStoreFilename)
	s.queue = make(chan statemachine.Change, 10)
	s.quit = make(chan int)
	s.hooks = []chan store.StateEntry{}
	return
}

func (e *Engine) Enqueue(change statemachine.Change) {
	e.queue <- change
}

func (e *Engine) RegisterHook(hook chan store.StateEntry) {
	e.hooks = append(e.hooks, hook)
}

func (e *Engine) UnregisterHook(hook chan store.StateEntry) bool {
	for i, h := range e.hooks {
		if h == hook {
			e.hooks = append(e.hooks[:i], e.hooks[i+1:]...)
			return true
		}
	}
	return false
}

func (e *Engine) Start() error {
	if err := e.stateStore.Open(); err != nil {
		return errors.Wrap(err, "Could not open state store")
	}
	if err := e.stateStore.Load(); err != nil {
		return errors.Wrap(err, "Could not load state store")
	}
	go e.processChanges()
	return nil
}

func (e *Engine) Stop() {
	e.quit <- 0
}

func (e *Engine) State() *state.State {
	return e.stateStore.LatestState()
}

func (e *Engine) processChanges() {
	for {
		select {
		case <-e.quit:
			return
		case change := <-e.queue:
			newState := statemachine.Process(e.stateStore.LatestState(), change)
			entry := store.StateEntry{
				State:  *newState,
				Change: change,
			}
			err := e.stateStore.Add(entry)
			if err != nil {
				log.Println("Could not add new state to store: ", err)
			} else {
				for _, hook := range e.hooks {
					hook <- entry
				}
			}
		}
	}
}
