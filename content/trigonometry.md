# Trigonometry
color: #1f6f78

The measurement of triangles, grown into the study of everything that turns and repeats.

## Right-Triangle Trigonometry {#right-triangle-trig}
flow: down
rows: kinds
wrap: 6

Angles and sides of right triangles, tied together by three ratios.

### Cofunction Theorem
kind: theorem
prereqs: trig-ratios

For acute angles $A$ and $B$ with $A + B = 90^\circ$:
$$\sin A = \cos B, \quad \tan A = \cot B, \quad \sec A = \csc B.$$

*Proof.* The two acute angles of a right triangle add to $90^\circ$, and the side opposite one is adjacent to the other. $\square$

### Ratios Depend Only on the Angle {#trig-ratio-similarity}
kind: theorem
prereqs: trig-ratios, triangle-similarity

In right triangles with one equal acute angle, the ratios of corresponding sides are equal, so $\sin A$, $\cos A$ and $\tan A$ depend only on $A$.

*Proof.* Two right triangles sharing an acute angle are similar, by AA. $\square$

### Sine, Cosine & Tangent {#trig-ratios}
kind: definition
prereqs: triangle-similarity, ratio

For an acute angle $\theta$ of a right triangle, with hypotenuse $h$, side $o$ opposite $\theta$ and side $a$ adjacent to it:
$$\begin{aligned} \sin\theta &= \frac{o}{h}, \\ \cos\theta &= \frac{a}{h}, \\ \tan\theta &= \frac{o}{a}. \end{aligned}$$

Mnemonic: SOH CAH TOA. The ratios depend only on $\theta$, since all right triangles with angle $\theta$ are [[triangle-similarity|similar]].

```quiz
Q: In a right triangle, the side opposite $\theta$ is 3, the adjacent side 4 and the hypotenuse 5. What is $\sin\theta$?
A: 3/5
Why: $\sin\theta = \frac{o}{h} = \frac{3}{5}$.

Q: In the same triangle, $\tan\theta =$
- $\frac{3}{5}$
- $\frac{4}{5}$
+ $\frac{3}{4}$
- $\frac{4}{3}$
Why: $\tan\theta = \frac{o}{a} = \frac{3}{4}$.

Q: Which ratio is adjacent over hypotenuse?
- sine
+ cosine
- tangent
Why: CAH.
```

### Secant, Cosecant & Cotangent {#reciprocal-trig}
kind: definition
prereqs: trig-ratios, reciprocals

The reciprocals of the three main ratios:
$$\begin{aligned} \sec\theta &= \frac{1}{\cos\theta}, \\ \csc\theta &= \frac{1}{\sin\theta}, \\ \cot\theta &= \frac{1}{\tan\theta}. \end{aligned}$$

### Angles of Elevation & Depression {#elevation-depression}
kind: definition
prereqs: angles

Angles measured up or down from the horizontal: how tall a building is from the angle to its top and your distance from it.

### Table of Exact Values {#special-angle-values}
kind: formula
prereqs: trig-ratios, special-right-triangles

| $\theta$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
| --- | --- | --- | --- | --- | --- |
| $\sin\theta$ | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ |
| $\tan\theta$ | $0$ | $\frac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | undefined |

### Solving Right Triangles
kind: skill
prereqs: trig-ratios, literal-equations

Finding missing sides from one side and one angle. If the hypotenuse is 10 and $\theta = 30^\circ$, the opposite side is
$$o = 10\sin 30^\circ = 5.$$

### Finding Angles {#inverse-trig-ratios}
kind: skill
prereqs: trig-ratios

Running a ratio backwards: if $\tan\theta = \frac{3}{4}$ then
$$\theta = \tan^{-1}\frac{3}{4} \approx 36.9^\circ.$$

### Solving Elevation & Depression Problems {#elevation-problems}
kind: skill
prereqs: solving-right-triangles

Draw the right triangle, with the angle measured from the horizontal. Choose the ratio that links the known side and the wanted side, and solve.

