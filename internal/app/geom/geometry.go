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
func (x *Vector2) Length() float64 {
	vx := *x.X
	vy := *x.Y
	return math.Sqrt(float64(vx*vx + vy*vy))
}

// Sub subtracts the given vector from this one
func (x *Vector2) Sub(o *Vector2) *Vector2 {
	return NewVector2Float32(*x.X-*o.X, *x.Y-*o.Y)
}

// DistanceTo returns the distance between this vector and the given one
func (x *Vector2) DistanceTo(o *Vector2) float64 {
	return x.Sub(o).Length()
}

// X64 returns the x value as float64
func (x *Vector2) X64() float64 {
	return float64(*x.X)
}

// Y64 returns the y value as float64
func (x *Vector2) Y64() float64 {
	return float64(*x.Y)
}

// ToVector2 converts this vector into a new 2d vector, dropping the z part
func (x *Vector3) ToVector2() *Vector2 {
	return NewVector2Float32(*x.X, *x.Y)
}

// StringPretty converts the vector into a pretty printed string
func (x *Vector2) StringPretty() string {
	vx := float32(0)
	vy := float32(0)
	if x.X != nil {
		vx = *x.X
	}
	if x.Y != nil {
		vy = *x.Y
	}
	return fmt.Sprintf("x: %v, y: %v", vx, vy)
}
