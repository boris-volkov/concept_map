# Probability & Statistics {#statistics}
color: #74416f
built-on: algebra

Reasoning about data, and about chance.

## Describing Data
rows: kinds
wrap: 6

Summing up a pile of numbers in a picture or a few well-chosen values.

### Least-Squares Line {#least-squares}
kind: theorem
prereqs: line-of-best-fit, correlation

The line that makes the sum of the squared residuals smallest has slope $b = r\frac{s_y}{s_x}$, and passes through $(\bar{x}, \bar{y})$.

### Data & Variables {#data-types}
kind: definition
prereqs: counting

A variable is something measured for each case. It is
- categorical when it sorts cases into groups, like eye colour;
- quantitative when it is a number, like height.

### Displaying Data {#data-displays}
kind: definition
prereqs: data-types, number-line

Pictures of data:
- bar charts, for categories;
- dot plots and histograms, for numbers, showing where the values bunch up and spread out.

### Mean, Median & Mode {#measures-of-center}
kind: definition
prereqs: data-types, division, comparing-numbers

Three meanings of "typical":
- the mean shares the total out equally;
- the median is the middle value in order;
- the mode is the most common.

One huge value drags the mean but barely moves the median.

### Quartiles & Range {#quartiles}
kind: definition
prereqs: measures-of-center

The quartiles split ordered data into four equal parts. Two measures of spread:
- the range, the largest value minus the smallest;
- the interquartile range, $Q_3 - Q_1$, the spread of the middle half.

### Box Plots
kind: definition
prereqs: quartiles, data-displays

A five-number summary drawn to scale:
1. the minimum;
2. $Q_1$;
3. the median;
4. $Q_3$;
5. the maximum.

Quick to compare across groups, but blind to the shape inside each quarter.

[Try the interactive box plot](https://boris-volkov.github.io/box_plots/): drag the quartiles and watch a sample rearrange itself underneath.

### Standard Deviation
kind: definition
prereqs: measures-of-center, exponents, square-roots

The typical distance of the values from their mean, in three steps:
1. square the deviations from the mean;
2. average them;
3. take the square root.

$$\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (x_i - \bar{x})^2}$$

### Scatter Plots & Correlation {#scatter-plots}
kind: definition
prereqs: coordinate-plane, data-types

Plotting two variables against each other to see whether they move together. Correlation measures how tightly the points hug a line; it doesn't show that one causes the other.

### Line of Best Fit
kind: definition
prereqs: scatter-plots, slope-intercept

The line that comes closest to the points in a scatter plot, used to summarise a trend and make predictions within the range of the data.

### Two-Way Tables
kind: definition
prereqs: data-types, percents

A two-way table counts data by two categorical variables. Each entry is a joint frequency, and the totals in the margins are marginal frequencies.

| | Likes tea | No tea | Total |
| --- | --- | --- | --- |
| Adults | 30 | 20 | 50 |
| Teens | 10 | 40 | 50 |
| Total | 40 | 60 | 100 |

A conditional relative frequency divides by one row's or column's total: 30 of 50 adults, 60%, like tea.

### Correlation Coefficient {#correlation}
kind: definition
prereqs: scatter-plots, standard-deviation

The correlation $r$ of paired data measures how nearly the points lie on a line:
$$r = \frac{1}{n - 1}\sum \left(\frac{x_i - \bar{x}}{s_x}\right)\left(\frac{y_i - \bar{y}}{s_y}\right), \quad -1 \le r \le 1.$$

Near $\pm 1$ is a strong line, near $0$ no line, and the sign is the sign of the slope.

### Residuals
kind: definition
prereqs: line-of-best-fit

The residual of a point is its actual value minus the value the model predicts:
$$e = y - \hat{y}.$$

A good fit leaves residuals that scatter without pattern about 0. A curve in the residual plot says that the model is the wrong shape.

### Shape of a Distribution {#distribution-shape}
kind: property
prereqs: data-displays, measures-of-center

A distribution may be
- symmetric, or skewed left or right;
- single-peaked, or bimodal.

Skew pulls the mean toward the long tail, away from the median.

### Outlier Rule {#outlier-rule}
kind: heuristic
prereqs: quartiles

A value is an outlier, by convention, if it lies more than $1.5 \times \text{IQR}$ below $Q_1$ or above $Q_3$. The median and IQR resist outliers, and the mean and standard deviation do not.

### Effect of Changing Units {#linear-transformation-of-data}
kind: property
prereqs: measures-of-center, standard-deviation

Adding $c$ to every value adds $c$ to the mean and median, and leaves the spread alone. Multiplying every value by $k > 0$ multiplies the mean, median, range and standard deviation by $k$.

### Correlation Is Not Causation {#correlation-causation}
kind: property
prereqs: correlation

A strong correlation does not show that one variable causes the other. A third variable may drive both. Only a [[randomized-experiments|randomized experiment]] supports a cause.

### The Mean Follows the Tail {#mean-follows-tail}
kind: heuristic
prereqs: measures-of-center, distribution-shape

In a skewed distribution, the mean usually lies further along the tail than the median: above it when skewed right, and below it when skewed left.

So a mean well above the median suggests a long right tail, as with incomes. There are exceptions, especially in distributions with several peaks, so check the shape as well.

### Regression Line Form {#regression-form}
kind: form
prereqs: least-squares

$$\hat{y} = a + bx.$$

| Reads off | From |
| --- | --- |
| predicted change in $y$ per unit of $x$ | $b$ |
| predicted $y$ at $x = 0$ | $a$ |
| strength of the fit | $r$, with $r^2$ the share of variation explained |

### Sample Standard Deviation {#sample-standard-deviation}
kind: formula
prereqs: standard-deviation

The standard deviation of a sample $x_1, \ldots, x_n$ with mean $\bar{x}$ divides by $n - 1$ rather than $n$:
$$s = \sqrt{\frac{1}{n - 1}\sum_{i=1}^{n} (x_i - \bar{x})^2}$$

It estimates the standard deviation $\sigma$ of the population the sample came from. The deviations from $\bar{x}$ run a little smaller than those from the unknown $\mu$, since $\bar{x}$ is the centre of the sample itself, and dividing by $n - 1$ makes up for it: $s^2$ is an unbiased estimate of $\sigma^2$. The $n - 1$ is the number of degrees of freedom: the $n$ deviations add up to $0$, so only $n - 1$ of them are free.

**Example.** For the sample $2, 4, 6$, $\bar{x} = 4$ and
$$s = \sqrt{\frac{4 + 0 + 4}{2}} = 2,$$
where the same three values taken as a whole population have $\sigma = \sqrt{\frac{8}{3}} \approx 1.63$.

```quiz
Q: What is the sample standard deviation of $1, 3, 5, 7$?
A: 2.58
Why: $\bar{x} = 4$, the squared deviations add up to $9 + 1 + 1 + 9 = 20$, and $\sqrt{\frac{20}{3}} \approx 2.58$.
```

### Comparing Distributions {#comparing-distributions}
kind: skill
prereqs: measures-of-center, standard-deviation, distribution-shape

Compare shape, centre and spread, in context. Use the mean and standard deviation for symmetric data, and the median and IQR for skewed data or data with outliers.

### Reading Two-Way Tables {#reading-two-way-tables}
kind: skill
prereqs: two-way-tables

Decide what the "of" refers to: that row or column's total is the denominator. If the percentages differ across the rows, the two variables are associated.

```quiz
Q: In a table, 12 of 40 boys and 18 of 60 girls play chess. Is playing chess associated with gender in this data? Answer yes or no.
A: no
Why: Both are 30%.
```

### Fitting and Using a Line {#using-regression}
kind: skill
prereqs: regression-form, residuals

Plot the data, fit the line, check the residuals, and interpret the slope and intercept with their units. Predict only within the range of the data, since extrapolating assumes a pattern that may not continue.

```quiz
Q: A fit gives $\hat{y} = 20 + 3x$. What is the residual of the point $(5, 37)$?
A: 2
Why: $\hat{y} = 35$, and $37 - 35 = 2$.
```

## Counting Methods
rows: kinds
wrap: 6

Counting the possibilities without listing them all.

### The Counting Principle {#counting-principle}
kind: theorem
prereqs: multiplication

