# Trigonometry
color: #1f6f78

The measurement of triangles, grown into the study of everything that turns and repeats.

## Right-Triangle Trigonometry {#right-triangle-trig}

Angles and sides of right triangles, tied together by three ratios.

### Sine, Cosine & Tangent {#trig-ratios}
kind: definition
prereqs: triangle-similarity, ratio, pythagorean-theorem

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

### Exact Values for 30°, 45° and 60° {#special-angle-values}
prereqs: trig-ratios, special-right-triangles

Read straight off the special right triangles, for example:
$$\begin{aligned} \sin 30^\circ &= \frac{1}{2}, \\ \cos 45^\circ &= \frac{\sqrt{2}}{2}, \\ \tan 60^\circ &= \sqrt{3}, \end{aligned}$$
and so on.

### Secant, Cosecant & Cotangent {#reciprocal-trig}
kind: definition
prereqs: trig-ratios, reciprocals

The reciprocals of the three main ratios:
$$\begin{aligned} \sec\theta &= \frac{1}{\cos\theta}, \\ \csc\theta &= \frac{1}{\sin\theta}, \\ \cot\theta &= \frac{1}{\tan\theta}. \end{aligned}$$

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

Measuring an angle by the arc it cuts off, in radiuses. A full turn is $2\pi$ radians, so
$$180^\circ = \pi.$$
Radians make arc length simply
$$s = r\theta,$$
and calculus works only in them.

### The Unit Circle
kind: definition
prereqs: radians, trig-ratios, special-angle-values

For any real $\theta$, let $(x, y)$ be the point of the unit circle $x^2 + y^2 = 1$ at angle $\theta$ from the positive $x$-axis. Then
$$\begin{aligned} \cos\theta &:= x, \\ \sin\theta &:= y, \\ \tan\theta &:= \frac{y}{x} \quad (x \ne 0). \end{aligned}$$

### Trig Functions of Any Angle {#trig-functions-any-angle}
prereqs: unit-circle, standard-position

Using reference angles and the signs of the coordinates in each quadrant:
$$\begin{aligned} \sin 150^\circ &= \sin 30^\circ = \frac{1}{2}, \\ \cos 150^\circ &= -\cos 30^\circ = -\frac{\sqrt{3}}{2}. \end{aligned}$$

## Trigonometric Functions {#trig-functions}

Sine and cosine as functions: the waves at the heart of anything periodic.

### Periodic Functions
kind: definition
prereqs: function-graphs

Functions that repeat: for a fixed period $P$,
$$f(x + P) = f(x).$$
Tides, seasons, heartbeats and sound waves.

### Graphs of Sine & Cosine {#sine-cosine-graphs}
prereqs: trig-functions-any-angle, periodic-functions

Unrolling the unit circle: the height of the point traces a wave between $-1$ and $1$ with period $2\pi$. The cosine wave is the sine wave shifted left by $\frac{\pi}{2}$.

### Amplitude, Period & Phase Shift {#sinusoids}
prereqs: sine-cosine-graphs, graph-transformations

In
$$y = A\sin(B(x - C)) + D,$$
- the amplitude $|A|$ is the height of the wave;
- the period is $\frac{2\pi}{B}$;
- $C$ shifts it sideways;
- $D$ shifts it up.

### The Graph of Tangent {#tangent-graph}
prereqs: sine-cosine-graphs, asymptotes

The function
$$\tan x = \frac{\sin x}{\cos x}$$
repeats every $\pi$ and has vertical asymptotes wherever $\cos x = 0$.

### Inverse Trig Functions {#inverse-trig-functions}
prereqs: inverse-functions, sine-cosine-graphs, inverse-trig-ratios

$\arcsin$, $\arccos$ and $\arctan$ undo sine, cosine and tangent on carefully restricted domains, so that each answer is a single angle.

## Identities & Equations {#trig-identities}

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

## Oblique Triangles

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

### Area with Sine {#triangle-area-sine}
kind: formula
prereqs: area-basic, trig-ratios

From two sides and the angle between them:
$$\text{Area} = \frac{1}{2}ab\sin C,$$
since $b \sin C$ is the height.

## Polar & Parametric {#polar-and-parametric}

Other ways to describe points and curves than $y$ as a function of $x$: by a distance and an angle, or by a parameter such as time.

### Polar Coordinates
kind: definition
prereqs: unit-circle

Locating a point by its distance $r$ from the origin and its angle $\theta$, instead of by $x$ and $y$.

### Converting Polar & Rectangular {#polar-conversion}
kind: skill
prereqs: polar-coordinates, trig-functions-any-angle, pythagorean-theorem

From polar to rectangular:
$$\begin{aligned} x &= r\cos\theta, \\ y &= r\sin\theta; \end{aligned}$$
and back again:
$$\begin{aligned} r &= \sqrt{x^2 + y^2}, \\ \tan\theta &= \frac{y}{x}. \end{aligned}$$

### Polar Graphs
prereqs: polar-conversion, sine-cosine-graphs

Curves given as $r = f(\theta)$, such as circles, cardioids and roses like
$$r = \cos 3\theta,$$
which are awkward or impossible as $y = f(x)$.

### Parametric Equations
kind: definition
prereqs: function-graphs, sine-cosine-graphs

Both coordinates as functions of a third variable, often time. The pair
$$\begin{aligned} x &= \cos t, \\ y &= \sin t \end{aligned}$$
traces the unit circle. A curve with a direction and a speed.

### Complex Numbers in Polar Form {#polar-complex}
prereqs: polar-coordinates, complex-arithmetic

A complex number with length $r$ and angle $\theta$:
$$a + bi = r(\cos\theta + i\sin\theta).$$
In this form multiplying is easy: multiply the lengths and add the angles.

### De Moivre's Theorem {#de-moivre}
kind: theorem
prereqs: polar-complex, sum-difference-formulas

For all real $\theta$ and integers $n$:
$$(\cos\theta + i\sin\theta)^n = \cos n\theta + i \sin n\theta$$
