# Calculus
color: #2f4f86

The mathematics of change and accumulation: the slopes of curves, the areas under them, and the theorem that says these are two sides of one idea.

## Limits & Continuity {#limits}

What a function approaches, as opposed to what it equals: the idea underneath all of calculus.

### The Idea of a Limit {#limit-concept}
kind: definition
prereqs: function-notation, function-graphs

$\lim_{x \to a} f(x) = L$ means $f(x)$ gets as close as you like to $L$ when $x$ is close enough to $a$, whatever happens at $a$ itself. $\frac{x^2 - 1}{x - 1}$ is undefined at 1, yet its limit there is 2.

### One-Sided Limits
prereqs: limit-concept, piecewise-functions

Approaching from the left only ($x \to a^-$) or the right only ($x \to a^+$). The limit exists exactly when the two agree.

### Limit Laws
kind: theorem
prereqs: limit-concept

The limit of a sum, difference, product or quotient is the sum, difference, product or quotient of the limits, as long as no denominator heads to 0. So polynomials can be evaluated by substitution.

### Evaluating Limits Algebraically {#evaluating-limits}
kind: skill
prereqs: limit-laws, factoring-trinomials, rationalizing-denominators

Try substituting first. If that gives $\frac{0}{0}$, rewrite: factor and cancel, rationalise, or combine fractions, then substitute again.

### Limits at Infinity
prereqs: limit-concept, asymptotes

What $f(x)$ approaches as $x$ grows without bound: $\lim_{x \to \infty} \frac{3x^2 + 1}{x^2} = 3$. These are horizontal asymptotes, made precise.

### Squeeze Theorem
kind: theorem
prereqs: limit-laws

If $g(x) \le f(x) \le h(x)$ near $a$, and $g$ and $h$ have the same limit there, then $f$ is squeezed into having it too.

### The Limit of sin x over x {#sinx-over-x}
kind: theorem
prereqs: squeeze-theorem, radians, unit-circle

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

Proved by squeezing areas on the unit circle, with $x$ in radians. It is the key to differentiating every trig function.

### Continuity
kind: definition
prereqs: one-sided-limits, limit-laws

$f$ is continuous at $a$ when $\lim_{x \to a} f(x) = f(a)$: the graph has no hole, jump or blow-up there, and could be drawn without lifting the pencil.

### Intermediate Value Theorem {#ivt}
kind: theorem
prereqs: continuity

A function continuous on $[a, b]$ takes every value between $f(a)$ and $f(b)$. If it is negative at one end and positive at the other, it has a zero in between.

### The Formal Definition of a Limit {#epsilon-delta}
kind: definition
prereqs: limit-concept, absolute-value-inequalities

$\lim_{x \to a} f(x) = L$ means: for every $\varepsilon > 0$ there is a $\delta > 0$ such that $0 < |x - a| < \delta$ guarantees $|f(x) - L| < \varepsilon$. A challenge and a response, made exact.

## Derivatives

The instantaneous rate of change: the slope of a curve at a point.

### The Derivative {#derivative-definition}
kind: definition
prereqs: difference-quotient, evaluating-limits

The slope of a curve at a single point. A secant line through $(x, f(x))$ and a nearby point $(x + h, f(x + h))$ has slope given by the [[difference-quotient]]. Let the second point slide in toward the first and the secant turns into the tangent:

$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

**Example.** For $f(x) = x^2$,

