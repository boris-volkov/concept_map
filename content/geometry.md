# Geometry
color: #3c6e47

Shape, size and position, and the art of proving things about them.

## Foundations {#geometry-foundations}

The undefined terms and first definitions that everything else in geometry is built from.

### Points, Lines & Planes {#points-lines-planes}
kind: definition

The undefined terms: a point has position but no size, a line runs straight forever in both directions, and a plane is a flat surface with no edges. Everything else is defined from these.

### Segments & Rays {#segments-and-rays}
kind: definition
prereqs: points-lines-planes

A segment is the part of a line between two endpoints, like $\overline{AB}$; a ray starts at one point and runs forever in one direction.

### Angles
kind: definition
prereqs: segments-and-rays

Two rays from a common vertex, measured in degrees: acute below $90^\circ$, right at exactly $90^\circ$, obtuse between $90^\circ$ and $180^\circ$, straight at $180^\circ$.

### Angle Pairs
prereqs: angles, addition

Complementary angles add to $90^\circ$ and supplementary angles to $180^\circ$. When two lines cross, the vertical angles opposite each other are equal.

### Perpendicular Lines
kind: definition
prereqs: angles

Lines that meet at a right angle, written $\ell \perp m$. The shortest path from a point to a line is the perpendicular.

### Parallel Lines & Transversals {#parallel-lines}
kind: theorem
prereqs: angle-pairs

When a line crosses two parallel lines, corresponding angles are equal, alternate interior angles are equal, and co-interior angles add to $180^\circ$. Each of these, conversely, proves two lines are parallel.

## Logic & Proof {#proof}

How a geometer knows something is true: by deducing it, step by step, from what is already known.

### Conditional Statements
kind: definition

"If $p$, then $q$." Its converse swaps the parts, which can turn a true statement false; its contrapositive, "if not $q$, then not $p$", is always true exactly when the original is.

### Deductive Reasoning
prereqs: conditional-statements

Reaching a certain conclusion from accepted facts by valid steps, as opposed to guessing a pattern from examples. One counterexample can sink a conjecture; no number of examples can prove one.

### Two-Column Proofs
kind: technique
prereqs: deductive-reasoning, equality-properties, angle-pairs

Statements on the left, the reason for each on the right: a given, a definition, a postulate, or a theorem already proved.

### Proof by Contradiction
kind: technique
prereqs: deductive-reasoning

Assume the opposite of what you want and show it leads to something impossible. The classic example proves that $\sqrt{2}$ is not a fraction.

## Triangles

The simplest polygons, and the ones every other shape breaks into.

### Classifying Triangles {#triangle-types}
kind: definition
prereqs: angles, segments-and-rays

By sides: scalene, isosceles (two equal sides) or equilateral. By angles: acute, right or obtuse.

### Triangle Angle Sum
kind: theorem
prereqs: parallel-lines, triangle-types

The interior angles of every triangle sum to $180^\circ$.

*Proof.* Through one vertex draw the parallel to the opposite side; the alternate angles it forms equal the other two angles of the triangle, and the three angles at the vertex form a straight angle. $\square$

### Exterior Angle Theorem
kind: theorem
prereqs: triangle-angle-sum

An exterior angle of a triangle equals the sum of the two remote interior angles.

### Triangle Inequality
kind: theorem
prereqs: triangle-types, comparing-numbers

In every triangle with sides $a, b, c$: $a + b > c$, $b + c > a$ and $a + c > b$.

### Medians, Altitudes & Bisectors {#triangle-segments}
prereqs: triangle-types, perpendicular-lines

Three special lines through each corner. Each family meets at a single point: the centroid (the balance point), the orthocentre, the incentre and the circumcentre.

### Pythagorean Theorem
kind: theorem
prereqs: triangle-types, square-roots, area-basic

In a right triangle with legs $a, b$ and hypotenuse $c$:
$$a^2 + b^2 = c^2$$
Conversely, if the sides of a triangle satisfy $a^2 + b^2 = c^2$, the angle opposite $c$ is a right angle.

