# Algebra
color: #8f2d2d

The language of unknown quantities: the rules for working with symbols that stand for numbers, and the functions built from them.

## Axioms {#axioms}

The axioms of the real numbers, taken without proof.

### Closure
kind: axiom
prereqs: number-systems

For all $a, b \in \mathbb{R}$:
$$a + b \in \mathbb{R} \quad\text{and}\quad ab \in \mathbb{R}.$$

### The Field Axioms {#field-axioms}
wrap: 4

The axioms of addition and multiplication on $\mathbb{R}$: four for each operation, and distributivity, which links the two.

| | Addition | Multiplication |
| --- | --- | --- |
| Commutativity | $a + b = b + a$ | $ab = ba$ |
| Associativity | $(a + b) + c = a + (b + c)$ | $(ab)c = a(bc)$ |
| Neutral element | $a + 0 = a$ | $a \cdot 1 = a$ |
| Inverses | $a + (-a) = 0$ | $a \cdot a^{-1} = 1$ for $a \ne 0$ |
| Distributivity | $a(b + c) = ab + ac$ | |

#### Commutativity of Addition {#add-commutative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b \in \mathbb{R}$:
$$a + b = b + a.$$

#### Associativity of Addition {#add-associative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b, c \in \mathbb{R}$:
$$(a + b) + c = a + (b + c).$$

#### Neutral Element of Addition {#add-neutral}
kind: axiom
prereqs: number-systems

There is an element $0 \in \mathbb{R}$ such that, for all $a \in \mathbb{R}$,
$$a + 0 = a.$$

#### Additive Inverses {#add-inverse}
kind: axiom
prereqs: integer-addition

For every $a \in \mathbb{R}$ there is an element $-a \in \mathbb{R}$ such that
$$a + (-a) = 0.$$

Subtraction is defined from it:
$$a - b := a + (-b).$$

#### Commutativity of Multiplication {#mul-commutative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b \in \mathbb{R}$:
$$ab = ba.$$

#### Associativity of Multiplication {#mul-associative}
kind: axiom
prereqs: number-systems, properties-of-operations

For all $a, b, c \in \mathbb{R}$:
$$(ab)c = a(bc).$$

#### Neutral Element of Multiplication {#mul-neutral}
kind: axiom
prereqs: number-systems

There is an element $1 \in \mathbb{R}$, with $1 \ne 0$, such that, for all $a \in \mathbb{R}$,
$$a \cdot 1 = a.$$

#### Multiplicative Inverses {#mul-inverse}
kind: axiom
prereqs: reciprocals

For every $a \in \mathbb{R}$ with $a \ne 0$ there is an element $a^{-1} = \frac{1}{a} \in \mathbb{R}$ such that
$$a \cdot a^{-1} = 1.$$

Division is defined from it: for $b \ne 0$,
$$\frac{a}{b} := a \cdot b^{-1}.$$

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

For all $a, b, c \in \mathbb{R}$, equality is
- reflexive: $a = a$;
- symmetric: if $a = b$ then $b = a$;
- transitive: if $a = b$ and $b = c$ then $a = c$;
- substitutive, equals for equals: if $a = b$ then $a + c = b + c$ and $ac = bc$.

### Order Axioms {#order-properties}
kind: axiom
prereqs: number-systems, comparing-numbers

For all $a, b, c \in \mathbb{R}$:
1. exactly one of $a < b$, $a = b$, $a > b$ holds (trichotomy);
2. if $a < b$ and $b < c$ then $a < c$ (transitivity);
3. if $a < b$ then $a + c < b + c$;
4. if $a < b$ and $c > 0$ then $ac < bc$.

Here $a > b$ means $b < a$, and $a \le b$ means $a < b$ or $a = b$. Every other rule for inequalities follows from these four, such as the one that [[multiplying-by-a-negative|multiplying by a negative number]] reverses an inequality.

### Completeness Axiom
kind: axiom
prereqs: order-properties

Every non-empty set of real numbers that is bounded above has a least upper bound in $\mathbb{R}$.

The rationals lack this: $\{q \in \mathbb{Q} : q^2 < 2\}$ has no least upper bound in $\mathbb{Q}$. Completeness is what makes limits, the [[ivt|Intermediate Value Theorem]] and the [[evt|Extreme Value Theorem]] work.

## Consequences of the Axioms {#first-theorems}

Theorems proved from the axioms of the real numbers, each with its proof.

Rules that are usually just stated, such as $(-1)(-1) = 1$, $1 > 0$ and "never divide by zero", follow here from the axioms, one justified step at a time, and the arrows show which earlier results each proof uses. Between them, the proofs practise the main ways of proving things:
- a direct proof, a chain of steps, each justified by an axiom or by a theorem already proved;
- a [[uniqueness-proofs|uniqueness proof]]: suppose there are two, and show that they are equal;
- a [[proof-by-cases|proof by cases]], covering every possibility;
- a [[proof-by-contradiction|proof by contradiction]]: suppose the opposite, and reach something impossible;
- an [[iff-proofs|"if and only if" proof]], one direction at a time.

### Sums & Negatives {#addition-theorems}

What the axioms of addition say about $0$, negatives and subtraction.

#### Uniqueness of Zero
kind: theorem
prereqs: add-neutral, add-commutative

There is only one neutral element of addition: if $z \in \mathbb{R}$ satisfies $a + z = a$ for every $a \in \mathbb{R}$, then $z = 0$.

*Proof*, the simplest [[uniqueness-proofs|uniqueness proof]]: suppose $z$ is neutral too, and use each of the two neutral elements once.
$$\begin{aligned} z &= z + 0 && 0 \text{ is neutral} \\ &= 0 + z && \text{commutativity} \\ &= 0. && z \text{ is neutral} \quad \square \end{aligned}$$

The same argument shows that $1$ is the only neutral element of multiplication.

#### Uniqueness of Negatives
kind: theorem
prereqs: add-inverse, add-associative, add-commutative, add-neutral

Each number has only one negative: for all $a, b \in \mathbb{R}$, if $a + b = 0$, then $b = -a$.

*Proof.* Start from $b$, and bring in $a + (-a) = 0$:
$$\begin{aligned} b &= b + 0 && \text{neutral element} \\ &= b + \big(a + (-a)\big) && \text{inverses} \\ &= (b + a) + (-a) && \text{associativity} \\ &= (a + b) + (-a) && \text{commutativity} \\ &= 0 + (-a) && a + b = 0 \\ &= (-a) + 0 && \text{commutativity} \\ &= -a. && \text{neutral element} \quad \square \end{aligned}$$

So to show that a number is $-a$, it is enough to show that it adds to $a$ to make $0$. Several of the theorems below are proved that way.

#### Cancellation Law for Addition {#addition-cancellation}
kind: theorem
prereqs: add-inverse, add-associative, add-neutral, equality-properties

For all $a, b, c \in \mathbb{R}$: if $a + c = b + c$, then $a = b$.

*Proof*, as a [[two-column-proofs|two-column proof]]:

| Statement | Reason |
| --- | --- |
| $a + c = b + c$ | given |
| $(a + c) + (-c) = (b + c) + (-c)$ | equals added to equals |
| $a + \big(c + (-c)\big) = b + \big(c + (-c)\big)$ | associativity |
| $a + 0 = b + 0$ | inverses |
| $a = b$ | neutral element |

