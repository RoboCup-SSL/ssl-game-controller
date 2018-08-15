package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/proto"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	conn    *net.UDPConn
	message sslproto.Referee
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address string) (publisher Publisher, err error) {
	addr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		return
	}

	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		return
	}

	conn.SetReadBuffer(maxDatagramSize)
	log.Println("Publishing to", address)

	publisher.conn = conn

	initRefereeMessage(&publisher.message)

	return
}

func initRefereeMessage(m *sslproto.Referee) {
	m.PacketTimestamp = new(uint64)
	m.Stage = new(sslproto.Referee_Stage)
	m.StageTimeLeft = new(int32)
	m.Command = new(sslproto.Referee_Command)
	m.CommandCounter = new(uint32)
	m.CommandTimestamp = new(uint64)
	m.Yellow = new(sslproto.Referee_TeamInfo)
	initTeamInfo(m.Yellow)
	m.Blue = new(sslproto.Referee_TeamInfo)
	initTeamInfo(m.Blue)
	m.BlueTeamOnPositiveHalf = new(bool)
}

func initTeamInfo(t *sslproto.Referee_TeamInfo) {
	t.Name = new(string)
	t.Score = new(uint32)
	t.RedCards = new(uint32)
	t.YellowCards = new(uint32)
	t.Timeouts = new(uint32)
	t.TimeoutTime = new(uint32)
	t.Goalie = new(uint32)
	t.BotCollisions = new(uint32)
	t.BallPlacementFailures = new(uint32)
	t.BotSpeedInfringements = new(uint32)
}

// Publish the state and command
func (p *Publisher) Publish(state *State, command *EventCommand) {

	if p.conn == nil {
		return
	}

	updateMessage(&p.message, state, command)
	bytes, err := proto.Marshal(&p.message)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", state, err)
		return
	}
	_, err = p.conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
	}
}

func updateMessage(r *sslproto.Referee, state *State, command *EventCommand) {

	*r.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*r.Stage = mapStage(state.Stage)
	*r.StageTimeLeft = int32(state.StageTimeLeft.Nanoseconds() / 1000)
	*r.BlueTeamOnPositiveHalf = state.TeamState[TeamBlue].OnPositiveHalf
	updateTeam(r.Yellow, state.TeamState[TeamYellow])
	updateTeam(r.Blue, state.TeamState[TeamBlue])

	if command != nil {
		*r.Command = mapCommand(command)
		*r.CommandCounter++
		*r.CommandTimestamp = uint64(time.Now().UnixNano() / 1000)
	}
}

func mapCommand(c *EventCommand) sslproto.Referee_Command {
	switch c.Type {
	case CommandHalt:
		return sslproto.Referee_HALT
	case CommandStop:
		return sslproto.Referee_STOP
	case CommandNormalStart:
		return sslproto.Referee_NORMAL_START
	case CommandForceStart:
		return sslproto.Referee_FORCE_START
	case CommandDirect:
		return commandByTeam(c, sslproto.Referee_DIRECT_FREE_BLUE, sslproto.Referee_DIRECT_FREE_YELLOW)
	case CommandIndirect:
		return commandByTeam(c, sslproto.Referee_INDIRECT_FREE_BLUE, sslproto.Referee_INDIRECT_FREE_YELLOW)
	case CommandKickoff:
		return commandByTeam(c, sslproto.Referee_PREPARE_KICKOFF_BLUE, sslproto.Referee_PREPARE_KICKOFF_YELLOW)
	case CommandPenalty:
		return commandByTeam(c, sslproto.Referee_PREPARE_PENALTY_BLUE, sslproto.Referee_PREPARE_PENALTY_YELLOW)
	case CommandTimeout:
		return commandByTeam(c, sslproto.Referee_TIMEOUT_BLUE, sslproto.Referee_TIMEOUT_YELLOW)
	case CommandBallPlacement:
		return commandByTeam(c, sslproto.Referee_BALL_PLACEMENT_BLUE, sslproto.Referee_BALL_PLACEMENT_YELLOW)
	case CommandGoal:
		return commandByTeam(c, sslproto.Referee_GOAL_BLUE, sslproto.Referee_GOAL_YELLOW)
	}
	return -1
}

func commandByTeam(command *EventCommand, blueCommand sslproto.Referee_Command, yellowCommand sslproto.Referee_Command) sslproto.Referee_Command {
	if *command.ForTeam == TeamBlue {
		return blueCommand
	}
	return yellowCommand
}

func updateTeam(team *sslproto.Referee_TeamInfo, state *TeamInfo) {
	*team.Name = state.Name
	*team.Score = uint32(state.Goals)
	*team.RedCards = uint32(state.RedCards)
	team.YellowCardTimes = mapTimes(state.YellowCardTimes)
	*team.YellowCards = uint32(state.YellowCards)
	*team.Timeouts = uint32(state.TimeoutsLeft)
	*team.TimeoutTime = uint32(state.TimeoutTimeLeft.Nanoseconds() / 1000)
	*team.Goalie = uint32(state.Goalie)
	*team.BotCollisions = uint32(state.BotCollisions)
	*team.BallPlacementFailures = uint32(state.BallPlacementFailures)
	*team.BotSpeedInfringements = uint32(state.BotSpeedInfringements)
}

func mapTimes(durations []time.Duration) []uint32 {
	times := make([]uint32, len(durations))
	for i, d := range durations {
		times[i] = uint32(d.Nanoseconds() / 1000)
	}
	return times
}

func mapStage(stage Stage) sslproto.Referee_Stage {
	switch stage {
	case StagePreGame:
		return sslproto.Referee_NORMAL_FIRST_HALF_PRE
	case StageFirstHalf:
		return sslproto.Referee_NORMAL_FIRST_HALF
	case StageHalfTime:
		return sslproto.Referee_NORMAL_HALF_TIME
	case StageSecondHalfPre:
		return sslproto.Referee_NORMAL_SECOND_HALF_PRE
	case StageSecondHalf:
		return sslproto.Referee_NORMAL_SECOND_HALF
	case StageOvertimeBreak:
		return sslproto.Referee_EXTRA_TIME_BREAK
	case StageOvertimeFirstHalfPre:
		return sslproto.Referee_EXTRA_FIRST_HALF_PRE
	case StageOvertimeFirstHalf:
		return sslproto.Referee_EXTRA_FIRST_HALF
	case StageOvertimeHalfTime:
		return sslproto.Referee_EXTRA_HALF_TIME
	case StageOvertimeSecondHalfPre:
		return sslproto.Referee_EXTRA_SECOND_HALF_PRE
	case StageOvertimeSecondHalf:
		return sslproto.Referee_EXTRA_SECOND_HALF
	case StageShootoutBreak:
		return sslproto.Referee_PENALTY_SHOOTOUT_BREAK
	case StageShootout:
		return sslproto.Referee_PENALTY_SHOOTOUT
	case StagePostGame:
		return sslproto.Referee_POST_GAME
	}
	return -1
}
