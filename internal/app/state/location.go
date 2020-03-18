package state

import "fmt"

func NewLocation64(x, y float64) (l Location) {
	l.X = new(float32)
	l.Y = new(float32)
	*l.X = float32(x)
	*l.Y = float32(y)
	return
}

func NewLocation(x, y float32) (l Location) {
	l.X = new(float32)
	l.Y = new(float32)
	*l.X = x
	*l.Y = y
	return
}

func (l Location) StringPretty() string {
	x := float32(0)
	y := float32(0)
	if l.X != nil {
		x = *l.X
	}
	if l.Y != nil {
		y = *l.Y
	}
	return fmt.Sprintf("x: %v, y: %v", x, y)
}