This is what "subtracting $c$ from both sides" means. Adding $c$ back undoes it, so it never changes the solutions of an equation.

#### Double Negative
kind: theorem
prereqs: uniqueness-of-negatives

For all $a \in \mathbb{R}$:
$$-(-a) = a.$$

*Proof.* By the [[uniqueness-of-negatives|uniqueness of negatives]], it is enough to show that $a$ adds to $-a$ to make $0$, and it does:
$$(-a) + a = a + (-a) = 0. \qquad \square$$

#### Negative of a Sum
kind: theorem
prereqs: uniqueness-of-negatives, double-negative

For all $a, b \in \mathbb{R}$:
$$-(a + b) = (-a) + (-b).$$
In particular,
$$-(a - b) = b - a.$$

*Proof.* By the [[uniqueness-of-negatives|uniqueness of negatives]], it is enough to show that $(-a) + (-b)$ adds to $a + b$ to make $0$. Regrouping, by associativity and commutativity,
$$\begin{aligned} &(a + b) + \big((-a) + (-b)\big) \\ &= \big(a + (-a)\big) + \big(b + (-b)\big) \\ &= 0 + 0 = 0. \end{aligned}$$
For the second part, apply the first to $a + (-b)$, then the [[double-negative|double negative]]:
$$\begin{aligned} -(a - b) &= (-a) + \big(-(-b)\big) \\ &= (-a) + b = b - a. \qquad \square \end{aligned}$$

It is the rule for a minus sign in front of a bracket, used in [[expanding-brackets|expanding brackets]]:
$$-(x - 3) = 3 - x.$$

### Products & Zero {#multiplication-theorems}

What the axioms say about multiplying by $0$ and by negatives, and why $0$ has no reciprocal.

#### Multiplication by Zero {#times-zero}
kind: theorem
prereqs: distributive, addition-cancellation

For all $a \in \mathbb{R}$:
$$a \cdot 0 = 0.$$

*Proof.* By distributivity and the neutral element, and then commutativity,
$$a \cdot 0 + a \cdot 0 = a(0 + 0) = a \cdot 0 = 0 + a \cdot 0.$$
[[addition-cancellation|Cancelling]] $a \cdot 0$ from both ends leaves
$$a \cdot 0 = 0. \qquad \square$$

#### Negatives in Products
kind: theorem
prereqs: times-zero, uniqueness-of-negatives

For all $a, b \in \mathbb{R}$:
$$(-a)b = -(ab) = a(-b).$$
In particular, multiplying by $-1$ gives the negative:
$$(-1)a = -a.$$

*Proof.* By the [[uniqueness-of-negatives|uniqueness of negatives]], it is enough to show that $(-a)b$ adds to $ab$ to make $0$. By distributivity (from the right, which commutativity allows), inverses and [[times-zero|multiplication by zero]],
$$ab + (-a)b = \big(a + (-a)\big)b = 0 \cdot b = 0.$$
So $(-a)b = -(ab)$, and in the same way $a(-b) = -(ab)$. Taking $a = 1$ gives $(-1)b = -b$. $\square$

#### Product of Negatives {#negative-times-negative}
kind: theorem
prereqs: negatives-in-products, double-negative

For all $a, b \in \mathbb{R}$:
$$(-a)(-b) = ab.$$
In particular,
$$(-1)(-1) = 1.$$

*Proof.* By [[negatives-in-products|negatives in products]], twice, and the [[double-negative|double negative]]:
$$\begin{aligned} (-a)(-b) &= -\big(a(-b)\big) \\ &= -\big(-(ab)\big) = ab. \qquad \square \end{aligned}$$

So "a negative times a negative is a positive" is not a convention: the axioms leave no other choice. For $a = b = 1$ it can be seen directly, from distributivity:
$$\begin{aligned} 0 &= (-1) \cdot 0 \\ &= (-1)\big((-1) + 1\big) \\ &= (-1)(-1) + (-1)(1), \end{aligned}$$
so $(-1)(-1)$ is the negative of $(-1)(1) = -1$, which is $1$.

#### Zero Product Property
kind: theorem
prereqs: times-zero, mul-inverse

For all $a, b \in \mathbb{R}$:
$$ab = 0 \implies a = 0 \text{ or } b = 0.$$

*Proof.* To show that one of two things holds, assume that the first fails, and prove the second. So suppose $a \ne 0$, and multiply $ab = 0$ by $a^{-1}$:
$$\begin{aligned} b &= (a^{-1}a)b = a^{-1}(ab) \\ &= a^{-1} \cdot 0 = 0. \qquad \square \end{aligned}$$

It is why a factored equation such as
$$(x - 2)(x + 5) = 0$$
has the solutions $x = 2$ and $x = -5$.

It needs the inverses. On a clock with six hours, where $6$ counts as $0$,
$$2 \cdot 3 = 0,$$
though neither factor is $0$; on that clock, $2$ has no inverse.

#### No Division by Zero
kind: theorem
prereqs: times-zero, mul-neutral

$0$ has no reciprocal: there is no $x \in \mathbb{R}$ with $0 \cdot x = 1$.

*Proof* [[proof-by-contradiction|by contradiction]]. Suppose that $0 \cdot x = 1$. By commutativity and [[times-zero|multiplication by zero]], $0 \cdot x = x \cdot 0 = 0$, so $1 = 0$; but the axiom of the [[mul-neutral|neutral element]] says that $1 \ne 0$. $\square$

So $\frac{a}{0} = a \cdot 0^{-1}$ has no meaning, and the [[mul-inverse|axiom of inverses]] has to leave $0$ out. If $0$ had a reciprocal, then $1 = 0$, and every number would be $0$:
$$a = a \cdot 1 = a \cdot 0 = 0.$$

#### Cancellation Law for Multiplication {#multiplication-cancellation}
kind: theorem
prereqs: mul-inverse, mul-associative, mul-neutral, equality-properties

For all $a, b, c \in \mathbb{R}$ with $c \ne 0$: if $ac = bc$, then $a = b$.

*Proof.* Multiply both sides by $c^{-1}$, which exists because $c \ne 0$:
$$\begin{aligned} a &= a \cdot 1 && \text{neutral element} \\ &= a(cc^{-1}) && \text{inverses} \\ &= (ac)c^{-1} && \text{associativity} \\ &= (bc)c^{-1} && ac = bc \\ &= b(cc^{-1}) && \text{associativity} \\ &= b \cdot 1 && \text{inverses} \\ &= b. && \text{neutral element} \quad \square \end{aligned}$$

The condition $c \ne 0$ matters:
$$2 \cdot 0 = 3 \cdot 0,$$
but $2 \ne 3$. Forgetting it "proves" that $2 = 1$. Let $a = b = 1$; then
$$\begin{aligned} a^2 &= ab \\ a^2 - b^2 &= ab - b^2 \\ (a + b)(a - b) &= b(a - b) \\ a + b &= b \\ 2 &= 1. \end{aligned}$$
The fourth line cancels $a - b$, which is $0$.

#### Solving $ax + b = c$ {#unique-solution}
kind: theorem
prereqs: addition-cancellation, multiplication-cancellation

For all $a, b, c \in \mathbb{R}$ with $a \ne 0$, the equation $ax + b = c$ has exactly one solution:
$$x = \frac{c - b}{a}.$$