$$\frac{(x + h)^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h \;\longrightarrow\; 2x \quad\text{as } h \to 0.$$

So $f'(x) = 2x$, and at $x = 3$ the parabola is climbing with slope 6. The derivative is itself a function, the rate of change of $f$ everywhere: velocity from position, marginal cost from cost.

```quiz
Q: If $f(x) = x^2$, what is $f'(3)$?
A: 6
Why: $f'(x) = 2x$, so $f'(3) = 6$.

Q: The derivative $f'(a)$ is the slope of
- the secant line from $x = 0$ to $x = a$
+ the tangent line at $x = a$
- the line through the origin and $(a, f(a))$
- the normal line at $x = a$
Why: It is the limit of secant slopes as the second point closes in: the tangent's slope.

Q: Using the definition, what is the derivative of $f(x) = 5x + 2$?
A: 5
Why: $\frac{5(x + h) + 2 - (5x + 2)}{h} = \frac{5h}{h} = 5$. A line's derivative is its slope.
```

### Differentiability
prereqs: derivative-definition, continuity

A function is differentiable where that limit exists. Differentiable implies continuous, but not the other way: $|x|$ is continuous at 0 and has a corner there.

### Tangent Lines
kind: skill
prereqs: derivative-definition, point-slope

The tangent to $y = f(x)$ at $x = a$ is $y - f(a) = f'(a)(x - a)$: a point from $f$, a slope from $f'$.

### The Power Rule {#power-rule}
kind: theorem
prereqs: derivative-definition, exponent-laws

$$\frac{d}{dx} x^n = n x^{n-1}$$

Bring the power down in front and lower it by one: $\frac{d}{dx}x^5 = 5x^4$. It holds for any real power, so roots and reciprocals are covered too: $\frac{d}{dx}\sqrt{x} = \frac{d}{dx}x^{1/2} = \frac{1}{2}x^{-1/2}$.

```quiz
Q: $\frac{d}{dx} x^7 = \;?$
- $x^6$
- $7x^7$
+ $7x^6$
- $6x^7$
Why: Down comes the 7, and the power drops to 6.

Q: What is the derivative of $x^3$ at $x = 2$?
A: 12
Why: $3x^2 = 3 \cdot 4 = 12$.

Q: $\frac{d}{dx}\, \frac{1}{x} = \;?$
+ $-\frac{1}{x^2}$
- $\frac{1}{x^2}$
- $\ln x$
- $-\frac{1}{x}$
Hint: Write $\frac{1}{x}$ as $x^{-1}$.
Why: $\frac{d}{dx}x^{-1} = -1 \cdot x^{-2} = -\frac{1}{x^2}$.
```

### Sum & Constant Multiple Rules {#derivative-linearity}
kind: theorem
prereqs: derivative-definition, limit-laws

Differentiate term by term, and constants ride along: $\frac{d}{dx}\left(3x^2 + 5x\right) = 6x + 5$.

### Product Rule
kind: theorem
prereqs: derivative-linearity

$(fg)' = f'g + fg'$. Not $f'g'$: think of a rectangle whose sides both grow.

### Quotient Rule
kind: theorem
prereqs: product-rule

$\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$: the product rule applied to $f \cdot \frac{1}{g}$.

### Chain Rule
kind: theorem
prereqs: composition, derivative-linearity

The derivative of a composition multiplies the rates: $\frac{d}{dx} f(g(x)) = f'(g(x))\,g'(x)$. If $y$ changes 3 times as fast as $u$, and $u$ twice as fast as $x$, then $y$ changes 6 times as fast as $x$.

### Derivatives of Trig Functions {#trig-derivatives}
kind: formula
prereqs: sinx-over-x, sum-difference-formulas, derivative-definition

$\frac{d}{dx}\sin x = \cos x$ and $\frac{d}{dx}\cos x = -\sin x$, with $x$ in radians. The others follow from the quotient rule: $\frac{d}{dx}\tan x = \sec^2 x$.

### Derivatives of Exponentials & Logarithms {#exp-log-derivatives}
kind: formula
prereqs: number-e, natural-log, chain-rule

$e^x$ is its own derivative, which is what makes $e$ special, and $\frac{d}{dx}\ln x = \frac{1}{x}$. Other bases pick up a constant: $\frac{d}{dx}2^x = 2^x \ln 2$.

### Implicit Differentiation
kind: technique
prereqs: chain-rule

Differentiating an equation like $x^2 + y^2 = 25$ without solving for $y$: treat $y$ as a function of $x$ and use the chain rule, so $2x + 2y\,y' = 0$ and $y' = -\frac{x}{y}$.

### Derivatives of Inverse Functions {#inverse-derivatives}
prereqs: implicit-differentiation, inverse-functions, inverse-trig-functions

Flip the slope of the original at the matching point. So $\frac{d}{dx}\arctan x = \frac{1}{1 + x^2}$ and $\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1 - x^2}}$.

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