**Example.** From 50 m away, the top of a tower is at $40^\circ$ elevation, so its height is $50\tan 40^\circ \approx 42$ m.

## Angles & the Unit Circle {#unit-circle-topic}
flow: down
rows: kinds
wrap: 6

Freeing sine and cosine from triangles, so that they work for every angle.

### Angles in Standard Position {#standard-position}
kind: definition
prereqs: angles, coordinate-plane, rotations

An angle drawn from the positive $x$-axis, turning counterclockwise for positive angles. Angles can exceed $360^\circ$ or be negative; angles that end in the same place are coterminal.

### Radians
kind: definition
prereqs: arc-length-sector, standard-position

Measuring an angle by the arc it cuts off, in radiuses. A full turn is $2\pi$ radians, so
$$180^\circ = \pi.$$
Radians make arc length simply
$$s = r\theta,$$
and calculus works only in them.

### The Unit Circle
kind: definition
prereqs: standard-position, trig-ratios

For any real $\theta$, let $(x, y)$ be the point of the unit circle $x^2 + y^2 = 1$ at angle $\theta$ from the positive $x$-axis. Then
$$\begin{aligned} \cos\theta &:= x, \\ \sin\theta &:= y, \\ \tan\theta &:= \frac{y}{x} \quad (x \ne 0). \end{aligned}$$

The point at angle $\theta$, with the four points where the circle crosses the axes:
```graph
x: -1.5, 1.5
y: -1.35, 1.35
grid: 0.5, 0.5
circle: 0, 0, 1
segment: 0, 0, cos(0.9), 0
segment: cos(0.9), 0, cos(0.9), sin(0.9) | dashed
segment: 0, 0, cos(0.9), sin(0.9)
arc: 0, 0, 0.25, 0, 0.9
point: cos(0.9), sin(0.9) "(cos θ, sin θ)" above-right
point: 1, 0 "(1, 0)" below-right
point: 0, 1 "(0, 1)" above-right
point: -1, 0 "(−1, 0)" below-left
point: 0, -1 "(0, −1)" below-right
label: 0.33cos(0.45), 0.33sin(0.45) "θ" right
label: cos(0.9)/2, 0 "cos θ" below
label: cos(0.9), sin(0.9)/2 "sin θ" right
```

### Trig Functions of Any Angle {#trig-functions-any-angle}
kind: definition
prereqs: unit-circle, standard-position

Using reference angles and the signs of the coordinates in each quadrant:
$$\begin{aligned} \sin 150^\circ &= \sin 30^\circ = \frac{1}{2}, \\ \cos 150^\circ &= -\cos 30^\circ = -\frac{\sqrt{3}}{2}. \end{aligned}$$

### Signs of the Trig Functions {#trig-signs}
kind: property
prereqs: unit-circle

| Quadrant | $\sin$ | $\cos$ | $\tan$ |
| --- | --- | --- | --- |
| I | $+$ | $+$ | $+$ |
| II | $+$ | $-$ | $-$ |
| III | $-$ | $-$ | $+$ |
| IV | $-$ | $+$ | $-$ |

### Coterminal Angles {#coterminal-angles}
kind: property
prereqs: standard-position

Angles that differ by a whole number of turns, $360^\circ$ or $2\pi$, end on the same ray, and have the same trig values.

### Arc Length in Radians {#radian-arc-length}
kind: formula
prereqs: radians

On a circle of radius $r$, an angle of $\theta$ radians cuts off an arc of length
$$s = r\theta.$$

### Converting Degrees and Radians {#converting-angles}
kind: skill
prereqs: radians

Multiply by a fraction equal to 1:
$$120^\circ \cdot \frac{\pi}{180^\circ} = \frac{2\pi}{3}, \qquad \frac{5\pi}{6} \cdot \frac{180^\circ}{\pi} = 150^\circ.$$

```quiz
Q: How many degrees is $\frac{\pi}{9}$ radians?
A: 20
Why: $\frac{180}{9} = 20$.
```

