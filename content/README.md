# Writing the atlas

Everything on the map comes from the Markdown files in this folder. There is nothing to compile: save a file and the map redraws (when it is running from `python serve.py`; see the main README). This file is not part of the map; only the files linked from [index.md](index.md) are.

Small changes don't need this file at all: when the map is running from `python serve.py`, the **Edit** button on an open concept and the **Add** button on an open topic open a form that writes the Markdown for you (see the main README). What follows is the format it writes, for everything the form doesn't cover: tables, graphs, diagrams, and moving things around.

## The shape of a file

Each file is one **subject**, written as an outline. The heading level says what is inside what:

```markdown
# Arithmetic                      ← a subject: one per file
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

The atlas is a reference for tutoring, so entries favour formal statements over casual explanation. For an **axiom**, **theorem**, **definition**, **formula**, **form**, **property**, **heuristic** or **rule**, the first paragraph is its formal statement, and for a **skill** its method, and the entry sets it in a box: gold for axioms, blue for theorems, green for definitions, red for skills, violet for heuristics. Each subject keeps all of its axioms together in one topic, `## Axioms`, at the top of its file, and that topic stands first in its subject, whatever it builds on; a topic that holds nothing but axioms is gilded on the map. Where a subject can be founded in more than one way, give each axiom system a topic of its own inside `## Axioms`, side by side, as Geometry does with Euclid's, Hilbert's and others. Theorems proved from them belong in other topics. Write the statement with no blank line inside it: it may include displayed formulas, and it may end with a list, such as numbered axioms. Proofs, examples and remarks follow after a blank line.

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
| `prereqs: lcm, equivalent-fractions` | What this builds on, by id. It decides where this stands, a row below what it builds on. Selecting it lights these up, and its tree of prerequisites draws them as lines. |
| `kind: theorem` | A label on the card: `definition`, `axiom`, `property`, `theorem`, `formula`, `form` (a way of writing something, and what it shows), `heuristic` (a rule of thumb: useful and approximate, or a convention, rather than a fact), `rule` (of inference), `skill` or `technique`. Leave it out for a plain concept. |
| `color: #8f2d2d` | The colour of this subject or topic and everything inside it. Usually only on the `#` heading. |
| `summary: …` | A summary, when the first paragraph won't do. |
| `tags: grade-6, exam` | Extra words for the search box to find. |
| `wrap: 4` | On a topic: lay its contents out at most 4 to a row across the page, in the order written, as the field axioms are (C A N I / C A N I / D). Without it, each row of a topic is a level, and a crowded one wraps by itself. |
| `rows: kinds` | On a topic: lay its contents out in rows by kind, in the order written, whatever the prerequisites say: theorems on top, then definitions and properties, then forms and formulas, then skills and techniques. Use it with a `wrap:`, as Quadratics does, for a topic that reads best as a reference sheet. A topic of 12 cards or fewer runs on in balanced rows, still in that order. |
| `id: lcm` | The same as `{#lcm}` on the heading. |
| `built-on: algebra, trigonometry` | On a subject, or a topic directly inside one, naming others beside it: what someone studying alone really couldn't learn it without. These alone set its row and the lines around it (see *Prerequisites*). |
| `parent: algebra` | Only on a file's `#` heading: put this file's contents inside another topic (see *Splitting a big subject*). |

## Prerequisites

A prerequisite is something a concept **cannot be stated, done or proved without**, not something usually taught first or merely related to it. A square root needs multiplication, not exponents: $\sqrt{9} = 3$ because $3 \times 3 = 9$, and a student can do that before ever seeing $3^2$. Ask the test of each one. For a skill, could a student do it without this? For a definition, could it be stated without this? For a theorem, does its proof use this? So a skill does not list the axioms behind it, a definition does not list what its examples happen to use, and what only some uses of a concept need goes on those uses: graphing belongs on *Solving by Graphing*, not on *Systems of Linear Equations*.

