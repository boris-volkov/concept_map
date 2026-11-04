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
prereqs: proof

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
flow: down
rows: kinds
wrap: 6

Letters standing for numbers, and the rules for rewriting them.

### Variables
kind: definition
prereqs: multiplication

A letter that stands for a number we don't know yet, or for any number at all. $3n$ means "three times whatever $n$ is".

### Algebraic Expressions
kind: definition
prereqs: variables, order-of-operations

A combination of numbers, variables and operations, like $2x^2 - 5x + 1$, made of terms joined by $+$ and $-$. An expression has a value; it doesn't say anything is equal.

### Terms, Factors & Coefficients {#terms-and-coefficients}
kind: definition
prereqs: algebraic-expressions

In an expression, terms are the parts joined by addition, factors are the parts joined by multiplication, a coefficient is the number multiplying a variable, and a constant is a term with no variable.

In $3x^2 - 5x + 7$ the terms are $3x^2$, $-5x$ and $7$; the coefficients are $3$ and $-5$; the constant is $7$.

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

### Translating Words into Expressions {#translating-words}
kind: skill
prereqs: algebraic-expressions

Name the unknown with a variable, then replace each phrase by its operation:

| Words | Expression |
| --- | --- |
| 5 more than $x$ | $x + 5$ |
| 5 less than $x$ | $x - 5$ |
| twice $x$ | $2x$ |
| the sum of $x$ and 3, doubled | $2(x + 3)$ |
| $x$ per $y$ | $\frac{x}{y}$ |

```quiz
Q: Which expression is 4 less than three times $n$?
- $4 - 3n$
+ $3n - 4$
- $3(n - 4)$
Why: "Less than" reverses the order: start with $3n$ and take away 4.
```

### Seeing Structure {#seeing-structure}
kind: skill
prereqs: expanding-brackets

Treat a part of an expression as a single quantity, and look for a known pattern:
$$\begin{aligned} x^4 - y^4 &= (x^2)^2 - (y^2)^2 \\ &= (x^2 - y^2)(x^2 + y^2). \end{aligned}$$

## Equations & Inequalities {#equations}
flow: down
rows: kinds
wrap: 6

Statements that two things are equal, or that one is bigger, and how to find the values that make them true.

### Equivalent Equations {#equivalent-equations}
kind: theorem
prereqs: equality-properties, multiplication-cancellation

Adding the same expression to both sides of an equation, or multiplying both sides by the same non-zero number, gives an equation with exactly the same solutions.

*Proof.* If $a = b$ then $a + c = b + c$, by the [[equality-properties|properties of equality]]; adding $-c$ reverses the step. If $d \ne 0$, then $a = b$ gives $ad = bd$, and multiplying by $\frac{1}{d}$ reverses the step. $\square$

Multiplying by $0$, or by an expression that can be $0$, can add solutions. So can squaring both sides, which is why [[solving-radical-equations|radical equations]] must be checked.

### Equations & Solutions {#equations-and-solutions}
kind: definition
prereqs: algebraic-expressions

An equation says two expressions are equal. A solution is a value of the variable that makes it true: $x = 4$ solves
$$2x + 1 = 9.$$

### Extraneous Solutions {#extraneous-solutions}
kind: definition
prereqs: equations-and-solutions

An extraneous solution is a value found by a correct-looking algebraic step that does not satisfy the original equation. They arise from squaring both sides and from multiplying by an expression that can be $0$.

### Number of Solutions of a Linear Equation {#linear-solution-count}
kind: property
prereqs: linear-equations

An equation that reduces to $ax = b$ has
- one solution, $x = \frac{b}{a}$, if $a \ne 0$;
- no solution if $a = 0$ and $b \ne 0$;
- every number as a solution if $a = 0$ and $b = 0$.

```quiz
Q: How many solutions does $2(x + 1) = 2x + 3$ have?
A: 0
Why: It reduces to $2 = 3$, which is never true.
```

### One-Step Equations
kind: skill
prereqs: equations-and-solutions, division

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

### Compound Inequalities {#compound-inequalities}
kind: skill
prereqs: linear-inequalities

Solve each part, then combine: "and" keeps the numbers in both solution sets, and "or" the numbers in either.
$$\begin{aligned} -3 &< 2x + 1 \le 7 \\ -4 &< 2x \le 6 \\ -2 &< x \le 3 \end{aligned}$$

```quiz
Q: How many integers satisfy $-1 \le x + 2 < 3$?
A: 4
Why: $-3 \le x < 1$, which holds $-3, -2, -1, 0$.
```

### Writing Equations from Words {#word-problems}
kind: skill
prereqs: translating-words, linear-equations

Solve a word problem in five steps:
1. name the unknown, with its units;
2. write each other quantity in terms of it;
3. write an equation that says the same thing as the problem;
4. solve it;
5. check the answer against the original words.

**Example.** Two consecutive integers add to 47:
$$n + (n + 1) = 47 \implies n = 23,$$
so the integers are 23 and 24.

### Units & Dimensional Analysis {#dimensional-analysis}
kind: skill
prereqs: unit-conversion

Keep the units in the calculation, and multiply by fractions equal to 1 so that the unwanted units cancel:
$$60\ \frac{\text{mi}}{\text{h}} \cdot \frac{5280\ \text{ft}}{1\ \text{mi}} \cdot \frac{1\ \text{h}}{3600\ \text{s}} = 88\ \frac{\text{ft}}{\text{s}}.$$
An answer in the wrong units shows a mistake in the setup.

## Functions {#functions}

A function $f : A \to B$ assigns to each element $x$ of a set $A$, its domain, exactly one element $f(x)$ of a set $B$.

The general notions first, then each family of functions: linear, polynomial, quadratic, rational, radical, exponential and logarithmic.

### Function Basics {#function-basics}
flow: down
rows: kinds
wrap: 6

Notation, domain and range, graphs, and the ways functions combine and transform.

#### Vertical Line Test
kind: theorem
prereqs: function-graphs

A curve in the plane is the graph of a function of $x$ if and only if no vertical line meets it more than once.

*Proof.* A vertical line $x = a$ meets the curve at the points with first coordinate $a$. Two such points would give one input two outputs, and a function allows exactly one. $\square$

#### Horizontal Line Test
kind: theorem
prereqs: inverse-functions, function-graphs

A function has an inverse function if and only if no horizontal line meets its graph more than once, that is, if and only if it is one-to-one.

*Proof.* The inverse sends each output back to its input. That is a function exactly when no output comes from two different inputs. $\square$

A function that fails the test can be given an inverse by restricting its domain: $y = x^2$ on $x \ge 0$ has inverse $y = \sqrt{x}$.

#### Graph of an Inverse {#inverse-graph-reflection}
kind: theorem
prereqs: inverse-functions

The graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y = x$.

*Proof.* The point $(a, b)$ lies on $y = f(x)$ exactly when $f(a) = b$, which is when $f^{-1}(b) = a$, which is when $(b, a)$ lies on $y = f^{-1}(x)$. Swapping coordinates is reflecting in $y = x$. $\square$

#### The Coordinate Plane
kind: definition
prereqs: number-line, negative-numbers

Two number lines crossing at right angles, so that every point has an address $(x, y)$: how far across, then how far up.

#### Function Notation
kind: definition
prereqs: variables, evaluating-expressions

$f(x)$ is the output of $f$ at input $x$, and $f(3)$ means "put in 3". If $f(x) = x^2 + 1$ then
$$f(3) = 3^2 + 1 = 10.$$
It is not $f$ times $x$.

#### Interval Notation
kind: definition
prereqs: comparing-numbers, variables

A compact way to write a stretch of the number line:
$$[2, 5) = \{x : 2 \le x < 5\},$$
a square bracket including its end and a round one leaving it out.

#### Domain & Range {#domain-and-range}
kind: definition
prereqs: function-notation

The domain is every input a function accepts; the range is every output it produces. The function
$$f(x) = \sqrt{x}$$
has domain $[0, \infty)$, because negatives have no real square root.

#### Graphs of Functions {#function-graphs}
kind: definition
prereqs: function-notation, coordinate-plane

The picture of a function: every point $(x, f(x))$. A curve is a function's graph exactly when no vertical line crosses it twice.

#### Composition of Functions {#composition}
kind: definition
prereqs: function-notation

Feeding one function's output into another:
$$(f \circ g)(x) = f(g(x)).$$
Order matters: with $f(x) = x^2$ and $g(x) = x + 1$,
$$f(g(2)) = f(3) = 9 \quad\text{but}\quad g(f(2)) = g(4) = 5.$$

#### Inverse Functions
kind: definition
prereqs: composition, domain-and-range

A function $f^{-1}$ that undoes $f$:
$$f^{-1}(f(x)) = x.$$
Only functions that never repeat an output have one, and its graph is $f$'s graph reflected in the line $y = x$.

#### Piecewise Functions
kind: definition
prereqs: function-notation, domain-and-range

Functions defined by different rules on different parts of the domain, like the absolute value:

$$|x| = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases}$$

The parent absolute value function, $y = |x|$:
```graph
y = abs(x)
x: -2.5, 2.5
y: -1, 3
point: -1, 1 below-left
point: 0, 0 below-right
point: 1, 1 below-right
```

#### Even & Odd Functions {#even-odd-functions}
kind: definition
prereqs: function-graphs

Two kinds of symmetry a graph can have:
- Even functions are mirror images across the $y$-axis, like $x^2$:
$$f(-x) = f(x).$$
- Odd functions are symmetric through the origin, like $x^3$:
$$f(-x) = -f(x).$$

#### The Absolute Value Function {#absolute-value-function}
kind: definition
prereqs: absolute-value, piecewise-functions

The function
$$f(x) = |x| = \begin{cases} x & x \ge 0 \\ -x & x < 0. \end{cases}$$

Its graph is a V with its vertex at the origin. In general, $y = a|x - h| + k$ has vertex $(h, k)$ and slopes $\pm a$.
```graph
y = abs(x)
x: -3, 3
y: -1, 3
point: 0, 0 below-right
```

#### Step Functions {#step-functions}
kind: definition
prereqs: piecewise-functions

A step function is a piecewise function that is constant on each piece. The greatest integer function $\lfloor x \rfloor$ gives the greatest integer not above $x$:
$$\lfloor 2.7 \rfloor = 2, \quad \lfloor -2.7 \rfloor = -3.$$

Postage by weight and parking fees by the hour are step functions.

#### Transformations of Graphs {#graph-transformations}
kind: property
prereqs: function-graphs, function-notation

Changing the formula moves the graph:
- $f(x) + k$ shifts it up by $k$;
- $f(x - h)$ shifts it right by $h$;
- $a f(x)$ stretches it vertically by $a$;
- $-f(x)$ flips it over the $x$-axis.

#### Key Features of a Graph {#key-features-of-graphs}
kind: property
prereqs: function-graphs, domain-and-range

The features read from a graph are:
- intercepts, where it meets the axes;
- intervals where it is increasing, decreasing, positive or negative;
- relative maximums and minimums, where it turns;
- symmetry;
- end behaviour, what it does as $x \to \pm\infty$;
- periodicity, if it repeats.

#### Table of Parent Functions {#parent-functions}
kind: property
prereqs: function-graphs

Each family of functions is a [[graph-transformations|transformation]] of its simplest member:

