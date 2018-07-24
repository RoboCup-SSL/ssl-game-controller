package main

import (
	"testing"
	"time"
)

func TestTimerStartStop(t *testing.T) {
	curTime := new(time.Time)
	*curTime = time.Now()
	timer := NewTimer()
	timer.TimeProvider = func() time.Time { return *curTime }

	err := timer.Start()
	if err != nil {
		t.Error(err)
	}

	*curTime = curTime.Add(1 * time.Second)
	elapsed := timer.Elapsed()
	if elapsed != 1*time.Second {
		t.Errorf("Expected 1s elapsed, but was %v", elapsed)
	}

	err = timer.Stop()
	if err != nil {
		t.Error(err)
	}
	*curTime = curTime.Add(2 * time.Second)
	elapsed = timer.Elapsed()
	if elapsed != 1*time.Second {
		t.Errorf("Expected 1s elapsed, but was %v", elapsed)
	}

	err = timer.Start()
	if err != nil {
		t.Error(err)
	}
	*curTime = curTime.Add(3 * time.Second)
	elapsed = timer.Elapsed()
	if elapsed != 4*time.Second {
		t.Errorf("Expected 4s elapsed, but was %v", elapsed)
	}
}

func TestTimerWaitTill(t *testing.T) {
	curTime := new(time.Time)
	*curTime = time.Now()
	timer := NewTimer()
	timer.TimeProvider = func() time.Time { return *curTime }
	sleepDuration := new(time.Duration)
	timer.SleepConsumer = func(d time.Duration) { *sleepDuration = d }

	err := timer.Start()
	if err != nil {
		t.Error(err)
	}
	*curTime = curTime.Add(2 * time.Second)
	err = timer.WaitTill(5 * time.Second)
	if err != nil {
		t.Error(err)
	}
	if *sleepDuration != 3*time.Second {
		t.Errorf("Expected a sleep duration of 3s, but was %v", *sleepDuration)
	}

	*sleepDuration = 0
	*curTime = curTime.Add(100 * time.Millisecond)
	err = timer.WaitTillNextFullSecond()
	if err != nil {
		t.Error(err)
	}
	if *sleepDuration != 900*time.Millisecond {
		t.Errorf("Expected a sleep duration of 900ms, but was %v", *sleepDuration)
	}
}