If one choice can be made in $m$ ways and a second in $n$ ways, the pair can be made in $m \times n$ ways.

For example, 3 shirts and 4 trousers make
$$3 \times 4 = 12$$
outfits.

### Pascal's Rule
kind: theorem
prereqs: combinations

For $1 \le r \le n - 1$:
$$\binom{n}{r} = \binom{n - 1}{r - 1} + \binom{n - 1}{r}.$$

*Proof.* Fix one item. A choice of $r$ items either includes it, leaving $r - 1$ from the other $n - 1$, or leaves it out, leaving $r$ from them. $\square$

### Symmetry of Combinations {#combination-symmetry}
kind: theorem
prereqs: combinations

$$\binom{n}{r} = \binom{n}{n - r}.$$

*Proof.* Choosing $r$ items to take is choosing $n - r$ items to leave. $\square$

### Factorials
kind: definition
prereqs: counting-principle

The number of ways to put $n$ things in order:
$$n! = n \times (n - 1) \times \cdots \times 1.$$
For example,
$$4! = 4 \times 3 \times 2 \times 1 = 24,$$
and, by convention, $0! = 1$.

### Pascal's Triangle
kind: property
prereqs: combinations, addition

Each entry is the sum of the two above it,
$$\binom{n}{k} = \binom{n - 1}{k - 1} + \binom{n - 1}{k},$$
and row $n$ lists $\binom{n}{0}, \binom{n}{1}, \ldots, \binom{n}{n}$.

### Permutations
kind: formula
prereqs: factorials

Arrangements where order matters. The number of ways to arrange $k$ of $n$ things in order is
$$\frac{n!}{(n - k)!}.$$

Choosing a gold, silver and bronze winner from 10 runners can happen in
$$10 \times 9 \times 8 = \frac{10!}{7!} = 720$$
ways.

### Combinations
kind: formula
prereqs: permutations, division

Selections where order doesn't matter: divide out the orderings. The number of ways to choose $k$ of $n$ things is
$$\binom{n}{k} = \frac{n!}{k!\,(n - k)!}.$$

Choosing 3 of 10 people:

$$\binom{10}{3} = \frac{10!}{3!\,7!} = 120$$

### Arrangements with Repeats {#multiset-permutations}
kind: formula
prereqs: permutations

The arrangements of $n$ items, of which $n_1$ are alike, $n_2$ are alike, and so on, number
$$\frac{n!}{n_1!\,n_2!\cdots}.$$

### Choosing a Counting Method {#choosing-counting-method}
kind: skill
prereqs: permutations, combinations

Ask whether order matters and whether items repeat:

| Situation | Count |
| --- | --- |
| order matters, no repeats | $_nP_r$ |
| order does not matter, no repeats | $_nC_r$ |
| order matters, repeats allowed | $n^r$ |
| separate stages | multiply |

```quiz
Q: How many committees of 3 can be chosen from 8 people?
A: 56
Why: $\frac{8 \cdot 7 \cdot 6}{3!} = 56$.

Q: How many ways can gold, silver and bronze go to 8 runners?
A: 336
Why: $8 \cdot 7 \cdot 6$; here the order matters.
```

### Counting Poker Hands {#poker-hands}
kind: skill
prereqs: counting-probability

To count the 5-card hands of one kind, from a deck of 13 ranks in 4 suits:
1. choose the ranks, together when they play the same part;
2. choose the suits for each rank;
3. multiply the stages, and take away any hands that belong to a better kind;
4. divide by the $\binom{52}{5} = 2{,}598{,}960$ hands in all, to find the probability.

> **!** Ranks that play the same part are chosen together. Two pair takes $\binom{13}{2}$ for the ranks of its pairs, not $13 \cdot 12$, since kings and fours is the same hand as fours and kings. A full house takes $13 \cdot 12$, since three kings and two fours differs from three fours and two kings.

**Example.** A full house is three cards of one rank and two of another. Choose the rank of the three and 3 of its 4 suits, then the rank of the pair and 2 of its 4 suits:
$$\binom{13}{1}\binom{4}{3}\binom{12}{1}\binom{4}{2} = 13 \cdot 4 \cdot 12 \cdot 6 = 3{,}744.$$
Its probability is
$$\frac{3{,}744}{2{,}598{,}960} \approx 0.1441\%,$$
or about 1 hand in 694.

A straight is five ranks in a row, with the ace high or low, so its high card is one of the 10 from 5 to ace. Each hand counts only as the best kind it qualifies for.

: What to Choose
| Hand | Choose |
| --- | --- |
| Royal flush | a suit |
| Straight flush | a high card from 5 to king, and a suit |
| Four of a kind | a rank and its 4 suits; a rank and a suit for the last card |
| Full house | a rank and 3 suits; a rank and 2 suits |
| Flush | 5 ranks and a suit, less the 40 straight and royal flushes |
| Straight | a high card from 5 to ace and a suit for each card, less the same 40 |
| Three of a kind | a rank and 3 suits; 2 other ranks, and a suit for each |
| Two pair | 2 ranks, and 2 suits for each; another rank and a suit |
| One pair | a rank and 2 suits; 3 other ranks, and a suit for each |
| High card | 5 ranks that are not a straight; suits that are not all the same |

: Counting Each Hand
| Hand | Count | Ways |
| --- | --- | --- |
| Royal flush | $\binom{4}{1}$ | $4$ |
| Straight flush | $9\binom{4}{1}$ | $9 \cdot 4 = 36$ |
| Four of a kind | $\binom{13}{1}\binom{4}{4}\binom{12}{1}\binom{4}{1}$ | $13 \cdot 1 \cdot 12 \cdot 4 = 624$ |
| Full house | $\binom{13}{1}\binom{4}{3}\binom{12}{1}\binom{4}{2}$ | $13 \cdot 4 \cdot 12 \cdot 6 = 3{,}744$ |
| Flush | $\binom{13}{5}\binom{4}{1} - 40$ | $1{,}287 \cdot 4 - 40 = 5{,}108$ |
| Straight | $10 \cdot 4^5 - 40$ | $10{,}240 - 40 = 10{,}200$ |
| Three of a kind | $\binom{13}{1}\binom{4}{3}\binom{12}{2}\binom{4}{1}^2$ | $13 \cdot 4 \cdot 66 \cdot 16 = 54{,}912$ |
| Two pair | $\binom{13}{2}\binom{4}{2}^2\binom{11}{1}\binom{4}{1}$ | $78 \cdot 36 \cdot 11 \cdot 4 = 123{,}552$ |
| One pair | $\binom{13}{1}\binom{4}{2}\binom{12}{3}\binom{4}{1}^3$ | $13 \cdot 6 \cdot 220 \cdot 64 = 1{,}098{,}240$ |
| High card | $\left(\binom{13}{5} - 10\right)\left(4^5 - 4\right)$ | $1{,}277 \cdot 1{,}020 = 1{,}302{,}540$ |

: Probability of Each Hand
| Hand | Example | Ways | Probability | About 1 in |
| --- | --- | ---: | ---: | ---: |
| Royal flush | A♠ K♠ Q♠ J♠ 10♠ | 4 | 0.0001539% | 649,740 |
| Straight flush | 9♥ 8♥ 7♥ 6♥ 5♥ | 36 | 0.001385% | 72,193 |
| Four of a kind | 7♣ 7♦ 7♥ 7♠ K♦ | 624 | 0.02401% | 4,165 |
| Full house | Q♠ Q♥ Q♦ 4♣ 4♠ | 3,744 | 0.1441% | 694 |
| Flush | K♦ 10♦ 8♦ 5♦ 2♦ | 5,108 | 0.1965% | 509 |
| Straight | 9♣ 8♦ 7♠ 6♥ 5♣ | 10,200 | 0.3925% | 255 |
| Three of a kind | J♣ J♦ J♠ 9♥ 3♣ | 54,912 | 2.113% | 47 |
| Two pair | K♠ K♦ 4♥ 4♣ 9♠ | 123,552 | 4.754% | 21 |
| One pair | 10♥ 10♠ A♦ 6♣ 3♥ | 1,098,240 | 42.26% | 2.4 |
| High card | A♣ J♦ 8♠ 6♥ 2♣ | 1,302,540 | 50.12% | 2.0 |
| All hands | | 2,598,960 | 100% | 1 |

