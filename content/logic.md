# Logic
color: #4f5562

The rules of correct reasoning: how statements combine, which arguments are valid, and how proofs are built.

## Axioms {#logic-axioms}

Logic can be founded on rules of inference alone, with no axioms, or on a few axioms and a single rule, modus ponens.

The two ways side by side:
- natural deduction, the way proofs are usually written, has no axioms at all, only rules; and truth tables check which arguments are valid without assuming anything;
- a Hilbert-style system takes a few axioms and one rule. Łukasiewicz's three axioms are the usual choice.

Both prove exactly the same statements, the [[tautology|tautologies]]: whatever can be proved is true in every row of its truth table (soundness), and whatever is true in every row can be proved (completeness).

### Natural Deduction
kind: definition

A proof system with no axioms, only rules: each connective has an introduction rule, which proves a statement built with it, and an elimination rule, which draws a conclusion from one.

The rules, and their names elsewhere in this domain:

| Connective | Introduction | Elimination |
| --- | --- | --- |
| $\land$ | from $p$ and $q$, infer $p \land q$: [[conjunction-rule]] | from $p \land q$, infer $p$: [[simplification-rule]] |
| $\lor$ | from $p$, infer $p \lor q$: [[rule-of-addition]] | from $p \lor q$, $p \to r$ and $q \to r$, infer $r$: [[proof-by-cases]] |
| $\to$ | if assuming $p$ proves $q$, infer $p \to q$: [[direct-proof]] | from $p \to q$ and $p$, infer $q$: [[modus-ponens]] |
| $\neg$ | if assuming $p$ proves a contradiction, infer $\neg p$: [[proof-by-contradiction]] | from $p$ and $\neg p$, infer anything |

Classical logic adds one more rule, from $\neg\neg p$ infer $p$ ([[double-negation]]). Without it the system is intuitionistic logic, in which a statement is proved only by a construction.

### Łukasiewicz's Axioms {#lukasiewicz-axioms}

A Hilbert-style system for $\to$ and $\neg$: three axioms and one rule of inference, [[modus-ponens|modus ponens]].

Each axiom is a schema: any formulas may stand for $\varphi$, $\psi$ and $\chi$, and every such instance may be written down as a line of a proof. The other connectives are abbreviations:
$$\begin{aligned} \varphi \lor \psi &\text{ for } \neg\varphi \to \psi, \\ \varphi \land \psi &\text{ for } \neg(\varphi \to \neg\psi). \end{aligned}$$

**Example.** A proof of $\varphi \to \varphi$, to show how such proofs go:
$$\begin{aligned} 1.\;& \big(\varphi \to ((\varphi \to \varphi) \to \varphi)\big) \to \big((\varphi \to (\varphi \to \varphi)) \to (\varphi \to \varphi)\big) && \text{axiom 2} \\ 2.\;& \varphi \to ((\varphi \to \varphi) \to \varphi) && \text{axiom 1} \\ 3.\;& (\varphi \to (\varphi \to \varphi)) \to (\varphi \to \varphi) && \text{modus ponens, 2 and 1} \\ 4.\;& \varphi \to (\varphi \to \varphi) && \text{axiom 1} \\ 5.\;& \varphi \to \varphi && \text{modus ponens, 4 and 3} \end{aligned}$$

#### Axiom 1: Weakening {#lukasiewicz-1}
kind: axiom

For all formulas $\varphi$ and $\psi$:
$$\varphi \to (\psi \to \varphi).$$

What is true follows from anything.

#### Axiom 2: Self-Distribution {#lukasiewicz-2}
kind: axiom

For all formulas $\varphi$, $\psi$ and $\chi$:
$$\big(\varphi \to (\psi \to \chi)\big) \to \big((\varphi \to \psi) \to (\varphi \to \chi)\big).$$

If $\varphi$ yields $\psi \to \chi$, and also yields $\psi$, then it yields $\chi$.

#### Axiom 3: Contraposition {#lukasiewicz-3}
kind: axiom

For all formulas $\varphi$ and $\psi$:
$$(\neg\varphi \to \neg\psi) \to (\psi \to \varphi).$$

The axiom that makes the logic classical: with it, [[double-negation|double negation]] and [[proof-by-contradiction|proof by contradiction]] can be proved.

## Propositions & Connectives {#connectives}

Statements that are true or false, and the connectives that build bigger statements from smaller ones, each defined by its truth table.

