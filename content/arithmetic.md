# Arithmetic
color: #a06a1c

Numbers and the four operations: the bedrock everything else stands on.

## Axioms {#arithmetic-axioms}

The axioms of the natural numbers, from which arithmetic is built.

### Peano Axioms {#peano-axioms}
kind: axiom
prereqs: counting

The natural numbers $\mathbb{N} = \{0, 1, 2, \ldots\}$ are characterised by five axioms:
1. $0 \in \mathbb{N}$;
2. every $n \in \mathbb{N}$ has a successor $S(n) \in \mathbb{N}$;
3. $0$ is not a successor;
4. $S(m) = S(n)$ implies $m = n$;
5. induction: any set containing $0$ and closed under $S$ contains all of $\mathbb{N}$.

Counting is repeated succession:
$$1 = S(0), \quad 2 = S(1), \quad 3 = S(2), \quad \ldots$$

Addition is defined by
$$\begin{aligned} n + 0 &= n, \\ n + S(m) &= S(n + m). \end{aligned}$$

## Whole Numbers

How whole numbers are written, ordered and compared.

### Counting
kind: skill

Saying the number names in order and matching each to exactly one object. The last number said tells you *how many* there are.

### Place Value
prereqs: counting

The value of a digit depends on where it sits: in 352 the 5 means fifty, because it is in the tens place. Ten of one place make one of the next.

### The Number Line {#number-line}
prereqs: counting

Numbers drawn as evenly spaced points on a line, bigger to the right. Distances along the line become differences between numbers.

### Comparing & Ordering Numbers {#comparing-numbers}
kind: skill
prereqs: place-value, number-line

Deciding which of two numbers is bigger, written with $<$, $>$ and $=$: compare the highest place values first.

### Rounding & Estimating {#rounding}
kind: skill
prereqs: place-value, number-line

Replacing a number with a nearby friendlier one, like
$$347 \approx 350,$$
to estimate an answer before working it out, and to check it after.

### Order-of-Magnitude Estimates {#order-of-magnitude}
kind: heuristic
prereqs: rounding

Round each number to one significant figure, or to the nearest power of 10, and calculate with those. The answer gives the size, not the digits.

So $48 \times 212 \approx 50 \times 200 = 10000$; the exact answer is 10176. Use this to check a calculation, or to estimate what can't be measured, such as how many piano tuners a city has.

## Operations
built-on: whole-numbers

The four operations, how they undo each other, and the order to do them in.

### Addition
kind: skill
prereqs: counting, place-value

Combining amounts. Column addition lines up the place values and carries each ten into the next column.

### Subtraction
kind: skill
prereqs: addition

Taking away, or finding the difference between two numbers. It undoes addition:
$$8 - 3 = 5 \quad\text{because}\quad 5 + 3 = 8.$$

### Multiplication
kind: skill
prereqs: addition

Repeated addition: $4 \times 3$ is four threes,
$$4 \times 3 = 3 + 3 + 3 + 3.$$
Picture it as a rectangle of 4 rows and 3 columns.

### Division
kind: skill
prereqs: multiplication, subtraction

Sharing into equal groups, or asking how many groups fit. It undoes multiplication:
$$12 \div 3 = 4 \quad\text{because}\quad 4 \times 3 = 12.$$
Whatever doesn't fit is the remainder.

### Long Division
kind: skill
prereqs: division, place-value

Dividing a big number one place value at a time, repeating four steps:
1. divide;
2. multiply;
3. subtract;
4. bring down the next digit.

### Properties of Operations {#properties-of-operations}
prereqs: addition, multiplication

The tricks behind mental arithmetic:
- order doesn't matter when adding or multiplying: $3 + 5 = 5 + 3$;
- grouping doesn't either: $(2 + 3) + 4 = 2 + (3 + 4)$;
- multiplication spreads over addition: $3 \times 14 = 3 \times 10 + 3 \times 4$.

Algebra makes them its [[axioms]].

### Order of Operations
kind: definition
prereqs: exponents, division, subtraction

The convention for evaluating expressions, in this order:
1. brackets;
2. exponents;
3. multiplication and division, left to right;
4. addition and subtraction, left to right.

