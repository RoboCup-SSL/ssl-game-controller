package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine/ballplace"
	"log"
)

func (s *StateMachine) AddGameEvent(newState *state.State, change *AddGameEvent) (changes []Change) {

	// TODO assuming that game events are already filtered in engine

	gameEvent := change.GameEvent
	byTeam := gameEvent.ByTeam()

	if s.cfg.Division == config.DivA &&
		gameEvent.Type != nil &&
		*gameEvent.Type == state.GameEventType_AIMLESS_KICK {
		log.Println("Convert aimless kick to ball left field event, because we are in DivA")
		gameEvent = s.convertAimlessKick(change.GameEvent)
	}

	// remember game event
	newState.GameEvents = append(newState.GameEvents, gameEvent)

	// determine next command
	newState.NextCommand, newState.NextCommandFor = s.nextCommandForEvent(newState, gameEvent)

	// Increment foul counter
	if incrementsFoulCounter(*gameEvent.Type) {
		for _, team := range state.BothTeams() {
			if byTeam == state.Team_UNKNOWN || byTeam == team {
				newState.TeamState[team].AddFoul(&gameEvent)
				if len(newState.TeamState[team].Fouls)%3 == 0 {
					changes = append(changes, s.multipleFoulsChange(team))
				}
			}
		}
	}

	// Add yellow/red card
	if addsYellowCard(*gameEvent.Type) {
		newState.TeamState[byTeam].AddYellowCard(s.gameConfig.YellowCardDuration, &gameEvent)
	}
	if addsRedCard(*gameEvent.Type) {
		newState.TeamState[byTeam].AddRedCard(&gameEvent)
	}

	// goal
	if *gameEvent.Type == state.GameEventType_GOAL && byTeam.Known() {
		newState.TeamState[byTeam].Goals++
	}
	if *gameEvent.Type == state.GameEventType_POSSIBLE_GOAL {
		// halt the game to let the human referee decide if this was a valid goal
		changes = append(changes, s.newCommandChange(state.CommandHalt))
	}

	if *gameEvent.Type == state.GameEventType_BOT_SUBSTITUTION {
		// reset robot substitution flags
		newState.TeamState[state.Team_BLUE].BotSubstitutionIntend = false
		newState.TeamState[state.Team_YELLOW].BotSubstitutionIntend = false
		// halt the game to allow teams to substitute robots
		changes = append(changes, s.newCommandChange(state.CommandHalt))
		log.Printf("Halt the game, because team %v requested robot substitution", gameEvent.ByTeam())
	}

	// ball placement interference
	if *gameEvent.Type == state.GameEventType_BOT_INTERFERED_PLACEMENT {
		newState.CurrentActionTimeRemaining += s.gameConfig.BallPlacementTimeTopUp
	}

	// ball placement position
	placementPosDeterminer := ballplace.BallPlacementPosDeterminer{
		Event:               &gameEvent,
		Geometry:            &s.geometry,
		CurrentPlacementPos: newState.PlacementPos,
		OnPositiveHalf: map[state.Team]bool{
			state.Team_BLUE:   newState.TeamState[state.Team_BLUE].OnPositiveHalf,
			state.Team_YELLOW: newState.TeamState[state.Team_YELLOW].OnPositiveHalf,
		},
	}
	newState.PlacementPos = placementPosDeterminer.Location()

	// ball placement
	if *gameEvent.Type == state.GameEventType_PLACEMENT_FAILED &&
		byTeam.Known() {
		newState.TeamState[byTeam].BallPlacementFailures++
		newState.TeamState[byTeam].BallPlacementFailuresReached = newState.TeamState[byTeam].BallPlacementFailures >= s.gameConfig.MultiplePlacementFailures
		if s.allTeamsFailedPlacement(newState) {
			log.Printf("Placement failed for all teams. The human ref must place the ball.")
			changes = append(changes, s.newCommandChange(state.CommandHalt))
		} else {
			log.Printf("Placement failed for team %v. Team %v is awarded a free kick and places the ball.", byTeam, byTeam.Opposite())
			newState.NextCommand = state.CommandDirect
			newState.NextCommandFor = byTeam.Opposite()
			changes = append(changes, s.newCommandWithTeamChange(state.CommandBallPlacement, byTeam.Opposite()))
		}
	}

	if *gameEvent.Type == state.GameEventType_PLACEMENT_SUCCEEDED &&
		byTeam.Known() &&
		newState.TeamState[byTeam].BallPlacementFailures > 0 {
		newState.TeamState[byTeam].BallPlacementFailures--
		if gameEvent.ByTeam() == newState.NextCommandFor {
			log.Printf("Placement succeeded by team %v, which is also in favor. Can continue.", byTeam)
			changes = append(changes, Change{
				ChangeType:   ChangeTypeContinue,
				ChangeOrigin: changeOriginStateMachine,
			})
		}
	}

	if *gameEvent.Type == state.GameEventType_DEFENDER_TOO_CLOSE_TO_KICK_POINT {
		// Reset the current action time
		newState.CurrentActionTimeRemaining = s.gameConfig.GeneralTime
	}

	// stop the game if needed
	if newState.GameState() != state.GameStateStopped &&
		stopsTheGame(*gameEvent.Type) {
		changes = append(changes, s.newCommandChange(state.CommandStop))
	}

	return
}

func (s *StateMachine) newCommandChange(command state.RefCommand) Change {
	return s.newCommandWithTeamChange(command, state.Team_UNKNOWN)
}

func (s *StateMachine) newCommandWithTeamChange(command state.RefCommand, team state.Team) Change {
	return Change{
		ChangeType:   ChangeTypeNewCommand,
		ChangeOrigin: changeOriginStateMachine,
		NewCommand: &NewCommand{
			Command:    command,
			CommandFor: team,
		},
	}
}

