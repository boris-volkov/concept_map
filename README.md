# Concept Atlas

**[▶ Run it](https://boris-volkov.github.io/concept_map/)**

A map of school mathematics, from counting to calculus, that shows what every idea is built on.

Seven domains sit side by side, joined by arrows: Arithmetic, Algebra, Geometry, Trigonometry, Probability & Statistics, Linear Algebra and Calculus. Click one and it opens into its topics; click a topic and it opens into its concepts. Axioms, definitions, theorems, formulas and skills each carry their name, and every arrow is a prerequisite. Click a concept and the map lights up everything it rests on, in one colour, and everything that rests on it, in another. The panel beside it explains the concept, lists its prerequisites, and gives the whole chain behind it in an order it could be learned in. For *Adding Fractions* that chain runs back through the least common multiple to counting.

Some concepts carry a small quiz. It opens on the map, attached to the concept's card, and also in the panel. Getting every question right on the first try marks the concept as mastered. Progress is kept in the student's own browser: topics fill a thin bar as their concepts are mastered, and the panel suggests what to learn next.

Every concept has its own address, like `#adding-fractions`, so a link can take a student straight to one.

## Using it

Drag to move around and scroll (or pinch) to zoom. Click a domain or topic to open it, and the × on its frame to close it.

| Key | |
| --- | --- |
| `/` | search |
| `Esc` | close the quiz, the panel or the selection |
| `+` `−` `0` | zoom in, zoom out, fit everything |
| `H` | back to the overview |
| `I` | an index of every concept |

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
- `model.js` answers questions about the graph: everything a concept builds on (its own prerequisites, plus the prerequisites written on the topics around it, plus everything inside any topic it names), and the arrows to draw when topics are closed. Only the most direct prerequisites get arrows: one is left out when another prerequisite of the same concept already leads to it (a transitive reduction, which removes about one arrow in nine). Arrows only join neighbours, the children of one open topic, so none ever crosses a topic's border: a prerequisite in another topic is carried by one arrow between the two topics, its weight showing how many prerequisites it stands for. A selected concept also gets its own links to other topics drawn, wherever they lead.
- `layout.js` lays each open topic out as a layered drawing. It first finds an order that keeps the arrows pointing one way, reversing as little arrow weight as possible (the greedy heuristic of Eades, Lin and Smyth). Then it assigns layers, reorders each layer to uncross the arrows, and places every card as close to its neighbours as the cards beside it allow, solved exactly by pooling adjacent violators. Columns that get too crowded wrap. The flow alternates with depth: the domains run across, each domain's topics run down, each topic's concepts run across, so the map stays roughly as wide as it is tall however much of it is open. A topic's layout depends only on the arrows inside it, so opening one never reshuffles another.
- `map.js` draws the cards as HTML and the arrows as SVG. Speed comes first, so nothing on the page animates: a new layout is applied at once, and every new card is put in place before any is measured, so the browser lays the page out once rather than once per card. Opening every topic together, about 400 cards and 650 arrows, takes around 50 ms.
- `camera.js` does the pan and zoom. The whole map is one GPU layer, so panning slides a finished picture and after a zoom it is redrawn once, sharp, at the new scale. The grid lives inside that layer and the arrows take no part in hit-testing, so moving around costs almost nothing per frame.
- `panel.js`, `search.js` and `quiz.js` are what their names say; `progress.js` keeps mastery in the browser's local storage.
- `markdown.js` is a small Markdown renderer, and `tex.js` translates the LaTeX between dollar signs into MathML, which browsers draw natively. So the formulas need no math library either.