Thus
$$2 + 3 \times 4 = 2 + 12 = 14.$$

## Factors & Multiples
built-on: operations

How whole numbers break apart into products: the number theory behind fractions.

### Multiples
prereqs: multiplication

The multiples of a number are its times table, continued forever: the multiples of 4 are 4, 8, 12, 16, 20, …

### Factors
prereqs: multiplication, division

A factor of a number divides it with no remainder. The factors of 12 are 1, 2, 3, 4, 6 and 12, and they come in pairs that multiply to 12:
$$1 \times 12 = 2 \times 6 = 3 \times 4 = 12.$$

### Divisibility Rules
kind: skill
prereqs: factors, place-value

Shortcuts for spotting factors. A number is divisible
- by 3 when its digits add up to a multiple of 3;
- by 5 when it ends in 0 or 5;
- by 9 when its digits add up to a multiple of 9.

### Prime Numbers {#primes}
kind: definition
prereqs: factors

An integer $p > 1$ is prime if its only positive divisors are $1$ and $p$: 2, 3, 5, 7, 11, 13, … An integer greater than 1 that is not prime is composite; 1 is neither.

### Prime Factorization
kind: skill
prereqs: primes, divisibility-rules

Writing a number as a product of primes, for instance with a factor tree:
$$60 = 2 \times 2 \times 3 \times 5.$$

### Fundamental Theorem of Arithmetic
kind: theorem
prereqs: prime-factorization

Every integer $n > 1$ can be written as a product of primes,
$$n = p_1 p_2 \cdots p_k,$$
and this factorisation is unique up to the order of the factors.

### Greatest Common Factor {#gcf}
kind: definition
prereqs: factors

The greatest common factor $\gcd(a, b)$ of positive integers $a$ and $b$ is the largest positive integer dividing both.

Example:
$$\gcd(12, 18) = 6.$$

### Least Common Multiple {#lcm}
kind: definition
prereqs: multiples

The least common multiple $\operatorname{lcm}(a, b)$ of positive integers $a$ and $b$ is the smallest positive integer that is a multiple of both.

**By listing multiples.**
- multiples of 4: 4, 8, **12**, 16, …
- multiples of 6: 6, **12**, 18, …

The first one they share is the least:
$$\operatorname{lcm}(4, 6) = 12.$$

**By prime factorisation** (see [[prime-factorization]]): take each prime to the highest power in which it occurs.
$$4 = 2^2, \quad 6 = 2 \cdot 3 \quad\implies\quad \operatorname{lcm}(4, 6) = 2^2 \cdot 3 = 12.$$

**Identity.**
$$\operatorname{lcm}(a, b) \cdot \gcd(a, b) = ab.$$

```quiz
Q: What is $\operatorname{lcm}(4, 6)$?
- 2
- 10
+ 12
- 24
Hint: List the multiples of 6.
Why: 12 is the first multiple of 6 that 4 divides; 24 is common but not least.

Q: What is $\operatorname{lcm}(3, 5)$?
A: 15
Why: Coprime numbers have $\operatorname{lcm}(a, b) = ab$.

Q: What is $\operatorname{lcm}(8, 12)$?
A: 24
Why: $8 = 2^3$ and $12 = 2^2 \cdot 3$, so $2^3 \cdot 3 = 24$.
```

## Fractions
built-on: factors-and-multiples

Parts of a whole, and the arithmetic of parts.

### What a Fraction Is {#fraction-concept}
kind: definition
prereqs: number-line

$\frac{a}{b}$ means $a$ pieces of size $\frac{1}{b}$, when the whole is cut into $b$ equal pieces. It is also a division, $a \div b$, and a point on the number line.

The bottom number, the **denominator**, says how many equal pieces the whole is cut into, and so how big each piece is. The top number, the **numerator**, says how many of those pieces are taken. Here the whole is a circle:

: Parts of a Circle
| $\dfrac{1}{2}$ | $\dfrac{1}{4}$ | $\dfrac{3}{4}$ | $\dfrac{5}{8}$ |
| :-: | :-: | :-: | :-: |
| {{ shape: fraction 1/2 }} | {{ shape: fraction 1/4 }} | {{ shape: fraction 3/4 }} | {{ shape: fraction 5/8 }} |