*Proof sketch.* Four copies of the triangle placed inside a square of side $a + b$ leave a square of side $c$: $(a + b)^2 = 4 \cdot \frac{1}{2}ab + c^2$, which simplifies to $a^2 + b^2 = c^2$. $\square$

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

Two triangles worth knowing by heart: the $45^\circ$-$45^\circ$-$90^\circ$ triangle with sides $1 : 1 : \sqrt{2}$, and the $30^\circ$-$60^\circ$-$90^\circ$ triangle with sides $1 : \sqrt{3} : 2$.

## Congruence & Similarity {#congruence-and-similarity}

When two figures are the same, and when they are the same shape at different sizes.

### Congruent Figures {#congruence}
kind: definition
prereqs: rigid-motions

Figures with the same shape and size: one can be moved onto the other by slides, turns and flips. Corresponding sides and angles are equal.

### Triangle Congruence Criteria {#triangle-congruence}
kind: theorem
prereqs: congruence, triangle-types

Two triangles are congruent if they agree in SSS (three sides), SAS (two sides and the included angle), ASA or AAS (two angles and a side), or, for right triangles, HL (hypotenuse and a leg). SSA does not suffice.

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

Figures with the same shape but possibly different sizes: equal angles, and every pair of corresponding sides in the same ratio, the scale factor.

### Triangle Similarity Criteria {#triangle-similarity}
kind: theorem
prereqs: similarity, triangle-angle-sum

Two triangles are similar if two pairs of angles are equal (AA), if two pairs of sides are proportional with equal included angles (SAS), or if all three pairs of sides are proportional (SSS).

### Using Similar Triangles
kind: skill
prereqs: triangle-similarity, solving-proportions

Measuring the unreachable: a tree casting a 12 m shadow, beside a 2 m post casting a 3 m shadow, is $12 \cdot \frac{2}{3} = 8$ m tall.

## Transformations {#geometric-transformations}

Moving and resizing figures in the plane.

### Translations
kind: definition
prereqs: coordinate-plane

Sliding every point the same distance in the same direction: $(x, y) \mapsto (x + a, y + b)$.

### Reflections
kind: definition
prereqs: coordinate-plane

Flipping over a mirror line: reflecting in the $y$-axis sends $(x, y)$ to $(-x, y)$. Reflections reverse orientation, turning clockwise into counterclockwise.

### Rotations
kind: definition
prereqs: coordinate-plane, angles

Turning every point about a centre by the same angle: a quarter turn about the origin sends $(x, y)$ to $(-y, x)$.

### Dilations
kind: definition
prereqs: coordinate-plane, ratio

Scaling every distance from a centre by the same factor $k$: $(x, y) \mapsto (kx, ky)$. Shapes keep their angles and change their size.

### Rigid Motions
kind: definition
prereqs: translations, reflections, rotations

Translations, reflections, rotations and their combinations: the motions that keep every distance and angle the same.

### Symmetry
prereqs: reflections, rotations

A figure has symmetry when some motion maps it onto itself: a mirror line for reflection symmetry, a centre and an angle for rotational symmetry.

## Polygons

Closed figures made of straight sides.

### Polygons {#polygon-basics}
kind: definition
prereqs: segments-and-rays, angles

Closed shapes made of segments, named by their number of sides: triangle, quadrilateral, pentagon, hexagon. Regular polygons have all sides and all angles equal.

### Polygon Angle Sums
kind: formula
prereqs: triangle-angle-sum, polygon-basics

The interior angles of a convex $n$-gon sum to $(n - 2) \cdot 180^\circ$; its exterior angles sum to $360^\circ$. Each interior angle of a regular $n$-gon is $\frac{(n - 2) \cdot 180^\circ}{n}$.

### Quadrilaterals
kind: definition
prereqs: polygon-basics, parallel-lines, perpendicular-lines

Four-sided polygons and their family tree: trapezoids, parallelograms, rectangles, rhombuses and squares, each a special case of the one before.

