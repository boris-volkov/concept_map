# Geometry
color: #3c6e47
built-on: arithmetic

Shape, size and position, and the art of proving things about them.

## Axioms {#geometry-axioms}

Geometry has more than one set of axioms. Here are six, side by side: four for the familiar Euclidean plane, and two that change its parallel postulate.

The first four describe the same geometry. Euclid's postulates were the first; Hilbert's fill the gaps that Euclid's proofs left; Birkhoff's, and the high-school postulates that grew from them, start from a ruler and a protractor, so that lengths and angles are numbers from the beginning. The rest of this map follows Euclid's.

The last two keep most of Euclid's postulates but not the fifth, and so describe different geometries, which disagree on how many parallels to a line pass through a point off it:

| Geometry | Parallels | Angles of a triangle add to |
| --- | --- | --- |
| Euclidean | exactly one | $180^\circ$ |
| Elliptic | none | more than $180^\circ$ |
| Hyperbolic | infinitely many | less than $180^\circ$ |

Open any of them to compare them side by side, each a column of its axioms.

### Euclid's Postulates {#euclids-postulates}

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
rows: kinds
wrap: 6

The undefined terms and first definitions that everything else in geometry is built from.

### Parallel Lines & Transversals {#parallel-lines}
kind: theorem
prereqs: angle-pairs, parallel-definition, parallel-postulate

When a line crosses two parallel lines, the following hold, and each of them, conversely, proves two lines parallel:
- corresponding angles are equal;
- alternate interior angles are equal;
- co-interior angles add to $180^\circ$.

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
kind: definition
prereqs: angles, addition

Angles that come in pairs:
- complementary angles add to $90^\circ$;
- supplementary angles add to $180^\circ$;
- when two lines cross, the vertical angles opposite each other are equal.

### Parallel Lines {#parallel-definition}
kind: definition
prereqs: points-lines-planes

Two lines in a plane are parallel if they do not meet, however far they are extended. A transversal is a line that crosses two other lines at different points, and the angles it makes with them come in pairs:
- corresponding angles sit in matching positions at the two crossings;
- alternate interior angles lie between the two lines, on opposite sides of the transversal;
- co-interior angles lie between the two lines, on the same side of the transversal.

### Perpendicular Lines
kind: definition
prereqs: angles

Lines that meet at a right angle, written $\ell \perp m$. The shortest path from a point to a line is the perpendicular.

### Writing a Proof {#writing-proofs}
kind: skill
prereqs: two-column-proofs

Write a proof in four steps:
1. state what is given and what is to be proved, and draw a figure;
2. mark the figure with what is known;
3. work out the chain of reasoning, often backward from the goal;
4. write each statement with its reason: a given, a definition, a postulate or a theorem.

## Lines & Angles {#lines-and-angles}
rows: kinds
wrap: 6

The first theorems of geometry: what is forced on the angles where lines meet, and on lines that are parallel or perpendicular.

### Linear Pair Theorem
kind: theorem
prereqs: angle-pairs

If two angles form a linear pair, sharing a side with their other sides forming a straight line, they are supplementary:
$$\angle 1 + \angle 2 = 180^\circ.$$

Together they make a straight angle, which measures $180^\circ$.

### Vertical Angles Theorem
kind: theorem
prereqs: linear-pair-theorem

When two lines cross, the vertical angles, opposite each other, are equal.

*Proof.* Let the lines form the angles $\angle 1$, $\angle 2$ and $\angle 3$ in turn, so that $\angle 1$ and $\angle 3$ are vertical. Each of them forms a linear pair with $\angle 2$, so
$$\angle 1 = 180^\circ - \angle 2 = \angle 3. \qquad \square$$

### Congruent Supplements Theorem
kind: theorem
prereqs: angle-pairs

Angles supplementary to the same angle, or to equal angles, are equal. Likewise angles complementary to the same angle, or to equal angles, are equal: the Congruent Complements Theorem.

*Proof.* If $\angle 1 + \angle 2 = 180^\circ$ and $\angle 3 + \angle 2 = 180^\circ$, subtracting $\angle 2$ from both gives $\angle 1 = \angle 3$. The same works with $90^\circ$. $\square$

### Perpendicular Transversal Theorem
kind: theorem
prereqs: parallel-lines, perpendicular-lines

In a plane, a line perpendicular to one of two parallel lines is perpendicular to the other.

*Proof.* The line is a transversal of the two parallels, so its corresponding angles with them are equal, and one of them is $90^\circ$. $\square$

### Perpendiculars to One Line {#perpendiculars-parallel}
kind: theorem
prereqs: parallel-lines, perpendicular-lines

In a plane, two lines perpendicular to the same line are parallel.

*Proof.* Their corresponding angles with that line are both $90^\circ$, so by the converse of the corresponding angles theorem they are parallel. $\square$

### Transitivity of Parallels {#parallel-transitivity}
kind: theorem
prereqs: parallel-lines, parallel-postulate, proof-by-contradiction

Two distinct lines parallel to the same line are parallel to each other.

*Proof*, by contradiction. If they met at a point, there would be two lines through that point parallel to the third line, which the [[parallel-postulate|parallel postulate]] forbids. $\square$

### Perpendicular Bisector Theorem
kind: theorem
prereqs: triangle-congruence, linear-pair-theorem, iff-proofs

A point lies on the perpendicular bisector of a segment $\overline{AB}$ if and only if it is equally far from $A$ and $B$.

*Proof.* Let $M$ be the midpoint of $\overline{AB}$, and $P$ a point other than $M$. (⇒) If $P$ is on the bisector, the triangles $PMA$ and $PMB$ are congruent by SAS, so $PA = PB$. (⇐) If $PA = PB$, the triangles $PMA$ and $PMB$ are congruent by SSS, so the angles at $M$ are equal; being a linear pair, both are right angles, and $PM$ is the perpendicular bisector. $\square$

### Angle Bisector Theorem {#angle-bisector-equidistance}
kind: theorem
prereqs: triangle-congruence, perpendicular-lines, iff-proofs

A point inside an angle lies on its bisector if and only if it is equally far from the angle's two sides, distances being measured along perpendiculars.

*Proof.* Let the angle have vertex $A$, and drop perpendiculars $\overline{PD}$ and $\overline{PE}$ from $P$ to its sides. (⇒) The right triangles $PAD$ and $PAE$ share the hypotenuse $\overline{PA}$ and have equal angles at $A$, so they are congruent by AAS, and $PD = PE$. (⇐) If $PD = PE$, they are congruent by HL, so the angles at $A$ are equal. $\square$

### Finding Angles with Parallel Lines {#finding-angles-parallel}
kind: skill
prereqs: parallel-lines, vertical-angles-theorem

Mark what is equal: corresponding, alternate and vertical angles are equal, and same-side interior angles add to $180^\circ$. Write an equation and solve.

```quiz
Q: Two parallel lines are cut by a transversal. Same-side interior angles are $3x$ and $x + 20$ degrees. What is $x$?
A: 40
Why: $4x + 20 = 180$.
```

## Triangles
rows: kinds
wrap: 6

The simplest polygons, and the ones every other shape breaks into.

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

### Pythagorean Theorem
kind: theorem
prereqs: triangle-types, exponents, area-basic

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
kind: theorem
prereqs: pythagorean-theorem, simplifying-radicals, isosceles-triangle-theorem

Two triangles worth knowing by heart:
- the $45^\circ$-$45^\circ$-$90^\circ$ triangle, with sides $1 : 1 : \sqrt{2}$;
- the $30^\circ$-$60^\circ$-$90^\circ$ triangle, with sides $1 : \sqrt{3} : 2$.

### Third Angles Theorem
kind: theorem
prereqs: triangle-angle-sum

If two angles of one triangle are equal to two angles of another, the third angles are equal too.

