package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/store"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/golang/protobuf/ptypes"
	"github.com/pkg/errors"
	"log"
	"time"
)

var changeOriginEngine = "Engine"

// Engine listens for changes and runs ticks to update the current state using the state machine
type Engine struct {
	gameConfig      config.Game
	stateStore      *store.Store
	currentState    *state.State
	stateMachine    *statemachine.StateMachine
	queue           chan *statemachine.Change
	hooks           []chan *statemachine.StateChange
	timeProvider    timer.TimeProvider
	lastTimeUpdate  time.Time
	readyToContinue *bool
	ballPlaced      *bool
}

// NewEngine creates a new engine
func NewEngine(gameConfig config.Game) (s *Engine) {
	s = new(Engine)
	s.stateStore = store.NewStore(gameConfig.StateStoreFile)
	s.stateMachine = statemachine.NewStateMachine(gameConfig)
	s.queue = make(chan *statemachine.Change, 100)
	s.hooks = []chan *statemachine.StateChange{}
	s.timeProvider = func() time.Time { return time.Now() }
	s.lastTimeUpdate = s.timeProvider()
	return
}

// Enqueue adds the change to the change queue
func (e *Engine) Enqueue(change *statemachine.Change) {
	e.queue <- change
}

// RegisterHook registers given hook for post processing after each change
func (e *Engine) RegisterHook(hook chan *statemachine.StateChange) {
	e.hooks = append(e.hooks, hook)
}

// UnregisterHook unregisters hooks that were registered before
func (e *Engine) UnregisterHook(hook chan *statemachine.StateChange) bool {
	for i, h := range e.hooks {
		if h == hook {
			e.hooks = append(e.hooks[:i], e.hooks[i+1:]...)
			select {
			case <-hook:
			case <-time.After(10 * time.Millisecond):
			}
			return true
		}
	}
	return false
}

// Start loads the state store and runs a go routine that consumes the change queue
func (e *Engine) Start() error {
	if err := e.stateStore.Open(); err != nil {
		return errors.Wrap(err, "Could not open state store")
	}
	if err := e.stateStore.Load(); err != nil {
		return errors.Wrap(err, "Could not load state store")
	}
	e.currentState = e.initialStateFromStore()
	e.stateMachine.UpdateGeometry(e.gameConfig.DefaultGeometry[e.currentState.Division.Div()])
	go e.processChanges()
	return nil
}

// Stop stops the go routine that processes the change queue
func (e *Engine) Stop() {
	close(e.queue)
}

// CurrentState returns the current state
func (e *Engine) CurrentState() *state.State {
	return e.currentState
}

// processChanges listens for new changes on the queue and triggers ticks when there are no changes
func (e *Engine) processChanges() {
	for {
		select {
		case change, ok := <-e.queue:
			if !ok {
				return
			}
			entry := statemachine.StateChange{}
			entry.Change = change
			var newChanges []*statemachine.Change
			entry.State, newChanges = e.stateMachine.Process(e.currentState, change)
			e.currentState = entry.State

			e.postProcessChange(change)

			for _, newChange := range newChanges {
				e.queue <- newChange
			}

			// do not save state for ticks
			if err := e.stateStore.Add(&entry); err != nil {
				log.Println("Could not add new state to store: ", err)
			}
			for _, hook := range e.hooks {
				hook <- &entry
			}
		case <-time.After(10 * time.Millisecond):
			e.Tick()
		}
	}
}

// initialStateFromStore gets the current state or returns a new default state
func (e *Engine) initialStateFromStore() *state.State {
	latestEntry := e.stateStore.LatestEntry()
	if latestEntry == nil {
		return state.NewState()
	}
	return latestEntry.State
}

// postProcessChange performs synchronous post processing steps
func (e *Engine) postProcessChange(change *statemachine.Change) {
	if change.ChangeStage != nil &&
		*change.ChangeStage.NewStage == state.Referee_NORMAL_FIRST_HALF {
		e.currentState.MatchTimeStart, _ = ptypes.TimestampProto(e.timeProvider())
	}
}
