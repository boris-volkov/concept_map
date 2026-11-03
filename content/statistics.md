# Probability & Statistics {#statistics}
color: #74416f

Reasoning about data, and about chance.

## Describing Data

Summing up a pile of numbers in a picture or a few well-chosen values.

### Data & Variables {#data-types}
kind: definition
prereqs: counting

A variable is something measured for each case. It is
- categorical when it sorts cases into groups, like eye colour;
- quantitative when it is a number, like height.

### Displaying Data {#data-displays}
prereqs: data-types, number-line

Pictures of data:
- bar charts, for categories;
- dot plots and histograms, for numbers, showing where the values bunch up and spread out.

### Mean, Median & Mode {#measures-of-center}
prereqs: data-displays, division, decimal-arithmetic

Three meanings of "typical":
- the mean shares the total out equally;
- the median is the middle value in order;
- the mode is the most common.

One huge value drags the mean but barely moves the median.

### Quartiles & Range {#quartiles}
prereqs: measures-of-center

The quartiles split ordered data into four equal parts. Two measures of spread:
- the range, the largest value minus the smallest;
- the interquartile range, $Q_3 - Q_1$, the spread of the middle half.

### Box Plots
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
prereqs: measures-of-center, square-roots

The typical distance of the values from their mean, in three steps:
1. square the deviations from the mean;
2. average them;
3. take the square root.

$$\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (x_i - \bar{x})^2}$$

### Shape of a Distribution {#distribution-shape}
prereqs: data-displays, measures-of-center

A distribution may be
- symmetric, or skewed left or right;
- single-peaked, or bimodal.

Skew pulls the mean toward the long tail, away from the median.

### Scatter Plots & Correlation {#scatter-plots}
prereqs: coordinate-plane, data-types

Plotting two variables against each other to see whether they move together. Correlation measures how tightly the points hug a line; it doesn't show that one causes the other.

### Line of Best Fit
prereqs: scatter-plots, slope-intercept

The line that comes closest to the points in a scatter plot, used to summarise a trend and make predictions within the range of the data.

## Counting Methods

Counting the possibilities without listing them all.

### The Counting Principle {#counting-principle}
kind: theorem
prereqs: multiplication

If one choice can be made in $m$ ways and a second in $n$ ways, the pair can be made in $m \times n$ ways.

For example, 3 shirts and 4 trousers make
$$3 \times 4 = 12$$
outfits.

### Factorials
kind: definition
prereqs: counting-principle

The number of ways to put $n$ things in order:
$$n! = n \times (n - 1) \times \cdots \times 1.$$
For example,
$$4! = 4 \times 3 \times 2 \times 1 = 24,$$
and, by convention, $0! = 1$.

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

### Pascal's Triangle
prereqs: combinations, addition

Each entry is the sum of the two above it,
$$\binom{n}{k} = \binom{n - 1}{k - 1} + \binom{n - 1}{k},$$
and row $n$ lists $\binom{n}{0}, \binom{n}{1}, \ldots, \binom{n}{n}$.

## Axioms {#probability-axioms}

The axioms of probability, from which every rule of chance is derived.

### Kolmogorov Axioms {#kolmogorov-axioms}
kind: axiom

A probability $P$ on a sample space $\Omega$ satisfies:
1. $P(A) \ge 0$ for every event $A$;
2. $P(\Omega) = 1$;
3. if $A_1, A_2, \ldots$ are pairwise disjoint, then $P\left(\bigcup_i A_i\right) = \sum_i P(A_i)$.

Every rule of probability, such as
$$P(A^c) = 1 - P(A),$$
is derived from these three.

## Probability

Measuring how likely things are, on a scale from 0 to 1.

### Probability of an Event {#probability-basics}
kind: definition
prereqs: fraction-concept, percents

With equally likely outcomes, the probability of an event is
$$P(A) = \frac{\text{favourable outcomes}}{\text{total outcomes}}.$$
Rolling an even number has probability
$$P(\text{even}) = \frac{3}{6} = \frac{1}{2}.$$

### Sample Spaces
kind: definition
prereqs: probability-basics, counting-principle

The list of every possible outcome, often drawn as a table or a tree: two coins give HH, HT, TH and TT.

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
kind: theorem
prereqs: sample-spaces, multiplying-fractions

Events that don't affect each other multiply:
$$P(A \text{ and } B) = P(A)\,P(B).$$

Two heads in a row:
$$\frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}.$$

### Conditional Probability
kind: definition
prereqs: independent-events, dividing-fractions

The probability of $A$ given that $B$ happened:
$$P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)}.$$
Knowing $B$ shrinks the sample space to $B$.

### Bayes' Theorem
kind: theorem
prereqs: conditional-probability

Turning $P(B \mid A)$ around:
$$P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}.$$

It is why a positive result on an accurate test for a rare disease can still most likely be a false alarm.

### Probability by Counting {#counting-probability}
prereqs: combinations, probability-basics

Counting favourable and total outcomes with combinations. The chance of a particular 5-card hand is
$$\frac{1}{\binom{52}{5}},$$
about 1 in 2.6 million.

## Distributions

Random quantities, and the shapes their values take.

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
prereqs: combinations, independent-events, random-variables

The number of successes in $n$ independent tries, each succeeding with probability $p$:
$$P(k) = \binom{n}{k} p^k (1 - p)^{n - k}.$$

### z-Scores {#z-scores}
kind: formula
prereqs: standard-deviation

How many standard deviations a value sits from the mean:
$$z = \frac{x - \mu}{\sigma}.$$
It puts different scales on a common footing.

### Normal Distribution
prereqs: standard-deviation, distribution-shape, random-variables

The bell curve, set by its mean and standard deviation. Heights, measurement errors and averages of many small effects all come out roughly normal.

### The 68–95–99.7 Rule {#empirical-rule}
kind: theorem
prereqs: normal-distribution, z-scores

In a normal distribution, about
- 68% of values lie within one standard deviation of the mean;
- 95% within two;
- 99.7% within three.
