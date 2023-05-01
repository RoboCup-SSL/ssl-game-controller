package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/pkg/errors"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
	"strconv"
	"strings"
	"time"
)

func (s *StateMachine) processChangeUpdateTeamState(newState *state.State, change *Change_UpdateTeamState) (changes []*Change) {
	if change.ForTeam == nil {
		log.Println("No team specified for team state change")
		return
	}
	teamState := newState.TeamInfo(*change.ForTeam)
	if change.TeamName != nil {
		*teamState.Name = change.TeamName.Value
	}
	if change.Goals != nil {
		*teamState.Goals = change.Goals.Value
	}
	if change.Goalkeeper != nil {
		*teamState.Goalkeeper = change.Goalkeeper.Value
	}
	if change.TimeoutsLeft != nil {
		*teamState.TimeoutsLeft = change.TimeoutsLeft.Value
	}
	if change.TimeoutTimeLeft != nil {
		if duration, err := strToDuration(change.TimeoutTimeLeft.Value); err == nil {
			teamState.TimeoutTimeLeft = durationpb.New(duration)
		}
	}
	if change.OnPositiveHalf != nil {
		*teamState.OnPositiveHalf = change.OnPositiveHalf.Value
		*newState.TeamInfo(change.ForTeam.Opposite()).OnPositiveHalf = !change.OnPositiveHalf.Value
	}
	if change.BallPlacementFailures != nil {
		*teamState.BallPlacementFailures = change.BallPlacementFailures.Value
		*teamState.BallPlacementFailuresReached = *teamState.BallPlacementFailures >= s.gameConfig.MultiplePlacementFailures
	}
	if change.CanPlaceBall != nil &&
		// in division A, ball placement must not be switched off
		(change.CanPlaceBall.Value || *newState.Division != state.Division_DIV_A) {
		*teamState.CanPlaceBall = change.CanPlaceBall.Value
	}
	if change.ChallengeFlagsLeft != nil {
		*teamState.ChallengeFlags = change.ChallengeFlagsLeft.Value
	}
	if change.RequestsBotSubstitution != nil {
		if change.RequestsBotSubstitution.Value {
			teamState.RequestsBotSubstitutionSince = timestamppb.New(s.timeProvider())
		} else {
			teamState.RequestsBotSubstitutionSince = nil
		}
		*teamState.BotSubstitutionAllowed = false
	}
	if change.RequestsEmergencyStop != nil {
		if *newState.GameState.Type == state.GameState_RUNNING {
			if change.RequestsEmergencyStop.Value {
				teamState.RequestsEmergencyStopSince = timestamppb.New(s.timeProvider())
			} else {
				teamState.RequestsEmergencyStopSince = nil
			}
		} else {
			log.Printf("Reject to start emergency mode while game is not running")
		}
	}
	if change.RequestsTimeout != nil {
		if change.RequestsTimeout.Value && *teamState.TimeoutsLeft > 0 {
			teamState.RequestsTimeoutSince = timestamppb.New(s.timeProvider())
		} else {
			teamState.RequestsTimeoutSince = nil
		}
	}
	if change.YellowCard != nil && change.YellowCard.Id != nil {
		for i, existingCard := range teamState.YellowCards {
			if *change.YellowCard.Id == *existingCard.Id {
				if change.YellowCard.TimeRemaining != nil {
					teamState.YellowCards[i].TimeRemaining = change.YellowCard.TimeRemaining
				}
				if change.YellowCard.CausedByGameEvent != nil {
					teamState.YellowCards[i].CausedByGameEvent = change.YellowCard.CausedByGameEvent
				}
				break
			}
		}
	}
	if change.RedCard != nil && change.RedCard.Id != nil {
		for i, existingCard := range teamState.RedCards {
			if *change.RedCard.Id == *existingCard.Id {
				if change.RedCard.CausedByGameEvent != nil {
					teamState.RedCards[i].CausedByGameEvent = change.RedCard.CausedByGameEvent
				}
				break
			}
		}
	}
	if change.Foul != nil && change.Foul.Id != nil {
		for i, existingFoul := range teamState.Fouls {
			if *change.Foul.Id == *existingFoul.Id {
				if change.Foul.CausedByGameEvent != nil {
					teamState.Fouls[i].CausedByGameEvent = change.Foul.CausedByGameEvent
				}
				break
			}
		}
	}
	if change.RemoveYellowCard != nil {
		for i, card := range teamState.YellowCards {
			if *card.Id == change.RemoveYellowCard.Value {
				teamState.YellowCards = append(teamState.YellowCards[:i], teamState.YellowCards[i+1:]...)
				break
			}
		}
	}
	if change.RemoveRedCard != nil {
		for i, card := range teamState.RedCards {
			if *card.Id == change.RemoveRedCard.Value {
				teamState.RedCards = append(teamState.RedCards[:i], teamState.RedCards[i+1:]...)
				break
			}
		}
	}
	if change.RemoveFoul != nil {
		for i, foul := range teamState.Fouls {
			if *foul.Id == change.RemoveFoul.Value {
				teamState.Fouls = append(teamState.Fouls[:i], teamState.Fouls[i+1:]...)
				break
			}
		}
	}

	s.updateMaxBots(newState)

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