func (s *StateMachine) multipleFoulsChange(byTeam state.Team) Change {
	eventType := state.GameEventType_MULTIPLE_FOULS
	return Change{
		ChangeType:   ChangeTypeAddGameEvent,
		ChangeOrigin: changeOriginStateMachine,
		AddGameEvent: &AddGameEvent{
			GameEvent: state.GameEvent{
				Type:   &eventType,
				Origin: []string{changeOriginStateMachine},
				Event: &state.GameEvent_MultipleFouls_{
					MultipleFouls: &state.GameEvent_MultipleFouls{
						ByTeam: &byTeam,
					},
				},
			},
		},
	}
}

func (s *StateMachine) botSubstitutionIntentEventChange(byTeam state.Team) Change {
	eventType := state.GameEventType_BOT_SUBSTITUTION
	return Change{
		ChangeType:   ChangeTypeAddGameEvent,
		ChangeOrigin: changeOriginStateMachine,
		AddGameEvent: &AddGameEvent{
			GameEvent: state.GameEvent{
				Type:   &eventType,
				Origin: []string{changeOriginStateMachine},
				Event: &state.GameEvent_BotSubstitution_{
					BotSubstitution: &state.GameEvent_BotSubstitution{
						ByTeam: &byTeam,
					},
				},
			},
		},
	}
}

func (s *StateMachine) convertAimlessKick(gameEvent state.GameEvent) state.GameEvent {
	eventType := state.GameEventType_BALL_LEFT_FIELD_GOAL_LINE
	return state.GameEvent{
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

func (s *StateMachine) nextCommandForEvent(newState *state.State, gameEvent state.GameEvent) (command state.RefCommand, commandFor state.Team) {
	if newState.Command == state.CommandPenalty || newState.Command == state.CommandKickoff {
		command = state.CommandNormalStart
		commandFor = state.Team_UNKNOWN
		return
	}

	switch *gameEvent.Type {
	case state.GameEventType_BALL_LEFT_FIELD_GOAL_LINE,
		state.GameEventType_BALL_LEFT_FIELD_TOUCH_LINE,
		state.GameEventType_AIMLESS_KICK,
		state.GameEventType_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEventType_BOT_PUSHED_BOT,
		state.GameEventType_BOT_HELD_BALL_DELIBERATELY,
		state.GameEventType_BOT_TIPPED_OVER,
		state.GameEventType_KEEPER_HELD_BALL,
		state.GameEventType_BOUNDARY_CROSSING,
		state.GameEventType_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEventType_ATTACKER_DOUBLE_TOUCHED_BALL,
		state.GameEventType_POSSIBLE_GOAL:
		command = state.CommandDirect
		commandFor = gameEvent.ByTeam().Opposite()
	case state.GameEventType_DEFENDER_IN_DEFENSE_AREA:
		command = state.CommandPenalty
		commandFor = gameEvent.ByTeam().Opposite()
	case state.GameEventType_NO_PROGRESS_IN_GAME:
		command = state.CommandForceStart
		commandFor = state.Team_UNKNOWN
	default:
		command = newState.NextCommand
		commandFor = newState.NextCommandFor
	}
	return
}

// incrementsFoulCounter checks if the game event increments the foul counter
func incrementsFoulCounter(gameEvent state.GameEventType) bool {
	switch gameEvent {
	case
		state.GameEventType_AIMLESS_KICK,
		state.GameEventType_KEEPER_HELD_BALL,
		state.GameEventType_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
		state.GameEventType_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEventType_BOT_KICKED_BALL_TOO_FAST,
		state.GameEventType_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEventType_BOT_INTERFERED_PLACEMENT,
		state.GameEventType_BOT_CRASH_DRAWN,
		state.GameEventType_BOT_CRASH_UNIQUE,
		state.GameEventType_BOT_PUSHED_BOT,
		state.GameEventType_BOT_HELD_BALL_DELIBERATELY,
		state.GameEventType_BOT_TIPPED_OVER,
		state.GameEventType_BOT_TOO_FAST_IN_STOP,
		state.GameEventType_DEFENDER_TOO_CLOSE_TO_KICK_POINT,
		state.GameEventType_BOUNDARY_CROSSING:
		return true
	}
	return false
}

// addsYellowCard checks if the game event adds a yellow card
func addsYellowCard(gameEvent state.GameEventType) bool {
	switch gameEvent {
	case
		state.GameEventType_MULTIPLE_FOULS,
		state.GameEventType_UNSPORTING_BEHAVIOR_MINOR:
		return true
	}
	return false
}

// addsYellowCard checks if the game event adds a yellow card
func addsRedCard(gameEvent state.GameEventType) bool {
	switch gameEvent {
	case
		state.GameEventType_DEFENDER_IN_DEFENSE_AREA,
		state.GameEventType_UNSPORTING_BEHAVIOR_MAJOR:
		return true
	}
	return false
}

// addsYellowCard checks if the game event adds a yellow card
func stopsTheGame(gameEvent state.GameEventType) bool {
	switch gameEvent {
	case
		state.GameEventType_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
		state.GameEventType_BOT_PUSHED_BOT,
		state.GameEventType_BOT_HELD_BALL_DELIBERATELY,
		state.GameEventType_BOT_TIPPED_OVER,
		state.GameEventType_DEFENDER_IN_DEFENSE_AREA,
		state.GameEventType_BOUNDARY_CROSSING,
		state.GameEventType_KEEPER_HELD_BALL,
		state.GameEventType_BOT_DRIBBLED_BALL_TOO_FAR,
		state.GameEventType_PLACEMENT_SUCCEEDED:
		return true
	}
	return false
}
