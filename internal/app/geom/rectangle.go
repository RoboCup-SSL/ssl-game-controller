package geom

import "math"

type Rectangle struct {
	center  *Vector2
	xExtent float64
	yExtent float64
}

func NewRectangleFromCenter(center *Vector2, xExtent, yExtent float64) (r *Rectangle) {
	return &Rectangle{
		center:  center,
		xExtent: xExtent,
		yExtent: yExtent,
	}
}

func NewRectangleFromPoints(p1, p2 *Vector2) (r *Rectangle) {
	r = new(Rectangle)
	r.xExtent = math.Abs(*p1.X - *p2.X)
	r.yExtent = math.Abs(*p1.Y - *p2.Y)
	r.center = NewVector2(
		math.Min(*p1.X, *p2.X)+r.xExtent/2.0,
		math.Min(*p1.Y, *p2.Y)+r.yExtent/2.0,
	)
	return
}

func (r *Rectangle) WithMargin(margin float64) *Rectangle {
	return &Rectangle{
		center:  r.center,
		xExtent: math.Max(0, r.xExtent+2*margin),
		yExtent: math.Max(0, r.yExtent+2*margin),
	}
}

func (r *Rectangle) MaxX() float64 {
	return *r.center.X + r.xExtent/2.0
}

func (r *Rectangle) MinX() float64 {
	return *r.center.X - r.xExtent/2.0
}

func (r *Rectangle) MaxY() float64 {
	return *r.center.Y + r.yExtent/2.0
}

func (r *Rectangle) MinY() float64 {
	return *r.center.Y + r.yExtent/2.0
}

func (r *Rectangle) IsPointInside(p *Vector2) bool {
	return isBetween(*p.X, r.MinX(), r.MaxX()) &&
		isBetween(*p.Y, r.MinY(), r.MaxY())
}

func isBetween(x, min, max float64) bool {
	if max > min {
		return (x >= min) && (x <= max)
	}
	return (x >= max) && (x <= min)
}