```quiz
Q: How many 5-card hands hold all four aces?
A: 48
Why: The four aces are fixed, and the fifth card is any of the other 48.

Q: How many 5-card hands are all hearts, straight flushes included?
A: 1287
Why: $\binom{13}{5} = 1{,}287$.

Q: Why does two pair use $\binom{13}{2}$ for its two ranks, where a full house uses $13 \cdot 12$?
+ Its two pairs play the same part, so their order doesn't count
- It has fewer ranks to choose from
- It holds more cards of one rank
Why: Kings and fours is the same hand as fours and kings, but three kings and two fours differs from three fours and two kings.

Q: Which is the more likely hand?
- a flush
+ a straight
Why: There are 10,200 straights and 5,108 flushes.
```

## Axioms {#probability-axioms}

The axioms of probability, from which every rule of chance is derived.

### Kolmogorov Axioms {#kolmogorov-axioms}
kind: axiom
prereqs: set-operations

A probability $P$ on a sample space $\Omega$ satisfies:
1. $P(A) \ge 0$ for every event $A$;
2. $P(\Omega) = 1$;
3. if $A_1, A_2, \ldots$ are pairwise disjoint, then $P\left(\bigcup_i A_i\right) = \sum_i P(A_i)$.

Every rule of probability, such as
$$P(A^c) = 1 - P(A),$$
is derived from these three.

## Probability
built-on: counting-methods
rows: kinds
wrap: 6

Measuring how likely things are, on a scale from 0 to 1.

### Complement Rule
kind: theorem
prereqs: kolmogorov-axioms

For every event $A$:
$$P(\text{not } A) = 1 - P(A).$$

Often the easy way round: the chance of at least one six in four rolls is
$$1 - \left(\frac{5}{6}\right)^4 \approx 0.52.$$

### Addition Rule
kind: theorem
prereqs: kolmogorov-axioms, adding-fractions

For all events $A$ and $B$:
$$P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B).$$

Subtract the overlap so it isn't counted twice.

### Independent Events
kind: definition
prereqs: sample-spaces, multiplying-fractions

Events $A$ and $B$ are independent if
$$P(A \text{ and } B) = P(A)\,P(B).$$

Equivalently, when $P(B) > 0$, knowing that $B$ happened does not change the probability of $A$:
$$P(A \mid B) = P(A).$$

Two heads in a row:
$$\frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}.$$

### Bayes' Theorem
kind: theorem
prereqs: conditional-probability

Turning $P(B \mid A)$ around:
$$P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}.$$

It is why a positive result on an accurate test for a rare disease can still most likely be a false alarm.

### General Multiplication Rule {#multiplication-rule}
kind: theorem
prereqs: conditional-probability

For any events $A$ and $B$:
$$P(A \cap B) = P(A)\,P(B \mid A).$$

*Proof.* Multiply the definition of [[conditional-probability]] by $P(A)$. $\square$

### Law of Total Probability {#total-probability}
kind: theorem
prereqs: conditional-probability, addition-rule

If $B$ and its complement both have positive probability:
$$P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c).$$

### Probability of an Event {#probability-basics}
kind: definition
prereqs: fraction-concept

With equally likely outcomes, the probability of an event is
$$P(A) = \frac{\text{favourable outcomes}}{\text{total outcomes}}.$$
Rolling an even number has probability
$$P(\text{even}) = \frac{3}{6} = \frac{1}{2}.$$

### Sample Spaces
kind: definition
prereqs: probability-basics, counting-principle

The list of every possible outcome, often drawn as a table or a tree: two coins give HH, HT, TH and TT.

### Conditional Probability
kind: definition
prereqs: sample-spaces, dividing-fractions

The probability of $A$ given that $B$ happened:
$$P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)}.$$
Knowing $B$ shrinks the sample space to $B$.

### Mutually Exclusive Events {#mutually-exclusive}
kind: definition
prereqs: sample-spaces

Events $A$ and $B$ are mutually exclusive if they cannot both happen, $A \cap B = \varnothing$. Then
$$P(A \cup B) = P(A) + P(B).$$

Mutually exclusive events with positive probability are never independent.

### Probability by Counting {#counting-probability}
kind: skill
prereqs: combinations, probability-basics

Counting favourable and total outcomes with combinations. The chance of a particular 5-card hand is
$$\frac{1}{\binom{52}{5}},$$
about 1 in 2.6 million. Every kind of hand is worked through in [[poker-hands]].

### Tree Diagrams {#tree-diagrams}
kind: skill
prereqs: multiplication-rule

1. draw a branch for each outcome at each stage;
2. label each with its probability, given what came before;
3. multiply along each path;
4. add across the paths you want.

```quiz
Q: A bag has 3 red and 2 blue marbles. Two are drawn without replacement. What is the probability that both are red?
A: 3/10
Why: $\frac{3}{5} \cdot \frac{2}{4} = \frac{3}{10}$.
```

### Testing Independence {#testing-independence}
kind: skill
prereqs: independent-events, reading-two-way-tables

Check whether $P(A \mid B) = P(A)$, or whether $P(A \cap B) = P(A)P(B)$, using counts from a table.

**Example.** In the [[two-way-tables|table of tea drinkers]], $P(\text{tea} \mid \text{adult}) = 0.6$ but $P(\text{tea}) = 0.4$, so they are not independent.

### Simulating Probabilities {#simulation}
kind: skill
prereqs: probability-basics

Model each trial with a random device, such as a spinner or random numbers, repeat it many times, and take the share of successes as an estimate.

## Distributions
built-on: probability, describing-data
rows: kinds
wrap: 6

Random quantities, and the shapes their values take.

### The 68–95–99.7 Rule {#empirical-rule}
kind: heuristic
prereqs: normal-distribution, z-scores

In a normal distribution, about
- 68% of values lie within one standard deviation of the mean;
- 95% within two;
- 99.7% within three.

On an exact normal curve the figures are 68.27%, 95.45% and 99.73%. On real data they hold only as far as the data are roughly bell-shaped.

### Mean and Variance of a Binomial {#binomial-mean}
kind: theorem
prereqs: binomial-distribution, expected-value

A binomial variable with $n$ trials and success probability $p$ has
$$\begin{aligned} \mu &= np, \\ \sigma^2 &= np(1 - p), \\ \sigma &= \sqrt{np(1 - p)}. \end{aligned}$$

Writing $q = 1 - p$ for the probability of a failure, $\sigma^2 = npq$ and $\sigma = \sqrt{npq}$.

*Why.* A binomial is a sum of $n$ independent trials, each worth $1$ for a success and $0$ for a failure. One trial has mean $p$ and variance $(1 - p)^2 p + (0 - p)^2(1 - p) = p(1 - p)$, and for independent trials both add up.

**Example.** For 50 free throws by a 70% shooter, $\mu = 50(0.7) = 35$ baskets, and
$$\sigma = \sqrt{50(0.7)(0.3)} = \sqrt{10.5} \approx 3.24.$$

```quiz
Q: A fair coin is flipped 100 times. What is the standard deviation of the number of heads?
A: 5
Why: $\sqrt{100 \cdot \frac{1}{2} \cdot \frac{1}{2}} = \sqrt{25} = 5$.

Q: A die is rolled 60 times. What is the expected number of sixes?
A: 10
Why: $np = 60 \cdot \frac{1}{6} = 10$.
```

### Law of Large Numbers
kind: theorem
prereqs: expected-value

As the number of independent trials grows, the average of the results settles toward the expected value.

### Central Limit Theorem {#clt}
kind: theorem
prereqs: normal-distribution, standard-deviation

For a large enough sample from any population with mean $\mu$ and standard deviation $\sigma$, the sample mean is approximately normal, with mean $\mu$ and standard deviation $\frac{\sigma}{\sqrt{n}}$.

### Random Variables
kind: definition
prereqs: probability-basics, function-notation

A number decided by chance, like the total of two dice, together with the probability of each of its values.

### Expected Value
kind: definition
prereqs: random-variables, measures-of-center

The long-run average of a random variable, each value weighted by its probability:
$$E[X] = \sum_x x \, P(X = x).$$
A fair die's expected roll is
$$\frac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5,$$
though no single roll is.

### Variance of a Random Variable {#random-variable-variance}
kind: definition
prereqs: expected-value, standard-deviation

