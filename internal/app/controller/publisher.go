package controller

import (
	"github.com/RoboCup-SSL/ssl-go-tools/sslproto"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

type RefBoxPublisher struct {
	Conn    *net.UDPConn
	Message sslproto.SSL_Referee
}

// NewBroadcaster creates a new UDP multicast connection on which to broadcast
func NewRefBoxPublisher(address string) RefBoxPublisher {
	addr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		log.Fatalln(err)
	}

	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Fatalln(err)
	}
	conn.SetReadBuffer(maxDatagramSize)
	log.Println("Connected to", address)

	publisher := RefBoxPublisher{}
	publisher.Conn = conn

	initRefereeMessage(&publisher.Message)

	return publisher
}

func initRefereeMessage(m *sslproto.SSL_Referee) {
	m.PacketTimestamp = new(uint64)
	m.Stage = new(sslproto.SSL_Referee_Stage)
	m.StageTimeLeft = new(int32)
	m.Command = new(sslproto.SSL_Referee_Command)
	m.CommandCounter = new(uint32)
	m.CommandTimestamp = new(uint64)
	m.Yellow = new(sslproto.SSL_Referee_TeamInfo)
	initTeamInfo(m.Yellow)
	m.Blue = new(sslproto.SSL_Referee_TeamInfo)
	initTeamInfo(m.Blue)
	m.BlueTeamOnPositiveHalf = new(bool)
}

func initTeamInfo(t *sslproto.SSL_Referee_TeamInfo) {
	t.Name = new(string)
	t.Score = new(uint32)
	t.RedCards = new(uint32)
	t.YellowCards = new(uint32)
	t.Timeouts = new(uint32)
	t.TimeoutTime = new(uint32)
	t.Goalie = new(uint32)
}

func (p *RefBoxPublisher) Publish(state *RefBoxState, command *RefBoxEventCommand) {

	updateMessage(&p.Message, state, command)
	bytes, err := proto.Marshal(&p.Message)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", state, err)
		return
	}
	_, err = p.Conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
	}
}

func updateMessage(r *sslproto.SSL_Referee, state *RefBoxState, command *RefBoxEventCommand) {

	*r.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*r.Stage = mapStage(state.Stage)
	*r.StageTimeLeft = int32(state.GameTimeLeft.Nanoseconds() / 1000)
	*r.BlueTeamOnPositiveHalf = state.TeamState[TeamBlue].OnPositiveHalf
	updateTeam(r.Yellow, state.TeamState[TeamYellow])
	updateTeam(r.Blue, state.TeamState[TeamBlue])

	if command != nil {
		*r.Command = mapCommand(command)
		*r.CommandCounter++
		*r.CommandTimestamp = uint64(time.Now().UnixNano() / 1000)
	}
}
func mapCommand(c *RefBoxEventCommand) sslproto.SSL_Referee_Command {
	switch c.Type {
	case CommandHalt:
		return sslproto.SSL_Referee_HALT
	case CommandStop:
		return sslproto.SSL_Referee_STOP
	case CommandNormalStart:
		return sslproto.SSL_Referee_NORMAL_START
	case CommandForceStart:
		return sslproto.SSL_Referee_FORCE_START
	case CommandDirect:
		return commandByTeam(c, sslproto.SSL_Referee_DIRECT_FREE_BLUE, sslproto.SSL_Referee_DIRECT_FREE_YELLOW)
	case CommandIndirect:
		return commandByTeam(c, sslproto.SSL_Referee_INDIRECT_FREE_BLUE, sslproto.SSL_Referee_INDIRECT_FREE_YELLOW)
	case CommandKickoff:
		return commandByTeam(c, sslproto.SSL_Referee_PREPARE_KICKOFF_BLUE, sslproto.SSL_Referee_PREPARE_KICKOFF_YELLOW)
	case CommandPenalty:
		return commandByTeam(c, sslproto.SSL_Referee_PREPARE_PENALTY_BLUE, sslproto.SSL_Referee_PREPARE_PENALTY_YELLOW)
	case CommandTimeout:
		return commandByTeam(c, sslproto.SSL_Referee_TIMEOUT_BLUE, sslproto.SSL_Referee_TIMEOUT_YELLOW)
	case CommandBallPlacement:
		return commandByTeam(c, sslproto.SSL_Referee_BALL_PLACEMENT_BLUE, sslproto.SSL_Referee_BALL_PLACEMENT_YELLOW)
	case CommandGoal:
		return commandByTeam(c, sslproto.SSL_Referee_GOAL_BLUE, sslproto.SSL_Referee_GOAL_YELLOW)
	}
	return -1
}

func commandByTeam(command *RefBoxEventCommand, blueCommand sslproto.SSL_Referee_Command, yellowCommand sslproto.SSL_Referee_Command) sslproto.SSL_Referee_Command {
	if *command.ForTeam == TeamBlue {
		return blueCommand
	}
	return yellowCommand
}

func updateTeam(team *sslproto.SSL_Referee_TeamInfo, state *RefBoxTeamState) {
	*team.Name = state.Name
	*team.Score = uint32(state.Goals)
	*team.RedCards = uint32(state.RedCards)
	team.YellowCardTimes = mapTimes(state.YellowCardTimes)
	*team.YellowCards = uint32(state.YellowCards)
	*team.Timeouts = uint32(state.TimeoutsLeft)
	*team.TimeoutTime = uint32(state.TimeoutTimeLeft.Nanoseconds() / 1000)
	*team.Goalie = uint32(state.Goalie)
}

func mapTimes(durations []time.Duration) []uint32 {
	times := make([]uint32, len(durations))
	for i, d := range durations {
		times[i] = uint32(d.Nanoseconds() / 1000)
	}
	return times
}

func mapStage(stage RefBoxStage) sslproto.SSL_Referee_Stage {
	switch stage {
	case StagePreGame:
		return sslproto.SSL_Referee_NORMAL_FIRST_HALF_PRE
	case StageFirstHalf:
		return sslproto.SSL_Referee_NORMAL_FIRST_HALF
	case StageHalfTime:
		return sslproto.SSL_Referee_NORMAL_HALF_TIME
	case StageSecondHalfPre:
		return sslproto.SSL_Referee_NORMAL_SECOND_HALF_PRE
	case StageSecondHalf:
		return sslproto.SSL_Referee_NORMAL_SECOND_HALF
	case StageOvertimeBreak:
		return sslproto.SSL_Referee_EXTRA_TIME_BREAK
	case StageOvertimeFirstHalfPre:
		return sslproto.SSL_Referee_EXTRA_FIRST_HALF_PRE
	case StageOvertimeFirstHalf:
		return sslproto.SSL_Referee_EXTRA_FIRST_HALF
	case StageOvertimeHalfTime:
		return sslproto.SSL_Referee_EXTRA_HALF_TIME
	case StageOvertimeSecondHalfPre:
		return sslproto.SSL_Referee_EXTRA_SECOND_HALF_PRE
	case StageOvertimeSecondHalf:
		return sslproto.SSL_Referee_EXTRA_SECOND_HALF
	case StageShootoutBreak:
		return sslproto.SSL_Referee_PENALTY_SHOOTOUT_BREAK
	case StageShootout:
		return sslproto.SSL_Referee_PENALTY_SHOOTOUT
	case StagePostGame:
		return sslproto.SSL_Referee_POST_GAME
	}
	return -1
}
