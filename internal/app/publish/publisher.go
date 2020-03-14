package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/proto"
	"log"
	"net"
	"time"
)

const maxDatagramSize = 8192

// Publisher can publish state and commands to the teams
type Publisher struct {
	address  string
	conn     *net.UDPConn
	ProtoMsg *state.Referee
	goal     map[state.Team]bool
	queue    chan statemachine.StateChange
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address string) (p Publisher) {
	p.address = address
	p.queue = make(chan statemachine.StateChange, 10)

	// initialize default referee message
	p.ProtoMsg = new(state.Referee)
	p.goal = map[state.Team]bool{}
	p.goal[state.Team_BLUE] = false
	p.goal[state.Team_YELLOW] = false

	initRefereeMessage(p.ProtoMsg)

	return
}

func (p *Publisher) Start() {
	p.connect()
	go p.publish()
}

func (p *Publisher) Queue() chan statemachine.StateChange {
	return p.queue
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
	log.Println("Publishing referee messages to", p.address)

	p.conn = conn
	return
}

func (p *Publisher) disconnect() {
	p.conn = nil
}

func initRefereeMessage(m *state.Referee) {
	m.PacketTimestamp = new(uint64)
	m.Stage = new(state.Referee_Stage)
	m.StageTimeLeft = new(int32)
	m.Command = new(state.Referee_Command)
	m.CommandCounter = new(uint32)
	m.CommandTimestamp = new(uint64)
	m.Yellow = new(state.Referee_TeamInfo)
	initTeamInfo(m.Yellow)
	m.Blue = new(state.Referee_TeamInfo)
	initTeamInfo(m.Blue)
	m.BlueTeamOnPositiveHalf = new(bool)
	m.NextCommand = new(state.Referee_Command)
	m.CurrentActionTimeRemaining = new(int32)
}

func initTeamInfo(t *state.Referee_TeamInfo) {
	t.Name = new(string)
	t.Score = new(uint32)
	t.RedCards = new(uint32)
	t.YellowCards = new(uint32)
	t.Timeouts = new(uint32)
	t.TimeoutTime = new(uint32)
	t.Goalkeeper = new(uint32)
	t.FoulCounter = new(uint32)
	t.BallPlacementFailures = new(uint32)
	t.BallPlacementFailuresReached = new(bool)
	t.CanPlaceBall = new(bool)
	t.MaxAllowedBots = new(uint32)
	t.BotSubstitutionIntent = new(bool)
}

func (p *Publisher) publish() {
	for {
		select {
		case change := <-p.queue:
			p.update(&change.State)
		case <-time.After(100 * time.Millisecond):
			p.sendMessage()
		}
	}
}

func (p *Publisher) sendMessage() {
	if p.conn == nil {
		go p.connect()
		return
	}

	bytes, err := proto.Marshal(p.ProtoMsg)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", p.ProtoMsg, err)
		return
	}
	_, err = p.conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
		p.disconnect()
	}
}

func (p *Publisher) update(matchState *state.State) {
	p.ProtoMsg.GameEvents = mapGameEvents(matchState.GameEvents)
	p.ProtoMsg.DesignatedPosition = mapLocation(matchState.PlacementPos)
	p.ProtoMsg.ProposedGameEvents = mapProposedGameEvents(matchState.GameEventsQueued)

	*p.ProtoMsg.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*p.ProtoMsg.Stage = mapStage(matchState.Stage)
	*p.ProtoMsg.StageTimeLeft = int32(matchState.StageTimeLeft.Nanoseconds() / 1000)
	*p.ProtoMsg.BlueTeamOnPositiveHalf = matchState.TeamState[state.Team_BLUE].OnPositiveHalf
	*p.ProtoMsg.NextCommand = mapCommand(matchState.NextCommand, matchState.NextCommandFor)
	*p.ProtoMsg.CurrentActionTimeRemaining = int32(matchState.CurrentActionTimeRemaining.Nanoseconds() / 1000)

	p.updateTeam(p.ProtoMsg.Yellow, matchState.TeamState[state.Team_YELLOW], state.Team_YELLOW)
	p.updateTeam(p.ProtoMsg.Blue, matchState.TeamState[state.Team_BLUE], state.Team_BLUE)

	p.sendCommands(matchState)
}

func (p *Publisher) sendCommands(matchState *state.State) {
	newCommand := mapCommand(matchState.Command, matchState.CommandFor)

	// send the GOAL command based on the team score for compatibility with old behavior
	if p.goal[state.Team_YELLOW] {
		p.updateCommand(state.Referee_GOAL_YELLOW)
		p.sendMessage()
		p.updateCommand(newCommand)
		p.goal[state.Team_YELLOW] = false
	} else if p.goal[state.Team_BLUE] {
		p.updateCommand(state.Referee_GOAL_BLUE)
		p.sendMessage()
		p.updateCommand(newCommand)
		p.goal[state.Team_BLUE] = false
	} else if *p.ProtoMsg.Command != newCommand {
		switch matchState.Command {
		case state.CommandBallPlacement,
			state.CommandDirect,
			state.CommandIndirect,
			state.CommandKickoff,
			state.CommandPenalty:
			if *p.ProtoMsg.Command != state.Referee_STOP {
				// send a STOP right before the actual command to be compatible with old behavior
				p.updateCommand(state.Referee_STOP)
				p.sendMessage()
			}
		}
		p.updateCommand(newCommand)
	}

	p.sendMessage()
}

func (p *Publisher) updateCommand(newCommand state.Referee_Command) {
	*p.ProtoMsg.Command = newCommand
	*p.ProtoMsg.CommandCounter++
	*p.ProtoMsg.CommandTimestamp = uint64(time.Now().UnixNano() / 1000)
}

func (p *Publisher) updateTeam(teamInfo *state.Referee_TeamInfo, matchState *state.TeamInfo, team state.Team) {

	if matchState.Goals > int(*teamInfo.Score) {
		p.goal[team] = true
	}

	*teamInfo.Name = matchState.Name
	*teamInfo.Score = uint32(matchState.Goals)
	*teamInfo.RedCards = uint32(matchState.RedCards)
	teamInfo.YellowCardTimes = mapTimes(matchState.YellowCardTimes)
	*teamInfo.YellowCards = uint32(matchState.YellowCards)
	*teamInfo.Timeouts = uint32(matchState.TimeoutsLeft)
	*teamInfo.Goalkeeper = uint32(matchState.Goalkeeper)
	*teamInfo.FoulCounter = uint32(matchState.FoulCounter)
	*teamInfo.BallPlacementFailures = uint32(matchState.BallPlacementFailures)
	*teamInfo.BallPlacementFailuresReached = matchState.BallPlacementFailuresReached
	*teamInfo.CanPlaceBall = matchState.CanPlaceBall
	*teamInfo.MaxAllowedBots = uint32(matchState.MaxAllowedBots)
	*teamInfo.BotSubstitutionIntent = matchState.BotSubstitutionIntend

	if matchState.TimeoutTimeLeft.Nanoseconds() > 0 {
		*teamInfo.TimeoutTime = uint32(matchState.TimeoutTimeLeft.Nanoseconds() / 1000)
	} else {
		*teamInfo.TimeoutTime = 0
	}
}
