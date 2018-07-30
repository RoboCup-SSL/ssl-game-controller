package main

import (
	"github.com/pkg/errors"
	"time"
)

// A TimeProvider returns the current time.
// This is usually the system time, but can be something else for unit tests.
type TimeProvider func() time.Time

// The default system time provider
var SysTimeProvider = func() time.Time { return time.Now() }

// A SleepConsumer sleeps the given amount of time.
// This is usually the time.Sleep method, but can be something else for unit tests.
type SleepConsumer func(time.Duration)

// The default system sleep consumer
var SysSleepConsumer = func(d time.Duration) { time.Sleep(d) }

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

// Create a new stopped timer based on system time
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

// Is timer currently running?
func (t *Timer) Running() bool {
	return t.running
}

// Return the elapsed time of this timer
func (t *Timer) Elapsed() time.Duration {
	if t.running {
		return t.offset + t.TimeProvider().Sub(t.start)
	}
	return t.offset
}

func (t *Timer) Delta() time.Duration {
	elapsed := t.Elapsed()
	delta := elapsed - t.deltaOffset
	t.deltaOffset = elapsed
	return delta
}

// Start capturing the time
func (t *Timer) Start() error {
	if t.running {
		return errors.New("timer already started")
	}
	t.start = t.TimeProvider()
	t.running = true

	select {
	case <-t.continueChan:
	default:
	}

	return nil
}

// Stop capturing the time
func (t *Timer) Stop() error {
	if !t.running {
		return errors.New("timer is not running")
	}
	t.offset = t.Elapsed()
	t.running = false
	return nil
}

// Wait until the internal timer duration is reached.
func (t *Timer) WaitTill(duration time.Duration) error {
	if !t.running {
		select {
		case t.continueChan <- struct{}{}:
		case <-time.After(1 * time.Second):
			return nil
		}
	}
	sleepTime := duration - t.Elapsed()
	if sleepTime > 0 {
		t.SleepConsumer(sleepTime)
	}
	return nil
}

// Wait until the internal timer has reached the next full second
func (t *Timer) WaitTillNextFullSecond() error {
	elapsed := t.Elapsed()
	nextDuration := elapsed.Truncate(time.Second) + time.Second
	t.WaitTill(nextDuration)
	return nil
}