Near a point a curve looks like its tangent line, so $f(a + \Delta x) \approx f(a) + f'(a)\,\Delta x$. That is how $\sqrt{4.1} \approx 2.025$ in your head.

### Critical Points
kind: definition
prereqs: differentiability

Points where $f' = 0$ or $f'$ doesn't exist: the only places a smooth function can turn around.

### Extreme Value Theorem {#evt}
kind: theorem
prereqs: continuity

A function continuous on a closed interval $[a, b]$ reaches a maximum and a minimum there, at a critical point or an endpoint.

### Rolle's Theorem
kind: theorem
prereqs: critical-points, evt

If a smooth function starts and ends at the same height, somewhere in between its slope is 0.

### Mean Value Theorem {#mvt}
kind: theorem
prereqs: rolles-theorem

Somewhere on $[a, b]$ the instantaneous rate equals the average rate: $f'(c) = \frac{f(b) - f(a)}{b - a}$. Average 60 mph on a trip, and at some moment the speedometer read exactly 60.

### First Derivative Test
kind: theorem
prereqs: critical-points, mvt

Where $f' > 0$ the function rises, and where $f' < 0$ it falls. A critical point where $f'$ switches from $+$ to $-$ is a local maximum; from $-$ to $+$, a local minimum.

### Concavity & the Second Derivative {#concavity}
kind: theorem
prereqs: higher-derivatives, first-derivative-test

$f'' > 0$ means the graph bends upward like a cup, $f'' < 0$ downward like a cap. Inflection points are where the bending changes direction.

### Curve Sketching
kind: skill
prereqs: concavity, limits-at-infinity, asymptotes

Putting it all together: domain, intercepts, asymptotes, where $f$ rises and falls, where it bends which way, then the sketch.

### Optimization
kind: technique
prereqs: first-derivative-test, evt

Finding the best: write the quantity to maximise or minimise as a function of one variable, find its critical points, and check them and the endpoints.

### L'Hôpital's Rule {#lhopital}
kind: theorem
prereqs: mvt, limits-at-infinity

For limits of the form $\frac{0}{0}$ or $\frac{\infty}{\infty}$, $\lim \frac{f}{g} = \lim \frac{f'}{g'}$ when the latter exists. Differentiate the top and the bottom separately, not as a quotient.

### Position, Velocity & Acceleration {#motion}
prereqs: higher-derivatives

Velocity is the derivative of position, and acceleration the derivative of velocity. A thrown ball has $s(t) = -4.9t^2 + v_0 t$, so $v(t) = -9.8t + v_0$.

## Integrals

Accumulation: adding up infinitely many infinitely thin pieces.

### Antiderivatives
kind: definition
prereqs: power-rule, trig-derivatives, exp-log-derivatives

Running a derivative backwards: $\int x^2\,dx = \frac{x^3}{3} + C$. The $+C$ is there because every constant has derivative 0.

### Riemann Sums
kind: definition
prereqs: sigma-notation, area-basic, function-notation

Approximating the area under a curve with rectangles: $\sum f(x_i)\,\Delta x$. Thinner rectangles give a better fit.

### The Definite Integral {#definite-integral}
kind: definition
prereqs: riemann-sums, limit-concept

The limit of the Riemann sums as the rectangles get thinner: $\int_a^b f(x)\,dx$, the signed area between the curve and the axis, counting area below the axis as negative.

