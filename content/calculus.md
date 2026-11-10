# Calculus
color: #2f4f86
built-on: algebra, trigonometry

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
kind: definition
prereqs: limit-concept, piecewise-functions

The left-hand limit
$$\lim_{x \to a^-} f(x) = L$$
means that $f(x)$ can be made as close to $L$ as desired by taking $x$ close enough to $a$ with $x < a$. The right-hand limit, written with $x \to a^+$, is the same with $x > a$.

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

1. substitute the value;
2. if that gives a number, it is the limit;
3. if it gives $\frac{0}{0}$, rewrite the expression and substitute again;
4. if it gives a non-zero number over $0$, compare the one-sided limits.

The usual rewrites:
- factor and cancel;
- rationalise;
- combine fractions.

### Limits at Infinity
kind: definition
prereqs: limit-concept, asymptotes

The statement
$$\lim_{x \to \infty} f(x) = L$$
means that $f(x)$ can be made as close to $L$ as desired by taking $x$ large enough. With $x \to -\infty$ it is the same, for $x$ negative and large enough in size. In either case the line $y = L$ is a horizontal asymptote of the graph of $f$.

For instance,
$$\lim_{x \to \infty} \frac{3x^2 + 1}{x^2} = 3.$$

### Infinite Limits {#infinite-limits}
kind: definition
prereqs: one-sided-limits

The statement
$$\lim_{x \to a} f(x) = \infty$$
means that $f(x)$ can be made as large as desired by taking $x$ close enough to $a$, with $x \ne a$. With $-\infty$ it means that $f(x)$ can be made as large and negative as desired. One-sided infinite limits are defined in the same way.

Such a limit does not exist, since $\infty$ is not a number: the notation records the way in which it fails to exist. If any one-sided limit of $f$ at $a$ is $\infty$ or $-\infty$, the line $x = a$ is a vertical asymptote of the graph of $f$.

For instance,
$$\lim_{x \to 0} \frac{1}{x^2} = \infty.$$
```graph
y = 1/x^2
x: -3, 3
y: -0.5, 5
asymptote: x = 0
```

But $\frac{1}{x}$ has no limit at $0$, finite or infinite, because its one-sided limits differ:
$$\begin{aligned} \lim_{x \to 0^-} \frac{1}{x} &= -\infty, \\ \lim_{x \to 0^+} \frac{1}{x} &= \infty. \end{aligned}$$

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
built-on: limits

The instantaneous rate of change: the slope of a curve at a point.

### Increments {#increments}
kind: definition
prereqs: function-notation

An increment is a change in a variable. When $x$ changes from $x_1$ to $x_2$, its increment is
$$\Delta x = x_2 - x_1,$$
and the corresponding increment of $y = f(x)$ is
$$\Delta y = f(x_2) - f(x_1) = f(x_1 + \Delta x) - f(x_1).$$
An increment may be positive, negative or zero. The symbol $\Delta x$ is a single quantity, not $\Delta$ times $x$.

The quotient of the two,
$$\frac{\Delta y}{\Delta x},$$
is the [[average-rate-of-change|average rate of change]] of $f$ from $x_1$ to $x_2$.

**Example.** For $f(x) = x^2$, as $x$ goes from $3$ to $3.1$:
$$\begin{aligned} \Delta x &= 0.1, \\ \Delta y &= 3.1^2 - 3^2 = 0.61. \end{aligned}$$

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
kind: definition
prereqs: derivative-definition

A function $f$ is differentiable at $a$ if the limit
$$f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$$
exists as a finite number. It is differentiable on an open interval if it is differentiable at every point of the interval.

On the graph, differentiable means that near $a$ the curve looks like a single non-vertical line. A function fails to be differentiable at $a$ where it has
- a corner, as $|x|$ does at $0$, where the slopes from the two sides differ;
- a cusp, as $x^{2/3}$ does at $0$;
- a vertical tangent, as $\sqrt[3]{x}$ does at $0$;
- a discontinuity.

The function $|x|$ has slope $-1$ to the left of $0$ and $1$ to the right, so the limit does not exist there:
```graph
y = abs(x)
x: -2, 2
y: -0.5, 2
point: 0, 0 below-right
```

```quiz
Q: Is $f(x) = |x|$ differentiable at $x = 0$? Answer yes or no.
A: no
Why: The difference quotient tends to $-1$ from the left and $1$ from the right.

Q: Is $f(x) = x^2$ differentiable at $x = 0$? Answer yes or no.
A: yes
Why: $f'(0) = 0$.
```

### Differentiable Implies Continuous {#differentiable-implies-continuous}
kind: theorem
prereqs: differentiability, continuity, limit-laws

If $f$ is differentiable at $a$, then $f$ is continuous at $a$. The converse is false.

*Proof.* For $x \ne a$,
$$f(x) - f(a) = \frac{f(x) - f(a)}{x - a} \cdot (x - a).$$
As $x \to a$, the first factor tends to $f'(a)$ and the second to $0$, so $f(x) \to f(a)$ by the [[limit-laws|limit laws]]. $\square$

The function $|x|$ shows that the converse fails: it is continuous at $0$ but not [[differentiability|differentiable]] there.

### Tangent Lines
kind: skill
prereqs: derivative-definition, point-slope

1. find the point, $(a, f(a))$;
2. find the slope, $f'(a)$;
3. put both into [[point-slope|point-slope form]].

The tangent to $y = f(x)$ at $x = a$ is
$$y - f(a) = f'(a)(x - a):$$
a point from $f$, a slope from $f'$.

