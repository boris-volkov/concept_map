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

1. draw the triangle, and label the angle and the sides;
2. choose the ratio that links the known side and the wanted one;
3. solve for the unknown;
4. find any remaining angle from the $90^\circ$ total of the acute angles.

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

1. find the acute angle to the $x$-axis;
2. take the trig value there;
3. attach the sign of the quadrant.

**Example.**
$$\sin 210^\circ = -\sin 30^\circ = -\frac{1}{2}.$$

```quiz
Q: What is $\cos 120^\circ$?
A: -1/2
Why: The reference angle is $60^\circ$, and cosine is negative in quadrant II.
```

## Angular Motion {#angular-motion}
flow: down
rows: kinds
wrap: 6

How fast things turn, how fast their rims move, and how one wheel drives another.

### Linear & Angular Speed {#linear-angular-speed}
kind: theorem
prereqs: angular-speed, radian-arc-length

A point at distance $r$ from the axis of a body turning at angular speed $\omega$, in radians per unit time, moves at linear speed
$$v = r\omega.$$

> **!** $\omega$ must be in radians. Convert revolutions or degrees first.

*Proof.* In time $t$ the body turns through the angle $\theta = \omega t$, so the point travels an arc of length
$$s = r\theta = r\omega t.$$
Its speed is $\frac{s}{t} = r\omega$. $\square$

### Angular Speed
kind: definition
prereqs: radians, unit-rates

A body that turns through the angle $\theta$ in time $t$ has angular speed
$$\omega = \frac{\theta}{t}.$$

It is measured in radians per second, degrees per second or revolutions per minute (rpm). Every point of a rigid body has the same angular speed. Its linear speed, the distance it travels per unit time, depends on how far it is from the axis.

### Frequency & Period of Rotation {#rotation-frequency}
kind: definition
prereqs: angular-speed

A body turning steadily has frequency $f$, the revolutions per unit time, and period $T$, the time for one revolution:
$$\begin{aligned} T &= \frac{1}{f}, \\ \omega &= 2\pi f = \frac{2\pi}{T}. \end{aligned}$$

**Example.** At 3 revolutions per second,
$$T = \frac{1}{3}\ \text{s}, \qquad \omega = 6\pi\ \frac{\text{rad}}{\text{s}}.$$

```quiz
Q: A wheel makes one revolution every 4 seconds. What is its angular speed?
- $\frac{\pi}{4}$ rad/s
+ $\frac{\pi}{2}$ rad/s
- $2\pi$ rad/s
- $8\pi$ rad/s
Why: $\omega = \frac{2\pi}{T} = \frac{2\pi}{4} = \frac{\pi}{2}$.
```

### Joined Wheels {#joined-wheels}
kind: property
prereqs: linear-angular-speed

Two wheels of radii $r_1$ and $r_2$, turning at $\omega_1$ and $\omega_2$ with nothing slipping, share one speed, and what joins them decides which.

: What Joined Wheels Share
| Joined by | Same for both | Relation |
| --- | --- | --- |
| an axle | angular speed | $\omega_1 = \omega_2$ |
| a chain or belt | rim speed | $r_1\omega_1 = r_2\omega_2$ |
| meshing teeth | rim speed | $r_1\omega_1 = r_2\omega_2$ |

On an axle, the larger wheel has the faster rim. Across a chain, belt or teeth, the smaller wheel turns faster. Meshing gears turn in opposite directions.

Teeth are evenly spaced, so the number of teeth $N$ on a gear is proportional to its radius, and
$$N_1\omega_1 = N_2\omega_2.$$

*Proof.* Wheels on one axle are a single rigid body. A chain or belt does not stretch, so all of it moves at one speed, and each rim moves with it. Meshing teeth carry the two rims along together. Then $v = r\omega$ for each wheel. $\square$

### Rolling Without Slipping {#rolling-without-slipping}
kind: property
prereqs: linear-angular-speed

A wheel of radius $r$ rolling without slipping at angular speed $\omega$ moves along the ground at speed
$$v = r\omega,$$
and goes one circumference, $2\pi r$, in each revolution.

*Proof.* Nothing slips, so the distance rolled is the length of rim that has touched the ground, the arc $s = r\theta$. Dividing by the time gives $v = r\omega$. $\square$

### Table of Angular Motion {#angular-motion-table}
kind: formula
prereqs: linear-angular-speed, rotation-frequency

For steady turning, with angles in radians and $r$ the distance from the axis.