| $p$ | $q$ | $\neg p$ | $p \land q$ | $p \lor q$ | $p \to q$ | $p \leftrightarrow q$ |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

### Propositions {#proposition}
kind: definition

A proposition is a statement that is either true or false, but not both.

$2 + 3 = 5$ is a true proposition, and $2 > 3$ a false one. "Close the door" is not a proposition, being neither true nor false; nor is $x > 3$, whose truth depends on $x$, which makes it a [[predicates|predicate]]. Propositions are written $p$, $q$, $r$, …, and their truth values T and F.

### Negation {#logical-negation}
kind: definition
prereqs: proposition

The negation of $p$, written $\neg p$ and read "not $p$", is true when $p$ is false, and false when $p$ is true.

| $p$ | $\neg p$ |
| --- | --- |
| T | F |
| F | T |

### Conjunction
kind: definition
prereqs: proposition

The conjunction $p \land q$, read "$p$ and $q$", is true when $p$ and $q$ are both true, and false otherwise.

| $p$ | $q$ | $p \land q$ |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

### Disjunction
kind: definition
prereqs: proposition

The disjunction $p \lor q$, read "$p$ or $q$", is true when at least one of $p$ and $q$ is true, and false only when both are false.

This "or" is inclusive: $p \lor q$ is true when both are. Everyday speech often means one or the other but not both, which is the exclusive or, $p \oplus q$.

| $p$ | $q$ | $p \lor q$ | $p \oplus q$ |
| --- | --- | --- | --- |
| T | T | T | F |
| T | F | T | T |
| F | T | T | T |
| F | F | F | F |

### Conditional Statements
kind: definition
prereqs: proposition

The conditional $p \to q$, read "if $p$, then $q$", is false when $p$ is true and $q$ is false, and true in every other case.

$p$ is its hypothesis, or antecedent, and $q$ its conclusion, or consequent. The same statement can be read
- "$p$ implies $q$";
- "$p$ only if $q$", or "$q$ if $p$";
- "$p$ is sufficient for $q$", or "$q$ is necessary for $p$".

| $p$ | $q$ | $p \to q$ |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

A conditional with a false hypothesis is true, vacuously: "if $2 > 3$, then $5 = 7$" is true. It promises something only when its hypothesis holds.

### Converse, Inverse & Contrapositive {#converse-inverse-contrapositive}
kind: definition
prereqs: conditional-statements, logical-negation

From the conditional $p \to q$ come three others:
- its converse, $q \to p$;
- its inverse, $\neg p \to \neg q$;
- its contrapositive, $\neg q \to \neg p$.

A conditional and its contrapositive are [[law-of-contraposition|logically equivalent]], and so are its converse and its inverse; but a conditional and its converse are not.

**Example.** "If $n$ is divisible by 4, then $n$ is even" is true, and so is its contrapositive, "if $n$ is odd, then $n$ is not divisible by 4". Its converse, "if $n$ is even, then $n$ is divisible by 4", is false, as $n = 6$ shows.

```quiz
Q: The contrapositive of "if it rains, the match is cancelled" is:
- If the match is cancelled, it rained.
- If it doesn't rain, the match isn't cancelled.
+ If the match isn't cancelled, it didn't rain.
- If it rains, the match isn't cancelled.
Hint: Swap the two parts, and negate both.
Why: The contrapositive of $p \to q$ is $\neg q \to \neg p$. The first choice is the converse, and the second the inverse.

Q: The converse of $p \to q$ is:
- $\neg q \to \neg p$
+ $q \to p$
- $\neg p \to \neg q$
- $p \to \neg q$
Why: The converse swaps hypothesis and conclusion, without negating either.
```

### Biconditional
kind: definition
prereqs: conditional-statements, conjunction

The biconditional $p \leftrightarrow q$, read "$p$ if and only if $q$", is true when $p$ and $q$ have the same truth value, and false when they differ.

It says both $p \to q$ and $q \to p$:
$$p \leftrightarrow q \equiv (p \to q) \land (q \to p).$$
"If and only if" is often shortened to "iff", and between statements in a proof written $\iff$. Proving one takes [[iff-proofs|two proofs]], one in each direction.

### Truth Tables
kind: skill
prereqs: logical-negation, conjunction, disjunction, conditional-statements

A truth table lists every combination of truth values of a statement's variables, one to a row, and works out the statement's value in each: $2^n$ rows for $n$ variables.

In order:
1. List the rows: for two variables TT, TF, FT, FF.
2. Add a column for each part of the statement, innermost first.
3. Fill each column from the ones before it; the last column is the statement.

