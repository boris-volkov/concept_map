# Algebra
color: #8f2d2d

The language of unknown quantities: the rules for working with symbols that stand for numbers, and the functions built from them.

## Axioms {#axioms}

The axioms of the real numbers, taken without proof.

### Closure
kind: axiom
prereqs: number-systems

For all $a, b \in \mathbb{R}$: $a + b \in \mathbb{R}$ and $ab \in \mathbb{R}$.

### The Field Axioms: CANI CANI D {#field-axioms}
wrap: 4

The axioms of addition and multiplication on $\mathbb{R}$, remembered, as Frederic Schuller teaches them, as **CANI CANI D**: **C**ommutativity, **A**ssociativity, a **N**eutral element and **I**nverses, first for addition and then for multiplication, and finally **D**istributivity, which links the two.

| | Addition | Multiplication |
| --- | --- | --- |
| **C** | $a + b = b + a$ | $ab = ba$ |
| **A** | $(a + b) + c = a + (b + c)$ | $(ab)c = a(bc)$ |
| **N** | $a + 0 = a$ | $a \cdot 1 = a$ |
| **I** | $a + (-a) = 0$ | $a \cdot a^{-1} = 1$ for $a \ne 0$ |
| **D** | $a(b + c) = ab + ac$ | |

#### Commutativity of Addition {#add-commutative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b \in \mathbb{R}$: $a + b = b + a$.

#### Associativity of Addition {#add-associative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b, c \in \mathbb{R}$: $(a + b) + c = a + (b + c)$.

#### Neutral Element of Addition {#add-neutral}
kind: axiom
prereqs: number-systems

There is an element $0 \in \mathbb{R}$ such that $a + 0 = a$ for all $a \in \mathbb{R}$.

#### Additive Inverses {#add-inverse}
kind: axiom
prereqs: integer-addition

For every $a \in \mathbb{R}$ there is an element $-a \in \mathbb{R}$ such that $a + (-a) = 0$.

Subtraction is defined from it: $a - b := a + (-b)$.

#### Commutativity of Multiplication {#mul-commutative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b \in \mathbb{R}$: $ab = ba$.

#### Associativity of Multiplication {#mul-associative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b, c \in \mathbb{R}$: $(ab)c = a(bc)$.

#### Neutral Element of Multiplication {#mul-neutral}
kind: axiom
prereqs: number-systems

There is an element $1 \in \mathbb{R}$, with $1 \ne 0$, such that $a \cdot 1 = a$ for all $a \in \mathbb{R}$.

#### Multiplicative Inverses {#mul-inverse}
kind: axiom
prereqs: reciprocals

For every $a \in \mathbb{R}$ with $a \ne 0$ there is an element $a^{-1} = \frac{1}{a} \in \mathbb{R}$ such that $a \cdot a^{-1} = 1$.

Division is defined from it: $\frac{a}{b} := a \cdot b^{-1}$ for $b \ne 0$.

#### Distributivity {#distributive}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b, c \in \mathbb{R}$:
$$a(b + c) = ab + ac$$

The only axiom relating addition and multiplication. Read left to right it expands a product; read right to left it factors out a common factor.

```quiz
Q: Expand $3(x + 4)$.
- $3x + 4$
+ $3x + 12$
- $3x + 7$
- $7x$
Hint: The 3 multiplies both terms in the bracket.
Why: $3 \cdot x + 3 \cdot 4 = 3x + 12$.

Q: Which equation is an instance of distributivity?
- $x + y = y + x$
+ $5(2 + y) = 10 + 5y$
- $(xy)z = x(yz)$
- $x + 0 = x$
Why: The others are commutativity of addition, associativity of multiplication and the neutral element of addition.

Q: Compute $6 \times 98$ using distributivity.
A: 588
Hint: $98 = 100 - 2$.
Why: $6(100 - 2) = 600 - 12 = 588$.
```

### Properties of Equality {#equality-properties}
kind: axiom
prereqs: number-systems

Equality is reflexive ($a = a$), symmetric (if $a = b$ then $b = a$) and transitive (if $a = b$ and $b = c$ then $a = c$), and equals may be substituted for equals: if $a = b$ then $a + c = b + c$ and $ac = bc$.

### Order Axioms {#order-properties}
kind: axiom
prereqs: number-systems, comparing-numbers

For all $a, b, c \in \mathbb{R}$: exactly one of $a < b$, $a = b$, $a > b$ holds; if $a < b$ then $a + c < b + c$; and if $a < b$ and $c > 0$ then $ac < bc$.

Consequently, if $a < b$ and $c < 0$ then $ac > bc$: multiplying an inequality by a negative number reverses it.

### Completeness Axiom
kind: axiom
prereqs: order-properties

Every non-empty set of real numbers that is bounded above has a least upper bound in $\mathbb{R}$.

