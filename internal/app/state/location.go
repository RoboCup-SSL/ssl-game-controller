package state

import "fmt"

// NewLocation64 creates a new location with float64 input
func NewLocation64(x, y float64) (l Location) {
	l.X = new(float32)
	l.Y = new(float32)
	*l.X = float32(x)
	*l.Y = float32(y)
	return
}

// NewLocation creates a new location
func NewLocation(x, y float32) (l Location) {
	l.X = new(float32)
	l.Y = new(float32)
	*l.X = x
	*l.Y = y
	return
}

// StringPretty converts the location into a pretty printed string
func (m Location) StringPretty() string {
	x := float32(0)
	y := float32(0)
	if m.X != nil {
		x = *m.X
	}
	if m.Y != nil {
		y = *m.Y
	}
	return fmt.Sprintf("x: %v, y: %v", x, y)
}