### Reference Angles {#reference-angles}
kind: skill
prereqs: trig-signs, special-angle-values

To find a trig value at any angle, find the acute angle to the $x$-axis, take the value there, and attach the sign of the quadrant:
$$\sin 210^\circ = -\sin 30^\circ = -\frac{1}{2}.$$

```quiz
Q: What is $\cos 120^\circ$?
A: -1/2
Why: The reference angle is $60^\circ$, and cosine is negative in quadrant II.
```

## Trigonometric Functions {#trig-functions}
flow: down
rows: kinds
wrap: 6

Sine and cosine as functions: the waves at the heart of anything periodic.

### Periodic Functions
kind: definition
prereqs: function-graphs

Functions that repeat: for a fixed period $P$,
$$f(x + P) = f(x).$$
Tides, seasons, heartbeats and sound waves.

### Inverse Trig Functions {#inverse-trig-functions}
kind: definition
prereqs: inverse-functions, sine-cosine-graphs, inverse-trig-ratios

$\arcsin$, $\arccos$ and $\arctan$ undo sine, cosine and tangent on carefully restricted domains, so that each answer is a single angle.

Each graph is part of the graph of sine, cosine or tangent, reflected in the line $y = x$.

$y = \arcsin x$, for $-1 \le x \le 1$:
```graph
y = arcsin(x)
x: -1.8, 1.8
y: -2, 2
grid: 1, pi/2
point: -1, -pi/2 right
point: 0, 0 below-right
point: 1, pi/2 left
```

$y = \arccos x$, for $-1 \le x \le 1$:
```graph
y = arccos(x)
x: -1.8, 1.8
y: -0.6, 3.6
grid: 1, pi/2
point: -1, pi right
point: 0, pi/2 above-right
point: 1, 0 left
```

$y = \arctan x$, for every $x$, between the asymptotes $y = \pm\frac{\pi}{2}$:
```graph
y = arctan(x)
x: -4, 4
y: -2, 2
grid: 1, pi/2
asymptote: y = -pi/2
asymptote: y = pi/2
point: -1, -pi/4 above-left
point: 0, 0 below-right
point: 1, pi/4 below-right
```

### Graphs of Sine & Cosine {#sine-cosine-graphs}
kind: property
prereqs: trig-functions-any-angle, periodic-functions, radians

Unrolling the unit circle: the height of the point traces a wave between $-1$ and $1$ with period $2\pi$. The cosine wave is the sine wave shifted left by $\frac{\pi}{2}$.

The parent sine function, $y = \sin x$:
```graph
y = sin(x)
x: -0.6, 6.9
y: -1.6, 1.6
grid: pi/2, 1
point: 0, 0 below-right
point: pi/2, 1 above
point: 3pi/2, -1 below
```

The parent cosine function, $y = \cos x$:
```graph
y = cos(x)
x: -0.6, 6.9
y: -1.7, 1.9
grid: pi/2, 1
point: 0, 1 above-right
point: pi/2, 0 below-left
point: pi, -1 below
```

### Amplitude, Period & Phase Shift {#sinusoids}
kind: property
prereqs: sine-cosine-graphs, graph-transformations

In
$$y = A\sin(B(x - C)) + D,$$
- the amplitude $|A|$ is the height of the wave;
- the period is $\frac{2\pi}{B}$;
- $C$ shifts it sideways;
- $D$ shifts it up.

### The Graph of Tangent {#tangent-graph}
kind: property
prereqs: sine-cosine-graphs, asymptotes

The function
$$\tan x = \frac{\sin x}{\cos x}$$
repeats every $\pi$ and has vertical asymptotes wherever $\cos x = 0$.

The parent tangent function, $y = \tan x$, between the asymptotes $x = \pm\frac{\pi}{2}$:
```graph
y = tan(x)
x: -pi, pi
y: -3, 3
grid: pi/2, 1
asymptote: x = -pi/2
asymptote: x = pi/2
point: -pi/4, -1 below-right
point: 0, 0 below-right
point: pi/4, 1 below-right
```

