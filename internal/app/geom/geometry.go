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
	vx := x.GetX64()
	vy := x.GetY64()
	return math.Sqrt(vx*vx + vy*vy)
}

// Sub subtracts the given vector from this one
func (x *Vector2) Sub(o *Vector2) *Vector2 {
	return NewVector2Float32(x.GetX()-o.GetX(), x.GetY()-o.GetY())
}

// DistanceTo returns the distance between this vector and the given one
func (x *Vector2) DistanceTo(o *Vector2) float64 {
	return x.Sub(o).Length()
}

// GetX64 returns the x value as float64
func (x *Vector2) GetX64() float64 {
	return float64(x.GetX())
}

// GetY64 returns the y value as float64
func (x *Vector2) GetY64() float64 {
	return float64(x.GetY())
}

// ToVector2 converts this vector into a new 2d vector, dropping the z part
func (x *Vector3) ToVector2() *Vector2 {
	return NewVector2Float32(x.GetX(), x.GetY())
}

// StringPretty converts the vector into a pretty printed string
func (x *Vector2) StringPretty() string {
	return fmt.Sprintf("x: %v, y: %v", x.GetX(), x.GetY())
}