: Linear and Angular
| | Linear | Angular | Relation |
| --- | :-: | :-: | :-: |
| distance | $s$ | $\theta$ | $s = r\theta$ |
| speed | $v$ | $\omega$ | $v = r\omega$ |
| in time $t$ | $s = vt$ | $\theta = \omega t$ | |
| in one revolution | $2\pi r$ | $2\pi$ | |

: Frequency and Period
| | | |
| ---: | :-: | :--- |
| $T$ | $=$ | $\dfrac{1}{f}$ |
| $\omega$ | $=$ | $2\pi f$ |
| $\omega$ | $=$ | $\dfrac{2\pi}{T}$ |
| $v$ | $=$ | $2\pi r f$ |
| $v$ | $=$ | $\dfrac{2\pi r}{T}$ |

: Units of Turning
| | | |
| ---: | :-: | :--- |
| $1$ rev | $=$ | $2\pi$ rad |
| $1$ rev | $=$ | $360^\circ$ |
| $1$ rev/s | $=$ | $2\pi$ rad/s |
| $1$ rpm | $=$ | $\dfrac{\pi}{30}$ rad/s |
| $1$ rad/s | $=$ | $\dfrac{30}{\pi}$ rpm |

### Circular Motion {#circular-motion}
kind: form
prereqs: unit-circle, rotation-frequency

A point turning counterclockwise about the origin stands at time $t$ at
$$\begin{aligned} x &= r\cos(\omega t + \varphi), \\ y &= r\sin(\omega t + \varphi). \end{aligned}$$

| Reads off | From |
| --- | --- |
| radius | $r$ |
| angular speed | $\omega$ |
| period | $\frac{2\pi}{\omega}$ |
| starting angle | $\varphi$ |

Each coordinate is a [[sinusoid-form|sinusoid]] of amplitude $r$, so the height of a seat on a Ferris wheel is a sine wave.

```quiz
Q: A point starts at $(2, 0)$ and turns counterclockwise about the origin at $\frac{\pi}{2}$ rad/s. Where is it after 1 second?
- $(2, 0)$
+ $(0, 2)$
- $(-2, 0)$
- $(0, -2)$
Why: It has turned through $\frac{\pi}{2}$, a quarter of a revolution.
```

### Converting Angular Speed {#converting-angular-speed}
kind: skill
prereqs: angular-speed, unit-conversion

Multiply by fractions equal to 1, built from $1\ \text{rev} = 2\pi\ \text{rad}$ and $1\ \text{min} = 60\ \text{s}$.

**Example.**
$$45\ \frac{\text{rev}}{\text{min}} \cdot \frac{2\pi\ \text{rad}}{1\ \text{rev}} \cdot \frac{1\ \text{min}}{60\ \text{s}} = \frac{3\pi}{2}\ \frac{\text{rad}}{\text{s}}.$$

```quiz
Q: What is 120 rpm in radians per second?
- $2\pi$
+ $4\pi$
- $12\pi$
- $60\pi$
Why: $120 \cdot \frac{2\pi}{60} = 4\pi$.

Q: How many rpm is $5\pi$ rad/s?
A: 150
Why: $5\pi \cdot \frac{60}{2\pi} = 150$.
```

### Finding Linear Speed {#finding-linear-speed}
kind: skill
prereqs: linear-angular-speed, converting-angular-speed

1. write the angular speed in radians per unit time;
2. multiply by the distance from the axis: $v = r\omega$;
3. convert to the units wanted.

**Example.** A horse 4 m from the centre of a merry-go-round making 6 rpm has
$$\begin{aligned} \omega &= 6 \cdot \frac{2\pi}{60} = \frac{\pi}{5}\ \frac{\text{rad}}{\text{s}}, \\ v &= 4 \cdot \frac{\pi}{5} \approx 2.5\ \frac{\text{m}}{\text{s}}. \end{aligned}$$

```quiz
Q: The rim of a wheel of radius 10 in turns at 3 rad/s. What is the speed of the rim, in inches per second?
A: 30
Why: $v = r\omega = 10 \cdot 3$.

Q: The Earth turns once in 24 hours, and the radius of the equator is about 3960 miles. How fast does a point on the equator move, in miles per hour?
A: 1037 ± 5
Hint: In 24 hours the point goes once around the equator.
Why: $v = \frac{2\pi \cdot 3960}{24} = 330\pi \approx 1037$.

Q: One horse on a merry-go-round is twice as far from the centre as another. Compared with the other, it moves
- at the same speed
+ twice as fast
- four times as fast
Why: They share $\omega$, and $v = r\omega$.
```