*Proof.* Each third angle is $180^\circ$ minus the same sum. $\square$

### Acute Angles of a Right Triangle {#right-triangle-acute-angles}
kind: theorem
prereqs: triangle-angle-sum

The two acute angles of a right triangle are complementary; and no triangle has more than one right or obtuse angle.

*Proof.* With one angle $90^\circ$, the other two share the remaining $180^\circ - 90^\circ = 90^\circ$. Two angles of $90^\circ$ or more would already add to $180^\circ$ or more. $\square$

### Equilateral Triangle Theorem
kind: theorem
prereqs: isosceles-triangle-theorem, triangle-angle-sum

A triangle is equilateral if and only if it is equiangular, and then each of its angles is $60^\circ$.

*Proof.* By the [[isosceles-triangle-theorem|isosceles triangle theorem]], applied to each pair of sides, equal sides go with equal opposite angles, and equal angles with equal opposite sides. Three equal angles share $180^\circ$, so each is $60^\circ$. $\square$

### Exterior Angle Inequality
kind: theorem
prereqs: exterior-angle-theorem

An exterior angle of a triangle is greater than either of the two remote interior angles.

It follows from the [[exterior-angle-theorem|exterior angle theorem]], since the exterior angle is the sum of the two, and each is positive. Euclid proved it before using the parallel postulate (*Elements* I.16), so it holds in hyperbolic geometry too.

### Angle–Side Relationships {#triangle-side-angle}
kind: theorem
prereqs: isosceles-triangle-theorem, exterior-angle-inequality

In a triangle, the longer of two sides lies opposite the larger angle, and the larger of two angles opposite the longer side: in triangle $ABC$,
$$BC > AC \iff \angle A > \angle B.$$

*Proof.* (⇒) If $BC > AC$, mark $D$ on $\overline{CB}$ with $CD = CA$. Triangle $ACD$ is isosceles, so $\angle CAD = \angle CDA$. And $\angle CDA$ is an exterior angle of triangle $ADB$, so it is greater than $\angle B$. Hence
$$\angle A > \angle CAD = \angle CDA > \angle B.$$
(⇐) If $\angle A > \angle B$ but $BC \le AC$, then either $BC = AC$, making the angles equal, or $BC < AC$, making $\angle A < \angle B$ by the first part: a contradiction either way. $\square$

### Hinge Theorem
kind: theorem
prereqs: triangle-side-angle, triangle-congruence

If two sides of one triangle are equal to two sides of another, and the angle between them is larger in the first, then the third side of the first is longer; and conversely, the longer third side goes with the larger included angle.

Also called the SAS inequality: like a door on its hinge, the wider it opens, the further apart its ends. It is Euclid's *Elements* I.24 and I.25.

### Pythagorean Inequalities
kind: theorem
prereqs: pythagorean-theorem, hinge-theorem

In a triangle whose longest side is $c$ and whose other sides are $a$ and $b$, the triangle is
- acute if and only if $c^2 < a^2 + b^2$;
- right if and only if $c^2 = a^2 + b^2$;
- obtuse if and only if $c^2 > a^2 + b^2$.

*Proof sketch.* Compare with the right triangle with legs $a$ and $b$, whose hypotenuse is $\sqrt{a^2 + b^2}$. By the [[hinge-theorem|hinge theorem]], the angle opposite $c$ is larger than $90^\circ$ exactly when $c$ is longer than that hypotenuse. $\square$

```quiz
Q: A triangle has sides 6, 7 and 9. It is:
+ acute
- right
- obtuse
Hint: Compare $9^2$ with $6^2 + 7^2$.
Why: $81 < 36 + 49 = 85$.

Q: A triangle has sides 5, 6 and 8. It is:
- acute
- right
+ obtuse
Why: $64 > 25 + 36 = 61$.
```

### Triangle Midsegment Theorem
kind: theorem
prereqs: triangle-similarity, parallel-lines

The segment joining the midpoints of two sides of a triangle is parallel to the third side, and half as long.

*Proof.* Let $D$ and $E$ be the midpoints of $\overline{AB}$ and $\overline{AC}$. Triangles $ADE$ and $ABC$ share the angle at $A$, and
$$\frac{AD}{AB} = \frac{AE}{AC} = \frac{1}{2},$$
so they are similar by SAS, with scale factor $\frac{1}{2}$. Hence $DE = \frac{1}{2}BC$, and the corresponding angles $\angle ADE$ and $\angle ABC$ are equal, so $\overline{DE} \parallel \overline{BC}$. $\square$

### Centroid Theorem
kind: theorem
prereqs: triangle-segments, triangle-midsegment-theorem

The three medians of a triangle meet at one point, the centroid, which lies two thirds of the way along each median from its vertex. In coordinates it is the average of the vertices:
$$G = \left(\frac{x_1 + x_2 + x_3}{3}, \frac{y_1 + y_2 + y_3}{3}\right).$$

*Proof sketch.* Let the medians $\overline{BE}$ and $\overline{CF}$ meet at $G$. The midsegment $\overline{EF}$ is parallel to $\overline{BC}$ and half as long, so triangles $GEF$ and $GBC$ are similar with ratio $\frac{1}{2}$, and $BG = 2GE$. So any two medians meet at the point two thirds of the way along each, and the third median passes through it too. $\square$

```quiz
Q: A median of a triangle is 12 cm long. How far is the centroid from the vertex it starts at?
A: 8
Why: Two thirds of the way along: $\frac{2}{3} \cdot 12 = 8$ cm.
```

### Circumcentre Theorem
kind: theorem
prereqs: perpendicular-bisector-theorem, triangle-segments

The perpendicular bisectors of the three sides of a triangle meet at one point, the circumcentre, which is equally far from the three vertices: it is the centre of the circle through them, the circumcircle.

*Proof.* The bisectors of $\overline{AB}$ and $\overline{BC}$ meet, since those sides are not parallel, at a point $O$. By the [[perpendicular-bisector-theorem|perpendicular bisector theorem]], $OA = OB$ and $OB = OC$; so $OA = OC$, and $O$ is on the bisector of $\overline{AC}$ as well. $\square$

The circumcentre lies inside an acute triangle, at the midpoint of the hypotenuse of a right triangle, and outside an obtuse one.

### Incentre Theorem
kind: theorem
prereqs: angle-bisector-equidistance, triangle-segments

The bisectors of the three angles of a triangle meet at one point, the incentre, which is equally far from the three sides: it is the centre of the circle that touches all three, the incircle.

*Proof.* The bisectors of $\angle A$ and $\angle B$ meet at a point $I$ inside the triangle. By the [[angle-bisector-equidistance|angle bisector theorem]], $I$ is as far from side $\overline{AB}$ as from $\overline{AC}$, and as far from $\overline{AB}$ as from $\overline{BC}$; so it is equally far from $\overline{AC}$ and $\overline{BC}$, and lies on the bisector of $\angle C$. $\square$

### Orthocentre Theorem
kind: theorem
prereqs: circumcentre-theorem, parallelogram-properties

The three altitudes of a triangle, extended as lines, meet at one point, the orthocentre.

*Proof.* Through each vertex draw the parallel to the opposite side. They form a larger triangle, made of four copies of the first, whose sides have $A$, $B$ and $C$ as midpoints, by the parallelograms in the figure. Each altitude of the small triangle is perpendicular to a side of the large one at its midpoint, so the altitudes are the large triangle's perpendicular bisectors, which meet by the [[circumcentre-theorem|circumcentre theorem]]. $\square$

### Classifying Triangles {#triangle-types}
kind: definition
prereqs: angles, segments-and-rays

Triangles are classified
- by sides: scalene, isosceles (two equal sides) or equilateral;
- by angles: acute, right or obtuse.

### Medians, Altitudes & Bisectors {#triangle-segments}
kind: definition
prereqs: triangle-types, perpendicular-lines