The variance of a random variable $X$ with mean $\mu = E[X]$ is the expected squared distance from the mean, and its standard deviation is the square root of that:
$$\begin{aligned} \sigma^2 = \operatorname{Var}(X) &= \sum_x (x - \mu)^2 \, P(X = x), \\ \sigma &= \sqrt{\operatorname{Var}(X)}. \end{aligned}$$

**Example.** For a fair die, $\mu = 3.5$, and
$$\sigma^2 = \frac{(2.5)^2 + (1.5)^2 + (0.5)^2 + (0.5)^2 + (1.5)^2 + (2.5)^2}{6} = \frac{35}{12} \approx 2.92,$$
so $\sigma \approx 1.71$.

### Combining Random Variables {#combining-random-variables}
kind: theorem
prereqs: random-variable-variance

For random variables $X$ and $Y$ and constants $a$ and $b$:
$$\begin{aligned} E[a + bX] &= a + bE[X], & \sigma_{a + bX} &= \lvert b \rvert \sigma_X, \\ E[X \pm Y] &= E[X] \pm E[Y]. \end{aligned}$$
If $X$ and $Y$ are independent,
$$\operatorname{Var}(X \pm Y) = \operatorname{Var}(X) + \operatorname{Var}(Y).$$

> **!** Variances add for a difference too, and standard deviations never add: $\sigma_{X + Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}$.

Adding a constant shifts the mean but not the spread; multiplying by $b$ scales both.

### Geometric Distribution
kind: definition
prereqs: independent-events, random-variables

A random variable $X$ is geometric, with parameter $p$, when it counts the trials up to and including the first success, in a setting with these four conditions, **BITS**:
- **B**inary: each trial has two outcomes, success or failure;
- **I**ndependent: the result of one trial does not change the chances of another;
- **T**rials: they go on until the first success;
- **S**ame: each trial succeeds with the same probability, $p$.
Then, for $k = 1, 2, 3, \ldots$,
$$P(X = k) = (1 - p)^{k - 1} p,$$
and
$$\begin{aligned} \mu &= \frac{1}{p}, \\ \sigma &= \frac{\sqrt{1 - p}}{p}. \end{aligned}$$

The first success comes after the $k$th trial exactly when the first $k$ trials all fail:
$$\begin{aligned} P(X > k) &= (1 - p)^k, \\ P(X \le k) &= 1 - (1 - p)^k. \end{aligned}$$

**Example.** Rolling a die until a six comes up, $p = \frac{1}{6}$. The chance that the first six is on the third roll is
$$\left(\frac{5}{6}\right)^2 \frac{1}{6} = \frac{25}{216} \approx 0.116,$$
and it takes $\frac{1}{p} = 6$ rolls on average.

```quiz
Q: A basketball player makes 40% of her shots. What is the probability that her first basket is on her third shot?
A: 0.144
Why: $(0.6)^2(0.4) = 0.144$.

Q: On average, how many tries does it take to get the first success when $p = 0.25$?
A: 4
Why: $\mu = \frac{1}{p} = 4$.
```

### Table of Distributions {#distribution-table}
kind: formula
prereqs: binomial-mean, geometric-distribution, combining-random-variables, normal-distribution

The formulas for the distributions of a first course in statistics, with $q = 1 - p$.

: Discrete Random Variables
| | Any | Binomial | Geometric |
| --- | --- | --- | --- |
| counts | | successes in $n$ trials | trials to the first success |
| conditions | | BINS | BITS |
| values | | $0, 1, \ldots, n$ | $1, 2, 3, \ldots$ |
| $P(X = k)$ | $P(k)$, summing to $1$ | $\binom{n}{k} p^k q^{n - k}$ | $q^{k - 1} p$ |
| $P(X \le k)$ | $\sum_{x \le k} P(x)$ | $\sum_{j = 0}^{k} \binom{n}{j} p^j q^{n - j}$ | $1 - q^k$ |
| mean $\mu$ | $\sum x \, P(x)$ | $np$ | $\dfrac{1}{p}$ |
| variance $\sigma^2$ | $\sum (x - \mu)^2 P(x)$ | $npq$ | $\dfrac{q}{p^2}$ |
| standard deviation $\sigma$ | $\sqrt{\sigma^2}$ | $\sqrt{npq}$ | $\dfrac{\sqrt{q}}{p}$ |

: The Normal Distribution
| | |
| --- | --- |
| parameters | mean $\mu$, standard deviation $\sigma$ |
| standardising | $z = \dfrac{x - \mu}{\sigma}$ |
| within $1\sigma$, $2\sigma$, $3\sigma$ | $68\%$, $95\%$, $99.7\%$ |
| approximates the binomial | $\mu = np$, $\sigma = \sqrt{npq}$, when $np \ge 10$ and $nq \ge 10$ |
| density | $f(x) = \dfrac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x - \mu)^2}{2\sigma^2}}$ |

: Combining Random Variables
| | Mean | Standard deviation |
| --- | --- | --- |
| $a + bX$ | $a + b\mu_X$ | $\lvert b \rvert \sigma_X$ |
| $X + Y$ | $\mu_X + \mu_Y$ | $\sqrt{\sigma_X^2 + \sigma_Y^2}$, if independent |
| $X - Y$ | $\mu_X - \mu_Y$ | $\sqrt{\sigma_X^2 + \sigma_Y^2}$, if independent |

### Binomial Distribution
kind: definition
prereqs: combinations, independent-events, random-variables

A random variable $X$ is binomial, with parameters $n$ and $p$, when it counts the successes in a setting with these four conditions, **BINS**:
- **B**inary: each trial has two outcomes, success or failure;
- **I**ndependent: the result of one trial does not change the chances of another;
- **N**umber: the number of trials, $n$, is fixed in advance;
- **S**ame: each trial succeeds with the same probability, $p$.
Then, for $k = 0, 1, \ldots, n$,
$$P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}.$$

Check all four before using the binomial formulas. The usual ways a setting fails:
- the number of trials is not fixed, as in "roll until a six": that is a [[geometric-distribution|geometric]] setting instead;
- the trials are not independent, as in drawing cards without putting them back. When the sample is less than 10% of the population, the dependence is small enough to ignore;
- the probability changes from trial to trial, as in questions of different difficulty.

```quiz
Q: Which of these is a binomial setting?
- drawing 5 cards without replacement and counting the hearts
- rolling a die until a 6 comes up, and counting the rolls
+ shooting 20 free throws with a 75% success rate, and counting the baskets
- counting how many students pass tests of different difficulty
Hint: Check BINS: binary, independent, number fixed, same probability.
Why: Only the free throws have a fixed number of independent trials with the same $p$.

Q: Rolling a die until a 6 comes up fails which binomial condition?
- binary
- independent
+ number of trials fixed
- same probability
Why: The number of rolls is not decided in advance.
```

### Normal Distribution
kind: definition
prereqs: standard-deviation, distribution-shape, random-variables

The bell curve, set by its mean and standard deviation. Heights, measurement errors and averages of many small effects all come out roughly normal.

### Properties of the Normal Curve {#normal-properties}
kind: property
prereqs: normal-distribution

A normal curve is bell-shaped and symmetric about $\mu$, where the mean, median and mode coincide. It has its points of inflection at $\mu \pm \sigma$. The total area under it is 1, and area is probability.

### z-Scores {#z-scores}
kind: formula
prereqs: standard-deviation

How many standard deviations a value sits from the mean:
$$z = \frac{x - \mu}{\sigma}.$$
It puts different scales on a common footing.

### Normal Approximation to the Binomial {#normal-approximation}
kind: heuristic
prereqs: binomial-distribution, normal-distribution

A binomial with $n$ trials and success probability $p$ is close to a normal curve, with $\mu = np$ and $\sigma = \sqrt{np(1 - p)}$, when
$$np \ge 10 \quad\text{and}\quad n(1 - p) \ge 10.$$

The cutoff of 10 is a convention; some books use 5. The closer $p$ is to $\frac{1}{2}$, the sooner the shape turns normal.

```quiz
Q: A binomial has $n = 100$ and $p = 0.05$. Does it pass the rule? Answer yes or no.
A: no
Why: $np = 5$, which is under 10.
```

### The Sample Size of 30 {#sample-size-30}
kind: heuristic
prereqs: clt

