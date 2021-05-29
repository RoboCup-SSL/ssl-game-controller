package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
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
	engineConfig             config.Engine
	config                   Config
	gameConfig               config.Game
	stateStore               *store.Store
	currentState             *state.State
	stateMachine             *statemachine.StateMachine
	queue                    chan *statemachine.Change
	hooks                    map[string]chan HookOut
	timeProvider             timer.TimeProvider
	lastTimeUpdate           time.Time
	gcState                  *GcState
	trackerLastUpdate        map[string]time.Time
	mutex                    sync.Mutex
	noProgressDetector       NoProgressDetector
	ballPlacementCoordinator BallPlacementCoordinator
	tickChanProvider         func() <-chan time.Time
}

// NewEngine creates a new engine
func NewEngine(gameConfig config.Game, engineConfig config.Engine) (e *Engine) {
	e = new(Engine)
	e.engineConfig = engineConfig
	e.config.LoadControllerConfig(engineConfig.ConfigFilename)
	e.gameConfig = gameConfig
	e.stateStore = store.NewStore(gameConfig.StateStoreFile)
	e.stateMachine = statemachine.NewStateMachine(gameConfig)
	e.queue = make(chan *statemachine.Change, 100)
	e.hooks = map[string]chan HookOut{}
	e.SetTimeProvider(func() time.Time { return time.Now() })
	e.gcState = new(GcState)
	e.gcState.TeamState = map[string]*GcStateTeam{
		state.Team_YELLOW.String(): new(GcStateTeam),
		state.Team_BLUE.String():   new(GcStateTeam),
	}
	e.gcState.AutoRefState = map[string]*GcStateAutoRef{}
	e.gcState.TrackerState = map[string]*GcStateTracker{}
	e.gcState.TrackerStateGc = &GcStateTracker{}
	e.trackerLastUpdate = map[string]time.Time{}
	e.noProgressDetector = NoProgressDetector{gcEngine: e}
	e.ballPlacementCoordinator = BallPlacementCoordinator{gcEngine: e}
	e.tickChanProvider = func() <-chan time.Time {
		return time.After(25 * time.Millisecond)
	}
	return
}

// Enqueue adds the change to the change queue
func (e *Engine) Enqueue(change *statemachine.Change) {
	if change.GetAddGameEvent() != nil {
		change = e.filterGameEvent(change)
		if change == nil {
			return
		}
	}
	if change.Revertible == nil {
		change.Revertible = new(bool)
		// Assume that changes from outside are by default revertible, except if the flag is already set
		*change.Revertible = true
	}
	e.queue <- change
}

func (e *Engine) filterGameEvent(change *statemachine.Change) *statemachine.Change {
	gameEvent := change.GetAddGameEvent().GameEvent
	behavior := e.config.GameEventBehavior[gameEvent.Type.String()]
	switch behavior {
	case Config_BEHAVIOR_ACCEPT, Config_BEHAVIOR_UNKNOWN:
		return change
	case Config_BEHAVIOR_ACCEPT_MAJORITY, Config_BEHAVIOR_PROPOSE_ONLY:
		timestamp, _ := ptypes.TimestampProto(e.timeProvider())
		return &statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AddProposal{
				AddProposal: &statemachine.AddProposal{
					Proposal: &state.Proposal{
						Timestamp: timestamp,
						GameEvent: gameEvent,
					},
				},
			},
		}
	case Config_BEHAVIOR_LOG:
		return &statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AddPassiveGameEvent{
				AddPassiveGameEvent: &statemachine.AddPassiveGameEvent{
					GameEvent: gameEvent,
				},
			},
		}
	case Config_BEHAVIOR_IGNORE:
		log.Printf("Ignoring game event: %v", *gameEvent)
	}
	return nil
}

// getGeometry returns the current geometry
func (e *Engine) getGeometry() config.Geometry {
	return e.stateMachine.Geometry
}

// SetTimeProvider sets a new time provider for this engine
func (e *Engine) SetTimeProvider(provider timer.TimeProvider) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	e.timeProvider = provider
	e.lastTimeUpdate = e.timeProvider()
	e.stateMachine.SetTimeProvider(provider)
}

// SetTickChanProvider sets an alternative provider for the tick channel
func (e *Engine) SetTickChanProvider(provider func() <-chan time.Time) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	e.tickChanProvider = provider
}

// Start loads the state store and runs a go routine that consumes the change queue
func (e *Engine) Start() error {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	if err := e.stateStore.Open(); err != nil {
		return errors.Wrap(err, "Could not open state store")
	}
	if err := e.stateStore.Load(); err != nil {
		return errors.Wrap(err, "Could not load state store")
	}
	e.currentState = e.initialStateFromStore()
	e.stateMachine.Geometry = e.gameConfig.DefaultGeometry[e.currentState.Division.Div()]
	go e.processChanges()
	return nil
}

// Stop stops the go routine that processes the change queue
func (e *Engine) Stop() {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	close(e.queue)
	if err := e.stateStore.Close(); err != nil {
		log.Printf("Could not close store: %v", err)
	}
}

// CurrentState returns a deep copy of the current state
func (e *Engine) CurrentState() (s *state.State) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	return e.currentState.Clone()
}

