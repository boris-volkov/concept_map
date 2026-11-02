# Trigonometry
color: #1f6f78

The measurement of triangles, grown into the study of everything that turns and repeats.

## Right-Triangle Trigonometry {#right-triangle-trig}

Angles and sides of right triangles, tied together by three ratios.

### Sine, Cosine & Tangent {#trig-ratios}
kind: definition
prereqs: triangle-similarity, ratio, pythagorean-theorem

In a right triangle, pick one of the acute angles, $\theta$. The sides are named from its point of view: the **hypotenuse** opposite the right angle, the side **opposite** $\theta$, and the side **adjacent** to it.

$$\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \qquad \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \qquad \tan\theta = \frac{\text{opposite}}{\text{adjacent}}$$

Remembered as **SOH CAH TOA**. The ratios depend only on the angle, not on the size of the triangle: all right triangles with the same $\theta$ are [[triangle-similarity|similar]], so their sides come in the same proportions.

```quiz
Q: In a right triangle, the side opposite $\theta$ is 3, the side adjacent to it is 4 and the hypotenuse is 5. What is $\sin\theta$?
A: 3/5
Why: Opposite over hypotenuse: $\frac{3}{5}$.

Q: In the same triangle, what is $\tan\theta$?
- $\frac{3}{5}$
- $\frac{4}{5}$
+ $\frac{3}{4}$
- $\frac{4}{3}$
Why: Opposite over adjacent: $\frac{3}{4}$.

Q: Which ratio uses the adjacent side and the hypotenuse?
- sine
+ cosine
- tangent
Why: CAH: cosine is adjacent over hypotenuse.
```

### Solving Right Triangles
kind: skill
prereqs: trig-ratios, literal-equations

Finding missing sides from one side and one angle: if the hypotenuse is 10 and $\theta = 30^\circ$, the opposite side is $10\sin 30^\circ = 5$.

### Finding Angles {#inverse-trig-ratios}
kind: skill
prereqs: trig-ratios

Running a ratio backwards: if $\tan\theta = \frac{3}{4}$ then $\theta = \tan^{-1}\frac{3}{4} \approx 36.9^\circ$.

### Exact Values for 30°, 45° and 60° {#special-angle-values}
prereqs: trig-ratios, special-right-triangles

Read straight off the special right triangles: $\sin 30^\circ = \frac{1}{2}$, $\cos 45^\circ = \frac{\sqrt{2}}{2}$, $\tan 60^\circ = \sqrt{3}$, and so on.

### Secant, Cosecant & Cotangent {#reciprocal-trig}
kind: definition
prereqs: trig-ratios, reciprocals

The reciprocals of the three main ratios: $\sec\theta = \frac{1}{\cos\theta}$, $\csc\theta = \frac{1}{\sin\theta}$ and $\cot\theta = \frac{1}{\tan\theta}$.

### Angles of Elevation & Depression {#elevation-depression}
prereqs: solving-right-triangles

Angles measured up or down from the horizontal: how tall a building is from the angle to its top and your distance from it.

## Angles & the Unit Circle {#unit-circle-topic}

Freeing sine and cosine from triangles, so that they work for every angle.

### Angles in Standard Position {#standard-position}
kind: definition
prereqs: angles, coordinate-plane, rotations

An angle drawn from the positive $x$-axis, turning counterclockwise for positive angles. Angles can exceed $360^\circ$ or be negative; angles that end in the same place are coterminal.

### Radians
kind: definition
prereqs: arc-length-sector, standard-position

Measuring an angle by the arc it cuts off, in radiuses: a full turn is $2\pi$ radians, so $180^\circ = \pi$. Radians make arc length simply $s = r\theta$, and calculus works only in them.

### The Unit Circle
kind: definition
prereqs: radians, trig-ratios, special-angle-values

The circle of radius 1 about the origin. The point at angle $\theta$ is $(\cos\theta, \sin\theta)$: that is now the *definition* of cosine and sine, for every angle.