The rationals lack this: $\{q \in \mathbb{Q} : q^2 < 2\}$ has no least upper bound in $\mathbb{Q}$. Completeness is what makes limits, the [[ivt|Intermediate Value Theorem]] and the [[evt|Extreme Value Theorem]] work.

## Consequences of the Axioms {#first-theorems}

The first theorems proved from the axioms of the real numbers.

### Multiplication by Zero {#times-zero}
kind: theorem
prereqs: distributive, add-neutral, add-inverse

For all $a \in \mathbb{R}$: $a \cdot 0 = 0$.

*Proof.* $a \cdot 0 = a(0 + 0) = a \cdot 0 + a \cdot 0$; adding $-(a \cdot 0)$ to both sides gives $0 = a \cdot 0$. $\square$

### Product of Negatives {#negative-times-negative}
kind: theorem
prereqs: times-zero, add-inverse

For all $a, b \in \mathbb{R}$: $(-a)(-b) = ab$. In particular $(-1)(-1) = 1$.

*Proof* (for $a = b = 1$). $0 = (-1) \cdot 0 = (-1)\big((-1) + 1\big) = (-1)(-1) + (-1)(1)$, so $(-1)(-1) = -(-1) = 1$. $\square$

### Zero Product Property
kind: theorem
prereqs: times-zero, mul-inverse

For all $a, b \in \mathbb{R}$: if $ab = 0$ then $a = 0$ or $b = 0$.

*Proof.* If $a \ne 0$, multiply both sides by $a^{-1}$: $b = a^{-1} \cdot 0 = 0$. $\square$ It is why a factored equation such as $(x - 2)(x + 5) = 0$ has solutions $x = 2$ and $x = -5$.

## Expressions

Letters standing for numbers, and the rules for rewriting them.

### Variables
kind: definition
prereqs: order-of-operations

A letter that stands for a number we don't know yet, or for any number at all. $3n$ means "three times whatever $n$ is".

### Algebraic Expressions
kind: definition
prereqs: variables

A combination of numbers, variables and operations, like $2x^2 - 5x + 1$, made of terms joined by $+$ and $-$. An expression has a value; it doesn't say anything is equal.

### Evaluating Expressions
kind: skill
prereqs: algebraic-expressions, integer-multiplication

Substituting numbers for the variables and following the order of operations: when $x = -2$, $x^2 - 3x = 4 + 6 = 10$.

### Combining Like Terms {#like-terms}
kind: skill
prereqs: algebraic-expressions, distributive

Terms with the same variables to the same powers can be added: $3x + 5x = 8x$, because $3x + 5x = (3 + 5)x$. But $x$ and $x^2$ are not like terms.

### Expanding Brackets
kind: skill
prereqs: distributive, like-terms

Multiplying out: $2(x - 3) - (x + 1) = 2x - 6 - x - 1 = x - 7$. A minus sign in front of a bracket multiplies every term inside by $-1$.

## Equations & Inequalities {#equations}

Statements that two things are equal, or that one is bigger, and how to find the values that make them true.

### Equations & Solutions {#equations-and-solutions}
kind: definition
prereqs: algebraic-expressions, equality-properties

An equation says two expressions are equal. A solution is a value of the variable that makes it true: $x = 4$ solves $2x + 1 = 9$.

### One-Step Equations
kind: skill
prereqs: equations-and-solutions, add-inverse, mul-inverse

Undo the one operation on the variable by doing its inverse to both sides: $x + 7 = 12$ gives $x = 5$; $3x = 12$ gives $x = 4$.

### Multi-Step Linear Equations {#linear-equations}
kind: skill
prereqs: one-step-equations, like-terms, expanding-brackets

Simplify each side, gather the variable terms on one side, then undo operations in reverse order:

$$3(x - 2) = x + 4 \;\Rightarrow\; 3x - 6 = x + 4 \;\Rightarrow\; 2x = 10 \;\Rightarrow\; x = 5$$

### Literal Equations
kind: skill
prereqs: linear-equations

Solving a formula for one of its letters: from $A = \frac{1}{2}bh$, the height is $h = \frac{2A}{b}$.

### Solving Proportions
kind: skill
prereqs: proportions, one-step-equations

Cross-multiply to clear the fractions: $\frac{x}{6} = \frac{4}{9}$ gives $9x = 24$, so $x = \frac{8}{3}$.

### Linear Inequalities
kind: skill
prereqs: linear-equations, order-properties

Solved like equations, except that multiplying or dividing by a negative flips the sign: $-2x < 6$ gives $x > -3$. The solutions form a ray on the number line.

### Absolute Value Equations
kind: skill
prereqs: linear-equations, absolute-value

$|x - 3| = 5$ means $x - 3$ is 5 or $-5$, so $x = 8$ or $x = -2$: the two points 5 away from 3.

