package controller

import (
	"github.com/pkg/errors"
	"log"
	"strconv"
	"strings"
	"time"
)

func processEvent(event *Event) error {
	if event.Command != nil {
		return processCommand(event.Command)
	} else if event.Modify != nil {
		return processModify(event.Modify)
	} else if event.Stage != nil {
		return processStage(event.Stage)
	} else if event.Card != nil {
		return processCard(event.Card)
	} else if event.Trigger != nil {
		return processTrigger(event.Trigger)
	}
	return errors.New("unknown event")
}

func processCommand(c *EventCommand) error {
	switch c.Type {
	case CommandHalt:
		RefBox.State.GameState = GameStateHalted
		RefBox.State.GameStateFor = nil
	case CommandStop:
		RefBox.State.GameState = GameStateStopped
		RefBox.State.GameStateFor = nil
	case CommandForceStart, CommandNormalStart, CommandDirect, CommandIndirect:
		RefBox.State.GameState = GameStateRunning
		RefBox.State.GameStateFor = nil
	case CommandKickoff:
		if c.ForTeam == nil {
			return errors.New("Team required for kickoff")
		}
		RefBox.State.GameState = GameStatePreKickoff
		RefBox.State.GameStateFor = c.ForTeam
	case CommandPenalty:
		if c.ForTeam == nil {
			return errors.New("Team required for penalty")
		}
		RefBox.State.GameState = GameStatePrePenalty
		RefBox.State.GameStateFor = c.ForTeam
	case CommandBallPlacement:
		if c.ForTeam == nil {
			return errors.New("Team required for ball placement")
		}
		RefBox.State.GameState = GameStateBallPlacement
		RefBox.State.GameStateFor = c.ForTeam
	case CommandGoal:
		if c.ForTeam == nil {
			return errors.New("Team required for goal")
		}
		RefBox.State.TeamState[*c.ForTeam].Goals++
	case CommandTimeout:
		if c.ForTeam == nil {
			return errors.New("Team required for timeout")
		}
		RefBox.State.TeamState[*c.ForTeam].TimeoutsLeft--
		RefBox.State.GameState = GameStateTimeout
		RefBox.State.GameStateFor = c.ForTeam
	default:
		return errors.Errorf("Unknown command: %v", c)
	}

	log.Printf("Processed command %v", *c)
	return nil
}

func processModify(m *EventModifyValue) error {
	if m.ForTeam.Unknown() {
		return errors.Errorf("Unknown team: %v", m.ForTeam)
	}
	teamState := RefBox.State.TeamState[m.ForTeam]
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
		RefBox.State.TeamState[m.ForTeam.Opposite()].OnPositiveHalf = !*m.OnPositiveHalf
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
	} else {
		return errors.Errorf("Unknown modify: %v", m)
	}
	log.Printf("Processed modification %v", m)
	return nil
}

func processStage(s *EventStage) error {
	if RefBox.State.GameState != GameStateHalted && RefBox.State.GameState != GameStateStopped {
		return errors.New("The game state must be halted or stopped to change the stage")
	}

	index, err := RefBox.State.Stage.index()
	if err != nil {
		return err
	}
	if s.StageOperation == StageNext {
		nextIndex := index + 1
		if nextIndex >= len(Stages) {
			return errors.New("No next stage")
		}
		RefBox.State.Stage = Stages[nextIndex]
	} else if s.StageOperation == StagePrevious {
		nextIndex := index - 1
		if nextIndex < 0 {
			return errors.New("No previous stage")
		}
		RefBox.State.Stage = Stages[nextIndex]
	} else {
		return errors.Errorf("Unknown stage operation: %v", s.StageOperation)
	}

	RefBox.State.StageTimeLeft = RefBox.StageTimes[RefBox.State.Stage]
	RefBox.State.StageTimeElapsed = 0

	if RefBox.State.Stage == StageFirstHalf {
		RefBox.MatchTimeStart = time.Now()
	}
	if RefBox.State.Stage == StageOvertimeFirstHalfPre {
		RefBox.State.TeamState[TeamYellow].TimeoutsLeft = RefBox.Config.Overtime.Timeouts
		RefBox.State.TeamState[TeamYellow].TimeoutTimeLeft = RefBox.Config.Overtime.TimeoutDuration
		RefBox.State.TeamState[TeamBlue].TimeoutsLeft = RefBox.Config.Overtime.Timeouts
		RefBox.State.TeamState[TeamBlue].TimeoutTimeLeft = RefBox.Config.Overtime.TimeoutDuration
	}

	log.Printf("Processed stage %v", s.StageOperation)

	return nil
}

func processCard(card *EventCard) error {
	if card.ForTeam != TeamYellow && card.ForTeam != TeamBlue {
		return errors.Errorf("Unknown team: %v", card.ForTeam)
	}
	if card.Type != CardTypeYellow && card.Type != CardTypeRed {
		return errors.Errorf("Unknown card type: %v", card.Type)
	}
	teamState := RefBox.State.TeamState[card.ForTeam]
	if card.Operation == CardOperationAdd {
		return addCard(card, teamState)
	} else if card.Operation == CardOperationRevoke {
		return revokeCard(card, teamState)
	} else if card.Operation == CardOperationModify {
		return modifyCard(card, teamState)
	}
	return errors.Errorf("Unknown operation: %v", card.Operation)
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

func addCard(card *EventCard, teamState *TeamInfo) error {
	if card.Type == CardTypeYellow {
		log.Printf("Add yellow card for team %v", card.ForTeam)
		teamState.YellowCards++
		teamState.YellowCardTimes = append(teamState.YellowCardTimes, RefBox.Config.Global.YellowCardDuration)
	} else if card.Type == CardTypeRed {
		log.Printf("Add red card for team %v", card.ForTeam)
		teamState.RedCards++
	}
	return nil
}

func processTrigger(t *EventTrigger) error {
	if t.Type == TriggerResetMatch {
		RefBox.State = NewState(RefBox.Config)
		RefBox.MatchTimeStart = time.Unix(0, 0)
	} else if t.Type == TriggerSwitchColor {
		yellow := RefBox.State.TeamState[TeamYellow]
		RefBox.State.TeamState[TeamYellow] = RefBox.State.TeamState[TeamBlue]
		RefBox.State.TeamState[TeamBlue] = yellow
	} else if t.Type == TriggerUndo {
		RefBox.UndoLastAction()
	} else {
		return errors.Errorf("Unknown trigger: %v", t.Type)
	}
	log.Printf("Processed trigger %v", t.Type)
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