A sample mean is usually close enough to normal once
$$n \ge 30.$$

There is nothing special about 30. Symmetric populations need fewer, and heavily skewed ones can need far more.

### Binomial Probability Form {#binomial-form}
kind: form
prereqs: binomial-distribution, combinations

$$P(X = k) = \binom{n}{k}p^k(1 - p)^{n-k}.$$

| Reads off | From |
| --- | --- |
| ways to place the successes | $\binom{n}{k}$ |
| chance of $k$ successes | $p^k$ |
| chance of the failures | $(1 - p)^{n-k}$ |

Needs a fixed number of independent trials, each with the same probability $p$.

### Finding Normal Probabilities {#normal-probabilities}
kind: skill
prereqs: z-scores, normal-distribution

1. sketch the curve, and shade the area wanted;
2. convert to a $z$-score;
3. read the area from a table or calculator;
4. subtract from 1 if the shaded area is on the other side.

**Example.** With $\mu = 100$ and $\sigma = 15$, the value $130$ has $z = 2$, and about 97.7% of values lie below it.

```quiz
Q: With $\mu = 70$ and $\sigma = 5$, what is the $z$-score of 62?
A: -1.6
Why: $\frac{62 - 70}{5} = -1.6$.
```

### Computing Binomial Probabilities {#computing-binomial}
kind: skill
prereqs: binomial-form

Identify $n$, $p$ and $k$, and substitute. For "at least one", use the [[complement-rule]]: $1 - (1 - p)^n$.

```quiz
Q: A fair coin is flipped 4 times. What is the probability of exactly 2 heads?
A: 3/8
Why: $\binom{4}{2}\left(\frac{1}{2}\right)^4 = \frac{6}{16}$.
```

### Deciding with Expected Value {#expected-value-decisions}
kind: skill
prereqs: expected-value

Find the expected payoff of each option, as the sum of value times probability, and compare.

**Example.** A \$2 ticket with a 1 in 500 chance of \$500 has expected gain $\frac{500}{500} - 2 = -\$1$.

## Sampling & Inference
built-on: distributions
rows: kinds
wrap: 6

From a sample to a population, and how far the conclusion can be trusted.

### Populations & Samples {#populations-and-samples}
kind: definition
prereqs: data-types

A population is the whole group of interest, and a sample is the part measured. A parameter is a number describing the population, and a statistic is a number computed from the sample.

### Random Sampling {#random-sampling}
kind: definition
prereqs: populations-and-samples

A simple random sample of size $n$ is one chosen so that every set of $n$ individuals is equally likely. A stratified sample samples randomly within groups; a cluster sample takes whole groups at random; a systematic sample takes every $k$th.

### Bias
kind: definition
prereqs: populations-and-samples

A sampling method is biased if it systematically favours some outcomes. Convenience samples, voluntary responses, leading questions and non-response are common causes.

### Surveys, Studies & Experiments {#study-types}
kind: definition
prereqs: populations-and-samples

A survey asks a sample. An observational study records without intervening. An experiment assigns treatments.

### Randomized Experiments {#randomized-experiments}
kind: definition
prereqs: study-types

A randomized experiment assigns treatments to subjects by chance, with a control group, so that the groups differ only by chance and by the treatment. It is the design that can show cause.

### Sampling Distributions {#sampling-distributions}
kind: property
prereqs: random-sampling, standard-deviation

The value of a statistic varies from sample to sample. The distribution of those values is its sampling distribution, and larger samples make it narrower, by a factor of $\frac{1}{\sqrt{n}}$.

The mean, standard deviation and shape of the sampling distribution of each statistic of a first course are collected in [[sampling-distribution-table]].

The standard deviations all assume independent observations: sampling with replacement, or a sample less than 10% of the population.

### Standard Error {#standard-error}
kind: definition
prereqs: sampling-distributions, sample-standard-deviation

The standard error of a statistic is the standard deviation of its sampling distribution with each unknown parameter replaced by its estimate from the sample: $\hat{p}$ for $p$, and $s$ for $\sigma$.

The standard deviation of a statistic depends on the parameters, which are what the sample is meant to find, so in practice it is the standard error that is computed:
$$\begin{aligned} SE_{\hat{p}} &= \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}, \\ SE_{\bar{x}} &= \frac{s}{\sqrt{n}}. \end{aligned}$$
The standard error of every statistic is in [[sampling-distribution-table]].

A mean standardised with its standard error, $\frac{\bar{x} - \mu}{s / \sqrt{n}}$, varies a little more than a normal variable, since $s$ varies from sample to sample too. It follows a [[t-distribution]] with $n - 1$ degrees of freedom, which approaches the normal as $n$ grows.

**Example.** A sample of 25 has $\bar{x} = 80$ and $s = 10$, so
$$SE_{\bar{x}} = \frac{10}{\sqrt{25}} = 2.$$

```quiz
Q: In a poll of 100, 64 say yes. What is the standard error of $\hat{p}$?
A: 0.048
Why: $\sqrt{\frac{0.64 \cdot 0.36}{100}} = \frac{0.48}{10} = 0.048$.
```

### Sampling Distribution of a Proportion {#sampling-distribution-proportion}
kind: formula
prereqs: sampling-distributions, binomial-mean

For a random sample of size $n$ from a population in which a proportion $p$ have some trait, the sample proportion $\hat{p} = \frac{X}{n}$, where $X$ counts those in the sample with the trait, has
$$\begin{aligned} \mu_{\hat{p}} &= p, \\ \sigma_{\hat{p}} &= \sqrt{\frac{p(1 - p)}{n}}. \end{aligned}$$
It is approximately normal when $np \ge 10$ and $n(1 - p) \ge 10$.

The standard deviation needs independent observations: sampling with replacement, or a sample less than 10% of the population.

*Why.* The count $X$ is binomial, with $\mu_X = np$ and $\sigma_X = \sqrt{np(1 - p)}$, and dividing a variable by $n$ divides its mean and its standard deviation by $n$:
$$\sigma_{\hat{p}} = \frac{\sqrt{np(1 - p)}}{n} = \sqrt{\frac{p(1 - p)}{n}}.$$

**Example.** If 60% of voters favour a measure, the proportion in favour in random polls of 400 has mean $0.6$ and standard deviation
$$\sqrt{\frac{0.6 \cdot 0.4}{400}} \approx 0.0245,$$
about 2.4 percentage points.

```quiz
Q: A fair coin is flipped 100 times. What is the standard deviation of the proportion of heads?
A: 0.05
Why: $\sqrt{\frac{0.5 \cdot 0.5}{100}} = \frac{0.5}{10} = 0.05$.
```

### Sampling Distribution of a Mean {#sampling-distribution-mean}
kind: formula
prereqs: sampling-distributions, combining-random-variables, clt

For a random sample of size $n$ from a population with mean $\mu$ and standard deviation $\sigma$, the sample mean $\bar{x}$ has
$$\begin{aligned} \mu_{\bar{x}} &= \mu, \\ \sigma_{\bar{x}} &= \frac{\sigma}{\sqrt{n}}. \end{aligned}$$
It is exactly normal when the population is normal, and approximately normal for $n \ge 30$ by the [[clt]].

The standard deviation needs independent observations: sampling with replacement, or a sample less than 10% of the population.

*Why.* $\bar{x} = \frac{1}{n}(X_1 + X_2 + \cdots + X_n)$, where the $X_i$ are independent and each has variance $\sigma^2$. Their variances add, so the sum has variance $n\sigma^2$, and dividing by $n$ divides the variance by $n^2$:
$$\sigma^2_{\bar{x}} = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}.$$

**Example.** Scores with $\mu = 100$ and $\sigma = 15$, averaged over random samples of 25, have mean $100$ and standard deviation
$$\frac{15}{\sqrt{25}} = 3.$$

```quiz
Q: A population has $\sigma = 12$. What is the standard deviation of the mean of a random sample of 36?
A: 2
Why: $\frac{12}{\sqrt{36}} = \frac{12}{6} = 2$.
```

### Sampling Distribution of a Difference of Proportions {#difference-of-proportions}
kind: formula
prereqs: sampling-distribution-proportion, combining-random-variables