| Family | Parent | Domain | Range |
| --- | --- | --- | --- |
| linear | $y = x$ | $\mathbb{R}$ | $\mathbb{R}$ |
| quadratic | $y = x^2$ | $\mathbb{R}$ | $[0, \infty)$ |
| cubic | $y = x^3$ | $\mathbb{R}$ | $\mathbb{R}$ |
| absolute value | $y = \lvert x \rvert$ | $\mathbb{R}$ | $[0, \infty)$ |
| square root | $y = \sqrt{x}$ | $[0, \infty)$ | $[0, \infty)$ |
| cube root | $y = \sqrt[3]{x}$ | $\mathbb{R}$ | $\mathbb{R}$ |
| reciprocal | $y = \frac{1}{x}$ | $x \ne 0$ | $y \ne 0$ |
| exponential | $y = 2^x$ | $\mathbb{R}$ | $(0, \infty)$ |
| logarithmic | $y = \log_2 x$ | $(0, \infty)$ | $\mathbb{R}$ |

#### General Transformation Form {#transformation-form}
kind: form
prereqs: graph-transformations

$$y = a\,f\big(b(x - h)\big) + k.$$

| Reads off | From |
| --- | --- |
| vertical stretch by $\lvert a \rvert$, flipped over the $x$-axis if $a < 0$ | $a$ |
| horizontal stretch by $\frac{1}{\lvert b \rvert}$, flipped over the $y$-axis if $b < 0$ | $b$ |
| shift right $h$ | $h$ |
| shift up $k$ | $k$ |

#### Evaluating & Interpreting Functions {#evaluating-functions}
kind: skill
prereqs: function-notation

Substitute the input everywhere the variable appears, in brackets, and say what the output means in the setting:
$$f(x) = x^2 - 3x \implies f(-2) = (-2)^2 - 3(-2) = 10.$$
If $h(t)$ is a height after $t$ seconds, then $h(3) = 40$ says that the height is 40 after 3 seconds.

```quiz
Q: If $f(x) = 2x^2 - 1$, what is $f(-3)$?
A: 17
Why: $2 \cdot 9 - 1 = 17$.
```

#### Finding a Domain {#finding-a-domain}
kind: skill
prereqs: domain-and-range

Start from all real numbers and remove what is not allowed:
- a denominator cannot be $0$;
- what is under an even root cannot be negative;
- what is inside a logarithm must be positive;
- a model allows only the inputs that make sense in its setting.

**Example.** For $f(x) = \frac{\sqrt{x + 2}}{x - 1}$, the domain is $x \ge -2$ with $x \ne 1$.

#### Composing Functions {#composing-functions}
kind: skill
prereqs: composition

To find $f(g(x))$, replace every $x$ in $f$ by the whole expression $g(x)$:
$$f(x) = x^2 + 1, \quad g(x) = x - 3 \implies f(g(x)) = (x - 3)^2 + 1.$$

```quiz
Q: With $f(x) = 2x$ and $g(x) = x + 5$, what is $f(g(1))$?
A: 12
Why: $g(1) = 6$, and $f(6) = 12$.

Q: With $f(x) = 2x$ and $g(x) = x + 5$, what is $g(f(1))$?
A: 7
Why: $f(1) = 2$, and $g(2) = 7$. The order matters.
```

#### Finding an Inverse {#finding-an-inverse}
kind: skill
prereqs: inverse-functions, literal-equations

Find an inverse in three steps:
1. write $y = f(x)$;
2. swap $x$ and $y$;
3. solve for $y$.

**Example.** For $f(x) = 2x + 6$:
$$\begin{aligned} x &= 2y + 6 \\ y &= \frac{x - 6}{2} \end{aligned}$$
so $f^{-1}(x) = \frac{x - 6}{2}$. Check that $f(f^{-1}(x)) = x$.

```quiz
Q: If $f(x) = 3x - 4$, what is $f^{-1}(5)$?
A: 3
Why: Solve $3x - 4 = 5$.
```

#### Transforming a Graph {#transforming-a-graph}
kind: skill
prereqs: transformation-form

Apply the changes to the parent graph in this order: horizontal shift and stretch, then vertical stretch and flip, then vertical shift. Track a few key points through each step.

**Example.** $y = -2(x - 1)^2 + 3$ takes $y = x^2$ right 1, stretches it by 2, flips it, and moves it up 3, so the vertex $(0, 0)$ goes to $(1, 3)$.

#### Solving Equations with Graphs {#solving-with-graphs}
kind: skill
prereqs: function-graphs

The solutions of $f(x) = g(x)$ are the $x$-coordinates of the points where the graphs of $y = f(x)$ and $y = g(x)$ meet. Draw both, by hand or by calculator, and read off the crossings.

### Linear Functions
flow: down
rows: kinds
wrap: 6

Functions whose graphs are straight lines: the simplest relationships, changing at a constant rate.

#### Parallel & Perpendicular Slopes {#parallel-perpendicular-slopes}
kind: theorem
prereqs: slope, reciprocals

Two non-vertical lines with slopes $m_1$ and $m_2$ are
- parallel if and only if $m_1 = m_2$;
- perpendicular if and only if $m_1 m_2 = -1$.

#### Constant Rate Theorem {#constant-rate-theorem}
kind: theorem
prereqs: average-rate-of-change, slope-intercept

A function on $\mathbb{R}$ is linear if and only if its average rate of change is the same over every interval. Equal steps in $x$ then give equal steps in $y$.

*Proof.* (⇒) For $f(x) = mx + b$,
$$\frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{m(x_2 - x_1)}{x_2 - x_1} = m.$$
(⇐) If the rate from $0$ to $x$ is always $m$, then $f(x) - f(0) = mx$, so $f(x) = mx + f(0)$. $\square$

Compare [[constant-ratio-theorem|constant ratios]], which mark exponentials, and [[second-differences|constant second differences]], which mark quadratics.

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

#### Average Rate of Change
kind: definition
prereqs: slope, function-notation

How much a function's output changes per unit of input between $a$ and $b$:
$$\frac{f(b) - f(a)}{b - a},$$
the slope of the secant line joining them. A linear function's average rate of change is the same everywhere, which is what makes it linear.

#### Direct Variation
kind: definition
prereqs: proportions, variables

A quantity $y$ varies directly with $x$ if, for a constant $k \ne 0$,
$$y = kx.$$

The graph is a line through the origin with slope $k$, and $\frac{y}{x}$ is constant.

#### Features of a Line {#features-of-a-line}
kind: property
prereqs: slope

For a line $y = mx + b$:
- the slope $m$ is positive if it rises, negative if it falls, and $0$ if it is level;
- the $y$-intercept is $(0, b)$;
- the $x$-intercept is $\left(-\frac{b}{m}, 0\right)$ if $m \ne 0$;
- the domain is $\mathbb{R}$, and the range is $\mathbb{R}$ if $m \ne 0$.

#### Horizontal & Vertical Lines {#horizontal-vertical-lines}
kind: property
prereqs: slope

The line $y = c$ is horizontal, with slope $0$. The line $x = c$ is vertical, with undefined slope, and is not the graph of a function.

#### Slope-Intercept Form {#slope-intercept}
kind: form
prereqs: slope, function-notation, linear-equations

The line with slope $m$ and $y$-intercept $b$ is
$$y = mx + b.$$

The parent linear function is $y = x$, with slope $1$ and $y$-intercept $0$:
```graph
y = x
x: -2.5, 2.5
y: -2.5, 2.5
point: -1, -1 below-right
point: 0, 0 below-right
point: 1, 1 below-right
```

#### Point-Slope Form {#point-slope}
kind: form
prereqs: slope

The line with slope $m$ through $(x_1, y_1)$ is
$$y - y_1 = m(x - x_1).$$

#### Standard Form of a Line {#line-standard-form}
kind: form
prereqs: slope

$$Ax + By = C, \quad A, B \text{ not both } 0.$$

| Reads off | From |
| --- | --- |
| slope, if $B \ne 0$ | $-\frac{A}{B}$ |
| $x$-intercept, if $A \ne 0$ | $\left(\frac{C}{A}, 0\right)$ |
| $y$-intercept, if $B \ne 0$ | $\left(0, \frac{C}{B}\right)$ |

The one form that also covers vertical lines, and the form for [[elimination-method|elimination]].

#### Intercept Form of a Line {#line-intercept-form}
kind: form
prereqs: line-standard-form

$$\frac{x}{p} + \frac{y}{q} = 1, \quad p, q \ne 0.$$

The line crosses the $x$-axis at $(p, 0)$ and the $y$-axis at $(0, q)$.

#### Graphing Lines
kind: skill
prereqs: slope-intercept

From slope-intercept form, in three steps:
1. Plot the intercept.
2. Step by the slope: for $m = \frac{2}{3}$, three right and two up.
3. Draw the line through the points.

#### Linear Models
kind: skill
prereqs: slope-intercept, unit-rates

A constant rate of change in a real situation: a taxi charging \$3 plus \$2 per mile costs
$$C = 2m + 3$$
for $m$ miles. The slope is the rate; the intercept is the starting amount.

#### Writing the Equation of a Line {#writing-a-line}
kind: skill
prereqs: point-slope, parallel-perpendicular-slopes

Find the slope, then put it and any one point into [[point-slope|point-slope form]]:
- from two points, $m = \frac{y_2 - y_1}{x_2 - x_1}$;
- parallel to a line, the same slope;
- perpendicular to a line, the negative reciprocal slope.

**Example.** Through $(1, 2)$ and $(3, 8)$: $m = 3$, so $y - 2 = 3(x - 1)$, which is $y = 3x - 1$.

```quiz
Q: What is the $y$-intercept of the line through $(2, 7)$ and $(4, 11)$?
A: 3
Why: $m = 2$, so $y = 2x + 3$.

Q: What is the slope of a line perpendicular to $y = 4x - 1$?
A: -1/4
Why: The negative reciprocal of 4.
```

#### Interpreting Slope & Intercept {#interpreting-slope}
kind: skill
prereqs: slope-intercept

In a model $y = mx + b$, read $m$ as the change in $y$ per unit of $x$, with both units, and $b$ as the value of $y$ when $x = 0$.

**Example.** For a taxi fare $C = 2.5m + 4$ in dollars after $m$ miles, the fare rises \$2.50 per mile from a starting charge of \$4.

### Polynomials
flow: down
rows: kinds
wrap: 6

Sums of powers of $x$ with number coefficients: the most important functions in algebra, and the theorems connecting their factors, zeros and graphs.

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

#### Binomial Theorem
kind: theorem
prereqs: polynomial-multiplication, combinations

For all $a, b$ and every integer $n \ge 0$:
$$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k,$$
where
$$\binom{n}{k} = \frac{n!}{k!\,(n - k)!}.$$

#### Closure of Polynomials {#polynomial-closure}
kind: theorem
prereqs: polynomial-addition, polynomial-multiplication

The sum, difference and product of two polynomials are polynomials. The quotient need not be one.

So polynomials behave like the integers: closed under $+$, $-$ and $\times$, but not division.

#### Complex Conjugate Root Theorem {#conjugate-root-theorem}
kind: theorem
prereqs: fundamental-theorem-of-algebra, complex-conjugates

If a polynomial has real coefficients and $z$ is a root, then its conjugate $\bar{z}$ is a root too.

*Proof.* Conjugation respects sums and products and fixes real numbers, so $p(\bar{z}) = \overline{p(z)} = \bar{0} = 0$. $\square$

So non-real roots come in pairs, and a real polynomial of odd degree has a real root.

#### Sign Change Theorem {#polynomial-sign-change}
kind: theorem
prereqs: polynomial-functions

If $p$ is a polynomial and $p(a)$ and $p(b)$ have opposite signs, then $p$ has a zero between $a$ and $b$.

This is the [[ivt|intermediate value theorem]], and polynomials are continuous. It locates zeros that do not factor.

#### Polynomials and Their Parts {#polynomial-basics}
kind: definition
prereqs: algebraic-expressions, exponents

