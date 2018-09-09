package controller

import (
	"fmt"
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
	e.State.TeamState[TeamBlue].TimeoutTimeLeft = e.config.Normal.TimeoutDuration
	e.State.TeamState[TeamYellow].TimeoutTimeLeft = e.config.Normal.TimeoutDuration
	e.State.TeamState[TeamBlue].TimeoutsLeft = e.config.Normal.Timeouts
	e.State.TeamState[TeamYellow].TimeoutsLeft = e.config.Normal.Timeouts
	e.RefereeEvents = []RefereeEvent{}
	e.State.Division = e.config.DefaultDivision
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

	if command.RunningState() && e.State.GameEvent.Type != GameEventNone {
		e.SendGameEvent(GameEvent{Type: GameEventNone})
	}
}

func (e *Engine) SendGameEvent(gameEvent GameEvent) {
	e.State.GameEvent = gameEvent
	e.LogGameEvent()
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
	switch e.State.GameEvent.Type {
	case GameEventBallLeftFieldTouchLine:
		e.SendCommand(CommandIndirect, e.State.GameEvent.ForTeam.Opposite())
	case GameEventBallLeftFieldGoalLine:
		e.SendCommand(CommandDirect, e.State.GameEvent.ForTeam.Opposite())
	default:
		return errors.New("No game event present")
	}
	return nil
}

func (e *Engine) Process(event Event) error {
	err := e.processEvent(event)
	if err != nil {
		return err
	}
	e.appendHistory()
	return nil
}

func (e *Engine) appendHistory() {
	e.History = append(e.History, HistoryEntry{*e.State, e.RefereeEvents})
	if len(e.History) > maxHistorySize {
		e.History = e.History[1:]
	}
}

func (e *Engine) LogGameEvent() {
	gameEvent := RefereeEvent{
		Timestamp: e.TimeProvider(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventGameEvent,
		Name:      string(e.State.GameEvent.Type),
		Team:      e.State.GameEvent.ForTeam,
	}
	e.RefereeEvents = append(e.RefereeEvents, gameEvent)
}

func (e *Engine) LogCommand() {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventCommand,
		Name:      string(e.State.Command),
		Team:      e.State.CommandFor,
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogCard(card *EventCard) {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventCard,
		Name:      fmt.Sprintf("%v %v card", card.Operation, card.Type),
		Team:      card.ForTeam,
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogTime(description string, forTeam Team) {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventTime,
		Name:      description,
		Team:      forTeam,
	}
	e.RefereeEvents = append(e.RefereeEvents, refereeEvent)
}

func (e *Engine) LogStage(stage Stage) {
	refereeEvent := RefereeEvent{
		Timestamp: e.TimeProvider(),
		StageTime: e.State.StageTimeElapsed,
		Type:      RefereeEventStage,
		Name:      string(stage),
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
			log.Printf("Processed modification %v", m)
			return nil
		} else {
			return errors.Errorf("Invalid divsion: %v", *m.Division)
		}
	}

	// process team-dependent modifies
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
	} else if m.BotCollisions != nil {
		teamState.BotCollisions = *m.BotCollisions
	} else if m.BallPlacementFailures != nil {
		teamState.BallPlacementFailures = *m.BallPlacementFailures
	} else if m.BotSpeedInfringements != nil {
		teamState.BotSpeedInfringements = *m.BotSpeedInfringements
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
	log.Printf("Processed %v", m)
	return nil
}

func (e *Engine) processStage(s *EventStage) error {
	if e.State.GameState() != GameStateHalted && e.State.GameState() != GameStateStopped {
		return errors.New("The game state must be halted or stopped to change the stage")
	}

	if s.StageOperation == StageNext {
		e.updateStage(e.State.Stage.Next())
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
		err = addCard(card, teamState, e.config.YellowCardDuration)
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

func addCard(card *EventCard, teamState *TeamInfo, duration time.Duration) error {
	if card.Type == CardTypeYellow {
		log.Printf("Add yellow card for team %v", card.ForTeam)
		teamState.YellowCards++
		teamState.YellowCardTimes = append(teamState.YellowCardTimes, duration)
	} else if card.Type == CardTypeRed {
		log.Printf("Add red card for team %v", card.ForTeam)
		teamState.RedCards++
	}
	return nil
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

	if e.State.GameState() != GameStateStopped && e.State.GameState() != GameStateHalted {
		e.SendCommand(CommandStop, "")
	}

	e.SendGameEvent(*event)

	log.Printf("Processed game event %v", event)
	return nil
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