Special lines in a triangle, each family meeting at a single point:
- the medians, from each corner to the middle of the opposite side, at the centroid, the balance point;
- the altitudes, from each corner perpendicular to the opposite side, at the orthocentre;
- the angle bisectors, at the incentre;
- the perpendicular bisectors of the sides, at the circumcentre.

### Using the Pythagorean Theorem {#using-pythagoras}
kind: skill
prereqs: pythagorean-theorem, square-roots

Label the hypotenuse $c$, opposite the right angle, substitute, and solve. Look for the triples 3-4-5, 5-12-13, 8-15-17 and their multiples.

```quiz
Q: A right triangle has hypotenuse 13 and one leg 5. What is the other leg?
A: 12
Why: $\sqrt{169 - 25} = 12$.
```

### Classifying by Sides {#classifying-by-sides}
kind: skill
prereqs: pythagorean-inequalities

With $c$ the longest side, compare $c^2$ with $a^2 + b^2$: less is acute, equal is right, more is obtuse. First check the [[triangle-inequality]].

## Congruence & Similarity {#congruence-and-similarity}
rows: kinds
wrap: 6

When two figures are the same, and when they are the same shape at different sizes.

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
prereqs: triangle-congruence

Corresponding parts of congruent triangles are congruent: once two triangles are proved congruent, every matching side and angle may be used as equal.

### Triangle Similarity Criteria {#triangle-similarity}
kind: theorem
prereqs: similarity, triangle-angle-sum

Two triangles are similar if
- AA: two pairs of angles are equal;
- SAS: two pairs of sides are proportional and the included angles are equal;
- SSS: all three pairs of sides are proportional.

### Isosceles Triangle Bisector Theorem {#isosceles-bisector}
kind: theorem
prereqs: isosceles-triangle-theorem, cpctc

In an isosceles triangle, the bisector of the angle between the equal sides is the perpendicular bisector of the base; it is also the median and the altitude from that vertex.

*Proof.* The bisector splits the triangle into two triangles that are congruent by SAS. By [[cpctc|CPCTC]], it cuts the base into equal halves, and its two angles with the base are equal; as a linear pair, they are right angles. $\square$

### Side-Splitter Theorem {#triangle-proportionality}
kind: theorem
prereqs: triangle-similarity, parallel-lines

A line parallel to one side of a triangle, and crossing the other two sides, divides them in the same ratio: if $D$ is on $\overline{AB}$ and $E$ on $\overline{AC}$ with $\overline{DE} \parallel \overline{BC}$, then
$$\frac{AD}{DB} = \frac{AE}{EC}.$$
Conversely, a line that divides two sides in the same ratio is parallel to the third.

*Proof.* The corresponding angles at $D$ and $B$ are equal, so triangles $ADE$ and $ABC$ are similar by AA, and
$$\frac{AB}{AD} = \frac{AC}{AE}.$$
Subtracting 1 from both sides gives $\frac{DB}{AD} = \frac{EC}{AE}$; turn both over. $\square$

### Triangle Angle Bisector Theorem {#angle-bisector-proportion}
kind: theorem
prereqs: triangle-proportionality, isosceles-triangle-theorem

The bisector of an angle of a triangle divides the opposite side in the ratio of the two sides beside it: if $\overline{AD}$ bisects $\angle A$, with $D$ on $\overline{BC}$, then
$$\frac{BD}{DC} = \frac{AB}{AC}.$$

*Proof.* Through $C$, draw the parallel to $\overline{AD}$, meeting line $BA$ beyond $A$ at $E$. Then $\angle ACE = \angle CAD$, as alternate angles, and $\angle AEC = \angle BAD$, as corresponding angles; these are equal, since $\overline{AD}$ bisects $\angle A$. So triangle $ACE$ is isosceles, with $AE = AC$. By the [[triangle-proportionality|side-splitter theorem]] in triangle $BCE$,
$$\frac{BD}{DC} = \frac{BA}{AE} = \frac{AB}{AC}. \qquad \square$$

### Parallels Divide Proportionally {#parallel-proportions}
kind: theorem
prereqs: triangle-proportionality

Three or more parallel lines cut every transversal into segments in the same ratio. In particular, if they cut off equal segments on one transversal, they cut off equal segments on every transversal.

*Proof sketch.* Join the ends of two transversals with a diagonal, and apply the [[triangle-proportionality|side-splitter theorem]] in the two triangles it makes: both ratios equal the ratio along the diagonal. $\square$

### Right Triangle Altitude Theorem {#altitude-similarity}
kind: theorem
prereqs: triangle-similarity, right-triangle-acute-angles

The altitude to the hypotenuse of a right triangle divides it into two triangles, each similar to it and to each other.

*Proof.* Each small triangle has a right angle, and shares an acute angle with the whole triangle; so each is similar to it by AA, and so to each other. $\square$

### Geometric Mean Theorems {#geometric-mean-theorems}
kind: theorem
prereqs: altitude-similarity, solving-proportions

In a right triangle with legs $a$ and $b$ and hypotenuse $c$, let the altitude $h$ to the hypotenuse divide it into $p$, next to $a$, and $q$, next to $b$. Then
$$\begin{aligned} h^2 &= pq, \\ a^2 &= pc, \\ b^2 &= qc. \end{aligned}$$
The altitude is the geometric mean of the two pieces, and each leg the geometric mean of the hypotenuse and the piece beside it.

*Proof.* Each equation is a proportion between [[altitude-similarity|similar triangles]]: $\frac{p}{h} = \frac{h}{q}$, $\frac{p}{a} = \frac{a}{c}$ and $\frac{q}{b} = \frac{b}{c}$. $\square$

Adding the last two gives $a^2 + b^2 = (p + q)c = c^2$: another proof of the [[pythagorean-theorem|Pythagorean theorem]].

```quiz
Q: The altitude to the hypotenuse of a right triangle cuts the hypotenuse into pieces 4 and 9 long. How long is the altitude?
A: 6
Hint: The altitude is the geometric mean of the two pieces.
Why: $h^2 = 4 \cdot 9 = 36$, so $h = 6$.
```

### Congruence by Rigid Motions {#congruence-by-rigid-motions}
kind: theorem
prereqs: rigid-motions, congruence

Two figures are congruent if and only if a sequence of rigid motions takes one onto the other.

### Similarity by Transformations {#similarity-by-transformations}
kind: theorem
prereqs: dilations, rigid-motions, similarity

Two figures are similar if and only if a dilation followed by rigid motions takes one onto the other.

### Congruent Figures {#congruence}
kind: definition
prereqs: rigid-motions

Figures with the same shape and size: one can be moved onto the other by slides, turns and flips. Corresponding sides and angles are equal.

### Similar Figures {#similarity}
kind: definition
prereqs: congruence, dilations, proportions

Figures with the same shape but possibly different sizes:
- equal corresponding angles;
- every pair of corresponding sides in the same ratio, the scale factor.

### Using Similar Triangles
kind: skill
prereqs: triangle-similarity, solving-proportions

1. show that the triangles are similar;
2. match the vertices in order;
3. write a proportion of corresponding sides;
4. solve it.

Measuring the unreachable. A tree casting a 12 m shadow, beside a 2 m post casting a 3 m shadow, has the same ratio of height to shadow:
$$\frac{h}{12} = \frac{2}{3} \implies h = 8\text{ m}.$$

### Proving Triangles Congruent {#proving-congruence}
kind: skill
prereqs: triangle-congruence, cpctc, writing-proofs

1. mark the given facts on the figure;
2. add what is implied: shared sides, vertical angles, angles from parallel lines;
3. name the criterion, from SSS, SAS, ASA, AAS or HL;
4. state the congruence, with matching vertices in order;
5. use [[cpctc]] for any other parts.

> **!** SSA and AAA do not prove congruence.

