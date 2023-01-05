package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (e *Engine) nextActions() (actions []*ContinueAction) {
	if e.currentState.Stage.IsPausedStage() {
		if *e.currentState.Stage.Next() != *e.currentState.Stage {
			actions = append(actions, createContinueAction(
				ContinueAction_NEXT_STAGE,
				state.Team_UNKNOWN,
				ContinueAction_READY_MANUAL,
			))
		}
		// only possible action is to proceed to non-paused stage
		return
	}

	if e.currentState.Command.IsRunning() {
		actions = append(actions, createContinueAction(
			ContinueAction_STOP_GAME,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}

	if *e.currentState.Command.Type == state.Command_BALL_PLACEMENT {
		actions = append(actions, createContinueAction(
			ContinueAction_BALL_PLACEMENT_CANCEL,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}

	if *e.currentState.Command.Type == state.Command_TIMEOUT {
		actions = append(actions, createContinueAction(
			ContinueAction_TIMEOUT_STOP,
			*e.currentState.Command.ForTeam,
			ContinueAction_READY_MANUAL,
		))
	}

	if *e.currentState.Command.Type == state.Command_STOP {
		if e.currentState.StageTimeLeft.AsDuration() < 0 {
			actions = append(actions, createContinueAction(
				ContinueAction_NEXT_STAGE,
				state.Team_UNKNOWN,
				ContinueAction_READY_MANUAL,
			))
		}

		var teamRequestingBotSubstitution = e.teamRequestingBotSubstitution()
		var teamRequestingTimeout = e.teamRequestingTimeout()
		if teamRequestingBotSubstitution != nil {
			actions = append(actions, createContinueAction(
				ContinueAction_BOT_SUBSTITUTION,
				*teamRequestingBotSubstitution,
				ContinueAction_READY_AUTO,
			))
		} else if teamRequestingTimeout != nil {
			actions = append(actions, createContinueAction(
				ContinueAction_TIMEOUT_START,
				*teamRequestingTimeout,
				ContinueAction_READY_MANUAL,
			))
		} else if e.ballPlacementRequired() {
			placingTeam := e.ballPlacementTeam()
			if placingTeam.Known() {
				actions = append(actions, createContinueAction(
					ContinueAction_BALL_PLACEMENT_START,
					placingTeam,
					ContinueAction_READY_AUTO,
				))
			}
		} else if e.currentState.NextCommand != nil {
			actions = append(actions, e.createNextCommandContinueAction(ContinueAction_NEXT_COMMAND))
		} else {
			actions = append(actions, e.createNextCommandContinueAction(ContinueAction_RESUME_FROM_STOP))
		}
	}

	if *e.currentState.Command.Type == state.Command_HALT {
		actions = append(actions, createContinueAction(
			ContinueAction_RESUME_FROM_HALT,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}

	if *e.currentState.Command.Type != state.Command_HALT &&
		*e.currentState.Command.Type != state.Command_TIMEOUT {
		actions = append(actions, createContinueAction(
			ContinueAction_HALT,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}

	return
}

func (e *Engine) teamRequestingBotSubstitution() *state.Team {
	var teams []state.Team
	for _, team := range state.BothTeams() {
		if e.currentState.TeamInfo(team).RequestsBotSubstitutionSince != nil {
			teams = append(teams, team)
		}
	}
	if len(teams) == 2 {
		// UNKNOWN is used for both teams here
		return state.NewTeam(state.Team_UNKNOWN)
	} else if len(teams) == 1 {
		return &teams[0]
	}
	return nil
}

func (e *Engine) teamRequestingTimeout() *state.Team {
	requestBlue := e.currentState.TeamInfo(state.Team_BLUE).RequestsTimeoutSince
	requestYellow := e.currentState.TeamInfo(state.Team_YELLOW).RequestsTimeoutSince
	if requestBlue != nil && requestYellow != nil {
		if requestBlue.AsTime().Before(requestYellow.AsTime()) {
			return state.NewTeam(state.Team_BLUE)
		} else {
			return state.NewTeam(state.Team_YELLOW)
		}
	} else {
		for _, team := range state.BothTeams() {
			if e.currentState.TeamInfo(team).RequestsTimeoutSince != nil {
				return &team
			}
		}
	}
	return nil
}

func (e *Engine) ballPlacementRequired() bool {
	if e.currentState.PlacementPos == nil || e.trackerStateGc.Ball == nil {
		// fallback if the fields are not set
		return false
	}

	if e.currentState.NextCommand != nil &&
		(*e.currentState.NextCommand.Type == state.Command_PENALTY ||
			*e.currentState.NextCommand.Type == state.Command_KICKOFF) {
		// no ball placement for penalty kicks and kickoffs
		return false
	}

	if len(e.currentState.FindGameEvents(state.GameEvent_PLACEMENT_SUCCEEDED)) > 0 {
		// ball placement was already successful
		return false
	}

	// The ball is stationary.
	// Else, checking the following position checks make no sense, as the ball may roll out of or in those
	if !e.trackerStateGc.Ball.IsSteady() {
		return true
	}

	placementPos := e.currentState.PlacementPos
	ballPos := e.trackerStateGc.Ball.Pos.ToVector2()

	// The ball is closer than 1m to the designated position.
	if ballPos.DistanceTo(placementPos) > e.gameConfig.BallPlacementRequiredDistance {
		return true
	}

	// The ball is inside the field.
	field := geom.NewRectangleFromCenter(geom.NewVector2(0, 0), e.getGeometry().FieldLength, e.getGeometry().FieldWidth)
	if !field.IsPointInside(ballPos) {
		return true
	}

	// The ball is at least 0.7m away from any defense area.
	for _, sign := range []float64{1, -1} {
		defenseArea := geom.NewDefenseAreaBySign(e.getGeometry(), sign)
		forbiddenArea := defenseArea.WithMargin(e.gameConfig.BallPlacementMinDistanceToDefenseArea)
		if forbiddenArea.IsPointInside(ballPos) {
			return true
		}
	}

	return false
}

func (e *Engine) ballPlacementTeam() state.Team {
	failedPlacements := e.currentState.FindGameEvents(state.GameEvent_PLACEMENT_FAILED)

	if len(failedPlacements) > 1 {
		// both teams failed already
		return state.Team_UNKNOWN
	}

	if len(failedPlacements) == 1 {
		// one team failed at ball placement. It's the others turn, if it can
		otherTeam := failedPlacements[0].ByTeam().Opposite()
		if e.currentState.TeamInfo(otherTeam).BallPlacementAllowed() {
			return otherTeam
		}
		return state.Team_UNKNOWN
	}

	// no team failed at ball placement yet, team of next command is preferred
	teamInFavor := *e.currentState.NextCommand.ForTeam
	if teamInFavor.Unknown() {
		// select a team by 50% chance (for example for force start)
		teamInFavor = e.randomTeam()
		log.Printf("No team in favor. Chose one randomly.")
	}

	if e.currentState.TeamInfo(teamInFavor).BallPlacementAllowed() {
		return teamInFavor
	}
	if e.currentState.TeamInfo(teamInFavor.Opposite()).BallPlacementAllowed() {
		return teamInFavor.Opposite()
	}
	return state.Team_UNKNOWN
}

// randomTeam selects a team by 50% chance
func (e *Engine) randomTeam() state.Team {
	if e.rand.Intn(2) == 0 {
		return state.Team_YELLOW
	}
	return state.Team_BLUE
}
