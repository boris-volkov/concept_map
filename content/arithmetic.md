# Arithmetic
color: #a06a1c

Numbers and the four operations: the bedrock everything else stands on.

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

Replacing a number with a nearby friendlier one, like $347 \approx 350$, to estimate an answer before working it out, and to check it after.

## Operations

The four operations, how they undo each other, and the order to do them in.

### Addition
kind: skill
prereqs: counting, place-value

Combining amounts. Column addition lines up the place values and carries each ten into the next column.

### Subtraction
kind: skill
prereqs: addition

Taking away, or finding the difference between two numbers. It undoes addition: $8 - 3 = 5$ because $5 + 3 = 8$.

### Multiplication
kind: skill
prereqs: addition

Repeated addition: $4 \times 3$ is four threes, $3 + 3 + 3 + 3$. Picture it as a rectangle of 4 rows and 3 columns.

### Division
kind: skill
prereqs: multiplication, subtraction

Sharing into equal groups, or asking how many groups fit. It undoes multiplication: $12 \div 3 = 4$ because $4 \times 3 = 12$. Whatever doesn't fit is the remainder.

### Long Division
kind: skill
prereqs: division, place-value

Dividing a big number one place value at a time: divide, multiply, subtract, bring down the next digit, repeat.

### Properties of Operations {#properties-of-operations}
prereqs: addition, multiplication

Order doesn't matter when adding or multiplying ($3 + 5 = 5 + 3$), grouping doesn't either, and multiplication spreads over addition: $3 \times 14 = 3 \times 10 + 3 \times 4$. These are the tricks behind mental arithmetic; algebra makes them its [[axioms]].

### Order of Operations
kind: skill
prereqs: exponents, division, subtraction

The agreed order for working out an expression: brackets, then exponents, then multiplication and division from left to right, then addition and subtraction from left to right. So $2 + 3 \times 4 = 14$, not $20$.

## Factors & Multiples

How whole numbers break apart into products: the number theory behind fractions.

### Multiples
prereqs: multiplication

The multiples of a number are its times table, continued forever: the multiples of 4 are 4, 8, 12, 16, 20, …

### Factors
prereqs: multiplication, division

A factor of a number divides it with no remainder. The factors of 12 are 1, 2, 3, 4, 6 and 12, and they come in pairs that multiply to 12.

### Divisibility Rules
kind: skill
prereqs: factors, place-value

Shortcuts for spotting factors: a number is divisible by 3 when its digits add up to a multiple of 3, by 5 when it ends in 0 or 5, by 9 when its digits add up to a multiple of 9.

### Prime Numbers {#primes}
kind: definition
prereqs: factors

A prime has exactly two factors, 1 and itself: 2, 3, 5, 7, 11, 13, … The number 1 is not prime, and 2 is the only even prime.

### Prime Factorization
kind: skill
prereqs: primes, divisibility-rules

Writing a number as a product of primes, for instance with a factor tree: $60 = 2 \times 2 \times 3 \times 5$.

### Fundamental Theorem of Arithmetic
kind: theorem
prereqs: prime-factorization

Every whole number above 1 is a product of primes in exactly one way, apart from the order of the factors. Primes are the atoms of multiplication.

### Greatest Common Factor {#gcf}
prereqs: factors

The largest number that divides both of two numbers: $\gcd(12, 18) = 6$. It is what you divide by to simplify a fraction in one step.

### Least Common Multiple {#lcm}
prereqs: multiples

The smallest positive number that is a multiple of each of two (or more) numbers. It is the *least common denominator* you need for adding fractions.

**By listing multiples.** Write out the multiples of each number until one turns up in both lists:

- Multiples of 4: 4, 8, **12**, 16, 20, **24**, …
- Multiples of 6: 6, **12**, 18, **24**, …

The common multiples are 12, 24, 36, …, and the least of them is 12, so $\operatorname{lcm}(4, 6) = 12$.

**By prime factors** (see [[prime-factorization]]). Take each prime the *greatest* number of times it appears in either number:

$$4 = 2^2, \qquad 6 = 2 \times 3 \qquad\Longrightarrow\qquad \operatorname{lcm}(4, 6) = 2^2 \times 3 = 12$$