A sum of terms $a x^n$ with whole-number powers, like
$$4x^3 - x + 7.$$
Its parts:
- the degree is the highest power: 3;
- the leading coefficient is the number in front of that power: 4.

#### Polynomial Functions & End Behavior {#polynomial-functions}
kind: property
prereqs: polynomial-basics, function-graphs

Polynomial graphs are smooth and unbroken. Far out, the leading term wins: $-2x^3 + 100x$ eventually falls to the right and rises to the left, like $-2x^3$.

The parent cubic function, $y = x^3$:
```graph
y = x^3
x: -2, 2
y: -3, 3
point: -1, -1 above-left
point: 0, 0 below-right
point: 1, 1 below-right
```

#### Zeros & Multiplicity
kind: property
prereqs: factor-theorem, polynomial-functions

Each factor $(x - a)^k$ gives a zero at $a$ of multiplicity $k$. At that zero the graph
- crosses the axis when $k$ is odd;
- bounces off it when $k$ is even.

#### Turning Points of a Polynomial {#polynomial-turning-points}
kind: property
prereqs: polynomial-functions

A polynomial of degree $n$ has at most $n$ real zeros and at most $n - 1$ turning points.

#### Leading Term & End Behaviour {#end-behavior-table}
kind: property
prereqs: polynomial-functions

The leading term $ax^n$ sets what the graph does at both ends:

| Degree | $a > 0$ | $a < 0$ |
| --- | --- | --- |
| even | up on both sides | down on both sides |
| odd | down on the left, up on the right | up on the left, down on the right |

#### Special Products
kind: formula
prereqs: polynomial-multiplication

For all $a, b$:
$$\begin{aligned} (a + b)^2 &= a^2 + 2ab + b^2 \\ (a - b)^2 &= a^2 - 2ab + b^2 \\ (a + b)(a - b) &= a^2 - b^2 \\ (a + b)^3 &= a^3 + 3a^2 b + 3ab^2 + b^3 \\ (a - b)^3 &= a^3 - 3a^2 b + 3ab^2 - b^3 \end{aligned}$$

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

#### Standard Form of a Polynomial {#polynomial-standard-form}
kind: form
prereqs: polynomial-basics

$$p(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0, \quad a_n \ne 0.$$

| Reads off | From |
| --- | --- |
| degree | $n$ |
| end behaviour | $a_n$ and whether $n$ is even |
| $y$-intercept | $(0, a_0)$ |
| possible rational roots | factors of $a_0$ over factors of $a_n$ |

#### Factored Form of a Polynomial {#polynomial-factored-form}
kind: form
prereqs: factor-theorem

$$p(x) = a(x - r_1)^{m_1}(x - r_2)^{m_2}\cdots(x - r_k)^{m_k}.$$

| Reads off | From |
| --- | --- |
| zeros | $r_1, \dots, r_k$ |
| whether the graph crosses or touches at $r_i$ | $m_i$ odd or even |
| degree | $m_1 + \cdots + m_k$ |
| end behaviour | $a$ and the degree |

#### Adding & Subtracting Polynomials {#polynomial-addition}
kind: skill
prereqs: polynomial-basics, like-terms

Combine like terms, power by power:
$$(x^2 + 3x) + (2x^2 - x + 5) = 3x^2 + 2x + 5.$$

#### Multiplying Polynomials {#polynomial-multiplication}
kind: skill
prereqs: expanding-brackets, exponent-laws, polynomial-basics

Multiply every term of one by every term of the other, then collect:
$$(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6.$$

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

#### Factoring by Grouping {#factoring-by-grouping}
kind: skill
prereqs: factoring-gcf

Split the terms into pairs, take out each pair's common factor, then take out the shared bracket:
$$\begin{aligned} x^3 + 2x^2 + 3x + 6 &= x^2(x + 2) + 3(x + 2) \\ &= (x^2 + 3)(x + 2). \end{aligned}$$

#### Factoring Completely {#factoring-completely}
kind: skill
prereqs: factoring-trinomials, factoring-special-forms, factoring-by-grouping

Work in this order, and repeat on each factor until none will go further:
1. take out the greatest common factor;
2. look for a pattern;
3. factor the trinomial, or group the terms.

$$\begin{aligned} 2x^3 - 8x &= 2x(x^2 - 4) \\ &= 2x(x - 2)(x + 2). \end{aligned}$$

```quiz
Q: How many linear factors does $3x^3 - 12x$ have when factored completely?
A: 3
Why: $3x(x - 2)(x + 2)$.
```

#### Solving Polynomial Equations {#solving-polynomial-equations}
kind: skill
prereqs: rational-root-theorem, synthetic-division, factoring-completely

Find all the roots of a polynomial in four steps:
1. get 0 on one side and factor as far as possible;
2. list the candidates from the [[rational-root-theorem]], and test them;
3. divide out each root found, to lower the degree;
4. solve the remaining quadratic.

**Example.** $x^3 - 4x^2 + x + 6 = 0$ has root $x = 2$; dividing gives $(x - 2)(x^2 - 2x - 3)$, so the roots are $2$, $3$, $-1$.

#### Graphing a Polynomial {#graphing-polynomials}
kind: skill
prereqs: polynomial-factored-form, end-behavior-table

Sketch a polynomial in four steps:
1. factor it, and mark the zeros;
2. read the end behaviour from the leading term;
3. mark the $y$-intercept;
4. join them, crossing at zeros of odd multiplicity and touching at zeros of even multiplicity.

For example, $y = x(x - 2)^2$, which crosses at 0 and touches at 2:
```graph
y = x*(x-2)^2
x: -1, 3.5
y: -3, 4
point: 0, 0 above-left
point: 2, 0 below
```

#### Polynomial Inequalities {#polynomial-inequalities}
kind: skill
prereqs: polynomial-factored-form, interval-notation

Factor, mark the zeros on a number line, find the sign on each interval from a test point, and keep the intervals that fit. The ends count for $\le$ and $\ge$.

**Example.** $x(x - 2)(x + 3) > 0$ has solution $(-3, 0) \cup (2, \infty)$.

#### Proving Polynomial Identities {#polynomial-identities}
kind: skill
prereqs: polynomial-multiplication

Expand both sides and show that they agree term by term:
$$(x^2 + y^2)^2 = (x^2 - y^2)^2 + (2xy)^2.$$
With $x > y$, this identity makes Pythagorean triples: $x = 2$, $y = 1$ gives $3, 4, 5$.

### Quadratics
flow: down
rows: kinds
wrap: 6

Degree-two polynomials and their parabolas: the theorems, the properties, the forms and what each one shows, and the skills of working with them.

| Form | Written | Shows |
| --- | --- | --- |
| [[quadratic-standard-form]] | $ax^2 + bx + c$ | direction, $y$-intercept, the discriminant |
| [[vertex-form]] | $a(x - h)^2 + k$ | vertex, axis, maximum or minimum, transformations of $x^2$ |
| [[quadratic-factored-form]] | $a(x - r)(x - s)$ | roots, axis midway between them, sign |
| [[sum-product-form]] | $x^2 - (r + s)x + rs$ | sum and product of the roots |
| [[focal-form]] | $(x - h)^2 = 4p(y - k)$ | vertex, focus, directrix |

#### The Quadratic Formula {#quadratic-formula}
kind: theorem
prereqs: completing-the-square, radical-rules

For $a \ne 0$, the solutions of $ax^2 + bx + c = 0$ are
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

*Proof.* Divide by $a$ and [[completing-the-square|complete the square]]:
$$\begin{aligned} x^2 + \frac{b}{a}x &= -\frac{c}{a} \\ x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} &= \frac{b^2}{4a^2} - \frac{c}{a} \\ \left(x + \frac{b}{2a}\right)^2 &= \frac{b^2 - 4ac}{4a^2} \\ x + \frac{b}{2a} &= \pm\frac{\sqrt{b^2 - 4ac}}{2a} \end{aligned}$$
Subtract $\frac{b}{2a}$ from both sides. $\square$

Split in two, the formula reads
$$x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}:$$
the [[axis-of-symmetry|axis of symmetry]], and equal steps either side of it.

#### The Discriminant {#discriminant}
kind: theorem
prereqs: quadratic-formula

For real $a \ne 0$, $b$, $c$, the discriminant of $ax^2 + bx + c$ is
$$\Delta = b^2 - 4ac,$$
and the equation $ax^2 + bx + c = 0$ has
- two distinct real solutions if and only if $\Delta > 0$;
- one repeated real solution if and only if $\Delta = 0$;
- two complex conjugate solutions if and only if $\Delta < 0$.

*Proof.* By the [[quadratic-formula|quadratic formula]], the solutions are
$$x = -\frac{b}{2a} \pm \frac{\sqrt{\Delta}}{2a},$$
and $\sqrt{\Delta}$ is a positive real number, zero, or not real, as $\Delta$ is positive, zero or negative. $\square$

On the graph, the parabola crosses the $x$-axis twice, touches it at the vertex, or misses it. Here are all three, with $a = 1$:
```graph
y = x^2-1
y = x^2 | dashed
y = x^2+1 | faint
x: -2.5, 2.5
y: -1.5, 4
```

When $a$, $b$ and $c$ are integers, the solutions are rational exactly when $\Delta$ is a perfect square, which is when the quadratic factors over the rationals.

```quiz
Q: How many real solutions does $x^2 - 4x + 4 = 0$ have?
A: 1
Why: $\Delta = 16 - 16 = 0$, so there is one repeated solution, $x = 2$.

Q: How many real solutions does $2x^2 + x + 3 = 0$ have?
A: 0
Why: $\Delta = 1 - 24 = -23 < 0$.
```

#### Vieta's Formulas {#vietas-formulas}
kind: theorem
prereqs: quadratic-factored-form

If $r$ and $s$ are the solutions of $ax^2 + bx + c = 0$, counted with multiplicity, then
$$r + s = -\frac{b}{a} \quad\text{and}\quad rs = \frac{c}{a}.$$

*Proof.* Expand the [[quadratic-factored-form|factored form]],
$$a(x - r)(x - s) = ax^2 - a(r + s)x + ars,$$
and compare coefficients with $ax^2 + bx + c$. $\square$

The formulas hold for complex solutions as well.

```quiz
Q: The solutions of $2x^2 - 6x + 1 = 0$ add to what?
A: 3
Why: $-\frac{b}{a} = \frac{6}{2} = 3$.

Q: The solutions of $2x^2 - 6x + 1 = 0$ multiply to what?
A: 1/2
Why: $\frac{c}{a} = \frac{1}{2}$.
```

#### Maximum or Minimum Value {#quadratic-extreme-value}
kind: theorem
prereqs: parabola-vertex, squares-nonnegative

Let $f(x) = a(x - h)^2 + k$ with $a \ne 0$. If $a > 0$, then $k$ is the minimum value of $f$; if $a < 0$, it is the maximum value. In both cases it is attained only at $x = h$.

*Proof.* [[squares-nonnegative|Squares are non-negative]], so $(x - h)^2 \ge 0$, with equality only at $x = h$. Multiplying by $a$ gives $a(x - h)^2 \ge 0$ if $a > 0$ and $a(x - h)^2 \le 0$ if $a < 0$. Add $k$. $\square$

#### Constant Second Differences {#second-differences}
kind: theorem
prereqs: quadratic-standard-form

Let $y_0, y_1, y_2, \dots$ be the values of a function at equally spaced inputs, a step $d$ apart. They are the values of a quadratic $ax^2 + bx + c$ if and only if their second differences are a constant other than $0$, and that constant is
$$2ad^2.$$