A `built-on:` line, on a subject or on a topic directly inside one, asks a different question: could someone studying alone get through this without that? Not whether it is usually taught first, and not whether a few concepts cite it. Calculus can't be learned without Algebra and Trigonometry, but Geometry can be learned without Algebra, even though *Coordinate Geometry* needs it: that is what `prereqs:` on those concepts is for.

List only what a concept **directly** builds on. "Adding Fractions" needs "Least Common Multiple"; it doesn't need to list "Multiplication" too, because LCM already builds on multiplication, and the *Full chain of prerequisites*, under the *i* on an open concept, follows the whole chain back to counting. If you do list one that another prerequisite already leads to, the *Prerequisites* list under the *i* leaves it out, and so does the tree of prerequisites, so an extra prerequisite never adds clutter.

A prerequisite can be a whole topic, `prereqs: fractions`, which means everything in it. A prerequisite on a topic applies to everything inside the topic. Use both sparingly: prerequisites between single concepts say more.

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

**Reference tables**: a line starting `: ` right above a table is its title, and makes it a ruled reference table, as in *Table of Derivatives*. Leave the head row empty for a list of identities, with no head and its columns set close, and line the equals signs up in a column of their own. Keep each table short, since a table is never split between columns: several small titled tables read better than one long one. Inside a table, write absolute values with `\lvert` and `\rvert`, as a `|` starts a new column.

```markdown
: Pythagorean
| | | |
| ---: | :-: | :--- |
| $\sin^2\theta + \cos^2\theta$ | $=$ | $1$ |
```

A table cell can hold a small graph, written with semicolons for line breaks: `{{ y = x^2; x: -3, 3; y: -1, 5 }}`. It takes the same lines as a graph block, as in *Table of Parent Functions*.

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

Or set a proof out as a table, with a *Statement* and a *Reason* column. Inside a table, write a link as `[[id]]`, without words of its own, since a `|` there starts a new column. A theorem's prerequisites are the axioms and theorems its proof uses, so that its tree of prerequisites shows how the proofs build on one another, as in Algebra's *Consequences of the Axioms*.

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

## Diagrams of graphs

A graph in the other sense, of vertices and edges, is a fenced block marked `network`. For one of the usual graphs, its name is enough; otherwise list its edges:

````markdown
```network
K5
```

```network
edges: a-b-c-a c-d
heavy: a-b b-c
```
````

| Line | Meaning |
| --- | --- |
| `K5`, `K3,3`, `K2,2,2`, `C6`, `P4`, `W6`, `E4`, `Q3`, `grid 3,4`, `Petersen` | A family: complete, complete bipartite or multipartite, a cycle, a path, a wheel of 6 vertices, 4 vertices with no edges, a hypercube, a grid, the Petersen graph. `tetrahedron`, `cube`, `octahedron`, `dodecahedron` and `icosahedron` are drawn flattened, with no crossings. Vertices are numbered from 1. |
| `edges: a-b b-c` | Edges. `a-b-c` is a path of them, `a>b` an arc, `a-a` a loop and `a-b:4` a weight. An edge listed twice is drawn twice, so a multigraph needs nothing special. With a family, these are added to it. |
| `vertices: x y` | Vertices with no edges. |
| `remove: 1-2 2-3` | Takes edges out of a family. |
| `names: a b c d` | Renames a family's vertices in order, and shows the names. |
| `layout: circle` | `circle`, the usual one, `line`, `tree` with the first vertex as the root, `two-rows` for the two sides of a bipartite graph, or `spring`, a force-directed drawing. |
| `at: a(0,0) b(2,0) c(1,sqrt(3))` | Puts vertices exactly where they are wanted, with y upwards. Any number can be an expression. |
| `heavy: a-b b-c` | Draws edges in the colour of the subject, and the others lighter. |
| `path: a b c a` | The same, along a walk. |
| `dashed: a-b` | Draws edges dashed. |
| `mark: a c` | Picks out vertices in the colour of the subject. |
| `classes: a c / b d` | Colours the vertices, class by class. |
| `edge-classes: a-b c-d / b-c` | Colours the edges in the same way. |
| `labels: all` or `labels: none` | Shows or hides the names of the vertices. They are shown for an edge list and hidden for a family. |
| `label: 1, 0.5 "f₁" right` | Writes text on the diagram, such as the name of a face, as in a graph block. |
| `size: 200, 120` | The size in pixels. Without it the diagram comes out at about 150 across. |
| `caption: $C_5$` | A line under the diagram, which may hold math. |
| `---` | Starts another diagram beside the first, in the same block. |

