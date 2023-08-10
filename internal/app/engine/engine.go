package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/store"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
	"math/rand"
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
	changeQueue              chan *statemachine.Change
	continueQueue            chan *ContinueAction
	hooks                    map[string]chan HookOut
	timeProvider             timer.TimeProvider
	lastTimeUpdate           time.Time
	gcState                  *GcState
	trackerState             map[string]*GcStateTracker
	trackerStateGc           *GcStateTracker
	trackerLastUpdate        map[string]time.Time
	mutex                    sync.Mutex
	mutexEnqueueBlocking     sync.Mutex
	noProgressDetector       NoProgressDetector
	ballPlacementCoordinator BallPlacementCoordinator
	botNumberProcessor       BotNumberProcessor
	tickChanProvider         func() <-chan time.Time
	rand                     *rand.Rand
	randomPlacingTeam        state.Team
}

// NewEngine creates a new engine
func NewEngine(gameConfig config.Game, engineConfig config.Engine) (e *Engine) {
	e = new(Engine)
	e.engineConfig = engineConfig
	e.config.LoadControllerConfig(engineConfig.ConfigFilename)
	e.gameConfig = gameConfig
	e.stateStore = store.NewStore(gameConfig.StateStoreFile)
	e.stateMachine = statemachine.NewStateMachine(gameConfig)
	e.changeQueue = make(chan *statemachine.Change, 100)
	e.continueQueue = make(chan *ContinueAction, 100)
	e.hooks = map[string]chan HookOut{}
	e.SetTimeProvider(func() time.Time { return time.Now() })
	e.gcState = new(GcState)
	e.gcState.TeamState = map[string]*GcStateTeam{
		state.Team_YELLOW.String(): new(GcStateTeam),
		state.Team_BLUE.String():   new(GcStateTeam),
	}
	e.gcState.AutoRefState = map[string]*GcStateAutoRef{}
	e.gcState.Trackers = map[string]string{}
	e.trackerState = map[string]*GcStateTracker{}
	e.trackerStateGc = &GcStateTracker{}
	e.trackerLastUpdate = map[string]time.Time{}
	e.noProgressDetector = NoProgressDetector{gcEngine: e}
	e.ballPlacementCoordinator = BallPlacementCoordinator{gcEngine: e}
	e.botNumberProcessor = BotNumberProcessor{gcEngine: e}
	e.tickChanProvider = func() <-chan time.Time {
		return time.After(25 * time.Millisecond)
	}
	e.rand = rand.New(rand.NewSource(time.Now().Unix()))
	e.randomPlacingTeam = state.Team_UNKNOWN
	return
}

// Enqueue adds the change to the change queue
func (e *Engine) Enqueue(change *statemachine.Change) {
	e.changeQueue <- change
}

// Continue adds the continue action to the continue queue
func (e *Engine) Continue(action *ContinueAction) {
	e.continueQueue <- action
}

// EnqueueBlocking adds the change to the change queue and waits for application
func (e *Engine) EnqueueBlocking(change *statemachine.Change) error {
	e.mutexEnqueueBlocking.Lock()
	defer e.mutexEnqueueBlocking.Unlock()
	hook := make(chan HookOut)
	hookId := "enqueue-blocking"
	e.RegisterHook(hookId, hook)
	defer func() {
		e.UnregisterHook(hookId)
		close(hook)
	}()
	e.Enqueue(change)
	for {
		select {
		case hookOut := <-hook:
			if hookOut.Change == change {
				return nil
			}
		case <-time.After(100 * time.Millisecond):
			return errors.Errorf("Failed to apply change: %s", change.String())
		}
	}
}

func isNonMajorityOrigin(origins []string) bool {
	for _, origin := range origins {
		if origin == "UI" || origin == "Engine" || origin == "StateMachine" || origin == "Majority" {
			return true
		}
	}
	return false
}

func (e *Engine) processGameEvent(gameEvent *state.GameEvent) *state.GameEvent {
	// Set creation timestamp
	if gameEvent.CreatedTimestamp == nil {
		gameEvent.CreatedTimestamp = new(uint64)
		*gameEvent.CreatedTimestamp = uint64(e.timeProvider().UnixMicro())
	}

	// Set unique id
	if gameEvent.Id == nil {
		gameEvent.Id = new(string)
		*gameEvent.Id = uuid.NewString()
	}

	// convert aimless kick if necessary
	if e.currentState.Division.Div() == config.DivA && *gameEvent.Type == state.GameEvent_AIMLESS_KICK {
		return convertAimlessKick(gameEvent)
	}
	return gameEvent
}