### Absolute Value Inequalities
kind: skill
prereqs: absolute-value-equations, linear-inequalities

$|x - 3| < 5$ means within 5 of 3, so $-2 < x < 8$; $|x - 3| > 5$ means further than 5 away, so $x < -2$ or $x > 8$.

## Functions {#functions}

A function $f : A \to B$ assigns to each element $x$ of a set $A$, its domain, exactly one element $f(x)$ of a set $B$.

The general notions first, then each family of functions: linear, polynomial, quadratic, rational, radical, exponential and logarithmic.

### Function Basics {#function-basics}

Notation, domain and range, graphs, and the ways functions combine and transform.

#### The Coordinate Plane
kind: definition
prereqs: number-line, negative-numbers

Two number lines crossing at right angles, so that every point has an address $(x, y)$: how far across, then how far up.

#### Function Notation
prereqs: variables, evaluating-expressions

$f(x)$ is the output of $f$ at input $x$, and $f(3)$ means "put in 3". If $f(x) = x^2 + 1$ then $f(3) = 10$. It is not $f$ times $x$.

#### Interval Notation
kind: definition
prereqs: linear-inequalities

A compact way to write a stretch of the number line: $[2, 5)$ is $2 \le x < 5$, a square bracket including its end and a round one leaving it out.

#### Domain & Range {#domain-and-range}
prereqs: function-notation, interval-notation

The domain is every input a function accepts; the range is every output it produces. $f(x) = \sqrt{x}$ has domain $[0, \infty)$ because negatives have no real square root.

#### Graphs of Functions {#function-graphs}
prereqs: function-notation, coordinate-plane

The picture of a function: every point $(x, f(x))$. A curve is a function's graph exactly when no vertical line crosses it twice.

#### Composition of Functions {#composition}
prereqs: function-notation

Feeding one function's output into another: $(f \circ g)(x) = f(g(x))$. Order matters: with $f(x) = x^2$ and $g(x) = x + 1$, $f(g(2)) = 9$ but $g(f(2)) = 5$.

#### Inverse Functions
prereqs: composition, domain-and-range

A function $f^{-1}$ that undoes $f$: $f^{-1}(f(x)) = x$. Only functions that never repeat an output have one, and its graph is $f$'s graph reflected in the line $y = x$.

#### Transformations of Graphs {#graph-transformations}
prereqs: function-graphs, function-notation

Changing the formula moves the graph: $f(x) + k$ shifts it up, $f(x - h)$ shifts it right, $a f(x)$ stretches it vertically, and $-f(x)$ flips it over the $x$-axis.

#### Piecewise Functions
prereqs: function-notation, domain-and-range

Functions defined by different rules on different parts of the domain, like the absolute value:

$$|x| = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases}$$

#### Even & Odd Functions {#even-odd-functions}
prereqs: graph-transformations

Even functions are mirror images across the $y$-axis, $f(-x) = f(x)$, like $x^2$; odd functions are symmetric through the origin, $f(-x) = -f(x)$, like $x^3$.

### Linear Functions

Functions whose graphs are straight lines: the simplest relationships, changing at a constant rate.

#### Slope
kind: definition
prereqs: coordinate-plane, ratio, integer-addition

The slope of the line through $(x_1, y_1)$ and $(x_2, y_2)$, with $x_1 \ne x_2$, is
$$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}$$

Positive slope rises, negative falls, zero is horizontal; a vertical line has undefined slope. The [[derivative-definition|derivative]] generalises slope to curves.

```quiz
Q: What is the slope of the line through $(1, 2)$ and $(3, 8)$?
A: 3
Why: $\frac{8 - 2}{3 - 1} = 3$.

Q: What is the slope of the line through $(-2, 5)$ and $(2, 3)$?
A: -1/2
Hint: Subtract in the same order on top and bottom.
Why: $\frac{3 - 5}{2 - (-2)} = -\frac{1}{2}$.

Q: A horizontal line has slope
+ 0
- 1
- undefined
- infinity
Why: $\Delta y = 0$. Vertical lines have undefined slope.
```

#### Slope-Intercept Form {#slope-intercept}
kind: formula
prereqs: slope, function-notation, linear-equations

The line with slope $m$ and $y$-intercept $b$ is $y = mx + b$.

#### Point-Slope Form {#point-slope}
kind: formula
prereqs: slope-intercept

The line with slope $m$ through $(x_1, y_1)$ is $y - y_1 = m(x - x_1)$.

#### Graphing Lines
kind: skill
prereqs: slope-intercept

Plot the intercept, then step by the slope (for $m = \frac{2}{3}$, three right and two up) and draw the line through the points.

#### Parallel & Perpendicular Slopes {#parallel-perpendicular-slopes}
kind: theorem
prereqs: slope, reciprocals

