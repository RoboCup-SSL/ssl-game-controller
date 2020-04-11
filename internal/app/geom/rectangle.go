package geom

import "math"

type Rectangle struct {
	center  *Vector2
	xExtent float64
	yExtent float64
}

// NewRectangleFromCenter creates a new rectangle from a center and the x- and y-extent
func NewRectangleFromCenter(center *Vector2, xExtent, yExtent float64) (r *Rectangle) {
	return &Rectangle{
		center:  center,
		xExtent: xExtent,
		yExtent: yExtent,
	}
}

// NewRectangleFromPoints creates a new rectangle from two points
func NewRectangleFromPoints(p1, p2 *Vector2) (r *Rectangle) {
	r = new(Rectangle)
	r.xExtent = math.Abs(p1.X64() - p2.X64())
	r.yExtent = math.Abs(p1.Y64() - p2.Y64())
	r.center = NewVector2(
		math.Min(p1.X64(), p2.X64())+r.xExtent/2.0,
		math.Min(p1.Y64(), p2.Y64())+r.yExtent/2.0,
	)
	return
}

// WithMargin creates a new rectangle with the added/subtracted margin
func (r *Rectangle) WithMargin(margin float64) *Rectangle {
	return &Rectangle{
		center:  r.center,
		xExtent: math.Max(0, r.xExtent+2*margin),
		yExtent: math.Max(0, r.yExtent+2*margin),
	}
}

// MaxX returns the largest x value
func (r *Rectangle) MaxX() float64 {
	return r.center.X64() + r.xExtent/2.0
}

// MaxX returns the smallest x value
func (r *Rectangle) MinX() float64 {
	return r.center.X64() - r.xExtent/2.0
}

// MaxX returns the largest y value
func (r *Rectangle) MaxY() float64 {
	return r.center.Y64() + r.yExtent/2.0
}

// MaxX returns the smallest y value
func (r *Rectangle) MinY() float64 {
	return r.center.Y64() + r.yExtent/2.0
}

// IsPointInside returns true if the given point is inside the rectangle
func (r *Rectangle) IsPointInside(p *Vector2) bool {
	return isBetween(p.X64(), r.MinX(), r.MaxX()) &&
		isBetween(p.Y64(), r.MinY(), r.MaxY())
}

// isBetween returns true, if x is between min and max.
// min can be larger than max, in which case the meaning of min and max is switched.
func isBetween(x, min, max float64) bool {
	if max > min {
		return (x >= min) && (x <= max)
	}
	return (x >= max) && (x <= min)
}