*Proof.* (⇒) For $f(x) = ax^2 + bx + c$,
$$f(x + d) - f(x) = 2adx + ad^2 + bd,$$
which rises by $2ad \cdot d = 2ad^2$ each time $x$ rises by $d$. (⇐) A sequence with constant second difference $D$ and first difference $e$ at the start has
$$y_n = y_0 + ne + \frac{n(n - 1)}{2}D,$$
which is quadratic in $n$ when $D \ne 0$, and so in $x$, since $n$ is linear in $x$. $\square$

**Example.** For $y = 2x^2 + x$, so $a = 2$ and $d = 1$:

| $x$ | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| $y$ | 0 | 3 | 10 | 21 | 36 |
| first differences | | 3 | 7 | 11 | 15 |
| second differences | | | 4 | 4 | 4 |

Divided by $d$, the first differences are the slopes of the chords, so the slopes of equal chords go up in equal steps. The [[odd-number-pattern|odd-number pattern]] is the case $y = x^2$ from the vertex.

```quiz
Q: A table with $x = 0, 1, 2, 3$ has $y = 1, 4, 11, 22$. What is $a$ in the quadratic it comes from?
A: 2
Why: The first differences are 3, 7, 11, and the second differences are 4, so $2a = 4$.
```

#### Three Points Determine a Quadratic {#three-points-determine-a-quadratic}
kind: theorem
prereqs: factor-theorem, quadratic-functions

Through any three points $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$ with distinct $x$-coordinates passes exactly one polynomial of degree at most 2. It is a quadratic exactly when the points are not collinear.

*Proof.* Existence: this polynomial passes through all three,
$$p(x) = y_1\frac{(x - x_2)(x - x_3)}{(x_1 - x_2)(x_1 - x_3)} + y_2\frac{(x - x_1)(x - x_3)}{(x_2 - x_1)(x_2 - x_3)} + y_3\frac{(x - x_1)(x - x_2)}{(x_3 - x_1)(x_3 - x_2)}.$$
Uniqueness: the difference of two such polynomials has degree at most 2 and three zeros, so by the [[factor-theorem]] it is the zero polynomial. If the points are collinear, their line is that polynomial, and otherwise its degree must be exactly 2. $\square$

#### Quadratic Functions
kind: definition
prereqs: polynomial-basics, function-graphs

A function of the form
$$f(x) = ax^2 + bx + c, \quad a \ne 0.$$
Its graph is a parabola, opening up when $a > 0$ and down when $a < 0$.

The parent quadratic function, $y = x^2$, with its vertex at the origin:
```graph
y = x^2
x: -2.5, 2.5
y: -1, 4
point: -1, 1 below-left
point: 0, 0 below-right
point: 1, 1 below-right
```

#### The Leading Coefficient {#quadratic-leading-coefficient}
kind: property
prereqs: quadratic-functions, graph-transformations

In $f(x) = ax^2 + bx + c$, the coefficient $a$ alone sets the shape of the parabola:
- $a > 0$ opens up, and $a < 0$ opens down;
- $|a| > 1$ is narrower than $y = x^2$, and $|a| < 1$ is wider.

Changing $b$ and $c$ moves the parabola without changing its shape. Here are $y = x^2$, $y = 2x^2$ (dashed) and $y = \frac{1}{2}x^2$ (faint):
```graph
y = x^2
y = 2x^2 | dashed
y = x^2/2 | faint
x: -2.5, 2.5
y: -1, 4
```

#### The Vertex {#parabola-vertex}
kind: property
prereqs: vertex-form, completing-the-square

The vertex of the parabola $y = ax^2 + bx + c$ is its turning point
$$(h, k) = \left(-\frac{b}{2a},\; c - \frac{b^2}{4a}\right),$$
the lowest point if $a > 0$ and the highest if $a < 0$.

*Proof.* [[completing-the-square|Complete the square]]:
$$\begin{aligned} ax^2 + bx + c &= a\left(x^2 + \frac{b}{a}x\right) + c \\ &= a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}. \end{aligned}$$
This is [[vertex-form]] with the $h$ and $k$ above. $\square$

The value $k$ is also $f(h)$, which is usually the quicker way to find it, and it equals $-\frac{\Delta}{4a}$, with $\Delta$ the [[discriminant|discriminant]].

```quiz
Q: What is the $x$-coordinate of the vertex of $y = x^2 - 6x + 5$?
A: 3
Why: $-\frac{b}{2a} = \frac{6}{2} = 3$.

Q: What is the $y$-coordinate of the vertex of $y = x^2 - 6x + 5$?
A: -4
Why: $f(3) = 9 - 18 + 5 = -4$.
```

#### Axis of Symmetry
kind: property
prereqs: parabola-vertex

A parabola with vertex $(h, k)$ is symmetric about the vertical line
$$x = h = -\frac{b}{2a},$$
that is, for every $t$:
$$f(h + t) = f(h - t).$$

*Proof.* Both sides equal $at^2 + k$ in [[vertex-form]]. $\square$

So two different inputs with the same output lie equally far from the axis: if $f(p) = f(q)$ with $p \ne q$, then
$$h = \frac{p + q}{2}.$$
In particular the axis runs midway between the roots.

#### Intercepts {#parabola-intercepts}
kind: property
prereqs: quadratic-functions, discriminant

The parabola $y = ax^2 + bx + c$ meets the $y$-axis once, at $(0, c)$, and meets the $x$-axis at its real roots, of which it has two, one or none as the [[discriminant|discriminant]] is positive, zero or negative.

#### Range & Monotonicity {#quadratic-range}
kind: property
prereqs: quadratic-extreme-value, domain-and-range

A quadratic function with vertex $(h, k)$ has domain $\mathbb{R}$, and
- if $a > 0$, its range is $[k, \infty)$, and it decreases on $(-\infty, h]$ and increases on $[h, \infty)$;
- if $a < 0$, its range is $(-\infty, k]$, and it increases on $(-\infty, h]$ and decreases on $[h, \infty)$.

```quiz
Q: What is the least number in the range of $f(x) = 3(x - 1)^2 + 4$?
A: 4
Why: $a > 0$, so the range is $[4, \infty)$.
```

#### The Odd-Number Pattern {#odd-number-pattern}
kind: property
prereqs: vertex-form

Going out from the vertex of $f(x) = a(x - h)^2 + k$ in steps of 1, either way, the rises are $a$ times the odd numbers in turn:
$$f(h + n + 1) - f(h + n) = a(2n + 1), \quad n = 0, 1, 2, \dots$$

*Proof.* The difference is $a\left((n + 1)^2 - n^2\right) = a(2n + 1)$. $\square$

So from the vertex of $y = x^2$: over 1 up 1, over 1 up 3, over 1 up 5, and so on.
```graph
y = x^2
segment: 0, 0, 1, 0
segment: 1, 0, 1, 1
segment: 1, 1, 2, 1
segment: 2, 1, 2, 4
segment: 2, 4, 3, 4
segment: 3, 4, 3, 9
label: 1, 0.5 "1" right
label: 2, 2.5 "3" right
label: 3, 6.5 "5" right
x: -0.5, 4
y: -0.5, 10
grid: 1, 1
```

| steps from the vertex | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| height above the vertex, in units of $a$ | 0 | 1 | 4 | 9 | 16 |
| rise of this step, in units of $a$ | | 1 | 3 | 5 | 7 |

Each slope of a unit step is an odd number times $a$, and adding them up gives the squares:
$$1 + 3 + 5 + \cdots + (2n - 1) = n^2.$$
For a step of $d$ instead of 1, the rises are $ad^2$ times the odd numbers.

```quiz
Q: On $y = 3x^2$, how far does the curve rise from $x = 2$ to $x = 3$?
A: 15
Why: This is the third step out from the vertex, so the rise is $3 \cdot 5 = 15$.

Q: From the vertex of $y = -2(x - 1)^2 + 5$, what is the change in $y$ over the second unit step?
A: -6
Why: $a \cdot 3 = -6$.
```

#### Sign of a Quadratic {#quadratic-sign}
kind: property
prereqs: quadratic-factored-form, discriminant

Let $f(x) = ax^2 + bx + c$ with [[discriminant|discriminant]] $\Delta$.
- If $\Delta < 0$, then $f(x)$ has the sign of $a$ for every $x$.
- If $\Delta = 0$, then $f(x)$ has the sign of $a$ except at the root, where it is $0$.
- If $\Delta > 0$, with roots $r < s$, then $f(x)$ has the sign of $a$ for $x < r$ and $x > s$, and the opposite sign for $r < x < s$.

#### Standard Form {#quadratic-standard-form}
kind: form
prereqs: quadratic-functions

$$f(x) = ax^2 + bx + c, \quad a \ne 0.$$

| Reads off | From |
| --- | --- |
| direction and width | $a$ |
| $y$-intercept | $(0, c)$ |
| axis of symmetry | $x = -\frac{b}{2a}$ |
| slope where it crosses the $y$-axis | $b$ |
| number of real roots | $b^2 - 4ac$ |
| sum and product of the roots | $-\frac{b}{a}$ and $\frac{c}{a}$ |

The form for the [[quadratic-formula|quadratic formula]] and for adding, subtracting and differentiating quadratics.

#### Vertex Form
kind: form
prereqs: quadratic-standard-form, graph-transformations

$$f(x) = a(x - h)^2 + k, \quad a \ne 0.$$

| Reads off | From |
| --- | --- |
| direction and width | $a$ |
| vertex | $(h, k)$ |
| axis of symmetry | $x = h$ |
| maximum or minimum value | $k$ |
| as a transformation of $y = x^2$ | stretched by $a$, moved right $h$ and up $k$ |
| roots, when $-\frac{k}{a} \ge 0$ | $x = h \pm \sqrt{-\frac{k}{a}}$ |

The form for graphing and for maximum and minimum problems. [[completing-the-square|Completing the square]] reaches it from standard form.

#### Factored Form {#quadratic-factored-form}
kind: form
prereqs: quadratic-standard-form, factor-theorem

$$f(x) = a(x - r)(x - s), \quad a \ne 0.$$

| Reads off | From |
| --- | --- |
| direction and width | $a$ |
| roots, the $x$-intercepts | $x = r$ and $x = s$ |
| axis of symmetry | $x = \frac{r + s}{2}$ |
| $y$-intercept | $(0, ars)$ |
| sign | changes at $r$ and at $s$ |

Also called intercept form. A real quadratic has a factored form over $\mathbb{R}$ exactly when its [[discriminant|discriminant]] is $\Delta \ge 0$; when $\Delta = 0$ it is a perfect square, $a(x - r)^2$, with its vertex on the $x$-axis. Over $\mathbb{C}$ every quadratic has one.

#### Sum–Product Form {#sum-product-form}
kind: form
prereqs: vietas-formulas

For a quadratic with leading coefficient 1 and roots $r$ and $s$:
$$x^2 - (r + s)x + rs.$$

| Reads off | From |
| --- | --- |
| sum of the roots | the coefficient of $x$, with its sign changed |
| product of the roots | the constant term |

The form for factoring by inspection, and for writing down a quadratic with given roots.

#### Focal Form {#focal-form}
kind: form
prereqs: vertex-form

$$(x - h)^2 = 4p(y - k), \quad p \ne 0.$$

| Reads off | From |
| --- | --- |
| vertex | $(h, k)$ |
| focus | $(h, k + p)$ |
| directrix | $y = k - p$ |
| axis of symmetry | $x = h$ |
| leading coefficient | $a = \frac{1}{4p}$ |

Every point of the curve is as far from the focus as from the directrix: see [[parabolas]].

#### Solving by Factoring {#quadratics-by-factoring}
kind: skill
prereqs: factoring-trinomials, zero-product-property, equations-and-solutions