Two non-vertical lines with slopes $m_1$ and $m_2$ are parallel if and only if $m_1 = m_2$, and perpendicular if and only if $m_1 m_2 = -1$.

#### Linear Models
prereqs: slope-intercept, unit-rates

A constant rate of change in a real situation: a taxi charging \$3 plus \$2 per mile costs $C = 2m + 3$. The slope is the rate; the intercept is the starting amount.

#### Average Rate of Change
kind: definition
prereqs: slope, function-notation

How much any function's output changes per unit of input between two points, $\frac{f(b) - f(a)}{b - a}$: the slope of the secant line joining them. A linear function's average rate of change is the same everywhere, which is what makes it linear.

### Polynomials

Sums of powers of $x$ with number coefficients: the most important functions in algebra, and the theorems connecting their factors, zeros and graphs.

#### Polynomials and Their Parts {#polynomial-basics}
kind: definition
prereqs: algebraic-expressions, exponent-laws

A sum of terms $a x^n$ with whole-number powers, like $4x^3 - x + 7$. Its degree is the highest power (3), and its leading coefficient is the number in front of that power (4).

#### Adding & Subtracting Polynomials {#polynomial-addition}
kind: skill
prereqs: polynomial-basics, like-terms

Combine like terms, power by power: $(x^2 + 3x) + (2x^2 - x + 5) = 3x^2 + 2x + 5$.

#### Multiplying Polynomials {#polynomial-multiplication}
kind: skill
prereqs: polynomial-addition, expanding-brackets

Multiply every term of one by every term of the other, then collect: $(x + 2)(x + 3) = x^2 + 5x + 6$.

#### Special Products
kind: formula
prereqs: polynomial-multiplication

For all $a, b$:
$$\begin{aligned} (a + b)^2 &= a^2 + 2ab + b^2 \\ (a - b)^2 &= a^2 - 2ab + b^2 \\ (a + b)(a - b) &= a^2 - b^2 \\ (a + b)^3 &= a^3 + 3a^2 b + 3ab^2 + b^3 \\ (a - b)^3 &= a^3 - 3a^2 b + 3ab^2 - b^3 \end{aligned}$$

#### Factoring Out the GCF {#factoring-gcf}
kind: skill
prereqs: gcf, expanding-brackets, polynomial-basics

Always the first step in factoring: take out what every term shares, $6x^3 - 9x^2 = 3x^2(2x - 3)$.

#### Factoring Trinomials
kind: skill
prereqs: factoring-gcf, polynomial-multiplication

Reverse multiplication: for $x^2 + 5x + 6$, find two numbers that multiply to 6 and add to 5, so $(x + 2)(x + 3)$.

#### Factoring Patterns {#factoring-special-forms}
kind: formula
prereqs: special-products, factoring-gcf

For all $a, b, x, p, q$:
$$\begin{aligned} a^2 - b^2 &= (a - b)(a + b) \\ a^2 + 2ab + b^2 &= (a + b)^2 \\ a^2 - 2ab + b^2 &= (a - b)^2 \\ a^3 - b^3 &= (a - b)(a^2 + ab + b^2) \\ a^3 + b^3 &= (a + b)(a^2 - ab + b^2) \\ x^2 + (p + q)x + pq &= (x + p)(x + q) \\ ax + ay + bx + by &= (a + b)(x + y) \end{aligned}$$

More generally $a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1})$. The sum of squares $a^2 + b^2$ has no factorisation over $\mathbb{R}$.

Order of attack: common factor first, then a pattern above, then grouping, then the quadratic formula or the [[rational-root-theorem]].

#### Polynomial Long Division {#polynomial-division}
kind: skill
prereqs: polynomial-multiplication, long-division

The long division algorithm with powers of $x$ in place of place values: divide leading terms, multiply, subtract, bring down.

#### Synthetic Division
kind: skill
prereqs: polynomial-division

A shortcut for dividing by $(x - a)$ using only the coefficients. The last number it produces is the remainder.

#### Remainder Theorem
kind: theorem
prereqs: polynomial-division, function-notation

Let $p(x)$ be a polynomial and $a$ a number. The remainder on dividing $p(x)$ by $x - a$ is $p(a)$: there is a polynomial $q(x)$ with $p(x) = (x - a)\,q(x) + p(a)$.

#### Factor Theorem
kind: theorem
prereqs: remainder-theorem, zero-product-property

For a polynomial $p(x)$ and a number $a$:
$$(x - a) \text{ divides } p(x) \iff p(a) = 0$$

*Proof.* By the [[remainder-theorem]], $p(x) = (x - a)q(x) + p(a)$, so the remainder vanishes exactly when $p(a) = 0$. $\square$

