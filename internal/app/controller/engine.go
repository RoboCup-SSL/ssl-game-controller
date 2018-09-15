package controller

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/pkg/errors"
	"log"
	"strconv"
	"strings"
	"time"
)

const maxHistorySize = 10

type Engine struct {
	State         *State
	RefereeEvents []RefereeEvent
	StageTimes    map[Stage]time.Duration
	config        ConfigGame
	TimeProvider  func() time.Time
	History       History
	Geometry      ConfigGeometry
}

func NewEngine(config ConfigGame) (e Engine) {
	e.config = config
	e.loadStages()
	e.ResetGame()
	e.TimeProvider = func() time.Time { return time.Now() }
	return
}

func (e *Engine) ResetGame() {
	e.State = NewState()
	for _, team := range []Team{TeamBlue, TeamYellow} {
		e.State.TeamState[team].TimeoutTimeLeft = e.config.Normal.TimeoutDuration
		e.State.TeamState[team].TimeoutsLeft = e.config.Normal.Timeouts
		e.State.TeamState[team].MaxAllowedBots = e.config.MaxBots[e.State.Division]
	}

	e.RefereeEvents = []RefereeEvent{}
	e.State.Division = e.config.DefaultDivision
	e.Geometry = *e.config.DefaultGeometry[e.State.Division]
}

// Tick updates the times of the state and removes cards, if necessary
func (e *Engine) Tick(delta time.Duration) {
	e.updateTimes(delta)

	if e.State.MatchTimeStart.After(time.Unix(0, 0)) {
		e.State.MatchDuration = e.TimeProvider().Sub(e.State.MatchTimeStart)
	}
}

func (e *Engine) SendCommand(command RefCommand, forTeam Team) {
	e.State.Command = command
	e.State.CommandFor = forTeam
	e.LogCommand()

	if command.ContinuesGame() && len(e.State.GameEvents) > 0 {
		e.State.GameEvents = []*GameEvent{}
	}
}

func (e *Engine) AddGameEvent(gameEvent GameEvent) {
	e.State.GameEvents = append(e.State.GameEvents, &gameEvent)
	e.LogGameEvent(gameEvent)
}

// UndoLastAction restores the last state from internal history
func (e *Engine) UndoLastAction() {
	lastIndex := len(e.History) - 2
	if lastIndex >= 0 {
		*e.State = e.History[lastIndex].State
		e.RefereeEvents = e.History[lastIndex].RefereeEvents
		e.History = e.History[0:lastIndex]
	}
}

func (e *Engine) Continue() error {
	if len(e.State.GameEvents) == 0 {
		return errors.New("No game events available to determine next action")
	}
	primaryEvent := e.State.GameEvents[0]
	teamInFavor := primaryEvent.ByTeam().Opposite()

	if e.State.Division == DivA {
		for _, event := range e.State.GameEvents {
			if event.Type == GameEventPlacementFailedByTeamInFavor {
				switch primaryEvent.Type {
				case
					GameEventGoal,
					GameEventDefenderInDefenseArea,
					GameEventMultipleCards:
				default:
					// the placement failed by team in favor
					// the game is continued by the other team
					e.SendCommand(CommandIndirect, teamInFavor.Opposite())
				}
				return nil
			}
		}
	}

	switch primaryEvent.Type {
	case
		GameEventBallLeftFieldTouchLine,
		GameEventIcing,
		GameEventBotKickedBallTooFast,
		GameEventBotDribbledBallTooFar,
		GameEventAttackerDoubleTouchedBall,
		GameEventAttackerTooCloseToDefenseArea,
		GameEventAttackerInDefenseArea,
		GameEventAttackerTouchedKeeper,
		GameEventDefenderInDefenseAreaPartially,
		GameEventKickTimeout,
		GameEventKeeperHeldBall:
		e.SendCommand(CommandIndirect, teamInFavor)
	case
		GameEventBallLeftFieldGoalLine,
		GameEventIndirectGoal,
		GameEventChippedGoal,
		GameEventBotTippedOver,
		GameEventBotCrashUnique,
		GameEventBotPushedBot,
		GameEventBotHeldBallDeliberately:
		e.SendCommand(CommandDirect, teamInFavor)
	case
		GameEventGoal:
		e.SendCommand(CommandKickoff, teamInFavor)
	case
		GameEventBotCrashDrawn,
		GameEventNoProgressInGame:
		e.SendCommand(CommandForceStart, TeamUnknown)
	case
		GameEventDefenderInDefenseArea,
		GameEventMultipleCards:
		e.SendCommand(CommandPenalty, teamInFavor)
	case
		GameEventBotInterferedPlacement,
		GameEventDefenderTooCloseToKickPoint:
		if cmd, err := e.LastGameStartCommand(); err != nil {
			log.Print("Warn: ", err)
		} else {
			e.SendCommand(cmd, teamInFavor)
		}
	case
		GameEventBotTooFastInStop,
		GameEventUnsportiveBehaviorMinor,
		GameEventUnsportiveBehaviorMajor,
		GameEventBotCrashUniqueContinue,
		GameEventBotPushedBotContinue,
		GameEventMultipleFouls,
		GameEventPlacementFailedByTeamInFavor,
		GameEventPlacementFailedByOpponent:
		// no command
	default:
		return errors.Errorf("Unknown game event: %v", e.State.GameEvents)
	}
	return nil
}

