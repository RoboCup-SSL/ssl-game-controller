package timer

import (
	"time"
)

// A Timer can be started and stopped. It will start at zero and count up, while running.
// It is event driven, there are now threads that update any state.
type Timer struct {
	start         time.Time
	offset        time.Duration
	deltaOffset   time.Duration
	running       bool
	TimeProvider  TimeProvider
	SleepConsumer SleepConsumer
	continueChan  chan struct{}
}

// NewTimer creates a new stopped timer based on system time
func NewTimer() Timer {
	return Timer{
		time.Now(),
		0,
		0,
		false,
		SysTimeProvider,
		SysSleepConsumer,
		make(chan struct{})}
}

// Running returns if timer is currently running
func (t *Timer) Running() bool {
	return t.running
}

// Elapsed returns the elapsed time of this timer
func (t *Timer) Elapsed() time.Duration {
	if t.running {
		return t.offset + t.TimeProvider().Sub(t.start)
	}
	return t.offset
}

// Delta returns the time since last call to Delta
func (t *Timer) Delta() time.Duration {
	elapsed := t.Elapsed()
	delta := elapsed - t.deltaOffset
	t.deltaOffset = elapsed
	return delta
}

// Start capturing the time
func (t *Timer) Start() {
	if t.running {
		return
	}
	t.start = t.TimeProvider()
	t.running = true

	select {
	case <-t.continueChan:
	default:
	}
}

// Stop capturing the time
func (t *Timer) Stop() {
	if !t.running {
		return
	}
	t.offset = t.Elapsed()
	t.running = false
}

// WaitTill waits until the internal timer duration is reached.
func (t *Timer) WaitTill(duration time.Duration) {
	if !t.running {
		select {
		case t.continueChan <- struct{}{}:
		case <-time.After(1 * time.Second):
			return
		}
	}
	sleepTime := duration - t.Elapsed()
	if sleepTime > 0 {
		t.SleepConsumer(sleepTime)
	}
}

// WaitTillNextFullSecond waits until the internal timer has reached the next full second
func (t *Timer) WaitTillNextFullSecond() {
	elapsed := t.Elapsed()
	nextDuration := elapsed.Truncate(time.Second) + time.Second
	t.WaitTill(nextDuration)
}

// WaitTillNextFull waits until the internal timer has reached the next full given duration
func (t *Timer) WaitTillNextFull(d time.Duration) {
	elapsed := t.Elapsed()
	nextDuration := elapsed.Truncate(d) + d
	t.WaitTill(nextDuration)
}
