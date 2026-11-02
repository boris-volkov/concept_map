# Precalculus
color: #6b6b2a

The analytic toolkit that ties algebra, geometry and trigonometry together on the way to calculus.

## Rates of Change

How fast a function changes over an interval: the question calculus answers at a single point.

### Average Rate of Change
kind: definition
prereqs: slope, function-notation

How much the output changes per unit of input between two points, $\frac{f(b) - f(a)}{b - a}$: the slope of the secant line joining them.

### The Difference Quotient {#difference-quotient}
kind: formula
prereqs: average-rate-of-change, polynomial-multiplication

The average rate of change from $x$ to $x + h$, simplified as far as it will go:

$$\frac{f(x + h) - f(x)}{h}$$

For $f(x) = x^2$ it is $2x + h$. Let $h$ shrink to 0 and it becomes the derivative.

## Conic Sections

The curves you get by slicing a double cone with a plane.

### Conic Sections {#conics}
kind: definition
prereqs: circle-equation

Circles, ellipses, parabolas and hyperbolas: every second-degree equation in $x$ and $y$ draws one of these.

### Parabolas
prereqs: conics, distance-formula, vertex-form

The points equally far from a fixed point, the focus, and a fixed line, the directrix. Satellite dishes and headlights are parabolas because of their focus.

### Ellipses
prereqs: conics, completing-the-square

The points whose distances to two foci add up to a constant: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$. Planets orbit in ellipses with the sun at one focus.

### Hyperbolas
prereqs: ellipses, asymptotes

The points whose distances to two foci differ by a constant: two branches, $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, closing in on a pair of asymptotes.

## Vectors

Quantities with a size and a direction.

### Vectors {#vector-basics}
kind: definition
prereqs: coordinate-plane, translations

An arrow with a length and a direction, like a displacement or a force, written in components as $\langle 3, 4 \rangle$. Where it starts doesn't matter.

### Adding & Scaling Vectors {#vector-operations}
kind: skill
prereqs: vector-basics

Add vectors tip to tail, or component by component: $\langle 1, 2 \rangle + \langle 3, -1 \rangle = \langle 4, 1 \rangle$. Multiplying by a number stretches the arrow.

### Magnitude & Direction {#vector-magnitude-direction}
prereqs: vector-basics, distance-formula, inverse-trig-ratios

The length of $\langle a, b \rangle$ is $\sqrt{a^2 + b^2}$, and its direction angle has $\tan\theta = \frac{b}{a}$. $\langle 3, 4 \rangle$ has length 5.

### The Dot Product {#dot-product}
kind: definition
prereqs: vector-operations, law-of-cosines

$\langle a, b \rangle \cdot \langle c, d \rangle = ac + bd$, a single number that also equals $|u||v|\cos\theta$. It is 0 exactly when the vectors are perpendicular.

## Polar & Parametric {#polar-and-parametric}

Other ways to describe curves than $y$ as a function of $x$.

### Polar Coordinates
kind: definition
prereqs: unit-circle

Locating a point by its distance $r$ from the origin and its angle $\theta$, instead of by $x$ and $y$.

### Converting Polar & Rectangular {#polar-conversion}
kind: skill
prereqs: polar-coordinates, trig-functions-any-angle, pythagorean-theorem

$x = r\cos\theta$ and $y = r\sin\theta$; going the other way, $r = \sqrt{x^2 + y^2}$ and $\tan\theta = \frac{y}{x}$.

### Polar Graphs
prereqs: polar-conversion, sine-cosine-graphs

Curves given as $r = f(\theta)$: circles, cardioids and roses like $r = \cos 3\theta$, which are awkward or impossible as $y = f(x)$.

### Parametric Equations
kind: definition
prereqs: function-graphs, sine-cosine-graphs

Both coordinates as functions of a third variable, often time: $x = \cos t$, $y = \sin t$ traces the unit circle. A curve with a direction and a speed.

### Complex Numbers in Polar Form {#polar-complex}
prereqs: polar-coordinates, complex-arithmetic

$a + bi = r(\cos\theta + i\sin\theta)$. In this form multiplying is easy: multiply the lengths and add the angles.

### De Moivre's Theorem {#de-moivre}
kind: theorem
prereqs: polar-complex, sum-difference-formulas

$(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$: powers and roots of complex numbers, by turning.

## Matrices

Rectangular arrays of numbers, and the arithmetic of whole systems at once.

### Matrices {#matrix-basics}
kind: definition
prereqs: linear-systems

A rectangular array of numbers. A system of linear equations can be stored as the matrix of its coefficients.

### Matrix Arithmetic {#matrix-operations}
kind: skill
prereqs: matrix-basics

Add matrices entry by entry. Multiply them row by column, which is not commutative: $AB$ and $BA$ usually differ.

### Determinants
kind: definition
prereqs: matrix-operations

A single number computed from a square matrix: for a $2 \times 2$ matrix, $\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$. It is 0 exactly when the matrix has no inverse.

### Inverse Matrices & Systems {#matrix-inverses}
prereqs: determinants, elimination-method

$A^{-1}$ undoes $A$, so the system $A\mathbf{x} = \mathbf{b}$ has the solution $\mathbf{x} = A^{-1}\mathbf{b}$.
