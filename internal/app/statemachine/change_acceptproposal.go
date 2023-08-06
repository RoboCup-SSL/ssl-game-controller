package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/proto"
	"log"
)

func (s *StateMachine) processChangeAcceptProposals(newState *state.State, change *Change_AcceptProposalGroup) (changes []*Change) {

	group := findGroupById(newState.ProposalGroups, *change.GroupId)
	if group == nil {
		log.Printf("Proposal group with id %v can not be accepted, as it was not found", *change.GroupId)
		return
	}

	majorityEvent := s.createMergedGameEvent(group, change.AcceptedBy)
	changes = append(changes, &Change{
		Change: &Change_AddGameEventChange{
			AddGameEventChange: &Change_AddGameEvent{
				GameEvent: majorityEvent,
			},
		},
	})

	*group.Accepted = true

	return
}

func findGroupById(groups []*state.ProposalGroup, id string) *state.ProposalGroup {
	for _, group := range groups {
		if *group.Id == id {
			return group
		}
	}
	return nil
}

func (s *StateMachine) createMergedGameEvent(group *state.ProposalGroup, acceptedBy *string) *state.GameEvent {
	proposals := group.Proposals
	event := new(state.GameEvent)
	proto.Merge(event, proposals[0].GameEvent)
	event.Origin = []string{}
	event.Id = group.Id
	byTeam := map[state.Team]int{}
	origins := map[string]struct{}{}
	for _, e := range proposals {
		for _, origin := range e.GameEvent.Origin {
			origins[origin] = struct{}{}
		}
		byTeam[event.ByTeam()]++
	}
	for origin := range origins {
		event.Origin = append(event.Origin, origin)
	}
	if acceptedBy != nil {
		event.Origin = append(event.Origin, *acceptedBy)
	}
	if byTeam[state.Team_YELLOW] > byTeam[state.Team_BLUE] {
		event.SetByTeam(state.Team_YELLOW)
	} else if byTeam[state.Team_YELLOW] < byTeam[state.Team_BLUE] {
		event.SetByTeam(state.Team_BLUE)
	} else {
		log.Printf("autoRefs undecided on team: %v. Throwing a dice.", byTeam)
		event.SetByTeam(state.Team(s.rand.Intn(2) + 1))
	}
	var events []*state.GameEvent
	for _, p := range proposals {
		events = append(events, p.GameEvent)
	}
	mergeGameEventData(event, events)
	return event
}

func mergeGameEventData(event *state.GameEvent, events []*state.GameEvent) {
	switch *event.Type {
	case state.GameEvent_GOAL:
		var maxBallHeight []*float32
		for _, e := range events {
			maxBallHeight = append(maxBallHeight, e.GetGoal().MaxBallHeight)
		}
		event.GetGoal().MaxBallHeight = averageFloat(maxBallHeight)
	case state.GameEvent_POSSIBLE_GOAL:
		var maxBallHeight []*float32
		for _, e := range events {
			maxBallHeight = append(maxBallHeight, e.GetPossibleGoal().MaxBallHeight)
		}
		event.GetPossibleGoal().MaxBallHeight = averageFloat(maxBallHeight)
	case state.GameEvent_BOT_TOO_FAST_IN_STOP:
		var speed []*float32
		for _, e := range events {
			speed = append(speed, e.GetBotTooFastInStop().Speed)
		}
		event.GetBotTooFastInStop().Speed = averageFloat(speed)
	case state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT:
		var distance []*float32
		for _, e := range events {
			distance = append(distance, e.GetDefenderTooCloseToKickPoint().Distance)
		}
		event.GetDefenderTooCloseToKickPoint().Distance = averageFloat(distance)
	case state.GameEvent_BOT_CRASH_DRAWN:
		var crashSpeed []*float32
		var speedDiff []*float32
		var crashAngle []*float32
		for _, e := range events {
			crashSpeed = append(crashSpeed, e.GetBotCrashDrawn().CrashSpeed)
			speedDiff = append(speedDiff, e.GetBotCrashDrawn().SpeedDiff)
			crashAngle = append(crashAngle, e.GetBotCrashDrawn().CrashAngle)
		}
		event.GetBotCrashDrawn().CrashSpeed = averageFloat(crashSpeed)
		event.GetBotCrashDrawn().SpeedDiff = averageFloat(speedDiff)
		event.GetBotCrashDrawn().CrashAngle = averageFloat(crashAngle)
	case state.GameEvent_BOT_CRASH_UNIQUE:
		var crashSpeed []*float32
		var speedDiff []*float32
		var crashAngle []*float32
		for _, e := range events {
			crashSpeed = append(crashSpeed, e.GetBotCrashUnique().CrashSpeed)
			speedDiff = append(speedDiff, e.GetBotCrashUnique().SpeedDiff)
			crashAngle = append(crashAngle, e.GetBotCrashUnique().CrashAngle)
		}
		event.GetBotCrashUnique().CrashSpeed = averageFloat(crashSpeed)
		event.GetBotCrashUnique().SpeedDiff = averageFloat(speedDiff)
		event.GetBotCrashUnique().CrashAngle = averageFloat(crashAngle)
	case state.GameEvent_BOT_PUSHED_BOT:
		var distance []*float32
		for _, e := range events {
			distance = append(distance, e.GetBotPushedBot().PushedDistance)
		}
		event.GetBotPushedBot().PushedDistance = averageFloat(distance)
	case state.GameEvent_DEFENDER_IN_DEFENSE_AREA:
		var distance []*float32
		for _, e := range events {
			distance = append(distance, e.GetDefenderInDefenseArea().Distance)
		}
		event.GetDefenderInDefenseArea().Distance = averageFloat(distance)
	case state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA:
		var distance []*float32
		for _, e := range events {
			distance = append(distance, e.GetAttackerTouchedBallInDefenseArea().Distance)
		}
		event.GetAttackerTouchedBallInDefenseArea().Distance = averageFloat(distance)
	case state.GameEvent_BOT_KICKED_BALL_TOO_FAST:
		var initialBallSpeeds []*float32
		var chipped []*bool
		for _, e := range events {
			initialBallSpeeds = append(initialBallSpeeds, e.GetBotKickedBallTooFast().InitialBallSpeed)
			chipped = append(chipped, e.GetBotKickedBallTooFast().Chipped)
		}
		event.GetBotKickedBallTooFast().InitialBallSpeed = averageFloat(initialBallSpeeds)
		event.GetBotKickedBallTooFast().Chipped = averageBool(chipped)
	case state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA:
		var distance []*float32
		for _, e := range events {
			distance = append(distance, e.GetAttackerTooCloseToDefenseArea().Distance)
		}
		event.GetAttackerTooCloseToDefenseArea().Distance = averageFloat(distance)
	case state.GameEvent_PLACEMENT_FAILED:
		var distance []*float32
		for _, e := range events {
			distance = append(distance, e.GetPlacementFailed().RemainingDistance)
		}
		event.GetPlacementFailed().RemainingDistance = averageFloat(distance)
	}
}

func averageFloat(values []*float32) (value *float32) {
	sum := float32(0.0)
	count := 0
	for _, v := range values {
		if v != nil {
			sum += *v
			count++
		}
	}
	if count > 0 {
		value = new(float32)
		*value = sum / float32(count)
	}
	return
}

func averageBool(values []*bool) (value *bool) {
	sum := 0
	count := 0
	for _, v := range values {
		if v != nil {
			if *v {
				sum++
			}
			count++
		}
	}
	if count > 0 {
		value = new(bool)
		if sum > count/2 {
			*value = true
		}
	}
	return
}
