# Geometry
color: #3c6e47

Shape, size and position, and the art of proving things about them.

## Axioms {#geometry-axioms}
wrap: 6

Geometry has more than one set of axioms. Here are six, side by side: four for the familiar Euclidean plane, and two that change its parallel postulate.

The first four describe the same geometry. Euclid's postulates were the first; Hilbert's fill the gaps that Euclid's proofs left; Birkhoff's, and the high-school postulates that grew from them, start from a ruler and a protractor, so that lengths and angles are numbers from the beginning. The rest of this map follows Euclid's.

The last two keep most of Euclid's postulates but not the fifth, and so describe different geometries, which disagree on how many parallels to a line pass through a point off it:

| Geometry | Parallels | Angles of a triangle add to |
| --- | --- | --- |
| Euclidean | exactly one | $180^\circ$ |
| Elliptic | none | more than $180^\circ$ |
| Hyperbolic | infinitely many | less than $180^\circ$ |

Open any two systems to compare them, one above the other.

### Euclid's Postulates {#euclids-postulates}
wrap: 5

The five postulates, and five common notions, from which Euclid's *Elements*, around 300 BC, derives plane geometry: the oldest axiom system we have, and the model for every one since.

Euclid's proofs also use facts that none of these state. His first construction, of an equilateral triangle, assumes that two circles, each through the other's centre, meet; and he proves the SAS criterion by laying one triangle on top of the other, a move nothing here allows. [[hilberts-axioms|Hilbert's axioms]] fill these gaps.

#### Postulate 1: Lines {#postulate-lines}
kind: axiom

Through any two distinct points there is exactly one straight line.

#### Postulate 2: Extension {#postulate-extension}
kind: axiom

Any line segment can be extended indefinitely in a straight line.

In [[elliptic-geometry|elliptic geometry]] a line can be extended forever and still be finite, closing up on itself like the equator.

#### Postulate 3: Circles {#postulate-circles}
kind: axiom

For any point and any length there is a circle with that point as centre and that length as radius.

#### Postulate 4: Right Angles {#postulate-right-angles}
kind: axiom

All right angles are equal.

#### Postulate 5: Parallels {#parallel-postulate}
kind: axiom

Through a point not on a given line there is exactly one line parallel to the given line (Playfair's form).

Euclid's own wording is longer: if a line crossing two others makes the interior angles on one side add to less than two right angles, those two lines, extended far enough, meet on that side.

For two thousand years mathematicians tried to prove it from the other four. Around 1830 Bolyai and Lobachevsky showed that it can be denied without contradiction, giving [[hyperbolic-geometry|hyperbolic geometry]], with many parallels; Riemann's [[elliptic-geometry|elliptic geometry]] has none at all. In both, the angles of a triangle no longer add to $180^\circ$.

#### Common Notions {#common-notions}
kind: axiom

Euclid's axioms for all of mathematics, where his postulates are about geometry alone:
1. Things equal to the same thing are equal to each other.
2. If equals are added to equals, the wholes are equal.
3. If equals are subtracted from equals, the remainders are equal.
4. Things that coincide with one another are equal to one another.
5. The whole is greater than the part.

The first three are the [[equality-properties|properties of equality]] used in algebra. The fifth fails for infinite sets: the even numbers are only part of the whole numbers, yet the two can be paired off exactly, $n \leftrightarrow 2n$.

### Hilbert's Axioms {#hilberts-axioms}
wrap: 5

The twenty axioms, in five groups, with which David Hilbert in 1899 rebuilt Euclid's geometry so that every proof follows from the axioms alone, and nothing is taken from the picture.

Point, line and plane are left undefined, and so are *lies on*, *between* and *congruent*: the proofs must work whatever the words mean, as long as the axioms hold. In Hilbert's words, "one must be able to say at all times, instead of points, straight lines and planes, tables, chairs and beer mugs."

#### Axioms of Incidence {#hilbert-incidence}
kind: axiom

In the plane:
1. For any two distinct points $A$ and $B$ there is a line through both.
2. There is at most one such line.
3. Every line has at least two points on it, and there are at least three points not on one line.

Five more say the same of planes in space: any three points not on one line lie in exactly one plane, a line with two of its points in a plane lies in it, two planes with a point in common have a second, and there are four points not all in one plane.

#### Axioms of Order {#hilbert-order}
kind: axiom

When a point lies *between* two others:
1. If $B$ lies between $A$ and $C$, then $A$, $B$ and $C$ are distinct points on one line, and $B$ also lies between $C$ and $A$.
2. For any two distinct points $A$ and $C$, there is a point $B$ on the line $AC$ such that $C$ lies between $A$ and $B$.
3. Of any three points on a line, at most one lies between the other two.
4. (Pasch's axiom) A line in the plane of a triangle that passes through none of its vertices, but through a point of one side, also passes through a point of another side.

The second says that a line never ends: the precise form of [[postulate-extension|Euclid's second postulate]]. Pasch's axiom, from 1882, states what Euclid read off his diagrams: a line that goes into a triangle must come out.

#### Axioms of Congruence {#hilbert-congruence}
kind: axiom

When two segments, or two angles, are *congruent*, written $\cong$:
1. Any segment $AB$ can be laid off on any ray from any point $A'$: the ray has a point $B'$ with $AB \cong A'B'$.
2. Two segments congruent to the same segment are congruent to each other.
3. If $B$ lies between $A$ and $C$, and $B'$ between $A'$ and $C'$, with $AB \cong A'B'$ and $BC \cong B'C'$, then $AC \cong A'C'$.
4. Any angle can be laid off on any ray, on a given side of it, in exactly one way; and every angle is congruent to itself.
5. If $AB \cong A'B'$, $AC \cong A'C'$ and $\angle BAC \cong \angle B'A'C'$, then $\angle ABC \cong \angle A'B'C'$.

The fifth is most of the SAS criterion, which Euclid proved by laying one triangle on the other. Hilbert assumes it instead, and proves the rest of the [[triangle-congruence|congruence criteria]] from it.

#### Axiom of Parallels {#hilbert-parallels}
kind: axiom

Through a point $A$ not on a line $a$ there is at most one line, in the plane of $a$ and $A$, that does not meet $a$.

That there is at least one follows from the other axioms, so only "at most one" needs assuming. Replace it with "at least two" and every other axiom still holds: the result is [[hyperbolic-geometry|hyperbolic geometry]].

#### Axioms of Continuity {#hilbert-continuity}
kind: axiom

That a line has no gaps:
1. (Archimedes' axiom) For any segments $AB$ and $CD$, laying $CD$ off enough times along the ray from $A$ through $B$ carries it past $B$.
2. (Completeness) No new points can be added to a line while keeping its order, its congruences and Archimedes' axiom.

Together they make every line a copy of the [[number-systems|real number line]]. They are what guarantees, for instance, that two circles, each through the other's centre, really meet, as Euclid assumed in his first construction.

### Birkhoff's Postulates {#birkhoffs-postulates}
kind: axiom
prereqs: number-systems, absolute-value
summary: George Birkhoff's four postulates of 1932, which build plane geometry on the real numbers: a ruler for lengths, a protractor for angles.

Plane geometry follows from four postulates about distance $d$ and angle measure:
1. (Line measure) The points of any line can be numbered, one to one, by the real numbers, so that any two points $A$ and $B$, numbered $x_A$ and $x_B$, are a distance $d(A, B) = |x_B - x_A|$ apart.
2. (Point–line) Through any two distinct points there is exactly one line.
3. (Angle measure) The rays from any point $O$ can be numbered, one to one, by the real numbers modulo $360^\circ$, so that the angle from one ray to another is the difference of their numbers; and as a point $B$ moves continuously along a line not through $O$, the number of the ray $OB$ changes continuously.
4. (Similarity) If two triangles $ABC$ and $A'B'C'$ have, for some $k > 0$, $A'B' = k \cdot AB$, $A'C' = k \cdot AC$ and $\angle A' = \angle A$, then $B'C' = k \cdot BC$, $\angle B' = \angle B$ and $\angle C' = \angle C$.

Four postulates do the work of [[hilberts-axioms|Hilbert's twenty]] because the real numbers come with them, ready-made. There is no parallel postulate: it follows from the fourth, since in [[elliptic-geometry|elliptic]] and [[hyperbolic-geometry|hyperbolic]] geometry triangles of different sizes are never similar. The [[school-postulates|high-school postulates]] grew from these.

### High-School Postulates (SMSG) {#school-postulates}
wrap: 4
tags: smsg, american, textbook

The 22 postulates written for American schools around 1960 by the School Mathematics Study Group (SMSG), from which today's textbooks take their Ruler, Protractor and SAS Postulates.

They grew out of [[birkhoffs-postulates|Birkhoff's four]], expanded on purpose into more postulates than strictly needed, so that students reach interesting theorems sooner. Textbooks reorder, rename and add to them. Many courses since the Common Core (2010) instead take the [[rigid-motions]] as basic, define [[congruence]] by them, and derive SAS rather than assume it.

#### Incidence Postulates {#smsg-incidence}
kind: axiom

Points, lines and planes:
- Given any two distinct points, there is exactly one line that contains them.
- Every plane contains at least three points not on one line, and space contains at least four points not in one plane.
- If two points lie in a plane, the line containing them lies in the plane.
- Any three points lie in at least one plane, and any three points not on one line lie in exactly one plane.
- If two planes intersect, their intersection is a line.

#### Ruler Postulate {#smsg-ruler}
kind: axiom
prereqs: number-systems, absolute-value

Distances are numbers:
- (Distance) To every pair of distinct points there corresponds a unique positive number, the distance between them.
- (Ruler) The points of a line can be matched one to one with the real numbers so that the distance between two points is the absolute value of the difference of their numbers.
- (Ruler placement) Given two points $P$ and $Q$ of a line, the numbering can be chosen so that $P$ is at $0$ and $Q$ is positive.

The ruler laid along the line: if $P$ is at $-2$ and $Q$ at $5$, the distance between them is
$$|5 - (-2)| = 7.$$

#### Plane Separation {#smsg-separation}
kind: axiom

A line divides a plane, and a plane divides space, into two sides:
- The points of a plane that are not on a given line in it form two half-planes, each convex, and a segment joining points of different half-planes crosses the line.
- The points of space that are not in a given plane form two half-spaces, each convex, and a segment joining points of different half-spaces crosses the plane.

A set is convex when the segment joining any two of its points lies inside it. In Hilbert's system the same work is done by [[hilbert-order|Pasch's axiom]].

#### Protractor Postulate {#smsg-protractor}
kind: axiom

Angles are numbers too:
- (Angle measure) To every angle there corresponds a real number between $0$ and $180$, its measure.
- (Angle construction) Given a ray $\overrightarrow{AB}$ on the edge of a half-plane $H$, for every $r$ between $0$ and $180$ there is exactly one ray $\overrightarrow{AP}$, with $P$ in $H$, such that $m\angle PAB = r$.
- (Angle addition) If $D$ is in the interior of $\angle BAC$, then $m\angle BAC = m\angle BAD + m\angle DAC$.
- (Supplement) If two angles form a linear pair, they are supplementary.

Textbooks combine the first two into a single Protractor Postulate, and often call the last the Linear Pair Postulate.

#### SAS Postulate {#smsg-sas}
kind: axiom

If two sides and the included angle of one triangle are congruent to the corresponding parts of another, the triangles are congruent.

In this system SAS is assumed, and the other [[triangle-congruence|congruence criteria]] are proved from it. Euclid proved SAS by laying one triangle on the other; the Common Core derives it from the [[rigid-motions]].

#### Parallel Postulate {#smsg-parallel}
kind: axiom

Through a given point not on a line there is at most one line parallel to the given line.

As with [[hilbert-parallels|Hilbert's axiom]], that there is at least one can be proved, so only "at most one" is assumed.

#### Area Postulates {#smsg-area}
kind: axiom

Areas are numbers:
- To every polygonal region there corresponds a unique positive number, its area.
- Congruent triangles have the same area.
- If a region is the union of two regions that overlap only in segments and points, its area is the sum of their areas.
- The area of a rectangle is the product of its base and its height.

From these come the areas of [[area-basic|triangles]], and of every other polygon.

#### Volume Postulates {#smsg-volume}
kind: axiom

Volumes are numbers:
- The volume of a rectangular box is the area of its base times its height.
- (Cavalieri's principle) If every plane parallel to a given plane cuts two solids in cross-sections of equal area, the two solids have the same volume.

Cavalieri's principle gives the [[volume-pyramids-cones-spheres|volume of a sphere]]. A sphere of radius $r$ has the same cross-sections as a cylinder of radius $r$ and height $2r$ with two cones, tip to tip at its centre, cut out of it, so its volume is
$$2\pi r^3 - \frac{2}{3}\pi r^3 = \frac{4}{3}\pi r^3.$$

### Elliptic Geometry (Riemann) {#elliptic-geometry}
kind: axiom
tags: riemann, spherical, sphere, non-euclidean
summary: Bernhard Riemann's geometry of 1854, pictured on a sphere: lines close up like the equator, and any two of them meet.

Euclid's postulates, with the second and the fifth changed:
1. Through any two distinct points there is exactly one line.
2. **Any line segment can be extended indefinitely, but every line has the same finite length: extended far enough, it closes up on itself.**
3. For any point and any length there is a circle with that point as centre and that length as radius.
4. All right angles are equal.
5. **Any two lines meet: there are no parallels.**

Its model is the surface of a sphere, whose lines are the great circles, such as the equator and the meridians: the shortest routes on a globe, which long flights follow. Two opposite points, like the poles, lie on infinitely many great circles, so the model counts each pair of opposite points as a single point; then Postulate 1 holds, and any two lines meet exactly once.

On the sphere,
- the angles of a triangle add to more than $180^\circ$: one with a vertex at the North Pole and two on the equator, a quarter of the way round from each other, has three right angles;
- the bigger the triangle, the bigger the sum;
- triangles with the same angles are congruent: there are no similar triangles of different sizes;
- the Pythagorean theorem fails.

Riemann's insight was that a line can be *unbounded*, never coming to an end, without being *infinite*.

### Hyperbolic Geometry (Bolyai, Lobachevsky) {#hyperbolic-geometry}
kind: axiom
tags: bolyai, lobachevsky, non-euclidean, poincare
summary: The geometry that János Bolyai and Nikolai Lobachevsky found around 1830, in which a line has many parallels through the same point.

Euclid's postulates, with the fifth changed:
1. Through any two distinct points there is exactly one line.
2. Any line segment can be extended indefinitely in a straight line.
3. For any point and any length there is a circle with that point as centre and that length as radius.
4. All right angles are equal.
5. **Through a point not on a given line there are at least two lines parallel to the given line.**

Its best-known model is the Poincaré disk: the inside of a circle, whose lines are its diameters and the arcs that meet its edge at right angles. Distances grow toward the edge, so that it is never reached; M. C. Escher's *Circle Limit* prints are tilings of this disk.

In hyperbolic geometry,
- through a point off a line pass infinitely many parallels;
- the angles of a triangle add to less than $180^\circ$, and the bigger the triangle, the smaller the sum;
- triangles with the same angles are congruent: there are no similar triangles of different sizes.

In 1868 Beltrami built a model of it inside Euclidean geometry, which showed that it is free of contradiction if Euclidean geometry is, and so that the parallel postulate can never be proved from the others.

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