**Example.** $p(x) = x^3 - 6x^2 + 11x - 6$ has $p(1) = 0$, so $(x - 1) \mid p(x)$, and $p(x) = (x - 1)(x - 2)(x - 3)$.

```quiz
Q: If $p(3) = 0$, which must divide $p(x)$?
- $x + 3$
+ $x - 3$
- $3x$
- $x - \frac{1}{3}$
Why: A zero at $x = a$ gives the factor $x - a$.

Q: Is $x + 2$ a factor of $x^2 + 5x + 6$? Answer yes or no.
A: yes
Hint: Evaluate at $x = -2$.
Why: $p(-2) = 4 - 10 + 6 = 0$, and $x^2 + 5x + 6 = (x + 2)(x + 3)$.

Q: For $p(x) = x^3 - 6x^2 + 11x - 6$, what is $p(2)$?
A: 0
Why: $8 - 24 + 22 - 6 = 0$, so $x - 2$ is a factor.
```

#### Rational Root Theorem
kind: theorem
prereqs: factor-theorem, factors

Let $p(x) = a_n x^n + \cdots + a_1 x + a_0$ have integer coefficients, $a_n \ne 0$. If $\frac{r}{s}$ is a zero of $p$ in lowest terms, then $r \mid a_0$ and $s \mid a_n$.

#### Fundamental Theorem of Algebra
kind: theorem
prereqs: factor-theorem, complex-numbers

Every polynomial of degree $n \ge 1$ with complex coefficients has exactly $n$ complex zeros, counted with multiplicity: $p(x) = a_n(x - z_1)(x - z_2)\cdots(x - z_n)$.

#### Polynomial Functions & End Behavior {#polynomial-functions}
prereqs: polynomial-basics, function-graphs

Polynomial graphs are smooth and unbroken. Far out, the leading term wins: $-2x^3 + 100x$ eventually falls to the right and rises to the left, like $-2x^3$.

#### Zeros & Multiplicity
prereqs: factor-theorem, polynomial-functions

Each factor $(x - a)^k$ gives a zero at $a$ of multiplicity $k$. The graph crosses the axis at a zero of odd multiplicity and bounces off it at one of even multiplicity.

#### Binomial Theorem
kind: theorem
prereqs: special-products, combinations

For all $a, b$ and every integer $n \ge 0$:
$$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k, \qquad \binom{n}{k} = \frac{n!}{k!\,(n - k)!}$$

### Quadratics

Degree-two polynomials: parabolas, and four ways to solve them.

#### Quadratic Functions
kind: definition
prereqs: polynomial-basics, function-graphs

$f(x) = ax^2 + bx + c$ with $a \ne 0$. The graph is a parabola, opening up when $a > 0$ and down when $a < 0$.

#### Vertex Form
kind: formula
prereqs: quadratic-functions, graph-transformations

$f(x) = a(x - h)^2 + k$ shows the vertex $(h, k)$ at a glance: it is $x^2$ stretched by $a$ and moved right $h$ and up $k$.

#### Solving by Factoring {#quadratics-by-factoring}
kind: skill
prereqs: factoring-trinomials, zero-product-property, equations-and-solutions

Get 0 on one side, factor, and set each factor to 0: $x^2 + x - 6 = 0$ is $(x + 3)(x - 2) = 0$, so $x = -3$ or $x = 2$.

#### Solving by Square Roots {#quadratics-by-square-roots}
kind: skill
prereqs: square-roots, one-step-equations

When there is no $x$ term, isolate the square and take both roots: $x^2 = 25$ gives $x = \pm 5$.

#### Completing the Square
kind: skill
prereqs: special-products, quadratics-by-square-roots

Add the number that makes a perfect square: $x^2 + 6x + 2 = 0$ becomes $(x + 3)^2 = 7$, so $x = -3 \pm \sqrt{7}$. Also how vertex form is found.

#### The Quadratic Formula {#quadratic-formula}
kind: formula
prereqs: completing-the-square, simplifying-radicals

For $a \ne 0$, the solutions of $ax^2 + bx + c = 0$ are
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

It follows from [[completing-the-square]] on the general equation. The [[discriminant]] $b^2 - 4ac$ decides whether the solutions are real.

**Example.** $2x^2 + 3x - 2 = 0$: $x = \frac{-3 \pm \sqrt{9 + 16}}{4} = \frac{-3 \pm 5}{4}$, so $x = \frac{1}{2}$ or $x = -2$.

```quiz
Q: In $3x^2 - 7x + 2 = 0$, what is $b$?
- 3
+ −7
- 7
- 2
Why: $b$ is the coefficient of $x$, sign included.

Q: Solve $x^2 - 5x + 6 = 0$. What is the larger solution?
A: 3
Why: $x = \frac{5 \pm \sqrt{25 - 24}}{2}$, which is 3 or 2.

Q: What is $b^2 - 4ac$ for $x^2 + 2x + 5 = 0$?
A: -16
Why: $4 - 20 = -16$; the equation has no real solutions.
```

