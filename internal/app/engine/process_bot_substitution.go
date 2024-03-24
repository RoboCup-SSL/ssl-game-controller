package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/durationpb"
)

func (e *Engine) processBotSubstitution() {
	if e.currentState.GameState.IsHalted() {
		for _, team := range state.BothTeams() {
			if *e.currentState.TeamInfo(team).BotSubstitutionAllowed {
				if e.currentState.TeamInfo(team).BotSubstitutionTimeLeft.AsDuration() <= 0 {
					e.Enqueue(createBotSubstitutionEventChange(team))
					e.currentState.TeamInfo(team).BotSubstitutionTimeLeft = durationpb.New(e.gameConfig.BotSubstitutionTime)
				}
			} else {
				e.currentState.TeamInfo(team).BotSubstitutionTimeLeft = durationpb.New(0)
			}
		}
	}
}
