# Geometry
color: #3c6e47

Shape, size and position, and the art of proving things about them.

## Axioms {#euclids-postulates}
wrap: 5

The five postulates from which Euclid's *Elements* derives plane geometry.

### Postulate 1: Lines {#postulate-lines}
kind: axiom

Through any two distinct points there is exactly one straight line.

### Postulate 2: Extension {#postulate-extension}
kind: axiom

Any line segment can be extended indefinitely in a straight line.

### Postulate 3: Circles {#postulate-circles}
kind: axiom

For any point and any length there is a circle with that point as centre and that length as radius.

### Postulate 4: Right Angles {#postulate-right-angles}
kind: axiom

All right angles are equal.

### Postulate 5: Parallels {#parallel-postulate}
kind: axiom

Through a point not on a given line there is exactly one line parallel to the given line (Playfair's form).

Denying it gives the non-Euclidean geometries, where the angles of a triangle no longer sum to $180^\circ$.

## Foundations {#geometry-foundations}

The undefined terms and first definitions that everything else in geometry is built from.

### Points, Lines & Planes {#points-lines-planes}
kind: definition

The undefined terms, from which everything else is defined:
- a point has position but no size;
- a line runs straight forever in both directions;
- a plane is a flat surface with no edges.

### Segments & Rays {#segments-and-rays}
kind: definition
prereqs: points-lines-planes

Two pieces of a line:
- a segment is the part of a line between two endpoints, like $\overline{AB}$;
- a ray starts at one point and runs forever in one direction.

### Angles
kind: definition
prereqs: segments-and-rays

Two rays from a common vertex, measured in degrees. An angle is
- acute below $90^\circ$;
- right at exactly $90^\circ$;
- obtuse between $90^\circ$ and $180^\circ$;
- straight at $180^\circ$.

### Angle Pairs
prereqs: angles, addition

Angles that come in pairs:
- complementary angles add to $90^\circ$;
- supplementary angles add to $180^\circ$;
- when two lines cross, the vertical angles opposite each other are equal.

### Perpendicular Lines
kind: definition
prereqs: angles

Lines that meet at a right angle, written $\ell \perp m$. The shortest path from a point to a line is the perpendicular.

### Parallel Lines & Transversals {#parallel-lines}
kind: theorem
prereqs: angle-pairs, parallel-postulate

When a line crosses two parallel lines, the following hold, and each of them, conversely, proves two lines parallel:
- corresponding angles are equal;
- alternate interior angles are equal;
- co-interior angles add to $180^\circ$.

## Logic & Proof {#proof}

How a geometer knows something is true: by deducing it, step by step, from what is already known.

### Conditional Statements
kind: definition

"If $p$, then $q$." From it come
- its converse, "if $q$, then $p$", which can be false when the original is true;
- its contrapositive, "if not $q$, then not $p$", which is true exactly when the original is.

### Deductive Reasoning
prereqs: conditional-statements

Reaching a certain conclusion from accepted facts by valid steps, as opposed to guessing a pattern from examples. One counterexample can sink a conjecture; no number of examples can prove one.

### Two-Column Proofs
kind: technique
prereqs: deductive-reasoning, equality-properties, angle-pairs

Statements on the left, the reason for each on the right, which is one of
- a given;
- a definition;
- a postulate;
- a theorem already proved.

### Proof by Contradiction
kind: technique
prereqs: deductive-reasoning

Assume the opposite of what you want and show it leads to something impossible. The classic example proves that $\sqrt{2}$ is not a fraction.

## Triangles

The simplest polygons, and the ones every other shape breaks into.

### Classifying Triangles {#triangle-types}
kind: definition
prereqs: angles, segments-and-rays

Triangles are classified
- by sides: scalene, isosceles (two equal sides) or equilateral;
- by angles: acute, right or obtuse.

### Triangle Angle Sum
kind: theorem
prereqs: parallel-lines, triangle-types

The interior angles of every triangle sum to $180^\circ$.

*Proof.*
1. Through one vertex, draw the parallel to the opposite side.
2. The alternate angles it forms equal the other two angles of the triangle.
3. The three angles at the vertex form a straight angle, $180^\circ$. $\square$

### Exterior Angle Theorem
kind: theorem
prereqs: triangle-angle-sum

An exterior angle of a triangle equals the sum of the two remote interior angles.

### Triangle Inequality
kind: theorem
prereqs: triangle-types, comparing-numbers

In every triangle with sides $a, b, c$:
$$\begin{aligned} a + b &> c, \\ b + c &> a, \\ a + c &> b. \end{aligned}$$

### Medians, Altitudes & Bisectors {#triangle-segments}
prereqs: triangle-types, perpendicular-lines

Special lines in a triangle, each family meeting at a single point:
- the medians, from each corner to the middle of the opposite side, at the centroid, the balance point;
- the altitudes, from each corner perpendicular to the opposite side, at the orthocentre;
- the angle bisectors, at the incentre;
- the perpendicular bisectors of the sides, at the circumcentre.

### Pythagorean Theorem
kind: theorem
prereqs: triangle-types, square-roots, area-basic

In a right triangle with legs $a, b$ and hypotenuse $c$:
$$a^2 + b^2 = c^2$$
Conversely, if the sides of a triangle satisfy $a^2 + b^2 = c^2$, the angle opposite $c$ is a right angle.

*Proof sketch.* Four copies of the triangle placed inside a square of side $a + b$ leave a square of side $c$, so
$$(a + b)^2 = 4 \cdot \frac{1}{2}ab + c^2,$$
which simplifies to
$$a^2 + b^2 = c^2. \qquad \square$$

```quiz
Q: A right triangle has legs 6 and 8. How long is the hypotenuse?
A: 10
Why: $\sqrt{36 + 64} = 10$.

Q: The hypotenuse is 13 and one leg is 5. How long is the other leg?
A: 12
Hint: $b^2 = c^2 - a^2$.
Why: $\sqrt{169 - 25} = 12$.

Q: Which lengths form a right triangle?
- 2, 3, 4
- 4, 5, 6
+ 7, 24, 25
- 5, 5, 5
Why: $49 + 576 = 625 = 25^2$.
```

### Special Right Triangles
prereqs: pythagorean-theorem, simplifying-radicals, isosceles-triangle-theorem

Two triangles worth knowing by heart:
- the $45^\circ$-$45^\circ$-$90^\circ$ triangle, with sides $1 : 1 : \sqrt{2}$;
- the $30^\circ$-$60^\circ$-$90^\circ$ triangle, with sides $1 : \sqrt{3} : 2$.

## Congruence & Similarity {#congruence-and-similarity}

When two figures are the same, and when they are the same shape at different sizes.

### Congruent Figures {#congruence}
kind: definition
prereqs: rigid-motions

Figures with the same shape and size: one can be moved onto the other by slides, turns and flips. Corresponding sides and angles are equal.

### Triangle Congruence Criteria {#triangle-congruence}
kind: theorem
prereqs: congruence, triangle-types

Two triangles are congruent if they agree in
- SSS: three sides;
- SAS: two sides and the included angle;
- ASA or AAS: two angles and a side;
- HL, for right triangles: the hypotenuse and a leg.

SSA does not suffice.

### Isosceles Triangle Theorem
kind: theorem
prereqs: triangle-congruence

In a triangle, two sides are equal if and only if the angles opposite them are equal.

### Corresponding Parts (CPCTC) {#cpctc}
kind: theorem
prereqs: triangle-congruence, two-column-proofs

Corresponding parts of congruent triangles are congruent: once two triangles are proved congruent, every matching side and angle may be used as equal.

### Similar Figures {#similarity}
kind: definition
prereqs: congruence, dilations, proportions

Figures with the same shape but possibly different sizes:
- equal corresponding angles;
- every pair of corresponding sides in the same ratio, the scale factor.

### Triangle Similarity Criteria {#triangle-similarity}
kind: theorem
prereqs: similarity, triangle-angle-sum

Two triangles are similar if
- AA: two pairs of angles are equal;
- SAS: two pairs of sides are proportional and the included angles are equal;
- SSS: all three pairs of sides are proportional.

### Using Similar Triangles
kind: skill
prereqs: triangle-similarity, solving-proportions

Measuring the unreachable. A tree casting a 12 m shadow, beside a 2 m post casting a 3 m shadow, has the same ratio of height to shadow:
$$\frac{h}{12} = \frac{2}{3} \implies h = 8\text{ m}.$$

## Transformations {#geometric-transformations}

Moving and resizing figures in the plane.

### Translations
kind: definition
prereqs: coordinate-plane

Sliding every point the same distance in the same direction:
$$(x, y) \mapsto (x + a, y + b).$$

### Reflections
kind: definition
prereqs: coordinate-plane

Flipping over a mirror line. Reflecting in the $y$-axis is
$$(x, y) \mapsto (-x, y).$$
Reflections reverse orientation, turning clockwise into counterclockwise.

### Rotations
kind: definition
prereqs: coordinate-plane, angles

Turning every point about a centre by the same angle. A quarter turn about the origin is
$$(x, y) \mapsto (-y, x).$$

### Dilations
kind: definition
prereqs: coordinate-plane, ratio

Scaling every distance from a centre by the same factor $k$:
$$(x, y) \mapsto (kx, ky).$$
Shapes keep their angles and change their size.

### Rigid Motions
kind: definition
prereqs: translations, reflections, rotations

Translations, reflections, rotations and their combinations: the motions that keep every distance and angle the same.

### Symmetry
prereqs: reflections, rotations

A figure has symmetry when some motion maps it onto itself:
- reflection symmetry, about a mirror line;
- rotational symmetry, about a centre by an angle.

## Polygons

Closed figures made of straight sides.

### Polygons {#polygon-basics}
kind: definition
prereqs: segments-and-rays, angles

Closed shapes made of segments, named by their number of sides: triangle, quadrilateral, pentagon, hexagon. Regular polygons have all sides and all angles equal.

### Polygon Angle Sums
kind: formula
prereqs: triangle-angle-sum, polygon-basics

For a convex $n$-gon:
- the interior angles sum to $(n - 2) \cdot 180^\circ$;
- the exterior angles sum to $360^\circ$;
- each interior angle of a regular one is $\dfrac{(n - 2) \cdot 180^\circ}{n}$.

### Quadrilaterals
kind: definition
prereqs: polygon-basics, parallel-lines, perpendicular-lines

Four-sided polygons, and their family tree:
- a trapezoid has a pair of parallel sides;
- a parallelogram has two;
- a rectangle is a parallelogram with right angles;
- a rhombus is a parallelogram with equal sides;
- a square is both.

### Properties of Parallelograms {#parallelogram-properties}
kind: theorem
prereqs: quadrilaterals, triangle-congruence

In a parallelogram the following hold, and any one of them, conversely, proves a quadrilateral is a parallelogram:
- opposite sides are equal;
- opposite angles are equal;
- the diagonals bisect each other.

## Circles

The set of points at a fixed distance from a centre.

### Parts of a Circle {#circle-parts}
kind: definition
prereqs: segments-and-rays

The parts of a circle:
- the centre;
- a radius, from the centre to the circle;
- a diameter, through the centre, twice the radius;
- a chord, joining two points of the circle;
- an arc, a piece of the circle;
- a tangent, a line touching the circle at exactly one point.

### Circumference and Pi {#circumference}
kind: formula
prereqs: circle-parts, decimal-arithmetic

A circle of radius $r$ and diameter $d$ has circumference
$$C = 2\pi r = \pi d,$$
where $\pi \approx 3.14159$ is the ratio of circumference to diameter, the same for every circle.

### Area of a Circle {#circle-area}
kind: formula
prereqs: circumference, area-basic

A circle of radius $r$ encloses area
$$A = \pi r^2.$$

### Arcs & Central Angles {#arcs-and-central-angles}
prereqs: circle-parts, angles

An angle at the centre cuts off an arc, and the arc is measured by that angle: a $90^\circ$ central angle cuts off a quarter of the circle.

### Inscribed Angle Theorem
kind: theorem
prereqs: arcs-and-central-angles, isosceles-triangle-theorem, exterior-angle-theorem

An inscribed angle measures half the central angle subtending the same arc. In particular, an angle inscribed in a semicircle is a right angle (Thales' theorem).

### Arc Length & Sector Area {#arc-length-sector}
kind: formula
prereqs: circumference, circle-area, arcs-and-central-angles, proportions

A sector of radius $r$ and central angle $\theta$, in radians, has arc length and area
$$\begin{aligned} s &= r\theta, \\ A &= \frac{1}{2}r^2\theta; \end{aligned}$$
with $\theta$ in degrees,
$$\begin{aligned} s &= \frac{\theta}{360^\circ} \cdot 2\pi r, \\ A &= \frac{\theta}{360^\circ} \cdot \pi r^2. \end{aligned}$$

### Tangents to a Circle {#circle-tangents}
kind: theorem
prereqs: circle-parts, perpendicular-lines

Two facts about tangents:
- a tangent is perpendicular to the radius at the point where it touches;
- the two tangents from an outside point are equally long.

## Measurement

How much space a shape covers, encloses or fills.

### Perimeter
prereqs: addition, segments-and-rays

The distance all the way around a shape: add up the lengths of its sides.

### Area of Rectangles & Triangles {#area-basic}
kind: formula
prereqs: multiplication, multiplying-fractions

The areas of the two simplest shapes:
- a rectangle of length $l$ and width $w$: $A = lw$;
- a triangle of base $b$ and height $h$: $A = \frac{1}{2}bh$.

### Area of Parallelograms & Trapezoids {#area-polygons}
kind: formula
prereqs: area-basic, quadrilaterals

With height $h$:
- a parallelogram of base $b$: $A = bh$;
- a trapezoid with parallel sides $a$ and $b$: $A = \frac{1}{2}(a + b)h$.

### Surface Area
prereqs: area-polygons, circle-area

The total area of a solid's faces, found by unfolding it into a flat net: a cylinder unrolls into two circles and a rectangle.

### Volume of Prisms & Cylinders {#volume-prisms}
kind: formula
prereqs: area-polygons, circle-area

A prism or cylinder with base area $B$ and height $h$ has volume
$$V = Bh;$$
for a cylinder of radius $r$,
$$V = \pi r^2 h.$$

### Volume of Pyramids, Cones & Spheres {#volume-pyramids-cones-spheres}
kind: formula
prereqs: volume-prisms

The solids that come to a point, and the sphere:
- a pyramid or cone with base area $B$ and height $h$: $V = \frac{1}{3}Bh$, so a cone of radius $r$ has $V = \frac{1}{3}\pi r^2 h$;
- a sphere of radius $r$: $V = \frac{4}{3}\pi r^3$, with surface area $S = 4\pi r^2$.

### How Area & Volume Scale {#scaling}
kind: theorem
prereqs: similarity, volume-prisms

Enlarge a shape by a factor $k$ and its
- lengths grow by $k$;
- areas grow by $k^2$;
- volumes grow by $k^3$.

Double a cube's edge and it takes four times the paint to cover and eight times the water to fill.

## Coordinate Geometry

Geometry done with algebra, by giving every point coordinates.

### Distance Formula
kind: formula
prereqs: pythagorean-theorem, coordinate-plane

The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is
$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

### Midpoint Formula
kind: formula
prereqs: coordinate-plane, fraction-concept

The midpoint of the segment from $(x_1, y_1)$ to $(x_2, y_2)$ is
$$M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right).$$

### Equation of a Circle {#circle-equation}
kind: formula
prereqs: distance-formula, circle-parts, completing-the-square

The circle with centre $(h, k)$ and radius $r$ is
$$(x - h)^2 + (y - k)^2 = r^2.$$

### Coordinate Proofs
kind: technique
prereqs: distance-formula, midpoint-formula, slope, two-column-proofs

Place a figure on axes and prove things by computing:
- equal slopes show sides are parallel;
- slopes multiplying to $-1$ show them perpendicular;
- equal distances show them equal.
