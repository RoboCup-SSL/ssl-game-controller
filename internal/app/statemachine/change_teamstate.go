package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/pkg/errors"
	"strconv"
	"strings"
	"time"
)

func (s *StateMachine) UpdateTeamState(newState *state.State, change *UpdateTeamState) (changes []Change) {
	teamState := newState.TeamState[change.ForTeam]
	if change.TeamName != nil {
		teamState.Name = *change.TeamName
	}
	if change.Goals != nil {
		teamState.Goals = *change.Goals
	}
	if change.Goalkeeper != nil {
		teamState.Goalkeeper = *change.Goalkeeper
	}
	if change.TimeoutsLeft != nil {
		teamState.TimeoutsLeft = *change.TimeoutsLeft
	}
	if change.TimeoutTimeLeft != nil {
		if duration, err := strToDuration(*change.TimeoutTimeLeft); err == nil {
			teamState.TimeoutTimeLeft = duration
		}
	}
	if change.OnPositiveHalf != nil {
		teamState.OnPositiveHalf = *change.OnPositiveHalf
		newState.TeamState[change.ForTeam.Opposite()].OnPositiveHalf = !*change.OnPositiveHalf
	}
	if change.BallPlacementFailures != nil {
		teamState.BallPlacementFailures = *change.BallPlacementFailures
	}
	if change.CanPlaceBall != nil {
		teamState.CanPlaceBall = *change.CanPlaceBall
	}
	if change.BotSubstitutionIntend != nil {
		teamState.BotSubstitutionIntend = *change.BotSubstitutionIntend
	}

	for id, newCard := range change.YellowCards {
		for i, existingCard := range teamState.YellowCards {
			if id == existingCard.Id {
				teamState.YellowCards[i].TimeRemaining = newCard.TimeRemaining
				if newCard.CausedByGameEvent != nil {
					teamState.YellowCards[i].CausedByGameEvent = newCard.CausedByGameEvent
				}
				break
			}
		}
	}

	if change.YellowCardsRemove != nil {
		for i, card := range teamState.YellowCards {
			if card.Id == *change.YellowCardsRemove {
				teamState.YellowCards = append(teamState.YellowCards[:i], teamState.YellowCards[i+1:]...)
				break
			}
		}
	}

	for id, newCard := range change.RedCards {
		for i, existingCard := range teamState.RedCards {
			if id == existingCard.Id {
				if newCard.CausedByGameEvent != nil {
					teamState.RedCards[i].CausedByGameEvent = newCard.CausedByGameEvent
				}
				break
			}
		}
	}

	if change.RedCardsRemove != nil {
		for i, card := range teamState.RedCards {
			if card.Id == *change.RedCardsRemove {
				teamState.RedCards = append(teamState.RedCards[:i], teamState.RedCards[i+1:]...)
				break
			}
		}
	}

	return
}

func (s *StateMachine) SwitchColor(newState *state.State) (changes []Change) {
	yellow := newState.TeamState[state.Team_YELLOW]
	newState.TeamState[state.Team_YELLOW] = newState.TeamState[state.Team_BLUE]
	newState.TeamState[state.Team_BLUE] = yellow
	return
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
