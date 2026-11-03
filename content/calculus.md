# Calculus
color: #2f4f86

The mathematics of change and accumulation: the slopes of curves, the areas under them, and the theorem that says these are two sides of one idea.

## Limits & Continuity {#limits}

What a function approaches, as opposed to what it equals: the idea underneath all of calculus.

### Limits {#limit-concept}
kind: definition
prereqs: function-notation, function-graphs

The statement
$$\lim_{x \to a} f(x) = L$$
means that $f(x)$ can be made as close to $L$ as desired by taking $x$ close enough to $a$, with $x \ne a$. The value $f(a)$, if it exists at all, plays no part.

For instance, $\frac{x^2 - 1}{x - 1}$ is undefined at $x = 1$, but
$$\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} (x + 1) = 2.$$

### One-Sided Limits
prereqs: limit-concept, piecewise-functions

Approaching from one side only:
- from the left, $x \to a^-$;
- from the right, $x \to a^+$.

The limit exists exactly when the two agree:
$$\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L.$$

### Limit Laws
kind: theorem
prereqs: limit-concept

Suppose
$$\lim_{x \to a} f(x) = L \quad\text{and}\quad \lim_{x \to a} g(x) = M.$$
Then, with every limit taken as $x \to a$:
- sum and difference: $\lim\,(f \pm g) = L \pm M$;
- constant multiple: $\lim\,(cf) = cL$;
- product: $\lim\,(fg) = LM$;
- quotient: $\lim \dfrac{f}{g} = \dfrac{L}{M}$, provided $M \ne 0$.

### Evaluating Limits Algebraically {#evaluating-limits}
kind: skill
prereqs: limit-laws, factoring-trinomials, rationalizing-denominators

Try substituting first. If that gives $\frac{0}{0}$, rewrite the expression and substitute again. The usual rewrites:
- factor and cancel;
- rationalise;
- combine fractions.

### Limits at Infinity
prereqs: limit-concept, asymptotes

What $f(x)$ approaches as $x$ grows without bound, as in
$$\lim_{x \to \infty} \frac{3x^2 + 1}{x^2} = 3.$$
These are horizontal asymptotes, made precise.

### Squeeze Theorem
kind: theorem
prereqs: limit-laws

If, for all $x$ near $a$,
$$g(x) \le f(x) \le h(x),$$
and
$$\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L,$$
then
$$\lim_{x \to a} f(x) = L.$$

### The Limit of sin x over x {#sinx-over-x}
kind: theorem
prereqs: squeeze-theorem, radians, unit-circle

With $x$ in radians:
$$\begin{aligned} \lim_{x \to 0} \frac{\sin x}{x} &= 1, \\ \lim_{x \to 0} \frac{1 - \cos x}{x} &= 0. \end{aligned}$$

Proved by the [[squeeze-theorem]], comparing areas in the unit circle.

### Continuity
kind: definition
prereqs: one-sided-limits, limit-laws

$f$ is continuous on an interval if it is continuous at every point $a$ of it, which means:
1. $f(a)$ is defined;
2. $\lim_{x \to a} f(x)$ exists;
3. $\lim_{x \to a} f(x) = f(a)$.

### Intermediate Value Theorem {#ivt}
kind: theorem
prereqs: continuity, completeness-axiom

If $f$ is continuous on $[a, b]$ and $N$ lies between $f(a)$ and $f(b)$, then for some $c \in [a, b]$
$$f(c) = N.$$

### The ε–δ Definition of a Limit {#epsilon-delta}
kind: definition
prereqs: limit-concept, absolute-value-inequalities

$\lim_{x \to a} f(x) = L$ if for every $\varepsilon > 0$ there is a $\delta > 0$ such that
$$0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon.$$

## Derivatives

The instantaneous rate of change: the slope of a curve at a point.

### The Difference Quotient {#difference-quotient}
kind: formula
prereqs: average-rate-of-change, polynomial-multiplication

The average rate of change of $f$ on $[x, x + h]$, for $h \ne 0$:
$$\frac{f(x + h) - f(x)}{h}$$