### Differentials {#differentials}
kind: definition
prereqs: differentiability

Let $y = f(x)$, with $f$ differentiable at $x$.
- The differential $dx$ of the independent variable is itself an independent variable: it may be given any real value.
- The differential $dy$ of the dependent variable is defined by
$$dy = f'(x)\,dx.$$

So $dy$ depends on two things, the point $x$ and the increment $dx$, and for a fixed $x$ it is proportional to $dx$. When $dx \ne 0$, dividing gives
$$\frac{dy}{dx} = f'(x),$$
so that the Leibniz notation for the derivative is a true quotient of differentials.

The differential is not the change in $y$. That is the [[increments|increment]]
$$\Delta y = f(x + dx) - f(x),$$
the rise along the curve, while $dy$ is the rise along the tangent line over the same run $dx$. The two differ by an amount that is small even compared with $dx$:
$$\lim_{dx \to 0} \frac{\Delta y - dy}{dx} = 0.$$

For $y = x^2$ the differential is $dy = 2x\,dx$. At $x = 1$ with $dx = 1$, the tangent rises by $dy = 2$ and the curve by $\Delta y = 3$:
```graph
y = x^2
y = 2x-1 | dashed
x: -0.5, 3.5
y: -1, 4.5
segment: 1, 1, 2, 1
segment: 2, 1, 2, 3
segment: 2, 3, 2, 4 | dashed
label: 1.5, 1 "dx" below
label: 2, 2 "dy" right
label: 2, 3.5 "Δy − dy" right
point: 1, 1 above-left
```

: The Differential and the Increment of $y = x^2$ at $x = 1$
| $dx$ | $dy = 2\,dx$ | $\Delta y = (1 + dx)^2 - 1$ | $\Delta y - dy$ |
| --- | --- | --- | --- |
| $1$ | $2$ | $3$ | $1$ |
| $0.1$ | $0.2$ | $0.21$ | $0.01$ |
| $0.01$ | $0.02$ | $0.0201$ | $0.0001$ |

```quiz
Q: For $y = x^3$, what is $dy$ at $x = 2$ when $dx = 0.1$?
A: 1.2
Why: $dy = 3x^2\,dx = 12(0.1)$.

Q: For $y = f(x)$, the differential $dy$ is the rise over the run $dx$ along
- the graph of $f$
+ the tangent line at $x$
- the secant line from $x$ to $x + dx$
- the $x$-axis
Why: $dy = f'(x)\,dx$, and $f'(x)$ is the slope of the tangent.
```

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

1. differentiate both sides with respect to $x$;
2. apply the chain rule to every term in $y$, which gives a factor of $y'$;
3. gather the terms holding $y'$ on one side;
4. factor out $y'$ and solve for it.

> **!** The derivative of $y^2$ with respect to $x$ is $2y\,y'$, not $2y$.

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
prereqs: inverse-derivatives, trig-derivatives, exp-log-derivatives, product-rule, quotient-rule, chain-rule

Here $u$ and $v$ are differentiable functions of $x$, and $a$, $c$ and $n$ are constants. The last column of each table is the chain rule at work: the same derivative for an inside function $u$.

