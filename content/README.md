# Writing the atlas

Everything on the map comes from the Markdown files in this folder. There is nothing to compile: save a file and the map redraws (when it is running from `python serve.py`; see the main README). This file is not part of the map; only the files linked from [index.md](index.md) are.

## The shape of a file

Each file is one **domain**, written as an outline. The heading level says what is inside what:

```markdown
# Arithmetic                      ← a domain: one per file
color: #a06a1c

Numbers and the four operations.  ← its description, shown on its card

## Fractions                      ← a topic inside Arithmetic

Parts of a whole, and the arithmetic of parts.

### Adding Fractions              ← a concept inside Fractions
kind: skill
prereqs: equivalent-fractions, lcm

Fractions can only be added when they count pieces of the same size…
```

A heading with headings under it is a **topic**: it shows as a card that opens up to reveal what's inside. A heading with nothing under it is a **concept**: a card that opens, in its place on the map, into its entry. You can nest as deep as `######`, so a topic can hold smaller topics.

The first paragraph under a heading is its summary, shown on cards and in search results. Everything after that is the explanation, shown when the concept is opened. A topic's text is its README, which the *i* on its open frame shows at the top of the frame.

The atlas is a reference for tutoring, so entries favour formal statements over casual explanation. For an **axiom**, **theorem**, **definition**, **formula**, **form**, **property**, **heuristic** or **rule**, the first paragraph is its formal statement, and for a **skill** its method, and the entry sets it in a box: gold for axioms, blue for theorems (with the statement in italics), green for definitions, red for skills, violet for heuristics. Each domain keeps all of its axioms together in one topic, `## Axioms`, at the top of its file; a topic that holds nothing but axioms is gilded on the map. Where a subject can be founded in more than one way, give each axiom system a topic of its own inside `## Axioms`, side by side, as Geometry does with Euclid's, Hilbert's and others. Theorems proved from them belong in other topics. Write the statement with no blank line inside it: it may include displayed formulas, and it may end with a list, such as numbered axioms. Proofs, examples and remarks follow after a blank line.

```markdown
### Mean Value Theorem {#mvt}
kind: theorem
prereqs: rolles-theorem

If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then for some $c \in (a, b)$:
$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

Geometrically: some tangent is parallel to the secant.
```

## Ids

Every concept has an id, which is how other concepts refer to it. By default it is the title in lowercase with dashes, dropping a leading "The", "A" or "An", with "&" read as "and":

| Title | Id |
| --- | --- |
| Adding Fractions | `adding-fractions` |
| The Unit Circle | `unit-circle` |
| Adding & Subtracting Integers | `adding-and-subtracting-integers` |
| L'Hôpital's Rule | `lhopitals-rule` |

To choose the id yourself, put it in braces at the end of the heading:

```markdown
### Least Common Multiple {#lcm}
```

Ids have to be unique across the whole atlas. The id is also the concept's web address (`…/#lcm`), so a link you send a student keeps working as long as the id doesn't change. **If you rename a concept that other concepts depend on, keep its old id** with `{#old-id}` and nothing else needs to change.

## Lines under a heading

Right under a heading, before the summary, these lines describe it. All are optional.

| Line | Meaning |
| --- | --- |
| `prereqs: lcm, equivalent-fractions` | What this builds on, by id. The map draws these as arrows. |
| `kind: theorem` | A label on the card: `definition`, `axiom`, `property`, `theorem`, `formula`, `form` (a way of writing something, and what it shows), `heuristic` (a rule of thumb: useful and approximate, or a convention, rather than a fact), `rule` (of inference), `skill` or `technique`. Leave it out for a plain concept. |
| `color: #8f2d2d` | The colour of this domain or topic and everything inside it. Usually only on the `#` heading. |
| `summary: …` | A summary, when the first paragraph won't do. |
| `tags: grade-6, exam` | Extra words for the search box to find. |
| `flow: down` | On a topic: lay its contents out top to bottom (or `flow: across`, left to right), instead of the usual alternation. Good for a topic that is one long chain. |
| `wrap: 4` | On a topic: lay its contents out at most 4 to a line, in the order written, as the field axioms are (C A N I / C A N I / D). Without it the map arranges a topic by its arrows. |
| `rows: kinds` | On a topic: lay its contents out in rows by kind, in the order written, whatever the arrows say: theorems on top, then definitions and properties, then forms and formulas, then skills and techniques. Use it with `flow: down` and a `wrap:`, as Quadratics does, for a topic that reads best as a reference sheet. Its cards draw their arrows only when one is selected. |
| `id: lcm` | The same as `{#lcm}` on the heading. |
| `parent: algebra` | Only on a file's `#` heading: put this file's contents inside another topic (see *Splitting a big domain*). |

