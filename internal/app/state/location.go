package state

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
)

// Location is a two-dimensional coordinate
type Location struct {
	X float64 `json:"x" yaml:"x"`
	Y float64 `json:"y" yaml:"y"`
}

func (l Location) toProto() (p *refproto.Location) {
	p = new(refproto.Location)
	p.X = new(float32)
	p.Y = new(float32)
	*p.X = float32(l.X)
	*p.Y = float32(l.Y)
	return
}

func (l Location) String() string {
	return fmt.Sprintf("%.3fm | %.3fm", l.X, l.Y)
}
