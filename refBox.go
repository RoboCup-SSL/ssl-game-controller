package main

import "time"

type RefBox struct {
	State           *RefBoxState
	timer           Timer
	MatchTimeStart  time.Time
	newEventChannel chan RefBoxEvent
}

func NewRefBox() (refBox *RefBox) {
	refBox = new(RefBox)
	refBox.State = NewRefBoxState()
	refBox.timer = NewTimer()
	refBox.newEventChannel = make(chan RefBoxEvent)

	return
}

func (r *RefBox) Run() (err error) {
	err = r.timer.Start()
	if err != nil {
		return
	}
	r.MatchTimeStart = time.Now()

	go func() {
		for r.timer.Running() {
			r.timer.WaitTillNextFullSecond()
			r.Tick()
			r.newEventChannel <- RefBoxEvent{}
		}
	}()
	return nil
}

func (r *RefBox) Tick() {
	delta := r.timer.Delta()
	updateTimes(r, delta)

	r.State.MatchDuration = time.Now().Sub(r.MatchTimeStart)
}

func updateTimes(r *RefBox, delta time.Duration) {
	r.State.GameTimeElapsed += delta
	r.State.GameTimeLeft -= delta

	if r.State.GameState == GameStateTimeoutYellow {
		r.State.TeamState[TeamYellow].TimeoutTimeLeft -= delta
	} else if r.State.GameState == GameStateTimeoutBlue {
		r.State.TeamState[TeamBlue].TimeoutTimeLeft -= delta
	}

	for _, teamState := range r.State.TeamState {
		reduceYellowCardTimes(teamState, delta)
		removeElapsedYellowCards(teamState)
	}
}

func reduceYellowCardTimes(teamState *RefBoxTeamState, delta time.Duration) {
	for i := range teamState.YellowCardTimes {
		teamState.YellowCardTimes[i] -= delta
	}
}

func removeElapsedYellowCards(teamState *RefBoxTeamState) {
	b := teamState.YellowCardTimes[:0]
	for _, x := range teamState.YellowCardTimes {
		if x > 0 {
			b = append(b, x)
		}
	}
	teamState.YellowCardTimes = b
}
