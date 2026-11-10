# Number Theory
color: #a23b63
built-on: arithmetic

The integers themselves: what divides what, the primes, and arithmetic with remainders.

## Divisibility {#divisibility}
rows: kinds
wrap: 6

Divisors, greatest common divisors and primes, for all the integers.

This topic takes up where Arithmetic's *Factors & Multiples* stops: [[primes]], the [[gcf|greatest common divisor]], the [[lcm|least common multiple]] and the [[fundamental-theorem-of-arithmetic]] are stated there. Here every letter stands for an integer, negative ones included, and $\gcd(a, b)$, for $a$ and $b$ not both zero, is the largest positive integer dividing both. Everything rests on one fact, the [[division-algorithm]], and leads to [[bezouts-identity|Bézout's identity]], which the whole of *Congruences* is built on.

### Division Algorithm {#division-algorithm}
kind: theorem
prereqs: division, integer-multiplication, absolute-value

For integers $a$ and $b$ with $b \ne 0$, there are unique integers $q$ and $r$ with
$$a = qb + r, \qquad 0 \le r < |b|.$$

The integer $q$ is the quotient and $r$ the remainder, written $r = a \bmod b$.

*Proof*, for $b > 0$. Let $r$ be the least non-negative integer of the form $a - qb$. If $r \ge b$, then $r - b = a - (q + 1)b$ is smaller and still non-negative, so $r < b$. If also $a = q'b + r'$ with $0 \le r' < b$, then $(q - q')b = r' - r$ and $|r' - r| < b$, so $q = q'$ and $r = r'$. $\square$

The remainder is never negative:
$$-17 = (-4) \cdot 5 + 3, \quad\text{so}\quad -17 \bmod 5 = 3.$$

```quiz
Q: What is the remainder when $-23$ is divided by $7$?
A: 5
Hint: Find the multiple of 7 just below $-23$.
Why: $-23 = (-4) \cdot 7 + 5$.

Q: $100 = q \cdot 7 + r$ with $0 \le r < 7$. What is $q$?
A: 14
Why: $100 = 14 \cdot 7 + 2$.
```

### Bézout's Identity {#bezouts-identity}
kind: theorem
prereqs: gcf, divisibility-properties, division-algorithm

For integers $a$ and $b$, not both zero, there are integers $x$ and $y$ with
$$ax + by = \gcd(a, b).$$
The integers of the form $ax + by$ are exactly the multiples of $\gcd(a, b)$.

*Proof.* Let $d$ be the least positive integer of the form $ax + by$. Divide $a$ by $d$: the remainder $r = a - qd$ is again of that form and $0 \le r < d$, so $r = 0$ and $d \mid a$. Likewise $d \mid b$. Every common divisor of $a$ and $b$ divides $ax + by = d$, so $d$ is the greatest. Then every $ax + by$ is a multiple of $d$, and every multiple $kd = a(kx) + b(ky)$ has the form. $\square$

**Example.**
$$\gcd(12, 18) = 6 = 12 \cdot (-1) + 18 \cdot 1.$$
The pair $x$, $y$ is not unique; the [[extended-euclid|extended Euclidean algorithm]] finds one.

### Euclid's Lemma {#euclids-lemma}
kind: theorem
prereqs: bezouts-identity, primes

If a prime $p$ divides $ab$, then $p \mid a$ or $p \mid b$. More generally, if $n \mid ab$ and $\gcd(n, a) = 1$, then $n \mid b$.

