package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	address string
	conn    *net.UDPConn
	Message RefMessage
}

type RefMessage struct {
	ProtoMsg *refproto.Referee
	goal     map[Team]bool
	Send     func()
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address string) (publisher Publisher) {

	publisher.address = address

	// initialize default referee message
	publisher.Message = RefMessage{Send: publisher.send, ProtoMsg: new(refproto.Referee), goal: map[Team]bool{}}
	publisher.Message.goal[TeamBlue] = false
	publisher.Message.goal[TeamYellow] = false

	initRefereeMessage(publisher.Message.ProtoMsg)

	publisher.connect()

	return
}

func (p *Publisher) connect() {
	p.conn = nil

	addr, err := net.ResolveUDPAddr("udp", p.address)
	if err != nil {
		log.Printf("Could not resolve address '%v': %v", p.address, err)
		return
	}

	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Printf("Could not connect to '%v': %v", addr, err)
		return
	}

	if err := conn.SetWriteBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set write buffer to %v.", maxDatagramSize)
	}
	log.Println("Publishing to", p.address)

	p.conn = conn
	return
}

func (p *Publisher) disconnect() {
	p.conn = nil
}

func initRefereeMessage(m *refproto.Referee) {
	m.PacketTimestamp = new(uint64)
	m.Stage = new(refproto.Referee_Stage)
	m.StageTimeLeft = new(int32)
	m.Command = new(refproto.Referee_Command)
	m.CommandCounter = new(uint32)
	m.CommandTimestamp = new(uint64)
	m.Yellow = new(refproto.Referee_TeamInfo)
	initTeamInfo(m.Yellow)
	m.Blue = new(refproto.Referee_TeamInfo)
	initTeamInfo(m.Blue)
	m.BlueTeamOnPositiveHalf = new(bool)
	m.NextCommand = new(refproto.Referee_Command)
	m.CurrentActionTimeRemaining = new(int32)
}

func initTeamInfo(t *refproto.Referee_TeamInfo) {
	t.Name = new(string)
	t.Score = new(uint32)
	t.RedCards = new(uint32)
	t.YellowCards = new(uint32)
	t.Timeouts = new(uint32)
	t.TimeoutTime = new(uint32)
	t.Goalkeeper = new(uint32)
	t.FoulCounter = new(uint32)
	t.BallPlacementFailures = new(uint32)
	t.CanPlaceBall = new(bool)
	t.MaxAllowedBots = new(uint32)
	t.BotSubstitutionIntent = new(bool)
}

// Publish the state and command
func (p *Publisher) Publish(gcState *GameControllerState) {
	p.Message.Publish(gcState)
}

// Publish the state and command
func (p *RefMessage) Publish(gcState *GameControllerState) {
	p.setState(gcState)
	p.sendCommands(gcState.MatchState)
}

func (p *Publisher) send() {
	if p.conn == nil {
		go p.connect()
		return
	}

	bytes, err := proto.Marshal(p.Message.ProtoMsg)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", p.Message, err)
		return
	}
	_, err = p.conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
		p.disconnect()
	}
}

func (p *RefMessage) setState(gcState *GameControllerState) (republish bool) {
	state := gcState.MatchState
	p.ProtoMsg.GameEvents = mapGameEvents(state.GameEvents)
	p.ProtoMsg.DesignatedPosition = mapLocation(state.PlacementPos)
	p.ProtoMsg.ProposedGameEvents = mapProposals(gcState.GameEventProposals)

	*p.ProtoMsg.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*p.ProtoMsg.Stage = mapStage(state.Stage)
	*p.ProtoMsg.StageTimeLeft = int32(state.StageTimeLeft.Nanoseconds() / 1000)
	*p.ProtoMsg.BlueTeamOnPositiveHalf = state.TeamState[TeamBlue].OnPositiveHalf
	*p.ProtoMsg.NextCommand = mapCommand(state.NextCommand, state.NextCommandFor)
	*p.ProtoMsg.CurrentActionTimeRemaining = int32(state.CurrentActionTimeRemaining.Nanoseconds() / 1000)

	p.updateTeam(p.ProtoMsg.Yellow, state.TeamState[TeamYellow], TeamYellow)
	p.updateTeam(p.ProtoMsg.Blue, state.TeamState[TeamBlue], TeamBlue)
	return
}