### Properties of Sine, Cosine and Tangent {#trig-function-properties}
kind: property
prereqs: sine-cosine-graphs, tangent-graph

| | $\sin x$ | $\cos x$ | $\tan x$ |
| --- | --- | --- | --- |
| domain | $\mathbb{R}$ | $\mathbb{R}$ | $x \ne \frac{\pi}{2} + k\pi$ |
| range | $[-1, 1]$ | $[-1, 1]$ | $\mathbb{R}$ |
| period | $2\pi$ | $2\pi$ | $\pi$ |
| symmetry | odd | even | odd |
| zeros | $k\pi$ | $\frac{\pi}{2} + k\pi$ | $k\pi$ |

### Sinusoid Form {#sinusoid-form}
kind: form
prereqs: sinusoids

$$y = A\sin\big(B(x - C)\big) + D.$$

| Reads off | From |
| --- | --- |
| amplitude | $\lvert A \rvert$ |
| period | $\frac{2\pi}{\lvert B \rvert}$ |
| phase shift | $C$ |
| midline | $y = D$ |
| maximum and minimum | $D + \lvert A \rvert$ and $D - \lvert A \rvert$ |

### Graphing a Sinusoid {#graphing-sinusoids}
kind: skill
prereqs: sinusoid-form

Draw the midline, mark one period starting at $x = C$, split it in four, and plot the pattern midline, maximum, midline, minimum, midline. For $A < 0$ the maximum and minimum swap. For cosine, the pattern starts at the maximum.

```quiz
Q: What is the period of $y = 3\sin(4x)$, as a multiple of $\pi$?
- $4\pi$
+ $\frac{\pi}{2}$
- $\frac{\pi}{4}$
- $3\pi$
Why: $\frac{2\pi}{4} = \frac{\pi}{2}$.
```

### Modelling with Sinusoids {#modeling-sinusoids}
kind: skill
prereqs: sinusoid-form

From the greatest and least values, find
$$A = \frac{\max - \min}{2}, \quad D = \frac{\max + \min}{2},$$
take $B = \frac{2\pi}{\text{period}}$, and set $C$ from where the cycle starts. Tides, daylight and Ferris wheels are all fitted this way.

## Identities & Equations {#trig-identities}
flow: down
rows: kinds
wrap: 6

Equations true for every angle, and how to solve those that aren't.

### Pythagorean Identity
kind: theorem
prereqs: unit-circle, pythagorean-theorem

For all real $\theta$:
$$\begin{aligned} \sin^2\theta + \cos^2\theta &= 1, \\ 1 + \tan^2\theta &= \sec^2\theta, \\ 1 + \cot^2\theta &= \csc^2\theta. \end{aligned}$$

*Proof.* The point $(\cos\theta, \sin\theta)$ lies on the circle $x^2 + y^2 = 1$, which gives the first. Dividing it by $\cos^2\theta$ or by $\sin^2\theta$ gives the other two. $\square$

### The Fundamental Identities {#fundamental-identities}
kind: theorem
prereqs: pythagorean-identity, reciprocal-trig, even-odd-functions

For all $\theta$ where defined:
$$\begin{aligned} \tan\theta &= \frac{\sin\theta}{\cos\theta} \\ \cot\theta &= \frac{\cos\theta}{\sin\theta} \\ \sin(-\theta) &= -\sin\theta \\ \cos(-\theta) &= \cos\theta \\ \sin\left(\tfrac{\pi}{2} - \theta\right) &= \cos\theta \\ \cos\left(\tfrac{\pi}{2} - \theta\right) &= \sin\theta \end{aligned}$$

### Even, Odd & Cofunction Identities {#even-odd-identities}
kind: theorem
prereqs: unit-circle

For every $x$:
$$\begin{aligned} \sin(-x) &= -\sin x \\ \cos(-x) &= \cos x \\ \sin\left(\frac{\pi}{2} - x\right) &= \cos x \\ \cos\left(\frac{\pi}{2} - x\right) &= \sin x \end{aligned}$$