### Properties of Integrals {#integral-properties}
kind: theorem
prereqs: definite-integral

Integrals split over intervals, $\int_a^b + \int_b^c = \int_a^c$, run backwards with a sign change, and add and scale term by term.

### The Fundamental Theorem of Calculus {#ftc}
kind: theorem
prereqs: definite-integral, antiderivatives, mvt

Differentiation and integration undo each other. If $F$ is any antiderivative of a continuous $f$, so that $F' = f$, then

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

and, the other way round, the area accumulated up to $x$ grows at exactly the rate $f(x)$:

$$\frac{d}{dx}\int_a^x f(t)\,dt = f(x)$$

Before this theorem, finding an area meant adding up infinitely many slivers. After it, an antiderivative is enough: $\int_0^2 x^2\,dx = \frac{2^3}{3} - \frac{0^3}{3} = \frac{8}{3}$.

```quiz
Q: $\int_0^2 x^2\,dx = \;?$
A: 8/3
Hint: An antiderivative of $x^2$ is $\frac{x^3}{3}$.
Why: $\frac{8}{3} - 0 = \frac{8}{3}$.

Q: $\frac{d}{dx}\int_0^x \cos t\,dt = \;?$
- $\sin x$
+ $\cos x$
- $-\sin x$
- $0$
Why: The second part of the theorem: differentiating the accumulated area gives back the integrand.

Q: $\int_1^3 2x\,dx = \;?$
A: 8
Why: An antiderivative is $x^2$, and $9 - 1 = 8$.
```

### u-Substitution {#u-substitution}
kind: technique
prereqs: ftc, chain-rule

The chain rule in reverse: spot an inside function $u$ whose derivative is also present. $\int 2x\cos(x^2)\,dx = \int \cos u\,du = \sin(x^2) + C$.

### Integration by Parts
kind: technique
prereqs: u-substitution, product-rule

The product rule in reverse: $\int u\,dv = uv - \int v\,du$. Good for $\int x e^x\,dx$ and $\int \ln x\,dx$.

### Trig Substitution
kind: technique
prereqs: u-substitution, pythagorean-identity

Replacing $x$ with a trig function so a root simplifies: $x = \sin\theta$ turns $\sqrt{1 - x^2}$ into $\cos\theta$.

### Partial Fractions
kind: technique
prereqs: u-substitution, adding-rational-expressions, linear-systems

Splitting a rational function into simple pieces, adding fractions in reverse: $\frac{1}{x(x + 1)} = \frac{1}{x} - \frac{1}{x + 1}$.

### Improper Integrals
prereqs: ftc, limits-at-infinity

Integrals over infinite intervals, or across a blow-up, defined as limits. $\int_1^\infty \frac{1}{x^2}\,dx = 1$, but $\int_1^\infty \frac{1}{x}\,dx$ is infinite.

### Numerical Integration {#trapezoidal-rule}
kind: technique
prereqs: riemann-sums, area-polygons

When no antiderivative can be found, approximate: the trapezoidal rule uses trapezoids instead of rectangles, and Simpson's rule uses parabolas.

## Applications of Integrals {#integral-applications}

Areas, volumes, lengths and totals, all as accumulations.

### Accumulation & Net Change {#net-change}
prereqs: ftc, motion

Integrating a rate gives the total change: $\int_a^b v(t)\,dt$ is the displacement from time $a$ to time $b$.

### Average Value of a Function {#average-value}
kind: formula
prereqs: ftc, measures-of-center

The mean height of $f$ over $[a, b]$: $\frac{1}{b - a}\int_a^b f(x)\,dx$, the height of the rectangle with the same area.

### Area Between Curves
prereqs: ftc, linear-systems

$\int_a^b \big(\text{top} - \text{bottom}\big)\,dx$, with the limits where the curves cross.