: Rules
| Rule | Formula |
| --- | --- |
| constant multiple | $(cu)' = cu'$ |
| sum and difference | $(u \pm v)' = u' \pm v'$ |
| product | $(uv)' = u'v + uv'$ |
| triple product | $(uvw)' = u'vw + uv'w + uvw'$ |
| quotient | $\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$ |
| reciprocal | $\left(\dfrac{1}{v}\right)' = -\dfrac{v'}{v^2}$ |
| chain | $\big(f(u)\big)' = f'(u)\,u'$ |
| power | $(u^n)' = nu^{n-1}u'$ |
| inverse | $\big(f^{-1}\big)'(x) = \dfrac{1}{f'\big(f^{-1}(x)\big)}$ |
| logarithmic | $(u^v)' = u^v\left(v'\ln u + \dfrac{vu'}{u}\right)$ |
| repeated product | $(uv)^{(n)} = \displaystyle\sum_{k=0}^{n} \binom{n}{k} u^{(n-k)} v^{(k)}$ |

: Powers and Roots
| $f(x)$ | $f'(x)$ | $\dfrac{d}{dx} f(u)$ |
| --- | --- | --- |
| $c$ | $0$ | $0$ |
| $x$ | $1$ | $u'$ |
| $x^n$ | $nx^{n-1}$ | $nu^{n-1}u'$ |
| $\dfrac{1}{x}$ | $-\dfrac{1}{x^2}$ | $-\dfrac{u'}{u^2}$ |
| $\dfrac{1}{x^n}$ | $-\dfrac{n}{x^{n+1}}$ | $-\dfrac{nu'}{u^{n+1}}$ |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $\dfrac{u'}{2\sqrt{u}}$ |
| $\sqrt[3]{x}$ | $\dfrac{1}{3\sqrt[3]{x^2}}$ | $\dfrac{u'}{3\sqrt[3]{u^2}}$ |
| $\lvert x \rvert$ | $\dfrac{x}{\lvert x \rvert}$ | $\dfrac{uu'}{\lvert u \rvert}$ |

: Exponentials and Logarithms
| $f(x)$ | $f'(x)$ | $\dfrac{d}{dx} f(u)$ |
| --- | --- | --- |
| $e^x$ | $e^x$ | $e^u u'$ |
| $a^x$ | $a^x \ln a$ | $a^u u' \ln a$ |
| $x^x$ | $x^x(1 + \ln x)$ | $u^u u'(1 + \ln u)$ |
| $\ln x$ | $\dfrac{1}{x}$ | $\dfrac{u'}{u}$ |
| $\ln\lvert x \rvert$ | $\dfrac{1}{x}$ | $\dfrac{u'}{u}$ |
| $\log_a x$ | $\dfrac{1}{x \ln a}$ | $\dfrac{u'}{u \ln a}$ |

: Trigonometric Functions
| $f(x)$ | $f'(x)$ | $\dfrac{d}{dx} f(u)$ |
| --- | --- | --- |
| $\sin x$ | $\cos x$ | $u' \cos u$ |
| $\cos x$ | $-\sin x$ | $-u' \sin u$ |
| $\tan x$ | $\sec^2 x$ | $u' \sec^2 u$ |
| $\cot x$ | $-\csc^2 x$ | $-u' \csc^2 u$ |
| $\sec x$ | $\sec x \tan x$ | $u' \sec u \tan u$ |
| $\csc x$ | $-\csc x \cot x$ | $-u' \csc u \cot u$ |

: Inverse Trigonometric Functions
| $f(x)$ | $f'(x)$ | $\dfrac{d}{dx} f(u)$ |
| --- | --- | --- |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1 - x^2}}$ | $\dfrac{u'}{\sqrt{1 - u^2}}$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1 - x^2}}$ | $-\dfrac{u'}{\sqrt{1 - u^2}}$ |
| $\arctan x$ | $\dfrac{1}{1 + x^2}$ | $\dfrac{u'}{1 + u^2}$ |
| $\operatorname{arccot} x$ | $-\dfrac{1}{1 + x^2}$ | $-\dfrac{u'}{1 + u^2}$ |
| $\operatorname{arcsec} x$ | $\dfrac{1}{\lvert x \rvert\sqrt{x^2 - 1}}$ | $\dfrac{u'}{\lvert u \rvert\sqrt{u^2 - 1}}$ |
| $\operatorname{arccsc} x$ | $-\dfrac{1}{\lvert x \rvert\sqrt{x^2 - 1}}$ | $-\dfrac{u'}{\lvert u \rvert\sqrt{u^2 - 1}}$ |

These hold where $\lvert x \rvert < 1$ for $\arcsin$ and $\arccos$, and $\lvert x \rvert > 1$ for $\operatorname{arcsec}$ and $\operatorname{arccsc}$.

: The nth Derivative
| $f(x)$ | $f^{(n)}(x)$ |
| --- | --- |
| $x^m$ | $\dfrac{m!}{(m - n)!}x^{m-n}$, for $n \le m$ |
| $e^{ax}$ | $a^n e^{ax}$ |
| $\sin ax$ | $a^n \sin\left(ax + \dfrac{n\pi}{2}\right)$ |
| $\cos ax$ | $a^n \cos\left(ax + \dfrac{n\pi}{2}\right)$ |
| $\ln x$ | $(-1)^{n-1}\dfrac{(n - 1)!}{x^n}$ |
| $\dfrac{1}{x}$ | $(-1)^n\dfrac{n!}{x^{n+1}}$ |

### Higher Derivatives
kind: definition
prereqs: power-rule

The second derivative of $f$ is the derivative of $f'$, and the $n$-th derivative is the derivative of the one before it:
$$\begin{aligned} f'' &= (f')', \\ f^{(n)} &= \big(f^{(n-1)}\big)'. \end{aligned}$$
For $y = f(x)$ they are also written
$$\frac{d^2y}{dx^2} \quad\text{and}\quad \frac{d^ny}{dx^n}.$$

The second derivative measures how the rate of change is itself changing: acceleration from velocity, or how a graph bends.

**Example.** For $f(x) = x^3$:
$$\begin{aligned} f'(x) &= 3x^2, \\ f''(x) &= 6x, \\ f'''(x) &= 6, \\ f^{(4)}(x) &= 0. \end{aligned}$$

## Applications of Derivatives {#derivative-applications}
built-on: derivatives

What slopes are good for: rates, approximations, and finding the best.

### Related Rates
kind: technique
prereqs: implicit-differentiation

1. identify which rate you know, and which one you need;
2. connect the two with an equation;
3. differentiate implicitly, usually with respect to time;
4. plug in for everything except what you are solving for.

> **!** Do not plug in for variables before differentiating. A quantity that changes must stay a variable until step 3 is done.

When quantities are linked by an equation, their rates are linked by its derivative: how fast a ladder's top slides down a wall as its foot slides out.

**Example.** A 10 m ladder leans on a wall, its foot sliding out at 1 m/s. When the foot is 6 m out, the top is 8 m up. From $x^2 + y^2 = 100$:
$$\begin{aligned} 2x\frac{dx}{dt} + 2y\frac{dy}{dt} &= 0 \\ 2(6)(1) + 2(8)\frac{dy}{dt} &= 0 \\ \frac{dy}{dt} &= -\frac{3}{4} \end{aligned}$$
so the top slides down at $\frac{3}{4}$ m/s.

### Linear Approximation
kind: heuristic
prereqs: tangent-lines

Near a point a curve looks like its tangent line, so
$$f(a + \Delta x) \approx f(a) + f'(a)\,\Delta x.$$
That is how, in your head,
$$\sqrt{4.1} \approx 2 + \frac{1}{4}(0.1) = 2.025.$$

### Increasing & Decreasing Functions {#increasing-decreasing}
kind: definition
prereqs: function-notation, interval-notation

On an interval $I$, a function $f$ is
- increasing if $f(x_1) < f(x_2)$ whenever $x_1 < x_2$ in $I$;
- decreasing if $f(x_1) > f(x_2)$ whenever $x_1 < x_2$ in $I$;
- monotonic if it is one or the other.

With $\le$ and $\ge$ in place of $<$ and $>$, the function is non-decreasing or non-increasing.

For instance, $x^2$ is decreasing on $(-\infty, 0]$ and increasing on $[0, \infty)$, and so is not monotonic on $\mathbb{R}$.

### Local & Absolute Extrema {#extrema}
kind: definition
prereqs: domain-and-range, interval-notation

Let $c$ be in the domain $D$ of $f$. The value $f(c)$ is
- an absolute maximum of $f$ if $f(c) \ge f(x)$ for every $x$ in $D$;
- a local maximum of $f$ if $f(c) \ge f(x)$ for every $x$ in some open interval containing $c$.

An absolute minimum and a local minimum are defined in the same way, with $\le$. Maxima and minima together are called extrema.

A local extremum compares $f(c)$ with the values on both sides of $c$, so an endpoint of the domain is never a local extremum, though it may be an absolute one.

The function $f(x) = x^3 - 3x$ has the local maximum $f(-1) = 2$ and the local minimum $f(1) = -2$. It has no absolute extrema, since it takes arbitrarily large values of both signs:
```graph
y = x^3-3x
x: -2.5, 2.5
y: -3.5, 3.5
point: -1, 2 above
point: 1, -2 below
```

### Critical Points
kind: definition
prereqs: differentiability

A number $c$ in the domain of $f$ is a critical point of $f$ if
$$f'(c) = 0$$
or $f'(c)$ does not exist.

A [[extrema|local extremum]] can occur only at a critical point. The converse is false: $x^3$ has a critical point at $0$ and no extremum there.

### Extreme Value Theorem {#evt}
kind: theorem
prereqs: continuity, completeness-axiom, extrema

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

### Closed Interval Method {#closed-interval-method}
kind: skill
prereqs: critical-points, evt

1. find $f'$;
2. find the critical points inside $[a, b]$;
3. evaluate $f$ at those points and at $a$ and $b$;
4. take the largest value as the maximum and the smallest as the minimum.

> **!** Evaluate $f$, not $f'$, and don't leave out the endpoints.

```quiz
Q: What is the greatest value of $f(x) = x^3 - 3x$ on $[0, 3]$?
A: 18
Why: The critical point $x = 1$ gives $-2$, and the ends give $0$ and $18$.
```

### First Derivative Test
kind: theorem
prereqs: critical-points, mvt, extrema

Let $c$ be a critical point of a continuous $f$. If, at $c$, $f'$
- changes from positive to negative, $f(c)$ is a local maximum;
- changes from negative to positive, $f(c)$ is a local minimum;
- keeps its sign, $f(c)$ is neither.

### Concavity {#concave-up-and-down}
kind: definition
prereqs: derivative-definition, increasing-decreasing

A differentiable function is concave up on an interval if $f'$ is increasing there, and concave down if $f'$ is decreasing there. A point where the concavity changes is an inflection point.

Concave up, the graph bends upward and lies above its tangent lines; concave down, it bends downward and lies below them.

### Concavity & the Second Derivative {#concavity}
kind: theorem
prereqs: concave-up-and-down, higher-derivatives, first-derivative-test

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

> **!** Check the ends of the interval as well as the critical points, and check that the answer makes sense in the problem.

### L'Hôpital's Rule {#lhopital}
kind: theorem
prereqs: mvt, limits-at-infinity

If $\lim f(x)$ and $\lim g(x)$ are both $0$ or both $\pm\infty$, and $\lim \frac{f'(x)}{g'(x)}$ exists, then
$$\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}.$$

### Position, Velocity & Acceleration {#motion}
kind: definition
prereqs: higher-derivatives

If $s(t)$ is the position at time $t$ of a body moving along a line, then its
- velocity is $v(t) = s'(t)$;
- acceleration is $a(t) = v'(t) = s''(t)$;
- speed is $|v(t)|$.

A ball thrown upward from height $s_0$ with speed $v_0$, in metres and seconds, has
$$\begin{aligned} s(t) &= -4.9t^2 + v_0 t + s_0, \\ v(t) &= s'(t) = -9.8t + v_0, \\ a(t) &= v'(t) = -9.8. \end{aligned}$$

## Integrals
built-on: derivatives

Accumulation: adding up infinitely many infinitely thin pieces.

### Antiderivatives
kind: definition
prereqs: power-rule, trig-derivatives, exp-log-derivatives

$F$ is an antiderivative of $f$ on an interval if, there,
$$F'(x) = f(x).$$
Any two antiderivatives of $f$ on an interval differ by a constant, so if $F$ is one of them, every other is $F(x) + C$ for some constant $C$.

### The Indefinite Integral {#indefinite-integral}
kind: definition
prereqs: antiderivatives

The indefinite integral of $f$ is the family of all its antiderivatives on an interval. If $F$ is any one of them,
$$\int f(x)\,dx = F(x) + C.$$
Here $f(x)$ is the integrand, $x$ is the variable of integration, and $C$, an arbitrary constant, is the constant of integration.

> **!** An indefinite integral is a family of functions. A [[definite-integral|definite integral]] is a number.

**Example.**
$$\int x^2\,dx = \frac{x^3}{3} + C,$$
since
$$\frac{d}{dx}\left(\frac{x^3}{3} + C\right) = x^2.$$

### Table of Integrals {#integral-table}
kind: formula
prereqs: antiderivatives, inverse-derivatives, integration-by-parts, trig-substitution, partial-fractions

In the rules, $u$ and $v$ are differentiable functions of $x$, and $F$ is an antiderivative of $f$. In the other tables $a > 0$, and $b$, $c$ and $n$ are constants. Each integral holds up to an added constant $C$, wherever both sides are defined. Each also holds with $x$ replaced by any differentiable function $u$ and $dx$ by $du = u'\,dx$, which is the substitution rule.

: Rules
| Rule | Formula |
| --- | --- |
| constant multiple | $\int cf\,dx = c\int f\,dx$ |
| sum and difference | $\int (f \pm g)\,dx = \int f\,dx \pm \int g\,dx$ |
| substitution | $\int f(u)\,u'\,dx = F(u)$ |
| linear substitution | $\int f(mx + b)\,dx = \dfrac{1}{m}F(mx + b)$, for $m \ne 0$ |
| parts | $\int uv'\,dx = uv - \int u'v\,dx$ |
| repeated parts | $\int uv''\,dx = uv' - u'v + \int u''v\,dx$ |
| power | $\int u^n u'\,dx = \dfrac{u^{n+1}}{n + 1}$, for $n \ne -1$ |
| logarithmic | $\int \dfrac{u'}{u}\,dx = \ln\lvert u \rvert$ |
| exponential | $\int e^u u'\,dx = e^u$ |
| inverse | $\int f^{-1}(x)\,dx = xf^{-1}(x) - F\big(f^{-1}(x)\big)$ |

: Powers and Roots
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $c$ | $cx$ |
| $x$ | $\dfrac{x^2}{2}$ |
| $x^n$, $n \ne -1$ | $\dfrac{x^{n+1}}{n + 1}$ |
| $\dfrac{1}{x}$ | $\ln\lvert x \rvert$ |
| $\dfrac{1}{x^2}$ | $-\dfrac{1}{x}$ |
| $\dfrac{1}{x^n}$, $n \ne 1$ | $-\dfrac{1}{(n - 1)x^{n-1}}$ |
| $\sqrt{x}$ | $\dfrac{2x\sqrt{x}}{3}$ |
| $\dfrac{1}{\sqrt{x}}$ | $2\sqrt{x}$ |
| $\sqrt[3]{x}$ | $\dfrac{3x\sqrt[3]{x}}{4}$ |
| $\lvert x \rvert$ | $\dfrac{x\lvert x \rvert}{2}$ |

: Exponentials and Logarithms
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $e^x$ | $e^x$ |
| $a^x$ | $\dfrac{a^x}{\ln a}$ |
| $\ln x$ | $x\ln x - x$ |
| $\ln\lvert x \rvert$ | $x\ln\lvert x \rvert - x$ |
| $\log_a x$ | $\dfrac{x\ln x - x}{\ln a}$ |

: Trigonometric Functions
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $\sin x$ | $-\cos x$ |
| $\cos x$ | $\sin x$ |
| $\tan x$ | $-\ln\lvert \cos x \rvert$ |
| $\cot x$ | $\ln\lvert \sin x \rvert$ |
| $\sec x$ | $\ln\lvert \sec x + \tan x \rvert$ |
| $\csc x$ | $-\ln\lvert \csc x + \cot x \rvert$ |
| $\sec^2 x$ | $\tan x$ |
| $\csc^2 x$ | $-\cot x$ |
| $\sec x \tan x$ | $\sec x$ |
| $\csc x \cot x$ | $-\csc x$ |

: Powers of Trigonometric Functions
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $\sin^2 x$ | $\dfrac{x}{2} - \dfrac{\sin 2x}{4}$ |
| $\cos^2 x$ | $\dfrac{x}{2} + \dfrac{\sin 2x}{4}$ |
| $\tan^2 x$ | $\tan x - x$ |
| $\cot^2 x$ | $-\cot x - x$ |
| $\sin^3 x$ | $\dfrac{\cos^3 x}{3} - \cos x$ |
| $\cos^3 x$ | $\sin x - \dfrac{\sin^3 x}{3}$ |
| $\sec^3 x$ | $\dfrac{\sec x \tan x + \ln\lvert \sec x + \tan x \rvert}{2}$ |
| $\sin x \cos x$ | $\dfrac{\sin^2 x}{2}$ |

: Inverse Trigonometric Functions
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $\arcsin x$ | $x\arcsin x + \sqrt{1 - x^2}$ |
| $\arccos x$ | $x\arccos x - \sqrt{1 - x^2}$ |
| $\arctan x$ | $x\arctan x - \dfrac{\ln(1 + x^2)}{2}$ |
| $\operatorname{arccot} x$ | $x\operatorname{arccot} x + \dfrac{\ln(1 + x^2)}{2}$ |
| $\operatorname{arcsec} x$ | $x\operatorname{arcsec} x - \ln\left(\lvert x \rvert + \sqrt{x^2 - 1}\right)$ |
| $\operatorname{arccsc} x$ | $x\operatorname{arccsc} x + \ln\left(\lvert x \rvert + \sqrt{x^2 - 1}\right)$ |

These hold where $\lvert x \rvert \le 1$ for $\arcsin$ and $\arccos$, and $\lvert x \rvert \ge 1$ for $\operatorname{arcsec}$ and $\operatorname{arccsc}$.

: Rational Functions
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $\dfrac{1}{1 + x^2}$ | $\arctan x$ |
| $\dfrac{1}{x^2 + a^2}$ | $\dfrac{1}{a}\arctan\dfrac{x}{a}$ |
| $\dfrac{1}{x^2 - a^2}$ | $\dfrac{1}{2a}\ln\left\lvert\dfrac{x - a}{x + a}\right\rvert$ |
| $\dfrac{1}{a^2 - x^2}$ | $\dfrac{1}{2a}\ln\left\lvert\dfrac{x + a}{x - a}\right\rvert$ |
| $\dfrac{x}{x^2 + a^2}$ | $\dfrac{\ln(x^2 + a^2)}{2}$ |
| $\dfrac{1}{(x + a)(x + b)}$, $a \ne b$ | $\dfrac{1}{b - a}\ln\left\lvert\dfrac{x + a}{x + b}\right\rvert$ |

: Roots of Quadratics
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $\dfrac{1}{\sqrt{1 - x^2}}$ | $\arcsin x$ |
| $\dfrac{1}{\sqrt{a^2 - x^2}}$ | $\arcsin\dfrac{x}{a}$ |
| $\dfrac{1}{\sqrt{x^2 + a^2}}$ | $\ln\left(x + \sqrt{x^2 + a^2}\right)$ |
| $\dfrac{1}{\sqrt{x^2 - a^2}}$ | $\ln\left\lvert x + \sqrt{x^2 - a^2}\right\rvert$ |
| $\dfrac{1}{x\sqrt{x^2 - a^2}}$ | $\dfrac{1}{a}\operatorname{arcsec}\dfrac{\lvert x \rvert}{a}$ |
| $\dfrac{x}{\sqrt{x^2 + a^2}}$ | $\sqrt{x^2 + a^2}$ |
| $\sqrt{a^2 - x^2}$ | $\dfrac{x\sqrt{a^2 - x^2}}{2} + \dfrac{a^2}{2}\arcsin\dfrac{x}{a}$ |
| $\sqrt{x^2 + a^2}$ | $\dfrac{x\sqrt{x^2 + a^2}}{2} + \dfrac{a^2}{2}\ln\left(x + \sqrt{x^2 + a^2}\right)$ |
| $\sqrt{x^2 - a^2}$ | $\dfrac{x\sqrt{x^2 - a^2}}{2} - \dfrac{a^2}{2}\ln\left\lvert x + \sqrt{x^2 - a^2}\right\rvert$ |

: Products
| $f(x)$ | $\int f(x)\,dx$ |
| --- | --- |
| $xe^x$ | $(x - 1)e^x$ |
| $x^2 e^x$ | $(x^2 - 2x + 2)e^x$ |
| $x\ln x$ | $\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4}$ |
| $x^n\ln x$, $n \ne -1$ | $\dfrac{x^{n+1}}{n + 1}\ln x - \dfrac{x^{n+1}}{(n + 1)^2}$ |
| $\dfrac{\ln x}{x}$ | $\dfrac{(\ln x)^2}{2}$ |
| $\dfrac{1}{x\ln x}$ | $\ln\lvert \ln x \rvert$ |
| $x\sin x$ | $\sin x - x\cos x$ |
| $x\cos x$ | $\cos x + x\sin x$ |
| $e^{ax}\sin bx$ | $\dfrac{e^{ax}(a\sin bx - b\cos bx)}{a^2 + b^2}$ |
| $e^{ax}\cos bx$ | $\dfrac{e^{ax}(a\cos bx + b\sin bx)}{a^2 + b^2}$ |

: Reduction Formulas
| Integral | Equals |
| --- | --- |
| $\int x^n e^x\,dx$ | $x^n e^x - n\int x^{n-1}e^x\,dx$ |
| $\int x^n \sin x\,dx$ | $-x^n\cos x + n\int x^{n-1}\cos x\,dx$ |
| $\int x^n \cos x\,dx$ | $x^n\sin x - n\int x^{n-1}\sin x\,dx$ |
| $\int (\ln x)^n\,dx$ | $x(\ln x)^n - n\int (\ln x)^{n-1}\,dx$ |
| $\int \sin^n x\,dx$ | $-\dfrac{\sin^{n-1} x\cos x}{n} + \dfrac{n - 1}{n}\int \sin^{n-2} x\,dx$ |
| $\int \cos^n x\,dx$ | $\dfrac{\cos^{n-1} x\sin x}{n} + \dfrac{n - 1}{n}\int \cos^{n-2} x\,dx$ |
| $\int \tan^n x\,dx$ | $\dfrac{\tan^{n-1} x}{n - 1} - \int \tan^{n-2} x\,dx$ |
| $\int \sec^n x\,dx$ | $\dfrac{\sec^{n-2} x\tan x}{n - 1} + \dfrac{n - 2}{n - 1}\int \sec^{n-2} x\,dx$ |

### Riemann Sums
kind: definition
prereqs: sigma-notation, area-basic, function-notation

Divide $[a, b]$ into $n$ subintervals of equal width
$$\Delta x = \frac{b - a}{n},$$
with endpoints $x_i = a + i\,\Delta x$, and choose a sample point $x_i^*$ in the $i$-th subinterval $[x_{i-1}, x_i]$. The Riemann sum of $f$ for these choices is
$$\sum_{i=1}^{n} f(x_i^*)\,\Delta x.$$

It is the total signed area of $n$ rectangles, the $i$-th of width $\Delta x$ and height $f(x_i^*)$, and it approximates the area under the curve. Thinner rectangles give a better fit.

: The Usual Sample Points
| Sum | $x_i^*$ |
| --- | --- |
| left | $x_{i-1}$ |
| right | $x_i$ |
| midpoint | $\dfrac{x_{i-1} + x_i}{2}$ |

### The Definite Integral {#definite-integral}
kind: definition
prereqs: riemann-sums, limit-concept

For $f$ on $[a, b]$, with $\Delta x = \frac{b - a}{n}$ and sample points $x_i^*$ in the $i$-th subinterval:
$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*)\,\Delta x$$
when the limit exists and is the same for every choice of sample points; $f$ is then integrable on $[a, b]$. Here $f(x)$ is the integrand, and $a$ and $b$ are the lower and upper limits of integration.

It is the signed area between the graph and the $x$-axis.

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

1. choose $u$, an inside function whose derivative is also present;
2. find $du$;
3. rewrite the whole integral in terms of $u$;
4. integrate;
5. substitute back.

> **!** In a definite integral, either change the limits to values of $u$, or substitute back before evaluating. Don't mix the two.

The chain rule in reverse: spot an inside function $u$ whose derivative is also present. With $u = x^2$,
$$\int 2x\cos(x^2)\,dx = \int \cos u\,du = \sin(x^2) + C.$$

### Integration by Parts
kind: technique
prereqs: u-substitution, product-rule

1. choose $u$, taking the first of these present: logarithm, inverse trig, algebraic, trig, exponential;
2. take the rest as $dv$, and find $du$ and $v$;
3. substitute into $\int u\,dv = uv - \int v\,du$;
4. evaluate the remaining integral.

It is the product rule in reverse:
$$\int u\,dv = uv - \int v\,du.$$
Good for $\int x e^x\,dx$ and $\int \ln x\,dx$.

### Trig Substitution
kind: technique
prereqs: u-substitution, pythagorean-identity

1. match the root, and substitute: $\sqrt{a^2 - x^2}$ takes $x = a\sin\theta$; $\sqrt{a^2 + x^2}$ takes $x = a\tan\theta$; $\sqrt{x^2 - a^2}$ takes $x = a\sec\theta$;
2. replace $dx$, and simplify the root with a Pythagorean identity;
3. integrate in $\theta$;
4. return to $x$ with a right triangle.

Replacing $x$ with a trig function so a root simplifies. With $x = \sin\theta$,
$$\sqrt{1 - x^2} = \sqrt{1 - \sin^2\theta} = \cos\theta.$$

### Partial Fractions
kind: technique
prereqs: u-substitution, adding-rational-expressions, linear-systems

1. if the top's degree is at least the bottom's, divide first;
2. factor the bottom;
3. write one fraction for each factor, with unknown constants on top;
4. multiply through by the bottom, and solve for the constants;
5. integrate each piece.

This is adding fractions in reverse:
$$\frac{1}{x(x + 1)} = \frac{1}{x} - \frac{1}{x + 1}.$$

### Improper Integrals
kind: definition
prereqs: ftc, limits-at-infinity

An integral over an infinite interval, or of a function that is unbounded on the interval, is defined as a limit of ordinary integrals.
- If $f$ is continuous on $[a, \infty)$:
$$\int_a^\infty f(x)\,dx = \lim_{b \to \infty} \int_a^b f(x)\,dx.$$
- If $f$ is continuous on $(a, b]$ and unbounded near $a$:
$$\int_a^b f(x)\,dx = \lim_{t \to a^+} \int_t^b f(x)\,dx.$$

The other cases are defined in the same way. The integral converges if the limit exists as a finite number, and diverges otherwise.

For instance,
$$\int_1^\infty \frac{1}{x^2}\,dx = \lim_{b \to \infty} \left(1 - \frac{1}{b}\right) = 1$$
converges, but $\int_1^\infty \frac{1}{x}\,dx$ diverges.

### Numerical Integration {#trapezoidal-rule}
kind: technique
prereqs: riemann-sums, area-polygons

When no antiderivative can be found, approximate:
- the trapezoidal rule uses trapezoids instead of rectangles;
- Simpson's rule uses parabolas.

## Applications of Integrals {#integral-applications}
built-on: integrals

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
kind: skill
prereqs: ftc, linear-systems

1. find where the curves meet, for the limits;
2. decide which curve is on top;
3. integrate top minus bottom;
4. if they cross inside the interval, split the integral there.

The area between two curves is
$$\int_a^b \big(\text{top} - \text{bottom}\big)\,dx,$$
with the limits where the curves cross.

### Volumes of Revolution {#volumes-of-revolution}
kind: skill
prereqs: area-between-curves, circle-area, volume-prisms

1. sketch the region and the axis;
2. slice at right angles to the axis;
3. find the outer radius $R$ and the inner radius $r$ of a slice;
4. integrate $\pi(R^2 - r^2)$ along the axis.

Spin a region around an axis and slice the solid into discs or washers:
$$V = \int \pi r(x)^2\,dx.$$

### Arc Length
kind: formula
prereqs: ftc, distance-formula, power-rule

The length of a curve, adding up tiny hypotenuses:
$$L = \int_a^b \sqrt{1 + f'(x)^2}\,dx.$$

## Differential Equations
built-on: integrals

Equations about rates of change, whose solutions are functions.

### What a Differential Equation Is {#diffeq-basics}
kind: definition
prereqs: antiderivatives

A differential equation is an equation relating an unknown function to one or more of its derivatives, like
$$y' = 0.03y.$$
- Its order is the order of the highest derivative in it.
- A solution on an interval is a function that satisfies the equation at every point of the interval.
- The general solution is the family of all its solutions.
- An initial condition $y(x_0) = y_0$ picks out one solution, and the equation together with the condition is an initial value problem.

**Example.** The general solution of $y' = 0.03y$ is
$$y = Ce^{0.03t},$$
and the solution with $y(0) = 100$ is
$$y = 100e^{0.03t}.$$

### Slope Fields
prereqs: diffeq-basics, tangent-lines

Drawing a short tangent segment at each point, as the equation dictates, to see the shape of every solution at once.

### Separable Equations
kind: technique
prereqs: diffeq-basics, u-substitution, natural-log

1. gather the $y$s with $dy$ and the $x$s with $dx$;
2. integrate both sides;
3. add one constant $C$;
4. solve for $y$;
5. find $C$ from any initial condition.

> **!** Add the constant as you integrate, not after solving for $y$.

**Example.**
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

1. start at the initial point $(x_0, y_0)$, and choose a step $\Delta x$;
2. find the slope $f(x_n, y_n)$ there;
3. step along it: $y_{n+1} = y_n + f(x_n, y_n)\,\Delta x$ and $x_{n+1} = x_n + \Delta x$;
4. repeat until you reach the $x$ you want.

Approximating a solution by walking along tangent lines in small steps:
$$y_{n+1} = y_n + f(x_n, y_n)\,\Delta x.$$

### Logistic Growth
prereqs: separable-equations, partial-fractions

Growth that slows near a ceiling $K$:
$$y' = ky\left(1 - \frac{y}{K}\right)$$
gives the S-shaped curve of populations limited by resources.

## Infinite Series
built-on: integrals

Adding up infinitely many numbers, and when that makes sense.

### Limits of Sequences {#sequence-limits}
kind: definition
prereqs: sequences, limits-at-infinity

A sequence $(a_n)$ has the limit $L$, written
$$\lim_{n \to \infty} a_n = L,$$
if for every $\varepsilon > 0$ there is an $N$ such that
$$n > N \implies |a_n - L| < \varepsilon.$$
A sequence converges if it has a limit and diverges otherwise.

For instance,
$$\lim_{n \to \infty} \frac{n}{n + 1} = 1.$$

### Series & Convergence {#series-convergence}
kind: definition
prereqs: sequence-limits, infinite-geometric-series, sigma-notation

An infinite series is the sum $\sum_{n=1}^{\infty} a_n$ of the terms of a sequence. Its $n$-th partial sum is
$$s_n = \sum_{k=1}^{n} a_k = a_1 + a_2 + \cdots + a_n.$$
The series converges, with sum $s$, if its sequence of partial sums converges to $s$:
$$\sum_{n=1}^{\infty} a_n = \lim_{n \to \infty} s_n = s.$$
Otherwise it diverges.

For example,
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

### Absolute & Conditional Convergence {#absolute-convergence}
kind: definition
prereqs: series-convergence, absolute-value

A series $\sum a_n$
- converges absolutely if $\sum |a_n|$ converges;
- converges conditionally if it converges but $\sum |a_n|$ diverges.

Every absolutely convergent series converges.

: Two Alternating Series
| Series | $\sum \lvert a_n \rvert$ | Convergence |
| --- | --- | --- |
| $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$ | $\displaystyle\sum_{n=1}^{\infty} \frac{1}{n^2}$, which converges | absolute |
| $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}$ | $\displaystyle\sum_{n=1}^{\infty} \frac{1}{n}$, which diverges | conditional |

### Choosing a Series Test {#choosing-a-series-test}
kind: skill
prereqs: nth-term-test, comparison-tests, ratio-test

Try these in order:
1. the [[nth-term-test|nth-term test]]: if the terms don't tend to 0, the series diverges;
2. recognise a geometric series or a $p$-series;
3. the [[ratio-test|ratio test]], for factorials and $n$th powers;
4. the [[comparison-tests|comparison tests]], for series that look like a known one;
5. the alternating series test, for alternating signs.

> **!** Terms tending to 0 does not show that a series converges.

### Power Series
kind: definition
prereqs: ratio-test, polynomial-functions

A power series centred at $a$, with coefficients $c_n$, is a series of the form
$$\sum_{n=0}^{\infty} c_n (x - a)^n.$$
It has a radius of convergence $R$, with $0 \le R \le \infty$: the series converges when $|x - a| < R$ and diverges when $|x - a| > R$. The set of all $x$ at which it converges is its interval of convergence.

A power series is a polynomial of infinite degree. Its radius is found with the ratio test, and the two ends of the interval are checked separately.

### Taylor & Maclaurin Series {#taylor-series}
kind: definition
prereqs: power-series, higher-derivatives, factorials

The Taylor series of $f$ about $a$ is
$$\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n;$$
with $a = 0$ it is the Maclaurin series. Common ones:
$$\begin{aligned} e^x &= \sum_{n=0}^{\infty} \frac{x^n}{n!} \\ \sin x &= \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n + 1)!} \\ \cos x &= \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} \\ \frac{1}{1 - x} &= \sum_{n=0}^{\infty} x^n \quad (|x| < 1) \end{aligned}$$