### Proving Triangles Similar {#proving-similarity}
kind: skill
prereqs: triangle-similarity, writing-proofs

Find two pairs of equal angles (AA), or compare the ratios of sides for SSS or SAS similarity. Then write proportions in the order of the matching vertices.

## Transformations {#geometric-transformations}
rows: kinds
wrap: 6

Moving and resizing figures in the plane.

### Properties of Dilations {#dilation-properties}
kind: theorem
prereqs: dilations, triangle-proportionality

A dilation with centre $O$ and scale factor $k$
- maps a line through $O$ to itself, and every other line to a parallel line;
- multiplies every length by $|k|$;
- keeps every angle the same.

So it maps every figure to a similar one, which is how [[similarity|similarity]] is defined by transformations.

### Two Reflections in Parallel Lines {#reflections-parallel}
kind: theorem
prereqs: reflections, translations

Reflecting in a line, and then in a parallel line a distance $d$ away, is a translation by $2d$, perpendicular to the lines, in the direction from the first line to the second.

### Two Reflections in Crossing Lines {#reflections-crossing}
kind: theorem
prereqs: reflections, rotations

Reflecting in a line, and then in a second line that crosses it at $P$ at an angle $\theta$, is a rotation about $P$ by $2\theta$, in the direction from the first line to the second.

### Three Reflections Theorem
kind: theorem
prereqs: reflections-parallel, reflections-crossing, rigid-motions

Every rigid motion of the plane is a composition of at most three reflections: one or none for a reflection or the identity, two for a translation or rotation, three for a glide reflection.

So reflections are the building blocks of all the rigid motions.

### Rigid Motions Preserve Distance and Angle {#rigid-motion-properties}
kind: theorem
prereqs: rigid-motions

Translations, reflections and rotations preserve distance, angle measure, parallelism and collinearity.

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
kind: definition
prereqs: reflections, rotations

A figure has symmetry when some motion maps it onto itself:
- reflection symmetry, about a mirror line;
- rotational symmetry, about a centre by an angle.

### Coordinate Rules {#transformation-rules}
kind: form
prereqs: translations, reflections, rotations, dilations

| Transformation | $(x, y) \to$ |
| --- | --- |
| translation by $\langle a, b \rangle$ | $(x + a, y + b)$ |
| reflection in the $x$-axis | $(x, -y)$ |
| reflection in the $y$-axis | $(-x, y)$ |
| reflection in $y = x$ | $(y, x)$ |
| rotation $90^\circ$ counter-clockwise | $(-y, x)$ |
| rotation $180^\circ$ | $(-x, -y)$ |
| rotation $270^\circ$ counter-clockwise | $(y, -x)$ |
| dilation by $k$ from the origin | $(kx, ky)$ |

### Performing Transformations {#performing-transformations}
kind: skill
prereqs: transformation-rules

Apply the rule to each vertex, one transformation at a time, in order. The order of a sequence matters.

```quiz
Q: The point $(2, 5)$ is rotated $90^\circ$ counter-clockwise about the origin. What is the new $x$-coordinate?
A: -5
Why: $(x, y) \to (-y, x)$.
```

### Describing a Sequence of Motions {#describing-transformations}
kind: skill
prereqs: rigid-motion-properties

Match the vertices of the two figures. A change of orientation means a reflection is needed. Then translate one matching point onto the other, and rotate to line the rest up.

## Polygons
rows: kinds
wrap: 6

Closed figures made of straight sides.

### Properties of Parallelograms {#parallelogram-properties}
kind: theorem
prereqs: quadrilaterals, triangle-congruence

In a parallelogram the following hold, and any one of them, conversely, proves a quadrilateral is a parallelogram:
- opposite sides are equal;
- opposite angles are equal;
- the diagonals bisect each other.

### Parallelogram Test {#parallelogram-one-pair}
kind: theorem
prereqs: parallelogram-properties, triangle-congruence

A quadrilateral with one pair of opposite sides both equal and parallel is a parallelogram.

*Proof.* Let $\overline{AB}$ and $\overline{DC}$ be equal and parallel. The diagonal $\overline{AC}$ makes equal alternate angles $\angle BAC$ and $\angle DCA$, so triangles $ABC$ and $CDA$ are congruent by SAS. Hence $BC = DA$ too, and with both pairs of opposite sides equal, $ABCD$ is a [[parallelogram-properties|parallelogram]]. $\square$

### Rectangle Diagonals Theorem
kind: theorem
prereqs: parallelogram-properties, triangle-congruence

A parallelogram is a rectangle if and only if its diagonals are equal.

*Proof.* In parallelogram $ABCD$, triangles $ABC$ and $BAD$ share $\overline{AB}$ and have $BC = AD$. (⇒) In a rectangle the angles at $A$ and $B$ are right, so the triangles are congruent by SAS, and $AC = BD$. (⇐) If $AC = BD$, they are congruent by SSS, so $\angle A = \angle B$; and since these two are co-interior angles, they add to $180^\circ$, so each is $90^\circ$. $\square$

### Rhombus Diagonals Theorem
kind: theorem
prereqs: parallelogram-properties, perpendicular-bisector-theorem

A parallelogram is a rhombus if and only if its diagonals are perpendicular, and if and only if each diagonal bisects the angles at its ends.

*Proof sketch.* The diagonals of a parallelogram bisect each other. If two neighbouring sides are equal, the four triangles the diagonals make are congruent by SSS, which makes the angles at the centre right angles and the angles at the corners halved; and each of these, conversely, makes two neighbouring sides equal. $\square$

### Isosceles Trapezoid Theorem
kind: theorem
prereqs: quadrilaterals, triangle-congruence

In a trapezoid with exactly one pair of parallel sides, the following are equivalent:
- its legs, the other two sides, are equal;
- the two angles at either base are equal;
- its diagonals are equal.

Such a trapezoid is isosceles, and has a line of symmetry through the midpoints of its bases.

### Trapezoid Midsegment Theorem
kind: theorem
prereqs: triangle-midsegment-theorem, quadrilaterals

The segment joining the midpoints of the legs of a trapezoid is parallel to its bases $a$ and $b$, and its length is their average:
$$m = \frac{a + b}{2}.$$

*Proof.* A diagonal splits the trapezoid into two triangles. The midpoint of the diagonal, with the midpoints of the legs, gives a [[triangle-midsegment-theorem|midsegment]] of each, parallel to the bases and $\frac{a}{2}$ and $\frac{b}{2}$ long, on one line. $\square$

So the area of a trapezoid, $\frac{1}{2}(a + b)h$, is its midsegment times its height.

### Kite Theorem
kind: theorem
prereqs: perpendicular-bisector-theorem, triangle-congruence

In a kite $ABCD$, with $AB = AD$ and $CB = CD$:
- the diagonals are perpendicular, and $\overline{AC}$ bisects $\overline{BD}$;
- the angles at $B$ and $D$, between unequal sides, are equal.

*Proof.* $A$ and $C$ are each equally far from $B$ and $D$, so both lie on the [[perpendicular-bisector-theorem|perpendicular bisector]] of $\overline{BD}$, which is therefore the line $AC$. Triangles $ABC$ and $ADC$ are congruent by SSS, which gives the equal angles. $\square$

### Varignon's Theorem
kind: theorem
prereqs: triangle-midsegment-theorem, parallelogram-properties

The midpoints of the four sides of any quadrilateral are the corners of a parallelogram.

*Proof.* Each diagonal of the quadrilateral splits it into two triangles, in which two opposite sides of the inner quadrilateral are [[triangle-midsegment-theorem|midsegments]]: both parallel to that diagonal and half as long. So both pairs of opposite sides are parallel. $\square$

### Polygons {#polygon-basics}
kind: definition
prereqs: segments-and-rays, angles

Closed shapes made of segments, named by their number of sides: triangle, quadrilateral, pentagon, hexagon. Regular polygons have all sides and all angles equal.

