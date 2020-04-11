package geom

import (
	"fmt"
	"math"
)

// NewVector2 creates a new Vector2 from float64 values
func NewVector2(x, y float64) *Vector2 {
	return NewVector2Float32(float32(x), float32(y))
}

// NewVector2Float32 creates a new Vector2 from float32 values
func NewVector2Float32(x, y float32) *Vector2 {
	return &Vector2{X: &x, Y: &y}
}

// Length returns the length of this vector
func (m *Vector2) Length() float64 {
	x := *m.X
	y := *m.Y
	return math.Sqrt(float64(x*x + y*y))
}

// Sub subtracts the given vector from this one
func (m *Vector2) Sub(o *Vector2) *Vector2 {
	return NewVector2Float32(*m.X-*o.X, *m.Y-*o.Y)
}

// DistanceTo returns the distance between this vector and the given one
func (m *Vector2) DistanceTo(o *Vector2) float64 {
	return m.Sub(o).Length()
}

// X64 returns the x value as float64
func (m *Vector2) X64() float64 {
	return float64(*m.X)
}

// Y64 returns the y value as float64
func (m *Vector2) Y64() float64 {
	return float64(*m.Y)
}

// ToVector2 converts this vector into a new 2d vector, dropping the z part
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