*Proof*, in two parts, as every proof of existence and [[uniqueness-proofs|uniqueness]] is.

*There is a solution.* Substituting it,
$$a \cdot \frac{c - b}{a} + b = (c - b) + b = c.$$

*There is only one.* If $ax + b = c$ and $ay + b = c$, then $ax + b = ay + b$. [[addition-cancellation|Cancelling]] $b$ gives $ax = ay$, and [[multiplication-cancellation|cancelling]] $a \ne 0$ gives $x = y$. $\square$

When $a = 0$ there is no such guarantee: $0x + 1 = 2$ has no solution at all, and every $x$ solves $0x + 1 = 1$.

### The Rules of Fractions {#fraction-theorems}

The rules for fractions, proved from the axioms, with $\frac{a}{b}$ meaning $a \cdot b^{-1}$.

#### Cross-Multiplication
kind: theorem
prereqs: mul-inverse, equality-properties, equivalent-fractions

For all $a, b, c, d \in \mathbb{R}$ with $b, d \ne 0$:
$$\frac{a}{b} = \frac{c}{d} \iff ad = bc.$$

*Proof.* An [[iff-proofs|"if and only if"]] takes two proofs, one in each direction. Both use $b^{-1}b = 1$ and $d^{-1}d = 1$.

(⇒) Suppose that $\frac{a}{b} = \frac{c}{d}$. Multiplying both sides by $bd$ gives $ad = bc$, because
$$\begin{aligned} \frac{a}{b} \cdot bd &= ad, \\ \frac{c}{d} \cdot bd &= bc. \end{aligned}$$

(⇐) Suppose that $ad = bc$. Multiplying both sides by $b^{-1}d^{-1}$ gives $\frac{a}{b} = \frac{c}{d}$, because
$$\begin{aligned} ad \cdot b^{-1}d^{-1} &= \frac{a}{b}, \\ bc \cdot b^{-1}d^{-1} &= \frac{c}{d}. \qquad \square \end{aligned}$$

It is the test for [[equivalent-fractions|equivalent fractions]], and the first step in [[solving-proportions|solving a proportion]]:
$$\frac{2}{3} = \frac{4}{6} \quad\text{because}\quad 2 \cdot 6 = 3 \cdot 4.$$

#### Multiplying & Dividing Fractions {#fraction-products}
kind: theorem
prereqs: multiplication-cancellation, zero-product-property, multiplying-fractions, dividing-fractions

For all $a, b, c, d \in \mathbb{R}$ with $b, d \ne 0$:
$$\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd},$$
and, if also $c \ne 0$,
$$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}.$$

*Proof.* First, $(bd)^{-1} = b^{-1}d^{-1}$. Here $bd \ne 0$, by the [[zero-product-property|zero product property]], and both sides give $1$ when multiplied by $bd$:
$$\begin{aligned} bd \cdot b^{-1}d^{-1} &= (bb^{-1})(dd^{-1}) = 1, \\ bd \cdot (bd)^{-1} &= 1, \end{aligned}$$
so they are equal, by [[multiplication-cancellation|cancellation]]. Then, regrouping,
$$\begin{aligned} \frac{a}{b} \cdot \frac{c}{d} &= ab^{-1}cd^{-1} \\ &= ac \cdot b^{-1}d^{-1} = \frac{ac}{bd}. \end{aligned}$$
Dividing is multiplying by the reciprocal, so for the second rule it is enough to show that the reciprocal of $\frac{c}{d}$ is $\frac{d}{c}$; by the same cancellation it is, since
$$\frac{c}{d} \cdot \frac{d}{c} = (cc^{-1})(dd^{-1}) = 1. \qquad \square$$

#### Sums of Fractions {#fraction-sums}
kind: theorem
prereqs: fraction-products, adding-fractions

For all $a, b, c, d \in \mathbb{R}$ with $b, d \ne 0$:
$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}.$$

*Proof.* Multiplying by $\frac{d}{d} = 1$, or by $\frac{b}{b} = 1$, changes nothing, so, by the [[fraction-products|product rule]],
$$\frac{a}{b} = \frac{ad}{bd} \quad\text{and}\quad \frac{c}{d} = \frac{bc}{bd}.$$
Both now have the factor $(bd)^{-1}$, and distributivity collects it:
$$\begin{aligned} &\frac{a}{b} + \frac{c}{d} \\ &= ad \cdot (bd)^{-1} + bc \cdot (bd)^{-1} \\ &= (ad + bc)(bd)^{-1} = \frac{ad + bc}{bd}. \quad \square \end{aligned}$$

It is the [[adding-fractions|common denominator]] at work: any common denominator gives the same answer, and $bd$ is always one.

### Inequalities {#order-theorems}

What the order axioms, and completeness, say about $<$.

#### Multiplying by a Negative
kind: theorem
prereqs: order-properties, negatives-in-products

For all $a, b, c \in \mathbb{R}$: if $a < b$ and $c < 0$, then $ac > bc$.

*Proof.* First, $-c > 0$: adding $-c$ to both sides of $c < 0$ gives $0 < -c$. Multiplying $a < b$ by the positive number $-c$, and using [[negatives-in-products|negatives in products]],
$$a(-c) < b(-c), \quad\text{that is,}\quad -(ac) < -(bc).$$
Adding $ac + bc$ to both sides leaves
$$bc < ac. \qquad \square$$

So multiplying or dividing an inequality by a negative number reverses it, the rule behind [[linear-inequalities|solving inequalities]]:
$$-2x < 6 \implies x > -3.$$

#### Squares Are Non-Negative {#squares-nonnegative}
kind: theorem
prereqs: order-properties, negative-times-negative

For all $a \in \mathbb{R}$:
$$a^2 \ge 0,$$
and $a^2 = 0$ only when $a = 0$.

*Proof* [[proof-by-cases|by cases]]. By trichotomy, exactly one of these holds:
- $a > 0$: then multiplying $0 < a$ by $a$ gives $0 < a^2$;
- $a = 0$: then $a^2 = 0$;
- $a < 0$: then $-a > 0$, so $0 < (-a)^2$ by the first case, and $(-a)^2 = a^2$ by the [[negative-times-negative|product of negatives]]. $\square$

So no real number has a negative square, such as $-1$ (negative, since [[one-is-positive|one is positive]]): the reason the [[imaginary-unit|imaginary unit]] had to be invented.

#### One Is Positive
kind: theorem
prereqs: squares-nonnegative, mul-neutral

The number $1$ is positive:
$$1 > 0.$$

*Proof.* Since $1 = 1 \cdot 1 = 1^2$, [[squares-nonnegative|squares are non-negative]] gives $1 \ge 0$; and $1 \ne 0$, by the axiom of the [[mul-neutral|neutral element]]. So $1 > 0$. $\square$

Adding $1$ over and over then gives
$$0 < 1 < 2 < 3 < \cdots,$$
so the natural numbers are all different; and adding $-1$ to $0 < 1$ gives $-1 < 0$. Even the most obvious facts need proofs, once everything has to come from the axioms.

#### Reciprocals Reverse Order
kind: theorem
prereqs: one-is-positive, multiplying-by-a-negative

For all $a, b \in \mathbb{R}$: if $0 < a < b$, then
$$0 < \frac{1}{b} < \frac{1}{a}.$$

