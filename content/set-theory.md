# Set Theory
color: #5a4a8c
built-on: logic

Collections, and the axioms from which, in principle, every object of mathematics can be built.

## Axioms {#set-theory-axioms}
prereqs: quantifiers
wrap: 4

The Zermelo–Fraenkel axioms with the axiom of choice, ZFC: the usual foundation of mathematics.

Two notions are taken without definition: *set*, and *membership*, $x \in A$, "$x$ is an element of $A$". In ZFC everything is a set, so the elements of sets are sets too. The axioms are statements of [[quantifiers|first-order logic]] about $\in$, and they use a few abbreviations, each defined from $\in$:
- $x \subseteq A$ for $\forall y\, (y \in x \to y \in A)$;
- $\varnothing$ for a set with no elements, and $x \cap A = \varnothing$ for "$x$ and $A$ have no element in common";
- $\{a, b\}$ for the set whose elements are $a$ and $b$, $\{a\}$ for $\{a, a\}$, and $x \cup \{x\}$ for the set whose elements are the elements of $x$ and $x$ itself.

Separation and Replacement are schemas: one axiom for each formula $\varphi$. The first eight axioms make ZF, named after Zermelo, who proposed axioms for sets in 1908, and Fraenkel, who added Replacement in 1922. With Choice, which ZF can neither prove nor refute, they make ZFC.

### Axiom of Extensionality
kind: axiom

Sets with the same elements are equal:
$$\forall A\, \forall B\, \big(\forall x\, (x \in A \leftrightarrow x \in B) \to A = B\big).$$

A set is nothing more than its elements: $\{1, 2\} = \{2, 1\} = \{1, 1, 2\}$, since order and repetition don't change which elements there are.

### Axiom of Pairing
kind: axiom

For any $a$ and $b$ there is a set whose elements are exactly $a$ and $b$:
$$\forall a\, \forall b\, \exists C\, \forall x\, \big(x \in C \leftrightarrow (x = a \lor x = b)\big).$$

By [[axiom-of-extensionality|extensionality]] there is only one such set, written $\{a, b\}$. With $b = a$ it is the singleton $\{a\}$.

### Axiom of Union
kind: axiom

For every set $F$ there is a set whose elements are exactly the elements of the elements of $F$:
$$\forall F\, \exists U\, \forall x\, \big(x \in U \leftrightarrow \exists A\, (A \in F \land x \in A)\big).$$

It is written $\bigcup F$. For two sets, $A \cup B = \bigcup \{A, B\}$, their [[set-union|union]].

### Axiom of Power Set
kind: axiom

For every set $A$ there is a set whose elements are exactly the subsets of $A$:
$$\forall A\, \exists P\, \forall x\, (x \in P \leftrightarrow x \subseteq A).$$

It is written $\mathcal{P}(A)$, the [[power-set|power set]] of $A$.

### Axiom of Separation
kind: axiom

For every formula $\varphi(x)$ in which $B$ does not occur free, the elements of a set $A$ that satisfy $\varphi$ form a set:
$$\forall A\, \exists B\, \forall x\, \big(x \in B \leftrightarrow (x \in A \land \varphi(x))\big).$$