### Volumes of Revolution {#volumes-of-revolution}
prereqs: area-between-curves, circle-area, volume-prisms

Spin a region around an axis and slice the solid into discs or washers: $V = \int \pi r(x)^2\,dx$.

### Arc Length
kind: formula
prereqs: ftc, distance-formula, power-rule

The length of a curve, adding up tiny hypotenuses: $L = \int_a^b \sqrt{1 + f'(x)^2}\,dx$.

## Differential Equations

Equations about rates of change, whose solutions are functions.

### What a Differential Equation Is {#diffeq-basics}
kind: definition
prereqs: antiderivatives

An equation linking a function to its derivatives, like $y' = 0.03y$. A solution is a whole function, and an initial condition picks out one of many.

### Slope Fields
prereqs: diffeq-basics, tangent-lines

Drawing a short tangent segment at each point, as the equation dictates, to see the shape of every solution at once.

### Separable Equations
kind: technique
prereqs: diffeq-basics, u-substitution, natural-log

Gather the $y$s with $dy$ and the $x$s with $dx$, then integrate both sides: $\frac{dy}{dx} = ky$ becomes $\int \frac{dy}{y} = \int k\,dx$.

### Exponential Growth Models {#exponential-models}
prereqs: separable-equations, exponential-growth

$y' = ky$ has the solutions $y = y_0 e^{kt}$: anything growing at a rate proportional to its size grows exponentially.

### Euler's Method
kind: technique
prereqs: slope-fields, linear-approximation

Approximating a solution by walking along tangent lines in small steps: $y_{n+1} = y_n + f(x_n, y_n)\,\Delta x$.

### Logistic Growth
prereqs: separable-equations, partial-fractions

Growth that slows near a ceiling: $y' = ky(1 - y/K)$ gives the S-shaped curve of populations limited by resources.

## Infinite Series

Adding up infinitely many numbers, and when that makes sense.

### Limits of Sequences {#sequence-limits}
prereqs: sequences, limits-at-infinity

Where the terms of a sequence head: $\frac{n}{n + 1} \to 1$. A sequence converges if it has a limit and diverges otherwise.

### Series & Convergence {#series-convergence}
kind: definition
prereqs: sequence-limits, infinite-geometric-series

An infinite sum converges when its partial sums approach a limit. $1 + \frac12 + \frac14 + \cdots = 2$ converges; $1 + \frac12 + \frac13 + \cdots$ grows past any number.

### The nth-Term Test {#nth-term-test}
kind: theorem
prereqs: series-convergence

If the terms don't shrink to 0, the series diverges. The converse fails: the harmonic series has terms shrinking to 0 and still diverges.

### Integral Test & p-Series {#integral-test}
kind: theorem
prereqs: series-convergence, improper-integrals

A series of decreasing positive terms behaves like the matching integral. So $\sum \frac{1}{n^p}$ converges exactly when $p > 1$.

### Comparison Tests
kind: theorem
prereqs: integral-test

Compare to a series you know: below a convergent one converges, above a divergent one diverges.

### Ratio Test
kind: theorem
prereqs: series-convergence, factorials

If $\left|\frac{a_{n+1}}{a_n}\right|$ approaches $L < 1$ the series converges, like a geometric series with ratio $L$; if $L > 1$ it diverges.

### Alternating Series Test {#alternating-series}
kind: theorem
prereqs: series-convergence

Terms alternating in sign and shrinking steadily to 0 make a convergent series: $1 - \frac12 + \frac13 - \cdots = \ln 2$.

### Power Series
kind: definition
prereqs: ratio-test, polynomial-functions

Polynomials of infinite degree, $\sum c_n (x - a)^n$, which converge on an interval around $a$ found with the ratio test.

### Taylor & Maclaurin Series {#taylor-series}
kind: definition
prereqs: power-series, higher-derivatives, factorials

Writing a function as a power series built from its derivatives at one point:

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n, \qquad e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$