> **A useful check.** For two numbers, $\operatorname{lcm}(a, b) \times \gcd(a, b) = a \times b$. Here $12 \times 2 = 24 = 4 \times 6$.

```quiz
Q: What is $\operatorname{lcm}(4, 6)$?
- 2
- 10
+ 12
- 24
Hint: List the multiples of 6 and stop at the first one that 4 divides.
Why: 6, **12**, and 4 divides 12. 24 is a common multiple too, but not the least.

Q: What is $\operatorname{lcm}(3, 5)$?
A: 15
Hint: 3 and 5 share no factors.
Why: When two numbers share no factors, their LCM is simply their product.

Q: What is $\operatorname{lcm}(8, 12)$?
A: 24
Hint: Try the multiples of 12.
Why: $8 = 2^3$ and $12 = 2^2 \times 3$, so take $2^3 \times 3 = 24$.
```

## Fractions

Parts of a whole, and the arithmetic of parts.

### What a Fraction Is {#fraction-concept}
kind: definition
prereqs: division, number-line

$\frac{a}{b}$ means $a$ pieces of size $\frac{1}{b}$, when the whole is cut into $b$ equal pieces. It is also a division, $a \div b$, and a point on the number line.

### Equivalent Fractions
prereqs: fraction-concept, multiplication

Multiplying the top and bottom by the same number names the same amount in smaller pieces: $\frac{1}{2} = \frac{2}{4} = \frac{3}{6}$.

### Simplifying Fractions
kind: skill
prereqs: equivalent-fractions, gcf

Dividing the top and bottom by a common factor until none is left: $\frac{12}{18} = \frac{2}{3}$, dividing both by $\gcd(12, 18) = 6$.

### Comparing Fractions
kind: skill
prereqs: equivalent-fractions, comparing-numbers

Rewrite both over a common denominator, or cross-multiply: $\frac{3}{4} > \frac{5}{7}$ because $3 \times 7 = 21$ is more than $5 \times 4 = 20$.

### Mixed Numbers
prereqs: fraction-concept, division

A whole number and a fraction together, like $2\frac{1}{3}$, which is the improper fraction $\frac{7}{3}$. Converting between the two forms is a division with remainder.

### Adding Fractions
kind: skill
prereqs: equivalent-fractions, lcm

Fractions can only be added when they count pieces of the same size, so first rewrite them over a **common denominator**. The least common multiple of the denominators is the smallest one that works.

$$\frac{1}{4} + \frac{1}{6} = \frac{3}{12} + \frac{2}{12} = \frac{5}{12}$$

1. Find the least common multiple of the denominators: $\operatorname{lcm}(4, 6) = 12$.
2. Rewrite each fraction over 12: multiply $\frac14$ top and bottom by 3, and $\frac16$ by 2.
3. Add the numerators and keep the denominator.
4. Simplify if you can.

Subtraction works the same way: $\frac{5}{6} - \frac{1}{4} = \frac{10}{12} - \frac{3}{12} = \frac{7}{12}$.

> **The classic mistake.** $\frac{1}{4} + \frac{1}{6}$ is not $\frac{2}{10}$. Adding the bottoms would mean the pieces changed size, and $\frac{2}{10}$ is *smaller* than $\frac14$ on its own.

```quiz
Q: $\frac{1}{4} + \frac{1}{6} = \;?$
A: 5/12
Hint: Use 12 as the common denominator.
Why: $\frac{3}{12} + \frac{2}{12} = \frac{5}{12}$.

Q: What is the least common denominator for $\frac{2}{9} + \frac{5}{6}$?
- 3
- 15
+ 18
- 54
Why: $\operatorname{lcm}(9, 6) = 18$. 54 works as well, but it isn't the least.

Q: $\frac{2}{3} - \frac{1}{2} = \;?$
A: 1/6
Hint: Rewrite both in sixths.
Why: $\frac{4}{6} - \frac{3}{6} = \frac{1}{6}$.
```

### Multiplying Fractions
kind: skill
prereqs: fraction-concept, multiplication

Multiply the tops together and the bottoms together: $\frac{2}{3} \times \frac{3}{5} = \frac{6}{15} = \frac{2}{5}$. "Of" means times: half of a third is $\frac12 \times \frac13 = \frac16$.

### Reciprocals
kind: definition
prereqs: multiplying-fractions