### Solving Gear & Chain Problems {#gear-chain-problems}
kind: skill
prereqs: joined-wheels, rolling-without-slipping, finding-linear-speed

1. write the known angular speed in radians per unit time;
2. across a chain, belt or meshing teeth, keep the rim speed: $r_1\omega_1 = r_2\omega_2$;
3. along an axle, keep the angular speed;
4. at the last wheel, $v = r\omega$ is the speed of its rim, and of whatever rolls on it.

**Example.** A bicycle has a pedal gear of radius 5 in, a wheel gear of radius 3 in and a wheel of radius 16 in. The rider pedals twice per second. How fast does the bicycle go?

```graph
x: 0, 52
y: 0, 38
grid: none
circle: 20, 20, 16
circle: 20, 20, 3
circle: 44, 20, 5
segment: 19.75, 22.99, 43.583, 24.983
segment: 19.75, 17.01, 43.583, 15.017
segment: 20, 20, 12, 33.856
segment: 20, 20, 17, 20
segment: 44, 20, 44, 25
segment: 0, 4, 52, 4
label: 15.5, 27.5 "16 in" left
label: 16.5, 20 "3 in" left
label: 44, 25.2 "5 in" above
label: 20, 15 "wheel gear" below
label: 44, 13.5 "pedal gear" below
label: 22, 30 "wheel" right
label: 38, 24.6 "chain" above
```

$$\begin{aligned} \omega_p &= 2 \cdot 2\pi = 4\pi\ \frac{\text{rad}}{\text{s}} && \text{pedal gear} \\ v_c &= 5\omega_p = 20\pi\ \frac{\text{in}}{\text{s}} && \text{chain} \\ \omega_g &= \frac{v_c}{3} = \frac{20\pi}{3}\ \frac{\text{rad}}{\text{s}} && \text{wheel gear} \\ \omega_w &= \omega_g = \frac{20\pi}{3}\ \frac{\text{rad}}{\text{s}} && \text{wheel} \\ v &= 16\omega_w = \frac{320\pi}{3} \approx 335\ \frac{\text{in}}{\text{s}} && \text{bicycle} \end{aligned}$$

That is about 19 miles per hour:
$$335\ \frac{\text{in}}{\text{s}} \cdot \frac{3600\ \text{s}}{1\ \text{h}} \cdot \frac{1\ \text{mi}}{63360\ \text{in}} \approx 19\ \frac{\text{mi}}{\text{h}}.$$

All at once: each turn of the pedals is $\frac{5}{3}$ turns of the wheel, and each turn of the wheel rolls one circumference, so
$$v = 2 \cdot \frac{5}{3} \cdot 2\pi \cdot 16 = \frac{320\pi}{3}.$$