For independent random samples of sizes $n_1$ and $n_2$ from populations with proportions $p_1$ and $p_2$, the difference of the sample proportions $\hat{p}_1 - \hat{p}_2$ has
$$\begin{aligned} \mu_{\hat{p}_1 - \hat{p}_2} &= p_1 - p_2, \\ \sigma_{\hat{p}_1 - \hat{p}_2} &= \sqrt{\frac{p_1(1 - p_1)}{n_1} + \frac{p_2(1 - p_2)}{n_2}}. \end{aligned}$$
It is approximately normal when $n_1p_1$, $n_1(1 - p_1)$, $n_2p_2$ and $n_2(1 - p_2)$ are all at least 10.

The two samples must be independent of each other, and each less than 10% of its population.

*Why.* For independent variables, the variance of a difference is the sum of the variances:
$$\sigma^2_{\hat{p}_1 - \hat{p}_2} = \sigma^2_{\hat{p}_1} + \sigma^2_{\hat{p}_2} = \frac{p_1(1 - p_1)}{n_1} + \frac{p_2(1 - p_2)}{n_2}.$$

> **!** The variances add although the proportions are subtracted, and it is the variances that add, not the standard deviations.

**Example.** With $p_1 = 0.5$ in samples of $n_1 = 100$ and $p_2 = 0.4$ in samples of $n_2 = 150$, the difference has mean $0.1$ and standard deviation
$$\sqrt{\frac{0.5 \cdot 0.5}{100} + \frac{0.4 \cdot 0.6}{150}} = \sqrt{0.0025 + 0.0016} \approx 0.064.$$

```quiz
Q: Two populations both have $p = 0.5$, and a random sample of 50 is taken from each. What is the standard deviation of $\hat{p}_1 - \hat{p}_2$?
A: 0.1
Why: $\sqrt{\frac{0.25}{50} + \frac{0.25}{50}} = \sqrt{0.01} = 0.1$.
```

### Sampling Distribution of a Difference of Means {#difference-of-means}
kind: formula
prereqs: sampling-distribution-mean, combining-random-variables

For independent random samples of sizes $n_1$ and $n_2$ from populations with means $\mu_1$ and $\mu_2$ and standard deviations $\sigma_1$ and $\sigma_2$, the difference of the sample means $\bar{x}_1 - \bar{x}_2$ has
$$\begin{aligned} \mu_{\bar{x}_1 - \bar{x}_2} &= \mu_1 - \mu_2, \\ \sigma_{\bar{x}_1 - \bar{x}_2} &= \sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}. \end{aligned}$$
It is exactly normal when both populations are normal, and approximately normal when $n_1 \ge 30$ and $n_2 \ge 30$.

The two samples must be independent of each other, and each less than 10% of its population. Two measurements on the same individuals are not independent samples: see [[paired-differences]].

*Why.* For independent variables, the variance of a difference is the sum of the variances:
$$\sigma^2_{\bar{x}_1 - \bar{x}_2} = \sigma^2_{\bar{x}_1} + \sigma^2_{\bar{x}_2} = \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}.$$

> **!** Square the standard deviations before dividing by the sample sizes: $\frac{\sigma_1^2}{n_1}$, not $\frac{\sigma_1}{n_1}$.

**Example.** With $\sigma_1 = 3$ and $n_1 = 36$, and $\sigma_2 = 2.5$ and $n_2 = 25$,
$$\sigma_{\bar{x}_1 - \bar{x}_2} = \sqrt{\frac{9}{36} + \frac{6.25}{25}} = \sqrt{0.5} \approx 0.71.$$

```quiz
Q: One population has $\sigma_1 = 6$ and a sample of 9 is taken from it; another has $\sigma_2 = 8$ and a sample of 16 is taken from it. What is the standard deviation of $\bar{x}_1 - \bar{x}_2$?
A: 2.83
Why: $\sqrt{\frac{36}{9} + \frac{64}{16}} = \sqrt{8} \approx 2.83$.
```

### Sampling Distribution of a Mean Difference {#paired-differences}
kind: formula
prereqs: sampling-distribution-mean

When the data come in pairs, as two measurements on each individual or on the two members of a matched pair, each pair gives one difference $d$. For a random sample of $n$ pairs, from a population of differences with mean $\mu_d$ and standard deviation $\sigma_d$, the mean difference $\bar{d}$ has
$$\begin{aligned} \mu_{\bar{d}} &= \mu_d, \\ \sigma_{\bar{d}} &= \frac{\sigma_d}{\sqrt{n}}. \end{aligned}$$
It is exactly normal when the differences are normal, and approximately normal for $n \ge 30$.

This is the [[sampling-distribution-mean]] applied to the single list of differences.

> **!** Paired data are not two independent samples, so the formula for a [[difference-of-means]] does not apply to them. The two measurements on one individual are usually correlated, and when they are positively correlated $\sigma_d$ is smaller than $\sqrt{\sigma_1^2 + \sigma_2^2}$, which is why pairing gives a narrower distribution.

**Example.** Each of 16 students takes a test before and after a course. If the gains have standard deviation $\sigma_d = 4$ points, the mean gain has standard deviation
$$\frac{4}{\sqrt{16}} = 1.$$

```quiz
Q: For 25 matched pairs, the differences have $\sigma_d = 10$. What is the standard deviation of $\bar{d}$?
A: 2
Why: $\frac{10}{\sqrt{25}} = 2$.

Q: Weights of the same 20 people before and after a diet. Which formula gives the spread of the mean change?
- $\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}$
+ $\frac{\sigma_d}{\sqrt{n}}$
- $\sqrt{\frac{p(1 - p)}{n}}$
Hint: Are the two lists of weights independent samples?
Why: Each person gives a pair of measurements, so work with the 20 differences.
```

### Pooled Proportion {#pooled-proportion}
kind: formula
prereqs: difference-of-proportions, standard-error

To test the hypothesis that $p_1 = p_2$, both samples are taken to estimate the same proportion, and are combined into one estimate. With $X_1$ successes in $n_1$ and $X_2$ in $n_2$,
$$\hat{p}_c = \frac{X_1 + X_2}{n_1 + n_2},$$
and the standard error of $\hat{p}_1 - \hat{p}_2$ is
$$SE = \sqrt{\hat{p}_c(1 - \hat{p}_c)\left(\frac{1}{n_1} + \frac{1}{n_2}\right)}.$$

This is the standard deviation of a [[difference-of-proportions]] with $p_1 = p_2 = p$, and $\hat{p}_c$ for $p$. A confidence interval for $p_1 - p_2$ does not assume the two are equal, and uses the unpooled standard error, with $\hat{p}_1$ and $\hat{p}_2$.

**Example.** With 40 successes out of 100 and 45 out of 150,
$$\hat{p}_c = \frac{85}{250} = 0.34,$$
and
$$SE = \sqrt{0.34 \cdot 0.66\left(\frac{1}{100} + \frac{1}{150}\right)} \approx 0.061.$$

```quiz
Q: A sample of 60 has 18 successes and a sample of 40 has 12. What is the pooled proportion?
A: 0.3
Why: $\frac{18 + 12}{60 + 40} = 0.3$.
```

### Sampling Distribution of a Regression Slope {#slope-sampling-distribution}
kind: formula
prereqs: least-squares, residuals, sampling-distributions, sample-standard-deviation

Suppose that at each $x$ the responses $y$ are normal about a true line $\mu_y = \alpha + \beta x$, independently and with the same standard deviation $\sigma$. Then the slope $b$ of the [[least-squares]] line through $n$ points has
$$\begin{aligned} \mu_b &= \beta, \\ \sigma_b &= \frac{\sigma}{\sigma_x\sqrt{n}}, \end{aligned}$$
where $\sigma_x$ is the standard deviation of the $x$ values, dividing by $n$. Its standard error is
$$SE_b = \frac{s}{s_x\sqrt{n - 1}}, \qquad\text{where}\qquad s = \sqrt{\frac{\sum (y_i - \hat{y}_i)^2}{n - 2}}$$
is the standard deviation of the residuals, and $s_x$ is the [[sample-standard-deviation]] of the $x$ values.

Both are the same quantity, $\sigma$ divided by $\sqrt{\sum (x_i - \bar{x})^2}$, since
$$\sum (x_i - \bar{x})^2 = n\sigma_x^2 = (n - 1)s_x^2.$$
Points spread more widely in $x$ pin the slope down better. The residuals have $n - 2$ degrees of freedom, as two numbers, $a$ and $b$, were estimated from the data.

