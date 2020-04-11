package geom

import (
	"fmt"
	"math"
)

func NewVector2(x, y float64) *Vector2 {
	return NewVector2Float32(float32(x), float32(y))
}

func NewVector2Float32(x, y float32) *Vector2 {
	return &Vector2{X: &x, Y: &y}
}

func (m *Vector2) Length() float64 {
	x := *m.X
	y := *m.Y
	return math.Sqrt(float64(x*x + y*y))
}

func (m *Vector2) Sub(o *Vector2) *Vector2 {
	return NewVector2Float32(*m.X-*o.X, *m.Y-*o.Y)
}

func (m *Vector2) DistanceTo(o *Vector2) float64 {
	return m.Sub(o).Length()
}

func (m *Vector2) X64() float64 {
	return float64(*m.X)
}

func (m *Vector2) Y64() float64 {
	return float64(*m.Y)
}

func (m *Vector3) ToVector2() *Vector2 {
	return NewVector2Float32(*m.X, *m.Y)
}

// StringPretty converts the vector into a pretty printed string
func (m *Vector2) StringPretty() string {
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