**Example.** The truth table of $\neg p \lor q$:

| $p$ | $q$ | $\neg p$ | $\neg p \lor q$ |
| --- | --- | --- | --- |
| T | T | F | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

The last column matches that of $p \to q$ row for row: the two statements are [[logical-equivalence|logically equivalent]].

```quiz
Q: In how many rows of its truth table is $(p \lor q) \to p$ false?
A: 1
Hint: A conditional is false only when its hypothesis is true and its conclusion false.
Why: Only in the row $p$ false, $q$ true is $p \lor q$ true while $p$ is false.

Q: How many rows does the truth table of a statement in three variables $p$, $q$, $r$ have?
A: 8
Why: Each variable doubles the number of rows: $2^3 = 8$.
```

### Tautologies & Contradictions {#tautology}
kind: definition
prereqs: truth-tables

A tautology is a statement that is true in every row of its truth table, and a contradiction one that is false in every row. A statement that is neither is contingent.

$p \lor \neg p$ is a tautology, and $p \land \neg p$ a contradiction. A statement is a tautology exactly when its negation is a contradiction.

### Logical Equivalence
kind: definition
prereqs: tautology, biconditional

Statements $A$ and $B$ are logically equivalent, written $A \equiv B$, when they have the same truth value in every row of their truth table; that is, when $A \leftrightarrow B$ is a tautology.

Equivalent statements can replace each other anywhere, inside a bigger statement or in a proof. The [[laws-of-logic|laws of logic]] are the equivalences used most.

## Laws of Logic {#laws-of-logic}

The logical equivalences used to rewrite statements, each checked by a truth table.

| Law | Equivalence |
| --- | --- |
| Double negation | $\neg\neg p \equiv p$ |
| Commutative | $p \land q \equiv q \land p$; $p \lor q \equiv q \lor p$ |
| Associative | $(p \land q) \land r \equiv p \land (q \land r)$; $(p \lor q) \lor r \equiv p \lor (q \lor r)$ |
| Distributive | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$; $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ |
| Idempotent | $p \land p \equiv p$; $p \lor p \equiv p$ |
| Absorption | $p \land (p \lor q) \equiv p$; $p \lor (p \land q) \equiv p$ |
| De Morgan's | $\neg(p \land q) \equiv \neg p \lor \neg q$; $\neg(p \lor q) \equiv \neg p \land \neg q$ |
| Excluded middle | $p \lor \neg p$ is a tautology |
| Non-contradiction | $p \land \neg p$ is a contradiction |
| Conditional | $p \to q \equiv \neg p \lor q$ |
| Contraposition | $p \to q \equiv \neg q \to \neg p$ |
| Negated conditional | $\neg(p \to q) \equiv p \land \neg q$ |
| Biconditional | $p \leftrightarrow q \equiv (p \to q) \land (q \to p)$ |

### Double Negation
kind: theorem
prereqs: logical-equivalence, logical-negation

For every proposition $p$:
$$\neg\neg p \equiv p.$$

*Proof.* Negating twice turns T into F and back into T, and F into T and back into F. $\square$

### De Morgan's Laws {#de-morgans-laws}
kind: theorem
prereqs: logical-equivalence, conjunction, disjunction, double-negation

For all propositions $p$ and $q$:
$$\begin{aligned} \neg(p \land q) &\equiv \neg p \lor \neg q, \\ \neg(p \lor q) &\equiv \neg p \land \neg q. \end{aligned}$$

In words: "not both" means "at least one not", and "not either" means "neither".

*Proof.* The first law, by truth table: the last two columns agree in every row.

| $p$ | $q$ | $\neg(p \land q)$ | $\neg p \lor \neg q$ |
| --- | --- | --- | --- |
| T | T | F | F |
| T | F | T | T |
| F | T | T | T |
| F | F | T | T |

For the second, put $\neg p$ and $\neg q$ for $p$ and $q$ in the first, which by [[double-negation|double negation]] gives $\neg(\neg p \land \neg q) \equiv p \lor q$, and negate both sides. $\square$

The same laws hold for sets, with complements, unions and intersections: [[set-de-morgan]].

```quiz
Q: The negation of "$x$ is positive and $x$ is even" is:
- "$x$ is not positive and $x$ is not even"
+ "$x$ is not positive or $x$ is not even"
- "$x$ is positive or $x$ is even"
- "$x$ is negative and $x$ is odd"
Hint: "Not both" means "at least one not".
Why: $\neg(p \land q) \equiv \neg p \lor \neg q$: it is enough for one of the two to fail.
```

