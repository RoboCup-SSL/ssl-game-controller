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
	address          string
	conn             *net.UDPConn
	goal             map[state.Team]bool
	queue            chan statemachine.StateChange
	quit             chan int
	commandCounter   uint32
	commandTimestamp uint64
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewPublisher(address string) (p Publisher) {
	p.address = address
	p.queue = make(chan statemachine.StateChange, 10)
	p.quit = make(chan int)

	p.goal = map[state.Team]bool{}
	p.goal[state.Team_BLUE] = false
	p.goal[state.Team_YELLOW] = false

	return
}

// Start starts a new goroutine that listens for state changes on the queue and publishes
func (p *Publisher) Start() {
	p.connect()
	go p.publish()
}

// Stop stops listening on state changes
func (p *Publisher) Stop() {
	p.quit <- 0
}

// Queue returns the queue that listens for new state changes
func (p *Publisher) Queue() chan statemachine.StateChange {
	return p.queue
}

// GenerateRefereeMessages generates a list of referee messages that result from the given state change
func (p *Publisher) GenerateRefereeMessages(change statemachine.StateChange) (rs []*state.Referee) {
	// send the GOAL command based on the team score for compatibility with old behavior
	if change.Change.ChangeType == statemachine.ChangeTypeAddGameEvent &&
		*change.Change.AddGameEvent.GameEvent.Type == state.GameEventType_GOAL {
		p.updateCommand()
		refereeMsg := p.stateToRefereeMessage(change.State)
		if change.Change.AddGameEvent.GameEvent.ByTeam() == state.Team_YELLOW {
			*refereeMsg.Command = state.Referee_GOAL_YELLOW
		} else {
			*refereeMsg.Command = state.Referee_GOAL_BLUE
		}
		rs = append(rs, refereeMsg)
	}

	if change.Change.ChangeType == statemachine.ChangeTypeNewCommand {
		p.updateCommand()
	}

	rs = append(rs, p.stateToRefereeMessage(change.State))

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
	log.Println("Publishing referee messages to", p.address)

	p.conn = conn
	return
}

func (p *Publisher) disconnect() {
	p.conn = nil
}

func newRefereeMessage() (m *state.Referee) {
	m = new(state.Referee)
	m.PacketTimestamp = new(uint64)
	m.Stage = new(state.Referee_Stage)
	m.StageTimeLeft = new(int32)
	m.Command = new(state.Referee_Command)
	m.CommandCounter = new(uint32)
	m.CommandTimestamp = new(uint64)
	m.Yellow = newTeamInfo()
	m.Blue = newTeamInfo()
	m.BlueTeamOnPositiveHalf = new(bool)
	m.NextCommand = new(state.Referee_Command)
	m.CurrentActionTimeRemaining = new(int32)
	return
}

func newTeamInfo() (t *state.Referee_TeamInfo) {
	t = new(state.Referee_TeamInfo)
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
	return
}

func (p *Publisher) publish() {
	for {
		select {
		case <-p.quit:
			p.disconnect()
			return
		case change := <-p.queue:
			refereeMessages := p.GenerateRefereeMessages(change)
			for _, refereeMsg := range refereeMessages {
				p.sendMessage(refereeMsg)
			}
		}
	}
}

func (p *Publisher) sendMessage(refereeMsg *state.Referee) {
	if p.conn == nil {
		go p.connect()
		return
	}

	bytes, err := proto.Marshal(refereeMsg)
	if err != nil {
		log.Printf("Could not marshal referee message: %v\nError: %v", refereeMsg, err)
		return
	}
	_, err = p.conn.Write(bytes)
	if err != nil {
		log.Printf("Could not write message: %v", err)
		p.disconnect()
	}
}

func (p *Publisher) updateCommand() {
	p.commandCounter++
	p.commandTimestamp = uint64(time.Now().UnixNano() / 1000)
}

func (p *Publisher) stateToRefereeMessage(matchState *state.State) (r *state.Referee) {
	r = newRefereeMessage()
	r.GameEvents = mapGameEvents(matchState.GameEvents)
	r.DesignatedPosition = mapLocation(matchState.PlacementPos)
	r.ProposedGameEvents = mapProposedGameEvents(matchState.GameEventsQueued)

	*r.Command = mapCommand(matchState.Command, matchState.CommandFor)
	*r.CommandCounter = p.commandCounter
	*r.CommandTimestamp = p.commandTimestamp
	*r.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*r.Stage = mapStage(matchState.Stage)
	*r.StageTimeLeft = int32(matchState.StageTimeLeft.Nanoseconds() / 1000)
	*r.BlueTeamOnPositiveHalf = matchState.TeamState[state.Team_BLUE].OnPositiveHalf
	*r.NextCommand = mapCommand(matchState.NextCommand, matchState.NextCommandFor)
	*r.CurrentActionTimeRemaining = int32(matchState.CurrentActionTimeRemaining.Nanoseconds() / 1000)

	updateTeam(r.Yellow, matchState.TeamState[state.Team_YELLOW])
	updateTeam(r.Blue, matchState.TeamState[state.Team_BLUE])
	return
}

func updateTeam(teamInfo *state.Referee_TeamInfo, teamState *state.TeamInfo) {

	*teamInfo.Name = teamState.Name
	*teamInfo.Score = uint32(teamState.Goals)
	*teamInfo.RedCards = uint32(teamState.RedCards)
	teamInfo.YellowCardTimes = mapTimes(teamState.YellowCardTimes)
	*teamInfo.YellowCards = uint32(teamState.YellowCards)
	*teamInfo.Timeouts = uint32(teamState.TimeoutsLeft)
	*teamInfo.Goalkeeper = uint32(teamState.Goalkeeper)
	*teamInfo.FoulCounter = uint32(teamState.FoulCounter)
	*teamInfo.BallPlacementFailures = uint32(teamState.BallPlacementFailures)
	*teamInfo.BallPlacementFailuresReached = teamState.BallPlacementFailuresReached
	*teamInfo.CanPlaceBall = teamState.CanPlaceBall
	*teamInfo.MaxAllowedBots = uint32(teamState.MaxAllowedBots)
	*teamInfo.BotSubstitutionIntent = teamState.BotSubstitutionIntend

	if teamState.TimeoutTimeLeft.Nanoseconds() > 0 {
		*teamInfo.TimeoutTime = uint32(teamState.TimeoutTimeLeft.Nanoseconds() / 1000)
	} else {
		*teamInfo.TimeoutTime = 0
	}
}