### Quadrilaterals
kind: definition
prereqs: polygon-basics, parallel-lines, perpendicular-lines

Four-sided polygons, and their family tree:
- a trapezoid has a pair of parallel sides;
- a parallelogram has two;
- a rectangle is a parallelogram with right angles;
- a rhombus is a parallelogram with equal sides;
- a square is both.

### Polygon Angle Sums
kind: formula
prereqs: triangle-angle-sum, polygon-basics

For a convex $n$-gon:
- the interior angles sum to $(n - 2) \cdot 180^\circ$;
- the exterior angles sum to $360^\circ$;
- each interior angle of a regular one is $\dfrac{(n - 2) \cdot 180^\circ}{n}$.

### Finding Angles in Polygons {#finding-polygon-angles}
kind: skill
prereqs: polygon-angle-sums

The interior angles of an $n$-gon add to $(n - 2)180^\circ$, and the exterior angles to $360^\circ$. In a regular polygon, divide by $n$.

```quiz
Q: What is each interior angle of a regular octagon, in degrees?
A: 135
Why: $\frac{6 \cdot 180}{8} = 135$.
```

### Classifying Quadrilaterals {#classifying-quadrilaterals}
kind: skill
prereqs: quadrilaterals, parallelogram-properties

Test in order: does it have two pairs of parallel sides, then equal diagonals for a rectangle, perpendicular diagonals for a rhombus, and both for a square? In coordinates, compare slopes and lengths.

## Circles
rows: kinds
wrap: 6

The set of points at a fixed distance from a centre.

### Inscribed Angle Theorem
kind: theorem
prereqs: arcs-and-central-angles, isosceles-triangle-theorem, exterior-angle-theorem

