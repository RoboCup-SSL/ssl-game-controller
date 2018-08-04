package controller

import (
	"github.com/pkg/errors"
	"log"
	"strconv"
	"strings"
	"time"
)

type Engine struct {
	State          *State
	MatchTimeStart time.Time
	StageTimes     map[Stage]time.Duration
	config         ConfigGame
	StateHistory   []State
}

func NewEngine(config ConfigGame) (e Engine) {
	e.config = config
	e.loadStages()
	e.ResetGame()
	return
}

func (e *Engine) ResetGame() {
	e.State = NewState()
	e.State.TeamState[TeamBlue].TimeoutTimeLeft = e.config.Normal.TimeoutDuration
	e.State.TeamState[TeamYellow].TimeoutTimeLeft = e.config.Normal.TimeoutDuration
	e.State.TeamState[TeamBlue].TimeoutsLeft = e.config.Normal.Timeouts
	e.State.TeamState[TeamYellow].TimeoutsLeft = e.config.Normal.Timeouts

	e.MatchTimeStart = time.Unix(0, 0)

}

// Tick updates the times of the state and removes cards, if necessary
func (e *Engine) Tick(delta time.Duration) {
	e.updateTimes(delta)

	if e.MatchTimeStart.After(time.Unix(0, 0)) {
		e.State.MatchDuration = time.Now().Sub(e.MatchTimeStart)
	}
}

// UndoLastAction restores the last state from internal history
func (e *Engine) UndoLastAction() {
	lastIndex := len(e.StateHistory) - 2
	if lastIndex >= 0 {
		*e.State = e.StateHistory[lastIndex]
		e.StateHistory = e.StateHistory[0:lastIndex]
	}
}

func (e *Engine) Process(event Event) (*EventCommand, error) {
	cmd, err := e.processEvent(event)
	if err == nil {
		e.StateHistory = append(e.StateHistory, *e.State)
	}
	return cmd, err
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

func (e *Engine) updateTimes(delta time.Duration) {
	if e.State.GameState == GameStateRunning {
		e.State.StageTimeElapsed += delta
		e.State.StageTimeLeft -= delta

		for _, teamState := range e.State.TeamState {
			reduceYellowCardTimes(teamState, delta)
			removeElapsedYellowCards(teamState)
		}
	}

	if e.State.GameState == GameStateTimeout && e.State.GameStateFor != nil {
		e.State.TeamState[*e.State.GameStateFor].TimeoutTimeLeft -= delta
	}
}

func (e *Engine) processEvent(event Event) (*EventCommand, error) {
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
	}
	return nil, errors.New("unknown event")
}

func (e *Engine) processCommand(c *EventCommand) (*EventCommand, error) {
	switch c.Type {
	case CommandHalt:
		e.State.GameState = GameStateHalted
		e.State.GameStateFor = nil
	case CommandStop:
		e.State.GameState = GameStateStopped
		e.State.GameStateFor = nil
	case CommandNormalStart:
		e.State.GameState = GameStateRunning
		e.State.GameStateFor = nil
		e.updatePreStages()
	case CommandForceStart, CommandDirect, CommandIndirect:
		e.State.GameState = GameStateRunning
		e.State.GameStateFor = nil
	case CommandKickoff:
		if c.ForTeam == nil {
			return nil, errors.New("Team required for kickoff")
		}
		e.State.GameState = GameStatePreKickoff
		e.State.GameStateFor = c.ForTeam
	case CommandPenalty:
		if c.ForTeam == nil {
			return nil, errors.New("Team required for penalty")
		}
		e.State.GameState = GameStatePrePenalty
		e.State.GameStateFor = c.ForTeam
	case CommandBallPlacement:
		if c.ForTeam == nil {
			return nil, errors.New("Team required for ball placement")
		}
		e.State.GameState = GameStateBallPlacement
		e.State.GameStateFor = c.ForTeam
	case CommandGoal:
		if c.ForTeam == nil {
			return nil, errors.New("Team required for goal")
		}
		e.State.TeamState[*c.ForTeam].Goals++
	case CommandTimeout:
		if c.ForTeam == nil {
			return nil, errors.New("Team required for timeout")
		}
		e.State.TeamState[*c.ForTeam].TimeoutsLeft--
		e.State.GameState = GameStateTimeout
		e.State.GameStateFor = c.ForTeam
	default:
		return nil, errors.Errorf("Unknown command: %v", c)
	}

	log.Printf("Processed command %v", *c)
	return c, nil
}

