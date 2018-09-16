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
	conn    *net.UDPConn
	message RefMessage
}

type RefMessage struct {
	referee *refproto.Referee
	send    func()
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

	if err := conn.SetWriteBuffer(maxDatagramSize); err != nil {
		log.Printf("Could not set write buffer to %v.", maxDatagramSize)
	}
	log.Println("Publishing to", address)

	publisher.conn = conn
	publisher.message = RefMessage{send: publisher.send, referee: new(refproto.Referee)}

	initRefereeMessage(publisher.message.referee)

	return
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
}

func initTeamInfo(t *refproto.Referee_TeamInfo) {
	t.Name = new(string)
	t.Score = new(uint32)
	t.RedCards = new(uint32)
	t.YellowCards = new(uint32)
	t.Timeouts = new(uint32)
	t.TimeoutTime = new(uint32)
	t.Goalie = new(uint32)
	t.FoulCounter = new(uint32)
	t.BallPlacementFailures = new(uint32)
	t.CanPlaceBall = new(bool)
	t.MaxAllowedBots = new(uint32)
}

// Publish the state and command
func (p *Publisher) Publish(state *State) {
	p.message.Publish(state)
}

// Publish the state and command
func (p *RefMessage) Publish(state *State) {
	p.setState(state)
	p.sendCommands(state)
}

func (p *Publisher) send() {
	if p.conn == nil {
		return
	}

	bytes, err := proto.Marshal(p.message.referee)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", p.message, err)
		return
	}
	_, err = p.conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
	}
}

func (p *RefMessage) setState(state *State) (republish bool) {
	p.referee.GameEvents = mapGameEvents(state.GameEvents)
	p.referee.DesignatedPosition = mapLocation(state.PlacementPos)
	p.referee.ProposedGameEvents = mapProposals(state.GameEventProposals)

	*p.referee.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*p.referee.Stage = mapStage(state.Stage)
	*p.referee.StageTimeLeft = int32(state.StageTimeLeft.Nanoseconds() / 1000)
	*p.referee.BlueTeamOnPositiveHalf = state.TeamState[TeamBlue].OnPositiveHalf
	*p.referee.NextCommand = mapCommand(state.NextCommand, state.NextCommandFor)

	updateTeam(p.referee.Yellow, state.TeamState[TeamYellow])
	updateTeam(p.referee.Blue, state.TeamState[TeamBlue])
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
	if state.TeamState[TeamYellow].Goals > int(*p.referee.Yellow.Score) {
		p.updateCommand(refproto.Referee_GOAL_YELLOW)
		p.send()
		p.updateCommand(newCommand)
	} else if state.TeamState[TeamBlue].Goals > int(*p.referee.Blue.Score) {
		p.updateCommand(refproto.Referee_GOAL_BLUE)
		p.send()
		p.updateCommand(newCommand)
	} else if *p.referee.Command != newCommand {
		switch state.Command {
		case CommandBallPlacement,
			CommandDirect,
			CommandIndirect,
			CommandKickoff,
			CommandPenalty:
			if *p.referee.Command != refproto.Referee_STOP {
				// send a STOP right before the actual command to be compatible with old behavior
				p.updateCommand(refproto.Referee_STOP)
				p.send()
			}
		}
		p.updateCommand(newCommand)
	}

	p.send()
}

func (p *RefMessage) updateCommand(newCommand refproto.Referee_Command) {
	*p.referee.Command = newCommand
	*p.referee.CommandCounter++
	*p.referee.CommandTimestamp = uint64(time.Now().UnixNano() / 1000)
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

func updateTeam(team *refproto.Referee_TeamInfo, state *TeamInfo) {
	*team.Name = state.Name
	*team.Score = uint32(state.Goals)
	*team.RedCards = uint32(state.RedCards)
	team.YellowCardTimes = mapTimes(state.YellowCardTimes)
	*team.YellowCards = uint32(state.YellowCards)
	*team.Timeouts = uint32(state.TimeoutsLeft)
	*team.TimeoutTime = uint32(state.TimeoutTimeLeft.Nanoseconds() / 1000)
	*team.Goalie = uint32(state.Goalie)
	*team.FoulCounter = uint32(state.FoulCounter)
	*team.BallPlacementFailures = uint32(state.BallPlacementFailures)
	*team.CanPlaceBall = state.CanPlaceBall
	*team.MaxAllowedBots = uint32(state.MaxAllowedBots)
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
	x := float32(location.X)
	y := float32(location.Y)
	return &refproto.Referee_Point{X: &x, Y: &y}
}