For $f(x) = x^2$ it simplifies:
$$\frac{(x + h)^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h.$$

### The Derivative {#derivative-definition}
kind: definition
prereqs: difference-quotient, evaluating-limits

The derivative of $f$ at $x$ is
$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$
when this limit exists. It is the slope of the tangent line to the graph of $f$ at $(x, f(x))$.

**Example.** For $f(x) = x^2$:
$$\frac{(x + h)^2 - x^2}{h} = 2x + h \to 2x,$$
so
$$f'(x) = 2x.$$

Notation:
$$f'(x) = \frac{df}{dx} = \frac{d}{dx} f(x) = Df(x).$$

```quiz
Q: If $f(x) = x^2$, what is $f'(3)$?
A: 6
Why: $f'(x) = 2x$.

Q: $f'(a)$ is the slope of
- the secant line from $x = 0$ to $x = a$
+ the tangent line at $x = a$
- the line through the origin and $(a, f(a))$
- the normal line at $x = a$
Why: It is the limit of secant slopes.

Q: Using the definition, what is the derivative of $f(x) = 5x + 2$?
A: 5
Why: $\frac{5(x + h) + 2 - (5x + 2)}{h} = 5$.
```

### Differentiability
kind: theorem
prereqs: derivative-definition, continuity

If $f$ is differentiable at $a$, then $f$ is continuous at $a$. The converse is false: $|x|$ is continuous but not differentiable at $0$.

### Tangent Lines
kind: skill
prereqs: derivative-definition, point-slope

The tangent to $y = f(x)$ at $x = a$ is
$$y - f(a) = f'(a)(x - a):$$
a point from $f$, a slope from $f'$.

### The Power Rule {#power-rule}
kind: theorem
prereqs: derivative-definition, exponent-laws

For every real $n$ (and $x > 0$ when $n$ is not an integer):
$$\frac{d}{dx} x^n = n x^{n-1}$$

```quiz
Q: $\frac{d}{dx} x^7 =$
- $x^6$
- $7x^7$
+ $7x^6$
- $6x^7$
Why: $n x^{n-1}$ with $n = 7$.

Q: What is the derivative of $x^3$ at $x = 2$?
A: 12
Why: $3x^2 = 12$.

Q: $\frac{d}{dx} \frac{1}{x} =$
+ $-\frac{1}{x^2}$
- $\frac{1}{x^2}$
- $\ln x$
- $-\frac{1}{x}$
Hint: $\frac{1}{x} = x^{-1}$.
Why: $-1 \cdot x^{-2}$.
```

### Linearity of the Derivative {#derivative-linearity}
kind: theorem
prereqs: derivative-definition, limit-laws

If $f$ and $g$ are differentiable and $c$ is a constant:
$$\begin{aligned} (f + g)' &= f' + g', \\ (cf)' &= cf'. \end{aligned}$$

### Product Rule
kind: theorem
prereqs: derivative-linearity

If $f$ and $g$ are differentiable:
$$(fg)' = f'g + fg'.$$

### Quotient Rule
kind: theorem
prereqs: product-rule

If $f$ and $g$ are differentiable and $g \ne 0$:
$$\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$$

### Chain Rule
kind: theorem
prereqs: composition, derivative-linearity

If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$:
$$(f \circ g)'(x) = f'(g(x))\,g'(x),$$
or, with $y = f(u)$ and $u = g(x)$,
$$\frac{dy}{dx} = \frac{dy}{du}\,\frac{du}{dx}.$$

### Derivatives of Trig Functions {#trig-derivatives}
kind: formula
prereqs: sinx-over-x, sum-difference-formulas, derivative-definition

With $x$ in radians:
$$\begin{aligned} \frac{d}{dx}\sin x &= \cos x \\ \frac{d}{dx}\cos x &= -\sin x \\ \frac{d}{dx}\tan x &= \sec^2 x \\ \frac{d}{dx}\sec x &= \sec x \tan x \\ \frac{d}{dx}\csc x &= -\csc x \cot x \\ \frac{d}{dx}\cot x &= -\csc^2 x \end{aligned}$$

### Derivatives of Exponentials & Logarithms {#exp-log-derivatives}
kind: formula
prereqs: number-e, natural-log, chain-rule

For $a > 0$, $a \ne 1$:
$$\begin{aligned} \frac{d}{dx} e^x &= e^x \\ \frac{d}{dx} a^x &= a^x \ln a \\ \frac{d}{dx} \ln x &= \frac{1}{x} \quad (x > 0) \\ \frac{d}{dx} \log_a x &= \frac{1}{x \ln a} \end{aligned}$$

### Implicit Differentiation
kind: technique
prereqs: chain-rule

Differentiating an equation like
$$x^2 + y^2 = 25$$
without solving for $y$: treat $y$ as a function of $x$ and use the chain rule, so
$$\begin{aligned} 2x + 2y\,y' &= 0, \\ y' &= -\frac{x}{y}. \end{aligned}$$

### Derivatives of Inverse Functions {#inverse-derivatives}
kind: formula
prereqs: implicit-differentiation, inverse-functions, inverse-trig-functions

If $f$ is invertible and differentiable with $f'(f^{-1}(x)) \ne 0$, then
$$(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}.$$
In particular:
$$\begin{aligned} \frac{d}{dx}\arcsin x &= \frac{1}{\sqrt{1 - x^2}}, \\ \frac{d}{dx}\arccos x &= -\frac{1}{\sqrt{1 - x^2}}, \\ \frac{d}{dx}\arctan x &= \frac{1}{1 + x^2}. \end{aligned}$$

### Table of Derivatives {#derivative-table}
kind: formula
prereqs: inverse-derivatives, trig-derivatives, exp-log-derivatives, product-rule, quotient-rule

The rules, for differentiable $f$, $g$ and a constant $c$:
$$\begin{aligned} (cf)' &= cf' \\ (f + g)' &= f' + g' \\ (fg)' &= f'g + fg' \\ \left(\frac{f}{g}\right)' &= \frac{f'g - fg'}{g^2} \\ (f \circ g)' &= (f' \circ g)\, g' \\ (f^{-1})' &= \frac{1}{f' \circ f^{-1}} \end{aligned}$$

| $f(x)$ | $f'(x)$ | | $f(x)$ | $f'(x)$ |
| --- | --- | --- | --- | --- |
| $c$ | $0$ | | $\sin x$ | $\cos x$ |
| $x^n$ | $n x^{n-1}$ | | $\cos x$ | $-\sin x$ |
| $\sqrt{x}$ | $\frac{1}{2\sqrt{x}}$ | | $\tan x$ | $\sec^2 x$ |
| $\frac{1}{x}$ | $-\frac{1}{x^2}$ | | $\sec x$ | $\sec x \tan x$ |
| $e^x$ | $e^x$ | | $\csc x$ | $-\csc x \cot x$ |
| $a^x$ | $a^x \ln a$ | | $\cot x$ | $-\csc^2 x$ |
| $\ln x$ | $\frac{1}{x}$ | | $\arcsin x$ | $\frac{1}{\sqrt{1 - x^2}}$ |
| $\log_a x$ | $\frac{1}{x \ln a}$ | | $\arctan x$ | $\frac{1}{1 + x^2}$ |

### Higher Derivatives
prereqs: power-rule

The derivative of the derivative, $f''$, measures how the rate of change is itself changing: acceleration from velocity, or how a graph bends.

## Applications of Derivatives {#derivative-applications}

What slopes are good for: rates, approximations, and finding the best.

### Related Rates
kind: technique
prereqs: implicit-differentiation

When quantities are linked by an equation, their rates are linked by its derivative: how fast a ladder's top slides down a wall as its foot slides out.

### Linear Approximation
prereqs: tangent-lines

Near a point a curve looks like its tangent line, so
$$f(a + \Delta x) \approx f(a) + f'(a)\,\Delta x.$$
That is how, in your head,
$$\sqrt{4.1} \approx 2 + \frac{1}{4}(0.1) = 2.025.$$

### Critical Points
kind: definition
prereqs: differentiability

Points where $f' = 0$ or $f'$ doesn't exist: the only places a smooth function can turn around.

### Extreme Value Theorem {#evt}
kind: theorem
prereqs: continuity, completeness-axiom

If $f$ is continuous on the closed interval $[a, b]$, then $f$ attains a maximum and a minimum value on $[a, b]$.

### Rolle's Theorem
kind: theorem
prereqs: critical-points, evt

If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then for some $c \in (a, b)$
$$f'(c) = 0.$$

### Mean Value Theorem {#mvt}
kind: theorem
prereqs: rolles-theorem

If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then for some $c \in (a, b)$:
$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

### First Derivative Test
kind: theorem
prereqs: critical-points, mvt

Let $c$ be a critical point of a continuous $f$. If, at $c$, $f'$
- changes from positive to negative, $f(c)$ is a local maximum;
- changes from negative to positive, $f(c)$ is a local minimum;
- keeps its sign, $f(c)$ is neither.

### Concavity & the Second Derivative {#concavity}
kind: theorem
prereqs: higher-derivatives, first-derivative-test

For a twice-differentiable $f$:
- where $f'' > 0$ on an interval, $f$ is concave up;
- where $f'' < 0$, it is concave down;
- if $f'(c) = 0$ and $f''(c) > 0$, $f(c)$ is a local minimum;
- if $f'(c) = 0$ and $f''(c) < 0$, $f(c)$ is a local maximum.

### Curve Sketching
kind: skill
prereqs: concavity, limits-at-infinity, asymptotes

Putting it all together:
1. the domain;
2. the intercepts;
3. the asymptotes;
4. where $f$ rises and falls;
5. where it bends which way;
6. then the sketch.

### Optimization
kind: technique
prereqs: first-derivative-test, evt

Finding the best, in three steps:
1. write the quantity to maximise or minimise as a function of one variable;
2. find its critical points;
3. check them and the endpoints.

### L'Hôpital's Rule {#lhopital}
kind: theorem
prereqs: mvt, limits-at-infinity

If $\lim f(x)$ and $\lim g(x)$ are both $0$ or both $\pm\infty$, and $\lim \frac{f'(x)}{g'(x)}$ exists, then
$$\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}.$$

