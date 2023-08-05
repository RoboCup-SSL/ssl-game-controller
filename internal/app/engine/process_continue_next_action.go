package engine

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
	"math"
	"time"
)

func (e *Engine) nextActions() (actions []*ContinueAction, hints []*ContinueHint) {
	if *e.currentState.Stage == state.Referee_POST_GAME {
		// match is over
		return
	}

	if e.currentState.Stage.IsPausedStage() {
		actions = append(actions, createContinueAction(
			ContinueAction_NEXT_STAGE,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
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
		), createContinueAction(
			ContinueAction_BALL_PLACEMENT_COMPLETE,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		), createContinueAction(
			ContinueAction_BALL_PLACEMENT_FAIL,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}

	if *e.currentState.Command.Type == state.Command_TIMEOUT {
		timeLeft := e.currentState.TeamInfo(*e.currentState.Command.ForTeam).TimeoutTimeLeft.AsDuration().Truncate(time.Second)
		message := fmt.Sprintf("Timeout time left: %s", timeLeft)
		hints = append(hints, &ContinueHint{Message: &message})

		actions = append(actions, createContinueAction(
			ContinueAction_TIMEOUT_STOP,
			*e.currentState.Command.ForTeam,
			ContinueAction_READY_MANUAL,
		))
	}

	if e.currentState.Command.IsPrepare() {
		actions = append(actions, e.createNextCommandContinueAction(ContinueAction_NORMAL_START, state.Team_UNKNOWN))
		actions = append(actions, createContinueAction(
			ContinueAction_STOP_GAME,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}

	if *e.currentState.Command.Type == state.Command_STOP || *e.currentState.Command.Type == state.Command_HALT {
		newActions, newHints := e.actionsToContinueFromStop()
		actions = append(actions, newActions...)
		hints = append(hints, newHints...)
	} else {
		// reset random placing team
		e.randomPlacingTeam = state.Team_UNKNOWN
	}

	if *e.currentState.Command.Type == state.Command_HALT {
		// disable continue actions that can't be used after halt
		for _, action := range actions {
			switch *action.Type {
			case
				ContinueAction_FORCE_START,
				ContinueAction_FREE_KICK,
				ContinueAction_NEXT_COMMAND,
				ContinueAction_BALL_PLACEMENT_START:
				*action.State = ContinueAction_DISABLED
			}
		}

		continueFromHalt := createContinueAction(
			ContinueAction_RESUME_FROM_HALT,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		)
		if e.teamDoingBotSubstitution() {
			continueFromHalt.ContinuationIssues = append(continueFromHalt.ContinuationIssues,
				"Robot substitution in progress")
		}
		actions = append([]*ContinueAction{continueFromHalt}, actions...)
	}

	return
}

func (e *Engine) actionsToContinueFromStop() (actions []*ContinueAction, hints []*ContinueHint) {
	for _, team := range state.BothTeams() {
		if e.currentState.HasGameEventByTeam(state.GameEvent_POSSIBLE_GOAL, team) &&
			!e.currentState.HasGameEventByTeam(state.GameEvent_GOAL, team) &&
			!e.currentState.HasGameEventByTeam(state.GameEvent_INVALID_GOAL, team) {
			actions = append(actions, createContinueAction(
				ContinueAction_ACCEPT_GOAL,
				team,
				ContinueAction_READY_MANUAL,
			))
		}

		challengeFlagsRaised := len(e.currentState.FindGameEventsByTeam(state.GameEvent_CHALLENGE_FLAG, team))
		challengeFlagsHandled := len(e.currentState.FindGameEventsByTeam(state.GameEvent_CHALLENGE_FLAG_HANDLED, team))

		if challengeFlagsRaised > challengeFlagsHandled {
			actions = append(actions, createContinueAction(
				ContinueAction_CHALLENGE_ACCEPT,
				team,
				ContinueAction_READY_MANUAL,
			))
			actions = append(actions, createContinueAction(
				ContinueAction_CHALLENGE_REJECT,
				team,
				ContinueAction_READY_MANUAL,
			))
		}
	}

	if (e.gameConfig.RecommendHalfTimes || e.currentState.Stage.IsPausedStage()) &&
		e.currentState.StageTimeLeft.AsDuration() < 0 &&
		*e.currentState.Stage != state.Referee_PENALTY_SHOOTOUT {
		actions = append(actions, createContinueAction(
			ContinueAction_NEXT_STAGE,
			state.Team_UNKNOWN,
			ContinueAction_READY_MANUAL,
		))
	}
	if suggestEndOfMatch(e.currentState) {
		actions = append(actions, createContinueAction(
			ContinueAction_END_GAME,
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
	}

	if e.ballPlacementRequired() {
		placingTeam := e.ballPlacementTeam()
		if placingTeam.Known() {
			actions = append(actions, createContinueAction(
				ContinueAction_BALL_PLACEMENT_START,
				placingTeam,
				ContinueAction_READY_AUTO,
			))
		} else {
			hint := fmt.Sprintf("Manually place the ball at x: %.2fm, y: %.2fm",
				*e.currentState.PlacementPos.X, *e.currentState.PlacementPos.Y)
			hints = append(hints, &ContinueHint{
				Message: &hint,
			})
		}
	}
	if e.currentState.NextCommand != nil {
		var forTeam state.Team
		if e.currentState.NextCommand != nil && e.currentState.NextCommand.ForTeam != nil {
			forTeam = *e.currentState.NextCommand.ForTeam
		} else {
			forTeam = state.Team_UNKNOWN
		}
		actions = append(actions, e.createNextCommandContinueAction(ContinueAction_NEXT_COMMAND, forTeam))
	} else {
		actions = append(actions, e.createNextCommandContinueAction(ContinueAction_FORCE_START, state.Team_UNKNOWN))
		actions = append(actions, e.createNextCommandContinueAction(ContinueAction_FREE_KICK, state.Team_YELLOW))
		actions = append(actions, e.createNextCommandContinueAction(ContinueAction_FREE_KICK, state.Team_BLUE))
	}
	return actions, hints
}

func (e *Engine) teamRequestingBotSubstitution() *state.Team {
	var teams []state.Team
	for _, team := range state.BothTeams() {
		if e.currentState.TeamInfo(team).RequestsBotSubstitutionSince != nil &&
			!*e.currentState.TeamInfo(team).BotSubstitutionAllowed {
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

func (e *Engine) teamDoingBotSubstitution() bool {
	for _, team := range state.BothTeams() {
		if *e.currentState.TeamInfo(team).BotSubstitutionAllowed {
			return true
		}
	}
	return false
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
	teamInFavor := state.Team_UNKNOWN
	if e.currentState.NextCommand != nil {
		teamInFavor = *e.currentState.NextCommand.ForTeam
	}
	if teamInFavor.Unknown() {
		if e.randomPlacingTeam.Unknown() {
			// select a team by 50% chance (for example for force start)
			e.randomPlacingTeam = e.randomTeam()
			log.Printf("No team in favor. Chose one randomly: %v", e.randomPlacingTeam)
		}
		teamInFavor = e.randomPlacingTeam
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

func suggestEndOfMatch(currentState *state.State) bool {
	goalsY := int(*currentState.TeamInfo(state.Team_YELLOW).Goals)
	goalsB := int(*currentState.TeamInfo(state.Team_BLUE).Goals)

	if *currentState.Stage == state.Referee_PENALTY_SHOOTOUT {
		attempts := currentState.ShootoutState.NumberOfAttempts[state.Team_BLUE.String()] +
			currentState.ShootoutState.NumberOfAttempts[state.Team_YELLOW.String()]

		if attempts < 10 || attempts%2 == 1 {
			return false
		}
		return goalsY != goalsB
	}

	if *currentState.Stage != state.Referee_POST_GAME &&
		(goalsY >= 10 || goalsB >= 10) && math.Abs(float64(goalsY-goalsB)) > 1 {
		return true
	}

	if *currentState.Stage == state.Referee_NORMAL_SECOND_HALF ||
		*currentState.Stage == state.Referee_EXTRA_SECOND_HALF {
		return currentState.StageTimeLeft.AsDuration() < 0
	}

	if *currentState.Stage == state.Referee_EXTRA_TIME_BREAK ||
		*currentState.Stage == state.Referee_PENALTY_SHOOTOUT_BREAK ||
		*currentState.Stage == state.Referee_PENALTY_SHOOTOUT {
		return true
	}

	return false
}
