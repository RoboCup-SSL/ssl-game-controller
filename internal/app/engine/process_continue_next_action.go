package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (e *Engine) nextAction() (*ContinueAction_Type, *state.Team) {
	if e.currentState.Command.IsRunning() ||
		*e.currentState.Command.Type == state.Command_BALL_PLACEMENT ||
		e.currentState.Stage.IsPausedStage() {
		// match is running or ball placement in progress -> nothing to continue
		return nil, nil
	}

	if e.currentState.TeamInfo(state.Team_BLUE).RequestsBotSubstitutionSince != nil &&
		e.currentState.TeamInfo(state.Team_YELLOW).RequestsBotSubstitutionSince != nil {
		return NewContinueActionType(ContinueAction_BOT_SUBSTITUTION), nil
	}

	for _, team := range state.BothTeams() {
		if e.currentState.TeamInfo(team).RequestsBotSubstitutionSince != nil {
			return NewContinueActionType(ContinueAction_BOT_SUBSTITUTION), &team
		}
	}

	if e.currentState.TeamInfo(state.Team_BLUE).RequestsTimeoutSince != nil &&
		e.currentState.TeamInfo(state.Team_YELLOW).RequestsTimeoutSince != nil {
		if e.currentState.TeamInfo(state.Team_BLUE).RequestsTimeoutSince.AsTime().
			Before(e.currentState.TeamInfo(state.Team_YELLOW).RequestsTimeoutSince.AsTime()) {
			return NewContinueActionType(ContinueAction_TIMEOUT_START), state.NewTeam(state.Team_BLUE)
		} else {
			return NewContinueActionType(ContinueAction_TIMEOUT_START), state.NewTeam(state.Team_YELLOW)
		}
	} else {
		for _, team := range state.BothTeams() {
			if e.currentState.TeamInfo(team).RequestsTimeoutSince != nil {
				return NewContinueActionType(ContinueAction_TIMEOUT_START), &team
			}
		}
	}

	if e.ballPlacementRequired() {
		placingTeam := e.ballPlacementTeam()
		if placingTeam.Known() {
			return NewContinueActionType(ContinueAction_BALL_PLACEMENT), &placingTeam
		}
	}

	if *e.currentState.Command.Type == state.Command_TIMEOUT {
		return NewContinueActionType(ContinueAction_TIMEOUT_STOP), nil
	}
	if *e.currentState.Command.Type == state.Command_HALT {
		return NewContinueActionType(ContinueAction_STOP), nil
	}
	if e.currentState.NextCommand != nil {
		return NewContinueActionType(ContinueAction_NEXT_COMMAND), e.currentState.NextCommand.ForTeam
	}
	if *e.currentState.Command.Type != state.Command_HALT {
		return NewContinueActionType(ContinueAction_HALT), nil
	}
	return nil, nil
}

func (e *Engine) ballPlacementRequired() bool {
	if e.currentState.PlacementPos == nil || e.gcState.TrackerStateGc.Ball == nil {
		// fallback if the fields are not set
		return false
	}

	if e.currentState.NextCommand != nil &&
		(*e.currentState.NextCommand.Type == state.Command_PENALTY ||
			*e.currentState.NextCommand.Type == state.Command_KICKOFF) {
		// no ball placement for penalty kicks and kickoffs
		return false
	}

	// The ball is stationary.
	// Else, checking the following position checks make no sense, as the ball may roll out of or in those
	if !e.gcState.TrackerStateGc.Ball.IsSteady() {
		return true
	}

	placementPos := e.currentState.PlacementPos
	ballPos := e.gcState.TrackerStateGc.Ball.Pos.ToVector2()

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
