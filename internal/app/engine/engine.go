package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/store"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/pkg/errors"
	"log"
	"math/rand"
	"time"
)

const changeOriginEngine = "Engine"

type Engine struct {
	stateStore     *store.Store
	currentState   *state.State
	stateMachine   *statemachine.StateMachine
	queue          chan statemachine.Change
	quit           chan int
	hooks          []chan statemachine.StateChange
	rand           *rand.Rand
	timeProvider   timer.TimeProvider
	lastTimeUpdate time.Time
}

func NewEngine(stateMachine *statemachine.StateMachine, seed int64, storeFilename string) (s *Engine) {
	s = new(Engine)
	s.stateStore = store.NewStore(storeFilename)
	s.currentState = &state.State{}
	s.stateMachine = stateMachine
	s.queue = make(chan statemachine.Change, 100)
	s.quit = make(chan int)
	s.hooks = []chan statemachine.StateChange{}
	s.rand = rand.New(rand.NewSource(seed))
	s.timeProvider = func() time.Time { return time.Now() }
	s.lastTimeUpdate = s.timeProvider()
	return
}

func (e *Engine) Enqueue(change statemachine.Change) {
	e.queue <- change
}

func (e *Engine) RegisterHook(hook chan statemachine.StateChange) {
	e.hooks = append(e.hooks, hook)
}

func (e *Engine) UnregisterHook(hook chan statemachine.StateChange) bool {
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
	e.currentState = e.initialStateFromStore()
	go e.processChanges()
	return nil
}

func (e *Engine) Stop() {
	e.quit <- 0
}

func (e *Engine) LatestStateInStore() *state.State {
	entry := e.stateStore.LatestEntry()
	if entry != nil {
		return entry.State
	}
	return nil
}

func (e *Engine) processChanges() {
	for {
		select {
		case <-e.quit:
			if err := e.stateMachine.Save(); err != nil {
				log.Printf("Could not save state machine config: %v", err)
			}
			return
		case change := <-e.queue:
			newState, newChanges := e.stateMachine.Process(e.currentState, change)
			entry := statemachine.StateChange{
				State:  newState,
				Change: change,
			}
			e.currentState = newState

			for _, newChange := range newChanges {
				e.queue <- newChange
			}

			// do not save state for ticks
			if err := e.stateStore.Add(store.Entry(entry)); err != nil {
				log.Println("Could not add new state to store: ", err)
			}
			for _, hook := range e.hooks {
				hook <- entry
			}
		case <-time.After(10 * time.Millisecond):
			e.Tick()
		}
	}
}

// currentState gets the current state or returns an empty default state
func (e *Engine) initialStateFromStore() *state.State {
	latestEntry := e.stateStore.LatestEntry()
	var currentState *state.State
	if latestEntry == nil {
		currentState = &state.State{}
	} else {
		currentState = latestEntry.State.DeepCopy()
	}
	return currentState
}