An inscribed angle measures half the central angle subtending the same arc. In particular, an angle inscribed in a semicircle is a right angle (Thales' theorem).

### Tangents to a Circle {#circle-tangents}
kind: theorem
prereqs: circle-parts, perpendicular-lines

Two facts about tangents:
- a tangent is perpendicular to the radius at the point where it touches;
- the two tangents from an outside point are equally long.

### Chords & Arcs {#chords-and-arcs}
kind: theorem
prereqs: arcs-and-central-angles, triangle-congruence

In one circle, or in equal circles, equal chords cut off equal arcs and stand on equal central angles; and conversely.

*Proof.* A chord and the two radii to its ends make a triangle. Equal chords make triangles congruent by SSS, since all radii are equal, so the central angles are equal, and with them the arcs. $\square$

### Chords & the Centre {#chord-perpendicular}
kind: theorem
prereqs: perpendicular-bisector-theorem, circle-parts

The line through the centre of a circle perpendicular to a chord bisects the chord and its arc; and the perpendicular bisector of every chord passes through the centre.

*Proof.* The centre is equally far from the two ends of the chord, so by the [[perpendicular-bisector-theorem|perpendicular bisector theorem]] it lies on the chord's perpendicular bisector. $\square$

So the centre of a circle can be found from any two chords that are not parallel: it is where their perpendicular bisectors cross.

### Equal Chords Theorem {#chord-distance}
kind: theorem
prereqs: chord-perpendicular, pythagorean-theorem

Two chords of a circle are equal if and only if they are equally far from the centre.

*Proof.* The perpendicular from the centre to a chord bisects it, so a chord of length $2l$ at distance $d$ from the centre of a circle of radius $r$ has
$$l^2 = r^2 - d^2,$$
and $l$ is fixed by $d$, and $d$ by $l$. $\square$

### Inscribed Angles on One Arc {#inscribed-angles-same-arc}
kind: theorem
prereqs: inscribed-angle-theorem

Inscribed angles that cut off the same arc are equal.

*Proof.* Each is half the central angle on that arc. $\square$

### Thales' Theorem
kind: theorem
prereqs: inscribed-angle-theorem, circumcentre-theorem

An angle inscribed in a semicircle is a right angle. Conversely, the hypotenuse of a right triangle is a diameter of the circle through its corners.

*Proof.* The arc cut off is a semicircle, with central angle $180^\circ$, so the inscribed angle is $90^\circ$. Conversely, by the [[circumcentre-theorem|circumcentre theorem]], the circumcentre of a right triangle is the midpoint of its hypotenuse. $\square$

The oldest theorem with a name, credited to Thales of Miletus, about 600 BC.

### Cyclic Quadrilateral Theorem
kind: theorem
prereqs: inscribed-angle-theorem

The opposite angles of a quadrilateral inscribed in a circle add to $180^\circ$. Conversely, a quadrilateral whose opposite angles add to $180^\circ$ can be inscribed in a circle.

*Proof.* Two opposite angles cut off the two arcs between their other corners, which together make the whole circle, $360^\circ$; each angle is half its arc, so together they make $180^\circ$. $\square$

### Tangent–Chord Angle Theorem
kind: theorem
prereqs: circle-tangents, inscribed-angle-theorem

The angle between a tangent and a chord through the point of contact is half the arc it cuts off: it equals any inscribed angle on that arc from the other side.

*Proof sketch.* With the chord a diameter, the angle is $90^\circ$, by the [[circle-tangents|tangent–radius theorem]], and the arc a semicircle. Any other chord differs from the diameter by an inscribed angle, which adds or takes away half its arc. $\square$

### Angles Between Chords {#chord-chord-angle}
kind: theorem
prereqs: inscribed-angle-theorem, exterior-angle-theorem

When two chords cross inside a circle, each angle they make is half the sum of the arc it cuts off and the arc its vertical angle cuts off.

*Proof.* Let chords $\overline{AB}$ and $\overline{CD}$ cross at $P$, and draw $\overline{AD}$. The angle $\angle APC$ is an exterior angle of triangle $APD$, so
$$\angle APC = \angle PAD + \angle PDA.$$
These two are inscribed angles on the arcs $BD$ and $AC$, so each is half its arc. $\square$

### Angles From Outside a Circle {#outside-angle}
kind: theorem
prereqs: chord-chord-angle, tangent-chord-angle-theorem

An angle whose vertex is outside a circle, made by two secants, a secant and a tangent, or two tangents, is half the difference of the far arc and the near arc that it cuts off.

*Proof*, for two secants. Let $P$ be outside the circle, with secants meeting it at $A$ then $B$, and at $C$ then $D$; draw $\overline{AD}$. The inscribed angle $\angle BAD$ is an exterior angle of triangle $PAD$, so
$$\angle P = \angle BAD - \angle ADC,$$
which is half the far arc $BD$ less half the near arc $AC$. A tangent works the same way, by the [[tangent-chord-angle-theorem|tangent–chord angle theorem]]. $\square$

### Intersecting Chords Theorem
kind: theorem
prereqs: inscribed-angles-same-arc, triangle-similarity

If two chords $\overline{AB}$ and $\overline{CD}$ of a circle cross at $P$, then
$$PA \cdot PB = PC \cdot PD.$$

*Proof.* Triangles $PAC$ and $PDB$ have equal vertical angles at $P$, and the inscribed angles $\angle CAB$ and $\angle CDB$ on the same arc. So they are similar by AA, and $\frac{PA}{PD} = \frac{PC}{PB}$. $\square$

### Power of a Point
kind: theorem
prereqs: intersecting-chords-theorem, tangent-chord-angle-theorem

From a point $P$ outside a circle, if two secants meet it at $A$ and $B$ and at $C$ and $D$, and a tangent touches it at $T$, then
$$PA \cdot PB = PC \cdot PD = PT^2.$$
With the [[intersecting-chords-theorem|intersecting chords theorem]] inside: through any point, the product of the two distances to the circle along a line is the same for every line, the power of the point.

*Proof sketch.* Triangles $PAD$ and $PCB$ share the angle at $P$, and have equal inscribed angles at $D$ and $B$; similar by AA, they give $\frac{PA}{PC} = \frac{PD}{PB}$. For the tangent, triangles $PTA$ and $PBT$ are similar by the [[tangent-chord-angle-theorem|tangent–chord angle theorem]]. $\square$

```quiz
Q: From a point $P$, a secant meets a circle at $A$ and $B$, with $PA = 4$ and $PB = 9$. How long is the tangent from $P$ to the circle?
A: 6
Hint: The square of the tangent is $PA \cdot PB$.
Why: $PT^2 = 4 \cdot 9 = 36$, so $PT = 6$.
```

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

### Arcs & Central Angles {#arcs-and-central-angles}
kind: definition
prereqs: circle-parts, angles

An angle at the centre cuts off an arc, and the arc is measured by that angle: a $90^\circ$ central angle cuts off a quarter of the circle.

### Circumference and Pi {#circumference}
kind: formula
prereqs: circle-parts, ratio

A circle of radius $r$ and diameter $d$ has circumference
$$C = 2\pi r = \pi d,$$
where $\pi \approx 3.14159$ is the ratio of circumference to diameter, the same for every circle.

### Area of a Circle {#circle-area}
kind: formula
prereqs: circumference, area-basic

A circle of radius $r$ encloses area
$$A = \pi r^2.$$

### Arc Length & Sector Area {#arc-length-sector}
kind: formula
prereqs: circumference, circle-area, arcs-and-central-angles, proportions

A sector of radius $r$ and central angle $\theta$, in radians, has arc length and area
$$\begin{aligned} s &= r\theta, \\ A &= \frac{1}{2}r^2\theta; \end{aligned}$$
with $\theta$ in degrees,
$$\begin{aligned} s &= \frac{\theta}{360^\circ} \cdot 2\pi r, \\ A &= \frac{\theta}{360^\circ} \cdot \pi r^2. \end{aligned}$$

### Finding Angles in Circles {#finding-circle-angles}
kind: skill
prereqs: inscribed-angle-theorem, tangent-chord-angle-theorem

Find where the vertex is, and use the rule for that place:

| Vertex | Angle |
| --- | --- |
| at the centre | the arc |
| on the circle | half the arc |
| inside the circle | half the sum of the arcs |
| outside the circle | half the difference of the arcs |

```quiz
Q: An inscribed angle cuts off an arc of $110^\circ$. What is the angle, in degrees?
A: 55
Why: Half the arc.
```

### Finding Arcs and Sectors {#finding-arcs-and-sectors}
kind: skill
prereqs: arc-length-sector

Take the fraction of the whole circle: $\frac{\theta}{360^\circ}$ of the circumference, or of the area.

```quiz
Q: A sector of a circle of radius 6 has angle $60^\circ$. Its area is $k\pi$. What is $k$?
A: 6
Why: $\frac{1}{6} \cdot 36\pi = 6\pi$.
```

## Measurement
rows: kinds
wrap: 6

How much space a shape covers, encloses or fills.

### How Area & Volume Scale {#scaling}
kind: theorem
prereqs: similarity, volume-prisms

Enlarge a shape by a factor $k$ and its
- lengths grow by $k$;
- areas grow by $k^2$;
- volumes grow by $k^3$.

Double a cube's edge and it takes four times the paint to cover and eight times the water to fill.

### Cavalieri's Principle
kind: theorem
prereqs: volume-prisms

If two solids have cross-sections of equal area at every height, they have equal volumes.

It is why a slanted prism has the same volume, $V = Bh$, as an upright one: a stack of coins pushed sideways still holds the same metal. Archimedes found the volume of a sphere the same way, as a cylinder less a cone.

### Euler's Polyhedron Formula
kind: theorem
prereqs: polygon-basics

A convex polyhedron with $V$ vertices, $E$ edges and $F$ faces has
$$V - E + F = 2.$$

**Example.** A cube has $8 - 12 + 6 = 2$; a square pyramid $5 - 8 + 5 = 2$.

### Perimeter
kind: definition
prereqs: addition, segments-and-rays

The distance all the way around a shape: add up the lengths of its sides.

### Cross-Sections & Solids of Revolution {#cross-sections}
kind: property
prereqs: surface-area

A plane cuts a solid in a two-dimensional cross-section: a cylinder across gives a circle, and a sphere always gives a circle. Rotating a plane figure about an axis gives a solid: a rectangle gives a cylinder, a right triangle a cone, a semicircle a sphere.

### Table of Areas & Volumes {#area-volume-table}
kind: formula
tags: triangle, quadrilateral, parallelogram, rhombus, kite, trapezoid, polygon, pentagon, hexagon, octagon, decagon, dodecagon, circle, semicircle, sector, segment, annulus, ellipse, parabola, prism, cube, box, cylinder, pyramid, cone, frustum, sphere, hemisphere, ellipsoid, paraboloid, torus, tetrahedron, octahedron, dodecahedron, icosahedron
prereqs: area-polygons, regular-polygon-area, rhombus-kite-area, herons-formula, arc-length-sector, surface-area, volume-pyramids-cones-spheres, ellipses

The areas of plane figures, and the volumes and total surface areas of solids. Throughout, $h$ is a height measured square to the base, $l$ a slant height, $B$ the area of a base and $P$ its perimeter; in an oblique solid, $p$ is the perimeter of a cross-section square to $l$; and angles are in radians.

: Triangles
| Triangle | Drawn | Area |
| --- | :-: | --- |
| Any | {{ shape: triangle }} | $\dfrac{1}{2}bh$ |
| Right | {{ shape: right-triangle }} | $\dfrac{1}{2}ab$ |
| Isosceles | {{ shape: isosceles-triangle }} | $\dfrac{b}{4}\sqrt{4a^2 - b^2}$ |
| Equilateral | {{ shape: equilateral-triangle }} | $\dfrac{\sqrt{3}}{4}a^2$ |

: Triangles from Other Measurements
| Known | Drawn | Area |
| --- | :-: | --- |
| Two sides and the angle between | {{ shape: triangle-two-sides }} | $\dfrac{1}{2}ab\sin C$ |
| Two angles and the side between | {{ shape: triangle-two-angles }} | $\dfrac{c^2\sin A\sin B}{2\sin(A + B)}$ |
| Three sides (Heron) | {{ shape: triangle-three-sides }} | $\sqrt{s(s - a)(s - b)(s - c)}$<br>$s = \dfrac{a + b + c}{2}$ |
| Three vertices | {{ shape: triangle-vertices }} | $\dfrac{1}{2}\lvert x_1(y_2 - y_3) + x_2(y_3 - y_1)$<br>$\qquad + \, x_3(y_1 - y_2) \rvert$ |
| Inscribed circle | {{ shape: triangle-incircle }} | $rs$<br>$s = \dfrac{a + b + c}{2}$ |
| Circumscribed circle | {{ shape: triangle-circumcircle }} | $\dfrac{abc}{4R}$ |

: Parallelograms
| Figure | Drawn | Area |
| --- | :-: | --- |
| Square | {{ shape: square }} | $a^2 = \dfrac{1}{2}d^2$ |
| Rectangle | {{ shape: rectangle }} | $lw$ |
| Parallelogram | {{ shape: parallelogram }} | $bh = ab\sin\theta$ |
| Rhombus | {{ shape: rhombus }} | $\dfrac{1}{2}d_1 d_2$ |

: Other Quadrilaterals
| Figure | Drawn | Area |
| --- | :-: | --- |
| Trapezoid | {{ shape: trapezoid }} | $\dfrac{1}{2}(a + b)h$ |
| Kite | {{ shape: kite }} | $\dfrac{1}{2}d_1 d_2$ |
| Any quadrilateral | {{ shape: quadrilateral }} | $\dfrac{1}{2}d_1 d_2\sin\theta$ |
| Cyclic quadrilateral (Brahmagupta) | {{ shape: cyclic-quadrilateral }} | $\sqrt{(s - a)(s - b)(s - c)(s - d)}$<br>$s = \dfrac{a + b + c + d}{2}$ |

: Regular Polygons with $n$ Sides
| Known | Drawn | Area |
| --- | :-: | --- |
| Side | {{ shape: regular-polygon-side }} | $\dfrac{ns^2}{4\tan(\pi/n)}$ |
| Side and apothem | {{ shape: regular-polygon-apothem }} | $\dfrac{1}{2}nsa = \dfrac{1}{2}aP$ |
| Circumradius | {{ shape: regular-polygon-radius }} | $\dfrac{1}{2}nR^2\sin\dfrac{2\pi}{n}$ |

: Regular Polygons by Name
| Polygon | Drawn | Area |
| --- | :-: | --- |
| Pentagon | {{ shape: pentagon }} | $\dfrac{\sqrt{25 + 10\sqrt{5}}}{4}s^2$ |
| Hexagon | {{ shape: hexagon }} | $\dfrac{3\sqrt{3}}{2}s^2$ |
| Octagon | {{ shape: octagon }} | $2(1 + \sqrt{2})s^2$ |
| Decagon | {{ shape: decagon }} | $\dfrac{5\sqrt{5 + 2\sqrt{5}}}{2}s^2$ |
| Dodecagon | {{ shape: dodecagon }} | $3(2 + \sqrt{3})s^2$ |

: Circles
| Figure | Drawn | Area |
| --- | :-: | --- |
| Circle | {{ shape: circle }} | $\pi r^2 = \dfrac{1}{4}\pi d^2$ |
| Semicircle | {{ shape: semicircle }} | $\dfrac{1}{2}\pi r^2$ |
| Sector | {{ shape: sector }} | $\dfrac{1}{2}r^2\theta$ |
| Segment | {{ shape: circular-segment }} | $\dfrac{1}{2}r^2(\theta - \sin\theta)$ |
| Annulus | {{ shape: annulus }} | $\pi(R^2 - r^2)$ |
| Sector of an annulus | {{ shape: annular-sector }} | $\dfrac{1}{2}\theta(R^2 - r^2)$ |

: Ellipses and Parabolas
| Figure | Drawn | Area |
| --- | :-: | --- |
| Ellipse | {{ shape: ellipse }} | $\pi ab$ |
| Segment of a parabola | {{ shape: parabolic-segment }} | $\dfrac{2}{3}bh$ |

: Prisms
| Solid | Drawn | Volume | Surface Area |
| --- | :-: | --- | --- |
| Cube | {{ shape: cube }} | $a^3$ | $6a^2$ |
| Rectangular box | {{ shape: box }} | $lwh$ | $2(lw + lh + wh)$ |
| Any prism | {{ shape: prism }} | $Bh$ | $2B + Ph$ |
| Triangular prism | {{ shape: triangular-prism }} | $\dfrac{1}{2}abh$ | $ab + (a + b + c)h$ |
| Hexagonal prism | {{ shape: hexagonal-prism }} | $\dfrac{3\sqrt{3}}{2}s^2 h$ | $3\sqrt{3}s^2 + 6sh$ |
| Oblique prism | {{ shape: oblique-prism }} | $Bh$ | $2B + pl$ |

: Cylinders
| Solid | Drawn | Volume | Surface Area |
| --- | :-: | --- | --- |
| Cylinder | {{ shape: cylinder }} | $\pi r^2 h$ | $2\pi r^2 + 2\pi rh$ |
| Hollow cylinder | {{ shape: hollow-cylinder }} | $\pi(R^2 - r^2)h$ | $2\pi(R^2 - r^2) + 2\pi(R + r)h$ |
| Oblique cylinder | {{ shape: oblique-cylinder }} | $\pi r^2 h$ | $2\pi r^2 + pl$ |

: Pyramids and Cones
| Solid | Drawn | Volume | Surface Area |
| --- | :-: | --- | --- |
| Any pyramid | {{ shape: pyramid }} | $\dfrac{1}{3}Bh$ | $B + \dfrac{1}{2}Pl$ if regular |
| Square pyramid | {{ shape: square-pyramid }} | $\dfrac{1}{3}a^2 h$ | $a^2 + 2al$<br>$l = \sqrt{h^2 + \dfrac{1}{4}a^2}$ |
| Cone | {{ shape: cone }} | $\dfrac{1}{3}\pi r^2 h$ | $\pi r^2 + \pi rl$<br>$l = \sqrt{r^2 + h^2}$ |
| Frustum of a cone | {{ shape: cone-frustum }} | $\dfrac{1}{3}\pi h(R^2 + Rr + r^2)$ | $\pi(R^2 + r^2) + \pi(R + r)l$<br>$l = \sqrt{h^2 + (R - r)^2}$ |
| Frustum of a pyramid | {{ shape: pyramid-frustum }} | $\dfrac{1}{3}h\left(B_1 + B_2 + \sqrt{B_1 B_2}\right)$ | $B_1 + B_2 + \dfrac{1}{2}(P_1 + P_2)l$ if regular |

: Spheres
| Solid | Drawn | Volume | Surface Area |
| --- | :-: | --- | --- |
| Sphere | {{ shape: sphere }} | $\dfrac{4}{3}\pi r^3$ | $4\pi r^2$ |
| Hemisphere | {{ shape: hemisphere }} | $\dfrac{2}{3}\pi r^3$ | $3\pi r^2$ |
| Cap | {{ shape: spherical-cap }} | $\dfrac{1}{3}\pi h^2(3r - h)$ | $2\pi rh + \pi a^2$ |
| Segment | {{ shape: spherical-segment }} | $\dfrac{1}{6}\pi h(3a^2 + 3b^2 + h^2)$ | $2\pi rh + \pi(a^2 + b^2)$ |
| Sector | {{ shape: spherical-sector }} | $\dfrac{2}{3}\pi r^2 h$ | $\pi r(2h + a)$ |
| Shell | {{ shape: spherical-shell }} | $\dfrac{4}{3}\pi(R^3 - r^3)$ | $4\pi(R^2 + r^2)$ |

: Other Round Solids
| Solid | Drawn | Volume | Surface Area |
| --- | :-: | --- | --- |
| Ellipsoid | {{ shape: ellipsoid }} | $\dfrac{4}{3}\pi abc$ | no elementary formula |
| Paraboloid | {{ shape: paraboloid }} | $\dfrac{1}{2}\pi r^2 h$ | $\pi r^2 + \dfrac{\pi r}{6h^2}\left((r^2 + 4h^2)^{3/2} - r^3\right)$ |
| Torus | {{ shape: torus }} | $2\pi^2 Rr^2$ | $4\pi^2 Rr$ |

: The Five Regular Solids
| Solid | Drawn | Volume | Surface Area |
| --- | :-: | --- | --- |
| Tetrahedron | {{ shape: tetrahedron }} | $\dfrac{\sqrt{2}}{12}a^3$ | $\sqrt{3}a^2$ |
| Cube | {{ shape: cube }} | $a^3$ | $6a^2$ |
| Octahedron | {{ shape: octahedron }} | $\dfrac{\sqrt{2}}{3}a^3$ | $2\sqrt{3}a^2$ |
| Dodecahedron | {{ shape: dodecahedron }} | $\dfrac{15 + 7\sqrt{5}}{4}a^3$ | $3\sqrt{25 + 10\sqrt{5}}\,a^2$ |
| Icosahedron | {{ shape: icosahedron }} | $\dfrac{5(3 + \sqrt{5})}{12}a^3$ | $5\sqrt{3}a^2$ |

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
kind: formula
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

### Heron's Formula
kind: formula
prereqs: area-basic, pythagorean-theorem, square-roots

A triangle with sides $a$, $b$ and $c$, and semiperimeter $s = \frac{a + b + c}{2}$, has area
$$A = \sqrt{s(s - a)(s - b)(s - c)}.$$

**Example.** For sides 13, 14 and 15, $s = 21$, and
$$A = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = \sqrt{7056} = 84.$$

Found by Heron of Alexandria, in the first century: the area from the three sides alone, with no height needed.

### Area of a Regular Polygon {#regular-polygon-area}
kind: formula
prereqs: area-basic, polygon-basics

A regular polygon with perimeter $P$ and apothem $a$, the distance from its centre to each side, has area
$$A = \frac{1}{2}aP.$$

*Proof.* Lines from the centre to the corners cut an $n$-gon of side $s$ into $n$ triangles of base $s$ and height $a$, with total area $n \cdot \frac{1}{2}sa = \frac{1}{2}a \cdot ns$. $\square$

### Area of a Rhombus or Kite {#rhombus-kite-area}
kind: formula
prereqs: area-basic, kite-theorem

A quadrilateral with perpendicular diagonals $d_1$ and $d_2$, such as a rhombus, a kite or a square, has area
$$A = \frac{1}{2}d_1 d_2.$$

*Proof.* One diagonal cuts it into two triangles whose base is that diagonal and whose heights add to the other. $\square$

### Density {#density}
kind: formula
prereqs: volume-prisms

Density is mass per unit of volume, or a count per unit of area:
$$\rho = \frac{m}{V}.$$

### Composite Figures {#composite-figures}
kind: skill
prereqs: area-basic, volume-prisms

Split the figure into shapes with known formulas. Add their areas or volumes, and subtract the holes.

### Modelling with Solids {#modeling-with-geometry}
kind: skill
prereqs: composite-figures, density

Describe the object as simple shapes, compute what is asked, and round in the direction that the setting needs. Design problems choose the dimensions that meet a constraint at least cost.

## Coordinate Geometry
rows: kinds
wrap: 6

Geometry done with algebra, by giving every point coordinates.

### Slope Criteria {#slope-criteria}
kind: theorem
prereqs: parallel-perpendicular-slopes

Two non-vertical lines are parallel if and only if their slopes are equal, and perpendicular if and only if their slopes multiply to $-1$.

A coordinate proof uses these criteria to show that sides are parallel or perpendicular.

### Distance Formula
kind: formula
prereqs: pythagorean-theorem, coordinate-plane, square-roots

The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is
$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

### Midpoint Formula
kind: formula
prereqs: coordinate-plane, fraction-concept

The midpoint of the segment from $(x_1, y_1)$ to $(x_2, y_2)$ is
$$M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right).$$

