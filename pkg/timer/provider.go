package timer

import "time"

// A TimeProvider returns the current time.
// This is usually the system time, but can be something else for unit tests.
type TimeProvider func() time.Time

// SysTimeProvider is the default system time provider
var SysTimeProvider = func() time.Time { return time.Now() }

// SleepConsumer sleeps the given amount of time.
// This is usually the time.Sleep method, but can be something else for unit tests.
type SleepConsumer func(time.Duration)

// SysSleepConsumer is the default system sleep consumer
var SysSleepConsumer = func(d time.Duration) { time.Sleep(d) }

// NewFixedTimeProviderFromNanoSeconds creates a time provider from long nano seconds that always returns a fixed time
func NewFixedTimeProviderFromNanoSeconds(timestamp int64) TimeProvider {
	sec := timestamp / 1e9
	nSec := (timestamp - sec) * 1e9
	return func() time.Time {
		return time.Unix(sec, nSec)
	}
}

// NewFixedTimeProviderFromSeconds creates a time provider from floating point seconds that always returns a fixed time
func NewFixedTimeProviderFromSeconds(timestamp float64) TimeProvider {
	sec := int64(timestamp)
	nSec := int64((timestamp - float64(sec)) * 1e9)
	return func() time.Time {
		return time.Unix(sec, nSec)
	}
}