*Proof.* Take $x$ and $y$ with $nx + ay = 1$, by [[bezouts-identity|Bézout's identity]]. Then
$$b = nbx + aby,$$
and $n$ divides both terms. A prime $p$ that does not divide $a$ has $\gcd(p, a) = 1$. $\square$

This is what makes the factorisation of the [[fundamental-theorem-of-arithmetic]] unique: a prime in one factorisation divides the other product, so it divides, and therefore equals, one of its primes; cancel it and repeat.

It fails for composites: $6 \mid 4 \cdot 9$, but $6 \nmid 4$ and $6 \nmid 9$.

### Infinitude of Primes {#infinitude-of-primes}
kind: theorem
prereqs: fundamental-theorem-of-arithmetic, divisibility-properties

There are infinitely many primes.

*Proof* (Euclid). Given any primes $p_1, p_2, \ldots, p_k$, let
$$N = p_1 p_2 \cdots p_k + 1.$$
Since $N > 1$, it has a prime factor $p$. Dividing $N$ by any $p_i$ leaves the remainder 1, so $p$ is none of them. So no finite list holds every prime. $\square$

$N$ itself need not be prime:
$$2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30031 = 59 \cdot 509.$$

### Linear Diophantine Equations {#linear-diophantine}
kind: theorem
prereqs: bezouts-identity, euclids-lemma

Let $a$ and $b$ be integers, not both zero, with $d = \gcd(a, b)$. The equation $ax + by = c$ has a solution in integers if and only if $d \mid c$. If $(x_0, y_0)$ is one solution, the solutions are
$$x = x_0 + \frac{b}{d}\,t, \qquad y = y_0 - \frac{a}{d}\,t, \qquad t \in \mathbb{Z}.$$

*Proof.* The first part is [[bezouts-identity|Bézout's identity]]. For the second, subtract two solutions and divide by $d$:
$$\frac{a}{d}(x - x_0) = -\frac{b}{d}(y - y_0).$$
As $\frac{a}{d}$ and $\frac{b}{d}$ are coprime, $\frac{b}{d}$ divides $x - x_0$ by [[euclids-lemma|Euclid's lemma]]. $\square$

**Example.** For $6x + 15y = 9$, $d = 3$ divides 9, and $(-1, 1)$ is a solution, so
$$x = -1 + 5t, \qquad y = 1 - 2t.$$
The equation $6x + 15y = 10$ has no solution, as $3 \nmid 10$.

```quiz
Q: Does $14x + 21y = 5$ have a solution in integers?
- Yes
+ No
Why: $\gcd(14, 21) = 7$, which does not divide 5.

Q: One solution of $4x + 6y = 10$ is $(1, 1)$. By how much does $x$ change from one solution to the next?
A: 3
Why: $\frac{b}{d} = \frac{6}{2} = 3$: the solutions are $x = 1 + 3t$, $y = 1 - 2t$.
```

### Divides {#divides}
kind: definition
prereqs: integer-multiplication

For integers $a$ and $b$, $a$ divides $b$, written $a \mid b$, if $b = ak$ for some integer $k$. Then $a$ is a divisor of $b$, and $b$ a multiple of $a$. Otherwise $a \nmid b$.

Thus $3 \mid 12$, $-4 \mid 12$ and $5 \nmid 12$. Every integer divides 0, and 0 divides only itself.

### Properties of Divisibility {#divisibility-properties}
kind: property
prereqs: divides, absolute-value

For all integers $a$, $b$, $c$, $x$ and $y$:
- $a \mid a$, and $1 \mid a$;
- if $a \mid b$ and $b \mid c$, then $a \mid c$;
- if $a \mid b$ and $a \mid c$, then $a \mid bx + cy$;
- if $a \mid b$, then $ac \mid bc$;
- if $a \mid b$ and $b \ne 0$, then $|a| \le |b|$;
- if $a \mid b$ and $b \mid a$, then $a = \pm b$.

The third is the one used most: a common divisor of two numbers divides their sum, their difference, and every combination $bx + cy$ of them.

### Coprime Integers {#coprime}
kind: definition
prereqs: gcf

Integers $a$ and $b$ are coprime, or relatively prime, if $\gcd(a, b) = 1$.

By [[bezouts-identity|Bézout's identity]], $a$ and $b$ are coprime exactly when $ax + by = 1$ for some integers $x$ and $y$. Neither needs to be prime: 8 and 15 are coprime.

### Number & Sum of Divisors {#divisor-functions}
kind: formula
prereqs: fundamental-theorem-of-arithmetic, exponents

If $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$ with distinct primes $p_i$, then the number $\tau(n)$ and the sum $\sigma(n)$ of the positive divisors of $n$ are
$$\tau(n) = (a_1 + 1)(a_2 + 1) \cdots (a_k + 1), \qquad \sigma(n) = \prod_{i=1}^{k} \frac{p_i^{a_i + 1} - 1}{p_i - 1}.$$

A divisor is a choice of an exponent from $0$ to $a_i$ for each prime, and $\sigma(n)$ is the product of the sums $1 + p_i + \cdots + p_i^{a_i}$, multiplied out.

**Example.** For $60 = 2^2 \cdot 3 \cdot 5$:
$$\tau(60) = 3 \cdot 2 \cdot 2 = 12, \qquad \sigma(60) = 7 \cdot 4 \cdot 6 = 168.$$

```quiz
Q: How many positive divisors has $72$?
A: 12
Hint: $72 = 2^3 \cdot 3^2$.
Why: $(3 + 1)(2 + 1) = 12$.

Q: What is the sum of the positive divisors of $28$?
A: 56
Why: $28 = 2^2 \cdot 7$, so $\sigma(28) = 7 \cdot 8 = 56$: twice 28, which makes 28 a perfect number.
```

### Euclidean Algorithm {#euclidean-algorithm}
kind: skill
prereqs: division-algorithm, gcf

To find $\gcd(a, b)$ for $a \ge b > 0$:
1. divide $a$ by $b$, to get $a = qb + r$;
2. if $r = 0$, the answer is $b$;
3. otherwise replace $(a, b)$ by $(b, r)$ and go back to step 1.

It works because $\gcd(a, b) = \gcd(b, r)$: as $r = a - qb$, the common divisors of $a$ and $b$ are those of $b$ and $r$. It stops because the remainders decrease.

**Example.** $\gcd(252, 198) = 18$, the last remainder that is not zero:
$$\begin{aligned} 252 &= 1 \cdot 198 + 54 \\ 198 &= 3 \cdot 54 + 36 \\ 54 &= 1 \cdot 36 + 18 \\ 36 &= 2 \cdot 18 + 0 \end{aligned}$$

```quiz
Q: What is $\gcd(1071, 462)$?
A: 21
Hint: $1071 = 2 \cdot 462 + 147$.
Why: $462 = 3 \cdot 147 + 21$ and $147 = 7 \cdot 21 + 0$.

Q: What is $\gcd(391, 299)$?
A: 23
Why: $391 = 1 \cdot 299 + 92$, $299 = 3 \cdot 92 + 23$, $92 = 4 \cdot 23 + 0$.
```

### Extended Euclidean Algorithm {#extended-euclid}
kind: skill
prereqs: euclidean-algorithm, bezouts-identity

To write $\gcd(a, b)$ as $ax + by$:
1. run the Euclidean algorithm, keeping every division;
2. solve the division with the last non-zero remainder for that remainder, which is the gcd;
3. substitute for each earlier remainder in turn, from its own division, until only $a$ and $b$ are left.

**Example.** From the divisions for $\gcd(252, 198) = 18$:
$$\begin{aligned} 18 &= 54 - 36 \\ &= 54 - (198 - 3 \cdot 54) = 4 \cdot 54 - 198 \\ &= 4(252 - 198) - 198 = 4 \cdot 252 - 5 \cdot 198 \end{aligned}$$

```quiz
Q: From $31 = 4 \cdot 7 + 3$ and $7 = 2 \cdot 3 + 1$:
$$1 = 7 - 2 \cdot 3 = 7 - 2(31 - 4 \cdot 7) = k \cdot 7 - 2 \cdot 31.$$
What is $k$?
A: 9
Why: $7 + 8 \cdot 7 = 9 \cdot 7$, and $63 - 62 = 1$.
```

### Sieve of Eratosthenes {#sieve-of-eratosthenes}
kind: skill
prereqs: primes, multiples, square-roots

To list the primes up to $N$:
1. write out the integers from 2 to $N$;
2. the smallest number not yet crossed out or circled is prime: circle it, and cross out its other multiples, starting from its square;
3. repeat until the prime is greater than $\sqrt{N}$: everything left is prime.

It can stop at $\sqrt{N}$ because a composite $n$ has a factor no greater than $\sqrt{n}$.

: Primes below 100
| | |
| ---: | :--- |
| 1 to 20 | 2, 3, 5, 7, 11, 13, 17, 19 |
| 21 to 40 | 23, 29, 31, 37 |
| 41 to 60 | 41, 43, 47, 53, 59 |
| 61 to 80 | 61, 67, 71, 73, 79 |
| 81 to 100 | 83, 89, 97 |

```quiz
Q: How many primes are there below 30?
A: 10
Why: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.

Q: To sieve up to 200, what is the largest prime whose multiples must be crossed out?
A: 13
Why: $\sqrt{200} \approx 14.1$, and 13 is the largest prime below it.
```

## Congruences {#congruences}
built-on: divisibility
rows: kinds
wrap: 6

Arithmetic with remainders: two integers count as the same when they differ by a multiple of the modulus.

A clock is the model: hours are counted modulo 12, and five hours after ten o'clock is three o'clock. Congruence modulo $n$ sorts the integers into $n$ [[residue-classes|residue classes]], and adding and multiplying classes makes a small arithmetic of its own, $\mathbb{Z}_n$. Addition there is drawn in [[addition-cycles]], where both numbers can be changed. Division is the delicate part: it is possible exactly for the numbers coprime to the modulus, which is [[bezouts-identity|Bézout's identity]] again.

### Congruence Is an Equivalence Relation {#congruence-equivalence}
kind: theorem
prereqs: congruence-mod-n, equivalence-relations, divisibility-properties

For every $n \ge 1$, congruence modulo $n$ is an equivalence relation on $\mathbb{Z}$:
- reflexive: $a \equiv a$;
- symmetric: if $a \equiv b$, then $b \equiv a$;
- transitive: if $a \equiv b$ and $b \equiv c$, then $a \equiv c$.

*Proof.* $n \mid 0$; if $n \mid a - b$, then $n \mid b - a$; and if $n$ divides $a - b$ and $b - c$, it divides their sum $a - c$. $\square$

### Arithmetic of Congruences {#congruence-arithmetic}
kind: theorem
prereqs: congruence-mod-n, divisibility-properties, exponents

If $a \equiv b$ and $c \equiv d \pmod{n}$, then
$$\begin{aligned} a + c &\equiv b + d \pmod{n} \\ a - c &\equiv b - d \pmod{n} \\ ac &\equiv bd \pmod{n} \\ a^k &\equiv b^k \pmod{n} \quad\text{for } k \ge 0 \end{aligned}$$

*Proof.* $n$ divides $(a - b) \pm (c - d)$, and
$$ac - bd = (a - b)c + b(c - d).$$
Powers follow by multiplying $a \equiv b$ by itself. $\square$

So in a sum or a product any number may be replaced by another congruent to it, at any stage:
$$38 \cdot 51 \equiv 3 \cdot 2 = 6 \pmod{7}.$$

> **!** Division is not on the list: $2 \cdot 1 \equiv 2 \cdot 4 \pmod{6}$, but $1 \not\equiv 4$. See [[congruence-cancellation]]. Nor may an exponent be replaced: $2^1 \not\equiv 2^4 \pmod{3}$, although $1 \equiv 4$.

```quiz
Q: What is $38 \cdot 51 + 20$ congruent to modulo $7$? Answer from 0 to 6.
A: 5
Why: $3 \cdot 2 + 6 = 12 \equiv 5$.

Q: What is the remainder when $10^{50}$ is divided by $9$?
A: 1
Why: $10 \equiv 1$, so $10^{50} \equiv 1^{50} = 1 \pmod{9}$.
```

### Cancellation in Congruences {#congruence-cancellation}
kind: theorem
prereqs: congruence-arithmetic, euclids-lemma

If $ac \equiv bc \pmod{n}$ and $d = \gcd(c, n)$, then
$$a \equiv b \pmod{\tfrac{n}{d}}.$$
In particular, a factor coprime to $n$ cancels with the modulus unchanged.

*Proof.* $n$ divides $c(a - b)$, so $\frac{n}{d}$ divides $\frac{c}{d}(a - b)$. As $\frac{n}{d}$ and $\frac{c}{d}$ are coprime, $\frac{n}{d}$ divides $a - b$ by [[euclids-lemma|Euclid's lemma]]. $\square$

**Example.** From $2 \cdot 1 \equiv 2 \cdot 4 \pmod{6}$, cancelling 2 gives $1 \equiv 4 \pmod{3}$.

### Cycles of Addition {#addition-cycles}
kind: theorem
prereqs: integers-mod-n, lcm

In $\mathbb{Z}_n$, adding $a$ again and again,
$$x \to x + a \to x + 2a \to \cdots,$$
first returns to $x$ after $\dfrac{n}{\gcd(a, n)}$ steps. So adding $a$ splits $\mathbb{Z}_n$ into $\gcd(a, n)$ cycles, each of length $\dfrac{n}{\gcd(a, n)}$.

Choose the modulus $n$ and the number $a$ to add. An arrow runs from each $x$ to $x + a$, and each cycle has a colour of its own.

```cycles
n: 12
add: 5
```

*Proof.* Take $1 \le a \le n$. Then $x + ka \equiv x$ exactly when $n \mid ka$, that is, when $ka$ is a common multiple of $a$ and $n$. The least is
$$\operatorname{lcm}(a, n) = \frac{an}{\gcd(a, n)}, \quad\text{so}\quad k = \frac{n}{\gcd(a, n)}.$$
Every cycle has this length, whatever $x$ is, and together they hold all $n$ elements. $\square$

With $d = \gcd(a, n)$:
- the cycle through 0 holds the multiples of $d$, and each of the others is one residue class modulo $d$;
- there is a single cycle, through every number, exactly when $a$ and $n$ are coprime, which happens for $\varphi(n)$ of the numbers $a$ (see [[totient]]);
- when $n$ is prime, every $a \not\equiv 0$ gives a single cycle;
- $a$ and $n - a$ give the same cycles, run in opposite directions.

```quiz
Q: Adding $8$ modulo $12$: how many cycles are there?
A: 4
Why: $\gcd(8, 12) = 4$ cycles, each of length $\frac{12}{4} = 3$.

Q: Adding $15$ modulo $40$: how long is each cycle?
A: 8
Why: $\gcd(15, 40) = 5$, and $\frac{40}{5} = 8$.

Q: For how many $a$ from $1$ to $10$ does adding $a$ modulo $10$ make a single cycle?
A: 4
Hint: Which $a$ are coprime to 10?
Why: $a = 1, 3, 7, 9$.
```

### Modular Inverses {#modular-inverse}
kind: theorem
prereqs: integers-mod-n, bezouts-identity

The congruence $ax \equiv 1 \pmod{n}$ has a solution if and only if $\gcd(a, n) = 1$, and the solution is then unique modulo $n$. It is the inverse of $a$ modulo $n$, written $a^{-1}$.

*Proof.* $ax \equiv 1$ means $ax + ny = 1$ for some $y$, which can be solved exactly when $\gcd(a, n) = 1$, by [[bezouts-identity|Bézout's identity]]. If $x$ and $x'$ are both inverses, then $x \equiv x(ax') = (xa)x' \equiv x'$. $\square$

The [[extended-euclid|extended Euclidean algorithm]] finds the inverse. When $p$ is prime, every $a \not\equiv 0$ has one, so $\mathbb{Z}_p$ satisfies all the field [[axioms]].

: Inverses modulo 7
| $a$ | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| $a^{-1}$ | 1 | 4 | 5 | 2 | 3 | 6 |

```quiz
Q: What is the inverse of $7$ modulo $26$? Answer from 1 to 25.
A: 15
Why: $7 \cdot 15 = 105 = 4 \cdot 26 + 1$.

Q: Does $6$ have an inverse modulo $15$?
- Yes
+ No
Why: $\gcd(6, 15) = 3 \ne 1$.
```

### Linear Congruences {#linear-congruences}
kind: theorem
prereqs: congruence-mod-n, linear-diophantine

Let $d = \gcd(a, n)$. The congruence $ax \equiv b \pmod{n}$ has a solution if and only if $d \mid b$, and then it has exactly $d$ solutions modulo $n$: if $x_0$ is one, they are
$$x_0 + \frac{n}{d}\,t, \qquad t = 0, 1, \ldots, d - 1.$$

*Proof.* $ax \equiv b \pmod{n}$ means $ax + ny = b$ for some $y$, a [[linear-diophantine|linear Diophantine equation]], whose solutions have $x = x_0 + \frac{n}{d}t$. $\square$

### Chinese Remainder Theorem {#chinese-remainder-theorem}
kind: theorem
prereqs: modular-inverse, euclids-lemma

If $m$ and $n$ are coprime, then for any integers $a$ and $b$ the system
$$x \equiv a \pmod{m}, \qquad x \equiv b \pmod{n}$$
has a solution, and it is unique modulo $mn$. More generally, for moduli $n_1, \ldots, n_k$ that are coprime in pairs, any system $x \equiv a_i \pmod{n_i}$ has a solution, unique modulo $n_1 n_2 \cdots n_k$.

*Proof.* Let $u$ be the inverse of $n$ modulo $m$, and $v$ the inverse of $m$ modulo $n$. Then
$$x = a\,nu + b\,mv$$
is a solution. If $x$ and $x'$ are both solutions, $m$ and $n$ both divide $x - x'$, and so does $mn$, by [[euclids-lemma|Euclid's lemma]]. $\square$

So a number modulo $mn$ is the same thing as a pair of remainders, modulo $m$ and modulo $n$. With 2 and 3, each pair occurs once:

: Remainders modulo 2 and 3
| $x$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| $x \bmod 2$ | 0 | 1 | 0 | 1 | 0 | 1 |
| $x \bmod 3$ | 0 | 1 | 2 | 0 | 1 | 2 |

Without coprime moduli it fails: no $x$ has $x \equiv 0 \pmod{2}$ and $x \equiv 1 \pmod{4}$.

### Divisibility Tests by Congruences {#divisibility-tests}
kind: theorem
prereqs: congruence-arithmetic, place-value

An integer $N$ with decimal digits $d_k \ldots d_1 d_0$ satisfies
$$\begin{aligned} N &\equiv d_0 + d_1 + d_2 + \cdots + d_k \pmod{9} \\ N &\equiv d_0 - d_1 + d_2 - \cdots + (-1)^k d_k \pmod{11} \end{aligned}$$
The first holds modulo 3 as well.

*Proof.* $N = \sum d_i 10^i$, and $10 \equiv 1 \pmod{9}$, while $10 \equiv -1 \pmod{11}$. $\square$

These are the [[divisibility-rules]], each with its reason:

: Divisibility Tests
| By | Divisible exactly when this is | Because |
| --- | --- | --- |
| 2, 5, 10 | the last digit | $10 \equiv 0$ |
| 4 | the last two digits | $100 \equiv 0 \pmod{4}$ |
| 8 | the last three digits | $1000 \equiv 0 \pmod{8}$ |
| 3, 9 | the sum of the digits | $10 \equiv 1$ |
| 11 | the alternating sum of the digits | $10 \equiv -1 \pmod{11}$ |

```quiz
Q: What is the remainder when $123456$ is divided by $9$?
A: 3
Why: The digits sum to $21 \equiv 3 \pmod{9}$.

Q: Is $918082$ divisible by $11$?
+ Yes
- No
Why: $2 - 8 + 0 - 8 + 1 - 9 = -22$, a multiple of 11.
```

### Congruence Modulo n {#congruence-mod-n}
kind: definition
prereqs: divides

For an integer $n \ge 1$, integers $a$ and $b$ are congruent modulo $n$, written
$$a \equiv b \pmod{n},$$
if $n \mid a - b$. The number $n$ is the modulus.

Equivalently, $a$ and $b$ leave the same remainder when divided by $n$ (see [[division-algorithm]]). Thus
$$17 \equiv 2 \pmod{5}, \qquad -1 \equiv 6 \pmod{7}, \qquad 22 \equiv 10 \pmod{12}.$$
Every integer is congruent modulo $n$ to exactly one of $0, 1, \ldots, n - 1$: its remainder.

```quiz
Q: Which is congruent to $-3$ modulo $8$?
- 3
+ 5
- 11
Why: $5 - (-3) = 8$.

Q: Is $100 \equiv 2 \pmod{7}$?
+ Yes
- No
Why: $100 - 2 = 98 = 7 \cdot 14$.
```

### Residue Classes {#residue-classes}
kind: definition
prereqs: congruence-equivalence, partitions, division-algorithm

The residue class of $a$ modulo $n$ is its equivalence class under congruence,
$$[a] = \{a + kn : k \in \mathbb{Z}\}.$$
There are exactly $n$ of them, $[0], [1], \ldots, [n - 1]$, one for each remainder, and they partition $\mathbb{Z}$.

Modulo 3:
$$\begin{aligned} [0] &= \{\ldots, -6, -3, 0, 3, 6, \ldots\} \\ [1] &= \{\ldots, -5, -2, 1, 4, 7, \ldots\} \\ [2] &= \{\ldots, -4, -1, 2, 5, 8, \ldots\} \end{aligned}$$
A class has many names: $[2] = [5] = [-1]$.

### Integers Modulo n {#integers-mod-n}
kind: definition
prereqs: residue-classes, congruence-arithmetic

$\mathbb{Z}_n$, also written $\mathbb{Z}/n\mathbb{Z}$, is the set of the $n$ residue classes modulo $n$, with
$$[a] + [b] = [a + b], \qquad [a] \cdot [b] = [ab].$$
Its elements are usually written $0, 1, \ldots, n - 1$.

The sum and the product do not depend on which names the classes are given: that is [[congruence-arithmetic]]. Addition and multiplication are commutative and associative, multiplication distributes over addition, 0 and 1 are neutral, and $-a = n - a$. What may fail is division, and a product can be zero when neither factor is: in $\mathbb{Z}_6$, $2 \cdot 3 = 0$.

: Addition in $\mathbb{Z}_5$
| $+$ | 0 | 1 | 2 | 3 | 4 |
| :-: | :-: | :-: | :-: | :-: | :-: |
| **0** | 0 | 1 | 2 | 3 | 4 |
| **1** | 1 | 2 | 3 | 4 | 0 |
| **2** | 2 | 3 | 4 | 0 | 1 |
| **3** | 3 | 4 | 0 | 1 | 2 |
| **4** | 4 | 0 | 1 | 2 | 3 |

: Multiplication in $\mathbb{Z}_5$
| $\times$ | 0 | 1 | 2 | 3 | 4 |
| :-: | :-: | :-: | :-: | :-: | :-: |
| **0** | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 |
| **2** | 0 | 2 | 4 | 1 | 3 |
| **3** | 0 | 3 | 1 | 4 | 2 |
| **4** | 0 | 4 | 3 | 2 | 1 |

: Multiplication in $\mathbb{Z}_6$
| $\times$ | 0 | 1 | 2 | 3 | 4 | 5 |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 |
| **2** | 0 | 2 | 4 | 0 | 2 | 4 |
| **3** | 0 | 3 | 0 | 3 | 0 | 3 |
| **4** | 0 | 4 | 2 | 0 | 4 | 2 |
| **5** | 0 | 5 | 4 | 3 | 2 | 1 |

In $\mathbb{Z}_5$ every row of the multiplication table but the first holds every element once; in $\mathbb{Z}_6$ only the rows of 1 and 5 do, the numbers coprime to 6 (see [[modular-inverse]]).

```quiz
Q: In $\mathbb{Z}_{12}$, what is $9 + 8$?
A: 5
Why: $17 - 12 = 5$.

Q: In $\mathbb{Z}_7$, what is $5 \cdot 6$?
A: 2
Why: $30 = 4 \cdot 7 + 2$.

Q: In $\mathbb{Z}_{10}$, what is $-3$?
A: 7
Why: $3 + 7 = 10 \equiv 0$.
```

### Solving Linear Congruences {#solving-linear-congruences}
kind: skill
prereqs: linear-congruences, modular-inverse, extended-euclid

To solve $ax \equiv b \pmod{n}$:
1. find $d = \gcd(a, n)$; if $d \nmid b$, there is no solution;
2. divide $a$, $b$ and $n$ by $d$, to get $a'x \equiv b' \pmod{n'}$;
3. find the inverse of $a'$ modulo $n'$, and multiply both sides by it;
4. the answer $x \equiv (a')^{-1} b' \pmod{n'}$ is $d$ solutions modulo $n$.

**Example.** For $6x \equiv 9 \pmod{15}$, $d = 3$ divides 9. Dividing by 3, and then multiplying by $2^{-1} = 3$:
$$2x \equiv 3 \pmod{5}, \qquad x \equiv 9 \equiv 4 \pmod{5}.$$
Modulo 15 the solutions are 4, 9 and 14.

```quiz
Q: Solve $5x \equiv 3 \pmod{7}$. Answer from 0 to 6.
A: 2
Hint: The inverse of 5 modulo 7 is 3.
Why: $x \equiv 3 \cdot 3 = 9 \equiv 2$, and $5 \cdot 2 = 10 \equiv 3$.

Q: How many solutions modulo $12$ has $8x \equiv 4 \pmod{12}$?
A: 4
Why: $\gcd(8, 12) = 4$ divides 4. They are 2, 5, 8 and 11.

Q: How many solutions has $6x \equiv 4 \pmod{9}$?
A: 0
Why: $\gcd(6, 9) = 3$ does not divide 4.
```

### Solving Simultaneous Congruences {#solving-simultaneous-congruences}
kind: skill
prereqs: chinese-remainder-theorem, solving-linear-congruences

To solve $x \equiv a \pmod{m}$ and $x \equiv b \pmod{n}$, with $m$ and $n$ coprime:
1. write the first as $x = a + mt$;
2. put it into the second, $mt \equiv b - a \pmod{n}$, and solve for $t$;
3. then $x = a + mt$ is the solution, modulo $mn$;
4. with more congruences, repeat with this answer and the next one.

**Example.** $x \equiv 2 \pmod{3}$, $x \equiv 3 \pmod{5}$, $x \equiv 2 \pmod{7}$. Put $x = 2 + 3t$ into the second:
$$3t \equiv 1 \pmod{5}, \quad t \equiv 2, \quad x \equiv 8 \pmod{15}.$$
Put $x = 8 + 15s$ into the third:
$$15s \equiv -6 \pmod{7}, \quad s \equiv 1, \quad x \equiv 23 \pmod{105}.$$

```quiz
Q: What is the smallest $x \ge 0$ with $x \equiv 1 \pmod{4}$ and $x \equiv 2 \pmod{5}$?
A: 17
Hint: $x = 1 + 4t$, and $4t \equiv 1 \pmod{5}$.
Why: $t \equiv 4$, so $x = 17$.

Q: What is the smallest $x \ge 0$ with $x \equiv 3 \pmod{7}$ and $x \equiv 5 \pmod{9}$?
A: 59
Why: $x = 3 + 7t$ with $7t \equiv 2 \pmod{9}$, so $t \equiv 4 \cdot 2 = 8$ and $x = 59$.
```

## Powers Modulo n {#powers-mod-n}
built-on: congruences
rows: kinds
wrap: 6

What powers do in modular arithmetic: the theorems of Fermat, Euler and Wilson.

Adding $a$ again and again modulo $n$ goes round a cycle, as in [[addition-cycles]]. Multiplying by $a$ again and again does the same when $a$ is coprime to $n$, and the length of that cycle, the [[multiplicative-order|order]] of $a$, divides $\varphi(n)$. That is the content of [[eulers-theorem|Euler's theorem]], of which [[fermats-little-theorem|Fermat's]] is the case of a prime modulus. They make huge powers easy to reduce, which is what [[rsa|RSA]] encryption runs on.

### Fermat's Little Theorem {#fermats-little-theorem}
kind: theorem
prereqs: modular-inverse, primes

If $p$ is prime and $p \nmid a$, then
$$a^{p-1} \equiv 1 \pmod{p}.$$
Hence $a^p \equiv a \pmod{p}$ for every integer $a$.

*Proof.* As $a$ has an inverse, the numbers $a, 2a, \ldots, (p - 1)a$ are distinct modulo $p$ and none is 0, so they are $1, 2, \ldots, p - 1$ in some order. Multiplying them together,
$$a^{p-1}(p - 1)! \equiv (p - 1)! \pmod{p},$$
and $(p - 1)!$, a product of invertible numbers, cancels. $\square$

: Powers modulo 7
| $a$ | $a^2$ | $a^3$ | $a^4$ | $a^5$ | $a^6$ |
| :-: | :-: | :-: | :-: | :-: | :-: |
| 1 | 1 | 1 | 1 | 1 | 1 |
| 2 | 4 | 1 | 2 | 4 | 1 |
| 3 | 2 | 6 | 4 | 5 | 1 |
| 4 | 2 | 1 | 4 | 2 | 1 |
| 5 | 4 | 6 | 2 | 3 | 1 |
| 6 | 1 | 6 | 1 | 6 | 1 |

The converse is false: $2^{340} \equiv 1 \pmod{341}$, but $341 = 11 \cdot 31$.

```quiz
Q: What is $3^{10} \bmod 11$?
A: 1
Why: 11 is prime and does not divide 3.

Q: What is $2^{100} \bmod 7$?
A: 2
Hint: $2^6 \equiv 1$, and $100 = 6 \cdot 16 + 4$.
Why: $2^{100} \equiv 2^4 = 16 \equiv 2$.
```

### Euler's Theorem {#eulers-theorem}
kind: theorem
prereqs: totient, modular-inverse

If $\gcd(a, n) = 1$, then
$$a^{\varphi(n)} \equiv 1 \pmod{n}.$$

*Proof.* Let $r_1, \ldots, r_{\varphi(n)}$ be the numbers from 1 to $n$ coprime to $n$. As $a$ has an inverse, $ar_1, \ldots, ar_{\varphi(n)}$ are the same numbers modulo $n$ in some order. Multiplying them together,
$$a^{\varphi(n)}\, r_1 \cdots r_{\varphi(n)} \equiv r_1 \cdots r_{\varphi(n)} \pmod{n},$$
and the product of the $r_i$ cancels. $\square$

For a prime $n = p$, $\varphi(p) = p - 1$, and this is [[fermats-little-theorem]].

**Example.** $\varphi(10) = 4$, and
$$3^4 = 81 \equiv 1 \pmod{10}.$$

### Wilson's Theorem {#wilsons-theorem}
kind: theorem
prereqs: modular-inverse, euclids-lemma

An integer $p > 1$ is prime if and only if
$$(p - 1)! \equiv -1 \pmod{p}.$$

*Proof.* Let $p$ be prime. Each of $1, \ldots, p - 1$ has an inverse among them, and $x$ is its own inverse only when $p \mid (x - 1)(x + 1)$, that is, when $x \equiv \pm 1$, by [[euclids-lemma|Euclid's lemma]]. The rest pair off, each pair with product 1, so $(p - 1)! \equiv 1 \cdot (-1)$. Conversely, a composite $p$ has a divisor $d$ with $1 < d < p$, which divides $(p - 1)!$ and so cannot divide $(p - 1)! + 1$. $\square$

**Example.**
$$6! = 720 = 7 \cdot 103 - 1.$$

### Order Divides the Totient {#order-divides-totient}
kind: theorem
prereqs: multiplicative-order, division-algorithm

Let $\gcd(a, n) = 1$, and let $k$ be the order of $a$ modulo $n$. Then $a^m \equiv 1 \pmod{n}$ if and only if $k \mid m$. In particular $k \mid \varphi(n)$.

*Proof.* Write $m = qk + r$ with $0 \le r < k$. Then $a^m \equiv (a^k)^q a^r \equiv a^r$, and as $k$ is the least positive exponent giving 1, $a^r \equiv 1$ only for $r = 0$. The last part is [[eulers-theorem|Euler's theorem]]. $\square$

So modulo 7, where $\varphi(7) = 6$, the only possible orders are 1, 2, 3 and 6.

### Euler's Totient Function {#totient}
kind: definition
prereqs: coprime

For $n \ge 1$, $\varphi(n)$ is the number of integers $k$ with $1 \le k \le n$ that are coprime to $n$.

It counts the elements of $\mathbb{Z}_n$ with a [[modular-inverse|inverse]], and the numbers $a$ for which adding $a$ runs through all of $\mathbb{Z}_n$ in a [[addition-cycles|single cycle]].

**Examples.** $\varphi(1) = 1$; $\varphi(p) = p - 1$ for a prime $p$; and $\varphi(12) = 4$, counting 1, 5, 7 and 11.

### Multiplicative Order {#multiplicative-order}
kind: definition
prereqs: eulers-theorem

For $\gcd(a, n) = 1$, the order of $a$ modulo $n$ is the least integer $k \ge 1$ with
$$a^k \equiv 1 \pmod{n}.$$

There is such a $k$, by [[eulers-theorem|Euler's theorem]]. The powers $a, a^2, \ldots, a^k$ are distinct modulo $n$, and then repeat.

**Example.** Modulo 7 the powers of 2 are 2, 4, 1, so 2 has order 3; those of 3 are 3, 2, 6, 4, 5, 1, so 3 has order 6.

```quiz
Q: What is the order of $2$ modulo $5$?
A: 4
Why: $2, 4, 3, 1$.

Q: What is the order of $10$ modulo $11$?
A: 2
Why: $10 \equiv -1$, and $(-1)^2 = 1$.
```

### Primitive Roots {#primitive-roots}
kind: definition
prereqs: multiplicative-order

A primitive root modulo $n$ is an integer $g$, coprime to $n$, whose order modulo $n$ is $\varphi(n)$. Its powers $g, g^2, \ldots, g^{\varphi(n)}$ are then all the numbers coprime to $n$, modulo $n$.

Every prime has a primitive root (Gauss). In general $n$ has one exactly when $n$ is 1, 2, 4, $p^k$ or $2p^k$ for an odd prime $p$. Modulo 8 there is none: 1, 3, 5 and 7 all have squares congruent to 1.

**Example.** 3 is a primitive root modulo 7, and 2 is not.

: Least Primitive Root of a Prime
| $p$ | 2 | 3 | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $g$ | 1 | 2 | 2 | 3 | 2 | 2 | 3 | 2 | 5 | 2 | 3 |

### Formula for the Totient {#totient-formula}
kind: formula
prereqs: totient, chinese-remainder-theorem, fundamental-theorem-of-arithmetic

If $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$ with distinct primes $p_i$, then
$$\varphi(n) = n \prod_{i=1}^{k} \left(1 - \frac{1}{p_i}\right) = \prod_{i=1}^{k} p_i^{a_i - 1}(p_i - 1).$$

It comes from two facts:
- $\varphi(p^a) = p^a - p^{a-1}$, since the numbers up to $p^a$ not coprime to it are the multiples of $p$;
- $\varphi(mn) = \varphi(m)\varphi(n)$ for coprime $m$ and $n$: by the [[chinese-remainder-theorem]], $x$ modulo $mn$ is a pair of remainders, and $x$ is coprime to $mn$ exactly when both are coprime to their moduli.

Also, summing over the positive divisors $d$ of $n$:
$$\sum_{d \mid n} \varphi(d) = n.$$

**Example.** $36 = 2^2 \cdot 3^2$:
$$\varphi(36) = 36 \cdot \frac{1}{2} \cdot \frac{2}{3} = 12.$$

: $\varphi(n)$ for $n$ from 1 to 10
| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $\varphi(n)$ | 1 | 1 | 2 | 2 | 4 | 2 | 6 | 4 | 6 | 4 |

: $\varphi(n)$ for $n$ from 11 to 20
| $n$ | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $\varphi(n)$ | 10 | 4 | 12 | 6 | 8 | 8 | 16 | 6 | 18 | 8 |

: $\varphi(n)$ for $n$ from 21 to 30
| $n$ | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $\varphi(n)$ | 12 | 10 | 22 | 8 | 20 | 12 | 18 | 12 | 28 | 8 |

```quiz
Q: What is $\varphi(100)$?
A: 40
Why: $100 \cdot \frac{1}{2} \cdot \frac{4}{5} = 40$.

Q: What is $\varphi(77)$?
A: 60
Why: $77 = 7 \cdot 11$, so $\varphi(77) = 6 \cdot 10$.
```

### Modular Exponentiation {#modular-exponentiation}
kind: skill
prereqs: eulers-theorem, fermats-little-theorem, congruence-arithmetic

To find $a^e \bmod n$:
1. reduce $a$ modulo $n$;
2. if $\gcd(a, n) = 1$, reduce the exponent $e$ modulo $\varphi(n)$, which is $p - 1$ for a prime $p$;
3. if the exponent is still large, square repeatedly, reducing each time, for $a^2, a^4, a^8, \ldots$;
4. multiply together the powers that add up to $e$.

> **!** The exponent is reduced modulo $\varphi(n)$, never modulo $n$.

**Example.** The last digit of $3^{2024}$ is $3^{2024} \bmod 10$. As $\varphi(10) = 4$ and $2024 \equiv 0 \pmod{4}$,
$$3^{2024} \equiv 3^0 = 1 \pmod{10}.$$

**Example.** For $3^{13} \bmod 17$, with $13 = 8 + 4 + 1$:
$$\begin{aligned} 3^2 &= 9 \\ 3^4 &= 81 \equiv 13 \\ 3^8 &\equiv 13^2 = 169 \equiv 16 \\ 3^{13} &= 3^8 \cdot 3^4 \cdot 3 \equiv 16 \cdot 13 \cdot 3 = 624 \equiv 12 \end{aligned}$$

```quiz
Q: What is the last digit of $7^{2025}$?
A: 7
Hint: $\varphi(10) = 4$.
Why: $2025 \equiv 1 \pmod{4}$, so $7^{2025} \equiv 7^1 \pmod{10}$.

Q: What is $3^{100} \bmod 13$?
A: 3
Hint: Reduce the exponent modulo 12.
Why: $100 \equiv 4 \pmod{12}$, and $3^4 = 81 = 6 \cdot 13 + 3$.

Q: What is $5^{2} \cdot 5^{4} \bmod 7$?
A: 1
Why: $5^6 \equiv 1 \pmod{7}$, by Fermat's little theorem.
```

### RSA Encryption {#rsa}
prereqs: modular-exponentiation, modular-inverse, chinese-remainder-theorem

A cipher with a public key: anyone may encrypt with $(n, e)$, and only the holder of $d$ can decrypt.

1. choose two large primes $p$ and $q$, and let $n = pq$, so that $\varphi(n) = (p - 1)(q - 1)$;
2. choose $e$ coprime to $\varphi(n)$, and let $d$ be its inverse modulo $\varphi(n)$;
3. publish $n$ and $e$; keep $d$, $p$ and $q$ secret;
4. a message $m$, with $0 \le m < n$, is encrypted as $c = m^e \bmod n$;
5. it is decrypted as $m = c^d \bmod n$.

It works because $ed = 1 + k\varphi(n)$ for some $k$, so for $m$ coprime to $n$, by [[eulers-theorem|Euler's theorem]],
$$c^d = m^{ed} = m \cdot \left(m^{\varphi(n)}\right)^k \equiv m \pmod{n}.$$
For the other $m$ it holds modulo $p$ and modulo $q$ separately, and so modulo $n$ by the [[chinese-remainder-theorem]].

It is safe as long as $n$ cannot be factored: with $p$ and $q$, anyone could find $\varphi(n)$ and then $d$.

**Example.** $p = 3$ and $q = 11$ give $n = 33$ and $\varphi(n) = 20$. Take $e = 3$; then $d = 7$, as $3 \cdot 7 = 21 \equiv 1 \pmod{20}$. The message $m = 4$ is sent as
$$c = 4^3 = 64 \equiv 31 \pmod{33},$$
and read back as
$$31^7 \equiv (-2)^7 = -128 \equiv 4 \pmod{33}.$$