### Position, Velocity & Acceleration {#motion}
prereqs: higher-derivatives

Velocity is the derivative of position, and acceleration the derivative of velocity. A ball thrown upward has
$$\begin{aligned} s(t) &= -4.9t^2 + v_0 t, \\ v(t) &= s'(t) = -9.8t + v_0, \\ a(t) &= v'(t) = -9.8. \end{aligned}$$

## Integrals

Accumulation: adding up infinitely many infinitely thin pieces.

### Antiderivatives
kind: definition
prereqs: power-rule, trig-derivatives, exp-log-derivatives

$F$ is an antiderivative of $f$ on an interval if, there,
$$F'(x) = f(x).$$
Any two differ by a constant, so the indefinite integral is written
$$\int f(x)\,dx = F(x) + C.$$

### Table of Integrals {#integral-table}
kind: formula
prereqs: antiderivatives, inverse-derivatives

Each holds up to an added constant $C$:

| $f(x)$ | $\int f(x)\,dx$ | | $f(x)$ | $\int f(x)\,dx$ |
| --- | --- | --- | --- | --- |
| $x^n$, $n \ne -1$ | $\frac{x^{n+1}}{n + 1}$ | | $\sin x$ | $-\cos x$ |
| $\frac{1}{x}$ | $\ln\lvert x \rvert$ | | $\cos x$ | $\sin x$ |
| $e^x$ | $e^x$ | | $\sec^2 x$ | $\tan x$ |
| $a^x$ | $\frac{a^x}{\ln a}$ | | $\sec x \tan x$ | $\sec x$ |
| $\ln x$ | $x \ln x - x$ | | $\tan x$ | $-\ln\lvert \cos x \rvert$ |
| $\frac{1}{1 + x^2}$ | $\arctan x$ | | $\frac{1}{\sqrt{1 - x^2}}$ | $\arcsin x$ |

