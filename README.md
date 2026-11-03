# Concept Atlas

**[▶ Run it](https://boris-volkov.github.io/concept_map/)**

A map of school mathematics, from counting to calculus, that shows what every idea is built on. It is a reference for tutoring: formal definitions, axioms and theorems, and tables of the formulas worth looking up.

Seven domains sit side by side, joined by arrows: Arithmetic, Algebra, Geometry, Trigonometry, Probability & Statistics, Linear Algebra and Calculus. Axioms, definitions, theorems, formulas and skills each carry their name, with axioms in gold, theorems in blue and definitions in green, and every arrow is a prerequisite.

On the map everything is a file, and everything opens where it sits, the way folders and files open in a file manager's tree. There is no side panel. A domain or a topic is a folder: click one and it opens into a frame around its topics or concepts. A concept is a file: click it and its card grows, in its own place, into its entry, and the map makes room around it. The entry gives the formal statement, lists the concept's prerequisites, and gives the whole chain behind it in an order it could be learned in. For *Adding Fractions* that chain runs back through the least common multiple to counting. Meanwhile the map lights up everything the concept rests on, in one colour, and everything that rests on it, in another. The *i* on an open topic's frame opens the topic's README at the top of the frame: what the topic is about, and how it joins the rest of the map.

Two more files sit before the domains, at the top left of the map: an index of every concept, and a ranking of them, the way a search engine ranks pages: a concept scores high when concepts that score high build on it. The ranking is laid out as a tier list, and the top tier, the *super-concepts* such as Fractions, Variables and Function Notation, carry a red star on the map. Each concept's entry gives its place in the ranking, which opens the ranking there.

Some concepts carry a small quiz, at the end of their entry; the **?** on a concept's card opens the concept at its quiz. Getting every question right on the first try marks the concept as mastered. Progress is kept in the student's own browser: topics fill a thin bar as their concepts are mastered, and an entry suggests what to learn next.

Every concept has its own address, like `#adding-fractions`, so a link can take a student straight to one, opened.

## Using it

Drag to move around and scroll (or pinch) to zoom. Click a domain, topic or concept to open it where it sits, and click its head, or the × on it, to close it again; any number can be open at once. **Open all** opens every topic, and **Close all** closes everything.

| Key | |
| --- | --- |
| `/` | search |
| `Esc` | close the selected concept (or topic README), or let go of the selection |
| `+` `−` `0` | zoom in, zoom out, fit everything |
| `H` | close everything (the **Close all** button) |
| `I` | go to the index, or close it |
| `R` | go to the ranking, or close it |

## Adding to it

All the mathematics lives in [content/](content/), as one Markdown outline per domain. Headings are concepts, nesting is containment, and a `prereqs:` line draws the arrows:

```markdown
### Adding Fractions
kind: skill
prereqs: equivalent-fractions, lcm

Fractions can only be added when they count pieces of the same size…
```

[content/README.md](content/README.md) explains the whole format: ids, prerequisites, kinds, math, links, embeds and quizzes.

To see your changes as you write, run this in the project folder:

```bash
python serve.py
```

and open [localhost:8000](http://localhost:8000). The map redraws whenever you save a content file. Mistakes such as a misspelled prerequisite or a loop show up in a **content problems** button, with the file, the line, and the id you probably meant.

The map has to be served this way, or from the web, rather than opened as a file, because browsers won't let a page read the files beside it from the disk.

## Publishing

It is a static site, so GitHub Pages can serve it as it is: push the folder to a repository and, under **Settings → Pages**, deploy from the main branch's root. The empty `.nojekyll` file makes GitHub serve the content files as they are.

## How it works

No build step and no dependencies. Everything the page needs is in this folder.

- `content.js` reads [content/index.md](content/index.md) and the files it links to, turns each outline into a tree of concepts, and checks it: unknown ids, duplicates, quizzes without a right answer, and prerequisite loops, found with a depth-first search.
- `model.js` answers questions about the graph: everything a concept builds on (its own prerequisites, plus the prerequisites written on the topics around it, plus everything inside any topic it names), and the arrows to draw when topics are closed. Only the most direct prerequisites get arrows: one is left out when another prerequisite of the same concept already leads to it (a transitive reduction, which removes about one arrow in nine). Arrows only join neighbours, the children of one open topic, so none ever crosses a topic's border: a prerequisite in another topic is carried by one arrow between the two topics, its weight showing how many prerequisites it stands for. A selected concept also gets its own links to other topics drawn, wherever they lead. Concepts never loop, but topics can: Polynomials builds on Complex Numbers and Complex Numbers on Polynomials. Such topics are *intertwined* (a strongly connected component, found with Tarjan's algorithm); they sit side by side and share one dashed two-way link instead of arrows in both directions. It also ranks the concepts with PageRank: each concept hands its score on to the concepts it directly builds on, split evenly between them (a topic named as a prerequisite shares its part among everything inside it), and 15% of every score, with whatever reaches a starting point like Counting, is spread evenly over them all. Scores are multiples of the average: four times it or more makes a super-concept (tier S), then twice (A), once (B) and half (C); D is the rest, and the concepts nothing builds on are endpoints.
- `layout.js` lays each open topic out as a layered drawing. It first finds an order that keeps the arrows pointing one way, reversing as little arrow weight as possible (the greedy heuristic of Eades, Lin and Smyth). Then it assigns layers, reorders each layer to uncross the arrows, and places every card as close to its neighbours as the cards beside it allow, solved exactly by pooling adjacent violators. Columns that get too crowded wrap. The flow alternates with depth: the domains run across, each domain's topics run down, each topic's concepts run across, so the map stays roughly as wide as it is tall however much of it is open. A topic's layout depends only on the arrows inside it, so opening one never reshuffles another. An open concept is laid out like any other card, only bigger, and an open README takes the top of its topic's frame.
- `map.js` draws the cards as HTML and the arrows as SVG. Speed comes first, so nothing on the page animates: a new layout is applied at once, and every new card is put in place before any is measured, so the browser lays the page out once rather than once per card. Opening every topic together, about 400 cards and 650 arrows, takes around 50 ms. An open concept is the same element as its card, rewritten as its entry. It is watched, so that when its quiz moves on or a list in it unfolds, the map makes room at once, while the entry being read stays still on the screen. A formula too wide for an entry widens the entry rather than hide behind a scroll bar, since on the map a drag moves the map.
- `camera.js` does the pan and zoom. The whole map is one GPU layer, so panning slides a finished picture and after a zoom it is redrawn once, sharp, at the new scale. The grid lives inside that layer and the arrows take no part in hit-testing, so moving around costs almost nothing per frame. Tabbing to a link that is off screen moves the map to it.
- `docs.js` writes what an open file shows: a concept's entry, a topic's README, the index and the ranking. `search.js` and `quiz.js` are what their names say; `progress.js` keeps mastery in the browser's local storage.
- `markdown.js` is a small Markdown renderer, and `tex.js` translates the LaTeX between dollar signs into MathML, which browsers draw natively. So the formulas need no math library either.