*Proof.* First, the reciprocal of a positive number $a$ is positive. It is not $0$, since $a \cdot 0 = 0 \ne 1$. Nor is it negative, [[proof-by-contradiction|by contradiction]]: if $\frac{1}{a} < 0$, then multiplying $0 < a$ by the negative number $\frac{1}{a}$ would [[multiplying-by-a-negative|reverse]] it, giving
$$0 \cdot \frac{1}{a} > a \cdot \frac{1}{a},$$
that is, $0 > 1$, against [[one-is-positive|one is positive]].

So, by trichotomy, $\frac{1}{a}$ and $\frac{1}{b}$ are positive, and so is their product. Multiplying $a < b$ by it,
$$a \cdot \frac{1}{a} \cdot \frac{1}{b} < b \cdot \frac{1}{a} \cdot \frac{1}{b},$$
which simplifies to
$$\frac{1}{b} < \frac{1}{a}. \qquad \square$$

A bigger number has a smaller reciprocal:
$$2 < 3, \quad\text{but}\quad \frac{1}{3} < \frac{1}{2}.$$

#### Between Any Two Numbers
kind: theorem
prereqs: reciprocals-reverse-order

For all $a, b \in \mathbb{R}$: if $a < b$, then
$$a < \frac{a + b}{2} < b.$$
So between any two real numbers lies another, and no number has a next one.

*Proof.* Adding $a$ to both sides of $a < b$, and then $b$,
$$2a < a + b \quad\text{and}\quad a + b < 2b.$$
Now $2 = 1 + 1 > 1 > 0$, so $\frac{1}{2} > 0$, being the reciprocal of a positive number, and multiplying both inequalities by $\frac{1}{2}$ gives
$$a < \frac{a + b}{2} < b. \qquad \square$$

In the same way there is no smallest positive number, [[proof-by-contradiction|by contradiction]]: if $\varepsilon$ were the smallest, $\frac{\varepsilon}{2}$ would be positive and smaller.

#### AM–GM Inequality {#am-gm}
kind: theorem
prereqs: squares-nonnegative, square-roots

For all $a, b \in \mathbb{R}$:
$$a^2 + b^2 \ge 2ab,$$
with equality only when $a = b$. So for all $x, y \ge 0$ the arithmetic mean is at least the geometric mean:
$$\frac{x + y}{2} \ge \sqrt{xy}.$$

*Proof.* Start from a square, which [[squares-nonnegative|cannot be negative]], and expand it:
$$0 \le (a - b)^2 = a^2 - 2ab + b^2.$$
Adding $2ab$ to both sides gives the first inequality, with equality only when $a - b = 0$. For the second, take $a = \sqrt{x}$ and $b = \sqrt{y}$, and divide by $2$. $\square$

Starting from a square is the standard way into an inequality. This one shows, for instance, that of all rectangles with the same perimeter, the square has the largest area: sides $x$ and $y$ enclose
$$xy \le \left(\frac{x + y}{2}\right)^2,$$
the area of the square with the same perimeter.

#### Triangle Inequality for Absolute Values {#abs-triangle-inequality}
kind: theorem
prereqs: multiplying-by-a-negative, absolute-value

For all $a, b \in \mathbb{R}$:
$$|a + b| \le |a| + |b|.$$

*Proof* [[proof-by-cases|by cases]], from the definition: $|x| = x$ when $x \ge 0$, and $|x| = -x$ when $x < 0$. Checking each case shows that
$$-|a| \le a \le |a| \quad\text{and}\quad -|b| \le b \le |b|,$$
and adding these,
$$-\big(|a| + |b|\big) \le a + b \le |a| + |b|.$$
If $a + b \ge 0$, the right-hand half is the theorem. If $a + b < 0$, the left-hand half, multiplied by $-1$, which [[multiplying-by-a-negative|reverses it]], is the theorem too:
$$|a + b| = -(a + b) \le |a| + |b|. \qquad \square$$

On the number line, $|a + b|$ is how far $a + b$ lies from $0$: never further than going $|a|$ and then $|b|$. For arrows in the plane, the same inequality says that no side of a [[triangle-inequality|triangle]] is longer than the other two together, which is where its name comes from.

#### Archimedean Property
kind: theorem
prereqs: completeness-axiom, one-is-positive

For every $x \in \mathbb{R}$ there is a natural number $n$ with $n > x$: the natural numbers have no upper bound.

*Proof* [[proof-by-contradiction|by contradiction]]. Suppose that some $x$ is at least every natural number. Then the natural numbers form a non-empty set that is bounded above, so by the [[completeness-axiom|completeness axiom]] they have a least upper bound $s$. As $1 > 0$, $s - 1 < s$; being less than the least upper bound, $s - 1$ is not an upper bound, so some natural number $n$ has
$$n > s - 1, \quad\text{that is,}\quad n + 1 > s.$$
But $n + 1$ is a natural number too, so $s$ is not an upper bound after all. $\square$

So for every $\varepsilon > 0$ some $\frac{1}{n}$ is smaller than $\varepsilon$ (take $n > \frac{1}{\varepsilon}$), which is why $\frac{1}{n}$ [[sequence-limits|tends to zero]]. [[hilbert-continuity|Hilbert]] takes the same property as an axiom of geometry.

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

Substituting numbers for the variables and following the order of operations. When $x = -2$,
$$x^2 - 3x = (-2)^2 - 3(-2) = 4 + 6 = 10.$$

### Combining Like Terms {#like-terms}
kind: skill
prereqs: algebraic-expressions, distributive

Terms with the same variables to the same powers can be added:
$$3x + 5x = (3 + 5)x = 8x.$$
But $x$ and $x^2$ are not like terms.

### Expanding Brackets
kind: skill
prereqs: distributive, like-terms

Multiplying out:
$$2(x - 3) - (x + 1) = 2x - 6 - x - 1 = x - 7.$$
A minus sign in front of a bracket multiplies every term inside by $-1$.

## Equations & Inequalities {#equations}

Statements that two things are equal, or that one is bigger, and how to find the values that make them true.

### Equations & Solutions {#equations-and-solutions}
kind: definition
prereqs: algebraic-expressions, equality-properties

An equation says two expressions are equal. A solution is a value of the variable that makes it true: $x = 4$ solves
$$2x + 1 = 9.$$

### One-Step Equations
kind: skill
prereqs: equations-and-solutions, add-inverse, mul-inverse

Undo the one operation on the variable by doing its inverse to both sides:
$$x + 7 = 12 \implies x = 5,$$
$$3x = 12 \implies x = 4.$$

### Multi-Step Linear Equations {#linear-equations}
kind: skill
prereqs: one-step-equations, like-terms, expanding-brackets

Simplify each side, gather the variable terms on one side, then undo operations in reverse order:

$$\begin{aligned} 3(x - 2) &= x + 4 \\ 3x - 6 &= x + 4 \\ 2x &= 10 \\ x &= 5 \end{aligned}$$

### Literal Equations
kind: skill
prereqs: linear-equations

Solving a formula for one of its letters. From
$$A = \frac{1}{2}bh$$
the height is
$$h = \frac{2A}{b}.$$

### Solving Proportions
kind: skill
prereqs: proportions, one-step-equations

Cross-multiply to clear the fractions:
$$\begin{aligned} \frac{x}{6} &= \frac{4}{9} \\ 9x &= 24 \\ x &= \frac{8}{3} \end{aligned}$$