### Trig Functions of Any Angle {#trig-functions-any-angle}
prereqs: unit-circle, standard-position

Using reference angles and the signs of the coordinates in each quadrant: $\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$, while $\cos 150^\circ = -\frac{\sqrt{3}}{2}$.

## Trigonometric Functions {#trig-functions}

Sine and cosine as functions: the waves at the heart of anything periodic.

### Periodic Functions
kind: definition
prereqs: function-graphs

Functions that repeat: $f(x + P) = f(x)$ for a fixed period $P$. Tides, seasons, heartbeats and sound waves.

### Graphs of Sine & Cosine {#sine-cosine-graphs}
prereqs: trig-functions-any-angle, periodic-functions

Unrolling the unit circle: the height of the point traces a wave between $-1$ and $1$ with period $2\pi$. The cosine wave is the sine wave shifted left by $\frac{\pi}{2}$.

### Amplitude, Period & Phase Shift {#sinusoids}
prereqs: sine-cosine-graphs, graph-transformations

$y = A\sin(B(x - C)) + D$: the amplitude $|A|$ is the height of the wave, the period is $\frac{2\pi}{B}$, $C$ shifts it sideways and $D$ shifts it up.

### The Graph of Tangent {#tangent-graph}
prereqs: sine-cosine-graphs, asymptotes

$\tan x = \frac{\sin x}{\cos x}$ repeats every $\pi$ and has vertical asymptotes wherever $\cos x = 0$.

### Inverse Trig Functions {#inverse-trig-functions}
prereqs: inverse-functions, sine-cosine-graphs, inverse-trig-ratios

$\arcsin$, $\arccos$ and $\arctan$ undo sine, cosine and tangent on carefully restricted domains, so that each answer is a single angle.

## Identities & Equations {#trig-identities}

Equations true for every angle, and how to solve those that aren't.

### Pythagorean Identity
kind: theorem
prereqs: unit-circle, pythagorean-theorem

$\sin^2\theta + \cos^2\theta = 1$ for every angle: the point $(\cos\theta, \sin\theta)$ is on the unit circle, $x^2 + y^2 = 1$.

### The Fundamental Identities {#fundamental-identities}
kind: theorem
prereqs: pythagorean-identity, reciprocal-trig, even-odd-functions

The quotient, reciprocal and Pythagorean identities, plus symmetry: $\cos(-\theta) = \cos\theta$ and $\sin(-\theta) = -\sin\theta$. Used to rewrite one expression as another.

### Sum & Difference Formulas {#sum-difference-formulas}
kind: formula
prereqs: fundamental-identities

$\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$ and $\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$. They give exact values like $\sin 75^\circ$ and the derivatives of sine and cosine.

### Double- & Half-Angle Formulas {#double-angle-formulas}
kind: formula
prereqs: sum-difference-formulas

Setting $a = b$: $\sin 2\theta = 2\sin\theta\cos\theta$ and $\cos 2\theta = \cos^2\theta - \sin^2\theta$. Solving these for $\theta$ gives the half-angle formulas.

### Solving Trig Equations
kind: skill
prereqs: inverse-trig-functions, fundamental-identities, quadratics-by-factoring

Isolate the trig function, find the reference solutions, then add whole periods: $2\sin x = 1$ gives $x = \frac{\pi}{6} + 2\pi k$ or $x = \frac{5\pi}{6} + 2\pi k$.

## Oblique Triangles

Triangles without a right angle.

### Law of Sines
kind: theorem
prereqs: trig-functions-any-angle, solving-right-triangles

$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$: each side is proportional to the sine of the angle opposite it.

### Law of Cosines
kind: theorem
prereqs: trig-functions-any-angle, pythagorean-theorem

$c^2 = a^2 + b^2 - 2ab\cos C$: the Pythagorean theorem with a correction for angles that aren't right.

### Area with Sine {#triangle-area-sine}
kind: formula
prereqs: area-basic, trig-ratios

$\text{Area} = \frac{1}{2}ab\sin C$: two sides and the angle between them, since $b \sin C$ is the height.