```quiz
Q: On a bicycle, what do the pedal gear and the wheel gear have in common?
- their angular speed
+ their rim speed
- their radius
Why: The chain joins them, and each rim moves with the chain.

Q: What do the wheel gear and the wheel have in common?
+ their angular speed
- their rim speed
- their radius
Why: They turn on one axle.

Q: A bicycle has a pedal gear of radius 4 in, a wheel gear of radius 2 in and a wheel of radius 13 in. The rider pedals once per second. How fast does it go, in inches per second?
A: 163 ± 1
Hint: Each turn of the pedals is $\frac{4}{2} = 2$ turns of the wheel.
Why: $v = 1 \cdot 2 \cdot 2\pi \cdot 13 = 52\pi \approx 163$.

Q: The rider shifts to a smaller wheel gear and keeps pedalling at the same rate. The bicycle
+ speeds up
- slows down
- keeps the same speed
Why: The same chain speed turns a smaller gear faster, and the wheel turns with it.

Q: A gear with 12 teeth meshes with a gear with 36 teeth turning at 40 rpm. How many rpm does the smaller gear make?
A: 120
Why: $12\omega = 36 \cdot 40$, so $\omega = 120$.
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

### Small-Angle Approximation {#small-angle-approximation}
kind: heuristic
prereqs: radians, sine-cosine-graphs

For small $x$, in radians:
$$\sin x \approx x, \qquad \tan x \approx x, \qquad \cos x \approx 1 - \frac{x^2}{2}.$$

These are good to about 1 to 2% up to $x = 0.25$, which is about $14^\circ$. In degrees, one degree is about $\frac{1}{60}$ of a radian, so a slope of 1 in 60 is about $1^\circ$.

```quiz
Q: Using $\sin x \approx x$, what is $\sin 0.1$, to one decimal place?
A: 0.1
Why: The exact value is 0.0998.
```

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

1. draw the midline $y = D$;
2. mark one period, starting at $x = C$;
3. split it in four;
4. plot midline, maximum, midline, minimum, midline;
5. join them in a smooth wave.

For $A < 0$ the maximum and minimum swap. For cosine, the pattern starts at the maximum.

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

Each identity holds for every angle at which both sides are defined. Where $\pm$ and $\mp$ appear, read all the upper signs together or all the lower ones.

: Reciprocal
| | | |
| ---: | :-: | :--- |
| $\csc\theta$ | $=$ | $\dfrac{1}{\sin\theta}$ |
| $\sec\theta$ | $=$ | $\dfrac{1}{\cos\theta}$ |
| $\cot\theta$ | $=$ | $\dfrac{1}{\tan\theta}$ |

: Quotient
| | | |
| ---: | :-: | :--- |
| $\tan\theta$ | $=$ | $\dfrac{\sin\theta}{\cos\theta}$ |
| $\cot\theta$ | $=$ | $\dfrac{\cos\theta}{\sin\theta}$ |

: Pythagorean
| | | |
| ---: | :-: | :--- |
| $\sin^2\theta + \cos^2\theta$ | $=$ | $1$ |
| $1 + \tan^2\theta$ | $=$ | $\sec^2\theta$ |
| $1 + \cot^2\theta$ | $=$ | $\csc^2\theta$ |

: Even and Odd
| | | |
| ---: | :-: | :--- |
| $\sin(-\theta)$ | $=$ | $-\sin\theta$ |
| $\cos(-\theta)$ | $=$ | $\cos\theta$ |
| $\tan(-\theta)$ | $=$ | $-\tan\theta$ |
| $\csc(-\theta)$ | $=$ | $-\csc\theta$ |
| $\sec(-\theta)$ | $=$ | $\sec\theta$ |
| $\cot(-\theta)$ | $=$ | $-\cot\theta$ |

: Cofunction
| | | |
| ---: | :-: | :--- |
| $\sin\left(\dfrac{\pi}{2} - \theta\right)$ | $=$ | $\cos\theta$ |
| $\cos\left(\dfrac{\pi}{2} - \theta\right)$ | $=$ | $\sin\theta$ |
| $\tan\left(\dfrac{\pi}{2} - \theta\right)$ | $=$ | $\cot\theta$ |
| $\cot\left(\dfrac{\pi}{2} - \theta\right)$ | $=$ | $\tan\theta$ |
| $\sec\left(\dfrac{\pi}{2} - \theta\right)$ | $=$ | $\csc\theta$ |
| $\csc\left(\dfrac{\pi}{2} - \theta\right)$ | $=$ | $\sec\theta$ |

: Periods and Shifts
| | | |
| ---: | :-: | :--- |
| $\sin(\theta + 2\pi)$ | $=$ | $\sin\theta$ |
| $\cos(\theta + 2\pi)$ | $=$ | $\cos\theta$ |
| $\tan(\theta + \pi)$ | $=$ | $\tan\theta$ |
| $\sin(\theta + \pi)$ | $=$ | $-\sin\theta$ |
| $\cos(\theta + \pi)$ | $=$ | $-\cos\theta$ |
| $\sin(\pi - \theta)$ | $=$ | $\sin\theta$ |
| $\cos(\pi - \theta)$ | $=$ | $-\cos\theta$ |
| $\sin\left(\theta + \dfrac{\pi}{2}\right)$ | $=$ | $\cos\theta$ |
| $\cos\left(\theta + \dfrac{\pi}{2}\right)$ | $=$ | $-\sin\theta$ |

: Sum and Difference
| | | |
| ---: | :-: | :--- |
| $\sin(\alpha \pm \beta)$ | $=$ | $\sin\alpha\cos\beta \pm \cos\alpha\sin\beta$ |
| $\cos(\alpha \pm \beta)$ | $=$ | $\cos\alpha\cos\beta \mp \sin\alpha\sin\beta$ |
| $\tan(\alpha \pm \beta)$ | $=$ | $\dfrac{\tan\alpha \pm \tan\beta}{1 \mp \tan\alpha\tan\beta}$ |

: Double Angle
| | | |
| ---: | :-: | :--- |
| $\sin 2\theta$ | $=$ | $2\sin\theta\cos\theta$ |
| | $=$ | $\dfrac{2\tan\theta}{1 + \tan^2\theta}$ |
| $\cos 2\theta$ | $=$ | $\cos^2\theta - \sin^2\theta$ |
| | $=$ | $2\cos^2\theta - 1$ |
| | $=$ | $1 - 2\sin^2\theta$ |
| | $=$ | $\dfrac{1 - \tan^2\theta}{1 + \tan^2\theta}$ |
| $\tan 2\theta$ | $=$ | $\dfrac{2\tan\theta}{1 - \tan^2\theta}$ |

: Triple Angle
| | | |
| ---: | :-: | :--- |
| $\sin 3\theta$ | $=$ | $3\sin\theta - 4\sin^3\theta$ |
| $\cos 3\theta$ | $=$ | $4\cos^3\theta - 3\cos\theta$ |
| $\tan 3\theta$ | $=$ | $\dfrac{3\tan\theta - \tan^3\theta}{1 - 3\tan^2\theta}$ |

: Half Angle
| | | |
| ---: | :-: | :--- |
| $\sin\dfrac{\theta}{2}$ | $=$ | $\pm\sqrt{\dfrac{1 - \cos\theta}{2}}$ |
| $\cos\dfrac{\theta}{2}$ | $=$ | $\pm\sqrt{\dfrac{1 + \cos\theta}{2}}$ |
| $\tan\dfrac{\theta}{2}$ | $=$ | $\pm\sqrt{\dfrac{1 - \cos\theta}{1 + \cos\theta}}$ |
| | $=$ | $\dfrac{1 - \cos\theta}{\sin\theta}$ |
| | $=$ | $\dfrac{\sin\theta}{1 + \cos\theta}$ |

The sign is the sign of the function at $\dfrac{\theta}{2}$, found from its quadrant.

: Power Reduction
| | | |
| ---: | :-: | :--- |
| $\sin^2\theta$ | $=$ | $\dfrac{1 - \cos 2\theta}{2}$ |
| $\cos^2\theta$ | $=$ | $\dfrac{1 + \cos 2\theta}{2}$ |
| $\tan^2\theta$ | $=$ | $\dfrac{1 - \cos 2\theta}{1 + \cos 2\theta}$ |
| $\sin^3\theta$ | $=$ | $\dfrac{3\sin\theta - \sin 3\theta}{4}$ |
| $\cos^3\theta$ | $=$ | $\dfrac{3\cos\theta + \cos 3\theta}{4}$ |

: Product to Sum
| | | |
| ---: | :-: | :--- |
| $\sin\alpha\sin\beta$ | $=$ | $\dfrac{\cos(\alpha - \beta) - \cos(\alpha + \beta)}{2}$ |
| $\cos\alpha\cos\beta$ | $=$ | $\dfrac{\cos(\alpha - \beta) + \cos(\alpha + \beta)}{2}$ |
| $\sin\alpha\cos\beta$ | $=$ | $\dfrac{\sin(\alpha + \beta) + \sin(\alpha - \beta)}{2}$ |
| $\cos\alpha\sin\beta$ | $=$ | $\dfrac{\sin(\alpha + \beta) - \sin(\alpha - \beta)}{2}$ |

: Sum to Product
| | | |
| ---: | :-: | :--- |
| $\sin\alpha + \sin\beta$ | $=$ | $2\sin\dfrac{\alpha + \beta}{2}\cos\dfrac{\alpha - \beta}{2}$ |
| $\sin\alpha - \sin\beta$ | $=$ | $2\cos\dfrac{\alpha + \beta}{2}\sin\dfrac{\alpha - \beta}{2}$ |
| $\cos\alpha + \cos\beta$ | $=$ | $2\cos\dfrac{\alpha + \beta}{2}\cos\dfrac{\alpha - \beta}{2}$ |
| $\cos\alpha - \cos\beta$ | $=$ | $-2\sin\dfrac{\alpha + \beta}{2}\sin\dfrac{\alpha - \beta}{2}$ |

: In Terms of Tangent of the Half Angle
| | | |
| ---: | :-: | :--- |
| $\sin\theta$ | $=$ | $\dfrac{2\tan\frac{\theta}{2}}{1 + \tan^2\frac{\theta}{2}}$ |
| $\cos\theta$ | $=$ | $\dfrac{1 - \tan^2\frac{\theta}{2}}{1 + \tan^2\frac{\theta}{2}}$ |
| $\tan\theta$ | $=$ | $\dfrac{2\tan\frac{\theta}{2}}{1 - \tan^2\frac{\theta}{2}}$ |

: Sine and Cosine Combined
| | | |
| ---: | :-: | :--- |
| $a\sin\theta + b\cos\theta$ | $=$ | $R\sin(\theta + \varphi)$ |

Here $R = \sqrt{a^2 + b^2}$, and $\varphi$ is the angle with $\cos\varphi = \dfrac{a}{R}$ and $\sin\varphi = \dfrac{b}{R}$.

: Inverse Functions
| | | |
| ---: | :-: | :--- |
| $\arcsin x + \arccos x$ | $=$ | $\dfrac{\pi}{2}$ |
| $\arctan x + \arctan\dfrac{1}{x}$ | $=$ | $\dfrac{\pi}{2}$, for $x > 0$ |
| $\arcsin(-x)$ | $=$ | $-\arcsin x$ |
| $\arccos(-x)$ | $=$ | $\pi - \arccos x$ |
| $\arctan(-x)$ | $=$ | $-\arctan x$ |
| $\cos(\arcsin x)$ | $=$ | $\sqrt{1 - x^2}$ |
| $\sin(\arccos x)$ | $=$ | $\sqrt{1 - x^2}$ |
| $\tan(\arcsin x)$ | $=$ | $\dfrac{x}{\sqrt{1 - x^2}}$ |
| $\sin(\arctan x)$ | $=$ | $\dfrac{x}{\sqrt{1 + x^2}}$ |
| $\cos(\arctan x)$ | $=$ | $\dfrac{1}{\sqrt{1 + x^2}}$ |

: Complex Form
| | | |
| ---: | :-: | :--- |
| $e^{i\theta}$ | $=$ | $\cos\theta + i\sin\theta$ |
| $\cos\theta$ | $=$ | $\dfrac{e^{i\theta} + e^{-i\theta}}{2}$ |
| $\sin\theta$ | $=$ | $\dfrac{e^{i\theta} - e^{-i\theta}}{2i}$ |

: Exact Values
| $\theta$ | $0$ | $\dfrac{\pi}{6}$ | $\dfrac{\pi}{4}$ | $\dfrac{\pi}{3}$ | $\dfrac{\pi}{2}$ |
| --- | --- | --- | --- | --- | --- |
| degrees | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
| $\sin\theta$ | $0$ | $\dfrac{1}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{\sqrt{3}}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\dfrac{\sqrt{3}}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{1}{2}$ | $0$ |
| $\tan\theta$ | $0$ | $\dfrac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | undefined |
| $\csc\theta$ | undefined | $2$ | $\sqrt{2}$ | $\dfrac{2\sqrt{3}}{3}$ | $1$ |
| $\sec\theta$ | $1$ | $\dfrac{2\sqrt{3}}{3}$ | $\sqrt{2}$ | $2$ | undefined |
| $\cot\theta$ | undefined | $\sqrt{3}$ | $1$ | $\dfrac{\sqrt{3}}{3}$ | $0$ |

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

1. start from the more complicated side;
2. write everything in sines and cosines;
3. combine fractions;
4. look for $\sin^2 x + \cos^2 x$, and other known identities;
5. continue until it becomes the other side.

> **!** Work on one side only. Moving terms across the equals sign assumes what is to be proved.

**Example.**
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

## Hyperbolic Functions {#hyperbolic-functions}
flow: down
rows: kinds
wrap: 6

Functions built from $e^x$ that behave like sine and cosine, with a hyperbola in place of the circle.

### Hyperbola Identity {#hyperbola-identity}
kind: theorem
prereqs: hyperbolic-definition

For every real $t$:
$$\cosh^2 t - \sinh^2 t = 1,$$
so the point $(\cosh t, \sinh t)$ lies on the hyperbola $x^2 - y^2 = 1$.

*Proof.* Expand both squares:
$$\begin{aligned} \cosh^2 t - \sinh^2 t &= \frac{e^{2t} + 2 + e^{-2t}}{4} - \frac{e^{2t} - 2 + e^{-2t}}{4} \\ &= \frac{4}{4} = 1. \end{aligned}$$
$\square$

This is why they are called hyperbolic: $\cosh$ and $\sinh$ do for the hyperbola what $\cos$ and $\sin$ do for the [[unit-circle|unit circle]].

### Hyperbolic Functions {#hyperbolic-definition}
kind: definition
prereqs: exponential-functions

For every real $x$:
$$\sinh x = \frac{e^x - e^{-x}}{2}, \qquad \cosh x = \frac{e^x + e^{-x}}{2}.$$
The other four follow as the trigonometric functions do:
$$\tanh x = \frac{\sinh x}{\cosh x}, \quad \coth x = \frac{\cosh x}{\sinh x}, \quad \operatorname{sech} x = \frac{1}{\cosh x}, \quad \operatorname{csch} x = \frac{1}{\sinh x}.$$

Their derivatives are in the [[derivative-table|table of derivatives]].

```quiz
Q: What is $\cosh 0$?
A: 1
Why: $\frac{1 + 1}{2} = 1$.