## Prerequisites

A prerequisite is something a concept **cannot be stated, done or proved without**, not something usually taught first or merely related to it. A square root needs multiplication, not exponents: $\sqrt{9} = 3$ because $3 \times 3 = 9$, and a student can do that before ever seeing $3^2$. Ask the test of each one. For a skill, could a student do it without this? For a definition, could it be stated without this? For a theorem, does its proof use this? So a skill does not list the axioms behind it, a definition does not list what its examples happen to use, and what only some uses of a concept need goes on those uses: graphing belongs on *Solving by Graphing*, not on *Systems of Linear Equations*.

List only what a concept **directly** builds on. "Adding Fractions" needs "Least Common Multiple"; it doesn't need to list "Multiplication" too, because LCM already builds on multiplication, and the *Full chain of prerequisites*, under the *i* on an open concept, follows the whole chain back to counting. If you do list one that another prerequisite already leads to, the map leaves its arrow out, and so does the *Prerequisites* list under the *i*, so an extra prerequisite never adds clutter.

A prerequisite can be a whole topic, `prereqs: fractions`, which means everything in it. A prerequisite on a topic applies to everything inside the topic. Use both sparingly: arrows between single concepts say more.

Two things are not allowed, and are reported if they happen: a concept can't require the topic it sits in (or something inside itself), and prerequisites can't go round in a loop.

## Explanations

The text under the summary is ordinary Markdown: `**bold**`, `*italic*`, lists, tables, `> quotes` (good for examples and warnings), `[links](https://…)` and images, `![a diagram](images/diagram.png)`.

**Math** goes between dollar signs, in LaTeX: `$\frac{1}{4}$` inline, or on its own lines between `$$`:

```markdown
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

Fractions, roots, powers, Greek letters, `\sin`, `\lim`, `\int`, `\sum`, `\begin{cases}`, matrices and the like all work. A command the atlas doesn't know is drawn in red, and can be added to the lists at the top of `js/tex.js`. For a literal dollar sign, write `\$5`.

**One thing to a line.** Give every equation that stands on its own (a result, an example, a step) a line of its own between `$$`, and keep inline math for symbols and conditions inside a sentence, like "for $b \ne 0$". Equations that belong together, such as a set of laws or the steps of a derivation, go one to a line in an `aligned` block, lined up at `&`:

```markdown
$$\begin{aligned} 3(x - 2) &= x + 4 \\ 3x - 6 &= x + 4 \\ x &= 5 \end{aligned}$$
```

Anything that is a list is written as one: `1.` for steps and numbered axioms, `-` for the rest.

**Methods** with a standard procedure state it as numbered steps, as the first thing in the entry, so that it is set in the box. A warning goes straight after, as a quote starting with `**!**`, and an example after that:

```markdown
1. identify which rate you know, and which one you need;
2. connect the two with an equation;
3. differentiate implicitly, usually with respect to time;
4. plug in for everything except what you are solving for.

> **!** Do not plug in for variables before differentiating.

