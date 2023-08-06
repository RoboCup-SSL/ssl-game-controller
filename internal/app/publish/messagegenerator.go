package publish

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/google/uuid"
	"google.golang.org/protobuf/types/known/durationpb"
	"log"
	"time"
)

type MessageGenerator struct {
	goal             map[state.Team]bool
	commandCounter   uint32
	commandTimestamp uint64
	quit             chan int
	sourceIdentifier string
	MessageConsumers []func(*state.Referee)
	EngineHook       chan engine.HookOut
}

// NewMessageGenerator creates a new publisher that publishes referee messages via UDP to the teams
func NewMessageGenerator() (m *MessageGenerator) {
	m = new(MessageGenerator)
	m.EngineHook = make(chan engine.HookOut, 10)
	m.goal = map[state.Team]bool{}
	m.goal[state.Team_BLUE] = false
	m.goal[state.Team_YELLOW] = false
	m.quit = make(chan int, 1)
	m.sourceIdentifier = uuid.NewString()

	log.Println("Publishing referee messages as ", m.sourceIdentifier)

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
				for _, refMsg := range refereeMessages {
					for _, consumer := range g.MessageConsumers {
						consumer(refMsg)
					}
				}
			} else if hookOut.State != nil {
				refMsg := g.StateToRefereeMessage(hookOut.State)
				for _, consumer := range g.MessageConsumers {
					consumer(refMsg)
				}
			}
		}
	}
}

// GenerateRefereeMessages generates a list of referee messages that result from the given state change
func (g *MessageGenerator) GenerateRefereeMessages(change engine.HookOut) (rs []*state.Referee) {
	// send the GOAL command based on the team score for compatibility with old behavior
	if change.Change.GetAddGameEventChange() != nil &&
		*change.Change.GetAddGameEventChange().GameEvent.Type == state.GameEvent_GOAL {
		g.updateCommand()
		refereeMsg := g.StateToRefereeMessage(change.State)
		if change.Change.GetAddGameEventChange().GameEvent.ByTeam() == state.Team_YELLOW {
			//noinspection GoDeprecation (sent for compatibility)
			*refereeMsg.Command = state.Referee_GOAL_YELLOW
		} else {
			//noinspection GoDeprecation (sent for compatibility)
			*refereeMsg.Command = state.Referee_GOAL_BLUE
		}
		rs = append(rs, refereeMsg)
	}

	if change.Change.GetNewCommandChange() != nil {
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
	*r.SourceIdentifier = g.sourceIdentifier
	r.DesignatedPosition = mapLocation(matchState.PlacementPos)
	r.GameEvents = matchState.GameEvents
	r.GameEventProposals = mapProposals(matchState.ProposalGroups)

	r.Command = mapCommand(matchState.Command)
	*r.CommandCounter = g.commandCounter
	*r.CommandTimestamp = g.commandTimestamp
	*r.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*r.Stage = *matchState.Stage
	*r.StageTimeLeft = microseconds(matchState.StageTimeLeft)
	*r.BlueTeamOnPositiveHalf = *matchState.TeamInfo(state.Team_BLUE).OnPositiveHalf
	r.NextCommand = mapCommand(matchState.NextCommand)
	*r.CurrentActionTimeRemaining = microseconds(matchState.CurrentActionTimeRemaining)
	r.MatchType = matchState.MatchType

	updateTeam(r.Yellow, matchState.TeamInfo(state.Team_YELLOW))
	updateTeam(r.Blue, matchState.TeamInfo(state.Team_BLUE))
	return
}

func updateTeam(teamInfo *state.Referee_TeamInfo, teamState *state.TeamInfo) {
	*teamInfo.Name = *teamState.Name
	*teamInfo.Score = unsigned32(*teamState.Goals)
	*teamInfo.RedCards = unsigned(len(teamState.RedCards))
	teamInfo.YellowCardTimes = mapYellowCardTimes(teamState.YellowCards)
	*teamInfo.YellowCards = unsigned(len(teamState.YellowCards))
	*teamInfo.Timeouts = unsigned32(*teamState.TimeoutsLeft)
	*teamInfo.Goalkeeper = unsigned32(*teamState.Goalkeeper)
	*teamInfo.FoulCounter = unsigned(len(teamState.Fouls))
	*teamInfo.BallPlacementFailures = unsigned32(*teamState.BallPlacementFailures)
	*teamInfo.BallPlacementFailuresReached = *teamState.BallPlacementFailuresReached
	*teamInfo.CanPlaceBall = *teamState.CanPlaceBall
	*teamInfo.MaxAllowedBots = unsigned32(*teamState.MaxAllowedBots)
	*teamInfo.BotSubstitutionIntent = teamState.RequestsBotSubstitutionSince != nil
	*teamInfo.BotSubstitutionAllowed = *teamState.BotSubstitutionAllowed
	timeoutTime := teamState.TimeoutTimeLeft.AsDuration()
	*teamInfo.TimeoutTime = mapTime(timeoutTime)
}

func newRefereeMessage() (m *state.Referee) {
	m = new(state.Referee)
	m.SourceIdentifier = new(string)
	m.PacketTimestamp = new(uint64)
	m.Stage = new(state.Referee_Stage)
	m.StageTimeLeft = new(int64)
	m.Command = new(state.Referee_Command)
	m.CommandCounter = new(uint32)
	m.CommandTimestamp = new(uint64)
	m.Yellow = newTeamInfo()
	m.Blue = newTeamInfo()
	m.BlueTeamOnPositiveHalf = new(bool)
	m.NextCommand = new(state.Referee_Command)
	m.CurrentActionTimeRemaining = new(int64)
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
	t.BotSubstitutionAllowed = new(bool)
	return
}

func unsigned32(v int32) uint32 {
	if v < 0 {
		return 0
	}
	return uint32(v)
}
func unsigned(v int) uint32 {
	if v < 0 {
		return 0
	}
	return uint32(v)
}

func microseconds(dur *durationpb.Duration) int64 {
	return int64(dur.Seconds)*1_000_000 + int64(dur.Nanos/1000)
}