#### The Discriminant {#discriminant}
kind: definition
prereqs: quadratic-formula

The discriminant of $ax^2 + bx + c$ is $\Delta = b^2 - 4ac$. The equation $ax^2 + bx + c = 0$ has two real solutions if $\Delta > 0$, one repeated solution if $\Delta = 0$, and two complex conjugate solutions if $\Delta < 0$.

### Rational Expressions & Functions {#rational}

Fractions with polynomials on top and bottom: the arithmetic of fractions, grown up.

#### Rational Expressions
kind: definition
prereqs: polynomial-basics, fraction-concept

A ratio of polynomials, like $\frac{x + 1}{x^2 - 4}$. It is undefined wherever the bottom is 0, here at $x = \pm 2$.

#### Simplifying Rational Expressions
kind: skill
prereqs: rational-expressions, factoring-trinomials, simplifying-fractions

Factor the top and bottom and cancel common *factors* (never terms): $\frac{x^2 - 9}{x + 3} = x - 3$, for $x \ne -3$.

#### Multiplying & Dividing Rational Expressions {#multiplying-rational-expressions}
kind: skill
prereqs: simplifying-rational-expressions, dividing-fractions

Exactly as with fractions: multiply across, or multiply by the reciprocal, and factor first so the cancelling is easy.

#### Adding & Subtracting Rational Expressions {#adding-rational-expressions}
kind: skill
prereqs: simplifying-rational-expressions, adding-fractions

Exactly as with fractions: find the least common denominator by factoring, rewrite, then combine the numerators.

$$\frac{1}{x} + \frac{1}{x + 1} = \frac{x + 1}{x(x + 1)} + \frac{x}{x(x + 1)} = \frac{2x + 1}{x(x + 1)}$$

#### Solving Rational Equations
kind: skill
prereqs: adding-rational-expressions, quadratics-by-factoring

Multiply through by the common denominator to clear fractions, solve, then discard any answer that makes a denominator 0.

#### Rational Functions
kind: definition
prereqs: rational-expressions, domain-and-range

Functions $f(x) = \frac{p(x)}{q(x)}$ with polynomials $p$ and $q$. The domain is everything except the zeros of $q$, and that is where the interesting behaviour is.

#### Asymptotes & Holes {#asymptotes}
prereqs: rational-functions, polynomial-functions, simplifying-rational-expressions

Lines a graph approaches but never settles on. Where the bottom is 0 but the top isn't, the graph shoots off along a **vertical asymptote**; far out, the leading terms set a **horizontal** (or slanted) one. A factor that cancels leaves only a **hole**.

$$f(x) = \frac{2x}{x - 1} \quad\text{has}\quad x = 1 \text{ (vertical)} \quad\text{and}\quad y = 2 \text{ (horizontal)}$$

#### Graphing Rational Functions
kind: skill
prereqs: asymptotes, zeros-and-multiplicity

Find the zeros, the asymptotes and the holes, test a point in each region, and sketch the branches.

### Radical Expressions & Functions {#radicals}

Functions built from roots, and equations with variables under a root sign.

#### The Square Root Function {#square-root-function}
prereqs: square-roots, function-graphs, domain-and-range

$f(x) = \sqrt{x}$: half a sideways parabola, starting at the origin and rising ever more slowly. Its domain is $x \ge 0$.

#### Radical Functions
prereqs: square-root-function, nth-roots, graph-transformations

Functions such as $\sqrt{x - 2} + 1$ or $\sqrt[3]{x}$: root functions moved and stretched. Even roots need a non-negative inside; odd roots accept anything.

#### Solving Radical Equations
kind: skill
prereqs: nth-roots, quadratics-by-factoring

Isolate the radical, then raise both sides to the power that undoes it. Squaring can create **extraneous** solutions that do not satisfy the original equation, so always check.

$$\sqrt{x + 2} = x \;\Rightarrow\; x + 2 = x^2 \;\Rightarrow\; (x - 2)(x + 1) = 0$$

Checking: $x = 2$ works ($\sqrt{4} = 2$), but $x = -1$ gives $\sqrt{1} = 1 \ne -1$, so it is extraneous.

#### Roots Undo Powers {#roots-as-inverses}
prereqs: inverse-functions, radical-functions

$\sqrt{x}$ is the inverse of $x^2$ restricted to $x \ge 0$, and $\sqrt[3]{x}$ is the inverse of $x^3$. That is why $\sqrt{x^2} = |x|$, not $x$.

### Exponentials & Logarithms {#exponentials-and-logarithms}

Growth by a constant factor, and the logarithms that measure it.