### Linear Inequalities
kind: skill
prereqs: linear-equations, order-properties

Solved like equations, except that multiplying or dividing by a negative flips the sign:
$$-2x < 6 \implies x > -3.$$
The solutions form a ray on the number line.

### Absolute Value Equations
kind: skill
prereqs: linear-equations, absolute-value

An absolute value equation splits in two:
$$|x - 3| = 5 \iff x - 3 = 5 \text{ or } x - 3 = -5,$$
so $x = 8$ or $x = -2$: the two points 5 away from 3.

### Absolute Value Inequalities
kind: skill
prereqs: absolute-value-equations, linear-inequalities

An absolute value is a distance:
- $|x - 3| < 5$ means within 5 of 3, so $-2 < x < 8$;
- $|x - 3| > 5$ means further than 5 away, so $x < -2$ or $x > 8$.

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

$f(x)$ is the output of $f$ at input $x$, and $f(3)$ means "put in 3". If $f(x) = x^2 + 1$ then
$$f(3) = 3^2 + 1 = 10.$$
It is not $f$ times $x$.

#### Interval Notation
kind: definition
prereqs: linear-inequalities

A compact way to write a stretch of the number line:
$$[2, 5) = \{x : 2 \le x < 5\},$$
a square bracket including its end and a round one leaving it out.

#### Domain & Range {#domain-and-range}
prereqs: function-notation, interval-notation

The domain is every input a function accepts; the range is every output it produces. The function
$$f(x) = \sqrt{x}$$
has domain $[0, \infty)$, because negatives have no real square root.

#### Graphs of Functions {#function-graphs}
prereqs: function-notation, coordinate-plane

The picture of a function: every point $(x, f(x))$. A curve is a function's graph exactly when no vertical line crosses it twice.

#### Composition of Functions {#composition}
prereqs: function-notation

Feeding one function's output into another:
$$(f \circ g)(x) = f(g(x)).$$
Order matters: with $f(x) = x^2$ and $g(x) = x + 1$,
$$f(g(2)) = f(3) = 9 \quad\text{but}\quad g(f(2)) = g(4) = 5.$$

#### Inverse Functions
prereqs: composition, domain-and-range

A function $f^{-1}$ that undoes $f$:
$$f^{-1}(f(x)) = x.$$
Only functions that never repeat an output have one, and its graph is $f$'s graph reflected in the line $y = x$.

#### Transformations of Graphs {#graph-transformations}
prereqs: function-graphs, function-notation

Changing the formula moves the graph:
- $f(x) + k$ shifts it up by $k$;
- $f(x - h)$ shifts it right by $h$;
- $a f(x)$ stretches it vertically by $a$;
- $-f(x)$ flips it over the $x$-axis.

#### Piecewise Functions
prereqs: function-notation, domain-and-range

Functions defined by different rules on different parts of the domain, like the absolute value:

$$|x| = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases}$$

#### Even & Odd Functions {#even-odd-functions}
prereqs: graph-transformations

Two kinds of symmetry a graph can have:
- Even functions are mirror images across the $y$-axis, like $x^2$:
$$f(-x) = f(x).$$
- Odd functions are symmetric through the origin, like $x^3$:
$$f(-x) = -f(x).$$

### Linear Functions

Functions whose graphs are straight lines: the simplest relationships, changing at a constant rate.

#### Slope
kind: definition
prereqs: coordinate-plane, ratio, integer-addition

The slope of the line through $(x_1, y_1)$ and $(x_2, y_2)$, with $x_1 \ne x_2$, is
$$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}$$

- Positive slope rises.
- Negative slope falls.
- Zero slope is horizontal.
- A vertical line has undefined slope.

The [[derivative-definition|derivative]] generalises slope to curves.

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

The line with slope $m$ and $y$-intercept $b$ is
$$y = mx + b.$$

#### Point-Slope Form {#point-slope}
kind: formula
prereqs: slope-intercept

The line with slope $m$ through $(x_1, y_1)$ is
$$y - y_1 = m(x - x_1).$$

#### Graphing Lines
kind: skill
prereqs: slope-intercept

From slope-intercept form, in three steps:
1. Plot the intercept.
2. Step by the slope: for $m = \frac{2}{3}$, three right and two up.
3. Draw the line through the points.

#### Parallel & Perpendicular Slopes {#parallel-perpendicular-slopes}
kind: theorem
prereqs: slope, reciprocals

Two non-vertical lines with slopes $m_1$ and $m_2$ are
- parallel if and only if $m_1 = m_2$;
- perpendicular if and only if $m_1 m_2 = -1$.

#### Linear Models
prereqs: slope-intercept, unit-rates

A constant rate of change in a real situation: a taxi charging \$3 plus \$2 per mile costs
$$C = 2m + 3$$
for $m$ miles. The slope is the rate; the intercept is the starting amount.

#### Average Rate of Change
kind: definition
prereqs: slope, function-notation

How much a function's output changes per unit of input between $a$ and $b$:
$$\frac{f(b) - f(a)}{b - a},$$
the slope of the secant line joining them. A linear function's average rate of change is the same everywhere, which is what makes it linear.

### Polynomials

Sums of powers of $x$ with number coefficients: the most important functions in algebra, and the theorems connecting their factors, zeros and graphs.

#### Polynomials and Their Parts {#polynomial-basics}
kind: definition
prereqs: algebraic-expressions, exponent-laws

A sum of terms $a x^n$ with whole-number powers, like
$$4x^3 - x + 7.$$
Its parts:
- the degree is the highest power: 3;
- the leading coefficient is the number in front of that power: 4.

#### Adding & Subtracting Polynomials {#polynomial-addition}
kind: skill
prereqs: polynomial-basics, like-terms

Combine like terms, power by power:
$$(x^2 + 3x) + (2x^2 - x + 5) = 3x^2 + 2x + 5.$$

#### Multiplying Polynomials {#polynomial-multiplication}
kind: skill
prereqs: polynomial-addition, expanding-brackets