Q: What is $\sinh(\ln 2)$?
A: 3/4
Why: $\frac{2 - \frac{1}{2}}{2} = \frac{3}{4}$.
```

### Table of Hyperbolic Functions {#hyperbolic-function-table}
kind: property
prereqs: hyperbolic-definition

The six functions, and how they look.

: The Six Functions
| Function | Graph | Domain | Range | Symmetry |
| --- | --- | --- | --- | --- |
| $y = \sinh x$ | {{ y = sinh(x); x: -3, 3; y: -4, 4 }} | $\mathbb{R}$ | $\mathbb{R}$ | odd |
| $y = \cosh x$ | {{ y = cosh(x); x: -3, 3; y: -1, 5 }} | $\mathbb{R}$ | $[1, \infty)$ | even |
| $y = \tanh x$ | {{ y = tanh(x); x: -4, 4; y: -2, 2 }} | $\mathbb{R}$ | $(-1, 1)$ | odd |
| $y = \coth x$ | {{ y = cosh(x)/sinh(x); x: -4, 4; y: -4, 4 }} | $x \ne 0$ | $\lvert y \rvert > 1$ | odd |
| $y = \operatorname{sech} x$ | {{ y = 1/cosh(x); x: -4, 4; y: -1, 2 }} | $\mathbb{R}$ | $(0, 1]$ | even |
| $y = \operatorname{csch} x$ | {{ y = 1/sinh(x); x: -4, 4; y: -4, 4 }} | $x \ne 0$ | $y \ne 0$ | odd |

### The Catenary {#catenary}
kind: property
prereqs: hyperbolic-definition

A chain or cable hanging freely under its own weight takes the shape of
$$y = a\cosh\frac{x}{a},$$
where $a > 0$ is the ratio of the tension at the lowest point to the weight per unit of length.

It looks like a parabola but is not one, since it grows exponentially. Turned upside down, it is the shape of the Gateway Arch in St. Louis, near enough.
```graph
y = cosh(x)
y = 1 + x^2/2 | dashed
x: -3, 3
y: 0, 7
```

The dashed curve is the parabola that matches it at the bottom.

### Osborn's Rule {#osborns-rule}
kind: heuristic
prereqs: hyperbolic-identity-table, trig-identity-table

To turn a trigonometric identity into a hyperbolic one, replace each function with its hyperbolic version, and change the sign of every term holding a product of two sines. Remember that $\tan^2$ holds such a product too.

So $\cos^2\theta + \sin^2\theta = 1$ gives $\cosh^2 x - \sinh^2 x = 1$, and $1 + \tan^2\theta = \sec^2\theta$ gives $1 - \tanh^2 x = \operatorname{sech}^2 x$. It works because $\cos(i x) = \cosh x$ and $\sin(i x) = i\sinh x$, but check the result, as it is a memory aid rather than a proof.

### Table of Hyperbolic Identities {#hyperbolic-identity-table}
kind: formula
prereqs: hyperbola-identity

Each identity holds for every real value at which both sides are defined. Where $\pm$ appears, read all the upper signs together or all the lower ones.

: Pythagorean
| | | |
| ---: | :-: | :--- |
| $\cosh^2 x - \sinh^2 x$ | $=$ | $1$ |
| $1 - \tanh^2 x$ | $=$ | $\operatorname{sech}^2 x$ |
| $\coth^2 x - 1$ | $=$ | $\operatorname{csch}^2 x$ |

: Even and Odd
| | | |
| ---: | :-: | :--- |
| $\sinh(-x)$ | $=$ | $-\sinh x$ |
| $\cosh(-x)$ | $=$ | $\cosh x$ |
| $\tanh(-x)$ | $=$ | $-\tanh x$ |

: Exponential Form
| | | |
| ---: | :-: | :--- |
| $\cosh x + \sinh x$ | $=$ | $e^x$ |
| $\cosh x - \sinh x$ | $=$ | $e^{-x}$ |

: Sum and Difference
| | | |
| ---: | :-: | :--- |
| $\sinh(\alpha \pm \beta)$ | $=$ | $\sinh\alpha\cosh\beta \pm \cosh\alpha\sinh\beta$ |
| $\cosh(\alpha \pm \beta)$ | $=$ | $\cosh\alpha\cosh\beta \pm \sinh\alpha\sinh\beta$ |
| $\tanh(\alpha \pm \beta)$ | $=$ | $\dfrac{\tanh\alpha \pm \tanh\beta}{1 \pm \tanh\alpha\tanh\beta}$ |

: Double Angle
| | | |
| ---: | :-: | :--- |
| $\sinh 2x$ | $=$ | $2\sinh x\cosh x$ |
| $\cosh 2x$ | $=$ | $\cosh^2 x + \sinh^2 x$ |
| | $=$ | $2\cosh^2 x - 1$ |
| | $=$ | $1 + 2\sinh^2 x$ |
| $\tanh 2x$ | $=$ | $\dfrac{2\tanh x}{1 + \tanh^2 x}$ |

: Power Reduction
| | | |
| ---: | :-: | :--- |
| $\sinh^2 x$ | $=$ | $\dfrac{\cosh 2x - 1}{2}$ |
| $\cosh^2 x$ | $=$ | $\dfrac{\cosh 2x + 1}{2}$ |

: Links to the Trigonometric Functions
| | | |
| ---: | :-: | :--- |
| $\cos(i x)$ | $=$ | $\cosh x$ |
| $\sin(i x)$ | $=$ | $i\sinh x$ |
| $\cosh(i x)$ | $=$ | $\cos x$ |
| $\sinh(i x)$ | $=$ | $i\sin x$ |

### Inverse Hyperbolic Functions {#inverse-hyperbolic}
kind: formula
prereqs: hyperbolic-definition, inverse-functions, natural-log

Since the hyperbolic functions are built from $e^x$, their inverses are logarithms.

: Logarithmic Forms
| | | | |
| ---: | :-: | :--- | :--- |
| $\operatorname{arcsinh} x$ | $=$ | $\ln\left(x + \sqrt{x^2 + 1}\right)$ | all $x$ |
| $\operatorname{arccosh} x$ | $=$ | $\ln\left(x + \sqrt{x^2 - 1}\right)$ | $x \ge 1$ |
| $\operatorname{arctanh} x$ | $=$ | $\dfrac{1}{2}\ln\dfrac{1 + x}{1 - x}$ | $\lvert x \rvert < 1$ |
| $\operatorname{arccoth} x$ | $=$ | $\dfrac{1}{2}\ln\dfrac{x + 1}{x - 1}$ | $\lvert x \rvert > 1$ |
| $\operatorname{arcsech} x$ | $=$ | $\ln\dfrac{1 + \sqrt{1 - x^2}}{x}$ | $0 < x \le 1$ |
| $\operatorname{arccsch} x$ | $=$ | $\ln\left(\dfrac{1}{x} + \dfrac{\sqrt{1 + x^2}}{\lvert x \rvert}\right)$ | $x \ne 0$ |

*Proof for arcsinh.* Set $y = \sinh^{-1} x$, so that $e^y - e^{-y} = 2x$. Multiplying by $e^y$ gives a quadratic in $e^y$,
$$(e^y)^2 - 2x\,e^y - 1 = 0,$$
whose positive root is $e^y = x + \sqrt{x^2 + 1}$. $\square$

### Proving Hyperbolic Identities {#proving-hyperbolic-identities}
kind: skill
prereqs: hyperbolic-definition, exponent-laws

1. replace each function on the more complicated side by its exponential form;
2. expand and simplify, using the laws of exponents;
3. recognise the other side.

**Example.** For $\sinh 2x = 2\sinh x\cosh x$:
$$2 \cdot \frac{e^x - e^{-x}}{2} \cdot \frac{e^x + e^{-x}}{2} = \frac{e^{2x} - e^{-2x}}{2}.$$

```quiz
Q: What is $\cosh^2 5 - \sinh^2 5$?
A: 1
Why: It is the hyperbola identity, for any value.
```