### Riemann Sums
kind: definition
prereqs: sigma-notation, area-basic, function-notation

Approximating the area under a curve with rectangles:
$$\sum_{i=1}^{n} f(x_i)\,\Delta x.$$
Thinner rectangles give a better fit.

### The Definite Integral {#definite-integral}
kind: definition
prereqs: riemann-sums, limit-concept

For $f$ on $[a, b]$, with $\Delta x = \frac{b - a}{n}$ and sample points $x_i^*$ in the $i$-th subinterval:
$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*)\,\Delta x$$
when the limit exists. It is the signed area between the graph and the $x$-axis.

### Properties of Integrals {#integral-properties}
kind: theorem
prereqs: definite-integral

For integrable $f$ and $g$ and a constant $c$:
$$\begin{aligned} \int_a^b f\,dx + \int_b^c f\,dx &= \int_a^c f\,dx \\ \int_b^a f\,dx &= -\int_a^b f\,dx \\ \int_a^b (f + g)\,dx &= \int_a^b f\,dx + \int_a^b g\,dx \\ \int_a^b cf\,dx &= c\int_a^b f\,dx \end{aligned}$$

### The Fundamental Theorem of Calculus {#ftc}
kind: theorem
prereqs: definite-integral, antiderivatives, mvt

Let $f$ be continuous on $[a, b]$.
1. If $F(x) = \int_a^x f(t)\,dt$, then
$$F'(x) = f(x).$$
2. If $F$ is any antiderivative of $f$, then
$$\int_a^b f(x)\,dx = F(b) - F(a).$$