### Conditional as a Disjunction {#conditional-as-disjunction}
kind: theorem
prereqs: conditional-statements, disjunction, logical-equivalence

For all propositions $p$ and $q$:
$$p \to q \equiv \neg p \lor q.$$

*Proof.* Each side is false in exactly one row, $p$ true and $q$ false, as the [[truth-tables|truth table]] of $\neg p \lor q$ shows. $\square$

### Law of Contraposition {#law-of-contraposition}
kind: theorem
prereqs: conditional-as-disjunction, double-negation, converse-inverse-contrapositive

A conditional is equivalent to its contrapositive: for all propositions $p$ and $q$,
$$p \to q \equiv \neg q \to \neg p.$$

*Proof.*
$$\begin{aligned} \neg q \to \neg p &\equiv \neg\neg q \lor \neg p && \text{conditional as a disjunction} \\ &\equiv q \lor \neg p && \text{double negation} \\ &\equiv \neg p \lor q && \text{commutativity} \\ &\equiv p \to q. && \text{conditional as a disjunction} \quad \square \end{aligned}$$

So a conditional can be proved by [[proof-by-contrapositive|proving its contrapositive]]. Its converse, $q \to p$, is not equivalent to it: the two differ in the rows TF and FT.

### Negating a Conditional {#negated-conditional}
kind: theorem
prereqs: conditional-as-disjunction, de-morgans-laws

For all propositions $p$ and $q$:
$$\neg(p \to q) \equiv p \land \neg q.$$

*Proof.*
$$\begin{aligned} \neg(p \to q) &\equiv \neg(\neg p \lor q) && \text{conditional as a disjunction} \\ &\equiv \neg\neg p \land \neg q && \text{De Morgan} \\ &\equiv p \land \neg q. && \text{double negation} \quad \square \end{aligned}$$

The negation of a conditional is not another conditional: "if it rains, the match is cancelled" is false only when it rains and the match goes ahead.

```quiz
Q: The negation of "if $n$ is prime, then $n$ is odd" is:
- "if $n$ is prime, then $n$ is even"
- "if $n$ is not prime, then $n$ is not odd"
+ "$n$ is prime and $n$ is even"
- "$n$ is not prime or $n$ is odd"
Hint: A conditional is false only when its hypothesis holds and its conclusion fails.
Why: $\neg(p \to q) \equiv p \land \neg q$. Here the negation is true, since $n = 2$ is prime and even.
```

## Arguments {#arguments}

Which conclusions follow from which premises: valid argument forms, and the invalid ones that look like them.

### Valid Arguments {#valid-argument}
kind: definition
prereqs: truth-tables, tautology

An argument from premises $p_1, \ldots, p_n$ to a conclusion $q$ is valid when the conclusion is true in every row of the truth table in which all the premises are true; that is, when
$$(p_1 \land \cdots \land p_n) \to q$$
is a tautology.

An argument is written premises first, then its conclusion after $\therefore$, "therefore":
$$p \to q, \quad p \quad \therefore \quad q$$

Validity is a matter of form, not of truth. A valid argument can have false premises and a false conclusion; what it cannot have is true premises and a false conclusion. A valid argument whose premises are true is sound, and then its conclusion is true.

### Rules of Inference {#rules-of-inference}
wrap: 4

Valid argument forms, each a step that a proof may take. Any statements may stand for $p$, $q$, $r$ and $s$.

| Rule | From | Infer |
| --- | --- | --- |
| [[modus-ponens]] | $p \to q$, $p$ | $q$ |
| [[modus-tollens]] | $p \to q$, $\neg q$ | $\neg p$ |
| [[hypothetical-syllogism]] | $p \to q$, $q \to r$ | $p \to r$ |
| [[disjunctive-syllogism]] | $p \lor q$, $\neg p$ | $q$ |
| [[simplification-rule]] | $p \land q$ | $p$ |
| [[conjunction-rule]] | $p$, $q$ | $p \land q$ |
| [[rule-of-addition]] | $p$ | $p \lor q$ |
| [[resolution-rule]] | $p \lor q$, $\neg p \lor r$ | $q \lor r$ |
| [[constructive-dilemma]] | $p \to q$, $r \to s$, $p \lor r$ | $q \lor s$ |
| [[destructive-dilemma]] | $p \to q$, $r \to s$, $\neg q \lor \neg s$ | $\neg p \lor \neg r$ |