func (e *Engine) processModify(m *EventModifyValue) (*EventCommand, error) {
	if m.ForTeam.Unknown() {
		return nil, errors.Errorf("Unknown team: %v", m.ForTeam)
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
	} else if m.YellowCardTime != nil {
		cardId := m.YellowCardTime.CardID
		if cardId < 0 || cardId >= len(teamState.YellowCardTimes) {
			return nil, errors.Errorf("Invalid card index: %v", cardId)
		}
		if duration, err := strToDuration(m.YellowCardTime.Duration); err == nil {
			teamState.YellowCardTimes[cardId] = duration
		}
	} else if m.TimeoutTimeLeft != nil {
		if duration, err := strToDuration(*m.TimeoutTimeLeft); err == nil {
			teamState.TimeoutTimeLeft = duration
		} else {
			return nil, err
		}
	} else {
		return nil, errors.Errorf("Unknown modify: %v", m)
	}
	log.Printf("Processed modification %v", m)
	return nil, nil
}

func (e *Engine) processStage(s *EventStage) (*EventCommand, error) {
	if e.State.GameState != GameStateHalted && e.State.GameState != GameStateStopped {
		return nil, errors.New("The game state must be halted or stopped to change the stage")
	}

	var cmd *EventCommand
	if s.StageOperation == StageNext {
		cmd = e.updateStage(e.State.Stage.Next())
	} else if s.StageOperation == StagePrevious {
		cmd = e.updateStage(e.State.Stage.Previous())
	} else {
		return nil, errors.Errorf("Unknown stage operation: %v", s.StageOperation)
	}

	log.Printf("Processed stage %v", s.StageOperation)

	return cmd, nil
}

func (e *Engine) updateStage(stage Stage) (cmd *EventCommand) {

	e.State.StageTimeLeft = e.StageTimes[stage]
	e.State.StageTimeElapsed = 0

	if !e.State.Stage.IsPreStage() {
		e.State.GameState = GameStateHalted
		e.State.GameStateFor = nil
		cmd = &EventCommand{nil, CommandHalt}
	}

	if stage == StageFirstHalf {
		e.MatchTimeStart = time.Now()
	}

	if stage == StageOvertimeFirstHalfPre {
		e.State.TeamState[TeamYellow].TimeoutsLeft = e.config.Overtime.Timeouts
		e.State.TeamState[TeamYellow].TimeoutTimeLeft = e.config.Overtime.TimeoutDuration
		e.State.TeamState[TeamBlue].TimeoutsLeft = e.config.Overtime.Timeouts
		e.State.TeamState[TeamBlue].TimeoutTimeLeft = e.config.Overtime.TimeoutDuration
	}

	e.State.Stage = stage
	return
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

func (e *Engine) processCard(card *EventCard) (*EventCommand, error) {
	if card.ForTeam != TeamYellow && card.ForTeam != TeamBlue {
		return nil, errors.Errorf("Unknown team: %v", card.ForTeam)
	}
	if card.Type != CardTypeYellow && card.Type != CardTypeRed {
		return nil, errors.Errorf("Unknown card type: %v", card.Type)
	}
	teamState := e.State.TeamState[card.ForTeam]
	if card.Operation == CardOperationAdd {
		return nil, addCard(card, teamState, e.config.YellowCardDuration)
	} else if card.Operation == CardOperationRevoke {
		return nil, revokeCard(card, teamState)
	} else if card.Operation == CardOperationModify {
		return nil, modifyCard(card, teamState)
	}
	return nil, errors.Errorf("Unknown operation: %v", card.Operation)
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

func (e *Engine) processTrigger(t *EventTrigger) (*EventCommand, error) {
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
	} else {
		return nil, errors.Errorf("Unknown trigger: %v", t.Type)
	}
	log.Printf("Processed trigger %v", t.Type)
	return nil, nil
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

func removeElapsedYellowCards(teamState *TeamInfo) {
	b := teamState.YellowCardTimes[:0]
	for _, x := range teamState.YellowCardTimes {
		if x > 0 {
			b = append(b, x)
		}
	}
	teamState.YellowCardTimes = b
}