### Equation of a Circle {#circle-equation}
kind: formula
prereqs: distance-formula, circle-parts

The circle with centre $(h, k)$ and radius $r$ is
$$(x - h)^2 + (y - k)^2 = r^2.$$

### Centre–Radius Form {#circle-center-radius-form}
kind: form
prereqs: circle-equation

$$(x - h)^2 + (y - k)^2 = r^2.$$

| Reads off | From |
| --- | --- |
| centre | $(h, k)$ |
| radius | $r$ |

### General Form of a Circle {#circle-general-form}
kind: form
prereqs: circle-equation

$$x^2 + y^2 + Dx + Ey + F = 0.$$

| Reads off | From |
| --- | --- |
| centre | $\left(-\frac{D}{2}, -\frac{E}{2}\right)$ |
| radius squared | $\frac{D^2 + E^2}{4} - F$ |

### Dividing a Segment in a Ratio {#partitioning-segments}
kind: formula
prereqs: midpoint-formula

The point dividing the segment from $(x_1, y_1)$ to $(x_2, y_2)$ in the ratio $m : n$ is
$$\left(\frac{nx_1 + mx_2}{m + n}, \frac{ny_1 + my_2}{m + n}\right).$$

### Coordinate Proofs
kind: technique
prereqs: distance-formula, midpoint-formula, slope, two-column-proofs

