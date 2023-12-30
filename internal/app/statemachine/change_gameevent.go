package statemachine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
	"time"
)

func (s *StateMachine) processChangeAddGameEvent(newState *state.State, change *Change_AddGameEvent) (changes []*Change) {

	gameEvent := change.GameEvent
	byTeam := gameEvent.ByTeam()

	if gameEvent.Type == nil {
		log.Printf("Can not process a game event without a type: %v", gameEvent)
		return
	}

	// remember game event
	newState.GameEvents = append(newState.GameEvents, gameEvent)

	// determine next command
	newState.NextCommand = s.nextCommandForEvent(newState, gameEvent)

	// Increment foul counter
	if incrementsFoulCounter(newState, gameEvent) {
		for _, team := range state.BothTeams() {
			if byTeam == state.Team_UNKNOWN || byTeam == team {
				log.Printf("Team %v got a foul for %v", byTeam, gameEvent)
				newState.TeamInfo(team).AddFoul(gameEvent, s.timeProvider())
				numFouls := len(newState.TeamInfo(team).Fouls)
				if numFouls%3 == 0 {
					var causedGameEvents []*state.GameEvent
					for i := numFouls - 3; i < numFouls; i++ {
						causedGameEvents = append(causedGameEvents, newState.TeamInfo(team).Fouls[i].CausedByGameEvent)
					}

					changes = append(changes, s.multipleFoulsChange(team, causedGameEvents))
				}
			}
		}
	}

	// Add yellow card
	if addsYellowCard(*gameEvent.Type) && byTeam.Known() {
		log.Printf("Team %v got a yellow card", byTeam)
		changes = append(changes, &Change{
			Change: &Change_AddYellowCardChange{
				AddYellowCardChange: &Change_AddYellowCard{
					ForTeam:           &byTeam,
					CausedByGameEvent: gameEvent,
				},
			},
		})
	}

	// Add red card
	if addsRedCard(*gameEvent.Type) && byTeam.Known() {
		log.Printf("Team %v got a red card", byTeam)
		changes = append(changes, &Change{
			Change: &Change_AddRedCardChange{
				AddRedCardChange: &Change_AddRedCard{
					ForTeam:           &byTeam,
					CausedByGameEvent: gameEvent,
				},
			},
		})
	}

	// goal
	if *gameEvent.Type == state.GameEvent_GOAL && byTeam.Known() {
		*newState.TeamInfo(byTeam).Goals++
	}

	// possible goal
	if *gameEvent.Type == state.GameEvent_POSSIBLE_GOAL {
		log.Printf("Halt the game, because team %v might have scored a goal", byTeam)
		// halt the game to let the human referee decide if this was a valid goal
		changes = append(changes, createCommandChange(state.NewCommandNeutral(state.Command_HALT)))

		valid, message := s.isGoalValid(newState, gameEvent)

		if valid && s.gameConfig.AutoApproveGoals {
			goal := state.GameEvent_Goal{}
			proto.Merge(&goal, gameEvent.GetPossibleGoal())
			goal.Message = new(string)
			*goal.Message = "Valid and auto approved"
			goalEvent := &state.GameEvent{
				Event: &state.GameEvent_Goal_{
					Goal: &goal,
				},
			}
			changes = append(changes, createGameEventChange(state.GameEvent_GOAL, goalEvent))
		} else if !valid {
			goal := state.GameEvent_Goal{}
			proto.Merge(&goal, gameEvent.GetPossibleGoal())
			goal.Message = &message
			goalEvent := &state.GameEvent{
				Event: &state.GameEvent_InvalidGoal{
					InvalidGoal: &goal,
				},
			}
			changes = append(changes, createGameEventChange(state.GameEvent_INVALID_GOAL, goalEvent))
		}
	}

	// bot substitution
	if *gameEvent.Type == state.GameEvent_BOT_SUBSTITUTION {
		// halt the game to allow teams to substitute robots
		event := gameEvent.GetBotSubstitution()
		if event.ByTeam.Known() {
			*newState.TeamInfo(*event.ByTeam).BotSubstitutionAllowed = true
		} else {
			*newState.TeamInfo(state.Team_BLUE).BotSubstitutionAllowed = true
			*newState.TeamInfo(state.Team_YELLOW).BotSubstitutionAllowed = true
		}
		changes = append(changes, createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	}

	// too many robots
	if *gameEvent.Type == state.GameEvent_TOO_MANY_ROBOTS {
		byTeam := *gameEvent.GetTooManyRobots().ByTeam
		if byTeam.Known() {
			log.Printf("Team %s has too many robots. Requesting robot substition for them", byTeam)
			newState.TeamInfo(byTeam).RequestsBotSubstitutionSince = timestamppb.New(s.timeProvider())
		} else {
			log.Printf("Too many robots, but no information on team. Requesting for both")
			for _, team := range state.BothTeams() {
				newState.TeamInfo(team).RequestsBotSubstitutionSince = timestamppb.New(s.timeProvider())
			}
		}
	}

	// challenge flag
	if *gameEvent.Type == state.GameEvent_CHALLENGE_FLAG {
		*newState.TeamInfo(byTeam).ChallengeFlags--
	}

	// challenge flag handled
	if *gameEvent.Type == state.GameEvent_CHALLENGE_FLAG_HANDLED &&
		!*gameEvent.GetChallengeFlagHandled().Accepted {
		*newState.TeamInfo(byTeam).TimeoutsLeft--
	}

	// emergency stop
	if *gameEvent.Type == state.GameEvent_EMERGENCY_STOP {
		log.Printf("Initiate emergency stop for %v", byTeam)
		if *newState.TeamInfo(byTeam).TimeoutsLeft > 0 {
			changes = append(changes, createCommandChange(state.NewCommand(state.Command_TIMEOUT, byTeam)))
		} else {
			changes = append(changes, createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
		}
		newState.TeamInfo(byTeam).RequestsEmergencyStopSince = nil
	}

	// ball placement interference
	if *gameEvent.Type == state.GameEvent_BOT_INTERFERED_PLACEMENT {
		log.Printf("Reset current action time for ball placement interference by %v", byTeam)
		curDuration := newState.CurrentActionTimeRemaining.AsDuration()
		newState.CurrentActionTimeRemaining = durationpb.New(curDuration + s.gameConfig.BallPlacementTimeTopUp)
	}

	// ball placement position
	placementPosDeterminer := BallPlacementPosDeterminer{
		Event:               gameEvent,
		Geometry:            s.Geometry,
		CurrentPlacementPos: newState.PlacementPos,
		OnPositiveHalf: map[state.Team]bool{
			state.Team_BLUE:   *newState.TeamInfo(state.Team_BLUE).OnPositiveHalf,
			state.Team_YELLOW: *newState.TeamInfo(state.Team_YELLOW).OnPositiveHalf,
		},
	}
	newState.PlacementPos = placementPosDeterminer.Location()

	// ball placement failed
	if *gameEvent.Type == state.GameEvent_PLACEMENT_FAILED && byTeam.Known() {
		*newState.TeamInfo(byTeam).BallPlacementFailures++
		*newState.TeamInfo(byTeam).BallPlacementFailuresReached = *newState.TeamInfo(byTeam).BallPlacementFailures >= s.gameConfig.MultiplePlacementFailures

		if *newState.Division == state.Division_DIV_A && ballLeftField(newState) {
			newState.NextCommand = state.NewCommand(state.Command_DIRECT, byTeam.Opposite())
		}
	}

	// ball placement succeeded
	if *gameEvent.Type == state.GameEvent_PLACEMENT_SUCCEEDED &&
		byTeam.Known() {
		if newState.NextCommand != nil &&
			*newState.NextCommand.ForTeam == byTeam {
			// continue immediately
			newState.ReadyContinueTime = timestamppb.New(s.timeProvider())
		}
		if *newState.TeamInfo(byTeam).BallPlacementFailures > 0 {
			*newState.TeamInfo(byTeam).BallPlacementFailures--
		}
	}

	// defender too close to kick point
	if *gameEvent.Type == state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT {
		log.Printf("Reset current action time because defender of team %v was too close to kick point", byTeam)

		switch *newState.Command.Type {
		case state.Command_DIRECT:
			newState.CurrentActionTimeRemaining = durationpb.New(s.gameConfig.FreeKickTimeout[newState.Division.Div()])
		case state.Command_NORMAL_START:
			newState.CurrentActionTimeRemaining = durationpb.New(s.gameConfig.PrepareTimeout)
		case state.Command_FORCE_START:
			newState.CurrentActionTimeRemaining = durationpb.New(s.gameConfig.NoProgressTimeout[newState.Division.Div()])
		default:
			log.Printf("Unexpected command while handling defender too close to kick point: %v", *newState.Command.Type)
		}
	}

	if *newState.GameState.Type == state.GameState_PENALTY &&
		isRuleViolationDuringPenalty(*gameEvent.Type) {
		if byTeam == *newState.GameState.ForTeam {
			// rule violation by attacking team -> no goal
			reason := "Rule violation: " + gameEvent.Type.String()
			changes = append(changes, createGameEventChange(state.GameEvent_PENALTY_KICK_FAILED, &state.GameEvent{
				Event: &state.GameEvent_PenaltyKickFailed_{
					PenaltyKickFailed: &state.GameEvent_PenaltyKickFailed{
						ByTeam:   &byTeam,
						Location: locationForRuleViolation(gameEvent),
						Reason:   &reason,
					},
				},
			}))
		} else if byTeam == newState.GameState.ForTeam.Opposite() {
			// rule violation by defending team -> goal for attacking team
			scoringTeam := byTeam.Opposite()
			changes = append(changes, createGameEventChange(state.GameEvent_GOAL, &state.GameEvent{
				Event: &state.GameEvent_Goal_{
					Goal: &state.GameEvent_Goal{
						ByTeam: &scoringTeam,
					},
				},
			}))
		}
	}

	// stop the game if needed
	if *newState.Command.Type != state.Command_STOP &&
		*newState.Command.Type != state.Command_HALT &&
		stopsTheGame(*gameEvent.Type) {
		log.Printf("Stopping the game for event %v", *gameEvent.Type)
		changes = append(changes, createCommandChange(state.NewCommandNeutral(state.Command_STOP)))
	}

	return
}

func (s *StateMachine) isGoalValid(newState *state.State, gameEvent *state.GameEvent) (valid bool, message string) {
	byTeam := gameEvent.ByTeam()

	// 1. The team did not exceed the allowed number of robots when the ball entered the goal.
	if gameEvent.GetPossibleGoal().NumRobotsByTeam != nil &&
		int32(*gameEvent.GetPossibleGoal().NumRobotsByTeam) > *newState.TeamInfo(byTeam).MaxAllowedBots {
		message = fmt.Sprintf("Scoring team had %d robots on the field, but only %d were allowed.",
			*gameEvent.GetPossibleGoal().NumRobotsByTeam, *newState.TeamInfo(byTeam).MaxAllowedBots)
		return
	}

	// 2. The height of the ball did not exceed 0.15 meters after the last touch of the teams robots.
	if gameEvent.GetPossibleGoal().MaxBallHeight != nil &&
		*gameEvent.GetPossibleGoal().MaxBallHeight > 0.15 {
		message = fmt.Sprintf("Ball exceeded max ball height of 0.15 with %.3f", *gameEvent.GetPossibleGoal().MaxBallHeight)
		return
	}

	// 3. The team did not commit any non-stopping foul since the teams robots last touched the ball.
	var recentlyCommittedFouls []state.GameEvent_Type
	var gracePeriod = 2 * time.Second
	var now = s.timeProvider()
	for _, foul := range newState.TeamInfo(byTeam).Fouls {
		if foul.CausedByGameEvent != nil &&
			foul.Timestamp != nil &&
			gameEvent.GetPossibleGoal().LastTouchByTeam != nil &&
			isNonStoppingFoul(*foul.CausedByGameEvent.Type) &&
			foul.Timestamp.AsTime().After(now.Add(-gracePeriod)) {
			recentlyCommittedFouls = append(recentlyCommittedFouls, *foul.CausedByGameEvent.Type)
		}
	}

	if len(recentlyCommittedFouls) > 0 {
		message = "Scoring team committed fouls after touching the ball: "
		for i, foulType := range recentlyCommittedFouls {
			message += foulType.String()
			if i != len(recentlyCommittedFouls)-1 {
				message += ","
			}
		}
		return
	}

	valid = true
	return
}

// multipleFoulsChange creates a multiple fouls event change
func (s *StateMachine) multipleFoulsChange(byTeam state.Team, events []*state.GameEvent) *Change {
	return createGameEventChange(state.GameEvent_MULTIPLE_FOULS, &state.GameEvent{
		Event: &state.GameEvent_MultipleFouls_{
			MultipleFouls: &state.GameEvent_MultipleFouls{
				ByTeam:           &byTeam,
				CausedGameEvents: events,
			},
		},
	},
	)
}

// nextCommandForEvent determines the next command for the given event or returns the currently set one
func (s *StateMachine) nextCommandForEvent(newState *state.State, gameEvent *state.GameEvent) (command *state.Command) {
	switch *gameEvent.Type {
	case state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
		state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE,
		state.GameEvent_AIMLESS_KICK,
		state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEvent_BOT_PUSHED_BOT,
		state.GameEvent_BOT_HELD_BALL_DELIBERATELY,
		state.GameEvent_BOT_TIPPED_OVER,
		state.GameEvent_BOT_DROPPED_PARTS,
		state.GameEvent_KEEPER_HELD_BALL,
		state.GameEvent_BOUNDARY_CROSSING,
		state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL,
		state.GameEvent_PENALTY_KICK_FAILED,
		state.GameEvent_POSSIBLE_GOAL,
		state.GameEvent_INVALID_GOAL:
		return state.NewCommand(state.Command_DIRECT, gameEvent.ByTeam().Opposite())
	case state.GameEvent_DEFENDER_IN_DEFENSE_AREA:
		return state.NewCommand(state.Command_PENALTY, gameEvent.ByTeam().Opposite())
	case state.GameEvent_GOAL:
		return state.NewCommand(state.Command_KICKOFF, gameEvent.ByTeam().Opposite())
	case state.GameEvent_NO_PROGRESS_IN_GAME,
		state.GameEvent_TOO_MANY_ROBOTS:
		return state.NewCommand(state.Command_FORCE_START, state.Team_UNKNOWN)
	case state.GameEvent_EMERGENCY_STOP:
		if newState.NextCommand != nil {
			return newState.NextCommand
		}
		return state.NewCommand(state.Command_DIRECT, gameEvent.ByTeam().Opposite())
	default:
		return newState.NextCommand
	}
}

// incrementsFoulCounter checks if the game event increments the foul counter
func incrementsFoulCounter(currentState *state.State, gameEvent *state.GameEvent) bool {
	switch *gameEvent.Type {
	case
		state.GameEvent_KEEPER_HELD_BALL,
		state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
		state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEvent_BOT_KICKED_BALL_TOO_FAST,
		state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEvent_BOT_CRASH_DRAWN,
		state.GameEvent_BOT_CRASH_UNIQUE,
		state.GameEvent_BOT_PUSHED_BOT,
		state.GameEvent_BOT_HELD_BALL_DELIBERATELY,
		state.GameEvent_BOT_TIPPED_OVER,
		state.GameEvent_BOT_DROPPED_PARTS,
		state.GameEvent_BOT_TOO_FAST_IN_STOP,
		state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT,
		state.GameEvent_BOUNDARY_CROSSING:
		return true
	case state.GameEvent_BOT_INTERFERED_PLACEMENT:
		// only first event counts as foul
		return len(currentState.FindGameEventsByTeam(state.GameEvent_BOT_INTERFERED_PLACEMENT, gameEvent.ByTeam())) <= 1
	}
	return false
}

// addsYellowCard checks if the game event adds a yellow card
func addsYellowCard(gameEvent state.GameEvent_Type) bool {
	switch gameEvent {
	case
		state.GameEvent_MULTIPLE_FOULS,
		state.GameEvent_EMERGENCY_STOP,
		state.GameEvent_UNSPORTING_BEHAVIOR_MINOR:
		return true
	}
	return false
}

// addsRedCard checks if the game event adds a red card
func addsRedCard(gameEvent state.GameEvent_Type) bool {
	switch gameEvent {
	case
		state.GameEvent_MULTIPLE_CARDS,
		state.GameEvent_UNSPORTING_BEHAVIOR_MAJOR:
		return true
	}
	return false
}

// stopsTheGame checks if the game event should stop the game
func stopsTheGame(gameEvent state.GameEvent_Type) bool {
	switch gameEvent {
	case
		// ball out of field
		state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE,
		state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
		state.GameEvent_AIMLESS_KICK,
		// stopping fouls
		state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEvent_DEFENDER_IN_DEFENSE_AREA,
		state.GameEvent_BOUNDARY_CROSSING,
		state.GameEvent_KEEPER_HELD_BALL,
		state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
		// manual fouls
		state.GameEvent_BOT_PUSHED_BOT,
		state.GameEvent_BOT_HELD_BALL_DELIBERATELY,
		state.GameEvent_BOT_TIPPED_OVER,
		state.GameEvent_BOT_DROPPED_PARTS,
		// others
		state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL,
		state.GameEvent_TOO_MANY_ROBOTS,
		state.GameEvent_NO_PROGRESS_IN_GAME,
		state.GameEvent_PENALTY_KICK_FAILED,
		state.GameEvent_PLACEMENT_SUCCEEDED,
		state.GameEvent_PLACEMENT_FAILED,
		state.GameEvent_INVALID_GOAL,
		state.GameEvent_GOAL:
		return true
	}
	return false
}

func isRuleViolationDuringPenalty(gameEvent state.GameEvent_Type) bool {
	switch gameEvent {
	case state.GameEvent_BOUNDARY_CROSSING,
		state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
		state.GameEvent_BOT_KICKED_BALL_TOO_FAST,
		state.GameEvent_BOT_CRASH_UNIQUE,
		state.GameEvent_BOT_CRASH_DRAWN,
		state.GameEvent_BOT_PUSHED_BOT,
		state.GameEvent_BOT_TIPPED_OVER,
		state.GameEvent_BOT_DROPPED_PARTS:
		return true
	}
	return false
}

func isNonStoppingFoul(gameEvent state.GameEvent_Type) bool {
	switch gameEvent {
	case state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
		state.GameEvent_BOT_KICKED_BALL_TOO_FAST,
		state.GameEvent_BOT_CRASH_UNIQUE,
		state.GameEvent_BOT_CRASH_DRAWN:
		return true
	}
	return false
}

func locationForRuleViolation(gameEvent *state.GameEvent) *geom.Vector2 {
	if gameEvent.GetBoundaryCrossing() != nil {
		return gameEvent.GetBoundaryCrossing().Location
	} else if gameEvent.GetBotDribbledBallTooFar() != nil {
		return gameEvent.GetBotDribbledBallTooFar().Start
	} else if gameEvent.GetAttackerTouchedBallInDefenseArea() != nil {
		return gameEvent.GetAttackerTouchedBallInDefenseArea().Location
	} else if gameEvent.GetBotKickedBallTooFast() != nil {
		return gameEvent.GetBotKickedBallTooFast().Location
	} else if gameEvent.GetBotCrashUnique() != nil {
		return gameEvent.GetBotCrashUnique().Location
	} else if gameEvent.GetBotCrashDrawn() != nil {
		return gameEvent.GetBotCrashDrawn().Location
	} else if gameEvent.GetBotPushedBot() != nil {
		return gameEvent.GetBotPushedBot().Location
	} else if gameEvent.GetBotTippedOver() != nil {
		return gameEvent.GetBotTippedOver().Location
	} else if gameEvent.GetBotDroppedParts() != nil {
		return gameEvent.GetBotDroppedParts().Location
	}
	return nil
}

// ballLeftField returns true if the game was stopped because the ball left the field
func ballLeftField(newState *state.State) bool {
	for _, gameEvent := range newState.GameEvents {
		switch *gameEvent.Type {
		case
			state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
			state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE,
			state.GameEvent_AIMLESS_KICK,
			state.GameEvent_POSSIBLE_GOAL:
			return true
		}
	}
	return false
}