Multiply every term of one by every term of the other, then collect:
$$(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6.$$

#### Special Products
kind: formula
prereqs: polynomial-multiplication

For all $a, b$:
$$\begin{aligned} (a + b)^2 &= a^2 + 2ab + b^2 \\ (a - b)^2 &= a^2 - 2ab + b^2 \\ (a + b)(a - b) &= a^2 - b^2 \\ (a + b)^3 &= a^3 + 3a^2 b + 3ab^2 + b^3 \\ (a - b)^3 &= a^3 - 3a^2 b + 3ab^2 - b^3 \end{aligned}$$

#### Factoring Out the GCF {#factoring-gcf}
kind: skill
prereqs: gcf, expanding-brackets, polynomial-basics

Always the first step in factoring: take out what every term shares,
$$6x^3 - 9x^2 = 3x^2(2x - 3).$$

#### Factoring Trinomials
kind: skill
prereqs: factoring-gcf, polynomial-multiplication

To factor $ax^2 + bx + c$ by splitting the middle term (the $ac$ method), find integers $m$ and $n$ with
$$mn = ac \quad\text{and}\quad m + n = b,$$
rewrite $bx$ as $mx + nx$, and factor the four terms by grouping.

In order:
1. Take out any common factor, and $-1$ if $a$ is negative.
2. Find the pair: list the factor pairs of $ac$ until one adds to $b$.
3. Split the middle term: $bx = mx + nx$.
4. Group the terms in pairs, and take out each pair's common factor, with the sign of the pair's first term.
5. Take out the bracket the two pairs now share.

The signs narrow the search for the pair:
- if $ac > 0$, $m$ and $n$ both have the sign of $b$;
- if $ac < 0$, they have opposite signs, and the one further from $0$ has the sign of $b$.

**Example.** For $6x^2 + 7x - 3$, $ac = -18$, and $9$ and $-2$ multiply to $-18$ and add to $7$:
$$\begin{aligned} 6x^2 + 7x - 3 &= 6x^2 + 9x - 2x - 3 \\ &= 3x(2x + 3) - 1(2x + 3) \\ &= (3x - 1)(2x + 3) \end{aligned}$$
Splitting it the other way round, as $-2x + 9x$, gives the same factors.

When $a = 1$ the pair gives the factors directly, with no grouping:
$$x^2 + bx + c = (x + m)(x + n).$$
For instance 2 and 3 multiply to 6 and add to 5, so
$$x^2 + 5x + 6 = (x + 2)(x + 3).$$

*Why it works.* If $ax^2 + bx + c = (px + q)(rx + s)$, multiplying out gives
$$ax^2 + bx + c = prx^2 + psx + qrx + qs,$$
a middle term in two parts whose coefficients add to $b$ and multiply to
$$ps \cdot qr = pr \cdot qs = ac.$$
Splitting the middle term puts these two parts back, and grouping undoes the multiplication. So if no factor pair of $ac$ adds to $b$, there is no such factorisation with integer coefficients.

```quiz
Q: Which pair splits the middle term of $4x^2 - 4x - 15$?
- $3$ and $-5$
- $-6$ and $10$
+ $6$ and $-10$
- $5$ and $-12$
Hint: The pair multiplies to $ac$, not to $c$, and adds to $b$.
Why: $ac = -60$, and $6 \cdot (-10) = -60$ while $6 + (-10) = -4$, so
$$\begin{aligned} 4x^2 - 4x - 15 &= 4x^2 + 6x - 10x - 15 \\ &= 2x(2x + 3) - 5(2x + 3) \\ &= (2x - 5)(2x + 3) \end{aligned}$$

Q: Factor $2x^2 + 5x - 3$.
+ $(2x - 1)(x + 3)$
- $(2x + 1)(x - 3)$
- $(2x + 3)(x - 1)$
- $(2x - 3)(x + 1)$
Hint: Find two numbers that multiply to $-6$ and add to $5$.
Why: $6$ and $-1$ multiply to $-6$ and add to $5$, so
$$\begin{aligned} 2x^2 + 5x - 3 &= 2x^2 + 6x - x - 3 \\ &= 2x(x + 3) - 1(x + 3) \\ &= (2x - 1)(x + 3) \end{aligned}$$

Q: Which trinomial does not factor over the integers?
- $2x^2 + 5x + 2$
- $6x^2 - x - 2$
- $4x^2 - 4x + 1$
+ $2x^2 + 7x + 4$
Why: For $2x^2 + 7x + 4$, $ac = 8$, and the factor pairs of $8$ add to $\pm 6$ or $\pm 9$, never to $7$.
```

#### Factoring Patterns {#factoring-special-forms}
kind: formula
prereqs: special-products, factoring-gcf

For all $a, b, x, p, q$:
$$\begin{aligned} a^2 - b^2 &= (a - b)(a + b) \\ a^2 + 2ab + b^2 &= (a + b)^2 \\ a^2 - 2ab + b^2 &= (a - b)^2 \\ a^3 - b^3 &= (a - b)(a^2 + ab + b^2) \\ a^3 + b^3 &= (a + b)(a^2 - ab + b^2) \\ x^2 + (p + q)x + pq &= (x + p)(x + q) \\ ax + ay + bx + by &= (a + b)(x + y) \end{aligned}$$

More generally,
$$a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1}).$$
The sum of squares $a^2 + b^2$ has no factorisation over $\mathbb{R}$.

Order of attack:
1. a common factor;
2. a pattern above;
3. grouping;
4. the quadratic formula or the [[rational-root-theorem]].

#### Polynomial Long Division {#polynomial-division}
kind: skill
prereqs: polynomial-multiplication, long-division

The long division algorithm with powers of $x$ in place of place values, repeating four steps:
1. divide the leading terms;
2. multiply;
3. subtract;
4. bring down the next term.

#### Synthetic Division
kind: skill
prereqs: polynomial-division

A shortcut for dividing by $(x - a)$ using only the coefficients. The last number it produces is the remainder.

#### Remainder Theorem
kind: theorem
prereqs: polynomial-division, function-notation

Let $p(x)$ be a polynomial and $a$ a number. The remainder on dividing $p(x)$ by $x - a$ is $p(a)$: there is a polynomial $q(x)$ with
$$p(x) = (x - a)\,q(x) + p(a).$$

#### Factor Theorem
kind: theorem
prereqs: remainder-theorem, zero-product-property

For a polynomial $p(x)$ and a number $a$:
$$(x - a) \text{ divides } p(x) \iff p(a) = 0$$

*Proof.* By the [[remainder-theorem]],
$$p(x) = (x - a)q(x) + p(a),$$
so the remainder vanishes exactly when $p(a) = 0$. $\square$

**Example.** The polynomial
$$p(x) = x^3 - 6x^2 + 11x - 6$$
has $p(1) = 0$, so $(x - 1) \mid p(x)$, and in full
$$p(x) = (x - 1)(x - 2)(x - 3).$$

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

Let
$$p(x) = a_n x^n + \cdots + a_1 x + a_0$$
have integer coefficients, $a_n \ne 0$. If $\frac{r}{s}$ is a zero of $p$ in lowest terms, then $r \mid a_0$ and $s \mid a_n$.

#### Fundamental Theorem of Algebra
kind: theorem
prereqs: factor-theorem, complex-numbers

Every polynomial of degree $n \ge 1$ with complex coefficients has exactly $n$ complex zeros, counted with multiplicity:
$$p(x) = a_n(x - z_1)(x - z_2)\cdots(x - z_n).$$

#### Polynomial Functions & End Behavior {#polynomial-functions}
prereqs: polynomial-basics, function-graphs

Polynomial graphs are smooth and unbroken. Far out, the leading term wins: $-2x^3 + 100x$ eventually falls to the right and rises to the left, like $-2x^3$.

#### Zeros & Multiplicity
prereqs: factor-theorem, polynomial-functions

Each factor $(x - a)^k$ gives a zero at $a$ of multiplicity $k$. At that zero the graph
- crosses the axis when $k$ is odd;
- bounces off it when $k$ is even.

#### Binomial Theorem
kind: theorem
prereqs: special-products, combinations

For all $a, b$ and every integer $n \ge 0$:
$$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k,$$
where
$$\binom{n}{k} = \frac{n!}{k!\,(n - k)!}.$$

### Quadratics

Degree-two polynomials: parabolas, and four ways to solve them.

#### Quadratic Functions
kind: definition
prereqs: polynomial-basics, function-graphs

A function of the form
$$f(x) = ax^2 + bx + c, \quad a \ne 0.$$
Its graph is a parabola, opening up when $a > 0$ and down when $a < 0$.

#### Vertex Form
kind: formula
prereqs: quadratic-functions, graph-transformations

