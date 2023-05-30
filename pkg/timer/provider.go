package timer

import "time"

// A TimeProvider returns the current time.
// This is usually the system time, but can be something else for unit tests.
type TimeProvider func() time.Time

// SleepConsumer sleeps the given amount of time.
// This is usually the time.Sleep method, but can be something else for unit tests.
type SleepConsumer func(time.Duration)

func TimestampToTime(timestamp float64) time.Time {
	sec := int64(timestamp)
	nSec := int64((timestamp - float64(sec)) * 1e9)
	return time.Unix(sec, nSec)
}

func TimestampMicroToTime(timestamp uint64) time.Time {
	sec := int64(timestamp / 1000)
	nSec := int64((timestamp - uint64(sec)) * 1000)
	return time.Unix(sec, nSec)
}
