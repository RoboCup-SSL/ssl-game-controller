package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
	"time"
)

func mapGameEvents(events []state.GameEvent) []*state.GameEvent {
	mappedEvents := make([]*state.GameEvent, len(events))
	for i, e := range events {
		mappedEvents[i] = &e
	}
	return mappedEvents
}

func mapProposedGameEvents(events []state.ProposedGameEvent) []*state.ProposedGameEvent {
	mappedEvents := make([]*state.ProposedGameEvent, len(events))
	for i, e := range events {
		mappedEvents[i] = &e
	}
	return mappedEvents
}

func mapCommand(command state.RefCommand, team state.Team) state.Referee_Command {
	switch command {
	case state.CommandHalt:
		return state.Referee_HALT
	case state.CommandStop:
		return state.Referee_STOP
	case state.CommandNormalStart:
		return state.Referee_NORMAL_START
	case state.CommandForceStart:
		return state.Referee_FORCE_START
	case state.CommandDirect:
		return commandByTeam(team, state.Referee_DIRECT_FREE_BLUE, state.Referee_DIRECT_FREE_YELLOW)
	case state.CommandIndirect:
		return commandByTeam(team, state.Referee_INDIRECT_FREE_BLUE, state.Referee_INDIRECT_FREE_YELLOW)
	case state.CommandKickoff:
		return commandByTeam(team, state.Referee_PREPARE_KICKOFF_BLUE, state.Referee_PREPARE_KICKOFF_YELLOW)
	case state.CommandPenalty:
		return commandByTeam(team, state.Referee_PREPARE_PENALTY_BLUE, state.Referee_PREPARE_PENALTY_YELLOW)
	case state.CommandTimeout:
		return commandByTeam(team, state.Referee_TIMEOUT_BLUE, state.Referee_TIMEOUT_YELLOW)
	case state.CommandBallPlacement:
		return commandByTeam(team, state.Referee_BALL_PLACEMENT_BLUE, state.Referee_BALL_PLACEMENT_YELLOW)
	}
	return -1
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

func mapYellowCardTimes(cards []state.YellowCard) []uint32 {
	times := make([]uint32, len(cards))
	for i, c := range cards {
		if c.TimeRemaining > 0 {
			times[i] = mapTime(c.TimeRemaining)
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

func mapStage(stage state.Stage) state.Referee_Stage {
	switch stage {
	case state.StagePreGame:
		return state.Referee_NORMAL_FIRST_HALF_PRE
	case state.StageFirstHalf:
		return state.Referee_NORMAL_FIRST_HALF
	case state.StageHalfTime:
		return state.Referee_NORMAL_HALF_TIME
	case state.StageSecondHalfPre:
		return state.Referee_NORMAL_SECOND_HALF_PRE
	case state.StageSecondHalf:
		return state.Referee_NORMAL_SECOND_HALF
	case state.StageOvertimeBreak:
		return state.Referee_EXTRA_TIME_BREAK
	case state.StageOvertimeFirstHalfPre:
		return state.Referee_EXTRA_FIRST_HALF_PRE
	case state.StageOvertimeFirstHalf:
		return state.Referee_EXTRA_FIRST_HALF
	case state.StageOvertimeHalfTime:
		return state.Referee_EXTRA_HALF_TIME
	case state.StageOvertimeSecondHalfPre:
		return state.Referee_EXTRA_SECOND_HALF_PRE
	case state.StageOvertimeSecondHalf:
		return state.Referee_EXTRA_SECOND_HALF
	case state.StageShootoutBreak:
		return state.Referee_PENALTY_SHOOTOUT_BREAK
	case state.StageShootout:
		return state.Referee_PENALTY_SHOOTOUT
	case state.StagePostGame:
		return state.Referee_POST_GAME
	}
	return -1
}

func mapLocation(location *state.Location) *state.Referee_Point {
	if location == nil {
		return nil
	}
	x := *location.X * 1000.0
	y := *location.Y * 1000.0
	return &state.Referee_Point{X: &x, Y: &y}
}