The reciprocal of $\frac{a}{b}$ is $\frac{b}{a}$, and a number times its reciprocal is 1. Zero is the one number with no reciprocal.

### Dividing Fractions
kind: skill
prereqs: reciprocals

Dividing by a fraction is multiplying by its reciprocal: $\frac{3}{4} \div \frac{1}{2} = \frac{3}{4} \times \frac{2}{1} = \frac{3}{2}$, because a half fits into three quarters one and a half times.

## Decimals & Percents

Fractions written in base ten, and "per hundred".

### Decimals
prereqs: place-value, fraction-concept

Place value continued to the right of the ones: tenths, hundredths, thousandths. $0.25$ is 2 tenths and 5 hundredths, which is $\frac{25}{100}$.

### Decimal Arithmetic
kind: skill
prereqs: decimals, long-division

Add and subtract by lining up the decimal points; multiply as whole numbers and then place the point; divide by shifting both numbers until the divisor is whole.

### Fractions to Decimals and Back {#fractions-to-decimals}
kind: skill
prereqs: decimals, long-division, simplifying-fractions

Divide the top by the bottom to get a decimal, which either stops ($\frac38 = 0.375$) or repeats forever ($\frac13 = 0.333\ldots$). A decimal that stops is a fraction over a power of ten.

### Percents
prereqs: fractions-to-decimals

Percent means per hundred: $35\% = \frac{35}{100} = 0.35$. So 35% of 80 is $0.35 \times 80 = 28$.

### Percent Change
kind: skill
prereqs: percents

The change divided by the original amount: going from 80 to 100 is a $\frac{20}{80} = 25\%$ increase. A 25% rise followed by a 25% fall does not get you back where you started.

### Scientific Notation
prereqs: decimals, exponents

Very large and very small numbers written as a number between 1 and 10 times a power of ten: $3{,}000{,}000 = 3 \times 10^6$ and $0.0004 = 4 \times 10^{-4}$.

## Ratios & Rates

Comparing quantities by dividing them.

### Ratios {#ratio}
kind: definition
prereqs: fraction-concept, multiplication

A ratio compares two amounts: 3 cups of flour to 2 of sugar is $3 : 2$. Scaling both parts by the same number keeps the ratio the same.

### Rates & Unit Rates {#unit-rates}
prereqs: ratio, division

A rate compares different kinds of quantity, like 150 miles in 3 hours. The unit rate is the amount for one: 50 miles per hour.

### Proportions
prereqs: ratio, equivalent-fractions

Two equal ratios, like $\frac{3}{4} = \frac{9}{12}$. Proportional reasoning is scaling a recipe, reading a map scale, or converting currency.

### Unit Conversion
kind: skill
prereqs: unit-rates, multiplying-fractions

Multiply by fractions that equal 1, like $\frac{60\text{ min}}{1\text{ h}}$, arranged so the units you don't want cancel out.

## Integers

The whole numbers and their negatives.

### Negative Numbers
kind: definition
prereqs: number-line, subtraction

Numbers below zero: the number line continued to the left. $-3$ is three steps left of 0, like a temperature below freezing or a debt.

### Absolute Value
kind: definition
prereqs: negative-numbers

A number's distance from zero, whichever side it is on: $|-5| = |5| = 5$.

### Adding & Subtracting Integers {#integer-addition}
kind: skill
prereqs: negative-numbers, absolute-value

Adding a negative moves left on the number line, and subtracting a negative moves right: $5 - (-2) = 7$.

### Multiplying & Dividing Integers {#integer-multiplication}
kind: skill
prereqs: integer-addition, multiplication, division

Same signs give a positive, different signs a negative: $(-3)(-4) = 12$ and $(-12) \div 3 = -4$.

## Powers & Roots

Repeated multiplication, and undoing it.

### Exponents
kind: definition
prereqs: multiplication

An exponent counts how many times a number is multiplied by itself: $2^3 = 2 \times 2 \times 2 = 8$. Squares and cubes are exponents 2 and 3.

### Square Roots
kind: definition
prereqs: exponents

$\sqrt{n}$ is the non-negative number whose square is $n$: $\sqrt{49} = 7$. Perfect squares have whole-number roots; others, like $\sqrt{2}$, do not.