Get 0 on one side, factor, and set each factor to 0:
$$\begin{aligned} x^2 + x - 6 &= 0 \\ (x + 3)(x - 2) &= 0 \end{aligned}$$
so $x = -3$ or $x = 2$.

#### Solving by Square Roots {#quadratics-by-square-roots}
kind: skill
prereqs: square-roots, exponents, one-step-equations

When there is no $x$ term, isolate the square and take both roots:
$$x^2 = 25 \implies x = \pm 5.$$

#### Completing the Square
kind: skill
prereqs: special-products, quadratics-by-square-roots

Add the number that makes a perfect square:
$$\begin{aligned} x^2 + 6x + 2 &= 0 \\ x^2 + 6x + 9 &= 7 \\ (x + 3)^2 &= 7 \\ x &= -3 \pm \sqrt{7} \end{aligned}$$
It is also how vertex form is found.

#### Solving with the Formula {#solving-with-the-quadratic-formula}
kind: skill
prereqs: quadratic-formula, simplifying-radicals

Solve with the [[quadratic-formula|quadratic formula]] in four steps:
1. write the equation as $ax^2 + bx + c = 0$;
2. read off $a$, $b$ and $c$, signs included;
3. work out $b^2 - 4ac$;
4. substitute and simplify.

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

#### Choosing a Method {#choosing-a-quadratic-method}
kind: skill
prereqs: quadratics-by-factoring, solving-with-the-quadratic-formula

Choose the method from the shape of the equation:

| The equation | Method |
| --- | --- |
| has no $x$ term, or is $(x - h)^2 = q$ | [[quadratics-by-square-roots]] |
| has a discriminant that is a perfect square | [[quadratics-by-factoring]] |
| has $a = 1$ and an even $b$ | [[completing-the-square]] |
| is anything else | [[solving-with-the-quadratic-formula]] |

#### Converting Between Forms {#converting-quadratic-forms}
kind: skill
prereqs: completing-the-square, quadratics-by-factoring, vertex-form, quadratic-factored-form

Convert between the forms by:
- vertex or factored to standard: expand;
- standard to vertex: complete the square, or take $h = -\frac{b}{2a}$ and $k = f(h)$;
- standard to factored: factor, or find the roots by the [[quadratic-formula|quadratic formula]];
- factored to vertex: take $h = \frac{r + s}{2}$ and $k = f(h)$.

**Example.** One quadratic in all three forms:
$$\begin{aligned} y &= 2x^2 - 8x + 6 \\ &= 2(x - 2)^2 - 2 \\ &= 2(x - 1)(x - 3). \end{aligned}$$

```quiz
Q: Write $y = x^2 + 4x + 1$ as $y = (x - h)^2 + k$. What is $k$?
A: -3
Why: $x^2 + 4x + 1 = (x + 2)^2 - 4 + 1 = (x + 2)^2 - 3$.

Q: What is the $x$-coordinate of the vertex of $y = (x - 2)(x - 8)$?
A: 5
Why: The axis runs midway between the roots: $\frac{2 + 8}{2} = 5$.
```

#### Sketching a Parabola {#sketching-a-parabola}
kind: skill
prereqs: odd-number-pattern, axis-of-symmetry, parabola-intercepts

Sketch a parabola from its [[vertex-form]] in five steps:
1. read the direction from the sign of $a$;
2. plot the vertex;
3. step out from the vertex both ways, rising $a$, $3a$, $5a$;
4. mark the $y$-intercept and any real $x$-intercepts;
5. join the points in a smooth curve.

**Example.** For $y = 2(x - 1)^2 - 3$, the vertex is $(1, -3)$, and the rises are 2, then 6:
```graph
y = 2*(x-1)^2-3
x: -2, 4
y: -4, 6
point: 1, -3 below-right
point: 0, -1 left
point: 2, -1 right
point: -1, 5 left
point: 3, 5 right
```

#### Writing a Quadratic from Its Features {#writing-a-quadratic}
kind: skill
prereqs: vertex-form, quadratic-factored-form, three-points-determine-a-quadratic

Take the form that holds what is given, and find $a$ from one more point:
- from the vertex and a point, use $y = a(x - h)^2 + k$;
- from the roots and a point, use $y = a(x - r)(x - s)$;
- from three points, put each into $y = ax^2 + bx + c$ and solve the [[linear-systems|system]].

**Example.** With vertex $(2, -1)$, through $(4, 7)$:
$$\begin{aligned} 7 &= a(4 - 2)^2 - 1 \\ 8 &= 4a \\ a &= 2 \end{aligned}$$
so $y = 2(x - 2)^2 - 1$.

```quiz
Q: A parabola has roots 1 and 5 and passes through $(0, 10)$. What is $a$?
A: 2
Why: $10 = a(0 - 1)(0 - 5) = 5a$.
```

#### Solving Quadratic Inequalities {#quadratic-inequalities}
kind: skill
prereqs: quadratic-sign, quadratics-by-factoring, interval-notation

Find the roots, then use the [[quadratic-sign|sign of the quadratic]] on either side of them:
1. get 0 on one side;
2. solve the equation $f(x) = 0$;
3. read the sign outside and between the roots;
4. write the answer as intervals, with the ends included for $\le$ and $\ge$.

**Example.** To solve $x^2 - x - 6 < 0$:
$$(x + 2)(x - 3) < 0.$$
The parabola opens up, so it is negative between its roots, and the solution is $(-2, 3)$.

```quiz
Q: Which is the solution of $x^2 - 4 > 0$?
- $(-2, 2)$
+ $(-\infty, -2) \cup (2, \infty)$
- $(2, \infty)$
- $(-\infty, 2)$
Why: The parabola opens up, so it is positive outside its roots, $\pm 2$.
```

#### Maximum and Minimum Problems {#quadratic-optimization}
kind: skill
prereqs: quadratic-extreme-value

Write the quantity as a quadratic in one variable, find its vertex, and answer in the terms of the problem.

**Example.** A rectangle has perimeter 40. With width $x$, its height is $20 - x$, and its area is
$$A(x) = x(20 - x).$$
The roots are 0 and 20, so the vertex is at $x = 10$, and the greatest area is
$$A(10) = 100.$$

```quiz
Q: A ball's height is $h(t) = -5t^2 + 20t + 1$. What is its greatest height?
A: 21
Why: The vertex is at $t = \frac{20}{10} = 2$, and $h(2) = -20 + 40 + 1 = 21$.
```

#### Equations in Quadratic Form {#equations-in-quadratic-form}
kind: skill
prereqs: quadratics-by-factoring

Substitute a new variable for the repeated expression, solve the quadratic, and substitute back:
$$\begin{aligned} x^4 - 5x^2 + 4 &= 0 \\ u^2 - 5u + 4 &= 0 && u = x^2 \\ (u - 1)(u - 4) &= 0 \end{aligned}$$
so $x^2 = 1$ or $x^2 = 4$, and $x = \pm 1$ or $x = \pm 2$.

### Rational Expressions & Functions {#rational}
flow: down
rows: kinds
wrap: 6

Fractions with polynomials on top and bottom: the arithmetic of fractions, grown up.

#### Closure of Rational Expressions {#rational-closure}
kind: theorem
prereqs: rational-expressions

The sum, difference, product and quotient, by a non-zero expression, of rational expressions are rational expressions.

So rational expressions behave like fractions, and are closed under all four operations.

#### Rational Expressions
kind: definition
prereqs: polynomial-basics, fraction-concept

A ratio of polynomials, like
$$\frac{x + 1}{x^2 - 4}.$$
It is undefined wherever the bottom is 0, here at $x = \pm 2$.

#### Rational Functions
kind: definition
prereqs: rational-expressions, domain-and-range

Functions
$$f(x) = \frac{p(x)}{q(x)}$$
with polynomials $p$ and $q$. The domain is everything except the zeros of $q$, and that is where the interesting behaviour is.

The parent rational function, $y = \frac{1}{x}$, with both axes as asymptotes:
```graph
y = 1/x
x: -3, 3
y: -3, 3
asymptote: x = 0
asymptote: y = 0
point: -1, -1 below-left
point: 1, 1 above-right
point: 2, 1/2 "(2, ½)" above-right
```

#### Inverse Variation
kind: definition
prereqs: rational-functions

A quantity $y$ varies inversely with $x$ if, for a constant $k \ne 0$,
$$y = \frac{k}{x}.$$

The product $xy$ is constant.

#### Asymptotes & Holes {#asymptotes}
kind: property
prereqs: rational-functions, polynomial-functions, simplifying-rational-expressions

Lines a graph approaches but never settles on, and the gaps a cancelled factor leaves:
- where the bottom is 0 but the top isn't, the graph shoots off along a **vertical asymptote**;
- far out, the leading terms set a **horizontal** (or slanted) one;
- a factor that cancels leaves only a **hole**.

For example,
$$f(x) = \frac{2x}{x - 1}$$
has the vertical asymptote $x = 1$ and the horizontal asymptote $y = 2$.

#### Horizontal Asymptote Rule {#horizontal-asymptote-rule}
kind: property
prereqs: rational-functions, polynomial-functions

For $f(x) = \frac{p(x)}{q(x)}$, compare degrees:

| Degrees | End behaviour |
| --- | --- |
| $\deg p < \deg q$ | horizontal asymptote $y = 0$ |
| $\deg p = \deg q$ | horizontal asymptote $y =$ the ratio of the leading coefficients |
| $\deg p = \deg q + 1$ | slant asymptote: the quotient from dividing |
| $\deg p > \deg q + 1$ | no line: follows the quotient |

#### Hyperbola Form {#rational-shifted-form}
kind: form
prereqs: rational-functions, graph-transformations

$$y = \frac{a}{x - h} + k, \quad a \ne 0.$$

| Reads off | From |
| --- | --- |
| vertical asymptote | $x = h$ |
| horizontal asymptote | $y = k$ |
| domain and range | $x \ne h$ and $y \ne k$ |
| branches in quadrants I and III of the shifted axes, or II and IV | $a > 0$ or $a < 0$ |

#### Factored Form of a Rational Function {#rational-factored-form}
kind: form
prereqs: asymptotes

$$f(x) = a\frac{(x - r_1)\cdots(x - r_m)}{(x - s_1)\cdots(x - s_n)}.$$

| Reads off | From |
| --- | --- |
| zeros | the numerator's roots, not cancelled |
| vertical asymptotes | the denominator's roots, not cancelled |
| holes | roots that cancel |

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

#### Graphing Rational Functions
kind: skill
prereqs: asymptotes, zeros-and-multiplicity

A sketch in three steps:
1. Find the zeros, the asymptotes and the holes.
2. Test a point in each region.
3. Sketch the branches.

#### Complex Fractions {#complex-fractions}
kind: skill
prereqs: adding-rational-expressions

Multiply the top and bottom by the common denominator of every small fraction:
$$\frac{1 + \frac{1}{x}}{1 - \frac{1}{x^2}} \cdot \frac{x^2}{x^2} = \frac{x^2 + x}{x^2 - 1} = \frac{x}{x - 1}.$$

#### Rational Inequalities {#rational-inequalities}
kind: skill
prereqs: rational-functions, polynomial-inequalities

Get 0 on one side as a single fraction. Mark the zeros of the top and of the bottom on a number line, test each interval, and leave out every zero of the bottom. Do not multiply through by an expression whose sign is unknown.

**Example.** $\frac{x - 1}{x + 2} \le 0$ has solution $(-2, 1]$.

#### Rate & Work Problems {#rate-work-problems}
kind: skill
prereqs: solving-rational-equations

Rates add. If one worker takes $a$ hours and another $b$ hours, then together, in $t$ hours:
$$\frac{1}{a} + \frac{1}{b} = \frac{1}{t}.$$