func mapProposals(proposals []*GameEventProposal) []*refproto.ProposedGameEvent {
	mappedProposals := make([]*refproto.ProposedGameEvent, len(proposals))
	for i, proposal := range proposals {
		mappedProposals[i] = new(refproto.ProposedGameEvent)
		mappedProposals[i].ProposerId = &proposal.ProposerId
		mappedProposals[i].ValidUntil = new(uint64)
		*mappedProposals[i].ValidUntil = uint64(proposal.ValidUntil.UnixNano() / 1000)
		mappedProposals[i].GameEvent = proposal.GameEvent.ToProto()
	}
	return mappedProposals
}

func (p *RefMessage) sendCommands(state *State) {
	newCommand := mapCommand(state.Command, state.CommandFor)

	// send the GOAL command based on the team score for compatibility with old behavior
	if p.goal[TeamYellow] {
		p.updateCommand(refproto.Referee_GOAL_YELLOW)
		p.Send()
		p.updateCommand(newCommand)
		p.goal[TeamYellow] = false
	} else if p.goal[TeamBlue] {
		p.updateCommand(refproto.Referee_GOAL_BLUE)
		p.Send()
		p.updateCommand(newCommand)
		p.goal[TeamBlue] = false
	} else if *p.ProtoMsg.Command != newCommand {
		switch state.Command {
		case CommandBallPlacement,
			CommandDirect,
			CommandIndirect,
			CommandKickoff,
			CommandPenalty:
			if *p.ProtoMsg.Command != refproto.Referee_STOP {
				// send a STOP right before the actual command to be compatible with old behavior
				p.updateCommand(refproto.Referee_STOP)
				p.Send()
			}
		}
		p.updateCommand(newCommand)
	}

	p.Send()
}

func (p *RefMessage) updateCommand(newCommand refproto.Referee_Command) {
	*p.ProtoMsg.Command = newCommand
	*p.ProtoMsg.CommandCounter++
	*p.ProtoMsg.CommandTimestamp = uint64(time.Now().UnixNano() / 1000)
}

func mapGameEvents(events []*GameEvent) []*refproto.GameEvent {
	mappedEvents := make([]*refproto.GameEvent, len(events))
	for i, e := range events {
		mappedEvents[i] = e.ToProto()
	}
	return mappedEvents
}

func mapCommand(command RefCommand, team Team) refproto.Referee_Command {
	switch command {
	case CommandHalt:
		return refproto.Referee_HALT
	case CommandStop:
		return refproto.Referee_STOP
	case CommandNormalStart:
		return refproto.Referee_NORMAL_START
	case CommandForceStart:
		return refproto.Referee_FORCE_START
	case CommandDirect:
		return commandByTeam(team, refproto.Referee_DIRECT_FREE_BLUE, refproto.Referee_DIRECT_FREE_YELLOW)
	case CommandIndirect:
		return commandByTeam(team, refproto.Referee_INDIRECT_FREE_BLUE, refproto.Referee_INDIRECT_FREE_YELLOW)
	case CommandKickoff:
		return commandByTeam(team, refproto.Referee_PREPARE_KICKOFF_BLUE, refproto.Referee_PREPARE_KICKOFF_YELLOW)
	case CommandPenalty:
		return commandByTeam(team, refproto.Referee_PREPARE_PENALTY_BLUE, refproto.Referee_PREPARE_PENALTY_YELLOW)
	case CommandTimeout:
		return commandByTeam(team, refproto.Referee_TIMEOUT_BLUE, refproto.Referee_TIMEOUT_YELLOW)
	case CommandBallPlacement:
		return commandByTeam(team, refproto.Referee_BALL_PLACEMENT_BLUE, refproto.Referee_BALL_PLACEMENT_YELLOW)
	}
	return -1
}