func (e *Engine) LastGameStartCommand() (RefCommand, error) {
	for i := len(e.RefereeEvents) - 1; i >= 0; i-- {
		event := e.RefereeEvents[i]
		if event.Type == RefereeEventCommand {
			cmd := RefCommand(event.Name)
			switch cmd {
			case CommandPenalty, CommandKickoff, CommandIndirect, CommandDirect:
				return cmd, nil
			}
		}
	}
	return "", errors.New("No last game start command found.")
}

func (e *Engine) Process(event Event) error {
	err := e.processEvent(event)
	if err != nil {
		return err
	}
	e.updateMaxBots()
	e.appendHistory()
	return nil
}

func (e *Engine) updateMaxBots() {
	for _, team := range []Team{TeamBlue, TeamYellow} {
		max := e.config.MaxBots[e.State.Division]
		yellowCards := len(e.State.TeamState[team].YellowCardTimes)
		redCards := e.State.TeamState[team].RedCards
		e.State.TeamState[team].MaxAllowedBots = max - yellowCards - redCards
	}
}

func (e *Engine) appendHistory() {
	e.History = append(e.History, HistoryEntry{*e.State, e.RefereeEvents})
	if len(e.History) > maxHistorySize {
		e.History = e.History[1:]
	}
}

func (e *Engine) LogGameEvent(event GameEvent) {
	gameEvent := RefereeEvent{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        RefereeEventGameEvent,
		Name:        string(event.Type),
		Team:        event.ByTeam(),
		Description: event.Details.Description(),
	}
	e.RefereeEvents = append(e.RefereeEvents, gameEvent)
}