A table cell or a quiz question can hold a small one, written with semicolons for line breaks, as in *Table of Graph Families*: `{{ network: K5 }}`. In a quiz, give it a line of its own, and a size if it should be larger: `{{ network: C5; size: 130, 120 }}`.

An edge or a vertex that isn't in the graph shows up in **content problems**, so a `heavy:` or `path:` line can't quietly point at nothing. That makes it worth using `classes:` and `path:` for what a diagram claims: a colouring or a walk that is written out is checked.

## Cycles of addition

A fenced block marked `cycles` draws the numbers modulo $n$ round a circle, with an arrow from each $x$ to $x + a$ and a colour for each cycle. It is the one drawing a reader can change: a slider and a box set each of the two numbers. It is used in *Cycles of Addition*, in Number Theory.

````markdown
```cycles
n: 12
add: 5
```
````

| Line | Meaning |
| --- | --- |
| `n: 12` | The modulus the drawing starts with. |
| `add: 5` | The number added, from 0 to $n - 1$. |
| `max: 60` | The largest modulus that can be chosen: 60 unless it says, and at most 120. |
| `size: 320` | The width in pixels. |

A block that can't be read shows up in **content problems**.

## Drawings of shapes

A plane figure or a solid is drawn by its name, with the letters its formulas use, in a table cell or on a line of its own, as in *Table of Areas & Volumes*:

```markdown
| Cone | {{ shape: cone }} | $\dfrac{1}{3}\pi r^2 h$ |
```

| Kind | Names |
| --- | --- |
| Triangles | `triangle`, `right-triangle`, `isosceles-triangle`, `equilateral-triangle`, `triangle-two-sides`, `triangle-two-angles`, `triangle-three-sides`, `triangle-vertices`, `triangle-incircle`, `triangle-circumcircle` |
| Quadrilaterals | `square`, `rectangle`, `parallelogram`, `rhombus`, `trapezoid`, `kite`, `quadrilateral`, `cyclic-quadrilateral` |
| Regular polygons | `regular-polygon-side`, `regular-polygon-apothem`, `regular-polygon-radius`, `pentagon`, `hexagon`, `octagon`, `decagon`, `dodecagon` |
| Curved regions | `circle`, `semicircle`, `sector`, `circular-segment`, `annulus`, `annular-sector`, `ellipse`, `parabolic-segment` |
| Prisms and cylinders | `cube`, `box`, `prism`, `triangular-prism`, `hexagonal-prism`, `oblique-prism`, `cylinder`, `hollow-cylinder`, `oblique-cylinder` |
| Pyramids and cones | `pyramid`, `square-pyramid`, `cone`, `cone-frustum`, `pyramid-frustum` |
| Round solids | `sphere`, `hemisphere`, `spherical-cap`, `spherical-segment`, `spherical-sector`, `spherical-shell`, `ellipsoid`, `paraboloid`, `torus` |
| Regular solids | `tetrahedron`, `cube`, `octahedron`, `dodecahedron`, `icosahedron` |

A name that isn't one of these shows up in **content problems**. A new shape is a new entry in `SHAPES`, in `js/shape.js`.

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

## Adding a subject, or splitting a big one

To add a subject, create a file here, start it with a `#` heading, and add a link to it in [index.md](index.md). The order of the links is the order the map reads them in; the layout itself follows the prerequisites.

When a subject's file grows long, move a topic to a file of its own. Make its heading a `#` heading, say where it belongs, and link the new file from index.md:

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