func commandByTeam(team Team, blueCommand refproto.Referee_Command, yellowCommand refproto.Referee_Command) refproto.Referee_Command {
	if team == TeamBlue {
		return blueCommand
	}
	return yellowCommand
}

func (p *RefMessage) updateTeam(teamInfo *refproto.Referee_TeamInfo, state *TeamInfo, team Team) {

	if state.Goals > int(*teamInfo.Score) {
		p.goal[team] = true
	}

	*teamInfo.Name = state.Name
	*teamInfo.Score = uint32(state.Goals)
	*teamInfo.RedCards = uint32(state.RedCards)
	teamInfo.YellowCardTimes = mapTimes(state.YellowCardTimes)
	*teamInfo.YellowCards = uint32(state.YellowCards)
	*teamInfo.Timeouts = uint32(state.TimeoutsLeft)
	*teamInfo.Goalkeeper = uint32(state.Goalkeeper)
	*teamInfo.FoulCounter = uint32(state.FoulCounter)
	*teamInfo.BallPlacementFailures = uint32(state.BallPlacementFailures)
	*teamInfo.CanPlaceBall = state.CanPlaceBall
	*teamInfo.MaxAllowedBots = uint32(state.MaxAllowedBots)
	*teamInfo.BotSubstitutionIntent = state.BotSubstitutionIntend

	if state.TimeoutTimeLeft.Nanoseconds() > 0 {
		*teamInfo.TimeoutTime = uint32(state.TimeoutTimeLeft.Nanoseconds() / 1000)
	} else {
		*teamInfo.TimeoutTime = 0
	}
}

func mapTimes(durations []time.Duration) []uint32 {
	times := make([]uint32, len(durations))
	for i, d := range durations {
		times[i] = uint32(d.Nanoseconds() / 1000)
	}
	return times
}

func mapStage(stage Stage) refproto.Referee_Stage {
	switch stage {
	case StagePreGame:
		return refproto.Referee_NORMAL_FIRST_HALF_PRE
	case StageFirstHalf:
		return refproto.Referee_NORMAL_FIRST_HALF
	case StageHalfTime:
		return refproto.Referee_NORMAL_HALF_TIME
	case StageSecondHalfPre:
		return refproto.Referee_NORMAL_SECOND_HALF_PRE
	case StageSecondHalf:
		return refproto.Referee_NORMAL_SECOND_HALF
	case StageOvertimeBreak:
		return refproto.Referee_EXTRA_TIME_BREAK
	case StageOvertimeFirstHalfPre:
		return refproto.Referee_EXTRA_FIRST_HALF_PRE
	case StageOvertimeFirstHalf:
		return refproto.Referee_EXTRA_FIRST_HALF
	case StageOvertimeHalfTime:
		return refproto.Referee_EXTRA_HALF_TIME
	case StageOvertimeSecondHalfPre:
		return refproto.Referee_EXTRA_SECOND_HALF_PRE
	case StageOvertimeSecondHalf:
		return refproto.Referee_EXTRA_SECOND_HALF
	case StageShootoutBreak:
		return refproto.Referee_PENALTY_SHOOTOUT_BREAK
	case StageShootout:
		return refproto.Referee_PENALTY_SHOOTOUT
	case StagePostGame:
		return refproto.Referee_POST_GAME
	}
	return -1
}

func mapLocation(location *Location) *refproto.Referee_Point {
	if location == nil {
		return nil
	}
	x := float32(location.X) * 1000.0
	y := float32(location.Y) * 1000.0
	return &refproto.Referee_Point{X: &x, Y: &y}
}