func (e *Engine) LogCommand() {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventCommand,
		Name:      string(e.State.Command),
		Team:      e.State.CommandFor,
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogCard(card *EventCard) {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventCard,
		Name:      fmt.Sprintf("%v %v card", card.Operation, card.Type),
		Team:      card.ForTeam,
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogTime(description string, forTeam Team) {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventTime,
		Name:      description,
		Team:      forTeam,
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogStage(stage Stage) {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider().UnixNano(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventStage,
		Name:      string(stage),
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogModify(m EventModifyValue) {
	team := m.ForTeam
	m.ForTeam = TeamUnknown
	refereeEvent := RefereeEvent{
		Timestamp:   e.TimeProvider().UnixNano(),
		StageTime:   e.State.StageTimeElapsed,
		Type:        RefereeEventModify,
		Name:        "modify",
		Team:        team,
		Description: m.String(),
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) loadStages() {
	e.StageTimes = map[Stage]time.Duration{}
	for _, stage := range Stages {
		e.StageTimes[stage] = 0
	}
	e.StageTimes[StageFirstHalf] = e.config.Normal.HalfDuration
	e.StageTimes[StageHalfTime] = e.config.Normal.HalfTimeDuration
	e.StageTimes[StageSecondHalf] = e.config.Normal.HalfDuration
	e.StageTimes[StageOvertimeBreak] = e.config.Normal.BreakAfter
	e.StageTimes[StageOvertimeFirstHalf] = e.config.Overtime.HalfDuration
	e.StageTimes[StageOvertimeHalfTime] = e.config.Overtime.HalfTimeDuration
	e.StageTimes[StageOvertimeSecondHalf] = e.config.Overtime.HalfDuration
	e.StageTimes[StageShootoutBreak] = e.config.Overtime.BreakAfter
}

func (e *Engine) countStageTime() bool {
	return e.State.Stage.IsPausedStage() || e.State.GameState() == GameStateRunning
}

func (e *Engine) updateTimes(delta time.Duration) {
	if e.countStageTime() {
		e.State.StageTimeElapsed += delta
		e.State.StageTimeLeft -= delta

		if e.State.StageTimeLeft+delta > 0 && e.State.StageTimeLeft <= 0 {
			e.LogTime("Stage time elapsed", "")
		}

		for team, teamState := range e.State.TeamState {
			reduceYellowCardTimes(teamState, delta)
			e.removeElapsedYellowCards(team, teamState)
			e.updateMaxBots()
		}
	}

	if e.State.GameState() == GameStateTimeout && e.State.CommandFor.Known() {
		e.State.TeamState[e.State.CommandFor].TimeoutTimeLeft -= delta

		timeLeft := e.State.TeamState[e.State.CommandFor].TimeoutTimeLeft
		if timeLeft+delta > 0 && timeLeft <= 0 {
			e.LogTime("Timeout time elapsed", e.State.CommandFor)
		}
	}
}

func (e *Engine) processEvent(event Event) error {
	if event.Command != nil {
		return e.processCommand(event.Command)
	} else if event.Modify != nil {
		return e.processModify(event.Modify)
	} else if event.Stage != nil {
		return e.processStage(event.Stage)
	} else if event.Card != nil {
		return e.processCard(event.Card)
	} else if event.Trigger != nil {
		return e.processTrigger(event.Trigger)
	} else if event.GameEvent != nil {
		return e.processGameEvent(event.GameEvent)
	}
	return errors.New("unknown event")
}

func (e *Engine) processCommand(c *EventCommand) error {

	if c.Type == CommandTimeout {
		e.State.TeamState[*c.ForTeam].TimeoutsLeft--
	} else if c.Type == CommandNormalStart {
		e.updatePreStages()
	}
	switch c.Type {
	case CommandDirect, CommandIndirect, CommandKickoff, CommandPenalty, CommandTimeout, CommandBallPlacement:
		if c.ForTeam == nil {
			return errors.Errorf("Team required for %v", c.Type)
		}
		e.SendCommand(c.Type, *c.ForTeam)
	case CommandHalt, CommandStop, CommandForceStart, CommandNormalStart:
		e.SendCommand(c.Type, "")
	default:
		return errors.Errorf("Unknown command: %v", c)
	}

	log.Printf("Processed command %v", *c)
	return nil
}

func (e *Engine) processModify(m *EventModifyValue) error {
	// process team-independent modifies
	if m.Division != nil {
		if *m.Division == DivA || *m.Division == DivB {
			e.State.Division = *m.Division
		} else {
			return errors.Errorf("Invalid division: %v", *m.Division)
		}
	} else if m.AutoContinue != nil {
		e.State.AutoContinue = *m.AutoContinue
		if e.State.AutoContinue {
			e.Continue()
		}
	} else if err := e.processTeamModify(m); err != nil {
		return err
	}

	e.LogModify(*m)
	log.Printf("Processed %v", m)
	return nil
}

func (e *Engine) processTeamModify(m *EventModifyValue) error {
	if m.ForTeam.Unknown() {
		return errors.Errorf("Unknown team: %v", m.ForTeam)
	}
	teamState := e.State.TeamState[m.ForTeam]
	if m.Goals != nil {
		teamState.Goals = *m.Goals
	} else if m.Goalie != nil {
		teamState.Goalie = *m.Goalie
	} else if m.YellowCards != nil {
		teamState.YellowCards = *m.YellowCards
	} else if m.RedCards != nil {
		teamState.RedCards = *m.RedCards
	} else if m.TimeoutsLeft != nil {
		teamState.TimeoutsLeft = *m.TimeoutsLeft
	} else if m.TeamName != nil {
		teamState.Name = *m.TeamName
	} else if m.OnPositiveHalf != nil {
		teamState.OnPositiveHalf = *m.OnPositiveHalf
		e.State.TeamState[m.ForTeam.Opposite()].OnPositiveHalf = !*m.OnPositiveHalf
	} else if m.FoulCounter != nil {
		incremented := *m.FoulCounter > teamState.FoulCounter
		teamState.FoulCounter = *m.FoulCounter
		if incremented {
			e.FoulCounterIncremented(m.ForTeam)
		}
	} else if m.BallPlacementFailures != nil {
		incremented := *m.BallPlacementFailures > teamState.BallPlacementFailures
		teamState.BallPlacementFailures = *m.BallPlacementFailures
		if incremented {
			e.PlacementFailuresIncremented(m.ForTeam)
		}
	} else if m.YellowCardTime != nil {
		cardId := m.YellowCardTime.CardID
		if cardId < 0 || cardId >= len(teamState.YellowCardTimes) {
			return errors.Errorf("Invalid card index: %v", cardId)
		}
		if duration, err := strToDuration(m.YellowCardTime.Duration); err == nil {
			teamState.YellowCardTimes[cardId] = duration
		}
	} else if m.TimeoutTimeLeft != nil {
		if duration, err := strToDuration(*m.TimeoutTimeLeft); err == nil {
			teamState.TimeoutTimeLeft = duration
		} else {
			return err
		}
	} else if m.CanPlaceBall != nil {
		teamState.CanPlaceBall = *m.CanPlaceBall
	} else {
		return errors.Errorf("Unknown modify: %v", m)
	}
	return nil
}

func (e *Engine) processStage(s *EventStage) error {
	if e.State.GameState() != GameStateHalted && e.State.GameState() != GameStateStopped {
		return errors.New("The game state must be halted or stopped to change the stage")
	}

	if s.StageOperation == StageNext {
		e.updateStage(e.State.Stage.Next())
		e.State.TeamState[TeamYellow].BallPlacementFailures = 0
		e.State.TeamState[TeamBlue].BallPlacementFailures = 0
	} else if s.StageOperation == StagePrevious {
		e.updateStage(e.State.Stage.Previous())
	} else if s.StageOperation == StageEndGame {
		e.updateStage(StagePostGame)
	} else {
		return errors.Errorf("Unknown stage operation: %v", s.StageOperation)
	}

	log.Printf("Processed stage %v", s.StageOperation)

	return nil
}

func (e *Engine) updateStage(stage Stage) {
	e.LogStage(stage)

	e.State.StageTimeLeft = e.StageTimes[stage]
	e.State.StageTimeElapsed = 0

	if !e.State.Stage.IsPreStage() {
		e.SendCommand(CommandHalt, "")
	}

	if stage == StageFirstHalf {
		e.State.MatchTimeStart = e.TimeProvider()
	}

	if stage == StageOvertimeFirstHalfPre {
		e.State.TeamState[TeamYellow].TimeoutsLeft = e.config.Overtime.Timeouts
		e.State.TeamState[TeamYellow].TimeoutTimeLeft = e.config.Overtime.TimeoutDuration
		e.State.TeamState[TeamBlue].TimeoutsLeft = e.config.Overtime.Timeouts
		e.State.TeamState[TeamBlue].TimeoutTimeLeft = e.config.Overtime.TimeoutDuration
	}

	e.State.Stage = stage
}

func (e *Engine) updatePreStages() {

	switch e.State.Stage {
	case StagePreGame:
		e.updateStage(StageFirstHalf)
	case StageSecondHalfPre:
		e.updateStage(StageSecondHalf)
	case StageOvertimeFirstHalfPre:
		e.updateStage(StageOvertimeFirstHalf)
	case StageOvertimeSecondHalfPre:
		e.updateStage(StageOvertimeSecondHalf)
	}
}

func (e *Engine) processCard(card *EventCard) (err error) {
	if card.ForTeam != TeamYellow && card.ForTeam != TeamBlue {
		return errors.Errorf("Unknown team: %v", card.ForTeam)
	}
	if card.Type != CardTypeYellow && card.Type != CardTypeRed {
		return errors.Errorf("Unknown card type: %v", card.Type)
	}
	teamState := e.State.TeamState[card.ForTeam]
	if card.Operation == CardOperationAdd {
		e.addCard(card, card.ForTeam, e.config.YellowCardDuration)
	} else if card.Operation == CardOperationRevoke {
		err = revokeCard(card, teamState)
	} else if card.Operation == CardOperationModify {
		return modifyCard(card, teamState)
	} else {
		return errors.Errorf("Unknown operation: %v", card.Operation)
	}

	if err == nil {
		e.LogCard(card)
	}
	return
}

func modifyCard(card *EventCard, teamState *TeamInfo) error {
	if card.Type == CardTypeRed {
		return errors.New("Red cards can not be modified")
	}
	nCardTimes := len(teamState.YellowCardTimes)
	if card.Modification.CardID >= nCardTimes {
		return errors.Errorf("Invalid card id %v. Only %v card times available", card.Modification.CardID, nCardTimes)
	}
	teamState.YellowCardTimes[card.Modification.CardID] = card.Modification.TimeLeft
	return nil
}

func (e *Engine) addCard(card *EventCard, team Team, duration time.Duration) {
	if card.Type == CardTypeYellow {
		log.Printf("Add yellow card for team %v", card.ForTeam)
		e.State.TeamState[team].YellowCards++
		e.State.TeamState[team].YellowCardTimes = append(e.State.TeamState[team].YellowCardTimes, duration)
	} else if card.Type == CardTypeRed {
		log.Printf("Add red card for team %v", card.ForTeam)
		e.State.TeamState[team].RedCards++
	}
	e.CardNumberIncremented(team)
}

func (e *Engine) processTrigger(t *EventTrigger) (err error) {
	if t.Type == TriggerResetMatch {
		e.ResetGame()
	} else if t.Type == TriggerSwitchColor {
		yellow := e.State.TeamState[TeamYellow]
		e.State.TeamState[TeamYellow] = e.State.TeamState[TeamBlue]
		e.State.TeamState[TeamBlue] = yellow
	} else if t.Type == TriggerSwitchSides {
		yellowOnPositiveHalf := e.State.TeamState[TeamYellow].OnPositiveHalf
		e.State.TeamState[TeamYellow].OnPositiveHalf = !yellowOnPositiveHalf
		e.State.TeamState[TeamBlue].OnPositiveHalf = yellowOnPositiveHalf
	} else if t.Type == TriggerUndo {
		e.UndoLastAction()
	} else if t.Type == TriggerContinue {
		err = e.Continue()
	} else {
		return errors.Errorf("Unknown trigger: %v", t.Type)
	}
	log.Printf("Processed trigger %v", t.Type)
	return err
}

func (e *Engine) processGameEvent(event *GameEvent) error {

	if event.Details.EventType() == GameEventNone {
		return errors.Errorf("Incomplete game event: %v", event)
	}

	e.AddGameEvent(*event)

	if event.IncrementsFoulCounter() {
		team := event.ByTeam()
		if team.Unknown() {
			e.State.TeamState[TeamYellow].FoulCounter++
			e.FoulCounterIncremented(TeamYellow)
			e.State.TeamState[TeamBlue].FoulCounter++
			e.FoulCounterIncremented(TeamBlue)
		} else {
			e.State.TeamState[team].FoulCounter++
			e.FoulCounterIncremented(team)
		}
	}

	if event.AddsYellowCard() {
		team := event.ByTeam()
		if team.Unknown() {
			return errors.New("Missing team in game event")
		}
		e.addCard(&EventCard{Type: CardTypeYellow, ForTeam: team, Operation: CardOperationAdd}, team, e.config.YellowCardDuration)
	}

	if event.AddsRedCard() {
		team := event.ByTeam()
		if team.Unknown() {
			return errors.New("Missing team in game event")
		}
		e.addCard(&EventCard{Type: CardTypeRed, ForTeam: team, Operation: CardOperationAdd}, team, 0)
	}

	if event.IncrementsBallPlacementFailureCounter() {
		team := event.ByTeam()
		if team.Unknown() {
			return errors.New("Missing team in game event")
		}
		e.State.TeamState[team].BallPlacementFailures++
		e.PlacementFailuresIncremented(team)
	}

	if event.Type == GameEventPlacementSucceeded {
		team := event.ByTeam()
		if team.Unknown() {
			return errors.New("Missing team in game event")
		}
		e.State.TeamState[team].BallPlacementFailures = 0
	}

	e.State.PlacementPos = e.BallPlacementPos()

	if e.State.GameState() != GameStateHalted && !event.IsContinued() && !event.IsSecondary() {
		teamInFavor := event.ByTeam().Opposite()
		if e.State.PlacementPos != nil {
			if e.State.TeamState[teamInFavor].CanPlaceBall {
				e.SendCommand(CommandBallPlacement, teamInFavor)
			} else if e.State.TeamState[teamInFavor.Opposite()].CanPlaceBall {
				e.SendCommand(CommandBallPlacement, teamInFavor.Opposite())
			} else if e.State.GameState() != GameStateStopped {
				e.SendCommand(CommandStop, "")
			}
		} else if e.State.GameState() != GameStateStopped {
			e.SendCommand(CommandStop, "")
		}
	} else if e.State.AutoContinue && event.IsContinueGame() {
		e.Continue()
	}

	log.Printf("Processed game event %v", event)
	return nil
}

func (e *Engine) FoulCounterIncremented(team Team) {
	if e.State.TeamState[team].FoulCounter%e.config.MultipleFoulStep == 0 {
		teamProto := team.toProto()
		event := GameEvent{Type: GameEventMultipleFouls,
			Details: GameEventDetails{MultipleFouls: &refproto.GameEvent_MultipleFouls{ByTeam: &teamProto}}}
		if err := e.processGameEvent(&event); err != nil {
			log.Print("Could not process new secondary game event: ", err)
		}
	}
}

func (e *Engine) CardNumberIncremented(team Team) {
	cards := e.State.TeamState[team].YellowCards + e.State.TeamState[team].RedCards
	if cards%e.config.MultipleCardStep == 0 {
		teamProto := team.toProto()
		event := GameEvent{Type: GameEventMultipleCards,
			Details: GameEventDetails{MultipleCards: &refproto.GameEvent_MultipleCards{ByTeam: &teamProto}}}
		if err := e.processGameEvent(&event); err != nil {
			log.Print("Could not process new secondary game event: ", err)
		}
	}
}

func (e *Engine) PlacementFailuresIncremented(team Team) {
	if e.State.TeamState[team].BallPlacementFailures == e.config.MultiplePlacementFailures {
		teamProto := team.toProto()
		e.State.TeamState[team].CanPlaceBall = false
		event := GameEvent{Type: GameEventMultiplePlacementFailures,
			Details: GameEventDetails{MultiplePlacementFailures: &refproto.GameEvent_MultiplePlacementFailures{ByTeam: &teamProto}}}
		if err := e.processGameEvent(&event); err != nil {
			log.Print("Could not process new secondary game event: ", err)
		}
	}
}

func revokeCard(card *EventCard, teamState *TeamInfo) error {
	if card.Type == CardTypeYellow {
		if teamState.YellowCards > 0 {
			log.Printf("Revoke yellow card for team %v", card.ForTeam)
			teamState.YellowCards--
			nCardTimes := len(teamState.YellowCardTimes)
			if nCardTimes > 0 {
				log.Printf("Revoke yellow card time for team %v", card.ForTeam)
				teamState.YellowCardTimes = teamState.YellowCardTimes[:nCardTimes-1]
			}
		} else {
			return errors.Errorf("No yellow cards left to revoke for team %v", card.ForTeam)
		}
	} else if card.Type == CardTypeRed {
		if teamState.RedCards > 0 {
			log.Printf("Revoke red card for team %v", card.ForTeam)
			teamState.RedCards--
		} else {
			return errors.Errorf("No red cards left to revoke for team %v", card.ForTeam)
		}
	}
	return nil
}

func strToDuration(s string) (duration time.Duration, err error) {
	duration = 0
	err = nil

	parts := strings.Split(s, ":")
	if len(parts) > 2 {
		err = errors.Errorf("Invalid duration format: %v", s)
		return
	}

	var secondsIndex int
	var minutes int
	if len(parts) == 1 {
		secondsIndex = 0
		minutes = 0
	} else {
		secondsIndex = 1
		minutes, err = strconv.Atoi(parts[0])
		if err != nil {
			return
		}
	}
	seconds, err := strconv.Atoi(parts[secondsIndex])
	if err != nil {
		return
	}

	duration += time.Minute * time.Duration(minutes)
	duration += time.Second * time.Duration(seconds)
	return
}

func reduceYellowCardTimes(teamState *TeamInfo, delta time.Duration) {
	for i := range teamState.YellowCardTimes {
		teamState.YellowCardTimes[i] -= delta
	}
}

func (e *Engine) removeElapsedYellowCards(team Team, teamState *TeamInfo) {
	b := teamState.YellowCardTimes[:0]
	for _, x := range teamState.YellowCardTimes {
		if x > 0 {
			b = append(b, x)
		} else {
			e.LogTime("Yellow card time elapsed", team)
		}
	}
	teamState.YellowCardTimes = b
}
