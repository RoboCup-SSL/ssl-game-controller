package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/golang/protobuf/proto"
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

func (c *GameController) teamConnected(team Team) (connected bool, verified bool) {
	teamName := c.Engine.State.TeamState[team].Name
	if client, ok := c.TeamServer.Clients[teamName]; ok {
		connected = true
		verified = client.VerifiedConnection
		return
	}
	connected = false
	verified = false
	return
}

func (c *GameController) ProcessTeamRequests(teamName string, request refproto.TeamToController) error {
	c.ConnectionMutex.Lock()
	defer c.ConnectionMutex.Unlock()

	if _, ok := request.GetMsg().(*refproto.TeamToController_Ping); ok {
		return nil
	}

	log.Print("Received request from team: ", proto.MarshalTextString(&request))

	if msg, ok := request.GetMsg().(*refproto.TeamToController_AdvantageResponse_); ok {
		if c.outstandingTeamChoice == nil {
			return errors.New("No outstanding choice available. You are probably too late.")
		}
		responseTime := c.Engine.TimeProvider().Sub(c.outstandingTeamChoice.IssueTime)
		if msg.AdvantageResponse == refproto.TeamToController_CONTINUE {
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
			case GameEventAttackerTouchedOpponentInDefenseArea:
				c.outstandingTeamChoice.Event.GameEvent.Details.AttackerTouchedOpponentInDefenseAreaSkipped = c.outstandingTeamChoice.Event.GameEvent.Details.AttackerTouchedOpponentInDefenseArea
				c.outstandingTeamChoice.Event.GameEvent.Details.AttackerTouchedOpponentInDefenseArea = nil
				c.outstandingTeamChoice.Event.GameEvent.Type = GameEventAttackerTouchedOpponentInDefenseAreaSkipped
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
		var choice refproto.AdvantageChoice
		choice.Foul = new(refproto.AdvantageChoice_Foul)
		if event.GameEvent.Details.BotCrashUnique != nil {
			byTeamProto = *event.GameEvent.Details.BotCrashUnique.ByTeam
			*choice.Foul = refproto.AdvantageChoice_COLLISION
			choice.BotCrashUnique = new(refproto.GameEvent_BotCrashUnique)
			*choice.BotCrashUnique = *event.GameEvent.Details.BotCrashUnique
		} else if event.GameEvent.Details.BotPushedBot != nil {
			byTeamProto = *event.GameEvent.Details.BotPushedBot.ByTeam
			*choice.Foul = refproto.AdvantageChoice_PUSHING
			choice.BotPushedBot = new(refproto.GameEvent_BotPushedBot)
			*choice.BotPushedBot = *event.GameEvent.Details.BotPushedBot
		} else if event.GameEvent.Details.AttackerTouchedOpponentInDefenseArea != nil {
			byTeamProto = *event.GameEvent.Details.AttackerTouchedOpponentInDefenseArea.ByTeam
			*choice.Foul = refproto.AdvantageChoice_ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA
			choice.AttackerTouchedOpponentInDefenseArea = new(refproto.GameEvent_AttackerTouchedOpponentInDefenseArea)
			*choice.AttackerTouchedOpponentInDefenseArea = *event.GameEvent.Details.AttackerTouchedOpponentInDefenseArea
		}

		forTeam := NewTeam(byTeamProto).Opposite()
		if forTeam != "" {
			teamName := c.Engine.State.TeamState[forTeam].Name
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