#### Exponential Functions
kind: definition
prereqs: rational-exponents, function-graphs

$f(x) = a \cdot b^x$: multiplying by $b$ for each step in $x$, rather than adding a fixed amount. With $b > 1$ it grows; with $0 < b < 1$ it decays toward 0.

#### Exponential Growth & Decay {#exponential-growth}
prereqs: exponential-functions, percent-change

Growing by a fixed percent: \$1000 at 5% a year becomes $1000(1.05)^t$. Populations, compound interest, radioactive decay and cooling coffee all work this way.

#### The Number e {#number-e}
kind: definition
prereqs: exponential-growth

$e \approx 2.71828$, the limit of $\left(1 + \frac{1}{n}\right)^n$: what \$1 grows to in a year at 100% interest compounded continuously. It is the natural base for growth.

#### Logarithms
kind: definition
prereqs: exponential-functions, inverse-functions

For $b > 0$, $b \ne 1$ and $x > 0$, $\log_b x$ is the unique real number $y$ with $b^y = x$. Thus $\log_b$ is the inverse of $x \mapsto b^x$; for example $\log_2 8 = 3$.

#### Laws of Logarithms {#log-laws}
kind: theorem
prereqs: logarithms, exponent-laws

For $b > 0$, $b \ne 1$, and $x, y > 0$:
$$\begin{aligned} \log_b(xy) &= \log_b x + \log_b y & \log_b \frac{x}{y} &= \log_b x - \log_b y \\ \log_b x^r &= r \log_b x & \log_b 1 &= 0 \\ b^{\log_b x} &= x & \log_b b^x &= x \end{aligned}$$

#### The Natural Logarithm {#natural-log}
kind: definition
prereqs: logarithms, number-e

$\ln x = \log_e x$, the logarithm to base $e$, and the one calculus prefers.

#### Change of Base
kind: formula
prereqs: log-laws

For $a, b > 0$ with $a, b \ne 1$, and $x > 0$:
$$\log_b x = \frac{\log_a x}{\log_a b} = \frac{\ln x}{\ln b}$$

#### Solving Exponential Equations
kind: skill
prereqs: log-laws, linear-equations

Take a logarithm of both sides to bring the variable down from the exponent: $3^x = 20$ gives $x = \frac{\ln 20}{\ln 3} \approx 2.73$.

#### Graphs of Logarithms {#log-graphs}
prereqs: logarithms, graph-transformations

The exponential graph reflected in $y = x$: it rises without bound but ever more slowly, and has a vertical asymptote at $x = 0$.

## Systems of Equations {#systems}

Several equations sharing unknowns, solved together.

### Systems of Linear Equations {#linear-systems}
kind: definition
prereqs: graphing-lines, linear-equations

Two or more linear equations in the same variables. A solution satisfies all of them at once: for two lines, it is where they cross.

### Solving by Graphing {#systems-by-graphing}
kind: skill
prereqs: linear-systems

Graph both lines and read off the crossing point. Parallel lines never cross (no solution); identical lines cross everywhere (infinitely many).

### Substitution Method
kind: skill
prereqs: linear-systems, literal-equations

Solve one equation for one variable and substitute into the other: from $y = 2x$ and $x + y = 9$, $3x = 9$, so $x = 3$ and $y = 6$.

### Elimination Method
kind: skill
prereqs: linear-systems

Add or subtract multiples of the equations so one variable cancels: $(x + y = 10) - (x - y = 4)$ gives $2y = 6$.

### Systems of Inequalities
kind: skill
prereqs: systems-by-graphing, linear-inequalities

Shade each inequality's half-plane; the solutions are the region where all the shadings overlap.

## Exponents & Radicals

Powers beyond whole numbers, and the roots that undo them.

### Laws of Exponents {#exponent-laws}
kind: theorem
prereqs: exponents, variables

For $a, b > 0$ and real $m, n$:
$$\begin{aligned} a^m a^n &= a^{m+n} & \frac{a^m}{a^n} &= a^{m-n} \\ (a^m)^n &= a^{mn} & (ab)^n &= a^n b^n \\ a^0 &= 1 & a^{-n} &= \frac{1}{a^n} \end{aligned}$$

### Zero & Negative Exponents {#negative-exponents}
kind: definition
prereqs: exponent-laws, reciprocals

Keeping the laws working forces $a^0 = 1$ and $a^{-n} = \frac{1}{a^n}$: each step down in the exponent divides by $a$ once more.

### nth Roots {#nth-roots}
kind: definition
prereqs: square-roots, exponents

$\sqrt[n]{a}$ is the number whose $n$th power is $a$: $\sqrt[3]{8} = 2$ because $2^3 = 8$. Odd roots of negatives exist; even ones don't, among the real numbers.