Differentiation and integration are inverse operations.

**Example.**
$$\int_0^2 x^2\,dx = \frac{2^3}{3} - \frac{0^3}{3} = \frac{8}{3}.$$

```quiz
Q: $\int_0^2 x^2\,dx =$
A: 8/3
Hint: An antiderivative of $x^2$ is $\frac{x^3}{3}$.
Why: $\frac{8}{3} - 0$.

Q: $\frac{d}{dx}\int_0^x \cos t\,dt =$
- $\sin x$
+ $\cos x$
- $-\sin x$
- $0$
Why: Part (1) of the theorem.

Q: $\int_1^3 2x\,dx =$
A: 8
Why: $x^2$ from 1 to 3: $9 - 1$.
```

### u-Substitution {#u-substitution}
kind: technique
prereqs: ftc, chain-rule

The chain rule in reverse: spot an inside function $u$ whose derivative is also present. With $u = x^2$,
$$\int 2x\cos(x^2)\,dx = \int \cos u\,du = \sin(x^2) + C.$$

### Integration by Parts
kind: technique
prereqs: u-substitution, product-rule

The product rule in reverse:
$$\int u\,dv = uv - \int v\,du.$$
Good for $\int x e^x\,dx$ and $\int \ln x\,dx$.

### Trig Substitution
kind: technique
prereqs: u-substitution, pythagorean-identity

Replacing $x$ with a trig function so a root simplifies. With $x = \sin\theta$,
$$\sqrt{1 - x^2} = \sqrt{1 - \sin^2\theta} = \cos\theta.$$

### Partial Fractions
kind: technique
prereqs: u-substitution, adding-rational-expressions, linear-systems

Splitting a rational function into simple pieces, adding fractions in reverse:
$$\frac{1}{x(x + 1)} = \frac{1}{x} - \frac{1}{x + 1}.$$

### Improper Integrals
prereqs: ftc, limits-at-infinity

Integrals over infinite intervals, or across a blow-up, defined as limits:
$$\int_1^\infty \frac{1}{x^2}\,dx = \lim_{b \to \infty} \left(1 - \frac{1}{b}\right) = 1,$$
but $\int_1^\infty \frac{1}{x}\,dx$ is infinite.

### Numerical Integration {#trapezoidal-rule}
kind: technique
prereqs: riemann-sums, area-polygons

When no antiderivative can be found, approximate:
- the trapezoidal rule uses trapezoids instead of rectangles;
- Simpson's rule uses parabolas.

## Applications of Integrals {#integral-applications}

Areas, volumes, lengths and totals, all as accumulations.

### Accumulation & Net Change {#net-change}
prereqs: ftc, motion

Integrating a rate gives the total change. The displacement from time $a$ to time $b$ is
$$\int_a^b v(t)\,dt = s(b) - s(a).$$

### Average Value of a Function {#average-value}
kind: formula
prereqs: ftc, measures-of-center

The mean height of $f$ over $[a, b]$,
$$\bar{f} = \frac{1}{b - a}\int_a^b f(x)\,dx,$$
the height of the rectangle with the same area.

### Area Between Curves
prereqs: ftc, linear-systems

The area between two curves is
$$\int_a^b \big(\text{top} - \text{bottom}\big)\,dx,$$
with the limits where the curves cross.

### Volumes of Revolution {#volumes-of-revolution}
prereqs: area-between-curves, circle-area, volume-prisms

Spin a region around an axis and slice the solid into discs or washers:
$$V = \int \pi r(x)^2\,dx.$$

### Arc Length
kind: formula
prereqs: ftc, distance-formula, power-rule