### Sum & Difference Formulas {#sum-difference-formulas}
kind: formula
prereqs: fundamental-identities

For all real $a, b$:
$$\begin{aligned} \sin(a \pm b) &= \sin a \cos b \pm \cos a \sin b \\ \cos(a \pm b) &= \cos a \cos b \mp \sin a \sin b \\ \tan(a \pm b) &= \frac{\tan a \pm \tan b}{1 \mp \tan a \tan b} \end{aligned}$$

### Double- & Half-Angle Formulas {#double-angle-formulas}
kind: formula
prereqs: sum-difference-formulas

For all real $\theta$:
$$\begin{aligned} \sin 2\theta &= 2\sin\theta\cos\theta \\ \cos 2\theta &= \cos^2\theta - \sin^2\theta \\ &= 2\cos^2\theta - 1 \\ &= 1 - 2\sin^2\theta \\ \tan 2\theta &= \frac{2\tan\theta}{1 - \tan^2\theta} \\ \sin^2\theta &= \frac{1 - \cos 2\theta}{2} \\ \cos^2\theta &= \frac{1 + \cos 2\theta}{2} \end{aligned}$$

### Table of Identities {#trig-identity-table}
kind: formula
prereqs: double-angle-formulas

The identities worth knowing by heart:
$$\begin{aligned} \sin^2\theta + \cos^2\theta &= 1 \\ 1 + \tan^2\theta &= \sec^2\theta \\ \tan\theta &= \frac{\sin\theta}{\cos\theta} \\ \sec\theta &= \frac{1}{\cos\theta} \\ \csc\theta &= \frac{1}{\sin\theta} \\ \sin(-\theta) &= -\sin\theta \\ \cos(-\theta) &= \cos\theta \\ \sin\left(\tfrac{\pi}{2} - \theta\right) &= \cos\theta \\ \cos\left(\tfrac{\pi}{2} - \theta\right) &= \sin\theta \\ \sin(a \pm b) &= \sin a \cos b \pm \cos a \sin b \\ \cos(a \pm b) &= \cos a \cos b \mp \sin a \sin b \\ \sin 2\theta &= 2 \sin\theta \cos\theta \\ \cos 2\theta &= \cos^2\theta - \sin^2\theta \\ \sin^2\theta &= \tfrac{1}{2}(1 - \cos 2\theta) \\ \cos^2\theta &= \tfrac{1}{2}(1 + \cos 2\theta) \end{aligned}$$

| $\theta$ | $0$ | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ |
| --- | --- | --- | --- | --- | --- |
| $\sin\theta$ | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ |
| $\tan\theta$ | $0$ | $\frac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | undefined |

### Solving Trig Equations
kind: skill
prereqs: inverse-trig-functions, fundamental-identities, quadratics-by-factoring

Solving in three steps:
1. isolate the trig function;
2. find the solutions within one period;
3. add whole periods.

For example,
$$2\sin x = 1 \implies \sin x = \frac{1}{2},$$
so, for any integer $k$,
$$\begin{aligned} x &= \frac{\pi}{6} + 2\pi k \quad\text{or} \\ x &= \frac{5\pi}{6} + 2\pi k. \end{aligned}$$

### Proving Identities {#proving-identities}
kind: skill
prereqs: fundamental-identities

Work on one side until it becomes the other, using only known identities. Write everything in sines and cosines, combine fractions, and look for $\sin^2 x + \cos^2 x$. Do not move terms across the equals sign, since that assumes what is to be proved.
$$\tan x \cos x = \frac{\sin x}{\cos x}\cos x = \sin x.$$

## Oblique Triangles
flow: down
rows: kinds
wrap: 6

Triangles without a right angle.

### Law of Sines
kind: theorem
prereqs: trig-functions-any-angle, solving-right-triangles

In any triangle with sides $a, b, c$ opposite angles $A, B, C$:
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$

### Law of Cosines
kind: theorem
prereqs: trig-functions-any-angle, pythagorean-theorem

