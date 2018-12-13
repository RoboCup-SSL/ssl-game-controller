package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/pkg/errors"
	"log"
	"time"
)

// TeamChoice represents an outstanding team choice request
type TeamChoice struct {
	Team      Team
	Event     Event
	IssueTime time.Time
}

func (c *GameController) teamConnected(team Team) bool {
	teamName := c.Engine.State.TeamState[team].Name
	if _, ok := c.TeamServer.Clients[teamName]; ok {
		return true
	}
	return false
}

func (c *GameController) ProcessTeamRequests(teamName string, request refproto.TeamToController) error {
	c.ConnectionMutex.Lock()
	defer c.ConnectionMutex.Unlock()
	log.Print("Received request from team: ", request)

	if x, ok := request.GetMsg().(*refproto.TeamToController_AdvantageResponse_); ok {
		if c.outstandingTeamChoice == nil {
			return errors.New("No outstanding choice available. You are probably too late.")
		}
		responseTime := c.Engine.TimeProvider().Sub(c.outstandingTeamChoice.IssueTime)
		if x.AdvantageResponse == refproto.TeamToController_CONTINUE {
			log.Printf("Team %v decided to continue the game within %v", c.outstandingTeamChoice.Team, responseTime)
			switch c.outstandingTeamChoice.Event.GameEvent.Type {
			case GameEventBotCrashUnique:
				c.outstandingTeamChoice.Event.GameEvent.Details.BotCrashUniqueSkipped = c.outstandingTeamChoice.Event.GameEvent.Details.BotCrashUnique
				c.outstandingTeamChoice.Event.GameEvent.Details.BotCrashUnique = nil
				c.outstandingTeamChoice.Event.GameEvent.Type = GameEventBotCrashUniqueSkipped
			case GameEventBotPushedBot:
				c.outstandingTeamChoice.Event.GameEvent.Details.BotPushedBotSkipped = c.outstandingTeamChoice.Event.GameEvent.Details.BotPushedBot
				c.outstandingTeamChoice.Event.GameEvent.Details.BotPushedBot = nil
				c.outstandingTeamChoice.Event.GameEvent.Type = GameEventBotPushedBotSkipped
			default:
				return errors.Errorf("Unsupported advantage choice game event: %v", c.outstandingTeamChoice.Event.GameEvent.Type)
			}
		} else {
			log.Printf("Team %v decided to stop the game within %v", c.outstandingTeamChoice.Team, responseTime)
		}
		c.OnNewEvent(c.outstandingTeamChoice.Event)
		c.outstandingTeamChoice = nil
		return nil
	}

	team := c.Engine.State.TeamByName(teamName)
	if team == TeamUnknown {
		return errors.New("Your team is not playing?!")
	}

	if x, ok := request.GetMsg().(*refproto.TeamToController_SubstituteBot); ok {
		if c.Engine.State.TeamState[team].BotSubstitutionIntend != x.SubstituteBot {
			log.Printf("Team %v updated bot substituation intend to %v", team, x.SubstituteBot)
			c.Engine.State.TeamState[team].BotSubstitutionIntend = x.SubstituteBot
			c.Engine.LogTeamBotSubstitutionChange(team, x.SubstituteBot)
		}
		return nil
	}

	if c.Engine.State.GameState() != GameStateStopped {
		return errors.New("Game is not stopped.")
	}

	if x, ok := request.GetMsg().(*refproto.TeamToController_DesiredKeeper); ok {
		if x.DesiredKeeper < 0 || x.DesiredKeeper > 15 {
			return errors.Errorf("Goalkeeper id is invalid: %v", x.DesiredKeeper)
		}
		log.Printf("Changing keeper for team %v to %v", team, x.DesiredKeeper)
		c.Engine.LogTeamGoalkeeperChange(team, c.Engine.State.TeamState[team].Goalkeeper, int(x.DesiredKeeper))
		c.Engine.State.TeamState[team].Goalkeeper = int(x.DesiredKeeper)
	}

	return nil
}

func (c *GameController) askForTeamDecisionIfRequired(event Event) (handled bool) {
	handled = false
	if c.outstandingTeamChoice == nil && c.Engine.State.GameState() == GameStateRunning {
		var byTeamProto refproto.Team
		var choiceType refproto.AdvantageChoice_Foul
		if event.GameEvent.Details.BotCrashUnique != nil {
			byTeamProto = *event.GameEvent.Details.BotCrashUnique.ByTeam
			choiceType = refproto.AdvantageChoice_COLLISION
		} else if event.GameEvent.Details.BotPushedBot != nil {
			byTeamProto = *event.GameEvent.Details.BotPushedBot.ByTeam
			choiceType = refproto.AdvantageChoice_PUSHING
		}

		forTeam := NewTeam(byTeamProto).Opposite()
		if forTeam != "" {
			teamName := c.Engine.State.TeamState[forTeam].Name
			choice := refproto.AdvantageChoice{Foul: &choiceType}
			requestPayload := refproto.ControllerToTeam_AdvantageChoice{AdvantageChoice: &choice}
			request := refproto.ControllerToTeam{Msg: &requestPayload}
			err := c.TeamServer.SendRequest(teamName, request)
			if err != nil {
				log.Print("Failed to ask for advantage choice: ", err)
			} else {
				c.outstandingTeamChoice = &TeamChoice{Team: forTeam, Event: event, IssueTime: c.Engine.TimeProvider()}
				go c.timeoutTeamChoice()
				handled = true
			}
		}
	}
	return
}

func (c *GameController) timeoutTeamChoice() {
	time.Sleep(c.Config.Game.TeamChoiceTimeout)
	c.ConnectionMutex.Lock()
	defer c.ConnectionMutex.Unlock()
	if c.outstandingTeamChoice != nil {
		c.OnNewEvent(c.outstandingTeamChoice.Event)
	}
}