The form
$$f(x) = a(x - h)^2 + k$$
shows the vertex $(h, k)$ at a glance: it is $x^2$ stretched by $a$ and moved right $h$ and up $k$.

#### Solving by Factoring {#quadratics-by-factoring}
kind: skill
prereqs: factoring-trinomials, zero-product-property, equations-and-solutions

Get 0 on one side, factor, and set each factor to 0:
$$\begin{aligned} x^2 + x - 6 &= 0 \\ (x + 3)(x - 2) &= 0 \end{aligned}$$
so $x = -3$ or $x = 2$.

#### Solving by Square Roots {#quadratics-by-square-roots}
kind: skill
prereqs: square-roots, one-step-equations

When there is no $x$ term, isolate the square and take both roots:
$$x^2 = 25 \implies x = \pm 5.$$

#### Completing the Square
kind: skill
prereqs: special-products, quadratics-by-square-roots

Add the number that makes a perfect square:
$$\begin{aligned} x^2 + 6x + 2 &= 0 \\ x^2 + 6x + 9 &= 7 \\ (x + 3)^2 &= 7 \\ x &= -3 \pm \sqrt{7} \end{aligned}$$
It is also how vertex form is found.

#### The Quadratic Formula {#quadratic-formula}
kind: formula
prereqs: completing-the-square, simplifying-radicals

For $a \ne 0$, the solutions of $ax^2 + bx + c = 0$ are
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

It follows from [[completing-the-square]] on the general equation. The [[discriminant]] $b^2 - 4ac$ decides whether the solutions are real.

**Example.** For $2x^2 + 3x - 2 = 0$:
$$x = \frac{-3 \pm \sqrt{9 + 16}}{4} = \frac{-3 \pm 5}{4},$$
so $x = \frac{1}{2}$ or $x = -2$.

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

The discriminant of $ax^2 + bx + c$ is
$$\Delta = b^2 - 4ac.$$
The equation $ax^2 + bx + c = 0$ has
- two real solutions if $\Delta > 0$;
- one repeated solution if $\Delta = 0$;
- two complex conjugate solutions if $\Delta < 0$.

### Rational Expressions & Functions {#rational}

Fractions with polynomials on top and bottom: the arithmetic of fractions, grown up.

#### Rational Expressions
kind: definition
prereqs: polynomial-basics, fraction-concept

A ratio of polynomials, like
$$\frac{x + 1}{x^2 - 4}.$$
It is undefined wherever the bottom is 0, here at $x = \pm 2$.

#### Simplifying Rational Expressions
kind: skill
prereqs: rational-expressions, factoring-trinomials, simplifying-fractions

Factor the top and bottom and cancel common *factors* (never terms). For $x \ne -3$,
$$\frac{x^2 - 9}{x + 3} = \frac{(x - 3)(x + 3)}{x + 3} = x - 3.$$

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

Clear the fractions, then solve, in three steps:
1. Multiply through by the common denominator to clear the fractions.
2. Solve.
3. Discard any answer that makes a denominator 0.

#### Rational Functions
kind: definition
prereqs: rational-expressions, domain-and-range

Functions
$$f(x) = \frac{p(x)}{q(x)}$$
with polynomials $p$ and $q$. The domain is everything except the zeros of $q$, and that is where the interesting behaviour is.

#### Asymptotes & Holes {#asymptotes}
prereqs: rational-functions, polynomial-functions, simplifying-rational-expressions

Lines a graph approaches but never settles on, and the gaps a cancelled factor leaves:
- where the bottom is 0 but the top isn't, the graph shoots off along a **vertical asymptote**;
- far out, the leading terms set a **horizontal** (or slanted) one;
- a factor that cancels leaves only a **hole**.

For example,
$$f(x) = \frac{2x}{x - 1}$$
has the vertical asymptote $x = 1$ and the horizontal asymptote $y = 2$.

#### Graphing Rational Functions
kind: skill
prereqs: asymptotes, zeros-and-multiplicity

A sketch in three steps:
1. Find the zeros, the asymptotes and the holes.
2. Test a point in each region.
3. Sketch the branches.

### Radical Expressions & Functions {#radicals}

Functions built from roots, and equations with variables under a root sign.

#### The Square Root Function {#square-root-function}
prereqs: square-roots, function-graphs, domain-and-range

The function
$$f(x) = \sqrt{x}$$
is half a sideways parabola, starting at the origin and rising ever more slowly. Its domain is $x \ge 0$.

#### Radical Functions
prereqs: square-root-function, nth-roots, graph-transformations

Functions such as $\sqrt{x - 2} + 1$ or $\sqrt[3]{x}$: root functions moved and stretched. Even roots need a non-negative inside; odd roots accept anything.

#### Solving Radical Equations
kind: skill
prereqs: nth-roots, quadratics-by-factoring

Isolate the radical, then raise both sides to the power that undoes it. Squaring can create **extraneous** solutions that do not satisfy the original equation, so always check.

$$\begin{aligned} \sqrt{x + 2} &= x \\ x + 2 &= x^2 \\ 0 &= x^2 - x - 2 = (x - 2)(x + 1) \end{aligned}$$

Checking:
- $x = 2$ works: $\sqrt{4} = 2$;
- $x = -1$ gives $\sqrt{1} = 1 \ne -1$, so it is extraneous.

#### Roots Undo Powers {#roots-as-inverses}
prereqs: inverse-functions, radical-functions

$\sqrt{x}$ is the inverse of $x^2$ restricted to $x \ge 0$, and $\sqrt[3]{x}$ is the inverse of $x^3$. That is why
$$\sqrt{x^2} = |x|,$$
not $x$.

### Exponentials & Logarithms {#exponentials-and-logarithms}

Growth by a constant factor, and the logarithms that measure it.

#### Exponential Functions
kind: definition
prereqs: rational-exponents, function-graphs

The function
$$f(x) = a \cdot b^x$$
multiplies by $b$ for each step in $x$, rather than adding a fixed amount. With $b > 1$ it grows; with $0 < b < 1$ it decays toward 0.

#### Exponential Growth & Decay {#exponential-growth}
prereqs: exponential-functions, percent-change

Growing by a fixed percent: \$1000 at 5% a year grows to
$$A(t) = 1000(1.05)^t$$
after $t$ years. Populations, compound interest, radioactive decay and cooling coffee all work this way.

#### The Number e {#number-e}
kind: definition
prereqs: exponential-growth

The number
$$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n \approx 2.71828,$$
what \$1 grows to in a year at 100% interest compounded continuously. It is the natural base for growth.

#### Logarithms
kind: definition
prereqs: exponential-functions, inverse-functions

For $b > 0$, $b \ne 1$ and $x > 0$, $\log_b x$ is the unique real number $y$ with
$$b^y = x.$$
Thus $\log_b$ is the inverse of $x \mapsto b^x$; for example,
$$\log_2 8 = 3 \quad\text{because}\quad 2^3 = 8.$$

#### Laws of Logarithms {#log-laws}
kind: theorem
prereqs: logarithms, exponent-laws

For $b > 0$, $b \ne 1$, and $x, y > 0$:
$$\begin{aligned} \log_b(xy) &= \log_b x + \log_b y \\ \log_b \frac{x}{y} &= \log_b x - \log_b y \\ \log_b x^r &= r \log_b x \\ \log_b 1 &= 0 \\ b^{\log_b x} &= x \\ \log_b b^x &= x \end{aligned}$$