The pieces must be equal: a circle cut into 4 pieces of different sizes does not show quarters. The more pieces the whole is cut into, the smaller each one is, so $\frac{1}{8} < \frac{1}{4}$.

```quiz
Q: A pizza is cut into 8 equal slices and 3 are eaten. What fraction of the pizza is eaten?
A: 3/8

Q: In $\frac{5}{6}$, what does the 6 tell you?
- how many pieces are taken
+ how many equal pieces the whole is cut into
- how big the whole is
Why: The denominator counts the equal pieces the whole is cut into.
```

### Equivalent Fractions
kind: theorem
prereqs: fraction-concept, multiplication

For $b \ne 0$ and $k \ne 0$:
$$\frac{a}{b} = \frac{ka}{kb}.$$
Two fractions are equal exactly when their cross products are:
$$\frac{a}{b} = \frac{c}{d} \iff ad = bc.$$

### Simplifying Fractions
kind: skill
prereqs: equivalent-fractions, gcf

Dividing the top and bottom by a common factor until none is left. Dividing both by $\gcd(12, 18) = 6$:
$$\frac{12}{18} = \frac{2}{3}.$$

### Comparing Fractions
kind: skill
prereqs: equivalent-fractions, comparing-numbers

Rewrite both over a common denominator, or cross-multiply:
$$\frac{3}{4} > \frac{5}{7} \quad\text{because}\quad 3 \times 7 = 21 > 5 \times 4 = 20.$$

### Mixed Numbers
prereqs: fraction-concept, division

A whole number and a fraction together, like $2\frac{1}{3}$. It is the same as an improper fraction,
$$2\frac{1}{3} = \frac{7}{3},$$
and converting between the two forms is a division with remainder.

### Converting Mixed Numbers & Improper Fractions {#mixed-number-conversion}
kind: skill
prereqs: mixed-numbers, long-division

To write a mixed number as an improper fraction, multiply the whole number by the denominator and add the numerator; that is the new numerator, over the same denominator:
$$w\frac{a}{b} = \frac{wb + a}{b}.$$
To go back, divide the numerator by the denominator: the quotient is the whole number, and the remainder is the new numerator, over the same denominator:
$$\frac{n}{b} = q\frac{r}{b}, \quad\text{where } n = qb + r,\ 0 \le r < b.$$

> **!** The denominator never changes in either direction. Only the whole number and the numerator trade places.

**Example.** Mixed to improper: $3$ wholes are $3 \times 4 = 12$ quarters, and $3$ more make $15$:
$$3\frac{3}{4} = \frac{3 \times 4 + 3}{4} = \frac{15}{4}.$$
Improper to mixed: $17 \div 5 = 3$ remainder $2$, so
$$\frac{17}{5} = 3\frac{2}{5}.$$

A mixed number is a sum, $w\frac{a}{b} = w + \frac{a}{b}$, which is why the conversion works: $3 + \frac{3}{4} = \frac{12}{4} + \frac{3}{4}$.

```quiz
Q: Write $2\frac{3}{5}$ as an improper fraction.
A: 13/5
Why: $2 \times 5 + 3 = 13$.

Q: Write $\frac{22}{7}$ as a mixed number. What is its whole-number part?
A: 3
Why: $22 \div 7 = 3$ remainder $1$, so $\frac{22}{7} = 3\frac{1}{7}$.

Q: Which is equal to $4\frac{1}{3}$?
- $\frac{5}{3}$
- $\frac{7}{3}$
+ $\frac{13}{3}$
- $\frac{12}{3}$
Why: $4 \times 3 + 1 = 13$.
```

### Adding Fractions
kind: formula
prereqs: equivalent-fractions, lcm

For $b, d \ne 0$:
$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$$
In practice, rewrite both over the least common denominator $\operatorname{lcm}(b, d)$, then add the numerators.

