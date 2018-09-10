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
	message refproto.Referee
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

	initRefereeMessage(&publisher.message)

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
}

// Publish the state and command
func (p *Publisher) Publish(state *State) {

	if p.conn == nil {
		return
	}

	updateMessage(&p.message, state)
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

func updateMessage(r *refproto.Referee, state *State) {

	newCommand := mapCommand(state.Command, state.CommandFor)

	// send the GOAL command based on the team score
	// a STOP command will automatically be send in the next update cycle
	if state.TeamState[TeamYellow].Goals > int(*r.Yellow.Score) {
		updateCommand(r, refproto.Referee_GOAL_YELLOW)
	} else if state.TeamState[TeamBlue].Goals > int(*r.Blue.Score) {
		updateCommand(r, refproto.Referee_GOAL_BLUE)
	} else if *r.Command != newCommand {
		updateCommand(r, newCommand)
	}

	r.CurrentGameEvent = createGameEvent(state.GameEvent)
	r.CurrentGameEventSecondary = createGameEvent(state.GameEventSecondary)

	*r.PacketTimestamp = uint64(time.Now().UnixNano() / 1000)
	*r.Stage = mapStage(state.Stage)
	*r.StageTimeLeft = int32(state.StageTimeLeft.Nanoseconds() / 1000)
	*r.BlueTeamOnPositiveHalf = state.TeamState[TeamBlue].OnPositiveHalf
	updateTeam(r.Yellow, state.TeamState[TeamYellow])
	updateTeam(r.Blue, state.TeamState[TeamBlue])

}
func createGameEvent(event GameEvent) *refproto.GameEvent {
	protoEvent := new(refproto.GameEvent)
	protoEvent.GetAttackerInDefenseArea()
	switch event.Type {
	case GameEventNone:
		return nil
	case GameEventBallLeftFieldGoalLine:
		protoEvent.Event = &refproto.GameEvent_BallLeftFieldGoalLine{BallLeftFieldGoalLine: event.Details.BallLeftFieldGoalLine}
	case GameEventBallLeftFieldTouchLine:
		protoEvent.Event = &refproto.GameEvent_BallLeftFieldTouchLine{BallLeftFieldTouchLine: event.Details.BallLeftFieldTouchLine}
	case GameEventIcing:
		protoEvent.Event = &refproto.GameEvent_Icing_{Icing: event.Details.Icing}
	case GameEventGoal:
		protoEvent.Event = &refproto.GameEvent_Goal_{Goal: event.Details.Goal}
	case GameEventIndirectGoal:
		protoEvent.Event = &refproto.GameEvent_IndirectGoal_{IndirectGoal: event.Details.IndirectGoal}
	case GameEventChippedGoal:
		protoEvent.Event = &refproto.GameEvent_ChippedGoal_{ChippedGoal: event.Details.ChippedGoal}
	case GameEventBotTooFastInStop:
		protoEvent.Event = &refproto.GameEvent_BotTooFastInStop_{BotTooFastInStop: event.Details.BotTooFastInStop}
	case GameEventBotTippedOver:
		protoEvent.Event = &refproto.GameEvent_BotTippedOver_{BotTippedOver: event.Details.BotTippedOver}
	case GameEventBotInterferedPlacement:
		protoEvent.Event = &refproto.GameEvent_BotInterferedPlacement_{BotInterferedPlacement: event.Details.BotInterferedPlacement}
	case GameEventBotCrashDrawn:
		protoEvent.Event = &refproto.GameEvent_BotCrashDrawn_{BotCrashDrawn: event.Details.BotCrashDrawn}
	case GameEventBotKickedBallTooFast:
		protoEvent.Event = &refproto.GameEvent_BotKickedBallTooFast_{BotKickedBallTooFast: event.Details.BotKickedBallTooFast}
	case GameEventBotDribbledBallTooFar:
		protoEvent.Event = &refproto.GameEvent_BotDribbledBallTooFar_{BotDribbledBallTooFar: event.Details.BotDribbledBallTooFar}
	case GameEventBotCrashUnique:
		protoEvent.Event = &refproto.GameEvent_BotCrashUnique_{BotCrashUnique: event.Details.BotCrashUnique}
	case GameEventBotPushedBot:
		protoEvent.Event = &refproto.GameEvent_BotPushedBot_{BotPushedBot: event.Details.BotPushedBot}
	case GameEventBotHeldBallDeliberately:
		protoEvent.Event = &refproto.GameEvent_BotHeldBallDeliberately_{BotHeldBallDeliberately: event.Details.BotHeldBallDeliberately}
	case GameEventAttackerDoubleTouchedBall:
		protoEvent.Event = &refproto.GameEvent_AttackerDoubleTouchedBall_{AttackerDoubleTouchedBall: event.Details.AttackerDoubleTouchedBall}
	case GameEventAttackerTooCloseToDefenseArea:
		protoEvent.Event = &refproto.GameEvent_AttackerTooCloseToDefenseArea_{AttackerTooCloseToDefenseArea: event.Details.AttackerTooCloseToDefenseArea}
	case GameEventAttackerInDefenseArea:
		protoEvent.Event = &refproto.GameEvent_AttackerInDefenseArea_{AttackerInDefenseArea: event.Details.AttackerInDefenseArea}
	case GameEventAttackerTouchedKeeper:
		protoEvent.Event = &refproto.GameEvent_AttackerTouchedKeeper_{AttackerTouchedKeeper: event.Details.AttackerTouchedKeeper}
	case GameEventDefenderTooCloseToKickPoint:
		protoEvent.Event = &refproto.GameEvent_DefenderTooCloseToKickPoint_{DefenderTooCloseToKickPoint: event.Details.DefenderTooCloseToKickPoint}
	case GameEventDefenderInDefenseAreaPartially:
		protoEvent.Event = &refproto.GameEvent_DefenderInDefenseAreaPartially_{DefenderInDefenseAreaPartially: event.Details.DefenderInDefenseAreaPartially}
	case GameEventDefenderInDefenseArea:
		protoEvent.Event = &refproto.GameEvent_DefenderInDefenseArea_{DefenderInDefenseArea: event.Details.DefenderInDefenseArea}
	case GameEventKeeperHeldBall:
		protoEvent.Event = &refproto.GameEvent_KeeperHeldBall_{KeeperHeldBall: event.Details.KeeperHeldBall}
	case GameEventUnsportiveBehaviorMinor:
		protoEvent.Event = &refproto.GameEvent_UnsportiveBehaviorMinor_{UnsportiveBehaviorMinor: event.Details.UnsportiveBehaviorMinor}
	case GameEventUnsportiveBehaviorMajor:
		protoEvent.Event = &refproto.GameEvent_UnsportiveBehaviorMajor_{UnsportiveBehaviorMajor: event.Details.UnsportiveBehaviorMajor}
	case GameEventMultipleYellowCards:
		protoEvent.Event = &refproto.GameEvent_MultipleYellowCards_{MultipleYellowCards: event.Details.MultipleYellowCards}
	case GameEventMultipleFouls:
		protoEvent.Event = &refproto.GameEvent_MultipleFouls_{MultipleFouls: event.Details.MultipleFouls}
	case GameEventKickTimeout:
		protoEvent.Event = &refproto.GameEvent_KickTimeout_{KickTimeout: event.Details.KickTimeout}
	case GameEventNoProgressInGame:
		protoEvent.Event = &refproto.GameEvent_NoProgressInGame_{NoProgressInGame: event.Details.NoProgressInGame}
	case GameEventPlacementFailedByTeamInFavor:
		protoEvent.Event = &refproto.GameEvent_PlacementFailedByTeamInFavor_{PlacementFailedByTeamInFavor: event.Details.PlacementFailedByTeamInFavor}
	case GameEventPlacementFailedByOpponent:
		protoEvent.Event = &refproto.GameEvent_PlacementFailedByOpponent_{PlacementFailedByOpponent: event.Details.PlacementFailedByOpponent}
	default:
		log.Printf("Warn: Could not map game event %v", event.Type)
	}
	return protoEvent
}

func updateCommand(r *refproto.Referee, newCommand refproto.Referee_Command) {
	*r.Command = newCommand
	*r.CommandCounter++
	*r.CommandTimestamp = uint64(time.Now().UnixNano() / 1000)
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
