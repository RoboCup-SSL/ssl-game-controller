package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
	"time"
)

type MessageGenerator struct {
	goal             map[state.Team]bool
	commandCounter   uint32
	commandTimestamp uint64
	quit             chan int
	gcEngine         *engine.Engine
	MessageConsumer  func(*state.Referee)
	EngineHook       chan engine.HookOut
}

// NewPublisher creates a new publisher that publishes referee messages via UDP to the teams
func NewMessageGenerator() (m *MessageGenerator) {
	m = new(MessageGenerator)
	m.EngineHook = make(chan engine.HookOut)
	m.goal = map[state.Team]bool{}
	m.goal[state.Team_BLUE] = false
	m.goal[state.Team_YELLOW] = false

	return
}

// Start starts a new goroutine that listens for state changes on the queue
func (g *MessageGenerator) Start() {
	go g.listen()
}

// Stop stops listening on state changes
func (g *MessageGenerator) Stop() {
	g.quit <- 0
}

func (g *MessageGenerator) listen() {
	for {
		select {
		case <-g.quit:
			return
		case hookOut := <-g.EngineHook:
			if hookOut.Change != nil {
				refereeMessages := g.GenerateRefereeMessages(hookOut)
				for _, refereeMsg := range refereeMessages {
					g.MessageConsumer(refereeMsg)
				}
			} else if hookOut.State != nil {
				refMsg := g.StateToRefereeMessage(hookOut.State)
				g.MessageConsumer(refMsg)
			}
		}
	}
}

// GenerateRefereeMessages generates a list of referee messages that result from the given state change
func (g *MessageGenerator) GenerateRefereeMessages(change engine.HookOut) (rs []*state.Referee) {
	// send the GOAL command based on the team score for compatibility with old behavior
	if change.Change.GetAddGameEvent() != nil &&
		*change.Change.GetAddGameEvent().GameEvent.Type == state.GameEvent_GOAL {
		g.updateCommand()
		refereeMsg := g.StateToRefereeMessage(change.State)
		if change.Change.GetAddGameEvent().GameEvent.ByTeam() == state.Team_YELLOW {
			//noinspection GoDeprecation (sent for compatibility)
			*refereeMsg.Command = state.Referee_GOAL_YELLOW
		} else {
			//noinspection GoDeprecation (sent for compatibility)
			*refereeMsg.Command = state.Referee_GOAL_BLUE
		}
		rs = append(rs, refereeMsg)
	}

	if change.Change.GetNewCommand() != nil {
		g.updateCommand()
	}

	rs = append(rs, g.StateToRefereeMessage(change.State))

	return
}

func (g *MessageGenerator) updateCommand() {
	g.commandCounter++
	g.commandTimestamp = uint64(time.Now().UnixNano() / 1000)
}

func (g *MessageGenerator) StateToRefereeMessage(matchState *state.State) (r *state.Referee) {
	r = newRefereeMessage()
	r.DesignatedPosition = mapLocation(matchState.PlacementPos)
	r.GameEvents = matchState.GameEvents
	r.ProposedGameEvents = mapProposedGameEvents(matchState.ProposedGameEvents)

	r.Command = mapCommand(matchState.Command)
	*r.CommandCounter = g.commandCounter
	*r.CommandTimestamp = g.commandTimestamp
	*r.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*r.Stage = *matchState.Stage
	*r.StageTimeLeft = matchState.StageTimeLeft.Nanos / 1000
	*r.BlueTeamOnPositiveHalf = *matchState.TeamInfo(state.Team_BLUE).OnPositiveHalf
	r.NextCommand = mapCommand(matchState.NextCommand)
	*r.CurrentActionTimeRemaining = matchState.CurrentActionTimeRemaining.Nanos / 1000

	updateTeam(r.Yellow, matchState.TeamInfo(state.Team_YELLOW))
	updateTeam(r.Blue, matchState.TeamInfo(state.Team_BLUE))
	return
}

func updateTeam(teamInfo *state.Referee_TeamInfo, teamState *state.TeamInfo) {
	*teamInfo.Name = *teamState.Name
	*teamInfo.Score = uint32(*teamState.Goals)
	*teamInfo.RedCards = uint32(len(teamState.RedCards))
	teamInfo.YellowCardTimes = mapYellowCardTimes(teamState.YellowCards)
	*teamInfo.YellowCards = uint32(len(teamState.YellowCards))
	*teamInfo.Timeouts = uint32(*teamState.TimeoutsLeft)
	*teamInfo.Goalkeeper = uint32(*teamState.Goalkeeper)
	*teamInfo.FoulCounter = uint32(len(teamState.Fouls))
	*teamInfo.BallPlacementFailures = uint32(*teamState.BallPlacementFailures)
	*teamInfo.BallPlacementFailuresReached = *teamState.BallPlacementFailuresReached
	*teamInfo.CanPlaceBall = *teamState.CanPlaceBall
	*teamInfo.MaxAllowedBots = uint32(*teamState.MaxAllowedBots)
	*teamInfo.BotSubstitutionIntent = *teamState.BotSubstitutionIntent
	timeoutTime, _ := ptypes.Duration(teamState.TimeoutTimeLeft)
	*teamInfo.TimeoutTime = mapTime(timeoutTime)
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