**Example.** Using $\operatorname{lcm}(4, 6) = 12$:
$$\frac{1}{4} + \frac{1}{6} = \frac{3}{12} + \frac{2}{12} = \frac{5}{12}.$$
Subtraction is the same:
$$\frac{5}{6} - \frac{1}{4} = \frac{10}{12} - \frac{3}{12} = \frac{7}{12}.$$

Common error:
$$\frac{a}{b} + \frac{c}{d} \ne \frac{a + c}{b + d}.$$

```quiz
Q: $\frac{1}{4} + \frac{1}{6} =$
A: 5/12
Hint: Use the denominator 12.
Why: $\frac{3}{12} + \frac{2}{12}$.

Q: What is the least common denominator of $\frac{2}{9} + \frac{5}{6}$?
- 3
- 15
+ 18
- 54
Why: $\operatorname{lcm}(9, 6) = 18$.

Q: $\frac{2}{3} - \frac{1}{2} =$
A: 1/6
Why: $\frac{4}{6} - \frac{3}{6}$.
```

### Multiplying Fractions
kind: formula
prereqs: fraction-concept, multiplication

For $b, d \ne 0$:
$$\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}.$$

### Reciprocals
kind: definition
prereqs: multiplying-fractions

The reciprocal of $\frac{a}{b}$ is $\frac{b}{a}$, and a number times its reciprocal is 1:
$$\frac{a}{b} \cdot \frac{b}{a} = 1.$$
Zero is the one number with no reciprocal.

### Dividing Fractions
kind: formula
prereqs: reciprocals

For $b, c, d \ne 0$:
$$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc}.$$

## Decimals & Percents
built-on: fractions

Fractions written in base ten, and "per hundred".

### Decimals
prereqs: place-value, fraction-concept

Place value continued to the right of the ones: tenths, hundredths, thousandths. $0.25$ is 2 tenths and 5 hundredths:
$$0.25 = \frac{2}{10} + \frac{5}{100} = \frac{25}{100}.$$

### Decimal Arithmetic
kind: skill
prereqs: decimals, long-division

Each operation has its own rule:
- add and subtract by lining up the decimal points;
- multiply as whole numbers, then place the point;
- divide by shifting both numbers until the divisor is whole.

### Fractions to Decimals and Back {#fractions-to-decimals}
kind: skill
prereqs: decimals, long-division, simplifying-fractions

Divide the top by the bottom to get a decimal, which either
- stops: $\frac{3}{8} = 0.375$; or
- repeats forever: $\frac{1}{3} = 0.333\ldots$

A decimal that stops is a fraction over a power of ten.

### Percents
prereqs: multiplying-fractions

Percent means per hundred:
$$35\% = \frac{35}{100} = 0.35.$$
So 35% of 80 is
$$\frac{35}{100} \times 80 = 28.$$

### Benchmark Percents {#benchmark-percents}
kind: heuristic
prereqs: percents

Build any percent in your head from 10%, 5% and 1%: 10% moves the decimal point one place, 5% is half of that, and 1% moves it two places.

For 15% of \$48, take 10%, which is \$4.80, and half of that, \$2.40, to get \$7.20.

### Percent Change
kind: skill
prereqs: percents

The change divided by the original amount. Going from 80 to 100 is an increase of
$$\frac{100 - 80}{80} = \frac{20}{80} = 25\%.$$
A 25% rise followed by a 25% fall does not get you back where you started.

### Scientific Notation
prereqs: decimals, exponents

Very large and very small numbers written as a number between 1 and 10 times a power of ten:
$$\begin{aligned} 3{,}000{,}000 &= 3 \times 10^6, \\ 0.0004 &= 4 \times 10^{-4}. \end{aligned}$$

## Ratios & Rates
built-on: fractions

Comparing quantities by dividing them.

### Ratios {#ratio}
kind: definition
prereqs: multiplication

A ratio compares two amounts: 3 cups of flour to 2 of sugar is $3 : 2$. Scaling both parts by the same number keeps the ratio the same.

### Rates & Unit Rates {#unit-rates}
prereqs: ratio, division

A rate compares different kinds of quantity, like 150 miles in 3 hours. The unit rate is the amount for one: 50 miles per hour.

