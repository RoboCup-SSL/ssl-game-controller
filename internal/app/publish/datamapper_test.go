package publish

import (
	"reflect"
	"testing"
	"time"
)

func Test_mapTimes(t *testing.T) {
	type args struct {
		durations []time.Duration
	}
	tests := []struct {
		name string
		args args
		want []uint32
	}{
		{"negative", args{durations: []time.Duration{-1}}, []uint32{0}},
		{"zero", args{durations: []time.Duration{0}}, []uint32{0}},
		{"second", args{durations: []time.Duration{1 * time.Second}}, []uint32{1000000}},
		{"multiple", args{durations: []time.Duration{1 * time.Millisecond, 5 * time.Millisecond}}, []uint32{1000, 5000}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := mapTimes(tt.args.durations); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("mapTimes() = %v, want %v", got, tt.want)
			}
		})
	}
}
