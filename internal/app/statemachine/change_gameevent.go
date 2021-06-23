package statemachine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/timestamp"
	"log"
	"time"
)

func (s *StateMachine) processChangeAddGameEvent(newState *state.State, change *AddGameEvent) (changes []*Change) {

	gameEvent := change.GameEvent
	byTeam := gameEvent.ByTeam()

	if gameEvent.Type == nil {
		log.Printf("Can not process a game event without a type: %v", gameEvent)
		return
	}

	// convert aimless kick if necessary
	if newState.Division.Div() == config.DivA && *gameEvent.Type == state.GameEvent_AIMLESS_KICK {
		log.Println("Convert aimless kick to ball left field event, because we are in DivA")
		gameEvent = s.convertAimlessKick(change.GameEvent)
	}

	// remember game event
	newState.GameEvents = append(newState.GameEvents, gameEvent)

	// determine next command
	newState.NextCommand = s.nextCommandForEvent(newState, gameEvent)

	// Increment foul counter
	if incrementsFoulCounter(*gameEvent.Type) {
		for _, team := range state.BothTeams() {
			if byTeam == state.Team_UNKNOWN || byTeam == team {
				log.Printf("Team %v got a foul for %v", byTeam, gameEvent)
				newState.TeamInfo(team).AddFoul(gameEvent)
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
			Change: &Change_AddYellowCard{
				AddYellowCard: &AddYellowCard{
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
			Change: &Change_AddRedCard{
				AddRedCard: &AddRedCard{
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
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))

		valid, message := s.isGoalValid(newState, gameEvent)

		if valid && s.gameConfig.AutoApproveGoals {
			goal := state.GameEvent_Goal{}
			proto.Merge(&goal, gameEvent.GetPossibleGoal())
			goal.Message = new(string)
			*goal.Message = "Valid and auto approved"
			goalEvent := state.GameEvent{
				Event: &state.GameEvent_Goal_{
					Goal: &goal,
				},
			}
			changes = append(changes, createGameEventChange(state.GameEvent_GOAL, goalEvent))
		} else if !valid {
			goal := state.GameEvent_Goal{}
			proto.Merge(&goal, gameEvent.GetPossibleGoal())
			goal.Message = &message
			goalEvent := state.GameEvent{
				Event: &state.GameEvent_InvalidGoal{
					InvalidGoal: &goal,
				},
			}
			changes = append(changes, createGameEventChange(state.GameEvent_INVALID_GOAL, goalEvent))
		}
	}

	// bot substitution
	if *gameEvent.Type == state.GameEvent_BOT_SUBSTITUTION {
		log.Printf("Halt the game, because team %v requested robot substitution", byTeam)
		// reset robot substitution flags
		for _, team := range state.BothTeams() {
			newState.TeamInfo(team).RequestsBotSubstitutionSince = nil
		}
		// halt the game to allow teams to substitute robots
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
	}

	// challenge flag
	if *gameEvent.Type == state.GameEvent_CHALLENGE_FLAG {
		log.Printf("Reduce number of timeouts for %v by one for challenge flag", byTeam)
		*newState.TeamInfo(byTeam).TimeoutsLeft--
		*newState.TeamInfo(byTeam).ChallengeFlags--
	}

	// emergency stop
	if *gameEvent.Type == state.GameEvent_EMERGENCY_STOP {
		log.Printf("Initiate emergency stop for %v", byTeam)
		if *newState.TeamInfo(byTeam).TimeoutsLeft > 0 {
			changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_TIMEOUT, byTeam)))
		} else {
			changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
		}
		newState.TeamInfo(byTeam).RequestsEmergencyStopSince = nil
	}

	// ball placement interference
	if *gameEvent.Type == state.GameEvent_BOT_INTERFERED_PLACEMENT {
		log.Printf("Reset current action time for ball placement interference by %v", byTeam)
		curDuration, _ := ptypes.Duration(newState.CurrentActionTimeRemaining)
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(curDuration + s.gameConfig.BallPlacementTimeTopUp)
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
		if s.allTeamsFailedPlacement(newState) {
			log.Printf("Placement failed for all teams. The human ref must place the ball.")
			if s.numActiveBallPlacementTeams(newState) == 2 {
				// both teams failed, switch back to original command
				newState.NextCommand = state.NewCommand(state.Command_DIRECT, byTeam.Opposite())
			}
			changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_HALT)))
		} else {
			log.Printf("Placement failed for team %v. Team %v is awarded a free kick and places the ball.", byTeam, byTeam.Opposite())
			newState.NextCommand = state.NewCommand(state.Command_DIRECT, byTeam.Opposite())
			changes = append(changes, s.createCommandChange(state.NewCommand(state.Command_BALL_PLACEMENT, byTeam.Opposite())))
		}
	}

	// ball placement succeeded
	if *gameEvent.Type == state.GameEvent_PLACEMENT_SUCCEEDED &&
		byTeam.Known() {
		if *newState.TeamInfo(byTeam).BallPlacementFailures > 0 {
			*newState.TeamInfo(byTeam).BallPlacementFailures--
		}

		if newState.GetAutoContinue() && newState.NextCommand != nil && byTeam == *newState.NextCommand.ForTeam {
			log.Printf("Placement succeeded by team %v, which is also in favor. Can continue.", byTeam)
			changes = append(changes, &Change{
				Change: &Change_Continue{
					Continue: &Continue{},
				},
			})
		}
	}

	// defender too close to kick point
	if *gameEvent.Type == state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT {
		log.Printf("Reset current action time because defender of team %v was too close to kick point", byTeam)

		switch *newState.Command.Type {
		case state.Command_DIRECT, state.Command_INDIRECT:
			newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.FreeKickTimeout[newState.Division.Div()])
		case state.Command_NORMAL_START:
			newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.PrepareTimeout)
		case state.Command_FORCE_START:
			newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.NoProgressTimeout[newState.Division.Div()])
		default:
			log.Printf("Unexpected command while handling defender too close to kick point: %v", *newState.Command.Type)
		}
	}

	if *newState.GameState.Type == state.GameState_PENALTY &&
		isRuleViolationDuringPenalty(*gameEvent.Type) {
		if byTeam == *newState.GameState.ForTeam {
			// rule violation by attacking team -> no goal
			changes = append(changes, createGameEventChange(state.GameEvent_PENALTY_KICK_FAILED, state.GameEvent{
				Event: &state.GameEvent_PenaltyKickFailed_{
					PenaltyKickFailed: &state.GameEvent_PenaltyKickFailed{
						ByTeam:   &byTeam,
						Location: locationForRuleViolation(gameEvent),
					},
				},
			}))
		} else if byTeam == newState.GameState.ForTeam.Opposite() {
			// rule violation by defender team -> goal
			changes = append(changes, createGameEventChange(state.GameEvent_GOAL, state.GameEvent{
				Event: &state.GameEvent_Goal_{
					Goal: &state.GameEvent_Goal{
						ByTeam: &byTeam,
					},
				},
			}))
		}
	}

	// stop the game if needed
	if *newState.Command.Type != state.Command_STOP &&
		stopsTheGame(*gameEvent.Type) {
		log.Printf("Stopping the game for event %v", *gameEvent.Type)
		changes = append(changes, s.createCommandChange(state.NewCommandNeutral(state.Command_STOP)))
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

	// 3. The team did not commit any non stopping foul since the teams robots last touched the ball.
	var recentlyCommittedFouls []state.GameEvent_Type
	for _, foul := range newState.TeamInfo(byTeam).Fouls {
		if foul.CausedByGameEvent != nil &&
			foul.Timestamp != nil &&
			gameEvent.GetPossibleGoal().LastTouchByTeam != nil &&
			isNonStoppingFoul(*foul.CausedByGameEvent.Type) &&
			goTime(foul.Timestamp).After(microTimestampToTime(*gameEvent.GetPossibleGoal().LastTouchByTeam)) {
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
	}

	valid = true
	return
}

// multipleFoulsChange creates a multiple fouls event change
func (s *StateMachine) multipleFoulsChange(byTeam state.Team, events []*state.GameEvent) *Change {
	return createGameEventChange(state.GameEvent_MULTIPLE_FOULS, state.GameEvent{
		Event: &state.GameEvent_MultipleFouls_{
			MultipleFouls: &state.GameEvent_MultipleFouls{
				ByTeam:           &byTeam,
				CausedGameEvents: events,
			},
		},
	},
	)
}

// convertAimlessKick converts the aimless kick event into a ball left field via goal line event
// because aimless kick only applies to DivB
func (s *StateMachine) convertAimlessKick(gameEvent *state.GameEvent) *state.GameEvent {
	eventType := state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE
	return &state.GameEvent{
		Type:   &eventType,
		Origin: gameEvent.Origin,
		Event: &state.GameEvent_BallLeftFieldGoalLine{
			BallLeftFieldGoalLine: &state.GameEvent_BallLeftField{
				ByTeam:   gameEvent.GetAimlessKick().ByTeam,
				ByBot:    gameEvent.GetAimlessKick().ByBot,
				Location: gameEvent.GetAimlessKick().Location,
			},
		},
	}
}

// nextCommandForEvent determines the next command for the given event or returns the currently set one
func (s *StateMachine) nextCommandForEvent(newState *state.State, gameEvent *state.GameEvent) (command *state.Command) {
	if *newState.Command.Type == state.Command_PENALTY || *newState.Command.Type == state.Command_KICKOFF {
		return state.NewCommand(state.Command_NORMAL_START, state.Team_UNKNOWN)
	}

	switch *gameEvent.Type {
	case state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE,
		state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE,
		state.GameEvent_AIMLESS_KICK,
		state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEvent_BOT_PUSHED_BOT,
		state.GameEvent_BOT_HELD_BALL_DELIBERATELY,
		state.GameEvent_BOT_TIPPED_OVER,
		state.GameEvent_KEEPER_HELD_BALL,
		state.GameEvent_BOUNDARY_CROSSING,
		state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL,
		state.GameEvent_PENALTY_KICK_FAILED,
		state.GameEvent_POSSIBLE_GOAL:
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
func incrementsFoulCounter(gameEvent state.GameEvent_Type) bool {
	switch gameEvent {
	case
		state.GameEvent_AIMLESS_KICK,
		state.GameEvent_KEEPER_HELD_BALL,
		state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
		state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEvent_BOT_KICKED_BALL_TOO_FAST,
		state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEvent_BOT_INTERFERED_PLACEMENT,
		state.GameEvent_BOT_CRASH_DRAWN,
		state.GameEvent_BOT_CRASH_UNIQUE,
		state.GameEvent_BOT_PUSHED_BOT,
		state.GameEvent_BOT_HELD_BALL_DELIBERATELY,
		state.GameEvent_BOT_TIPPED_OVER,
		state.GameEvent_BOT_TOO_FAST_IN_STOP,
		state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT,
		state.GameEvent_BOUNDARY_CROSSING:
		return true
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
		// others
		state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL,
		state.GameEvent_TOO_MANY_ROBOTS,
		state.GameEvent_NO_PROGRESS_IN_GAME,
		state.GameEvent_PENALTY_KICK_FAILED,
		state.GameEvent_PLACEMENT_SUCCEEDED:
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
		state.GameEvent_BOT_TIPPED_OVER:
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
	}
	return nil
}

// allTeamsFailedPlacement returns true if all teams failed placing the ball
// It takes into account, how many teams are able to place the ball and how many failures happened
func (s *StateMachine) allTeamsFailedPlacement(newState *state.State) bool {
	possibleFailures := s.numActiveBallPlacementTeams(newState)

	failures := 0
	for _, e := range newState.GameEvents {
		if *e.Type == state.GameEvent_PLACEMENT_FAILED {
			failures++
			if failures >= possibleFailures {
				return true
			}
		}
	}
	return false
}

func (s *StateMachine) numActiveBallPlacementTeams(newState *state.State) int {
	possibleFailures := 0
	for _, team := range state.BothTeams() {
		if newState.TeamInfo(team).BallPlacementAllowed() {
			possibleFailures++
		}
	}
	return possibleFailures
}

func goTime(timestamp *timestamp.Timestamp) time.Time {
	goTime, err := ptypes.Timestamp(timestamp)
	if err != nil {
		log.Printf("Could not parse timestamp: %v", timestamp)
	}
	return goTime
}

func microTimestampToTime(timestamp uint64) time.Time {
	s := int64(timestamp / 1_000_000)
	ns := (int64(timestamp) - s*1_000_000) * 1000
	return time.Unix(s, ns)
}
