package publish

import (
	"reflect"
	"testing"
	"time"
)

func Test_mapTimes(t *testing.T) {
	type args struct {
		duration time.Duration
	}
	tests := []struct {
		name string
		args args
		want uint32
	}{
		{"negative", args{duration: -1}, 0},
		{"zero", args{duration: 0}, 0},
		{"second", args{duration: 1 * time.Second}, 1000000},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := mapTime(tt.args.duration); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("mapTimes() = %v, want %v", got, tt.want)
			}
		})
	}
}