// convertAimlessKick converts the aimless kick event into a ball left field via goal line event
// because aimless kick only applies to DivB
func convertAimlessKick(gameEvent *state.GameEvent) *state.GameEvent {
	log.Println("Convert aimless kick to ball left field event, because we are in DivA")
	aimlessKick := &state.GameEvent{}
	proto.Merge(aimlessKick, gameEvent)
	eventType := state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE
	aimlessKick.Type = &eventType
	aimlessKick.Event = &state.GameEvent_BallLeftFieldGoalLine{
		BallLeftFieldGoalLine: &state.GameEvent_BallLeftField{
			ByTeam:   gameEvent.GetAimlessKick().ByTeam,
			ByBot:    gameEvent.GetAimlessKick().ByBot,
			Location: gameEvent.GetAimlessKick().Location,
		},
	}
	return aimlessKick
}

func (e *Engine) handleGameEventBehavior(change *statemachine.Change) *statemachine.Change {
	gameEvent := change.GetAddGameEventChange().GameEvent
	behavior := e.config.GameEventBehavior[gameEvent.Type.String()]

	if isNonMajorityOrigin(gameEvent.Origin) {
		// events from GC must always be passed through
		return change
	}

	switch behavior {
	case Config_BEHAVIOR_ACCEPT, Config_BEHAVIOR_ACCEPT_MAJORITY, Config_BEHAVIOR_PROPOSE_ONLY:
		log.Println("Convert game event to proposal: ", gameEvent.String())
		timestamp := timestamppb.New(e.timeProvider())
		return &statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AddProposalChange{
				AddProposalChange: &statemachine.Change_AddProposal{
					Proposal: &state.Proposal{
						Timestamp: timestamp,
						GameEvent: gameEvent,
					},
				},
			},
		}
	case Config_BEHAVIOR_LOG:
		log.Println("Convert game event to passive game event: ", gameEvent.String())
		return &statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AddPassiveGameEventChange{
				AddPassiveGameEventChange: &statemachine.Change_AddPassiveGameEvent{
					GameEvent: gameEvent,
				},
			},
		}
	default:
		log.Printf("Ignoring game event: %v (behavior: %v)", gameEvent, behavior)
		return nil
	}
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

	initializeAddedTeamInfoFields(e.currentState.TeamInfo(state.Team_BLUE))
	initializeAddedTeamInfoFields(e.currentState.TeamInfo(state.Team_YELLOW))

	e.stateMachine.Geometry = e.gameConfig.DefaultGeometry[e.currentState.Division.Div()]
	log.Printf("Loaded default geometry for DivA: %+v", e.stateMachine.Geometry)
	go e.processChanges()
	return nil
}

func initializeAddedTeamInfoFields(teamInfo *state.TeamInfo) {
	if teamInfo.BotSubstitutionAllowed == nil {
		teamInfo.BotSubstitutionAllowed = new(bool)
	}
}

// Stop stops the go routine that processes the change queue
func (e *Engine) Stop() {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	close(e.changeQueue)
	close(e.continueQueue)
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

// TrackerState returns a deep copy of the current tracker state
func (e *Engine) TrackerState() (s *GcStateTracker) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	s = new(GcStateTracker)
	proto.Merge(s, e.trackerStateGc)
	return
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
		case change, ok := <-e.changeQueue:
			if !ok {
				return
			}
			e.processChangeList([]*statemachine.Change{change})
		case action, ok := <-e.continueQueue:
			if !ok {
				return
			}
			e.performContinueAction(action)
		case <-e.tickChanProvider():
			e.processTick()
		}
	}
}