### Properties of Parallelograms {#parallelogram-properties}
kind: theorem
prereqs: quadrilaterals, triangle-congruence

Opposite sides are equal, opposite angles are equal, and the diagonals bisect each other. Any one of these facts, conversely, proves a quadrilateral is a parallelogram.

## Circles

The set of points at a fixed distance from a centre.

### Parts of a Circle {#circle-parts}
kind: definition
prereqs: segments-and-rays

Centre, radius, diameter (twice the radius), chord, arc, and tangent: a line touching the circle at exactly one point.

### Circumference and Pi {#circumference}
kind: formula
prereqs: circle-parts, decimal-arithmetic

A circle of radius $r$ and diameter $d$ has circumference $C = 2\pi r = \pi d$, where $\pi \approx 3.14159$ is the ratio of circumference to diameter, the same for every circle.

### Area of a Circle {#circle-area}
kind: formula
prereqs: circumference, area-basic

A circle of radius $r$ encloses area $A = \pi r^2$.

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

A sector of radius $r$ and central angle $\theta$ has arc length $s = r\theta$ and area $A = \frac{1}{2}r^2\theta$ ($\theta$ in radians); in degrees, $s = \frac{\theta}{360^\circ} \cdot 2\pi r$ and $A = \frac{\theta}{360^\circ} \cdot \pi r^2$.

### Tangents to a Circle {#circle-tangents}
kind: theorem
prereqs: circle-parts, perpendicular-lines

A tangent is perpendicular to the radius at the point where it touches, and the two tangents from an outside point are equally long.

## Measurement

How much space a shape covers, encloses or fills.

### Perimeter
prereqs: addition, segments-and-rays

The distance all the way around a shape: add up the lengths of its sides.

### Area of Rectangles & Triangles {#area-basic}
kind: formula
prereqs: multiplication, multiplying-fractions

A rectangle of length $l$ and width $w$ has area $A = lw$; a triangle of base $b$ and height $h$ has area $A = \frac{1}{2}bh$.

### Area of Parallelograms & Trapezoids {#area-polygons}
kind: formula
prereqs: area-basic, quadrilaterals

A parallelogram has area $A = bh$; a trapezoid with parallel sides $a, b$ and height $h$ has area $A = \frac{1}{2}(a + b)h$.

### Surface Area
prereqs: area-polygons, circle-area

The total area of a solid's faces, found by unfolding it into a flat net: a cylinder unrolls into two circles and a rectangle.

### Volume of Prisms & Cylinders {#volume-prisms}
kind: formula
prereqs: area-polygons, circle-area

A prism or cylinder with base area $B$ and height $h$ has volume $V = Bh$; for a cylinder, $V = \pi r^2 h$.

### Volume of Pyramids, Cones & Spheres {#volume-pyramids-cones-spheres}
kind: formula
prereqs: volume-prisms

A pyramid or cone with base area $B$ and height $h$ has $V = \frac{1}{3}Bh$ (a cone: $\frac{1}{3}\pi r^2 h$). A sphere of radius $r$ has $V = \frac{4}{3}\pi r^3$ and surface area $S = 4\pi r^2$.

### How Area & Volume Scale {#scaling}
kind: theorem
prereqs: similarity, volume-prisms

Enlarge a shape by a factor $k$ and its lengths grow by $k$, its areas by $k^2$ and its volumes by $k^3$. Double a cube's edge and it takes four times the paint to cover and eight times the water to fill.

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

The midpoint of the segment from $(x_1, y_1)$ to $(x_2, y_2)$ is $\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$.

### Equation of a Circle {#circle-equation}
kind: formula
prereqs: distance-formula, circle-parts, completing-the-square

The circle with centre $(h, k)$ and radius $r$ is $(x - h)^2 + (y - k)^2 = r^2$.

### Coordinate Proofs
kind: technique
prereqs: distance-formula, midpoint-formula, slope, two-column-proofs

Place a figure on axes and prove things by computing: equal slopes show sides are parallel, equal distances show them equal.