### Proportions
prereqs: ratio, equivalent-fractions

Two equal ratios, like
$$\frac{3}{4} = \frac{9}{12}.$$
Proportional reasoning is scaling a recipe, reading a map scale, or converting currency.

### Unit Conversion
kind: skill
prereqs: unit-rates, multiplying-fractions

Multiply by fractions that equal 1, like $\frac{60\text{ min}}{1\text{ h}}$, arranged so the units you don't want cancel out.

## Integers
built-on: operations

The whole numbers and their negatives.

### Negative Numbers
kind: definition
prereqs: number-line

Numbers below zero: the number line continued to the left. $-3$ is three steps left of 0, like a temperature below freezing or a debt.

### The Negative Sign {#negative-sign}
kind: definition
prereqs: integer-multiplication

Written in front of a number or an expression, a minus sign means its opposite, and taking the opposite is the same as multiplying by $-1$:
$$-a = (-1) \cdot a.$$

The opposite of $a$ is the number the same distance from 0 on the other side, so the minus sign flips the sign of whatever it is in front of, which need not be positive:
$$\begin{aligned} -(5) &= (-1)(5) = -5 \\ -(-5) &= (-1)(-5) = 5 \\ -x &= 4 \quad\text{when } x = -4 \end{aligned}$$

Reading the minus sign as $-1$ settles the usual questions about it:
$$\begin{aligned} -(x + 3) &= (-1)(x + 3) = -x - 3 \\ -3^2 &= (-1) \cdot 3^2 = -9 \\ (-3)^2 &= (-3)(-3) = 9 \end{aligned}$$

> **!** In $-3^2$ the exponent comes first and the minus sign after, since the minus sign is a multiplication by $-1$. Only brackets, as in $(-3)^2$, square the negative.

The same sign is used for subtraction, $a - b$, which is adding the opposite: $a - b = a + (-b)$. In Algebra, $-a$ is defined as the number that adds to $a$ to make $0$, and that it equals $(-1)a$ is then proved: see [[negatives-in-products]].

```quiz
Q: $-(-7) =$
A: 7

Q: $-2^4 =$
A: -16
Why: $-2^4 = (-1) \cdot 2^4 = -16$.

Q: Which is equal to $-(x - 6)$?
- $-x - 6$
+ $-x + 6$
- $x + 6$
- $x - 6$
Why: $(-1)(x - 6) = -x + 6$.
```

### Absolute Value
kind: definition
prereqs: negative-numbers

A number's distance from zero, whichever side it is on:
$$|-5| = |5| = 5.$$

### Adding & Subtracting Integers {#integer-addition}
kind: skill
prereqs: negative-numbers, absolute-value, subtraction

On the number line:
- adding a negative moves left: $5 + (-2) = 3$;
- subtracting a negative moves right: $5 - (-2) = 7$.

### Multiplying & Dividing Integers {#integer-multiplication}
kind: skill
prereqs: integer-addition, multiplication, division

The sign of the answer comes from the signs of the two numbers:
- same signs give a positive: $(-3)(-4) = 12$;
- different signs give a negative: $(-12) \div 3 = -4$.

## Powers & Roots
built-on: operations

Repeated multiplication, and undoing it.

### Exponents
kind: definition
prereqs: multiplication

An exponent counts how many times a number is multiplied by itself:
$$2^3 = 2 \times 2 \times 2 = 8.$$
Squares and cubes are exponents 2 and 3.

### Square Roots
kind: definition
prereqs: multiplication

$\sqrt{n}$ is the non-negative number that, multiplied by itself, gives $n$.

For example,
$$\sqrt{49} = 7 \quad\text{because}\quad 7 \times 7 = 49.$$
Perfect squares have whole-number roots; others, like $\sqrt{2}$, do not.


### Estimating Square Roots {#estimating-square-roots}
kind: heuristic
prereqs: square-roots

If $a^2$ is the perfect square nearest to $n$, then
$$\sqrt{n} \approx a + \frac{n - a^2}{2a}.$$

For instance, $\sqrt{10} \approx 3 + \frac{1}{6} \approx 3.17$; the exact value is 3.162. It always comes out slightly high, and works best when $n$ is close to $a^2$.