// ResetMatch creates a backup of the current state store, removes it and starts with a fresh state
func (e *Engine) ResetMatch() {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	log.Printf("Resetting match")
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

	if change.GetAddGameEventChange() != nil {
		change.GetAddGameEventChange().GameEvent = e.processGameEvent(change.GetAddGameEventChange().GameEvent)
		change = e.handleGameEventBehavior(change)
		if change == nil {
			return
		}
	} else if change.GetAddPassiveGameEventChange() != nil {
		change.GetAddPassiveGameEventChange().GameEvent = e.processGameEvent(change.GetAddPassiveGameEventChange().GameEvent)
	} else if change.GetAddProposalChange() != nil {
		change.GetAddProposalChange().Proposal.GameEvent = e.processGameEvent(change.GetAddProposalChange().Proposal.GameEvent)
	}

	if change.Revertible == nil {
		change.Revertible = new(bool)
		// Assume that changes from outside are by default revertible, except if the flag is already set
		*change.Revertible = true
	}
	if change.Origin == nil {
		change.Origin = proto.String("Unknown")
	}

	var entry = e.stateStore.CreateEntry(change, e.timeProvider(), e.currentState)
	log.Printf("Process change %d: %+v", *entry.Id, change.StringJson())

	if change.GetRevertChange() != nil {
		if change.GetRevertChange().ChangeId == nil {
			log.Printf("Missing change id in revert change")
			return
		}
		entryToRevert := e.stateStore.FindEntry(*change.GetRevertChange().ChangeId)
		if entryToRevert == nil {
			log.Printf("Could not find state id %v. Can not revert.", *change.GetRevertChange().ChangeId)
			return
		} else {
			entry.State = entryToRevert.StatePre
			if *entry.State.Command.Type != state.Command_HALT {
				// halt the game after a revert - just to be safe
				haltChange := statemachine.Change{
					Change: &statemachine.Change_NewCommandChange{
						NewCommandChange: &statemachine.Change_NewCommand{
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

	if err := e.stateStore.Add(entry); err != nil {
		log.Println("Could not add new state to store: ", err)
	}
	stateCopy := e.currentState.Clone()
	hookOut := HookOut{Change: entry.Change, State: stateCopy}
	for name, hook := range e.hooks {
		select {
		case hook <- hookOut:
		default:
			log.Printf("Hook %v unresponsive! Failed to sent %v", name, hookOut)
		}
	}

	log.Printf("Processed change %d and produced %d new changes", *entry.Id, len(newChanges))
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
		s.TeamInfo(team).TimeoutTimeLeft = durationpb.New(e.gameConfig.Normal.TimeoutDuration)
		*s.TeamInfo(team).MaxAllowedBots = e.gameConfig.MaxBots[e.gameConfig.DefaultDivision]
		*s.TeamInfo(team).ChallengeFlags = e.gameConfig.ChallengeFlags
	}
	s.NextCommand = state.NewCommand(state.Command_KICKOFF, *s.FirstKickoffTeam)
	s.PlacementPos = geom.NewVector2(0.0, 0.0)
	s.StageTimeLeft = durationpb.New(e.gameConfig.Normal.HalfTimeDuration)
	return
}

// postProcessChange performs synchronous post processing steps
func (e *Engine) postProcessChange(entry *statemachine.StateChange) {
	change := entry.Change
	if change.GetChangeStageChange() != nil &&
		*change.GetChangeStageChange().NewStage == state.Referee_NORMAL_FIRST_HALF {
		e.currentState.MatchTimeStart = timestamppb.New(e.timeProvider())
	}
}

// GetConfig returns a deep copy of the current config
func (e *Engine) GetConfig() *Config {
	cfg := Config{}
	proto.Merge(&cfg, &e.config)
	return &cfg
}

// GetLastTimeUpdate returns the current time
func (e *Engine) GetLastTimeUpdate() time.Time {
	return e.lastTimeUpdate
}

// UpdateConfig updates the current engine config with the given delta
func (e *Engine) UpdateConfig(delta *Config) {
	e.mutex.Lock()
	defer e.mutex.Unlock()
	log.Printf("Process config delta change %v", delta.StringJson())
	for k, v := range delta.GameEventBehavior {
		if _, ok := state.GameEvent_Type_value[k]; ok {
			e.config.GameEventBehavior[k] = v
		} else {
			log.Println("Ignoring unknown game event type: ", k)
		}
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
	if delta.AutoContinue != nil {
		e.config.AutoContinue = delta.AutoContinue
	}
	if err := e.config.WriteTo(e.engineConfig.ConfigFilename); err != nil {
		log.Printf("Could not write engine config: %v", err)
	}
}

// IsGameEventEnabled returns true, if the game event type is accept
func (e *Engine) IsGameEventEnabled(evenType state.GameEvent_Type) bool {
	return e.config.GameEventBehavior[evenType.String()] == Config_BEHAVIOR_ACCEPT ||
		e.config.GameEventBehavior[evenType.String()] == Config_BEHAVIOR_ACCEPT_MAJORITY
}
