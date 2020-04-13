package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
	"time"
)

func (e *Engine) processBotNumber() {
	for _, team := range state.BothTeams() {
		e.processBotNumberPerTeam(team)
	}
}

func (e *Engine) processBotNumberPerTeam(team state.Team) {

	teamInfo := e.currentState.TeamState[team.String()]
	newCards := newActiveYellowCards(
		teamInfo.YellowCards,
		e.gameConfig.YellowCardDuration-e.gameConfig.YellowCardBotRemovalTime,
	)

	numBots := numRobotsOfTeam(e.gcState.TrackerStateGc.Robots, team)
	numBotsAllowed := *teamInfo.MaxAllowedBots + newCards
	if numBots > numBotsAllowed {
		var ballPos *geom.Vector2
		if e.gcState.TrackerStateGc.Ball != nil {
			ballPos = e.gcState.TrackerStateGc.Ball.Pos.ToVector2()
		}
		e.Enqueue(createGameEventChange(state.GameEvent_TOO_MANY_ROBOTS, state.GameEvent{
			Event: &state.GameEvent_TooManyRobots_{
				TooManyRobots: &state.GameEvent_TooManyRobots{
					ByTeam:           e.currentState.Command.ForTeam,
					NumRobotsAllowed: &numBotsAllowed,
					NumRobotsOnField: &numBots,
					BallLocation:     ballPos,
				},
			},
		}))
	}
}

func newActiveYellowCards(cards []*state.YellowCard, minRemaining time.Duration) (count int32) {
	for _, c := range cards {
		d, _ := ptypes.Duration(c.TimeRemaining)
		if d > minRemaining {
			count++
		}
	}
	return
}

func numRobotsOfTeam(robots []*Robot, team state.Team) (count int32) {
	for _, robot := range robots {
		if *robot.Id.Team == team {
			count++
		}
	}
	return
}