**Example.** For 27 points with residuals of standard deviation $s = 4$ and $x$ values with $s_x = 2$,
$$SE_b = \frac{4}{2\sqrt{26}} \approx 0.39.$$

### t Distribution {#t-distribution}
kind: definition
prereqs: standard-error, sampling-distribution-mean, normal-distribution

For a random sample of size $n$ from a normal population with mean $\mu$, the statistic
$$t = \frac{\bar{x} - \mu}{s / \sqrt{n}}$$
has the $t$ distribution with $n - 1$ degrees of freedom. Each $t$ distribution is symmetric about $0$ and bell-shaped, with heavier tails than the standard normal, and it approaches the standard normal as the degrees of freedom grow. With $k$ degrees of freedom it has mean $0$ for $k > 1$ and variance $\frac{k}{k - 2}$ for $k > 2$.

The tails are heavier because $s$ varies from sample to sample as well as $\bar{x}$, and a small $s$ makes $t$ large. Where the [[standard-error]] stands in for a standard deviation, $t$ stands in for $z$:

: Degrees of Freedom
| Statistic | Degrees of freedom |
| --- | --- |
| mean $\bar{x}$ | $n - 1$ |
| mean difference $\bar{d}$, paired | $n - 1$, for $n$ pairs |
| difference of means $\bar{x}_1 - \bar{x}_2$ | the smaller of $n_1 - 1$ and $n_2 - 1$, or the formula below |
| slope $b$ | $n - 2$ |

For a difference of means, technology uses Welch's formula, which gives more degrees of freedom than the cautious rule:
$$\text{df} = \frac{\left(\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}\right)^2}{\dfrac{1}{n_1 - 1}\left(\dfrac{s_1^2}{n_1}\right)^2 + \dfrac{1}{n_2 - 1}\left(\dfrac{s_2^2}{n_2}\right)^2}.$$

: Critical Values $t^*$ by Confidence
| df | 90% | 95% | 99% |
| ---: | ---: | ---: | ---: |
| 1 | 6.314 | 12.706 | 63.657 |
| 2 | 2.920 | 4.303 | 9.925 |
| 3 | 2.353 | 3.182 | 5.841 |
| 4 | 2.132 | 2.776 | 4.604 |
| 5 | 2.015 | 2.571 | 4.032 |
| 10 | 1.812 | 2.228 | 3.169 |
| 15 | 1.753 | 2.131 | 2.947 |
| 20 | 1.725 | 2.086 | 2.845 |
| 30 | 1.697 | 2.042 | 2.750 |
| 60 | 1.671 | 2.000 | 2.660 |
| 120 | 1.658 | 1.980 | 2.617 |
| $\infty$ | 1.645 | 1.960 | 2.576 |

The procedures are robust: they need the population only roughly normal for $n$ around 15 to 30, if there are no outliers or strong skew, and not normal at all for $n \ge 30$.

**Example.** A sample of 16 has $\bar{x} = 52$ and $s = 8$. With 15 degrees of freedom, $t^* = 2.131$ at 95%, and the interval is
$$52 \pm 2.131 \cdot \frac{8}{\sqrt{16}} = 52 \pm 4.26.$$

```quiz
Q: How many degrees of freedom does a $t$ interval for the mean of a sample of 20 use?
A: 19
Why: $n - 1 = 19$.

Q: As the degrees of freedom grow, the critical value $t^*$ at 95%
+ shrinks toward 1.96
- grows without limit
- stays the same
- shrinks toward 0
Why: The $t$ distribution approaches the standard normal, whose 95% critical value is 1.96.
```

### Chi-Square Distribution {#chi-square-distribution}
kind: definition
prereqs: normal-distribution, random-variables

The sum of the squares of $k$ independent standard normal variables,
$$\chi^2 = Z_1^2 + Z_2^2 + \cdots + Z_k^2,$$
has the chi-square distribution with $k$ degrees of freedom. It takes only values $\ge 0$, is skewed to the right, and has
$$\begin{aligned} \mu &= k, \\ \sigma &= \sqrt{2k}. \end{aligned}$$

As $k$ grows the curve moves right, spreads out and becomes more symmetric. Its peak is at $k - 2$ for $k \ge 2$.

: Critical Values $\chi^{2*}$ by Area to the Right
| df | $0.10$ | $0.05$ | $0.01$ |
| ---: | ---: | ---: | ---: |
| 1 | 2.706 | 3.841 | 6.635 |
| 2 | 4.605 | 5.991 | 9.210 |
| 3 | 6.251 | 7.815 | 11.345 |
| 4 | 7.779 | 9.488 | 13.277 |
| 5 | 9.236 | 11.070 | 15.086 |
| 6 | 10.645 | 12.592 | 16.812 |
| 8 | 13.362 | 15.507 | 20.090 |
| 10 | 15.987 | 18.307 | 23.209 |

```quiz
Q: What is the mean of a chi-square distribution with 8 degrees of freedom?
A: 8

Q: What is its standard deviation?
A: 4
Why: $\sqrt{2 \cdot 8} = 4$.
```

### Chi-Square Statistic {#chi-square-statistic}
kind: formula
prereqs: chi-square-distribution, two-way-tables

For counts observed in categories, compared with the counts expected under a hypothesis,
$$\chi^2 = \sum \frac{(O - E)^2}{E},$$
summed over every category or cell. When the hypothesis holds, it is approximately chi-square, with:
- for **goodness of fit**, $k$ categories with hypothesised proportions $p_i$ in a sample of $n$: $E = np_i$ and $\text{df} = k - 1$;
- for **independence** or **homogeneity**, a two-way table of $r$ rows and $c$ columns: $E = \dfrac{\text{row total} \cdot \text{column total}}{\text{grand total}}$ and $\text{df} = (r - 1)(c - 1)$.

It needs random samples, each less than 10% of its population, and every expected count at least 5. A large $\chi^2$, far out in the right tail, is evidence against the hypothesis.

Use counts, never percentages: the same proportions in a larger sample give a larger $\chi^2$. Independence asks whether two variables of one sample are related; homogeneity asks whether several samples share one distribution. The arithmetic is the same.

**Example.** A die rolled 60 times gives $8, 9, 12, 11, 6, 14$. If it is fair, each face has $E = 10$, and
$$\chi^2 = \frac{4 + 1 + 4 + 1 + 16 + 16}{10} = 4.2,$$
with 5 degrees of freedom. That is below the 5% critical value of 11.07, so the counts give no evidence that the die is unfair.

```quiz
Q: In a two-way table, a row totals 40, a column 30, and the whole table 120. What is the expected count in their cell?
A: 10
Why: $\frac{40 \cdot 30}{120} = 10$.

Q: How many degrees of freedom does a test of independence on a table of 3 rows and 4 columns have?
A: 6
Why: $(3 - 1)(4 - 1) = 6$.
```

### Table of Sampling Distributions {#sampling-distribution-table}
kind: formula
prereqs: difference-of-proportions, difference-of-means, paired-differences, pooled-proportion, slope-sampling-distribution, t-distribution, chi-square-statistic

The mean, standard deviation and standard error of each statistic of a first course, with $q = 1 - p$ and $\hat{q} = 1 - \hat{p}$. Each holds for random samples, each less than 10% of its population, and for two samples independent of each other. The standard error is the standard deviation with each parameter replaced by its estimate.

: One Sample
| Statistic | Mean | Standard deviation | Standard error |
| --- | --- | --- | --- |
| count $X$ | $np$ | $\sqrt{npq}$ | $\sqrt{n\hat{p}\hat{q}}$ |
| proportion $\hat{p}$ | $p$ | $\sqrt{\dfrac{pq}{n}}$ | $\sqrt{\dfrac{\hat{p}\hat{q}}{n}}$ |
| mean $\bar{x}$ | $\mu$ | $\dfrac{\sigma}{\sqrt{n}}$ | $\dfrac{s}{\sqrt{n}}$ |
| mean difference $\bar{d}$, paired | $\mu_d$ | $\dfrac{\sigma_d}{\sqrt{n}}$ | $\dfrac{s_d}{\sqrt{n}}$ |