## Number Systems
built-on: integers, decimals-and-percents
kind: definition
prereqs: negative-numbers, fractions-to-decimals, square-roots

The number systems, each contained in the next:
$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$$
- the natural numbers $\mathbb{N} = \{0, 1, 2, \ldots\}$ (some authors start at 1, and call $\{0, 1, 2, \ldots\}$ the whole numbers);
- the integers $\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}$;
- the rationals $\mathbb{Q} = \left\{ \frac{p}{q} : p, q \in \mathbb{Z},\ q \ne 0 \right\}$;
- the reals $\mathbb{R}$, every point of the number line, which also contain the irrationals such as $\sqrt{2}$ and $\pi$;
- the complex numbers $\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}$, where $i^2 = -1$.

A set of numbers is **closed** under an operation when doing that operation to any numbers in the set always gives an answer in the set. Each system is built because some operation is not closed in the one before it: there are problems whose answers it does not contain, and the next system adds those answers, keeping everything the old one had.

: Why Each System Is Needed
| System | Closed under | Not closed under | A problem with no answer | So we add |
| --- | --- | --- | --- | --- |
| $\mathbb{N}$ | $+$, $\times$ | $-$ | $3 - 5$; $x + 5 = 3$ | the negatives: $\mathbb{Z}$ |
| $\mathbb{Z}$ | $+$, $-$, $\times$ | $\div$ | $1 \div 3$; $3x = 1$ | the fractions: $\mathbb{Q}$ |
| $\mathbb{Q}$ | $+$, $-$, $\times$, $\div$ by non-zero | roots, limits | $\sqrt{2}$; $x^2 = 2$ | the irrationals: $\mathbb{R}$ |
| $\mathbb{R}$ | $+$, $-$, $\times$, $\div$ by non-zero, roots of non-negatives | roots of negatives | $\sqrt{-1}$; $x^2 = -1$ | the imaginary unit $i$: $\mathbb{C}$ |
| $\mathbb{C}$ | $+$, $-$, $\times$, $\div$ by non-zero, all roots | | none: every polynomial equation has a solution | |

Read down the table, the story is one of equations:
- in $\mathbb{N}$, $x + 5 = 3$ has no solution, because subtraction can go below zero. The integers add the negative numbers, and in $\mathbb{Z}$ every subtraction has an answer.
- In $\mathbb{Z}$, $3x = 1$ has no solution, because dividing whole things can leave parts. The rationals add the fractions, and in $\mathbb{Q}$ every division by a non-zero number has an answer.
- In $\mathbb{Q}$, $x^2 = 2$ has no solution, because the square root of 2 is [[sqrt-2-irrational|not a fraction]]: the rationals leave gaps in the number line. The reals fill every gap, adding the irrationals such as $\sqrt{2}$, $\pi$ and $e$.
- In $\mathbb{R}$, $x^2 = -1$ has no solution, because no real number squares to a negative. The [[complex-numbers|complex numbers]] add $i = \sqrt{-1}$, and then, by the [[fundamental-theorem-of-algebra|fundamental theorem of algebra]], every polynomial equation has a solution, so the building stops.

The irrationals on their own are not closed under anything useful: $\sqrt{2} \cdot \sqrt{2} = 2$ and $\sqrt{2} + (-\sqrt{2}) = 0$ are rational.

```quiz
Q: Which is the smallest number system in which $7 - 10$ has an answer?
- $\mathbb{N}$
+ $\mathbb{Z}$
- $\mathbb{Q}$
- $\mathbb{R}$
Why: $7 - 10 = -3$, a negative integer, which is not a natural number.

Q: Which is the smallest number system in which $x^2 = 5$ has a solution?
- $\mathbb{Z}$
- $\mathbb{Q}$
+ $\mathbb{R}$
- $\mathbb{C}$
Why: $\sqrt{5}$ is irrational, so it is real but not rational.

Q: Which operation are the integers not closed under?
- addition
- subtraction
- multiplication
+ division
Why: $1 \div 2 = \frac{1}{2}$ is not an integer.
```