**Example.** ...
```

**Proofs** start with `*Proof.*` and end with `$\square$`. To give the reason for each step beside it, add a column after `&&` in an `aligned` block:

```markdown
$$\begin{aligned} a &= a \cdot 1 && \text{neutral element} \\ &= a(cc^{-1}) && \text{inverses} \end{aligned}$$
```

Or set a proof out as a table, with a *Statement* and a *Reason* column. Inside a table, write a link as `[[id]]`, without words of its own, since a `|` there starts a new column. A theorem's prerequisites are the axioms and theorems its proof uses, so that its arrows show how the proofs build on one another, as in Algebra's *Consequences of the Axioms*.

**Links to other concepts**: `[[lcm]]` becomes a link titled "Least Common Multiple", and `[[lcm|the LCM]]` uses your own words.

**Embeds**: raw HTML passes through, so an interactive graph can sit in a concept:

```html
<iframe src="https://www.desmos.com/calculator/abcdef1234?embed"></iframe>
```

## Graphs

A small graph is a fenced block marked `graph`, drawn where it stands in the explanation:

````markdown
The parent quadratic function, $y = x^2$:
```graph
y = x^2
x: -2.5, 2.5
y: -1, 4
point: -1, 1 below-left
point: 0, 0 below-right
point: 1, 1 below-right
```
````

| Line | Meaning |
| --- | --- |
| `y = x^2` | A curve. Write `2*x` or `2x`, `x^2`, and `sqrt`, `cbrt`, `abs`, `exp`, `ln`, `log` (base 10), `log2`, `sin`, `cos`, `tan`, `arcsin`, `arccos`, `arctan`, with `pi` and `e`. Several curves can share a graph; add `\| faint` or `\| dashed` to draw one lighter. The first is drawn on top. |
| `x: -2.5, 2.5` and `y: -1, 4` | The window. Both are needed. |
| `point: 1, 1 below-right` | A dot, labelled with its coordinates, or with a label of your own in quotes: `point: 2, 1/2 "(2, ½)" above-right`. The label goes `right` (the default), `left`, `above`, `below`, `above-right`, `above-left`, `below-right` or `below-left` of the dot. |
| `asymptote: x = 0` | A dashed line, `x = …` upright or `y = …` level. |
| `grid: pi/2, 1` | The spacing of the grid lines across and up; `grid: none` leaves them out. |
| `size: 280, 200` | The size in pixels. Without it the graph is 280 wide, and as tall as keeps the two scales equal, within limits. |
| `circle: 0, 0, 1`, `segment: 0, 0, 1, 1`, `arc: 0, 0, 0.25, 0, 0.9`, `label: 0.5, 0 "cos θ" below` | For diagrams such as the unit circle: a circle by centre and radius, a line between two points (`\| dashed` too), an arc by centre, radius and the angles it runs between in radians, and a piece of text. |

Any number can be an expression, like `pi/2` or `cos(0.9)`. A graph that can't be read shows up in **content problems**, like a broken quiz.

## Quizzes

A quiz is a fenced block marked `quiz`, anywhere in a concept's explanation. It is drawn at the end of the concept's entry, and a small **?** appears on the concept's card, which opens the concept right there, at its quiz.

````markdown
```quiz
Q: What is $\operatorname{lcm}(4, 6)$?
- 2
+ 12
- 24
Hint: List the multiples of 6.
Why: 6, **12**: and 4 divides 12.

Q: $\frac{1}{4} + \frac{1}{6} = \;?$
A: 5/12
```
````

- `Q:` starts a question. The question can run over several lines.
- Lines starting `-` are wrong choices and `+` the right one.
- Or `A:` asks for a typed answer instead.
  - A number also accepts any equal form: `A: 5/12` accepts `10/24`, and a correctly rounded decimal like `0.417`.
  - A decimal answer matches to the precision you write it: `A: 2.65` accepts anything that rounds to 2.65. For a tolerance of your own, `A: 3.14 ± 0.01`.
  - Text is compared ignoring capitals and spacing. Separate alternatives with `|`: `A: commutative | commutativity`.
- `Hint:` shows after a wrong try; `Why:` shows after the right answer.

A student who gets every question right on the first try has the concept marked as mastered. Progress is saved in their own browser; it is never sent anywhere.

## Adding a domain, or splitting a big one

To add a domain, create a file here, start it with a `#` heading, and add a link to it in [index.md](index.md). The order of the links is the order the map reads them in; the layout itself follows the arrows.

When a domain's file grows long, move a topic to a file of its own. Make its heading a `#` heading, say where it belongs, and link the new file from index.md:

```markdown
# Infinite Series
parent: calculus

## Series & Convergence
…
```

## Notes to yourself

Anything inside `<!-- … -->` is ignored, including whole headings. Comment out a concept that isn't ready:

```markdown
<!--
### Conic Sections in Polar Form
prereqs: polar-coordinates, conics
-->
```

## When something is wrong

Mistakes never break the map. A misspelled prerequisite, two concepts with the same id, a quiz with no right answer or a loop of prerequisites shows up in a **content problems** button at the bottom left of the map. Each one gives the file and line and, for a misspelled id, the one you probably meant.