```quiz
Q: One pipe fills a tank in 3 hours and another in 6 hours. How many hours do they take together?
A: 2
Why: $\frac{1}{3} + \frac{1}{6} = \frac{1}{2}$.
```

#### Partial Fractions {#partial-fractions-algebra}
kind: skill
prereqs: adding-rational-expressions, polynomial-factored-form

Undo a sum of fractions: write the fraction with a constant over each linear factor, and find the constants:
$$\frac{5x - 1}{(x - 1)(x + 1)} = \frac{2}{x - 1} + \frac{3}{x + 1}.$$

### Radical Expressions & Functions {#radicals}
flow: down
rows: kinds
wrap: 6

Functions built from roots, and equations with variables under a root sign.

#### Roots Undo Powers {#roots-as-inverses}
kind: theorem
prereqs: inverse-functions, radical-functions

$\sqrt{x}$ is the inverse of $x^2$ restricted to $x \ge 0$, and $\sqrt[3]{x}$ is the inverse of $x^3$. That is why
$$\sqrt{x^2} = |x|,$$
not $x$.

#### The Square Root Function {#square-root-function}
kind: definition
prereqs: square-roots, function-graphs, domain-and-range

The function
$$f(x) = \sqrt{x}$$
is half a sideways parabola, starting at the origin and rising ever more slowly. Its domain is $x \ge 0$.

The parent square root function, $y = \sqrt{x}$:
```graph
y = sqrt(x)
x: -1, 5
y: -1, 3
point: 0, 0 below-right
point: 1, 1 below-right
point: 4, 2 below-right
```

#### Radical Functions
kind: definition
prereqs: square-root-function, nth-roots, graph-transformations

Functions such as $\sqrt{x - 2} + 1$ or $\sqrt[3]{x}$: root functions moved and stretched. Even roots need a non-negative inside; odd roots accept anything.

The parent cube root function, $y = \sqrt[3]{x}$, defined for every $x$:
```graph
y = cbrt(x)
x: -3, 3
y: -2, 2
point: -1, -1 above-left
point: 0, 0 below-right
point: 1, 1 below-right
```

#### The Cube Root Function {#cube-root-function}
kind: definition
prereqs: nth-roots, function-graphs

The function $f(x) = \sqrt[3]{x}$, the inverse of $y = x^3$, defined for every real $x$.

```graph
y = cbrt(x)
x: -8, 8
y: -3, 3
point: 0, 0 below-right
point: 1, 1 above
point: -1, -1 below
```

#### Features of Radical Functions {#radical-function-features}
kind: property
prereqs: square-root-function, cube-root-function

For $y = a\sqrt{x - h} + k$ with $a > 0$: the graph starts at $(h, k)$, the domain is $[h, \infty)$, the range is $[k, \infty)$, and it rises ever more slowly.

For $y = a\sqrt[3]{x - h} + k$: the domain and range are $\mathbb{R}$, and $(h, k)$ is the point of symmetry.

#### Radical Function Form {#radical-function-form}
kind: form
prereqs: radical-functions, graph-transformations

$$y = a\sqrt[n]{x - h} + k.$$

| Reads off | From |
| --- | --- |
| the starting point, or centre | $(h, k)$ |
| stretch and flip | $a$ |
| domain, for even $n$ | $x \ge h$ |

#### Solving Radical Equations
kind: skill
prereqs: nth-roots, quadratics-by-factoring

Isolate the radical, then raise both sides to the power that undoes it. Squaring can create **extraneous** solutions that do not satisfy the original equation, so always check.

$$\begin{aligned} \sqrt{x + 2} &= x \\ x + 2 &= x^2 \\ 0 &= x^2 - x - 2 = (x - 2)(x + 1) \end{aligned}$$

Checking:
- $x = 2$ works: $\sqrt{4} = 2$;
- $x = -1$ gives $\sqrt{1} = 1 \ne -1$, so it is extraneous.

#### Graphing Radical Functions {#graphing-radical-functions}
kind: skill
prereqs: radical-function-form

Plot $(h, k)$, then step right by $1$, $4$ and $9$ from it, rising $a$, $2a$ and $3a$ for a square root, and join the points.

### Exponentials & Logarithms {#exponentials-and-logarithms}
flow: down
rows: kinds
wrap: 6

Growth by a constant factor, and the logarithms that measure it.

#### Laws of Logarithms {#log-laws}
kind: theorem
prereqs: logarithms, exponent-laws

For $b > 0$, $b \ne 1$, and $x, y > 0$:
$$\begin{aligned} \log_b(xy) &= \log_b x + \log_b y \\ \log_b \frac{x}{y} &= \log_b x - \log_b y \\ \log_b x^r &= r \log_b x \\ \log_b 1 &= 0 \\ b^{\log_b x} &= x \\ \log_b b^x &= x \end{aligned}$$

#### Constant Ratio Theorem {#constant-ratio-theorem}
kind: theorem
prereqs: exponential-functions

A function given at equally spaced inputs is exponential if and only if each output divided by the one before is the same constant.

*Proof.* For $f(x) = ab^x$, $\frac{f(x + d)}{f(x)} = b^d$, the same for every $x$. Conversely, a constant ratio $r$ over step $d$ gives $f(x_0 + nd) = f(x_0)r^n$, which is exponential in $n$. $\square$

#### Exponentials and Logarithms Are Inverses {#exp-log-inverses}
kind: theorem
prereqs: logarithms, inverse-functions

For $b > 0$, $b \ne 1$, the functions $b^x$ and $\log_b x$ are inverses:
$$\log_b(b^x) = x \quad\text{and}\quad b^{\log_b x} = x \ (x > 0).$$

*Proof.* Both are restatements of the definition: $\log_b y$ is the power of $b$ that gives $y$. $\square$

#### Exponentials Outgrow Polynomials {#exponentials-outgrow}
kind: theorem
prereqs: exponential-functions, polynomial-functions

For every $b > 1$ and every polynomial $p$, the value of $b^x$ eventually exceeds $p(x)$, however large the coefficients.

For example, $2^x$ passes $x^3$ for good at about $x = 10$.

#### Exponential Functions
kind: definition
prereqs: rational-exponents, function-graphs

The function
$$f(x) = a \cdot b^x$$
multiplies by $b$ for each step in $x$, rather than adding a fixed amount. With $b > 1$ it grows; with $0 < b < 1$ it decays toward 0.

The parent exponential function, $y = 2^x$, with the $x$-axis as asymptote:
```graph
y = 2^x
x: -3, 3
y: -1, 5
asymptote: y = 0
point: -1, 1/2 "(−1, ½)" above-left
point: 0, 1 above-left
point: 1, 2 above-left
```

#### The Number e {#number-e}
kind: definition
prereqs: exponential-growth

The number
$$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n \approx 2.71828,$$
what \$1 grows to in a year at 100% interest compounded continuously. It is the natural base for growth.

#### Logarithms
kind: definition
prereqs: exponents

For $b > 0$, $b \ne 1$ and $x > 0$, $\log_b x$ is the unique real number $y$ with
$$b^y = x.$$
Thus $\log_b$ is the inverse of $x \mapsto b^x$; for example,
$$\log_2 8 = 3 \quad\text{because}\quad 2^3 = 8.$$

#### The Natural Logarithm {#natural-log}
kind: definition
prereqs: logarithms, number-e

The logarithm to base $e$, and the one calculus prefers:
$$\ln x = \log_e x.$$

Its graph, $y = \ln x$, with the $y$-axis as asymptote:
```graph
y = ln(x)
x: -0.8, 4.2
y: -2.5, 2
asymptote: x = 0
point: 1/e, -1 "(1/e, −1)" below-right
point: 1, 0 below-right
point: e, 1 below-right
```

#### Graphs of Logarithms {#log-graphs}
kind: property
prereqs: logarithms, graph-transformations

The exponential graph reflected in $y = x$: it rises without bound but ever more slowly, and has a vertical asymptote at $x = 0$.

The parent logarithm $y = \log_2 x$, the reflection of $y = 2^x$ (faint) in the line $y = x$ (dashed):
```graph
y = log2(x)
y = 2^x | faint
y = x | dashed
x: -1.5, 4.5
y: -2.5, 3.5
asymptote: x = 0
point: 1/2, -1 "(½, −1)" below-right
point: 1, 0 below-right
point: 2, 1 below-right
```

#### Properties of Exponential Functions {#exponential-properties}
kind: property
prereqs: exponential-functions

For $f(x) = ab^x$ with $a > 0$, $b > 0$, $b \ne 1$:
- the domain is $\mathbb{R}$ and the range is $(0, \infty)$;
- the $y$-intercept is $(0, a)$;
- the line $y = 0$ is a horizontal asymptote;
- it increases if $b > 1$ and decreases if $0 < b < 1$.

#### Properties of Logarithmic Functions {#log-properties}
kind: property
prereqs: logarithms, exponential-functions

For $f(x) = \log_b x$ with $b > 0$, $b \ne 1$:
- the domain is $(0, \infty)$ and the range is $\mathbb{R}$;
- the $x$-intercept is $(1, 0)$;
- the line $x = 0$ is a vertical asymptote;
- it increases if $b > 1$ and decreases if $0 < b < 1$.

#### Exponential Growth & Decay {#exponential-growth}
kind: form
prereqs: exponential-functions, percent-change

Growing by a fixed percent: \$1000 at 5% a year grows to
$$A(t) = 1000(1.05)^t$$
after $t$ years. Populations, compound interest, radioactive decay and cooling coffee all work this way.

#### Change of Base
kind: formula
prereqs: log-laws

For $a, b > 0$ with $a, b \ne 1$, and $x > 0$:
$$\log_b x = \frac{\log_a x}{\log_a b} = \frac{\ln x}{\ln b}$$

#### Exponential Function Form {#exponential-form}
kind: form
prereqs: exponential-functions

$$y = ab^x + k, \quad a \ne 0,\ b > 0,\ b \ne 1.$$

| Reads off | From |
| --- | --- |
| value at $x = 0$ | $a + k$ |
| growth factor per unit | $b$ |
| horizontal asymptote | $y = k$ |

#### Half-Life & Doubling Form {#half-life-form}
kind: form
prereqs: exponential-growth

$$y = a\left(\frac{1}{2}\right)^{t/T} \quad\text{or}\quad y = a \cdot 2^{t/T}.$$

| Reads off | From |
| --- | --- |
| starting amount | $a$ |
| half-life, or doubling time | $T$ |

#### Compound Interest Form {#compound-interest}
kind: form
prereqs: exponential-growth, number-e

$$A = P\left(1 + \frac{r}{n}\right)^{nt}, \qquad A = Pe^{rt} \text{ for continuous compounding}.$$

| Reads off | From |
| --- | --- |
| principal | $P$ |
| annual rate, as a decimal | $r$ |
| compoundings per year | $n$ |
| years | $t$ |

#### Logarithmic Form {#log-exponential-forms}
kind: form
prereqs: logarithms

$$\log_b y = x \iff b^x = y.$$

The two sides say the same thing: the logarithm is the exponent.

#### Solving Exponential Equations
kind: skill
prereqs: log-laws, linear-equations

Take a logarithm of both sides to bring the variable down from the exponent:
$$\begin{aligned} 3^x &= 20 \\ x \ln 3 &= \ln 20 \\ x &= \frac{\ln 20}{\ln 3} \approx 2.73 \end{aligned}$$

#### Solving Logarithmic Equations {#solving-log-equations}
kind: skill
prereqs: log-laws, log-exponential-forms, extraneous-solutions

