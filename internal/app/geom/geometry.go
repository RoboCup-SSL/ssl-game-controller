package geom

import "math"

func NewVector2(x, y float64) *Vector2 {
	return &Vector2{X: &x, Y: &y}
}

func (m *Vector2) Length() float64 {
	x := *m.X
	y := *m.Y
	return math.Sqrt(x*x + y*y)
}

func (m *Vector2) Sub(o *Vector2) *Vector2 {
	return NewVector2(*m.X-*o.X, *m.Y-*o.Y)
}

func (m *Vector2) DistanceTo(o *Vector2) float64 {
	return m.Sub(o).Length()
}
