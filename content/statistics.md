# Probability & Statistics {#statistics}
color: #74416f

Reasoning about data, and about chance.

## Describing Data
flow: down
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
flow: down
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
flow: down
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
flow: down
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
$$\mu = np, \quad \sigma^2 = np(1 - p).$$

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

### Binomial Distribution
kind: definition
prereqs: combinations, independent-events, random-variables

The number of successes in $n$ independent tries, each succeeding with probability $p$:
$$P(k) = \binom{n}{k} p^k (1 - p)^{n - k}.$$

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
flow: down
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
prereqs: sampling-distributions, clt

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