Combine the logarithms into one, write it in exponential form, solve, and reject any solution that puts a non-positive number inside a logarithm:
$$\begin{aligned} \log_2 x + \log_2(x - 2) &= 3 \\ x(x - 2) &= 8 \\ x &= 4 \text{ or } x = -2 \end{aligned}$$
so $x = 4$.

```quiz
Q: Solve $\log_3(2x + 1) = 2$.
A: 4
Why: $2x + 1 = 9$.
```

#### Graphing Exponentials & Logarithms {#graphing-exponentials}
kind: skill
prereqs: exponential-properties, log-properties

Mark the asymptote, the intercept, and one point a unit along. For $y = 2^x$ these are $y = 0$, $(0, 1)$, $(1, 2)$; for $y = \log_2 x$ they are $x = 0$, $(1, 0)$, $(2, 1)$. A logarithm is the exponential reflected in $y = x$.

#### Writing Exponential Models {#writing-exponential-models}
kind: skill
prereqs: exponential-form, constant-ratio-theorem

Find $a$ from the starting value and $b$ from a ratio, or from a percent: growth of $r$ gives $b = 1 + r$, decay of $r$ gives $b = 1 - r$.

**Example.** A \$20,000 car loses 15% of its value a year:
$$V(t) = 20000(0.85)^t.$$

```quiz
Q: \$1000 grows at 10% a year, compounded yearly. What is it worth after 2 years, in dollars?
A: 1210
Why: $1000(1.1)^2 = 1210$.
```

#### Rewriting Exponential Expressions {#rewriting-exponentials}
kind: skill
prereqs: exponent-laws

Use the laws of exponents to show a different rate. Yearly growth of 15% as a monthly factor:
$$1.15^t = \left(1.15^{1/12}\right)^{12t} \approx 1.0117^{12t},$$
about 1.17% a month.

## Systems of Equations {#systems}
flow: down
rows: kinds
wrap: 6

Several equations sharing unknowns, solved together.

### Elimination Preserves Solutions {#elimination-theorem}
kind: theorem
prereqs: linear-systems, equivalent-equations

Replacing one equation of a system by the sum of it and a multiple of another gives a system with the same solutions.

*Proof.* A pair that satisfies $P = a$ and $Q = b$ satisfies $P + kQ = a + kb$. Conversely, subtracting $k$ times the second equation recovers the first. $\square$

### Number of Solutions of a System {#system-solution-count}
kind: theorem
prereqs: linear-systems, parallel-perpendicular-slopes

Two linear equations in two unknowns have
- exactly one solution if the lines cross, that is, if their slopes differ;
- no solution if the lines are parallel and different;
- infinitely many solutions if they are the same line.

### Systems of Linear Equations {#linear-systems}
kind: definition
prereqs: linear-equations

Two or more linear equations in the same variables. A solution satisfies all of them at once: for two lines, it is where they cross.

### Cramer's Rule
kind: formula
prereqs: linear-systems, determinants

If $ad - bc \ne 0$, the system $ax + by = e$, $cx + dy = f$ has the one solution
$$x = \frac{ed - bf}{ad - bc}, \quad y = \frac{af - ec}{ad - bc}.$$

### Matrix Form of a System {#system-matrix-form}
kind: form
prereqs: linear-systems, matrix-operations

$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} e \\ f \end{bmatrix}.$$

The coefficients, unknowns and constants are written apart, ready for [[matrix-inverses|the inverse matrix]] or [[row-reduction]].

### Solving by Graphing {#systems-by-graphing}
kind: skill
prereqs: linear-systems, graphing-lines

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

### Linear–Quadratic Systems {#linear-quadratic-systems}
kind: skill
prereqs: substitution-method, solving-with-the-quadratic-formula

Substitute the line into the curve and solve the quadratic. Its two, one or no real solutions are the points where the line crosses, touches or misses the curve.

**Example.** For $y = x + 2$ and $y = x^2$: $x^2 - x - 2 = 0$, so the points are $(2, 4)$ and $(-1, 1)$.

```quiz
Q: At how many points does $y = 2x - 1$ meet $y = x^2$?
A: 1
Why: $x^2 - 2x + 1 = (x - 1)^2 = 0$: the line is a tangent.
```

### Three Equations in Three Unknowns {#three-variable-systems}
kind: skill
prereqs: elimination-method

Use one pair of equations, and then another, to eliminate the same variable. This leaves two equations in two unknowns. Solve them, then substitute back.

### Linear Programming {#linear-programming}
kind: skill
prereqs: systems-of-inequalities

Graph the constraints as a [[systems-of-inequalities|system of inequalities]]. The greatest and least values of a linear objective occur at corners of the region, so evaluate it at each corner.

### System Word Problems {#system-word-problems}
kind: skill
prereqs: linear-systems, word-problems

Name two unknowns, and write one equation for each fact.

**Example.** 20 tickets, adults at \$8 and children at \$5, bring in \$130: $a + c = 20$ and $8a + 5c = 130$, so $a = 10$ and $c = 10$.

## Exponents & Radicals
flow: down
rows: kinds
wrap: 6

Powers beyond whole numbers, and the roots that undo them.

### Laws of Exponents {#exponent-laws}
kind: theorem
prereqs: exponents, variables

For $a, b > 0$ and real $m, n$:
$$\begin{aligned} a^m a^n &= a^{m+n} \\ \frac{a^m}{a^n} &= a^{m-n} \\ (a^m)^n &= a^{mn} \\ (ab)^n &= a^n b^n \\ a^0 &= 1 \\ a^{-n} &= \frac{1}{a^n} \end{aligned}$$

### Rules of Radicals {#radical-rules}
kind: theorem
prereqs: nth-roots, exponent-laws

For $a, b \ge 0$ and $b \ne 0$ in the quotient:
$$\sqrt[n]{ab} = \sqrt[n]{a}\sqrt[n]{b}, \qquad \sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}.$$

*Proof.* Both sides are non-negative, and their $n$th powers are equal by the [[exponent-laws|laws of exponents]]. $\square$

There is no such rule for sums: $\sqrt{9 + 16} \ne \sqrt{9} + \sqrt{16}$.

### Irrationality of the Square Root of 2 {#sqrt-2-irrational}
kind: theorem
prereqs: square-roots, proof-by-contradiction

$\sqrt{2}$ is not a rational number.

*Proof.* Suppose $\sqrt{2} = \frac{p}{q}$ in lowest terms. Then $p^2 = 2q^2$, so $p$ is even, say $p = 2k$. Then $q^2 = 2k^2$, so $q$ is even too, which contradicts lowest terms. $\square$

### Sums & Products with Irrationals {#irrational-closure}
kind: theorem
prereqs: number-systems

The sum and product of two rationals are rational. The sum of a rational and an irrational is irrational, and so is the product of a non-zero rational and an irrational.

*Proof.* If $r$ and $r + x$ were both rational, so would $x = (r + x) - r$ be. Products are the same, with division by $r$. $\square$

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

### Rational Exponents
kind: definition
prereqs: negative-exponents, nth-roots

A fractional exponent is a root:
$$\begin{aligned} a^{1/n} &= \sqrt[n]{a}, \\ a^{m/n} &= \left(\sqrt[n]{a}\right)^m. \end{aligned}$$
So
$$8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4.$$

### Radical & Exponent Form {#radical-exponent-form}
kind: form
prereqs: rational-exponents

$$a^{m/n} = \sqrt[n]{a^m} = \left(\sqrt[n]{a}\right)^m, \quad a \ge 0.$$

The denominator is the root and the numerator the power. Exponent form is the one for the laws of exponents.

### Simplifying Radicals
kind: skill
prereqs: radical-rules, factors

Pull perfect powers out from under the root:
$$\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}.$$

### Rationalizing Denominators
kind: skill
prereqs: simplifying-radicals, equivalent-fractions

Multiplying by a form of 1 to clear roots from the bottom:
$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}.$$
A bottom like $1 + \sqrt{2}$ is cleared with its conjugate $1 - \sqrt{2}$:
$$\frac{1}{1 + \sqrt{2}} = \frac{1 - \sqrt{2}}{(1 + \sqrt{2})(1 - \sqrt{2})} = \sqrt{2} - 1.$$

### Adding & Multiplying Radicals {#radical-arithmetic}
kind: skill
prereqs: simplifying-radicals, radical-rules

Simplify first. Add only like radicals, and multiply with the [[radical-rules|rules of radicals]] and the distributive law:
$$\begin{aligned} \sqrt{12} + \sqrt{27} &= 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3} \\ (1 + \sqrt{2})(3 - \sqrt{2}) &= 1 + 2\sqrt{2} \end{aligned}$$

```quiz
Q: $\sqrt{18} + \sqrt{8} = k\sqrt{2}$. What is $k$?
A: 5
Why: $3\sqrt{2} + 2\sqrt{2}$.
```

### Converting Radicals and Exponents {#converting-radicals}
kind: skill
prereqs: radical-exponent-form

Rewrite each root as a fractional exponent, apply the laws of exponents, and rewrite if needed:
$$\sqrt{x} \cdot \sqrt[3]{x} = x^{1/2 + 1/3} = x^{5/6}.$$

```quiz
Q: What is $8^{2/3}$?
A: 4
Why: $\sqrt[3]{8} = 2$, and $2^2 = 4$.
```

## Conic Sections
flow: down
rows: kinds
wrap: 6

The curves you get by slicing a double cone with a plane: circles, ellipses, parabolas and hyperbolas, the graphs of second-degree equations in $x$ and $y$.

### Focus and Eccentricity {#conic-eccentricity}
kind: theorem
prereqs: conics

Every conic other than a circle is the set of points whose distance to a fixed focus is a constant $e$ times their distance to a fixed directrix. It is an ellipse if $e < 1$, a parabola if $e = 1$, and a hyperbola if $e > 1$.

### Reflective Properties {#conic-reflection}
kind: theorem
prereqs: parabolas, ellipses

A ray from the focus of a parabola reflects parallel to its axis. A ray from one focus of an ellipse reflects through the other. A ray aimed at one focus of a hyperbola reflects toward the other.

### Conic Sections {#conics}
kind: definition
prereqs: coordinate-plane, polynomial-basics

Every second-degree equation in $x$ and $y$ draws a circle, an ellipse, a parabola or a hyperbola, and completing the square shows which.

### Parabolas
kind: definition
prereqs: conics, distance-formula

The points equally far from a fixed point, the focus, and a fixed line, the directrix. Satellite dishes and headlights are parabolas because of their focus.

### Ellipses
kind: definition
prereqs: conics, distance-formula

The points whose distances to two foci add up to a constant. Centred at the origin:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1.$$
Planets orbit in ellipses with the sun at one focus.

### Hyperbolas
kind: definition
prereqs: conics, distance-formula, asymptotes

The points whose distances to two foci differ by a constant: two branches,
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1,$$
closing in on a pair of asymptotes.

### Features of an Ellipse {#ellipse-features}
kind: property
prereqs: ellipses

For $\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1$ with $a > b > 0$:
- the centre is $(h, k)$;
- the major axis has length $2a$, and the minor axis $2b$;
- the foci lie $c$ from the centre along the major axis, where $c^2 = a^2 - b^2$;
- the eccentricity is $e = \frac{c}{a}$;
- the distances from any point to the foci add to $2a$.

### Features of a Hyperbola {#hyperbola-features}
kind: property
prereqs: hyperbolas

For $\frac{(x - h)^2}{a^2} - \frac{(y - k)^2}{b^2} = 1$:
- the centre is $(h, k)$, and the vertices are $(h \pm a, k)$;
- the foci are $(h \pm c, k)$, where $c^2 = a^2 + b^2$;
- the asymptotes are $y - k = \pm\frac{b}{a}(x - h)$;
- the eccentricity is $e = \frac{c}{a}$;
- the distances from any point to the foci differ by $2a$.

