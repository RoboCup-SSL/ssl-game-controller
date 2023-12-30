package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
	"time"
)

func mapProposals(groups []*state.ProposalGroup) []*state.GameEventProposalGroup {
	var mappedGroups []*state.GameEventProposalGroup
	for _, group := range groups {
		mappedGroup := state.GameEventProposalGroup{Accepted: group.Accepted}
		mappedGroup.GameEvents = []*state.GameEvent{}
		for _, proposal := range group.Proposals {
			mappedGroup.GameEvents = append(mappedGroup.GameEvents, proposal.GameEvent)
		}
		mappedGroups = append(mappedGroups, &mappedGroup)
	}
	return mappedGroups
}

func mapCommand(command *state.Command) (c *state.Referee_Command) {
	if command == nil {
		return nil
	}
	c = new(state.Referee_Command)
	*c = -1
	switch *command.Type {
	case state.Command_HALT:
		*c = state.Referee_HALT
	case state.Command_STOP:
		*c = state.Referee_STOP
	case state.Command_NORMAL_START:
		*c = state.Referee_NORMAL_START
	case state.Command_FORCE_START:
		*c = state.Referee_FORCE_START
	case state.Command_DIRECT:
		*c = commandByTeam(*command.ForTeam, state.Referee_DIRECT_FREE_BLUE, state.Referee_DIRECT_FREE_YELLOW)
	case state.Command_KICKOFF:
		*c = commandByTeam(*command.ForTeam, state.Referee_PREPARE_KICKOFF_BLUE, state.Referee_PREPARE_KICKOFF_YELLOW)
	case state.Command_PENALTY:
		*c = commandByTeam(*command.ForTeam, state.Referee_PREPARE_PENALTY_BLUE, state.Referee_PREPARE_PENALTY_YELLOW)
	case state.Command_TIMEOUT:
		*c = commandByTeam(*command.ForTeam, state.Referee_TIMEOUT_BLUE, state.Referee_TIMEOUT_YELLOW)
	case state.Command_BALL_PLACEMENT:
		*c = commandByTeam(*command.ForTeam, state.Referee_BALL_PLACEMENT_BLUE, state.Referee_BALL_PLACEMENT_YELLOW)
	}
	return
}

func commandByTeam(team state.Team, blueCommand state.Referee_Command, yellowCommand state.Referee_Command) state.Referee_Command {
	if team == state.Team_BLUE {
		return blueCommand
	} else if team == state.Team_YELLOW {
		return yellowCommand
	}
	log.Printf("Invalid team: %v. Could not choose from %v and %v", team, blueCommand, yellowCommand)
	return -1
}

func mapYellowCardTimes(cards []*state.YellowCard) (times []uint32) {
	for _, c := range cards {
		duration := c.TimeRemaining.AsDuration()
		if duration > 0 {
			times = append(times, mapTime(duration))
		}
	}
	return times
}

func mapTime(duration time.Duration) uint32 {
	if duration.Nanoseconds() > 0 {
		return uint32(duration.Nanoseconds() / 1000)
	}
	return 0
}

func mapLocation(location *geom.Vector2) *state.Referee_Point {
	if location == nil {
		return nil
	}
	x := location.GetX() * 1000.0
	y := location.GetY() * 1000.0
	return &state.Referee_Point{X: &x, Y: &y}
}
