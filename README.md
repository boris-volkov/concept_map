# Concept Atlas

**[▶ Run it](https://boris-volkov.github.io/concept_map/)**

A map of school mathematics, from logic and counting to calculus, that shows what every idea is built on. It is a reference for tutoring: formal definitions, axioms and theorems, and tables of the formulas worth looking up.

Nine domains stand in rows, each a row below the furthest of those it builds on, so that going down the map is going deeper into mathematics: Arithmetic beside Logic at the top, then Algebra beside Set Theory, then Geometry beside Probability & Statistics, then Trigonometry, and Linear Algebra beside Calculus at the bottom. Domains side by side don't build on each other. The arrows between them run down the gaps between the cards. Axioms, definitions, theorems, rules of inference, formulas and skills each carry their name, with axioms in gold, theorems in blue and definitions in green, and every arrow is a prerequisite.

On the map everything is a file, and everything opens beside or in place of its card, the way folders and files open in a file manager. A domain or a topic is a folder. Click a domain and its frame floats out to the right of the domains, level with its card, which moves to the end of its row and stays tied to the frame, so the arrows between the domains never cross it; click a topic and it opens where it sits into a frame around its concepts. A concept is a file: click it and its card grows, in its own place, into its entry, and the map makes room around it. The entry is the content alone: the formal statement and what follows it, and any exercises. The arrows say what it is connected to, as the map lights up everything the concept rests on, in one colour, and everything that rests on it, in another. The *i* on an open concept spells the connections out: its prerequisites, what builds on it, and the whole chain behind it in an order it could be learned in. For *Adding Fractions* that chain runs back through the least common multiple to counting. The *i* on an open topic's frame opens the topic's README at the top of the frame: what the topic is about, and how it joins the rest of the map.

The **Index** button opens a list of every concept, domain by domain, in a panel beside the map, which moves over to make room for it. Choose a concept there and the map opens it where it sits. On a phone the index covers the map instead, and goes away when a concept is chosen.

Any concept can be made into a flashcard: the card button on the head of an open concept adds it to the deck, and takes it out again. The **Flashcards** button at the top right opens the deck, one card at a time, with the concept's name on the front and its entry, exactly as the map shows it, on the back. Click a card or press Space to turn it over, the arrow keys move through the deck, and **Shuffle** mixes it. Like mastery, the deck is kept in the student's own browser.

Some concepts carry a small quiz, at the end of their entry; the **?** on a concept's card opens the concept at its quiz. Getting every question right on the first try marks the concept as mastered, and so does the button under its *i*. Progress is kept in the student's own browser: topics fill a thin bar as their concepts are mastered, and the *i* on a concept suggests what to learn next.

Every concept has its own address, like `#adding-fractions`, so a link can take a student straight to one, opened.

## Using it

Drag to move around and scroll (or pinch) to zoom. Click a domain, topic or concept to open it; any number can be open at once. The × on an open domain or topic closes it, and so does clicking a domain's card again, while clicking the head of its frame selects it, lighting up what it builds on and what builds on it. An open concept or a topic's README is selected, in the same way, by a click anywhere on it, its head included; everything that opens closes with its ×. The **+** on an open domain or topic opens everything inside it, every topic and every concept's entry, **Open all** opens every topic on the map, and **Close all** closes everything.

| Key | |
| --- | --- |
| `/` | search |
| `Esc` | close the selected concept's *i*, then the concept (or a topic's README), or let go of the selection |
| `+` `−` `0` | zoom in, zoom out, fit everything |
| `H` | close everything (the **Close all** button) |
| `I` | open or close the index |
| `F` | open or close the flashcards; then Space turns a card over, and ← → move through the deck |

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
- `model.js` answers questions about the graph: everything a concept builds on (its own prerequisites, plus the prerequisites written on the topics around it, plus everything inside any topic it names), and the arrows to draw when topics are closed. Only the most direct prerequisites get arrows: one is left out when another prerequisite of the same concept already leads to it (a transitive reduction, which removes about one arrow in nine). Arrows only join neighbours, the children of one open topic, so none ever crosses a topic's border: a prerequisite in another topic is carried by one arrow between the two topics, its weight showing how many prerequisites it stands for. A selected concept also gets its own links to other topics in its domain drawn, wherever they lead; its links to other domains are carried by the arrows between the domains, which light up for it. Concepts never loop, but topics can: Polynomials builds on Complex Numbers and Complex Numbers on Polynomials. Such topics are *intertwined* (a strongly connected component, found with Tarjan's algorithm). Two that each build directly on the other share one two-way arrow, with a head at each end, instead of an arrow each way; it is drawn like any other arrow, and for the layout it runs from the one built on more. It also ranks the concepts with PageRank: each concept hands its score on to the concepts it directly builds on, split evenly between them (a topic named as a prerequisite shares its part among everything inside it), and 15% of every score, with whatever reaches a starting point like Counting, is spread evenly over them all. Scores are multiples of the average: four times it or more makes a super-concept (tier S), then twice (A), once (B) and half (C); D is the rest, and the concepts nothing builds on are endpoints. The ranking isn't shown on the page for now.
- `layout.js` lays the domains out as a small layered drawing of their own: each a row below the furthest of those it builds on, the rows ordered to uncross the arrows. An arrow that skips rows gets a passing point in each row between, set into the row like a very narrow card, so that it runs down a gap between the cards rather than behind one (the dummy nodes of a Sugiyama drawing). An open domain floats its frame out to the right of all the cards, level with its row, which grows as tall as the frame, and its card keeps its place in its row; the arrows between domains stay among the cards and never cross a frame. Inside a domain, a topic that holds topics fills columns across the page, each box going to the column holding the fewest concepts so far, reckoned from what the boxes hold and never their sizes, so that an open domain comes out wide and a box always keeps its column. A topic that holds concepts is laid out as a layered drawing. It first finds an order that keeps the arrows pointing one way, reversing as little arrow weight as possible (the greedy heuristic of Eades, Lin and Smyth); an arrow it has to reverse, which closes a loop of intertwined topics, is drawn pointing back up the flow, and lighter. Then it assigns layers and reorders each layer to uncross the arrows. Layers that get too crowded wrap, by the number of boxes alone. Cards line up at the start of their rows and columns, so whatever opens pushes only what lies after it, right and down, and everything above and to the left stays still. A topic's layout depends only on the arrows inside it, so opening one never reshuffles another. An open concept is laid out like any other card, only bigger, and an open README takes the top of its topic's frame.
- `map.js` draws the cards as HTML and the arrows as SVG. Speed comes first, so nothing on the page animates: a new layout is applied at once, and every new card is put in place before any is measured, so the browser lays the page out once rather than once per card. Opening every topic together, about 400 cards and 650 arrows, takes around 50 ms. An open concept is the same element as its card, rewritten as its entry. It is watched, so that when its quiz moves on or a list in it unfolds, the map makes room at once, while the entry being read stays still on the screen. A formula too wide for an entry widens the entry rather than hide behind a scroll bar, since on the map a drag moves the map.
- `camera.js` does the pan and zoom. The whole map is one GPU layer, so panning slides a finished picture and after a zoom it is redrawn once, sharp, at the new scale. The grid lives inside that layer and the arrows take no part in hit-testing, so moving around costs almost nothing per frame. Tabbing to a link that is off screen moves the map to it.
- `docs.js` writes what an open file shows, a concept's entry and what its *i* adds or a topic's README, and the index. `search.js` and `quiz.js` are what their names say; `progress.js` keeps mastery in the browser's local storage, and `deck.js` the flashcards, which `flashcards.js` shows.
- `markdown.js` is a small Markdown renderer, and `tex.js` translates the LaTeX between dollar signs into MathML, which browsers draw natively. So the formulas need no math library either, and `graph.js` draws the small graphs of the functions as SVG, from a few lines in the content files: a curve, a window and the points to label.