### Standard Forms of the Conics {#conic-standard-forms}
kind: form
prereqs: ellipses, hyperbolas, parabolas

| Conic | Form | Shows |
| --- | --- | --- |
| circle | $(x - h)^2 + (y - k)^2 = r^2$ | centre, radius |
| ellipse | $\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1$ | centre, semi-axes |
| hyperbola | $\frac{(x - h)^2}{a^2} - \frac{(y - k)^2}{b^2} = 1$ | centre, vertices, asymptotes |
| parabola | $(x - h)^2 = 4p(y - k)$ | vertex, focus, directrix |

### General Second-Degree Form {#conic-general-form}
kind: form
prereqs: conics

$$Ax^2 + Cy^2 + Dx + Ey + F = 0.$$

| Reads off | From |
| --- | --- |
| circle | $A = C$ |
| ellipse | $A$ and $C$ the same sign |
| hyperbola | $A$ and $C$ opposite signs |
| parabola | $A$ or $C$ is $0$ |

### Deriving the Equation of a Parabola {#deriving-parabola}
kind: skill
prereqs: parabolas, distance-formula

Set the distance to the focus $(0, p)$ equal to the distance to the directrix $y = -p$, then square:
$$\begin{aligned} \sqrt{x^2 + (y - p)^2} &= |y + p| \\ x^2 + y^2 - 2py + p^2 &= y^2 + 2py + p^2 \\ x^2 &= 4py \end{aligned}$$

### Putting a Conic in Standard Form {#conic-to-standard}
kind: skill
prereqs: completing-the-square, conic-standard-forms

Group the $x$ terms and the $y$ terms, complete the square in each, and divide to get 1 on the right:
$$\begin{aligned} x^2 + 4y^2 - 2x - 3 &= 0 \\ (x - 1)^2 + 4y^2 &= 4 \\ \frac{(x - 1)^2}{4} + y^2 &= 1 \end{aligned}$$
This is an ellipse with centre $(1, 0)$ and semi-axes 2 and 1.

```quiz
Q: What is the radius of the circle $x^2 + y^2 - 6x + 8y = 0$?
A: 5
Why: $(x - 3)^2 + (y + 4)^2 = 25$.
```

### Graphing Ellipses & Hyperbolas {#graphing-conics}
kind: skill
prereqs: ellipse-features, hyperbola-features

For an ellipse, mark the centre, step $a$ across and $b$ up, and join the four points in an oval. For a hyperbola, draw the box of sides $2a$ and $2b$ about the centre, extend its diagonals as the asymptotes, and draw the branches from the vertices.

## Complex Numbers {#complex}
flow: down
rows: kinds
wrap: 6

Numbers that make every polynomial solvable, built on a square root of $-1$.

### Complex Roots of Quadratics {#complex-roots}
kind: theorem
prereqs: complex-arithmetic, discriminant

When the discriminant is negative the quadratic formula still works:
$$x^2 + 2x + 5 = 0 \implies x = \frac{-2 \pm \sqrt{-16}}{2} = -1 \pm 2i,$$
a conjugate pair.

### Conjugate Product {#conjugate-product}
kind: theorem
prereqs: complex-conjugates, complex-modulus, complex-arithmetic

For every complex number $z = a + bi$:
$$z\bar{z} = a^2 + b^2 = |z|^2.$$

*Proof.* Expand:
$$(a + bi)(a - bi) = a^2 - b^2i^2 = a^2 + b^2. \quad \square$$

So every non-zero complex number has a reciprocal, $\frac{1}{z} = \frac{\bar{z}}{|z|^2}$, and the complex numbers are a field.

### The Imaginary Unit {#imaginary-unit}
kind: definition
prereqs: square-roots, negative-numbers

$i$ is a number with
$$i^2 = -1.$$
No real number does that, so $i$ is new. Its powers cycle:
$$i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1.$$

### What a Complex Number Is {#complex-numbers}
kind: definition
prereqs: imaginary-unit, number-systems

A number $a + bi$ with a real part $a$ and an imaginary part $b$. They live on a plane rather than a line, with the reals along one axis.

### Complex Conjugates
kind: definition
prereqs: complex-numbers

The conjugate of $z = a + bi$ is
$$\bar{z} = a - bi.$$

### Modulus of a Complex Number {#complex-modulus}
kind: definition
prereqs: complex-numbers, distance-formula

The modulus of $z = a + bi$ is its distance from $0$ in the complex plane:
$$|z| = \sqrt{a^2 + b^2}.$$

### Powers of i {#powers-of-i}
kind: property
prereqs: imaginary-unit, exponents

The powers of $i$ repeat with period 4:
$$i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1.$$

So $i^n$ depends only on the remainder of $n$ on dividing by 4.

```quiz
Q: Which is $i^{23}$?
- $1$
- $i$
- $-1$
+ $-i$
Why: 23 leaves remainder 3 on dividing by 4.
```

### The Complex Plane {#complex-plane}
kind: property
prereqs: complex-numbers, coordinate-plane

The number $a + bi$ is drawn as the point $(a, b)$, with the real numbers along the horizontal axis and the imaginary numbers along the vertical. Addition is vector addition, and the conjugate is the reflection in the real axis.

### Rectangular Form {#complex-rectangular-form}
kind: form
prereqs: complex-numbers

$$z = a + bi, \quad a, b \in \mathbb{R}.$$

| Reads off | From |
| --- | --- |
| real part | $a$ |
| imaginary part | $b$ |
| point in the complex plane | $(a, b)$ |
| modulus | $\sqrt{a^2 + b^2}$ |

For [[polar-complex|polar form]], $r(\cos\theta + i\sin\theta)$, see Trigonometry. It is the form for products and powers.

### Complex Arithmetic
kind: skill
prereqs: complex-numbers, expanding-brackets

Add like terms and multiply like binomials, replacing $i^2$ with $-1$:
$$(2 + i)(3 - i) = 6 + i - i^2 = 7 + i.$$
Divide using the conjugate.

### Dividing Complex Numbers {#complex-division}
kind: skill
prereqs: conjugate-product

Multiply top and bottom by the conjugate of the bottom:
$$\frac{3 + i}{1 + i} \cdot \frac{1 - i}{1 - i} = \frac{4 - 2i}{2} = 2 - i.$$

```quiz
Q: $\frac{10}{3 + i} = a + bi$. What is $a$?
A: 3
Why: $\frac{10(3 - i)}{10} = 3 - i$.
```

### Factoring over the Complex Numbers {#complex-factoring}
kind: skill
prereqs: complex-roots

A sum of squares factors over $\mathbb{C}$:
$$x^2 + 4 = (x + 2i)(x - 2i).$$
Find the roots with the quadratic formula, and write the factors.

## Sequences & Series
flow: down
rows: kinds
wrap: 6

Lists of numbers that follow a rule, and what you get by adding them up.

### Arithmetic Series
kind: theorem
prereqs: arithmetic-sequences

For an arithmetic sequence with first term $a_1$ and $n$-th term $a_n$:
$$\sum_{k=1}^{n} a_k = \frac{n(a_1 + a_n)}{2}.$$
In particular,
$$\sum_{k=1}^{n} k = \frac{n(n + 1)}{2}.$$

### Geometric Series
kind: theorem
prereqs: geometric-sequences

For $r \ne 1$:
$$\sum_{k=0}^{n-1} a r^k = a\,\frac{1 - r^n}{1 - r}$$

### Infinite Geometric Series
kind: theorem
prereqs: geometric-series

If $|r| < 1$ then
$$\sum_{k=0}^{\infty} a r^k = \frac{a}{1 - r};$$
if $|r| \ge 1$ and $a \ne 0$, the series diverges.

### Sequences
kind: definition
prereqs: variables

An ordered list $a_1, a_2, a_3, \ldots$, which is a function whose inputs are the counting numbers. Given by a formula for $a_n$ or by a rule linking each term to the last.

### Arithmetic Sequences
kind: definition
prereqs: sequences

Add the same difference each time: $3, 7, 11, 15, \ldots$ has
$$a_n = 3 + 4(n - 1).$$
A linear function, sampled at whole numbers.

### Geometric Sequences
kind: definition
prereqs: sequences, exponents

Multiply by the same ratio each time: $2, 6, 18, 54, \ldots$ has
$$a_n = 2 \cdot 3^{n-1}.$$
An exponential function, sampled at whole numbers.

### Sigma Notation
kind: definition
prereqs: sequences

A capital sigma means "add up":
$$\sum_{k=1}^{4} k^2 = 1 + 4 + 9 + 16 = 30.$$

### Average of an Arithmetic Series {#arithmetic-sum-idea}
kind: property
prereqs: arithmetic-series

Pairing the first and last terms, the second and second-last, and so on, gives equal sums, so
$$S_n = \frac{n(a_1 + a_n)}{2}.$$
The average of the terms is the average of the first and the last.

### Sequences as Functions {#sequences-as-functions}
kind: property
prereqs: sequences, function-notation

A sequence is a function whose domain is the positive integers. An arithmetic sequence is a linear function, sampled at the integers, and a geometric sequence an exponential one.

### Convergence of Geometric Series {#geometric-convergence}
kind: property
prereqs: infinite-geometric-series

The infinite series $a + ar + ar^2 + \cdots$ with $a \ne 0$ converges if $|r| < 1$ and diverges if $|r| \ge 1$.

### Explicit & Recursive Forms {#sequence-forms}
kind: form
prereqs: arithmetic-sequences, geometric-sequences

| Sequence | Explicit | Recursive |
| --- | --- | --- |
| arithmetic | $a_n = a_1 + (n - 1)d$ | $a_{n+1} = a_n + d$ |
| geometric | $a_n = a_1r^{n-1}$ | $a_{n+1} = ra_n$ |
| Fibonacci | | $a_{n+2} = a_{n+1} + a_n$ |

The explicit form gives any term at once. The recursive form shows how each term comes from the last, and needs a first term.

### Proof by Induction {#induction}
kind: technique
prereqs: sigma-notation, arithmetic-series

Two steps prove a statement for every $n \ge 1$:
1. the base case: prove it for $n = 1$;
2. the inductive step: show that whenever it holds for $n$, it holds for $n + 1$.

Like dominoes, every case falls.

### Finding the nth Term {#finding-nth-term}
kind: skill
prereqs: sequence-forms

Test the differences, then the ratios. A constant difference gives an arithmetic sequence; a constant ratio a geometric one; constant [[second-differences|second differences]] a quadratic.

```quiz
Q: What is the 10th term of $5, 8, 11, 14, \dots$?
A: 32
Why: $5 + 9 \cdot 3 = 32$.

Q: What is the 6th term of $3, 6, 12, \dots$?
A: 96
Why: $3 \cdot 2^5 = 96$.
```

### Evaluating Sums {#evaluating-series}
kind: skill
prereqs: arithmetic-series, geometric-series, sigma-notation

Write out the first terms to see the type of the series, find $a_1$ and the number of terms, and apply the formula.

```quiz
Q: What is $\sum_{k=1}^{4} 2^k$?
A: 30
Why: $2 + 4 + 8 + 16$.
```

### Loan & Annuity Payments {#finance-series}
kind: skill
prereqs: geometric-series, compound-interest

A sum paid in regularly is a geometric series. Payments of $P$ per period at rate $i$ per period grow, after $n$ periods, to
$$A = P\frac{(1 + i)^n - 1}{i},$$
and a loan of $L$ is repaid by payments of
$$P = \frac{Li}{1 - (1 + i)^{-n}}.$$