// CurrentGcState returns a deep copy of the current GC state
func (e *Engine) CurrentGcState() (s *GcState) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	s = new(GcState)
	proto.Merge(s, e.gcState)
	return
}

func (e *Engine) UpdateGcState(fn func(gcState *GcState)) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	fn(e.gcState)
}

// LatestChangesUntil returns all changes with a id larger than the given id
func (e *Engine) LatestChangesUntil(id int32) (changes []*statemachine.StateChange) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	for _, change := range e.stateStore.Entries() {
		if *change.Id > id {
			changes = append(changes, change)
		}
	}
	return
}

// LatestChangeId returns the latest change id or -1, if there is no change
func (e *Engine) LatestChangeId() int32 {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	entries := e.stateStore.Entries()
	if len(entries) > 0 {
		return *entries[len(entries)-1].Id
	}
	return -1
}

// processChanges listens for new changes on the queue and triggers ticks when there are no changes
func (e *Engine) processChanges() {
	for {
		select {
		case change, ok := <-e.queue:
			if !ok {
				return
			}
			e.processChangeList([]*statemachine.Change{change})
		case <-e.tickChanProvider():
			e.processTick()
		}
	}
}

// ResetMatch creates a backup of the current state store, removes it and starts with a fresh state
func (e *Engine) ResetMatch() {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	if err := e.stateStore.Reset(); err != nil {
		log.Printf("Could not reset store: %v", err)
	} else {
		e.currentState = e.initialStateFromStore()
	}
}

func (e *Engine) processChangeList(changes []*statemachine.Change) {
	var newChanges []*statemachine.Change
	for _, change := range changes {
		newChanges = append(newChanges, e.processChange(change)...)
	}
	if len(newChanges) > 0 {
		e.processChangeList(newChanges)
	}
	return
}

func (e *Engine) processChange(change *statemachine.Change) (newChanges []*statemachine.Change) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	log.Printf("Engine: Process change '%v'", change.StringJson())

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

	e.currentState = entry.State.Clone()

	e.postProcessChange(entry)

	log.Println("Add entry to state store")
	if err := e.stateStore.Add(&entry); err != nil {
		log.Println("Could not add new state to store: ", err)
	}
	stateCopy := e.currentState.Clone()
	hookOut := HookOut{Change: entry.Change, State: stateCopy}
	for name, hook := range e.hooks {
		log.Println("Notify hook ", name)
		select {
		case hook <- hookOut:
		case <-time.After(500 * time.Millisecond):
			log.Printf("Hook %v unresponsive! Failed to sent %v", name, hookOut)
		}
	}

	log.Printf("Change produced %d new changes", len(newChanges))
	log.Printf("Change '%v' processed", change.StringJson())
	return
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
		*s.TeamInfo(team).ChallengeFlags = e.gameConfig.ChallengeFlags
	}
	s.NextCommand = state.NewCommand(state.Command_KICKOFF, *s.FirstKickoffTeam)
	s.PlacementPos = geom.NewVector2(0.0, 0.0)
	return
}

// postProcessChange performs synchronous post processing steps
func (e *Engine) postProcessChange(entry statemachine.StateChange) {
	change := entry.Change
	if change.GetChangeStage() != nil &&
		*change.GetChangeStage().NewStage == state.Referee_NORMAL_FIRST_HALF {
		e.currentState.MatchTimeStart, _ = ptypes.TimestampProto(e.timeProvider())
	}
	if change.GetNewCommand() != nil &&
		*change.GetNewCommand().Command.Type == state.Command_STOP &&
		entry.StatePre.Command.IsRunning() {
		e.processRunningToStop()
	}
}

// GetConfig returns a deep copy of the current config
func (e *Engine) GetConfig() *Config {
	cfg := Config{}
	proto.Merge(&cfg, &e.config)
	return &cfg
}

// UpdateConfig updates the current engine config with the given delta
func (e *Engine) UpdateConfig(delta *Config) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	log.Printf("Process config delta change %v", delta.StringJson())
	for k, v := range delta.GameEventBehavior {
		e.config.GameEventBehavior[k] = v
	}
	for autoRef, cfg := range delta.AutoRefConfigs {
		if _, ok := e.config.AutoRefConfigs[autoRef]; !ok {
			e.config.AutoRefConfigs[autoRef] = new(AutoRefConfig)
			e.config.AutoRefConfigs[autoRef].GameEventBehavior = map[string]AutoRefConfig_Behavior{}
		}
		for k, v := range cfg.GameEventBehavior {
			e.config.AutoRefConfigs[autoRef].GameEventBehavior[k] = v
		}
	}
	if delta.ActiveTrackerSource != nil {
		e.config.ActiveTrackerSource = delta.ActiveTrackerSource
	}
	log.Printf("Engine config updated to %v", e.config.StringJson())
	if err := e.config.WriteTo(e.engineConfig.ConfigFilename); err != nil {
		log.Printf("Could not write engine config: %v", err)
	}
}

// IsGameEventEnabled returns true, if the game event type is always accepted
func (e *Engine) IsGameEventEnabled(evenType state.GameEvent_Type) bool {
	return e.config.GameEventBehavior[evenType.String()] == Config_BEHAVIOR_ACCEPT
}
