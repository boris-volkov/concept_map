# Kinds of statement

Every card on the map is one kind of thing, named at its top. Definitions, axioms, theorems, heuristics and skills each have a colour of their own; the other kinds are plain.

<!-- This file is not one of the map's subjects: it is what the colour key at the top of the map
     opens. Each ## heading that is just the name of a kind is the entry for that kind, and the key's
     buttons open the page at it. -->

## How a topic is laid out

Inside a topic the cards stand in three bands, a faint line between them:

| Band | Kinds |
|---|---|
| Statements: what is so | definitions, axioms, theorems, properties, rules |
| Formulas: how it is written | formulas, forms |
| Skills: what to do with it | skills, techniques, heuristics |

Within a band the cards keep the order they are written in.

## Definition

A **definition** gives a name to every object that meets a condition. It is not proved, and it cannot be false: it is an agreement about what a word will mean.

> A natural number $n > 1$ is *prime* if its only positive divisors are $1$ and $n$.

A definition is always an "if and only if", even when, by long custom, it is written with "if": every number with that property is called prime, and nothing else is. So a definition can be used in both directions: from "$n$ is prime" to "its only divisors are $1$ and $n$", and back.

How a definition differs from a theorem is set out under *Definition or theorem?*, at the end.

## Axiom

An **axiom** is a statement accepted without proof, as a starting point from which the rest is proved.

> For all real numbers $a$ and $b$: $a + b = b + a$.

Unlike a definition, an axiom asserts something about objects already named. Unlike a theorem, nothing is offered to show it is true: it is assumed, and everything proved from it holds wherever it holds.

## Theorem

A **theorem** is a statement that has been proved: shown to follow, by logic alone, from axioms, definitions and theorems proved before it.

A theorem can have any logical shape:

| Shape | Example |
|---|---|
| If $P$, then $Q$ | If a function is differentiable at $a$, then it is continuous at $a$. |
| $P$ if and only if $Q$ | A triangle with sides $a \le b \le c$ has a right angle if and only if $a^2 + b^2 = c^2$. |
| There exists | There is no largest prime. |
| For all | For every real $x$: $x^2 \ge 0$. |

Its **converse** swaps the "if" and the "then", and is a different statement, which may be false: every differentiable function is continuous, but $|x|$ is continuous at $0$ and not differentiable there.

How a theorem differs from a definition is set out under *Definition or theorem?*, at the end.

## Property

A **property** is a theorem about one kind of object: what is true of every one of them.

> The diagonals of a parallelogram bisect each other.

It is proved like any theorem. It is called a property because it is used to recognise or to work with that kind of object.

## Rule

A **rule** is a theorem stated as a pattern for rewriting an expression.

> $a^m \cdot a^n = a^{m+n}$

## Formula

A **formula** is an equation that gives a quantity from others.

> The area of a circle of radius $r$ is $\pi r^2$.

Most formulas are theorems, proved like any other. They stand in a band of their own because they are looked up and used as tools.

## Form

A **form** is a standard way of writing an object, chosen for what it shows at a glance.

> Vertex form, $y = a(x - h)^2 + k$, shows the vertex $(h, k)$ and the direction of opening, the sign of $a$.

The same parabola can be written in standard, vertex or factored form. Each says something the others hide.

## Technique

A **technique** is a method: a sequence of steps that is guaranteed to work on the problems it is meant for.

> Completing the square turns $ax^2 + bx + c$ into vertex form.

## Skill

A **skill** is something to be able to do, accurately and without looking it up. It is learned by practice, and its card has a quiz.

> Solve a quadratic equation by factoring.

## Heuristic

A **heuristic** is a rule of thumb: advice that often helps and guarantees nothing.

> Draw a picture. Try a smaller case. Work backwards from what is wanted.

A technique, applied correctly, always works. A heuristic only suggests where to look.

## Definition or theorem?

A definition is **chosen**; a theorem is **proved**. That, and not "if" against "if and only if", is the difference.

- A definition is always an "if and only if", even when written with "if".
- A theorem can be an "if and only if" too: a right triangle is exactly one whose sides satisfy $a^2 + b^2 = c^2$. That is the Pythagorean theorem together with its converse, and each half needs its own proof.

A quick test: ask "why is this true?" If the only answer is "because that is what the word means", it is a definition. If the answer is an argument, it is a theorem.

| | Definition | Theorem |
|---|---|---|
| Says | what a word means | that something is true |
| Can it be false? | no, only more or less useful | not once proved |
| Needs a proof? | no | yes |
| Logical form | always "if and only if" | any: "if … then", "if and only if", "there is", "for all" |
| Example | A *square* is a rectangle with four equal sides. | The diagonals of a square are perpendicular. |