Place a figure on axes and prove things by computing:
- equal slopes show sides are parallel;
- slopes multiplying to $-1$ show them perpendicular;
- equal distances show them equal.

### Perimeter & Area in Coordinates {#coordinate-area}
kind: skill
prereqs: distance-formula

Find the side lengths with the [[distance-formula]], and read base and height from the grid if the sides are level. For a polygon with vertices in order, the shoelace formula gives
$$\text{Area} = \frac{1}{2}\left|\sum (x_iy_{i+1} - x_{i+1}y_i)\right|.$$

```quiz
Q: What is the perimeter of the triangle with vertices $(0, 0)$, $(3, 0)$, $(3, 4)$?
A: 12
Why: The sides are 3, 4 and 5.
```

### Finding Centre and Radius {#finding-circle-center}
kind: skill
prereqs: completing-the-square, circle-general-form

Complete the square in $x$ and in $y$:
$$\begin{aligned} x^2 + y^2 + 4x - 2y &= 4 \\ (x + 2)^2 + (y - 1)^2 &= 9 \end{aligned}$$
so the centre is $(-2, 1)$ and the radius is 3.

## Constructions
rows: kinds
wrap: 6

Figures drawn with compass and straightedge alone.

### Copying a Segment or Angle {#copying-constructions}
kind: skill
prereqs: postulate-circles, angles

To copy a segment, set the compass to its length and mark it off. To copy an angle, draw an arc across its sides, draw the same arc at the new vertex, and step off the width between the crossings.

### Bisecting a Segment {#bisecting-segment}
kind: skill
prereqs: perpendicular-bisector-theorem

1. set the compass to more than half the segment;
2. draw an arc above and below it, from one end;
3. do the same from the other end, at the same radius;
4. draw the line through the two crossings.

The line is the perpendicular bisector.

### Bisecting an Angle {#bisecting-angle}
kind: skill
prereqs: angle-bisector-equidistance

1. draw an arc from the vertex, crossing both sides;
2. from each crossing, draw an arc at the same radius, so that they meet;
3. draw the ray from the vertex through where they meet.

### Perpendicular Through a Point {#perpendicular-construction}
kind: skill
prereqs: bisecting-segment

1. draw an arc from the point, crossing the line twice;
2. from each crossing, draw an arc at the same radius, so that they meet;
3. draw the line through the point and where they meet.

### Parallel Through a Point {#parallel-construction}
kind: skill
prereqs: copying-constructions, parallel-lines

1. draw a transversal through the point;
2. draw an arc from where it crosses the line, and the same arc from the point;
3. step off the width of the angle at the crossing, along the arc at the point;
4. draw the line through the point and the mark.

This copies the angle as a corresponding angle.

### Equilateral Triangle & Regular Hexagon {#polygon-constructions}
kind: skill
prereqs: postulate-circles

Keep one compass setting. For an equilateral triangle, draw arcs from both ends of a segment; where they meet is the third vertex. For a regular hexagon, step the radius around a circle six times.

### Square in a Circle {#square-construction}
kind: skill
prereqs: perpendicular-construction

Draw a diameter, and then the diameter perpendicular to it. Their ends are the vertices of a square.

### Inscribed & Circumscribed Circles {#triangle-circle-constructions}
kind: skill
prereqs: bisecting-angle, bisecting-segment, incentre-theorem, circumcentre-theorem

For the circumscribed circle, bisect two sides perpendicularly: the lines meet at the centre, and the radius reaches a vertex. For the inscribed circle, bisect two angles: they meet at the centre, and the radius is the perpendicular to a side.

### Tangent from a Point {#tangent-construction}
kind: skill
prereqs: bisecting-segment, thales-theorem, circle-tangents

1. join the point to the centre;
2. bisect that segment;
3. draw the circle on it as diameter;
4. join the point to where the two circles meet.

The lines are tangents by [[thales-theorem|Thales' theorem]].