Each is [[valid-argument|valid]]: no row of its truth table makes the premises true and the conclusion false.

#### Modus Ponens
kind: rule
prereqs: valid-argument, conditional-statements

From $p \to q$ and $p$, infer $q$:
$$p \to q, \quad p \quad \therefore \quad q$$

Latin for "the way that affirms". It is the one rule of [[lukasiewicz-axioms|Łukasiewicz's system]], and the elimination rule for $\to$ in [[natural-deduction|natural deduction]].

**Example.** If $n$ is divisible by 6, then $n$ is even; 42 is divisible by 6; so 42 is even.

*Proof.* The only row in which $p \to q$ and $p$ are both true is the one with $p$ and $q$ both true, where the conclusion $q$ is true. $\square$

#### Modus Tollens
kind: rule
prereqs: valid-argument, conditional-statements, logical-negation

From $p \to q$ and $\neg q$, infer $\neg p$:
$$p \to q, \quad \neg q \quad \therefore \quad \neg p$$

Latin for "the way that denies".

**Example.** If $n$ is divisible by 6, then $n$ is even; 35 is not even; so 35 is not divisible by 6.

*Proof.* The only row in which $p \to q$ is true and $q$ false is the one with $p$ false too, where the conclusion $\neg p$ is true. $\square$

```quiz
Q: "If the battery is flat, the car won't start. The car started. So the battery isn't flat." This argument is:
- modus ponens
+ modus tollens
- hypothetical syllogism
- affirming the consequent
Why: From $p \to q$ and $\neg q$ it infers $\neg p$, with $p$: the battery is flat, and $q$: the car won't start.
```

#### Hypothetical Syllogism
kind: rule
prereqs: valid-argument, conditional-statements

From $p \to q$ and $q \to r$, infer $p \to r$:
$$p \to q, \quad q \to r \quad \therefore \quad p \to r$$

Implications chain: $\to$ is transitive.

**Example.** If it rains, the pitch is wet; if the pitch is wet, the match is cancelled; so if it rains, the match is cancelled.

*Proof.* If the conclusion is false, then $p$ is true and $r$ false. For $q \to r$ to be true, $q$ must then be false, and then $p \to q$ is false. So no row makes both premises true and the conclusion false. $\square$

#### Disjunctive Syllogism
kind: rule
prereqs: valid-argument, disjunction, logical-negation

From $p \lor q$ and $\neg p$, infer $q$:
$$p \lor q, \quad \neg p \quad \therefore \quad q$$

**Example.** The key is in the drawer or in the coat; it is not in the drawer; so it is in the coat.

*Proof.* In the rows where $\neg p$ is true, $p$ is false, so $p \lor q$ can only be true with $q$ true. $\square$

#### Simplification {#simplification-rule}
kind: rule
prereqs: valid-argument, conjunction

From $p \land q$, infer $p$ (and equally $q$):
$$p \land q \quad \therefore \quad p$$

*Proof.* $p \land q$ is true only when $p$ is. $\square$

#### Conjunction {#conjunction-rule}
kind: rule
prereqs: valid-argument, conjunction

From $p$ and $q$, infer $p \land q$:
$$p, \quad q \quad \therefore \quad p \land q$$

*Proof.* When $p$ and $q$ are both true, so is $p \land q$, by definition. $\square$

#### Addition {#rule-of-addition}
kind: rule
prereqs: valid-argument, disjunction

From $p$, infer $p \lor q$, for any statement $q$:
$$p \quad \therefore \quad p \lor q$$

The conclusion says less than the premise: $q$ can be anything, even false.

*Proof.* When $p$ is true, so is $p \lor q$, whatever $q$ is. $\square$

#### Resolution {#resolution-rule}
kind: rule
prereqs: valid-argument, disjunction, logical-negation

From $p \lor q$ and $\neg p \lor r$, infer $q \lor r$:
$$p \lor q, \quad \neg p \lor r \quad \therefore \quad q \lor r$$

[[disjunctive-syllogism|Disjunctive syllogism]] is the case where $r$ is false. Resolution is the one rule that many computer theorem provers use.

*Proof.* If $p$ is true, then $\neg p$ is false, so the second premise makes $r$ true. If $p$ is false, the first premise makes $q$ true. Either way $q \lor r$ is true. $\square$

#### Constructive Dilemma
kind: rule
prereqs: valid-argument, conditional-statements, disjunction

From $p \to q$, $r \to s$ and $p \lor r$, infer $q \lor s$:
$$p \to q, \quad r \to s, \quad p \lor r \quad \therefore \quad q \lor s$$

When $q$ and $s$ are the same statement, it infers $q$ from $p \lor r$, $p \to q$ and $r \to q$: that is [[proof-by-cases|proof by cases]].

*Proof.* By the third premise, $p$ or $r$ is true. If $p$ is, [[modus-ponens|modus ponens]] gives $q$; if $r$ is, it gives $s$. Either way $q \lor s$ is true. $\square$

#### Destructive Dilemma
kind: rule
prereqs: valid-argument, conditional-statements, disjunction, logical-negation

From $p \to q$, $r \to s$ and $\neg q \lor \neg s$, infer $\neg p \lor \neg r$:
$$p \to q, \quad r \to s, \quad \neg q \lor \neg s \quad \therefore \quad \neg p \lor \neg r$$

*Proof.* By the third premise, $\neg q$ or $\neg s$ is true. If $\neg q$ is, [[modus-tollens|modus tollens]] gives $\neg p$; if $\neg s$ is, it gives $\neg r$. Either way $\neg p \lor \neg r$ is true. $\square$

### Fallacies

Invalid argument forms that look like valid ones. Each has a row of its truth table in which every premise is true and the conclusion false.

#### Affirming the Consequent
kind: definition
prereqs: valid-argument, converse-inverse-contrapositive

Affirming the consequent is the invalid argument
$$p \to q, \quad q \quad \therefore \quad p$$

It mistakes a conditional for its converse. In the row with $p$ false and $q$ true, both premises are true and the conclusion is false.

**Example.** If $n$ is divisible by 4, then $n$ is even; 6 is even; but 6 is not divisible by 4.

```quiz
Q: "If a shape is a square, it has four sides. This shape has four sides, so it is a square." This argument is:
- valid, by modus ponens
- valid, by modus tollens
+ affirming the consequent
- denying the antecedent
Hint: Which part of the conditional does the second premise assert: the "if" part or the "then" part?
Why: From $p \to q$ and $q$ it infers $p$, which is invalid: a rectangle has four sides without being a square.
```

#### Denying the Antecedent
kind: definition
prereqs: valid-argument, converse-inverse-contrapositive

Denying the antecedent is the invalid argument
$$p \to q, \quad \neg p \quad \therefore \quad \neg q$$

It mistakes a conditional for its inverse. In the row with $p$ false and $q$ true, both premises are true and the conclusion is false.

**Example.** If $n$ is divisible by 4, then $n$ is even; 6 is not divisible by 4; but 6 is even.

## Predicates & Quantifiers {#quantifiers}

Statements about all or some of the things in a domain: the language in which set theory, and the rest of mathematics, is written.

### Predicates
kind: definition
prereqs: proposition

A predicate $P(x)$ is a statement about a variable $x$ that becomes a proposition when $x$ is given a value from a chosen set, its domain of discourse.

$P(x)$: "$x > 3$" is a predicate on $\mathbb{R}$, with $P(5)$ true and $P(1)$ false. A predicate can have several variables, like $x < y$.

### Universal Quantifier
kind: definition
prereqs: predicates

$\forall x\, P(x)$, read "for all $x$, $P(x)$", is true when $P(x)$ is true for every $x$ in the domain, and false when it is false for at least one.

**Example.** $\forall x \in \mathbb{R}\ (x^2 \ge 0)$ is true.

A quantifier restricted to a set abbreviates a conditional:
$$\forall x \in A\ P(x) \quad\text{means}\quad \forall x\, \big(x \in A \to P(x)\big).$$
Over an empty domain, $\forall x\, P(x)$ is true, vacuously.

### Existential Quantifier
kind: definition
prereqs: predicates

$\exists x\, P(x)$, read "there exists $x$ such that $P(x)$", is true when $P(x)$ is true for at least one $x$ in the domain, and false when it is false for every $x$.

**Example.** $\exists x \in \mathbb{R}\ (x^2 = 2)$ is true, but $\exists x \in \mathbb{Q}\ (x^2 = 2)$ is false.

A quantifier restricted to a set abbreviates a conjunction:
$$\exists x \in A\ P(x) \quad\text{means}\quad \exists x\, \big(x \in A \land P(x)\big).$$
$\exists! x\, P(x)$, read "there is exactly one $x$ such that $P(x)$", means
$$\exists x\, \big(P(x) \land \forall y\, (P(y) \to y = x)\big).$$

### Negating Quantifiers
kind: theorem
prereqs: universal-quantifier, existential-quantifier, double-negation

For every predicate $P$:
$$\begin{aligned} \neg\, \forall x\, P(x) &\equiv \exists x\, \neg P(x), \\ \neg\, \exists x\, P(x) &\equiv \forall x\, \neg P(x). \end{aligned}$$

*Proof.* $\forall x\, P(x)$ is false exactly when $P(x)$ fails for at least one $x$, which is what $\exists x\, \neg P(x)$ says. Applying this to $\neg P$ gives $\neg\, \forall x\, \neg P(x) \equiv \exists x\, P(x)$, by [[double-negation|double negation]]; negating both sides gives the second law. $\square$

To negate a statement, move $\neg$ inwards: each quantifier it passes turns over, $\forall$ into $\exists$ and $\exists$ into $\forall$, and [[de-morgans-laws|De Morgan's laws]] and the [[negated-conditional|negated conditional]] finish the job on what is left.

**Example.**
$$\neg\, \forall x \in \mathbb{R}\ \exists y \in \mathbb{R}\ (y^2 = x) \equiv \exists x \in \mathbb{R}\ \forall y \in \mathbb{R}\ (y^2 \ne x),$$
which is true: $x = -1$ is the square of no real number.

```quiz
Q: The negation of $\forall n \in \mathbb{N}\ \exists m \in \mathbb{N}\ (m > n)$ is:
- $\exists n \in \mathbb{N}\ \exists m \in \mathbb{N}\ (m \le n)$
- $\forall n \in \mathbb{N}\ \forall m \in \mathbb{N}\ (m \le n)$
+ $\exists n \in \mathbb{N}\ \forall m \in \mathbb{N}\ (m \le n)$
- $\forall n \in \mathbb{N}\ \exists m \in \mathbb{N}\ (m \le n)$
Hint: Each quantifier that $\neg$ passes turns over.
Why: $\forall$ becomes $\exists$, $\exists$ becomes $\forall$, and $m > n$ becomes $m \le n$. The original is true, so this is false: no natural number is at least every other.
```

### Nested Quantifiers
prereqs: universal-quantifier, existential-quantifier

The order of different quantifiers matters: $\forall x\, \exists y$ lets $y$ depend on $x$, while $\exists y\, \forall x$ asks for one $y$ that works for every $x$.

**Example.**
$$\forall x \in \mathbb{R}\ \exists y \in \mathbb{R}\ (y > x)$$
is true: take $y = x + 1$. But
$$\exists y \in \mathbb{R}\ \forall x \in \mathbb{R}\ (y > x)$$
is false: no real number is greater than every real number, itself included.

Quantifiers of the same kind can be swapped: $\forall x\, \forall y$ means the same as $\forall y\, \forall x$, and $\exists x\, \exists y$ as $\exists y\, \exists x$. And $\exists y\, \forall x\, P(x, y)$ implies $\forall x\, \exists y\, P(x, y)$, but not the other way round.

### Rules for Quantifiers {#quantifier-rules}
kind: rule
prereqs: universal-quantifier, existential-quantifier, valid-argument

Four rules move between a quantified statement and a statement about one element:
1. universal instantiation: from $\forall x\, P(x)$, infer $P(c)$ for any $c$ in the domain;
2. universal generalisation: from a proof of $P(c)$ for an arbitrary $c$, about which nothing else is assumed, infer $\forall x\, P(x)$;
3. existential instantiation: from $\exists x\, P(x)$, infer $P(c)$ for a new name $c$, about which nothing else is assumed;
4. existential generalisation: from $P(c)$ for some $c$ in the domain, infer $\exists x\, P(x)$.

Universal generalisation is why a proof that something holds for every $x$ begins "let $x$ be arbitrary".

**Example.** Every real number has a non-negative square, and $-3$ is a real number, so $(-3)^2 \ge 0$: universal instantiation, then [[modus-ponens|modus ponens]].

## Proof {#proof}

How a mathematician knows something is true: by deducing it, step by step, from axioms, definitions and theorems already proved.

Each method of proof is a [[rules-of-inference|rule of inference]] used on a large scale:

| Method | Proves | Because of |
| --- | --- | --- |
| [[direct-proof]] | $p \to q$ | the truth table of $\to$ |
| [[proof-by-contrapositive]] | $p \to q$ | [[law-of-contraposition]] |
| [[proof-by-contradiction]] | $p$ | [[tautology]] |
| [[proof-by-cases]] | $q$ | [[constructive-dilemma]] |
| [[iff-proofs]] | $p \leftrightarrow q$ | [[biconditional]] |
| [[uniqueness-proofs]] | $\exists! x\, P(x)$ | [[existential-quantifier]] |
| [[counterexamples]] | $\neg\, \forall x\, P(x)$ | [[negating-quantifiers]] |

### Deductive Reasoning
prereqs: valid-argument

Reaching a certain conclusion from accepted facts by valid steps, as opposed to guessing a pattern from examples. One counterexample can sink a conjecture; no number of examples can prove one.

### Direct Proof
kind: technique
prereqs: deductive-reasoning, conditional-statements

To prove $p \to q$, assume $p$ and deduce $q$.

That is enough, because $p \to q$ is false only with $p$ true and $q$ false, and the deduction rules that row out.

**Example.** If $n$ is odd, then $n^2$ is odd.

*Proof.* Let $n$ be odd, so that $n = 2k + 1$ for an integer $k$. Then
$$n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,$$
which is odd. $\square$

### Proof by Contrapositive
kind: technique
prereqs: direct-proof, law-of-contraposition

To prove $p \to q$, prove its contrapositive $\neg q \to \neg p$ instead, which is [[law-of-contraposition|equivalent]].

**Example.** If $n^2$ is even, then $n$ is even.

*Proof.* The contrapositive says that if $n$ is odd, then $n^2$ is odd, which has a [[direct-proof|direct proof]]. $\square$

### Proof by Contradiction
kind: technique
prereqs: deductive-reasoning, tautology

To prove $p$, assume $\neg p$ and deduce a contradiction, such as $q \land \neg q$. Since a contradiction is false, so is $\neg p$, and $p$ is true.

The classic example proves that $\sqrt{2}$ is not a fraction.

In algebra, it shows that [[no-division-by-zero|zero has no reciprocal]], that [[reciprocals-reverse-order|the reciprocal of a positive number is positive]], and that the [[archimedean-property|natural numbers have no upper bound]].

### Proof by Cases
kind: technique
prereqs: deductive-reasoning, constructive-dilemma

Split the situation into cases that between them cover every possibility, and prove the statement in each one. It rests on the [[constructive-dilemma|constructive dilemma]]: from $p \lor r$, $p \to q$ and $r \to q$, infer $q$.

For a number, a common split is the three cases of trichotomy: negative, zero or positive.

Examples: [[squares-nonnegative|squares are non-negative]], and the [[abs-triangle-inequality|triangle inequality for absolute values]].

### Uniqueness Proofs
kind: technique
prereqs: deductive-reasoning, existential-quantifier

To show that only one thing has a property, suppose that two things have it, and prove that they are equal. To show that exactly one thing has it, first show that something does: existence, then uniqueness.

Examples: there is [[uniqueness-of-zero|only one zero]], and [[uniqueness-of-negatives|only one negative]] of each number; and every equation $ax + b = c$ with $a \ne 0$ has [[unique-solution|exactly one solution]].

### Proving "If and Only If" {#iff-proofs}
kind: technique
prereqs: direct-proof, biconditional

"$p$ if and only if $q$", written $p \iff q$, says two things: if $p$ then $q$, and its converse, if $q$ then $p$. So it takes two proofs, one in each direction, often marked (⇒) and (⇐).

Example: [[cross-multiplication|cross-multiplication]], which says that two fractions are equal exactly when their cross products are.

### Two-Column Proofs
kind: technique
prereqs: deductive-reasoning

Statements on the left, the reason for each on the right, which is one of
- a given;
- a definition;
- an axiom or postulate;
- a theorem already proved.

Examples: the [[addition-cancellation|cancellation law for addition]], in algebra, and proofs of [[triangle-congruence|congruent triangles]], in geometry.

### Counterexamples
kind: technique
prereqs: negating-quantifiers, deductive-reasoning

To disprove $\forall x\, P(x)$, find one $x$ for which $P(x)$ is false: a counterexample.

"Every prime is odd" fails at 2. And "$n^2 + n + 41$ is prime for every natural number $n$" holds for $n = 0, 1, \ldots, 39$, but fails at $n = 40$:
$$40^2 + 40 + 41 = 1681 = 41^2.$$
Forty examples did not make it true.
