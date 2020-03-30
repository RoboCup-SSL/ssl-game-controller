package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/store"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/ptypes"
	"github.com/pkg/errors"
	"log"
	"sync"
	"time"
)

var changeOriginEngine = "Engine"

// Engine listens for changes and runs ticks to update the current state using the state machine
type Engine struct {
	gameConfig     config.Game
	stateStore     *store.Store
	currentState   *state.State
	stateMachine   *statemachine.StateMachine
	queue          chan *statemachine.Change
	hooks          []chan *statemachine.StateChange
	timeProvider   timer.TimeProvider
	lastTimeUpdate time.Time
	gcState        *GcState
	gcStateMutex   sync.Mutex
}

// NewEngine creates a new engine
func NewEngine(gameConfig config.Game) (s *Engine) {
	s = new(Engine)
	s.gameConfig = gameConfig
	s.stateStore = store.NewStore(gameConfig.StateStoreFile)
	s.stateMachine = statemachine.NewStateMachine(gameConfig)
	s.queue = make(chan *statemachine.Change, 100)
	s.hooks = []chan *statemachine.StateChange{}
	s.timeProvider = func() time.Time { return time.Now() }
	s.lastTimeUpdate = s.timeProvider()
	s.gcState = new(GcState)
	s.gcState.TeamState = map[string]*GcStateTeam{
		state.Team_YELLOW.String(): new(GcStateTeam),
		state.Team_BLUE.String():   new(GcStateTeam),
	}
	return
}

// Enqueue adds the change to the change queue
func (e *Engine) Enqueue(change *statemachine.Change) {
	if change.Revertible == nil {
		change.Revertible = new(bool)
		// Assume that changes from outside are by default revertible, except if the flag is already set
		*change.Revertible = true
	}
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

// CurrentState returns a deep copy of the current state
func (e *Engine) CurrentState() (s *state.State) {
	s = new(state.State)
	proto.Merge(s, e.currentState)
	return
}

// CurrentGcState returns a deep copy of the current GC state
func (e *Engine) CurrentGcState() (s *GcState) {
	s = new(GcState)
	proto.Merge(s, e.gcState)
	return
}

func (e *Engine) UpdateGcState(fn func(gcState *GcState)) {
	e.gcStateMutex.Lock()
	defer e.gcStateMutex.Unlock()
	fn(e.gcState)
}

// LatestChangesUntil returns all changes with a id larger than the given id
func (e *Engine) LatestChangesUntil(id int32) (changes []*statemachine.StateChange) {
	for _, change := range e.stateStore.Entries() {
		if *change.Id > id {
			changes = append(changes, change)
		}
	}
	return
}

// processChanges listens for new changes on the queue and triggers ticks when there are no changes
func (e *Engine) processChanges() {
	for {
		select {
		case change, ok := <-e.queue:
			if !ok {
				return
			}
			e.processChange(change)
		case <-time.After(10 * time.Millisecond):
			e.Tick()
		}
	}
}

func (e *Engine) processChange(change *statemachine.Change) {

	var newChanges []*statemachine.Change
	entry := statemachine.StateChange{}
	entry.Change = change
	entry.StatePre = new(state.State)
	entry.Timestamp, _ = ptypes.TimestampProto(e.timeProvider())
	proto.Merge(entry.StatePre, e.currentState)

	if change.GetRevert() != nil {
		if change.GetRevert().ChangeId == nil {
			log.Printf("Missing change id in revert change")
			return
		}
		entryToRevert := e.stateStore.FindEntry(*change.GetRevert().ChangeId)
		if entryToRevert == nil {
			log.Printf("Could not find state id %v. Can not revert.", *change.GetRevert().ChangeId)
			return
		} else {
			entry.State = entryToRevert.StatePre
			if *entry.State.Command.Type != state.Command_HALT {
				// halt the game after a revert - just to be save
				haltChange := statemachine.Change{
					Change: &statemachine.Change_NewCommand{
						NewCommand: &statemachine.NewCommand{
							Command: state.NewCommandNeutral(state.Command_HALT),
						},
					},
				}
				revertible := false
				origin := changeOriginEngine
				haltChange.Revertible = &revertible
				haltChange.Origin = &origin
				newChanges = append(newChanges, &haltChange)
			}
		}
	} else {
		entry.State, newChanges = e.stateMachine.Process(e.currentState, change)
	}

	e.currentState = entry.State

	e.postProcessChange(change)

	for _, newChange := range newChanges {
		e.queue <- newChange
	}

	if err := e.stateStore.Add(&entry); err != nil {
		log.Println("Could not add new state to store: ", err)
	}
	for _, hook := range e.hooks {
		hook <- &entry
	}
}

// initialStateFromStore gets the current state or returns a new default state
func (e *Engine) initialStateFromStore() *state.State {
	latestEntry := e.stateStore.LatestEntry()
	if latestEntry == nil {
		return e.createInitialState()
	}
	return latestEntry.State
}

func (e *Engine) createInitialState() (s *state.State) {
	s = state.NewState()
	s.Division = state.ToDiv(e.gameConfig.DefaultDivision)
	for _, team := range state.BothTeams() {
		*s.TeamInfo(team).TimeoutsLeft = e.gameConfig.Normal.Timeouts
		s.TeamInfo(team).TimeoutTimeLeft = ptypes.DurationProto(e.gameConfig.Normal.TimeoutDuration)
		*s.TeamInfo(team).MaxAllowedBots = e.gameConfig.MaxBots[e.gameConfig.DefaultDivision]
	}
	return
}

// postProcessChange performs synchronous post processing steps
func (e *Engine) postProcessChange(change *statemachine.Change) {
	if change.GetChangeStage() != nil &&
		*change.GetChangeStage().NewStage == state.Referee_NORMAL_FIRST_HALF {
		e.currentState.MatchTimeStart, _ = ptypes.TimestampProto(e.timeProvider())
	}
}