In any triangle with sides $a, b, c$ opposite angles $A, B, C$:
$$c^2 = a^2 + b^2 - 2ab\cos C$$

When $C = 90^\circ$ this is the Pythagorean theorem.

### The Ambiguous Case (SSA) {#ambiguous-case}
kind: property
prereqs: law-of-sines

Given sides $a$, $b$ and acute angle $A$, with $h = b\sin A$:

| Condition | Triangles |
| --- | --- |
| $a < h$ | none |
| $a = h$ | one, right-angled |
| $h < a < b$ | two |
| $a \ge b$ | one |

### Area with Sine {#triangle-area-sine}
kind: formula
prereqs: area-basic, trig-ratios

From two sides and the angle between them:
$$\text{Area} = \frac{1}{2}ab\sin C,$$
since $b \sin C$ is the height.

### Choosing a Law {#choosing-sine-or-cosine}
kind: skill
prereqs: law-of-sines, law-of-cosines

Use the given parts:

| Given | Use |
| --- | --- |
| AAS or ASA | [[law-of-sines]] |
| SSA | [[law-of-sines]], then [[ambiguous-case]] |
| SAS | [[law-of-cosines]] |
| SSS | [[law-of-cosines]] |

```quiz
Q: Triangle $ABC$ has $b = 5$, $c = 8$, $A = 60^\circ$. What is $a$?
A: 7
Why: $a^2 = 25 + 64 - 40 = 49$.
```

## Polar & Parametric {#polar-and-parametric}
flow: down
rows: kinds
wrap: 6

Other ways to describe points and curves than $y$ as a function of $x$: by a distance and an angle, or by a parameter such as time.

### De Moivre's Theorem {#de-moivre}
kind: theorem
prereqs: polar-complex, sum-difference-formulas

For all real $\theta$ and integers $n$:
$$(\cos\theta + i\sin\theta)^n = \cos n\theta + i \sin n\theta$$

### Polar Coordinates
kind: definition
prereqs: standard-position

Locating a point by its distance $r$ from the origin and its angle $\theta$, instead of by $x$ and $y$.

### Parametric Equations
kind: definition
prereqs: function-graphs, sine-cosine-graphs

Both coordinates as functions of a third variable, often time. The pair
$$\begin{aligned} x &= \cos t, \\ y &= \sin t \end{aligned}$$
traces the unit circle. A curve with a direction and a speed.

### Complex Numbers in Polar Form {#polar-complex}
kind: definition
prereqs: polar-coordinates, complex-arithmetic

A complex number with length $r$ and angle $\theta$:
$$a + bi = r(\cos\theta + i\sin\theta).$$
In this form multiplying is easy: multiply the lengths and add the angles.

### Polar Graphs
kind: property
prereqs: polar-conversion, sine-cosine-graphs

Curves given as $r = f(\theta)$, such as circles, cardioids and roses like
$$r = \cos 3\theta,$$
which are awkward or impossible as $y = f(x)$.

### Polar Form of a Complex Number {#polar-complex-form}
kind: form
prereqs: polar-complex

$$z = r(\cos\theta + i\sin\theta).$$

| Reads off | From |
| --- | --- |
| modulus | $r$ |
| argument | $\theta$ |
| rectangular form | $a = r\cos\theta$, $b = r\sin\theta$ |

### Converting Polar & Rectangular {#polar-conversion}
kind: skill
prereqs: polar-coordinates, trig-functions-any-angle, pythagorean-theorem

From polar to rectangular:
$$\begin{aligned} x &= r\cos\theta, \\ y &= r\sin\theta; \end{aligned}$$
and back again:
$$\begin{aligned} r &= \sqrt{x^2 + y^2}, \\ \tan\theta &= \frac{y}{x}. \end{aligned}$$

### Eliminating the Parameter {#eliminating-parameter}
kind: skill
prereqs: parametric-equations

Solve one equation for $t$ and substitute into the other:
$$x = t + 1,\ y = t^2 \implies y = (x - 1)^2.$$
