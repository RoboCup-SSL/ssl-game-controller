package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

type BotNumberProcessor struct {
	gcEngine *Engine
	lastTime *time.Time
}

func (p *BotNumberProcessor) processBotNumber() {

	if !p.gcEngine.currentState.Command.IsRunning() ||
		!p.gcEngine.IsGameEventEnabled(state.GameEvent_TOO_MANY_ROBOTS) {
		p.lastTime = nil
		return
	}

	if p.lastTime == nil {
		p.lastTime = new(time.Time)
		*p.lastTime = p.gcEngine.timeProvider()
		return
	}

	timeSinceLastProgress := p.gcEngine.timeProvider().Sub(*p.lastTime)
	if timeSinceLastProgress < 2*time.Second {
		return
	}

	for _, team := range state.BothTeams() {
		p.gcEngine.processBotNumberPerTeam(team)
	}
}

func (e *Engine) processBotNumberPerTeam(team state.Team) {

	teamInfo := e.currentState.TeamState[team.String()]
	removalTime := e.gameConfig.YellowCardBotRemovalTime
	if *e.currentState.GameState.Type != state.GameState_RUNNING {
		removalTime = 0
	}
	newCards := newActiveYellowCards(
		teamInfo.YellowCards,
		e.gameConfig.YellowCardDuration-removalTime,
	)

	numBots := e.trackerStateGc.NumTeamRobots(team)
	numBotsAllowed := *teamInfo.MaxAllowedBots + newCards
	if numBots > numBotsAllowed {

		advantageChoice := e.gcState.TeamState[team.Opposite().String()].AdvantageChoice
		if *advantageChoice.Choice == TeamAdvantageChoice_CONTINUE {
			return
		}

		var ballPos *geom.Vector2
		if e.trackerStateGc.Ball != nil {
			ballPos = e.trackerStateGc.Ball.Pos.ToVector2()
		}
		e.Enqueue(createGameEventChange(state.GameEvent_TOO_MANY_ROBOTS, &state.GameEvent{
			Event: &state.GameEvent_TooManyRobots_{
				TooManyRobots: &state.GameEvent_TooManyRobots{
					ByTeam:           &team,
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
		d := c.TimeRemaining.AsDuration()
		if d > minRemaining {
			count++
		}
	}
	return
}