Also called Specification. The set is written $\{x \in A : \varphi(x)\}$, in [[set-builder-notation|set-builder notation]]. It only cuts a set out of one that is already there: collecting everything that satisfies $\varphi$, with no $A$ to cut from, leads to [[russells-paradox|Russell's paradox]].

### Axiom of Replacement
kind: axiom

For every formula $\varphi(x, y)$: if each element $x$ of a set $A$ is related by $\varphi$ to exactly one $y$, then those $y$ form a set:
$$\forall A\, \Big(\forall x \in A\ \exists! y\ \varphi(x, y) \to \exists B\ \forall y\, \big(y \in B \leftrightarrow \exists x \in A\ \varphi(x, y)\big)\Big).$$

The image of a set under anything that works like a function is a set. Without it, ZFC could not prove that there is a set as large as
$$\{\mathbb{N}, \mathcal{P}(\mathbb{N}), \mathcal{P}(\mathcal{P}(\mathbb{N})), \ldots\}.$$

### Axiom of Infinity
kind: axiom

There is a set that contains $\varnothing$, and contains $x \cup \{x\}$ whenever it contains $x$:
$$\exists I\, \big(\varnothing \in I \land \forall x\, (x \in I \to x \cup \{x\} \in I)\big).$$

Such a set is called inductive. It contains $\varnothing$, $\{\varnothing\}$, $\{\varnothing, \{\varnothing\}\}$, …, which are the [[von-neumann-naturals|natural numbers]] $0, 1, 2, \ldots$; without this axiom, every set could be finite. Here $\varnothing \in I$ abbreviates "$I$ has an element with no elements", so this axiom also gives the [[empty-set|empty set]].

### Axiom of Regularity
kind: axiom

Every non-empty set has an element with which it has no element in common:
$$\forall A\, \big(A \ne \varnothing \to \exists x \in A\ (x \cap A = \varnothing)\big).$$

Also called Foundation. It rules out a set that is an element of itself: if $A \in A$, the set $\{A\}$ has only the element $A$, and $A \cap \{A\}$ contains $A$. In the same way it rules out loops $a \in b \in a$, and endless descents $\cdots \in x_2 \in x_1 \in x_0$.

### Axiom of Choice
kind: axiom

For every set $F$ of non-empty sets there is a function that chooses an element from each:
$$\forall F\, \Big(\varnothing \notin F \to \exists f\colon F \to \bigcup F\ \ \forall A \in F\ \big(f(A) \in A\big)\Big).$$

Such an $f$ is a choice function. Without the axiom, one can be shown to exist only when there is a rule to choose by. Russell's illustration: from infinitely many pairs of shoes a left shoe can be chosen from each, but choosing one sock from each of infinitely many pairs of socks takes the axiom.

Choice is independent of the other axioms: Gödel showed in 1938 that they cannot disprove it, and Cohen in 1963 that they cannot prove it. Zorn's lemma and the well-ordering theorem, that every set can be well ordered, are equivalent to it.

## Sets {#sets}

What a set is, how one is written down, and when one set lies inside another.

### Sets & Elements {#sets-and-elements}
kind: definition
prereqs: axiom-of-extensionality

A set is a collection of objects, its elements, and is determined by nothing but which elements it has. $x \in A$ means that $x$ is an element of $A$, and $x \notin A$ that it is not.

A finite set can be listed between braces, in roster notation:
$$A = \{2, 3, 5, 7\}.$$
By [[axiom-of-extensionality|extensionality]], order and repetition do not matter. The sets of numbers $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$ and $\mathbb{R}$ are described under [[number-systems|number systems]].

### Set-Builder Notation
kind: definition
prereqs: sets-and-elements, axiom-of-separation, predicates

$\{x \in A : P(x)\}$ is the set of the elements $x$ of $A$ for which $P(x)$ is true. It exists by the [[axiom-of-separation|axiom of separation]].

**Example.**
$$\{x \in \mathbb{Z} : x^2 < 5\} = \{-2, -1, 0, 1, 2\}.$$

A bar, $\{x \in A \mid P(x)\}$, means the same. Without a set $A$ to separate from, $\{x : P(x)\}$ need not be a set, as [[russells-paradox|Russell's paradox]] shows; it is safe when the context fixes $A$, as in [[interval-notation|interval notation]], $\{x : 2 \le x < 5\}$, where $x$ ranges over $\mathbb{R}$.

### The Empty Set {#empty-set}
kind: theorem
prereqs: axiom-of-infinity, sets-and-elements, uniqueness-proofs

There is exactly one set with no elements, the empty set $\varnothing$.

*Proof.* Existence: the set given by the [[axiom-of-infinity|axiom of infinity]] has an element with no elements. Uniqueness: if $E$ and $E'$ both have no elements, then $x \in E \leftrightarrow x \in E'$ for every $x$, both sides being false, so $E = E'$ by [[axiom-of-extensionality|extensionality]]. $\square$

$\varnothing$ and $\{\varnothing\}$ are different sets: the first has no elements, and the second has one.

### Subsets
kind: definition
prereqs: sets-and-elements, universal-quantifier, conditional-statements

$A$ is a subset of $B$, written $A \subseteq B$, when every element of $A$ is an element of $B$:
$$\forall x\, (x \in A \to x \in B).$$
It is a proper subset, $A \subsetneq B$, when also $A \ne B$.

For every set $A$, $A \subseteq A$, and $\varnothing \subseteq A$, vacuously, since $\varnothing$ has no elements to check. Some books write $A \subset B$ for a subset and others for a proper subset; $\subseteq$ and $\subsetneq$ are unambiguous.

Do not confuse $\subseteq$ with $\in$: $1 \in \{1, 2\}$, but $\{1\} \subseteq \{1, 2\}$.

### Equality of Sets {#set-equality}
kind: theorem
prereqs: subsets, iff-proofs

For all sets $A$ and $B$:
$$A = B \iff A \subseteq B \text{ and } B \subseteq A.$$

*Proof.* (⇒) Every set is a subset of itself. (⇐) If each is a subset of the other, then $x \in A \leftrightarrow x \in B$ for every $x$, so $A = B$ by [[axiom-of-extensionality|extensionality]]. $\square$

This is how equalities of sets are proved, by double inclusion: take an element of each side, and show that it belongs to the other.

### Russell's Paradox {#russells-paradox}
kind: theorem
prereqs: axiom-of-separation, proof-by-contradiction

There is no set of all sets.

*Proof.* Suppose that $V$ were a set with every set as an element. By [[axiom-of-separation|separation]],
$$R = \{x \in V : x \notin x\}$$
is a set, so $R \in V$, and then $R \in R$ exactly when $R \notin R$: a contradiction. $\square$

Russell found this in 1901 in Frege's theory of sets, which let any property define a set: the set of all sets that are not elements of themselves can neither be nor not be an element of itself. ZFC avoids it by building sets only from sets already there.

## Operations on Sets {#set-operations}
built-on: sets

Building new sets from old: union, intersection, difference and complement, power sets and products.

The laws of set algebra mirror the [[laws-of-logic|laws of logic]], with $\cup$ for $\lor$, $\cap$ for $\land$, and the complement for $\neg$. For subsets $A$, $B$ and $C$ of a universal set $U$:

| Law | Equality |
| --- | --- |
| Commutative | $A \cup B = B \cup A$; $A \cap B = B \cap A$ |
| Associative | $(A \cup B) \cup C = A \cup (B \cup C)$; $(A \cap B) \cap C = A \cap (B \cap C)$ |
| Distributive | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$; $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ |
| Identity | $A \cup \varnothing = A$; $A \cap U = A$ |
| Complement | $A \cup A^c = U$; $A \cap A^c = \varnothing$ |
| Double complement | $(A^c)^c = A$ |
| De Morgan's | $(A \cup B)^c = A^c \cap B^c$; $(A \cap B)^c = A^c \cup B^c$ |

### Union {#set-union}
kind: definition
prereqs: axiom-of-union, axiom-of-pairing, disjunction

The union of sets $A$ and $B$ is the set of the elements in $A$ or in $B$, or in both:
$$A \cup B = \{x : x \in A \lor x \in B\}.$$

It exists by the axioms of [[axiom-of-pairing|pairing]] and [[axiom-of-union|union]], as $\bigcup \{A, B\}$.

**Example.**
$$\{1, 2, 3\} \cup \{3, 4\} = \{1, 2, 3, 4\}.$$

The union $\bigcup_i A_i$ of a whole family of sets holds what is in at least one of them, as in the [[kolmogorov-axioms|axioms of probability]].

### Intersection {#set-intersection}
kind: definition
prereqs: axiom-of-separation, conjunction

The intersection of sets $A$ and $B$ is the set of the elements in both:
$$A \cap B = \{x \in A : x \in B\}.$$

It exists by the [[axiom-of-separation|axiom of separation]]. Sets with no element in common, $A \cap B = \varnothing$, are disjoint.

**Example.**
$$\{1, 2, 3\} \cap \{3, 4\} = \{3\}.$$

### Difference & Complement {#set-difference}
kind: definition
prereqs: axiom-of-separation, logical-negation

The difference of sets $A$ and $B$ is the set of the elements of $A$ not in $B$:
$$A \setminus B = \{x \in A : x \notin B\}.$$
Within a universal set $U$ that holds every set under discussion, the complement of $A$ is $A^c = U \setminus A$.

**Example.**
$$\{1, 2, 3\} \setminus \{3, 4\} = \{1, 2\}.$$

A complement depends on $U$: there is [[russells-paradox|no set of everything]], so $A^c$ always means the complement within some chosen $U$, such as the sample space in probability. It is also written $\overline{A}$ or $A'$.

### Venn Diagrams
kind: skill
prereqs: set-union, set-intersection, set-difference

A picture of sets as overlapping circles inside a rectangle, the universal set, in which each region stands for one combination of being in or out of each set.

Two sets make four regions, $A \cap B$, $A \setminus B$, $B \setminus A$ and $(A \cup B)^c$, and three sets make eight. Shading the regions for each side of an equation, such as [[set-de-morgan|De Morgan's laws]], shows whether it holds. Counting the elements in each region gives
$$|A \cup B| = |A| + |B| - |A \cap B|,$$
since the elements of $A \cap B$ are counted in both $|A|$ and $|B|$.

```quiz
Q: In a class, 12 students play football, 9 play chess, and 4 do both. How many do at least one?
A: 17
Hint: Adding 12 and 9 counts the 4 who do both twice.
Why: $|A \cup B| = 12 + 9 - 4 = 17$.
```

### De Morgan's Laws for Sets {#set-de-morgan}
kind: theorem
prereqs: set-difference, set-union, set-intersection, set-equality, de-morgans-laws

For all subsets $A$ and $B$ of a universal set $U$:
$$\begin{aligned} (A \cup B)^c &= A^c \cap B^c, \\ (A \cap B)^c &= A^c \cup B^c. \end{aligned}$$

*Proof.* For every $x \in U$:
$$\begin{aligned} x \in (A \cup B)^c &\iff \neg(x \in A \lor x \in B) && \text{union, complement} \\ &\iff x \notin A \land x \notin B && \text{De Morgan's laws} \\ &\iff x \in A^c \cap B^c, && \text{intersection, complement} \end{aligned}$$
so the two sets are equal by [[axiom-of-extensionality|extensionality]]. The second law has the same proof, with $\cap$ and $\cup$, and $\land$ and $\lor$, swapped. $\square$

```quiz
Q: $(A \cap B)^c$ is equal to:
- $A^c \cap B^c$
- $A^c \cup B$
- $(A \cup B)^c$
+ $A^c \cup B^c$
Hint: Not in both means missing from at least one.
Why: By De Morgan's law, $(A \cap B)^c = A^c \cup B^c$.
```

### Power Set
kind: definition
prereqs: axiom-of-power-set, subsets

The power set $\mathcal{P}(A)$ of a set $A$ is the set of all subsets of $A$:
$$\mathcal{P}(A) = \{X : X \subseteq A\}.$$

It exists by the [[axiom-of-power-set|axiom of power set]].

**Example.**
$$\mathcal{P}(\{1, 2\}) = \{\varnothing, \{1\}, \{2\}, \{1, 2\}\}.$$

A set with $n$ elements has $2^n$ subsets, since each element is either in a subset or not; so $\mathcal{P}(A)$ is also written $2^A$. No set is as large as its power set: [[cantors-theorem|Cantor's theorem]].

```quiz
Q: How many elements does $\mathcal{P}(\{a, b, c\})$ have?
A: 8
Hint: Each of $a$, $b$ and $c$ is either in a subset or not.
Why: $2^3 = 8$: $\varnothing$, three singletons, three pairs and $\{a, b, c\}$ itself.

Q: Which of these is an element of $\mathcal{P}(\{1, 2, 3\})$?
- $\{4\}$
- $1$
+ $\{1, 3\}$
- $\{\{1\}\}$
Why: The elements of $\mathcal{P}(A)$ are the subsets of $A$, and $\{1, 3\} \subseteq \{1, 2, 3\}$. $1$ is an element of $\{1, 2, 3\}$, not a subset of it.
```

### Ordered Pairs
kind: definition
prereqs: axiom-of-pairing, set-equality

The ordered pair of $a$ and $b$ is the set
$$(a, b) = \{\{a\}, \{a, b\}\}.$$

Kuratowski's definition, from 1921, which makes a pair out of sets alone. All that matters about it is one property:
$$(a, b) = (c, d) \iff a = c \text{ and } b = d.$$
Unlike the set $\{a, b\}$, a pair has an order: $(1, 2) \ne (2, 1)$.

*Proof* of (⇒). If $a = b$, the pair is $\{\{a\}\}$, so $\{c\} = \{c, d\} = \{a\}$, and $c = d = a$. If $a \ne b$, the pair has one element with one element, $\{a\}$, and one with two, $\{a, b\}$; so $(c, d)$ must too, with $\{c\} = \{a\}$ and $\{c, d\} = \{a, b\}$. So $c = a$, and then $d = b$. The converse is clear. $\square$

### Cartesian Product
kind: definition
prereqs: ordered-pairs, power-set, set-union

The Cartesian product of sets $A$ and $B$ is the set of all ordered pairs with first entry in $A$ and second entry in $B$:
$$A \times B = \{(a, b) : a \in A,\ b \in B\}.$$

It exists by [[axiom-of-separation|separation]], since every such pair is an element of $\mathcal{P}(\mathcal{P}(A \cup B))$.

**Example.**
$$\{1, 2\} \times \{x, y\} = \{(1, x), (1, y), (2, x), (2, y)\}.$$

If $A$ has $m$ elements and $B$ has $n$, then $A \times B$ has $mn$. The [[coordinate-plane|coordinate plane]] is $\mathbb{R} \times \mathbb{R} = \mathbb{R}^2$.

## Relations & Functions {#relations-and-functions}
built-on: set-operations

Relations and functions, defined as sets of ordered pairs.

### Relations
kind: definition
prereqs: cartesian-product

A relation from a set $A$ to a set $B$ is a subset $R \subseteq A \times B$, and $a\,R\,b$ means $(a, b) \in R$. A relation on $A$ is a relation from $A$ to $A$.

A relation $R$ on $A$ is
- reflexive if $a\,R\,a$ for every $a \in A$;
- symmetric if $a\,R\,b$ implies $b\,R\,a$;
- antisymmetric if $a\,R\,b$ and $b\,R\,a$ imply $a = b$;
- transitive if $a\,R\,b$ and $b\,R\,c$ imply $a\,R\,c$.

**Example.** $<$ on $\mathbb{R}$ is the set $\{(a, b) \in \mathbb{R}^2 : a < b\}$. It is transitive, and antisymmetric, vacuously, since $a < b$ and $b < a$ never both hold; it is neither reflexive nor symmetric.

### Equivalence Relations
kind: definition
prereqs: relations

An equivalence relation on a set $A$ is a relation on $A$ that is reflexive, symmetric and transitive.

It says when two things count as the same in some respect. Examples:
- equality, on any set;
- having the same remainder on division by $n$, on $\mathbb{Z}$;
- being [[equivalent-fractions|equivalent fractions]]: $(a, b) \sim (c, d)$ when $ad = bc$, on pairs of integers with $b, d \ne 0$.

### Equivalence Classes & Partitions {#partitions}
kind: theorem
prereqs: equivalence-relations, set-equality

The equivalence classes $[a] = \{x \in A : x \sim a\}$ of an equivalence relation $\sim$ on a set $A$ form a partition of $A$: each class is non-empty, every element of $A$ lies in one, and two classes are either equal or disjoint. Conversely, every partition of $A$ is the set of classes of exactly one equivalence relation.

*Proof.* Each $a$ lies in its own class, by reflexivity. If $[a]$ and $[b]$ share an element $c$, then $c \sim a$ and $c \sim b$, so $a \sim b$ by symmetry and transitivity; then every $x \sim a$ has $x \sim b$, so $[a] \subseteq [b]$, and in the same way $[b] \subseteq [a]$. Conversely, a partition gives the relation "$x$ and $y$ lie in the same part". $\square$

**Example.** Remainders on division by 3 split $\mathbb{Z}$ into three classes:
$$\begin{aligned} [0] &= \{\ldots, -3, 0, 3, 6, \ldots\}, \\ [1] &= \{\ldots, -2, 1, 4, 7, \ldots\}, \\ [2] &= \{\ldots, -1, 2, 5, 8, \ldots\}. \end{aligned}$$
A [[fraction-concept|fraction]] is such a class: $\frac{1}{2}$ is the class of $(1, 2)$, $(2, 4)$, $(3, 6)$, ….

### Partial Orders
kind: definition
prereqs: relations

A partial order on a set $A$ is a relation $\le$ on $A$ that is reflexive, antisymmetric and transitive. It is a total order if, besides, any two elements are comparable: $a \le b$ or $b \le a$.

Examples:
- $\le$ on $\mathbb{R}$, a total order;
- $\subseteq$ on $\mathcal{P}(A)$, a partial order that is not total: neither of $\{1\}$ and $\{2\}$ is a subset of the other;
- divisibility on the positive integers, also partial: neither of 2 and 3 divides the other.

### Functions as Sets {#functions-as-sets}
kind: definition
prereqs: relations, existential-quantifier

A function $f$ from $A$ to $B$, written $f\colon A \to B$, is a relation $f \subseteq A \times B$ that relates each element of $A$ to exactly one element of $B$:
$$\forall a \in A\ \exists! b \in B\ \big((a, b) \in f\big).$$
That $b$ is written $f(a)$.

$A$ is the domain of $f$ and $B$ its codomain. The range, or image, $\{f(a) : a \in A\}$, is the part of $B$ that is actually reached.

A function is its graph: $f(x) = x^2$ on $\mathbb{R}$ is the set $\{(x, x^2) : x \in \mathbb{R}\}$. The [[functions|functions of algebra]] are functions in this sense, with sets of numbers for domain and codomain.

### Injections, Surjections & Bijections {#bijections}
kind: definition
prereqs: functions-as-sets

A function $f\colon A \to B$ is
- injective, or one-to-one, if different inputs give different outputs: $f(a) = f(a')$ implies $a = a'$;
- surjective, or onto, if every element of $B$ is an output: $\forall b \in B\ \exists a \in A\ \big(f(a) = b\big)$;
- bijective if it is both: then each $b \in B$ is $f(a)$ for exactly one $a \in A$.

**Example.** On $\mathbb{R}$:
- $f(x) = 2x + 1$ is a bijection;
- $f(x) = x^2$ is neither injective, as $(-1)^2 = 1^2$, nor surjective, as $-1$ is no square;
- $f(x) = e^x$ is injective, but not surjective, as it is never negative.

### Inverses & Bijections {#inverse-iff-bijection}
kind: theorem
prereqs: bijections

A function $f\colon A \to B$ has an inverse, a function $g\colon B \to A$ with
$$g(f(a)) = a \text{ for all } a \in A \quad\text{and}\quad f(g(b)) = b \text{ for all } b \in B,$$
if and only if $f$ is a bijection.

*Proof.* (⇒) If $f(a) = f(a')$, then $a = g(f(a)) = g(f(a')) = a'$, so $f$ is injective; and every $b = f(g(b))$ is an output, so $f$ is surjective. (⇐) If $f$ is a bijection, let $g(b)$ be the one $a$ with $f(a) = b$. Then $f(g(b)) = b$, and $g(f(a)) = a$, because $a$ is the one input with output $f(a)$. $\square$

Algebra's [[inverse-functions|inverse functions]] are this, for a function made into a bijection by cutting down its domain and codomain: $\sqrt{x}$ undoes $x^2$ on $[0, \infty)$.

### Image & Preimage {#image-and-preimage}
kind: definition
prereqs: functions-as-sets, set-builder-notation

For a function $f\colon A \to B$, the image of a set $X \subseteq A$ and the preimage of a set $Y \subseteq B$ are
$$\begin{aligned} f[X] &= \{f(x) : x \in X\}, \\ f^{-1}[Y] &= \{a \in A : f(a) \in Y\}. \end{aligned}$$

The preimage makes sense for every function, whether or not it has an inverse.

**Example.** For $f(x) = x^2$ on $\mathbb{R}$:
$$f[\{-2, 2\}] = \{4\}, \quad f^{-1}[\{4\}] = \{-2, 2\}, \quad f^{-1}[\{-1\}] = \varnothing.$$

Preimages keep unions, intersections and complements: $f^{-1}[Y \cap Z] = f^{-1}[Y] \cap f^{-1}[Z]$, and so on. Images keep unions, but not always intersections: for $x^2$, $f[\{-2\}] \cap f[\{2\}] = \{4\}$, while $f[\{-2\} \cap \{2\}] = \varnothing$.

## The Natural Numbers {#naturals-as-sets}
built-on: set-operations

How the natural numbers, and from them the rest of mathematics, are built out of sets.

From the natural numbers the other number systems follow: the integers as equivalence classes of pairs of natural numbers, the rationals as [[partitions|equivalence classes]] of pairs of integers, as fractions are, and the reals as Dedekind cuts, sets of rationals. So every object of ordinary mathematics can be taken to be a set.

### Von Neumann Naturals {#von-neumann-naturals}
kind: definition
prereqs: empty-set, axiom-of-infinity, set-union, axiom-of-pairing

Each natural number is the set of the natural numbers before it:
$$0 = \varnothing, \quad n + 1 = n \cup \{n\};$$
and $\omega$, the set of natural numbers, is the smallest inductive set: the intersection of all inductive subsets of the set given by the [[axiom-of-infinity|axiom of infinity]].

So
$$\begin{aligned} 0 &= \varnothing, \\ 1 &= \{0\} = \{\varnothing\}, \\ 2 &= \{0, 1\} = \{\varnothing, \{\varnothing\}\}, \\ 3 &= \{0, 1, 2\}, \end{aligned}$$
and in general $n = \{0, 1, \ldots, n - 1\}$ has $n$ elements, and $m < n$ means $m \in n$.

### The Naturals Satisfy Peano's Axioms {#omega-satisfies-peano}
kind: theorem
prereqs: von-neumann-naturals, peano-axioms, axiom-of-regularity

With successor $S(n) = n \cup \{n\}$, the set $\omega$ satisfies the [[peano-axioms|Peano axioms]].

*Proof*, in outline. $0 = \varnothing$ is in $\omega$, and $\omega$ is closed under $S$, being inductive. $0$ is not a successor, since $n \in n \cup \{n\}$ makes every successor non-empty. Induction holds because a subset of $\omega$ that contains $0$ and is closed under $S$ is inductive, so it contains the smallest inductive set, $\omega$. And $S$ is injective: if $m \cup \{m\} = n \cup \{n\}$ with $m \ne n$, then $m \in n$ and $n \in m$, which [[axiom-of-regularity|regularity]] forbids. $\square$

So arithmetic, which Peano's axioms found, can be built inside set theory: addition and multiplication are defined on $\omega$ by recursion, as they are from the Peano axioms.

## Cardinality {#cardinality}
built-on: relations-and-functions, naturals-as-sets

The sizes of sets, finite and infinite, compared by matching their elements one to one.

### Equinumerous Sets {#equinumerous}
kind: definition
prereqs: bijections

Sets $A$ and $B$ have the same cardinality, written $|A| = |B|$, when there is a bijection from $A$ to $B$; and $|A| \le |B|$ when there is an injection from $A$ to $B$.

Matching is how counting works: a set has $n$ elements when it can be matched with $\{1, 2, \ldots, n\}$. For infinite sets it brings surprises: the even numbers can be matched with the natural numbers, by $n \mapsto 2n$, although they are only some of them.

### Pigeonhole Principle
kind: theorem
prereqs: equinumerous

For every natural number $n$, there is no injection from a set of $n + 1$ elements to a set of $n$ elements: if $n + 1$ objects go into $n$ boxes, some box gets at least two.

*Proof*, [[induction|by induction]] on $n$. For $n = 0$ there is no function at all from a non-empty set to $\varnothing$. Suppose it holds for $n$, and that $f$ were an injection from $n + 2$ objects to $n + 1$ boxes. Take one object $a$; no other object goes to the box $f(a)$, so $f$ on the other $n + 1$ objects is an injection into the other $n$ boxes, which cannot be. $\square$

**Example.** Among any 13 people, two were born in the same month.

```quiz
Q: A drawer holds red, blue and green socks. How many socks must you take, without looking, to be sure of a matching pair?
A: 4
Hint: How many could you take that all differ in colour?
Why: Three socks could be one of each colour; a fourth must match one of them. Four socks, three colours.
```

### Countable Sets
kind: definition
prereqs: equinumerous, von-neumann-naturals

A set is finite if it has the same cardinality as some natural number $n = \{0, 1, \ldots, n - 1\}$, countably infinite if it has the same cardinality as $\mathbb{N}$, and countable if it is finite or countably infinite. The cardinality of $\mathbb{N}$ is written $\aleph_0$.

A countably infinite set is one whose elements can be listed $a_0, a_1, a_2, \ldots$ with every element somewhere in the list: the list is the bijection $n \mapsto a_n$. A set that is not countable is uncountable.

**Example.** $\mathbb{Z}$ is countable:
$$0, 1, -1, 2, -2, 3, -3, \ldots$$

### The Rationals Are Countable {#rationals-countable}
kind: theorem
prereqs: countable-sets, number-systems

$\mathbb{Q}$ is countable: $|\mathbb{Q}| = \aleph_0$.

*Proof.* List the positive fractions $\frac{p}{q}$ in order of $p + q$, and those with the same sum in order of $p$, leaving out any not in lowest terms:
$$\frac{1}{1}, \frac{1}{2}, \frac{2}{1}, \frac{1}{3}, \frac{3}{1}, \frac{1}{4}, \frac{2}{3}, \frac{3}{2}, \frac{4}{1}, \ldots$$
Every positive rational appears exactly once, after finitely many others. Put $0$ first, and follow each positive rational with its negative, as for $\mathbb{Z}$. $\square$

So the rationals, though there are rationals between any two numbers, are no more numerous than the natural numbers.

### Cantor's Diagonal Argument {#uncountable-reals}
kind: theorem
prereqs: countable-sets, proof-by-contradiction, number-systems

$\mathbb{R}$ is uncountable: no list $x_1, x_2, x_3, \ldots$ contains every real number.

*Proof.* It is enough to show that no list contains every number between 0 and 1. Write each $x_n$ in the list as a decimal $0.d_{n1} d_{n2} d_{n3} \ldots$, and build a number $y = 0.e_1 e_2 e_3 \ldots$ digit by digit, with
$$e_n = \begin{cases} 5 & \text{if } d_{nn} \ne 5, \\ 4 & \text{if } d_{nn} = 5. \end{cases}$$
Then $y$ differs from each $x_n$ in its $n$th digit. Having no digit 0 or 9, $y$ has no second decimal expansion, so $y \ne x_n$ for every $n$: it is a number between 0 and 1 missing from the list. $\square$

So there are more real numbers than rational ones: $|\mathbb{R}| = 2^{\aleph_0} > \aleph_0$. Whether some set is larger than $\mathbb{N}$ but smaller than $\mathbb{R}$ is the continuum hypothesis, which, like the [[axiom-of-choice|axiom of choice]], ZFC can neither prove nor refute.

### Cantor's Theorem {#cantors-theorem}
kind: theorem
prereqs: power-set, equinumerous, proof-by-contradiction

For every set $A$, no function $f\colon A \to \mathcal{P}(A)$ is surjective, so $|A| < |\mathcal{P}(A)|$.

*Proof.* Given $f$, let
$$D = \{a \in A : a \notin f(a)\}.$$
If $D = f(d)$ for some $d \in A$, then $d \in D$ exactly when $d \notin f(d) = D$: a contradiction. So $D$ is not an output of $f$. And $a \mapsto \{a\}$ is an injection from $A$ to $\mathcal{P}(A)$, so $|A| \le |\mathcal{P}(A)|$, but not $|A| = |\mathcal{P}(A)|$. $\square$

So there is no largest infinity: $\mathbb{N}$, $\mathcal{P}(\mathbb{N})$, $\mathcal{P}(\mathcal{P}(\mathbb{N}))$, … are each larger than the one before. The argument is the same as [[russells-paradox|Russell's]], and as the [[uncountable-reals|diagonal argument]].

```quiz
Q: Which of these sets is uncountable?
- $\mathbb{Z}$
- $\mathbb{Q}$
+ $\mathcal{P}(\mathbb{N})$
- $\mathbb{N} \times \mathbb{N}$
Hint: Only one of them is the power set of an infinite set.
Why: By Cantor's theorem, $|\mathcal{P}(\mathbb{N})| > |\mathbb{N}|$. The others can all be listed: $\mathbb{N} \times \mathbb{N}$ in order of $m + n$, as the rationals are.
```

### Schröder–Bernstein Theorem {#schroder-bernstein}
kind: theorem
prereqs: equinumerous

If $|A| \le |B|$ and $|B| \le |A|$, then $|A| = |B|$: injections both ways give a bijection.

*Proof*, in outline. Let $f\colon A \to B$ and $g\colon B \to A$ be injections. Trace each element of $A$ backwards, through $g^{-1}$ and $f^{-1}$ alternately, for as long as it has a predecessor. Send $a$ to $g^{-1}(a)$ if its trail ends in $B$, and to $f(a)$ otherwise; this is a bijection from $A$ to $B$. $\square$

It needs no axiom of choice. That any two sets can be compared, $|A| \le |B|$ or $|B| \le |A|$, does need it.