#### The Natural Logarithm {#natural-log}
kind: definition
prereqs: logarithms, number-e

The logarithm to base $e$, and the one calculus prefers:
$$\ln x = \log_e x.$$

#### Change of Base
kind: formula
prereqs: log-laws

For $a, b > 0$ with $a, b \ne 1$, and $x > 0$:
$$\log_b x = \frac{\log_a x}{\log_a b} = \frac{\ln x}{\ln b}$$

#### Solving Exponential Equations
kind: skill
prereqs: log-laws, linear-equations

Take a logarithm of both sides to bring the variable down from the exponent:
$$\begin{aligned} 3^x &= 20 \\ x \ln 3 &= \ln 20 \\ x &= \frac{\ln 20}{\ln 3} \approx 2.73 \end{aligned}$$

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

Graph both lines and read off the crossing point. Two lines that
- cross meet in one solution;
- are parallel never meet: no solution;
- coincide meet everywhere: infinitely many.

### Substitution Method
kind: skill
prereqs: linear-systems, literal-equations

Solve one equation for one variable and substitute into the other. In the system
$$\begin{aligned} y &= 2x \\ x + y &= 9 \end{aligned}$$
putting the first into the second gives
$$\begin{aligned} x + 2x &= 9 \\ 3x &= 9 \\ x &= 3, \end{aligned}$$
and so $y = 6$.

### Elimination Method
kind: skill
prereqs: linear-systems

Add or subtract multiples of the equations so one variable cancels. In the system
$$\begin{aligned} x + y &= 10 \\ x - y &= 4 \end{aligned}$$
subtracting the second equation from the first cancels $x$:
$$2y = 6,$$
so $y = 3$ and $x = 7$.

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
$$\begin{aligned} a^m a^n &= a^{m+n} \\ \frac{a^m}{a^n} &= a^{m-n} \\ (a^m)^n &= a^{mn} \\ (ab)^n &= a^n b^n \\ a^0 &= 1 \\ a^{-n} &= \frac{1}{a^n} \end{aligned}$$

### Zero & Negative Exponents {#negative-exponents}
kind: definition
prereqs: exponent-laws, reciprocals

For $a \ne 0$, keeping the laws working forces
$$\begin{aligned} a^0 &= 1, \\ a^{-n} &= \frac{1}{a^n}, \end{aligned}$$
since each step down in the exponent divides by $a$ once more.

### nth Roots {#nth-roots}
kind: definition
prereqs: square-roots, exponents

$\sqrt[n]{a}$ is the number whose $n$th power is $a$:
$$\sqrt[3]{8} = 2 \quad\text{because}\quad 2^3 = 8.$$
Odd roots of negatives exist; even ones don't, among the real numbers.

### Simplifying Radicals
kind: skill
prereqs: nth-roots, prime-factorization

Pull perfect powers out from under the root:
$$\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}.$$

### Rational Exponents
prereqs: negative-exponents, nth-roots

A fractional exponent is a root:
$$\begin{aligned} a^{1/n} &= \sqrt[n]{a}, \\ a^{m/n} &= \left(\sqrt[n]{a}\right)^m. \end{aligned}$$
So
$$8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4.$$

### Rationalizing Denominators
kind: skill
prereqs: simplifying-radicals, equivalent-fractions

Multiplying by a form of 1 to clear roots from the bottom:
$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}.$$
A bottom like $1 + \sqrt{2}$ is cleared with its conjugate $1 - \sqrt{2}$:
$$\frac{1}{1 + \sqrt{2}} = \frac{1 - \sqrt{2}}{(1 + \sqrt{2})(1 - \sqrt{2})} = \sqrt{2} - 1.$$

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

The points whose distances to two foci add up to a constant. Centred at the origin:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1.$$
Planets orbit in ellipses with the sun at one focus.

### Hyperbolas
prereqs: ellipses, asymptotes

The points whose distances to two foci differ by a constant: two branches,
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1,$$
closing in on a pair of asymptotes.

## Complex Numbers {#complex}
flow: down

Numbers that make every polynomial solvable, built on a square root of $-1$.

### The Imaginary Unit {#imaginary-unit}
kind: definition
prereqs: square-roots, integer-multiplication

$i$ is a number with
$$i^2 = -1.$$
No real number does that, so $i$ is new. Its powers cycle:
$$i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1.$$

### What a Complex Number Is {#complex-numbers}
kind: definition
prereqs: imaginary-unit, number-systems

A number $a + bi$ with a real part $a$ and an imaginary part $b$. They live on a plane rather than a line, with the reals along one axis.

### Complex Arithmetic
kind: skill
prereqs: complex-numbers, polynomial-multiplication

Add like terms and multiply like binomials, replacing $i^2$ with $-1$:
$$(2 + i)(3 - i) = 6 + i - i^2 = 7 + i.$$
Divide using the conjugate.

### Complex Roots of Quadratics {#complex-roots}
prereqs: complex-arithmetic, discriminant

When the discriminant is negative the quadratic formula still works:
$$x^2 + 2x + 5 = 0 \implies x = \frac{-2 \pm \sqrt{-16}}{2} = -1 \pm 2i,$$
a conjugate pair.

## Sequences & Series

Lists of numbers that follow a rule, and what you get by adding them up.

### Sequences
kind: definition
prereqs: function-notation

An ordered list $a_1, a_2, a_3, \ldots$, which is a function whose inputs are the counting numbers. Given by a formula for $a_n$ or by a rule linking each term to the last.

### Arithmetic Sequences
prereqs: sequences

Add the same difference each time: $3, 7, 11, 15, \ldots$ has
$$a_n = 3 + 4(n - 1).$$
A linear function, sampled at whole numbers.

### Geometric Sequences
prereqs: sequences, exponents

Multiply by the same ratio each time: $2, 6, 18, 54, \ldots$ has
$$a_n = 2 \cdot 3^{n-1}.$$
An exponential function, sampled at whole numbers.

### Sigma Notation
kind: definition
prereqs: sequences

A capital sigma means "add up":
$$\sum_{k=1}^{4} k^2 = 1 + 4 + 9 + 16 = 30.$$

### Arithmetic Series
kind: formula
prereqs: arithmetic-sequences, sigma-notation

For an arithmetic sequence with first term $a_1$ and $n$-th term $a_n$:
$$\sum_{k=1}^{n} a_k = \frac{n(a_1 + a_n)}{2}.$$
In particular,
$$\sum_{k=1}^{n} k = \frac{n(n + 1)}{2}.$$

### Geometric Series
kind: formula
prereqs: geometric-sequences, sigma-notation

For $r \ne 1$:
$$\sum_{k=0}^{n-1} a r^k = a\,\frac{1 - r^n}{1 - r}$$

### Infinite Geometric Series
kind: theorem
prereqs: geometric-series

If $|r| < 1$ then
$$\sum_{k=0}^{\infty} a r^k = \frac{a}{1 - r};$$
if $|r| \ge 1$ and $a \ne 0$, the series diverges.

### Proof by Induction {#induction}
kind: technique
prereqs: sigma-notation, arithmetic-series

Two steps prove a statement for every $n \ge 1$:
1. the base case: prove it for $n = 1$;
2. the inductive step: show that whenever it holds for $n$, it holds for $n + 1$.

Like dominoes, every case falls.