The length of a curve, adding up tiny hypotenuses:
$$L = \int_a^b \sqrt{1 + f'(x)^2}\,dx.$$

## Differential Equations

Equations about rates of change, whose solutions are functions.

### What a Differential Equation Is {#diffeq-basics}
kind: definition
prereqs: antiderivatives

An equation linking a function to its derivatives, like
$$y' = 0.03y.$$
A solution is a whole function, and an initial condition picks out one of many.

### Slope Fields
prereqs: diffeq-basics, tangent-lines

Drawing a short tangent segment at each point, as the equation dictates, to see the shape of every solution at once.

### Separable Equations
kind: technique
prereqs: diffeq-basics, u-substitution, natural-log

Gather the $y$s with $dy$ and the $x$s with $dx$, then integrate both sides:
$$\frac{dy}{dx} = ky \implies \int \frac{dy}{y} = \int k\,dx.$$

### Exponential Growth Models {#exponential-models}
prereqs: separable-equations, exponential-growth

The equation
$$y' = ky$$
has the solutions
$$y = y_0 e^{kt},$$
so anything growing at a rate proportional to its size grows exponentially.

### Euler's Method
kind: technique
prereqs: slope-fields, linear-approximation

Approximating a solution by walking along tangent lines in small steps:
$$y_{n+1} = y_n + f(x_n, y_n)\,\Delta x.$$

### Logistic Growth
prereqs: separable-equations, partial-fractions

Growth that slows near a ceiling $K$:
$$y' = ky\left(1 - \frac{y}{K}\right)$$
gives the S-shaped curve of populations limited by resources.

## Infinite Series

Adding up infinitely many numbers, and when that makes sense.

### Limits of Sequences {#sequence-limits}
prereqs: sequences, limits-at-infinity

Where the terms of a sequence head, as in
$$\frac{n}{n + 1} \to 1.$$
A sequence converges if it has a limit and diverges otherwise.

### Series & Convergence {#series-convergence}
kind: definition
prereqs: sequence-limits, infinite-geometric-series

An infinite sum converges when its partial sums approach a limit. For example,
$$1 + \frac{1}{2} + \frac{1}{4} + \cdots = 2$$
converges, while
$$1 + \frac{1}{2} + \frac{1}{3} + \cdots$$
grows past any number.

### The nth-Term Test {#nth-term-test}
kind: theorem
prereqs: series-convergence

If the terms don't shrink to 0, the series diverges. The converse fails: the harmonic series has terms shrinking to 0 and still diverges.

### Integral Test & p-Series {#integral-test}
kind: theorem
prereqs: series-convergence, improper-integrals

A series of decreasing positive terms behaves like the matching integral. So the $p$-series
$$\sum_{n=1}^{\infty} \frac{1}{n^p}$$
converges exactly when $p > 1$.

### Comparison Tests
kind: theorem
prereqs: integral-test

Compare to a series you know. A series of positive terms
- below a convergent one converges;
- above a divergent one diverges.

### Ratio Test
kind: theorem
prereqs: series-convergence, factorials

Let
$$L = \lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right|.$$
- If $L < 1$, the series converges, like a geometric series with ratio $L$.
- If $L > 1$, it diverges.
- If $L = 1$, the test decides nothing.

### Alternating Series Test {#alternating-series}
kind: theorem
prereqs: series-convergence

Terms alternating in sign and shrinking steadily to 0 make a convergent series, as in
$$1 - \frac{1}{2} + \frac{1}{3} - \cdots = \ln 2.$$

### Power Series
kind: definition
prereqs: ratio-test, polynomial-functions

Polynomials of infinite degree,
$$\sum_{n=0}^{\infty} c_n (x - a)^n,$$
which converge on an interval around $a$ found with the ratio test.

### Taylor & Maclaurin Series {#taylor-series}
kind: definition
prereqs: power-series, higher-derivatives, factorials

The Taylor series of $f$ about $a$ is
$$\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n;$$
with $a = 0$ it is the Maclaurin series. Common ones:
$$\begin{aligned} e^x &= \sum_{n=0}^{\infty} \frac{x^n}{n!} \\ \sin x &= \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n + 1)!} \\ \cos x &= \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} \\ \frac{1}{1 - x} &= \sum_{n=0}^{\infty} x^n \quad (|x| < 1) \end{aligned}$$