: Two Independent Samples
| Statistic | Mean | Standard deviation | Standard error |
| --- | --- | --- | --- |
| $\hat{p}_1 - \hat{p}_2$ | $p_1 - p_2$ | $\sqrt{\dfrac{p_1q_1}{n_1} + \dfrac{p_2q_2}{n_2}}$ | $\sqrt{\dfrac{\hat{p}_1\hat{q}_1}{n_1} + \dfrac{\hat{p}_2\hat{q}_2}{n_2}}$ |
| $\hat{p}_1 - \hat{p}_2$, if $p_1 = p_2 = p$ | $0$ | $\sqrt{pq\left(\dfrac{1}{n_1} + \dfrac{1}{n_2}\right)}$ | $\sqrt{\hat{p}_c\hat{q}_c\left(\dfrac{1}{n_1} + \dfrac{1}{n_2}\right)}$ |
| $\bar{x}_1 - \bar{x}_2$ | $\mu_1 - \mu_2$ | $\sqrt{\dfrac{\sigma_1^2}{n_1} + \dfrac{\sigma_2^2}{n_2}}$ | $\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}$ |

: Regression
| Statistic | Mean | Standard deviation | Standard error |
| --- | --- | --- | --- |
| slope $b$ | $\beta$ | $\dfrac{\sigma}{\sigma_x\sqrt{n}}$ | $\dfrac{s}{s_x\sqrt{n - 1}}$ |

: Estimates
| Of | Estimate |
| --- | --- |
| $\sigma$, from a sample | $s = \sqrt{\dfrac{\sum (x_i - \bar{x})^2}{n - 1}}$ |
| $p$, when $p_1 = p_2$ | $\hat{p}_c = \dfrac{X_1 + X_2}{n_1 + n_2}$ |
| $\sigma$ about a regression line | $s = \sqrt{\dfrac{\sum (y_i - \hat{y}_i)^2}{n - 2}}$ |

: Approximately Normal When
| Statistic | Condition |
| --- | --- |
| $X$, $\hat{p}$ | $np \ge 10$ and $nq \ge 10$ |
| $\bar{x}$ | the population is normal, or $n \ge 30$ |
| $\bar{d}$ | the differences are normal, or $n \ge 30$ |
| $\hat{p}_1 - \hat{p}_2$ | $n_1p_1$, $n_1q_1$, $n_2p_2$, $n_2q_2$ all $\ge 10$ |
| $\bar{x}_1 - \bar{x}_2$ | both populations are normal, or $n_1 \ge 30$ and $n_2 \ge 30$ |
| $b$ | the residuals are normal, with the same spread at every $x$ |

: Using Them
| | |
| --- | --- |
| standardised statistic | $\dfrac{\text{statistic} - \text{parameter}}{\text{standard deviation of statistic}}$ |
| confidence interval | $\text{statistic} \pm z^* \cdot SE$ |
| critical value $z^*$ at 90%, 95%, 99% | $1.645$, $1.960$, $2.576$ |

With a standard error in place of a standard deviation, a mean, a mean difference, a difference of means or a slope is standardised on a [[t-distribution]] rather than the normal, and takes a critical value $t^*$ in place of $z^*$.

: The t Statistic
| Statistic | $t$ | Degrees of freedom |
| --- | --- | --- |
| $\bar{x}$ | $\dfrac{\bar{x} - \mu}{s / \sqrt{n}}$ | $n - 1$ |
| $\bar{d}$ | $\dfrac{\bar{d} - \mu_d}{s_d / \sqrt{n}}$ | $n - 1$ |
| $\bar{x}_1 - \bar{x}_2$ | $\dfrac{(\bar{x}_1 - \bar{x}_2) - (\mu_1 - \mu_2)}{\sqrt{s_1^2 / n_1 + s_2^2 / n_2}}$ | smaller of $n_1 - 1$, $n_2 - 1$ |
| $b$ | $\dfrac{b - \beta}{SE_b}$ | $n - 2$ |

: Critical Values $t^*$
| df | 90% | 95% | 99% |
| ---: | ---: | ---: | ---: |
| 1 | 6.314 | 12.706 | 63.657 |
| 2 | 2.920 | 4.303 | 9.925 |
| 3 | 2.353 | 3.182 | 5.841 |
| 4 | 2.132 | 2.776 | 4.604 |
| 5 | 2.015 | 2.571 | 4.032 |
| 10 | 1.812 | 2.228 | 3.169 |
| 15 | 1.753 | 2.131 | 2.947 |
| 20 | 1.725 | 2.086 | 2.845 |
| 30 | 1.697 | 2.042 | 2.750 |
| 60 | 1.671 | 2.000 | 2.660 |
| 120 | 1.658 | 1.980 | 2.617 |
| $\infty$ | 1.645 | 1.960 | 2.576 |

: The Chi-Square Statistic
| | Goodness of fit | Independence or homogeneity |
| --- | --- | --- |
| statistic | $\chi^2 = \sum \dfrac{(O - E)^2}{E}$ | $\chi^2 = \sum \dfrac{(O - E)^2}{E}$ |
| expected count $E$ | $np_i$ | $\dfrac{\text{row total} \cdot \text{column total}}{\text{grand total}}$ |
| degrees of freedom | $k - 1$ | $(r - 1)(c - 1)$ |
| condition | every $E \ge 5$ | every $E \ge 5$ |
| distribution's mean, sd | $\text{df}$, $\sqrt{2\,\text{df}}$ | $\text{df}$, $\sqrt{2\,\text{df}}$ |

: Critical Values $\chi^{2*}$ by Area to the Right
| df | $0.10$ | $0.05$ | $0.01$ |
| ---: | ---: | ---: | ---: |
| 1 | 2.706 | 3.841 | 6.635 |
| 2 | 4.605 | 5.991 | 9.210 |
| 3 | 6.251 | 7.815 | 11.345 |
| 4 | 7.779 | 9.488 | 13.277 |
| 5 | 9.236 | 11.070 | 15.086 |
| 6 | 10.645 | 12.592 | 16.812 |
| 8 | 13.362 | 15.507 | 20.090 |
| 10 | 15.987 | 18.307 | 23.209 |

### Quick Margin of Error {#quick-margin}
kind: heuristic
prereqs: sampling-distributions

For a poll of $n$ people, the 95% margin of error on a proportion is about
$$\frac{1}{\sqrt{n}}.$$

It is largest at 50%, where the exact figure is $\frac{0.98}{\sqrt{n}}$, so this is slightly cautious anywhere else. A poll of 1000 has a margin of about 3%. To halve the margin, quadruple the sample.

```quiz
Q: About what percent is the margin of error for a poll of 2500?
A: 2
Why: $\frac{1}{\sqrt{2500}} = \frac{1}{50}$.
```

### Margin of Error Formula {#margin-of-error}
kind: formula
prereqs: standard-error, clt

At 95% confidence, a sample proportion $\hat{p}$ and a sample mean $\bar{x}$ have margins of error
$$E = 1.96\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}, \qquad E = 1.96\frac{s}{\sqrt{n}}.$$

### Confidence Interval Form {#confidence-intervals}
kind: form
prereqs: margin-of-error

$$\text{statistic} \pm \text{margin of error}.$$

| Reads off | From |
| --- | --- |
| best estimate | the middle |
| precision | the half-width |
| confidence | how often the method captures the parameter |

### Evaluating a Statistical Claim {#evaluating-claims}
kind: skill
prereqs: bias, study-types

Ask how the data were collected, who was left out, how large the sample is, and whether the claim of cause matches the design.

### Estimating with a Margin of Error {#estimating-margin}
kind: skill
prereqs: margin-of-error

1. compute the statistic from the sample;
2. compute the margin of error;
3. form statistic $\pm$ margin;
4. report the interval in context.

```quiz
Q: A poll of 400 finds 50% in favour. To the nearest percent, what is the 95% margin of error?
A: 5
Why: $1.96\sqrt{\frac{0.25}{400}} \approx 0.049$.
```

### Testing a Difference by Simulation {#randomization-test}
kind: skill
prereqs: randomized-experiments, simulation

1. compute the difference between the two groups;
2. shuffle the group labels at random, and compute the difference again;
3. repeat many times;
4. find how often chance alone gives a difference at least as large;
5. call the difference significant if that is rare.