### Simplifying Radicals
kind: skill
prereqs: nth-roots, prime-factorization

Pull perfect powers out from under the root: $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$.

### Rational Exponents
prereqs: negative-exponents, nth-roots

A fractional exponent is a root: $a^{1/n} = \sqrt[n]{a}$ and $a^{m/n} = \left(\sqrt[n]{a}\right)^m$. So $8^{2/3} = 2^2 = 4$.

### Rationalizing Denominators
kind: skill
prereqs: simplifying-radicals, equivalent-fractions

Multiplying by a form of 1 to clear roots from the bottom: $\frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$, and $\frac{1}{1 + \sqrt{2}}$ uses the conjugate $1 - \sqrt{2}$.

## Conic Sections

The curves you get by slicing a double cone with a plane: circles, ellipses, parabolas and hyperbolas, the graphs of second-degree equations in $x$ and $y$.

### Conic Sections {#conics}
kind: definition
prereqs: circle-equation

Every second-degree equation in $x$ and $y$ draws a circle, an ellipse, a parabola or a hyperbola, and completing the square shows which.

### Parabolas
prereqs: conics, distance-formula, vertex-form

The points equally far from a fixed point, the focus, and a fixed line, the directrix. Satellite dishes and headlights are parabolas because of their focus.

### Ellipses
prereqs: conics, completing-the-square

The points whose distances to two foci add up to a constant: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$. Planets orbit in ellipses with the sun at one focus.

### Hyperbolas
prereqs: ellipses, asymptotes

The points whose distances to two foci differ by a constant: two branches, $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, closing in on a pair of asymptotes.

## Complex Numbers {#complex}
flow: down

Numbers that make every polynomial solvable, built on a square root of $-1$.

### The Imaginary Unit {#imaginary-unit}
kind: definition
prereqs: square-roots, integer-multiplication

$i$ is a number with $i^2 = -1$. No real number does that, so $i$ is new; its powers cycle $i, -1, -i, 1$.

### What a Complex Number Is {#complex-numbers}
kind: definition
prereqs: imaginary-unit, number-systems

A number $a + bi$ with a real part $a$ and an imaginary part $b$. They live on a plane rather than a line, with the reals along one axis.

### Complex Arithmetic
kind: skill
prereqs: complex-numbers, polynomial-multiplication

Add like terms and multiply like binomials, replacing $i^2$ with $-1$: $(2 + i)(3 - i) = 6 + i - i^2 = 7 + i$. Divide using the conjugate.

### Complex Roots of Quadratics {#complex-roots}
prereqs: complex-arithmetic, discriminant

When the discriminant is negative the quadratic formula still works: $x^2 + 2x + 5 = 0$ gives $x = -1 \pm 2i$, a conjugate pair.

## Sequences & Series

Lists of numbers that follow a rule, and what you get by adding them up.

### Sequences
kind: definition
prereqs: function-notation

An ordered list $a_1, a_2, a_3, \ldots$, which is a function whose inputs are the counting numbers. Given by a formula for $a_n$ or by a rule linking each term to the last.

### Arithmetic Sequences
prereqs: sequences

Add the same difference each time: $3, 7, 11, 15, \ldots$ has $a_n = 3 + 4(n - 1)$. A linear function, sampled at whole numbers.

### Geometric Sequences
prereqs: sequences, exponents

Multiply by the same ratio each time: $2, 6, 18, 54, \ldots$ has $a_n = 2 \cdot 3^{n-1}$. An exponential function, sampled at whole numbers.

### Sigma Notation
kind: definition
prereqs: sequences

A capital sigma means "add up": $\sum_{k=1}^{4} k^2 = 1 + 4 + 9 + 16 = 30$.

### Arithmetic Series
kind: formula
prereqs: arithmetic-sequences, sigma-notation

For an arithmetic sequence with first term $a_1$ and $n$-th term $a_n$:
$$\sum_{k=1}^{n} a_k = \frac{n(a_1 + a_n)}{2}, \qquad \text{in particular} \quad \sum_{k=1}^{n} k = \frac{n(n + 1)}{2}$$

### Geometric Series
kind: formula
prereqs: geometric-sequences, sigma-notation

For $r \ne 1$:
$$\sum_{k=0}^{n-1} a r^k = a\,\frac{1 - r^n}{1 - r}$$

### Infinite Geometric Series
kind: theorem
prereqs: geometric-series

If $|r| < 1$ then $\displaystyle\sum_{k=0}^{\infty} a r^k = \frac{a}{1 - r}$; if $|r| \ge 1$ and $a \ne 0$ the series diverges.

### Proof by Induction {#induction}
kind: technique
prereqs: sigma-notation, arithmetic-series

Prove a statement for $n = 1$, then show that whenever it holds for $n$ it holds for $n + 1$. Like dominoes, every case falls.
