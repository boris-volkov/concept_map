# Graph Theory
color: #b3541e

Vertices joined by edges: the mathematics of networks, and of what connects to what.

## Graphs {#graph-basics}
flow: down
rows: kinds
wrap: 7

The objects of the subject: vertices, edges and degrees, and the ways of writing a graph down.

A graph records which things are joined to which, and nothing else: where its vertices are drawn, and how its edges bend, mean nothing. The word has nothing to do with the [[function-graphs|graph of a function]]. Everything here rests on sets of pairs, from Set Theory, and the counting is that of [[combinations]]. The rest of this domain assumes that a graph is finite and simple unless it says otherwise.

### Handshaking Lemma {#handshaking-lemma}
kind: theorem
prereqs: vertex-degree, sigma-notation

In every graph $G = (V, E)$:
$$\sum_{v \in V} \deg v = 2|E|.$$

*Proof.* Count the pairs $(v, e)$ in which $v$ is an end of the edge $e$. Vertex by vertex, there are $\sum \deg v$ of them. Edge by edge, there are $2|E|$, since every edge has two ends. $\square$

It holds for [[multigraph|multigraphs]] too, where a loop adds 2 to the degree of its vertex.

**Example.** Below, the degrees are $3, 3, 2, 2$, which sum to $10 = 2 \cdot 5$.

```network
edges: a-b b-c c-d d-a a-c
at: a(0,1) b(1,1) c(1,0) d(0,0)
```

```quiz
Q: A graph has degrees $4, 3, 3, 2, 2$. How many edges does it have?
A: 7
Hint: The degrees sum to twice the number of edges.
Why: $(4 + 3 + 3 + 2 + 2) / 2 = 7$.

Q: Can seven people each shake hands with exactly three of the others?
- Yes
+ No
Why: The degrees would sum to $21$, which is odd, and a sum of degrees is always even.
```

### Odd Vertices Come in Pairs {#odd-degree-vertices}
kind: theorem
prereqs: handshaking-lemma

In every graph, the number of vertices of odd degree is even.

*Proof.* The sum of all degrees is even by the [[handshaking-lemma|Handshaking Lemma]]. The vertices of even degree contribute an even amount, so the vertices of odd degree do too, and a sum of odd numbers is even only if there is an even number of them. $\square$

### Two Vertices of Equal Degree {#equal-degrees}
kind: theorem
prereqs: vertex-degree, pigeonhole-principle

Every simple graph with at least two vertices has two vertices of the same degree.

*Proof.* On $n$ vertices the degrees lie in $\{0, 1, \dots, n - 1\}$, but $0$ and $n - 1$ cannot both occur: a vertex of degree $n - 1$ is joined to every other. So the $n$ degrees take at most $n - 1$ values, and two agree by the [[pigeonhole-principle|pigeonhole principle]]. $\square$

### Most Edges on n Vertices {#edge-bound}
kind: theorem
prereqs: graph, combinations

A simple graph on $n$ vertices has at most $\binom{n}{2}$ edges, with equality only for $K_n$. The number of graphs on a fixed set of $n$ labelled vertices is
$$2^{\binom{n}{2}}.$$

*Proof.* There are $\binom{n}{2}$ pairs of vertices, and a graph on these vertices is a choice of which pairs are edges: two options for each pair. $\square$

```quiz
Q: How many graphs are there on the labelled vertices $\{1, 2, 3, 4\}$?
A: 64
Why: $\binom{4}{2} = 6$ possible edges, each present or not: $2^6 = 64$.
```

### Invariants of Isomorphism {#graph-invariants}
kind: theorem
prereqs: graph-isomorphism, degree-sequence

Isomorphic graphs have the same number of vertices, the same number of edges and the same degree sequence, and an isomorphism carries a vertex to a vertex of the same degree. The converse fails: equal invariants do not make two graphs isomorphic.

*Proof.* A bijection $f$ preserving adjacency maps the neighbours of $v$ one-to-one onto the neighbours of $f(v)$, so $\deg f(v) = \deg v$. $\square$

**Example.** These two graphs are both 3-regular on 6 vertices, so they have the same degree sequence, but the second has triangles and the first has none.

```network
K3,3
caption: $K_{3,3}$
---
edges: a-b b-c c-a d-e e-f f-d a-d b-e c-f
at: a(0,1.1) b(-1,-0.6) c(1,-0.6) d(0,0.4) e(-0.35,-0.2) f(0.35,-0.2)
labels: none
caption: the prism
```

### Havel–Hakimi Theorem {#havel-hakimi}
kind: theorem
prereqs: degree-sequence

A sequence $d_1 \ge d_2 \ge \dots \ge d_n$ of non-negative integers is graphical if and only if the sequence obtained by deleting $d_1$ and subtracting 1 from each of the next $d_1$ terms,
$$d_2 - 1,\ \dots,\ d_{d_1 + 1} - 1,\ d_{d_1 + 2},\ \dots,\ d_n,$$
is graphical.

*Proof.* If the shorter sequence is realised by a graph, add a vertex joined to the vertices of those $d_1$ degrees. Conversely, let $G$ realise the long sequence, with $v$ of degree $d_1$, and suppose $v$ is not joined to the $d_1$ next-largest degrees. Then there are $x, y$ with $vy \in E$, $vx \notin E$ and $\deg x \ge \deg y$, so $x$ has a neighbour $w$ that is not a neighbour of $y$. Replacing the edges $vy$ and $xw$ by $vx$ and $yw$ keeps every degree. Repeating this joins $v$ to those vertices, and deleting $v$ gives the shorter sequence. $\square$

The result is a procedure: [[deciding-graphical]].

### Erdős–Gallai Theorem {#erdos-gallai}
kind: theorem
prereqs: degree-sequence

A sequence $d_1 \ge \dots \ge d_n$ of non-negative integers is graphical if and only if its sum is even and, for every $k$ from 1 to $n$:
$$\sum_{i=1}^{k} d_i \le k(k - 1) + \sum_{i=k+1}^{n} \min(d_i, k).$$

*Why the inequality is needed.* Take the $k$ vertices of largest degree. Their degrees count each edge among them twice, at most $k(k-1)$ in all, and each other vertex $i$ can send them at most $\min(d_i, k)$ edges. That the condition is also enough is the hard direction, proved by Erdős and Gallai in 1960.

### Self-Complementary Graphs {#self-complementary}
kind: theorem
prereqs: complement-graph, graph-isomorphism, edge-bound

If $G \cong \overline{G}$ on $n$ vertices, then $n \equiv 0$ or $1 \pmod 4$.

*Proof.* $G$ and $\overline{G}$ have the same number of edges and together have all $\binom{n}{2}$, so $n(n - 1)/4$ is a whole number. As $n$ and $n - 1$ are not both even, 4 divides one of them. $\square$

**Example.** $P_4$ and $C_5$ are self-complementary.

```network
edges: a-b b-c c-d
layout: line
caption: $P_4$
---
edges: c-a a-d d-b
layout: line
caption: its complement, redrawn
```

### Graphs {#graph}
kind: definition
prereqs: subsets, ordered-pairs

A **graph** is a pair $G = (V, E)$ of a finite non-empty set $V$ of **vertices** and a set $E$ of **edges**, each edge a set $\{u, v\}$ of two different vertices, written $uv$. The number of vertices $|V|$ is the **order** of $G$, and the number of edges $|E|$ its **size**.

Such a graph is called **simple**: no edge joins a vertex to itself, and two vertices are joined at most once. A drawing shows the same information as the sets. Below, $V = \{a, b, c, d\}$ and $E = \{ab, ac, bc, cd\}$.

```network
edges: a-b a-c b-c c-d
at: a(0,1) b(0,0) c(1,0.5) d(2,0.5)
```

```quiz
Q: For the graph with $V = \{1, 2, 3, 4, 5\}$ and $E = \{12, 23, 34\}$, what is the size?
A: 3
Why: The size is the number of edges. Vertex 5 is joined to nothing, and still belongs to the graph.
```

### Adjacency & Incidence {#adjacency}
kind: definition
prereqs: graph

Vertices $u$ and $v$ are **adjacent**, or **neighbours**, if $uv \in E$, and the edge $uv$ is then **incident** with each of them. Edges sharing a vertex are adjacent too. The **neighbourhood** of $v$ is the set of its neighbours:
$$N(v) = \{u \in V : uv \in E\}.$$

### Degree {#vertex-degree}
kind: definition
prereqs: adjacency

The **degree** of a vertex is its number of neighbours, $\deg v = |N(v)|$. A vertex of degree 0 is **isolated**, and one of degree 1 is a **leaf**. The least and greatest degrees in $G$ are written $\delta(G)$ and $\Delta(G)$.

```quiz
Q: In this graph, what is $\deg c$?
{{ network: edges: a-b a-c b-c c-d c-e; at: a(0,1) b(0,0) c(1,0.5) d(2,1) e(2,0); size: 170, 120 }}
A: 4

Q: In $K_{3,4}$, what is $\Delta$?
A: 4
Why: Each of the 3 vertices on one side is joined to all 4 on the other.
```

### Degree Sequence {#degree-sequence}
kind: definition
prereqs: vertex-degree

The **degree sequence** of a graph is the list of its degrees in non-increasing order. A sequence of non-negative integers is **graphical** if it is the degree sequence of some simple graph.

### Regular Graphs {#regular-graph}
kind: definition
prereqs: vertex-degree

A graph is **$k$-regular** if every vertex has degree $k$, and **cubic** if $k = 3$. A $k$-regular graph on $n$ vertices has $nk/2$ edges, by the [[handshaking-lemma|Handshaking Lemma]], so $nk$ is even.

```network
K4
caption: 3-regular
---
C6
caption: 2-regular
---
Q3
caption: 3-regular
```

### Multigraphs & Loops {#multigraph}
kind: definition
prereqs: graph

A **multigraph** allows **parallel edges**, several edges between one pair of vertices, and **loops**, edges from a vertex to itself. A loop adds 2 to the degree of its vertex.

```network
edges: a-b a-b a-c b-c c-c
at: a(0,0) b(1.4,0) c(0.7,1)
```

### Weighted Graphs {#weighted-graph}
kind: definition
prereqs: graph

A **weighted graph** is a graph with a function $w : E \to \mathbb{R}$. The weight of a set of edges is the sum of the weights of its edges. Weights model lengths, costs and capacities.

### Subgraphs {#subgraph}
kind: definition
prereqs: graph

$H = (V', E')$ is a **subgraph** of $G = (V, E)$ if $V' \subseteq V$ and $E' \subseteq E$. It is **spanning** if $V' = V$. For a set $S$ of vertices, the **induced subgraph** $G[S]$ has vertex set $S$ and every edge of $G$ with both ends in $S$. $G - v$ deletes a vertex and its edges, and $G - e$ deletes an edge and keeps its ends.

### Complement {#complement-graph}
kind: definition
prereqs: graph, set-difference

The **complement** $\overline{G}$ of a simple graph $G$ has the same vertices, with two of them adjacent exactly when they are not adjacent in $G$. So
$$|E(G)| + |E(\overline{G})| = \binom{n}{2}.$$

```network
C5
caption: $C_5$
---
C5
remove: 1-2 2-3 3-4 4-5 5-1
edges: 1-3 3-5 5-2 2-4 4-1
caption: its complement, a pentagram, also $C_5$
```

### Isomorphism {#graph-isomorphism}
kind: definition
prereqs: graph, bijections

An **isomorphism** from $G$ to $H$ is a [[bijections|bijection]] $f : V(G) \to V(H)$ such that
$$uv \in E(G) \iff f(u)f(v) \in E(H).$$
If one exists, $G$ and $H$ are **isomorphic**, written $G \cong H$. Isomorphic graphs are the same graph, with its vertices renamed.

**Example.** These are the same graph: $1 \mapsto a$, $2 \mapsto b$, $3 \mapsto c$, $4 \mapsto d$, $5 \mapsto e$, $6 \mapsto f$ is an isomorphism.

```network
edges: 1-2 2-3 3-4 4-5 5-6 6-1 1-4
layout: circle
---
edges: a-b b-c c-d d-e e-f f-a a-d
at: a(0,0) b(0.8,0.8) c(1.6,0.8) d(2.4,0) e(1.6,-0.8) f(0.8,-0.8)
```

### Bipartite Graphs {#bipartite-graph}
kind: definition
prereqs: graph, set-difference

A graph is **bipartite** if $V$ is the union of two disjoint sets $X$ and $Y$, its **parts**, such that every edge has one end in each. The **complete bipartite graph** $K_{m,n}$ has parts of sizes $m$ and $n$, and every edge between them.

```network
K3,4
classes: 1 2 3 / 4 5 6 7
```

### Cliques & Independent Sets {#clique-independent-set}
kind: definition
prereqs: subgraph

A **clique** is a set of pairwise adjacent vertices, and an **independent set** a set of pairwise non-adjacent vertices. The sizes of the largest of each are the **clique number** $\omega(G)$ and the **independence number** $\alpha(G)$. A clique of $G$ is an independent set of $\overline{G}$:
$$\alpha(G) = \omega(\overline{G}).$$

### Operations on Graphs {#graph-operations}
kind: definition
prereqs: graph, cartesian-product

For graphs $G$ and $H$ with disjoint vertex sets:
- the **disjoint union** $G + H$ has the vertices and the edges of both;
- the **join** $G \vee H$ adds every edge between them;
- the **Cartesian product** $G \,\square\, H$ has vertex set $V(G) \times V(H)$, with $(u, x)$ and $(v, y)$ adjacent when $u = v$ and $xy \in E(H)$, or $x = y$ and $uv \in E(G)$;
- the **line graph** $L(G)$ has the edges of $G$ as its vertices, adjacent when they share an end.

So $K_m \vee K_n = K_{m+n}$, the wheel is $K_1 \vee C_{n-1}$, and the hypercube is $Q_d = Q_{d-1} \,\square\, K_2$.

### Adjacency Matrix {#adjacency-matrix}
kind: form
prereqs: graph, matrix-basics

For vertices $v_1, \dots, v_n$, the $n \times n$ matrix $A$ with
$$A_{ij} = \begin{cases} 1 & \text{if } v_iv_j \in E, \\ 0 & \text{otherwise.} \end{cases}$$
It reads off: symmetry, $A = A^{\mathsf{T}}$, since edges have no direction; a zero diagonal, since there are no loops; and $\deg v_i$ as the sum of row $i$.

**Example.** For $P_3$ with middle vertex $v_2$:
$$A = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}.$$

```quiz
Q: A graph on 4 vertices has an adjacency matrix with 10 ones. How many edges does it have?
A: 5
Why: Every edge appears twice, at $(i, j)$ and at $(j, i)$.
```

### Incidence Matrix {#incidence-matrix}
kind: form
prereqs: graph, matrix-basics

For vertices $v_1, \dots, v_n$ and edges $e_1, \dots, e_m$, the $n \times m$ matrix $B$ with $B_{ij} = 1$ if $v_i$ is an end of $e_j$, and 0 otherwise. It reads off: 2 as the sum of every column, since an edge has two ends; and $\deg v_i$ as the sum of row $i$.

The [[handshaking-lemma|Handshaking Lemma]] is the sum of all entries, taken two ways.

### Adjacency List {#adjacency-list}
kind: form
prereqs: adjacency

For each vertex $v$, the list of its neighbours $N(v)$. It uses space proportional to $|V| + |E|$, where an adjacency matrix uses $|V|^2$, and it is the form algorithms work on: the neighbours of $v$ can be listed in time $\deg v$.

$$\begin{aligned} a &: b, c \\ b &: a, c \\ c &: a, b, d \\ d &: c \end{aligned}$$

### Table of Graph Families {#graph-families}
kind: formula
prereqs: edge-bound, regular-graph, bipartite-graph, graph-operations

The named graphs, with their numbers of vertices and edges and their degrees. A path $P_n$ and a wheel $W_n$ are counted here by their vertices.

: Families
| Graph | | Drawn | Vertices | Edges | Degrees |
| --- | :-: | :-: | :-: | :-: | :-: |
| Complete | $K_n$ | {{ network: K5 }} | $n$ | $\binom{n}{2}$ | $n - 1$ |
| Empty | $\overline{K_n}$ | {{ network: E5 }} | $n$ | $0$ | $0$ |
| Path | $P_n$ | {{ network: P5 }} | $n$ | $n - 1$ | $1, 2$ |
| Cycle | $C_n$ | {{ network: C6 }} | $n$ | $n$ | $2$ |
| Wheel | $W_n$ | {{ network: W7 }} | $n$ | $2n - 2$ | $3, n - 1$ |
| Star | $K_{1,n}$ | {{ network: K1,6 }} | $n + 1$ | $n$ | $1, n$ |

: Families with parts
| Graph | | Drawn | Vertices | Edges | Degrees |
| --- | :-: | :-: | :-: | :-: | :-: |
| Complete bipartite | $K_{m,n}$ | {{ network: K3,3 }} | $m + n$ | $mn$ | $m, n$ |
| Hypercube | $Q_d$ | {{ network: Q3 }} | $2^d$ | $d \cdot 2^{d-1}$ | $d$ |
| Grid | $P_m \,\square\, P_n$ | {{ network: grid 3,4 }} | $mn$ | $2mn - m - n$ | $2, 3, 4$ |
| Petersen | | {{ network: Petersen }} | $10$ | $15$ | $3$ |

```quiz
Q: How many edges has $K_{10}$?
A: 45

Q: How many edges has the hypercube $Q_4$?
A: 32
Why: $4 \cdot 2^3 = 32$.

Q: How many edges has $K_{4,6}$?
A: 24
```

### Deciding Whether a Sequence Is Graphical {#deciding-graphical}
kind: skill
prereqs: havel-hakimi, odd-degree-vertices

1. if the sum is odd, or a term is at least $n$, stop: the sequence is not graphical;
2. sort the sequence, largest first;
3. delete the first term $d$ and subtract 1 from each of the next $d$ terms;
4. if a term turns negative, stop: it is not graphical;
5. if all that is left is zeros, stop: it is graphical; otherwise go back to step 2.

**Example.** $(3, 3, 2, 2, 2)$:
$$\begin{aligned} 3, 3, 2, 2, 2 &\to 2, 1, 1, 2 \\ 2, 2, 1, 1 &\to 1, 0, 1 \\ 1, 1, 0 &\to 0, 0, \end{aligned}$$
so it is graphical. Reading the steps backwards builds a graph.

```quiz
Q: Is $(3, 3, 3, 1)$ graphical?
- Yes
+ No
Hint: Apply one step and see what the sequence becomes.
Why: One step gives $2, 2, 0$, and the next $1, -1$, which is impossible.

Q: Is $(4, 3, 3, 2, 2)$ graphical?
+ Yes
- No
Why: $(4, 3, 3, 2, 2) \to (2, 2, 1, 1) \to (1, 0, 1) \to (0, 0)$.

Q: Is $(5, 4, 3, 2, 1)$ graphical?
- Yes
+ No
Why: On 5 vertices no degree can be 5, and the sum, 15, is odd too.
```

### Testing for Isomorphism {#testing-isomorphism}
kind: skill
prereqs: graph-invariants

1. compare the number of vertices, the number of edges and the degree sequences: any difference shows the graphs are not isomorphic;
2. compare finer invariants, such as the number of triangles, or which degrees are adjacent to which;
3. if no invariant differs, build a bijection: match the vertices of a rare degree first, then follow their neighbours;
4. check every edge.

> **!** Equal invariants prove nothing. Only a bijection proves that two graphs are isomorphic.

```quiz
Q: Two graphs on 5 vertices have degree sequences $(3, 2, 2, 2, 1)$ and $(3, 3, 2, 1, 1)$. Can they be isomorphic?
- Yes
+ No
Why: Isomorphic graphs have the same degree sequence.

Q: $C_6$ and two disjoint triangles are both 2-regular on 6 vertices. Are they isomorphic?
- Yes
+ No
Why: One is connected and the other is not, and an isomorphism preserves paths.
```

## Connectivity {#connectivity}
flow: down
rows: kinds
wrap: 6

How a graph holds together: walks and paths, components, distance, and what it takes to cut a graph apart.

Connectivity is the first thing to ask of a graph. Its central fact is that being joined by a walk is an [[equivalence-relations|equivalence relation]], so that every graph falls into components. The measures of how strongly a graph holds together defined here lead on to [[menger-theorem|Menger's Theorem]], under Matchings & Flows.

### A Walk Contains a Path {#walk-contains-path}
kind: theorem
prereqs: walks

Every walk from $u$ to $v$ contains a path from $u$ to $v$.

*Proof.* Take a shortest $u$–$v$ walk made of edges of the given walk. If it visited a vertex twice, the stretch between the two visits could be cut out, giving a shorter walk. So it repeats no vertex, and it is a path. $\square$

### Components Partition a Graph {#components-partition}
kind: theorem
prereqs: connected-graph, equivalence-relations, partitions

The relation "$u$ and $v$ are joined by a walk" is an equivalence relation on $V$. Its classes are the vertex sets of the components of $G$, so the components partition $V$.

*Proof.* It is reflexive by the walk of length 0, symmetric by reversing a walk, and transitive by following one walk with another. $\square$

### Odd Closed Walks {#odd-closed-walk}
kind: theorem
prereqs: walks

Every closed walk of odd length contains a cycle of odd length.

*Proof*, by [[induction|strong induction]] on the length. If the walk repeats no vertex but its first, it is itself a cycle. If it repeats a vertex, it splits at that vertex into two shorter closed walks, whose lengths sum to an odd number, so one of them is odd. $\square$

### Bipartite Graphs Have No Odd Cycle {#bipartite-characterization}
kind: theorem
prereqs: bipartite-graph, odd-closed-walk, graph-distance

A graph is [[bipartite-graph|bipartite]] if and only if it contains no cycle of odd length.

*Proof.* A walk in a bipartite graph changes part at every step, so it returns to its start only after an even number of steps. Conversely, suppose $G$ has no odd cycle, and take each component separately. Fix a vertex $r$, and put $v$ in $X$ if $d(r, v)$ is even and in $Y$ if it is odd. If an edge $uv$ had both ends in one part, the shortest paths from $r$ to $u$ and to $v$, with $uv$, would make a closed walk of odd length, which contains an [[odd-closed-walk|odd cycle]]. $\square$

Due to König, 1936.

### Bridges Lie on No Cycle {#bridge-no-cycle}
kind: theorem
prereqs: bridges-and-cut-vertices

An edge is a bridge if and only if it lies on no cycle.

*Proof.* If $e = uv$ lies on a cycle, the rest of the cycle joins $u$ to $v$ in $G - e$, and any walk that used $e$ can go round that way, so $e$ is not a bridge. If $e$ lies on no cycle, then $G - e$ has no $u$–$v$ path, since such a path together with $e$ would be a cycle. $\square$

### High Minimum Degree Forces Connection {#dense-connected}
kind: theorem
prereqs: connected-graph, vertex-degree

If a simple graph on $n$ vertices has $\delta(G) \ge (n - 1)/2$, then it is connected, with diameter at most 2.

*Proof.* If $u$ and $v$ were not adjacent, then $N(u)$ and $N(v)$ would both lie among the other $n - 2$ vertices, with sizes summing to at least $n - 1$. So they share a vertex, which joins $u$ to $v$ in two steps. $\square$

### Whitney's Inequality {#whitney-inequality}
kind: theorem
prereqs: graph-connectivity-numbers, vertex-degree

For every simple graph on at least 2 vertices:
$$\kappa(G) \le \lambda(G) \le \delta(G).$$

*Proof.* Deleting all the edges at a vertex of least degree isolates it, so $\lambda \le \delta$. For $\kappa \le \lambda$, take a smallest disconnecting set of edges, and delete one end of each, choosing ends that leave a vertex on each side where this is possible. At most $\lambda$ vertices go, and the graph is left disconnected or with a single vertex. $\square$

### Powers of the Adjacency Matrix Count Walks {#adjacency-powers}
kind: theorem
prereqs: adjacency-matrix, walks, multiplying-matrices, induction

The entry $(A^k)_{ij}$ of the $k$-th power of the adjacency matrix is the number of walks of length $k$ from $v_i$ to $v_j$.

*Proof*, by [[induction]] on $k$. For $k = 1$ this is the definition of $A$. A walk of length $k + 1$ from $v_i$ to $v_j$ is a walk of length $k$ to some $v_l$ followed by an edge $v_lv_j$, so their number is
$$\sum_l (A^k)_{il} A_{lj} = (A^{k+1})_{ij}. \quad \square$$

So $(A^2)_{ii} = \deg v_i$, and the trace of $A^3$ is 6 times the number of triangles.

```quiz
Q: In a triangle, how many walks of length 2 are there from a vertex back to itself?
A: 2
Why: Out along either of its two edges and straight back: $(A^2)_{ii} = \deg v_i = 2$.

Q: $K_4$ has how many walks of length 2 between two different vertices?
A: 2
Why: Through either of the other two vertices.
```

### Walks, Trails, Paths & Cycles {#walks}
kind: definition
prereqs: adjacency

A **walk** of length $k$ is a sequence of vertices $v_0, v_1, \dots, v_k$ in which each consecutive pair is an edge. It is **closed** if $v_0 = v_k$. A walk is
- a **trail** if it repeats no edge;
- a **path** if it repeats no vertex;
- a **cycle** if it is closed, has length at least 3, and repeats no vertex but its first and last.

```network
edges: a-b b-c c-d d-e e-a b-e
at: a(0,1) b(1,1.5) c(2,1) d(1.6,0) e(0.4,0)
path: a b c d
caption: the path $a, b, c, d$
---
edges: a-b b-c c-d d-e e-a b-e
at: a(0,1) b(1,1.5) c(2,1) d(1.6,0) e(0.4,0)
path: b c d e b
caption: the cycle $b, c, d, e, b$
```

### Connected Graphs {#connected-graph}
kind: definition
prereqs: walks

A graph is **connected** if every two of its vertices are joined by a walk. The **components** of a graph are its maximal connected subgraphs.

```network
edges: a-b b-c c-a d-e f-g g-h h-i
at: a(0,0) b(1,0) c(0.5,0.85) d(1.7,0) e(1.7,0.85) f(2.4,0) g(3.1,0) h(3.1,0.85) i(2.4,0.85)
caption: three components
```

### Bridges & Cut Vertices {#bridges-and-cut-vertices}
kind: definition
prereqs: connected-graph, subgraph

A **bridge** is an edge whose deletion increases the number of components. A **cut vertex** is a vertex whose deletion does.

```network
edges: a-b b-c c-a c-d d-e e-f f-d
at: a(0,0.9) b(0,0) c(1,0.45) d(2.2,0.45) e(3.2,0.9) f(3.2,0)
heavy: c-d
mark: c d
caption: a bridge, and two cut vertices
```

### Distance, Diameter & Girth {#graph-distance}
kind: definition
prereqs: walks

The **distance** $d(u, v)$ is the length of a shortest $u$–$v$ path, and $\infty$ if there is none. The **eccentricity** of $v$ is its distance to the vertex furthest from it. The **diameter** of $G$ is the largest eccentricity, and the **radius** the smallest:
$$\operatorname{diam} G = \max_{u, v} d(u, v).$$
The **girth** of $G$ is the length of a shortest cycle, and $\infty$ if there is none.

On a connected graph $d$ is a metric: $d(u, v) = 0$ only for $u = v$, $d(u, v) = d(v, u)$, and $d(u, w) \le d(u, v) + d(v, w)$.

```quiz
Q: What is the diameter of the cycle $C_{9}$?
A: 4

Q: What is the girth of $K_{3,3}$?
A: 4
Why: A bipartite graph has no odd cycles, and $K_{3,3}$ has 4-cycles.
```

### Vertex & Edge Connectivity {#graph-connectivity-numbers}
kind: definition
prereqs: bridges-and-cut-vertices

The **vertex connectivity** $\kappa(G)$ is the fewest vertices whose deletion disconnects $G$ or leaves a single vertex. The **edge connectivity** $\lambda(G)$ is the fewest edges whose deletion disconnects $G$. $G$ is **$k$-connected** if $\kappa(G) \ge k$, and **$k$-edge-connected** if $\lambda(G) \ge k$.

So a connected graph of at least 2 vertices has $\lambda = 1$ exactly when it has a bridge. $\kappa$ and $\lambda$ can differ: two triangles sharing a vertex have $\kappa = 1$ and $\lambda = 2$.

```network
edges: a-b b-c c-a c-d d-e e-c
at: a(0,0.9) b(0,0) c(1,0.45) d(2,0.9) e(2,0)
mark: c
```

### Table of Distances {#distance-table}
kind: formula
prereqs: graph-families, graph-distance, graph-connectivity-numbers

: Distance and connectivity in the families
| Graph | Diameter | Girth | $\kappa$ | $\lambda$ |
| --- | :-: | :-: | :-: | :-: |
| $K_n$, $n \ge 3$ | $1$ | $3$ | $n - 1$ | $n - 1$ |
| $P_n$, $n \ge 2$ | $n - 1$ | $\infty$ | $1$ | $1$ |
| $C_n$ | $\lfloor n/2 \rfloor$ | $n$ | $2$ | $2$ |
| $W_n$, $n \ge 5$ | $2$ | $3$ | $3$ | $3$ |
| $K_{m,n}$, $2 \le m \le n$ | $2$ | $4$ | $m$ | $m$ |
| $Q_d$, $d \ge 2$ | $d$ | $4$ | $d$ | $d$ |
| Petersen | $2$ | $5$ | $3$ | $3$ |

### Breadth-First Search {#bfs}
kind: technique
prereqs: connected-graph, graph-distance

1. mark the start vertex $s$ at distance 0, and put it in a queue;
2. take the vertex $v$ at the front of the queue;
3. for each unmarked neighbour $u$ of $v$, mark $u$ at distance $d(s, v) + 1$, with $v$ as its parent, and add it to the back of the queue;
4. repeat from step 2 until the queue is empty.

It runs in time proportional to $|V| + |E|$. The marked vertices are the component of $s$, and each mark is the true [[graph-distance|distance]] from $s$: vertices leave the queue in order of distance, so a vertex at distance $k$ is first reached from one at distance $k - 1$. The parents form a tree of shortest paths.

```network
edges: s-a s-b a-c a-d b-d b-e c-f d-f
at: s(0,0) a(1,0.7) b(1,-0.7) c(2,1.1) d(2,0) e(2,-1.1) f(3,0.6)
heavy: s-a s-b a-c a-d b-e c-f
caption: the search tree from $s$, level by level
```

```quiz
Q: In the graph drawn above, what is the distance from $s$ to $f$?
A: 3
Why: The levels from $s$ are $\{a, b\}$, then $\{c, d, e\}$, then $\{f\}$.
```

### Depth-First Search {#dfs}
kind: technique
prereqs: connected-graph

1. mark the start vertex;
2. from the current vertex, move to an unmarked neighbour, mark it, and record the edge used as a **tree edge**;
3. if there is no unmarked neighbour, step back along the tree edge by which the current vertex was reached;
4. stop on returning to the start with no unmarked neighbour left.

It runs in time proportional to $|V| + |E|$. In an undirected graph every edge outside the tree joins a vertex to one of its ancestors in the tree, a **back edge**: when the first of its ends was marked, the other was unmarked, and it was reached before the search stepped back. So the graph has a cycle exactly when there is a back edge, and a tree edge is a [[bridges-and-cut-vertices|bridge]] exactly when no back edge passes over it.

### Testing Whether a Graph Is Bipartite {#testing-bipartite}
kind: skill
prereqs: bipartite-characterization, bfs

1. give any vertex colour 1;
2. give its neighbours colour 2, their neighbours colour 1, and so on, outwards;
3. if an edge joins two vertices of the same colour, the graph is not bipartite: that edge closes an odd cycle;
4. if every vertex is coloured, in every component, the two colours are the parts.

```network
C6
classes: 1 3 5 / 2 4 6
caption: bipartite
---
C5
classes: 1 3 / 2 4 / 5
caption: not bipartite
```

```quiz
Q: Is the cycle $C_{101}$ bipartite?
- Yes
+ No
Why: It is an odd cycle.

Q: Is the hypercube $Q_3$ bipartite?
+ Yes
- No
Why: Colour each corner by the parity of its number of 1s. Every edge changes one coordinate, so it changes the parity.

Q: Is the Petersen graph bipartite?
- Yes
+ No
Why: It has 5-cycles.
```

## Trees {#trees}
flow: down
rows: kinds
wrap: 6

Connected graphs with no cycles: the smallest way to hold a set of vertices together, and how to count and find them.

A tree is a graph with exactly as many edges as it takes to stay connected, and the first theorem here says that this can be put in half a dozen equivalent ways. Every connected graph has a tree spanning it. Counting those trees leads to Cayley's formula and to the Matrix–Tree Theorem, and finding the cheapest one to the greedy algorithms of Kruskal and Prim.

### Edges of a Forest {#forest-edge-count}
kind: theorem
prereqs: tree

A graph with $n$ vertices and $k$ components has at least $n - k$ edges, with equality if and only if it is a forest.

*Proof.* Build the graph from its $n$ vertices by adding its edges one at a time. An edge joining two components lowers the number of components by 1 and closes no cycle. An edge inside a component leaves the number unchanged, and closes a cycle with the path already there. Exactly $n - k$ edges must be of the first kind, and a graph has a cycle exactly when some edge is of the second, whatever the order of adding them. $\square$

### Characterisations of Trees {#tree-characterization}
kind: theorem
prereqs: forest-edge-count, bridge-no-cycle

For a graph $G$ on $n$ vertices, these are equivalent:
1. $G$ is connected and has no cycle;
2. $G$ is connected and has $n - 1$ edges;
3. $G$ has no cycle and has $n - 1$ edges;
4. any two vertices of $G$ are joined by exactly one path;
5. $G$ is connected, and every edge of $G$ is a bridge;
6. $G$ has no cycle, and adding any edge creates exactly one cycle.

*Proof.* The first three are equivalent by [[forest-edge-count]]: for $k$ components, $G$ has no cycle exactly when it has $n - k$ edges. (1) ⇒ (4): two different paths between the same vertices would contain a cycle. (4) ⇒ (5): deleting an edge $uv$ leaves no path from $u$ to $v$, since the only one was that edge. (5) ⇒ (1): an edge of a cycle is [[bridge-no-cycle|not a bridge]]. (4) ⇒ (6): an edge $uv$ makes a cycle with the one $u$–$v$ path, and with nothing else. (6) ⇒ (1): if $u$ and $v$ were in different components, adding $uv$ would create no cycle. $\square$

### Every Tree Has Two Leaves {#tree-leaves}
kind: theorem
prereqs: tree

A tree with at least 2 vertices has at least 2 leaves.

*Proof.* Take a longest path. An end of it has no neighbour off the path, or the path would be longer, and no other neighbour on the path, or there would be a cycle. So both ends are leaves. $\square$

More exactly, the number of leaves of a tree is
$$2 + \sum_{\deg v \ge 3} (\deg v - 2).$$

```quiz
Q: A tree has one vertex of degree 4, two of degree 3, and all its other vertices are leaves. How many leaves has it?
A: 6
Why: $2 + (4 - 2) + (3 - 2) + (3 - 2) = 6$.
```

### Spanning Trees Exist {#spanning-tree-exists}
kind: theorem
prereqs: spanning-tree, bridge-no-cycle

A graph has a spanning tree if and only if it is connected.

*Proof.* A graph containing a spanning tree is connected through it. Conversely, while a connected graph has a cycle, delete an edge of that cycle: it is [[bridge-no-cycle|no bridge]], so the graph stays connected. When no cycle is left, what remains is a spanning tree. $\square$

### Prüfer Correspondence {#prufer-bijection}
kind: theorem
prereqs: prufer-sequence, bijections, tree-leaves

For $n \ge 2$, the Prüfer sequence is a [[bijections|bijection]] between the trees on the vertices $\{1, \dots, n\}$ and the sequences of length $n - 2$ with terms in $\{1, \dots, n\}$. In it, each vertex $v$ appears $\deg v - 1$ times.

*Proof.* Each vertex is written down once for each neighbour deleted before it, which is every neighbour but one, and that gives the count. So the leaves of the tree are exactly the numbers missing from the sequence, and the first vertex deleted is the smallest of them, with its neighbour the first term. Deleting it and repeating recovers the tree from the sequence, one edge at a time. So the two procedures are inverses. $\square$

### Cayley's Formula {#cayley-formula}
kind: theorem
prereqs: prufer-bijection

The number of trees on $n$ labelled vertices is
$$n^{\,n-2}.$$

*Proof.* By the [[prufer-bijection|Prüfer correspondence]] they are as many as the sequences of length $n - 2$ from $n$ symbols. $\square$

**Example.** For $n = 4$ there are $4^2 = 16$: 12 paths, and 4 stars.

```quiz
Q: How many spanning trees has $K_5$?
A: 125

Q: How many trees are there on 3 labelled vertices?
A: 3
Why: $3^{1}$: a path, with any of the three vertices in the middle.
```

### Matrix–Tree Theorem {#matrix-tree-theorem}
kind: theorem
prereqs: laplacian-matrix, spanning-tree, determinants

The number of spanning trees $\tau(G)$ of a graph on $n$ vertices is the determinant of its [[laplacian-matrix|Laplacian]] $L$ with any one row and the same column deleted.

*Proof sketch.* Orient the edges and let $B$ be the signed incidence matrix, so that $L = BB^{\mathsf{T}}$. Deleting a row gives $B'$, and by the Cauchy–Binet formula
$$\det(B'B'^{\mathsf{T}}) = \sum_{S} (\det B'_S)^2,$$
over the sets $S$ of $n - 1$ edges. Here $\det B'_S$ is $\pm 1$ if $S$ is a spanning tree and $0$ otherwise. Due to Kirchhoff, 1847. $\square$

**Example.** For the triangle,
$$L = \begin{bmatrix} 2 & -1 & -1 \\ -1 & 2 & -1 \\ -1 & -1 & 2 \end{bmatrix}, \qquad \tau = \det\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix} = 3.$$

### Deletion–Contraction for Spanning Trees {#tree-deletion-contraction}
kind: theorem
prereqs: spanning-tree, edge-contraction

For an edge $e$ of a graph $G$ that is not a loop:
$$\tau(G) = \tau(G - e) + \tau(G / e).$$

*Proof.* The spanning trees without $e$ are those of $G - e$. The spanning trees with $e$ correspond to those of $G / e$, by contracting $e$ in each. $\square$

### Cut and Cycle Properties {#cut-property}
kind: theorem
prereqs: minimum-spanning-tree, tree-characterization

Let the edge weights of a connected graph be distinct.
- **Cut property:** for every partition of $V$ into two non-empty sets, the lightest edge between them belongs to the minimum spanning tree.
- **Cycle property:** the heaviest edge of any cycle does not.

*Proof.* Suppose a spanning tree $T$ omits the lightest edge $e$ of a cut. Then $T + e$ has a cycle, which crosses the cut a second time at an edge $f$ heavier than $e$, and $T + e - f$ is a lighter spanning tree. Similarly, if $T$ contains the heaviest edge $f$ of a cycle, deleting it splits $T$ in two; the rest of the cycle crosses between the parts at a lighter edge, which can replace $f$. $\square$

With equal weights the same arguments show that a lightest edge of a cut lies in *some* minimum spanning tree.

### Table of Spanning Tree Counts {#spanning-tree-counts}
kind: formula
prereqs: matrix-tree-theorem, cayley-formula, graph-families

: Number of spanning trees $\tau(G)$
| Graph | $\tau$ | First values |
| --- | :-: | :-: |
| Tree on $n$ vertices | $1$ | $1, 1, 1, \dots$ |
| $C_n$ | $n$ | $3, 4, 5, \dots$ |
| $K_n$ | $n^{n-2}$ | $3, 16, 125, \dots$ |
| $K_{m,n}$ | $m^{n-1} n^{m-1}$ | $K_{2,2}: 4$, $K_{3,3}: 81$ |
| $Q_3$ | $384$ | |
| Petersen | $2000$ | |

### Trees & Forests {#tree}
kind: definition
prereqs: connected-graph

A **forest** is a graph with no cycle. A **tree** is a connected forest.

```network
edges: a-b b-c c-d b-e e-f e-g
layout: tree
caption: a tree
---
edges: a-b a-c d-e e-f g-h
at: a(0,1) b(-0.5,0) c(0.5,0) d(1.3,1) e(1.3,0.5) f(1.3,0) g(2,1) h(2,0)
caption: a forest of three trees
```

### Rooted Trees {#rooted-tree}
kind: definition
prereqs: tree

A **rooted tree** is a tree with one vertex chosen as its **root**. The **parent** of a vertex is its neighbour on the path to the root, and its other neighbours are its **children**. The **depth** of a vertex is its distance from the root, and the **height** of the tree is the greatest depth.

A **binary tree** is a rooted tree in which every vertex has at most 2 children. One of height $h$ has at most $2^{h+1} - 1$ vertices and at most $2^h$ leaves.

```network
edges: r-a r-b a-c a-d b-e d-f d-g
layout: tree
mark: r
```

### Spanning Trees {#spanning-tree}
kind: definition
prereqs: tree, subgraph

A **spanning tree** of $G$ is a spanning subgraph of $G$ that is a tree. The number of spanning trees of $G$ is written $\tau(G)$.

```network
K4
path: 1 2 3 4
---
K4
heavy: 1-2 1-3 1-4
---
K4
heavy: 1-2 2-3 2-4
```

### Edge Contraction {#edge-contraction}
kind: definition
prereqs: multigraph, subgraph

**Contracting** an edge $e = uv$ merges $u$ and $v$ into one vertex, which keeps all their other edges. The result is $G / e$. It may have parallel edges, where $u$ and $v$ had a common neighbour.

### Minimum Spanning Trees {#minimum-spanning-tree}
kind: definition
prereqs: spanning-tree, weighted-graph

A **minimum spanning tree** of a connected weighted graph is a spanning tree of the least possible total weight.

### Prüfer Sequence {#prufer-sequence}
kind: form
prereqs: tree, tree-leaves

A tree on the vertices $\{1, \dots, n\}$, written as a sequence of $n - 2$ numbers: repeatedly delete the smallest leaf and write down its neighbour, until 2 vertices are left. It reads off the degrees: $v$ appears $\deg v - 1$ times, so the leaves are the numbers that do not appear.

### Laplacian Matrix {#laplacian-matrix}
kind: form
prereqs: adjacency-matrix

The matrix
$$L = D - A,$$
where $D$ is the diagonal matrix of the degrees and $A$ the [[adjacency-matrix|adjacency matrix]]. It reads off: the degrees, on its diagonal; and the edges, as the entries $-1$. Every row sums to 0.

### Kruskal's Algorithm {#kruskal-algorithm}
kind: technique
prereqs: cut-property

1. sort the edges from lightest to heaviest;
2. go through them in that order, keeping an edge if it joins two different components of the edges kept so far;
3. stop after $n - 1$ edges.

Each edge kept is the lightest across the cut around one of the two components it joins, so it belongs to the [[cut-property|minimum spanning tree]].

**Example.** The edges are taken in the order $bc$, $ac$, $de$, then $ab$ is passed over, which would close a cycle, and $bd$ completes the tree, of weight $1 + 2 + 2 + 5 = 10$.

```network
edges: a-b:4 a-c:2 b-c:1 b-d:5 c-d:8 c-e:10 d-e:2
at: a(0,0.7) b(1.2,1.4) c(1.2,0) d(2.6,1.4) e(2.6,0)
heavy: a-c b-c b-d d-e
```

```quiz
Q: The edges of a weighted triangle have weights 3, 5 and 7. What is the weight of its minimum spanning tree?
A: 8
Why: Keep the two lightest edges.
```

### Prim's Algorithm {#prim-algorithm}
kind: technique
prereqs: cut-property

1. start from any vertex, as a tree of one vertex;
2. add the lightest edge with exactly one end in the tree;
3. repeat until the tree spans the graph.

Each edge added is the lightest across the cut around the tree so far, so it belongs to the [[cut-property|minimum spanning tree]]. Prim's algorithm grows one tree, where Kruskal's grows a forest.

```quiz
Q: In the graph of Kruskal's example, with $ab = 4$, $ac = 2$, $bc = 1$, $bd = 5$, $cd = 8$, $ce = 10$ and $de = 2$, Prim's algorithm starts from $a$. Which edge does it add second?
- $ab$
+ $bc$
- $cd$
- $de$
Why: It adds $ac$ first. From $\{a, c\}$ the lightest edge leaving is then $bc$, of weight 1.
```

### Coding a Tree as a Prüfer Sequence {#prufer-coding}
kind: skill
prereqs: prufer-bijection

To encode:
1. delete the smallest leaf, and write down its neighbour;
2. repeat until 2 vertices are left.

To decode a sequence of length $n - 2$:
1. take the smallest number of $\{1, \dots, n\}$ that is not in the sequence and not yet used;
2. join it to the first term of the sequence, mark it as used, and delete that term;
3. repeat until the sequence is empty, then join the 2 numbers left.

**Example.** The tree below encodes as $(4, 4, 4, 5)$: the leaves 1, 2 and 3 go first, each writing 4, then 4 goes as a leaf, writing 5, leaving 5 and 6.

```network
edges: 4-1 4-2 4-3 4-5 5-6
at: 1(0,1) 2(0,0.5) 3(0,0) 4(1,0.5) 5(2,0.5) 6(3,0.5)
```

```quiz
Q: A tree has the Prüfer sequence $(3, 3, 3)$. How many vertices has it?
A: 5
Why: The length is $n - 2$.

Q: A tree has the Prüfer sequence $(3, 3, 3)$. What is the degree of vertex 3?
A: 4
Why: It appears $\deg v - 1$ times. The tree is a star.
```

### Counting Spanning Trees with a Determinant {#counting-spanning-trees}
kind: skill
prereqs: matrix-tree-theorem

1. write the [[laplacian-matrix|Laplacian]] $L = D - A$;
2. delete any one row and the same column;
3. take the determinant.

**Example.** For $C_4$ with one diagonal, the degrees are $3, 2, 3, 2$ and deleting the last vertex leaves
$$\det\begin{bmatrix} 3 & -1 & -1 \\ -1 & 2 & -1 \\ -1 & -1 & 3 \end{bmatrix} = 8.$$

```network
C4
edges: 1-3
```

```quiz
Q: How many spanning trees has the cycle $C_7$?
A: 7
Why: A spanning tree leaves out exactly one of the 7 edges.

Q: How many spanning trees has $K_{2,3}$?
A: 12
Why: $m^{n-1} n^{m-1} = 2^2 \cdot 3^1 = 12$.
```

## Euler Tours & Hamilton Cycles {#traversals}
flow: down
rows: kinds
wrap: 6

Going round a graph: along every edge once, or through every vertex once.

The two questions look alike and could not be more different. Euler settled the first in 1736, the start of the subject: an Euler circuit exists exactly when the degrees are even, and it can be found quickly. For the second no such test is known, and finding one would be to answer the question of P and NP. What there is instead are conditions that are enough, such as Dirac's and Ore's, and conditions that are necessary.

### Seven Bridges of Königsberg {#konigsberg}
kind: theorem
prereqs: euler-trail-theorem

There is no walk through Königsberg crossing each of its seven bridges exactly once.

*Proof.* With each land mass a vertex and each bridge an edge, the four vertices all have odd degree: 5, 3, 3 and 3. An [[euler-trail-theorem|Euler trail]] allows at most two. $\square$

```network
edges: I-N I-N I-S I-S I-E N-E S-E
at: N(0.8,2) I(0,1) S(0.8,0) E(2.4,1)
```

### Euler's Theorem {#euler-circuit-theorem}
kind: theorem
prereqs: eulerian-graph, connected-graph, vertex-degree

A connected multigraph has an Euler circuit if and only if every vertex has even degree.

*Proof.* A circuit leaves each vertex as often as it enters, using a new edge each time, so all degrees are even. Conversely, take a longest trail. It cannot get stuck at a vertex other than its start, since an even degree means an edge is always left to go out by; so it is closed. If it missed an edge, then by connectedness some unused edge would touch the trail at a vertex $v$. Opening the trail at $v$ and adding that edge would make a longer one. $\square$

Euler, 1736.

```quiz
Q: For which $n$ does $K_n$ have an Euler circuit, of these?
- $n = 4$
+ $n = 5$
- $n = 6$
- $n = 8$
Why: Every degree is $n - 1$, which must be even.

Q: Does the hypercube $Q_3$ have an Euler circuit?
- Yes
+ No
Why: Every vertex has degree 3.
```

### Euler Trails {#euler-trail-theorem}
kind: theorem
prereqs: euler-circuit-theorem

A connected multigraph has an Euler trail that is not closed if and only if exactly two vertices have odd degree, and the trail then runs from one of them to the other.

*Proof.* Add an edge between the two odd vertices. All degrees are now even, so by [[euler-circuit-theorem|Euler's Theorem]] there is an Euler circuit. Deleting the added edge cuts it into a trail. The converse is as for circuits, except at the two ends of the trail. $\square$

**Example.** A figure can be drawn without lifting the pen exactly when it has 0 or 2 odd vertices. This one, the house, has 2, at the bottom, where the trail must start and end.

```network
edges: a-b b-c c-d d-a a-c b-d a-e e-b
at: d(0,0) c(1,0) a(0,1) b(1,1) e(0.5,1.6)
mark: c d
```

### Veblen's Theorem {#veblen-theorem}
kind: theorem
prereqs: euler-circuit-theorem

The edges of a multigraph can be split into cycles if and only if every vertex has even degree.

*Proof.* Cycles through a vertex use its edges two at a time, so its degree is even. Conversely, a graph with all degrees even and at least one edge has minimum degree 2 on the part with edges, so it has a cycle. Deleting that cycle keeps every degree even, and induction on the number of edges finishes the proof. $\square$

### Ore's Theorem {#ore-theorem}
kind: theorem
prereqs: hamiltonian-graph, vertex-degree

If $G$ is a simple graph on $n \ge 3$ vertices in which
$$\deg u + \deg v \ge n$$
for every two non-adjacent vertices $u, v$, then $G$ is Hamiltonian.

*Proof.* Suppose not, and add edges until one more would make $G$ Hamiltonian; the condition still holds. Adding one more edge $v_1v_n$ gives a Hamilton cycle, so there is a Hamilton path $v_1, \dots, v_n$ with $v_1$ and $v_n$ not adjacent. Let
$$S = \{i : v_1v_{i+1} \in E\}, \qquad T = \{i : v_iv_n \in E\}.$$
These are subsets of $\{1, \dots, n - 1\}$ whose sizes sum to at least $n$, so they share some $i$. Then $v_1, v_{i+1}, v_{i+2}, \dots, v_n, v_i, v_{i-1}, \dots, v_1$ is a Hamilton cycle, a contradiction. $\square$

### Dirac's Theorem {#dirac-theorem}
kind: theorem
prereqs: ore-theorem

If $G$ is a simple graph on $n \ge 3$ vertices with $\delta(G) \ge n/2$, then $G$ is Hamiltonian.

*Proof.* Any two vertices then have degrees summing to at least $n$, so [[ore-theorem|Ore's Theorem]] applies. $\square$

Dirac, 1952. The bound is the best possible: $K_{m,m+1}$ has $\delta = m$, less than $(2m + 1)/2$ by a half, and no Hamilton cycle.

```quiz
Q: A simple graph has 12 vertices. What is the smallest minimum degree that Dirac's Theorem guarantees a Hamilton cycle for?
A: 6
```

### Bondy–Chvátal Closure {#bondy-chvatal}
kind: theorem
prereqs: ore-theorem

If $\deg u + \deg v \ge n$ for non-adjacent $u, v$, then $G$ is Hamiltonian if and only if $G + uv$ is. So $G$ is Hamiltonian if and only if its **closure** is: the graph reached by adding such edges for as long as there are any.

*Proof.* A Hamilton cycle of $G + uv$ that uses $uv$ gives a Hamilton path from $u$ to $v$ in $G$, and the argument of [[ore-theorem|Ore's Theorem]] closes it into a cycle in $G$. $\square$

### A Necessary Condition {#hamilton-necessary}
kind: theorem
prereqs: hamiltonian-graph, connected-graph

If $G$ is Hamiltonian, then for every non-empty set $S$ of vertices, $G - S$ has at most $|S|$ components.

*Proof.* Deleting $|S|$ vertices from a cycle leaves at most $|S|$ paths, and $G - S$ contains them all. $\square$

So a graph with a cut vertex has no Hamilton cycle, and neither does $K_{m,n}$ for $m \neq n$. The condition is not sufficient: the [[petersen-not-hamiltonian|Petersen graph]] meets it.

### Petersen Is Not Hamiltonian {#petersen-not-hamiltonian}
kind: theorem
prereqs: hamiltonian-graph, graph-families

The Petersen graph has no Hamilton cycle.

*Proof.* Let its outer vertices be $u_i$ and its inner $v_i$, with indices mod 5, where $u_i \sim u_{i+1}$, $u_i \sim v_i$ and $v_i \sim v_{i+2}$. A Hamilton cycle crosses between the outer and inner sets an even number of times $s$. Each vertex has 2 cycle edges, so the cycle uses $(10 - s)/2$ outer edges and as many inner. For $s = 2$ these are 4 outer and 4 inner edges: the two spokes then sit at adjacent $u_i, u_{i+1}$, while the ends of the inner path are adjacent on the inner 5-cycle, and $v_i, v_{i+1}$ are not. For $s = 4$, one spoke $u_jv_j$ is unused, so the cycle has $u_{j-1}u_ju_{j+1}$ and $v_{j-2}v_jv_{j+2}$, then is forced to use $u_{j+2}u_{j+3}$ and $v_{j+1}v_{j+4}$, and this closes up the 5-cycle $u_{j+2}, u_{j+3}, v_{j+3}, v_j, v_{j+2}$. $s = 0$ would leave the cycle in one set. $\square$

It does have a Hamilton path, and deleting any one vertex leaves a Hamiltonian graph.

```network
Petersen
```

### Eulerian Graphs {#eulerian-graph}
kind: definition
prereqs: walks, multigraph

An **Euler trail** is a trail using every edge of a graph exactly once. An **Euler circuit** is a closed one. A graph with an Euler circuit is **Eulerian**.

### Hamiltonian Graphs {#hamiltonian-graph}
kind: definition
prereqs: walks

A **Hamilton path** is a path through every vertex of a graph, and a **Hamilton cycle** is a cycle through every vertex. A graph with a Hamilton cycle is **Hamiltonian**.

```network
dodecahedron
path: 1 2 3 4 5 10 11 16 17 18 19 20 15 9 14 8 13 7 12 6 1
caption: Hamilton's puzzle of 1857: a cycle round the dodecahedron
```

### Travelling Salesman Problem {#travelling-salesman}
kind: definition
prereqs: hamiltonian-graph, weighted-graph

Given a complete weighted graph, the **travelling salesman problem** asks for a Hamilton cycle of least total weight. $K_n$ has $(n - 1)!/2$ Hamilton cycles, so listing them all is hopeless beyond small $n$; the problem is NP-hard.

### Euler and Hamilton Compared {#euler-hamilton-table}
kind: formula
prereqs: euler-circuit-theorem, dirac-theorem, hamilton-necessary

: Going round a graph
| | Euler circuit | Hamilton cycle |
| --- | :--- | :--- |
| Uses | every edge once | every vertex once |
| Exists if and only if | connected, all degrees even | no such test is known |
| Sufficient | the same | $\delta \ge n/2$, Dirac; $\deg u + \deg v \ge n$, Ore |
| Necessary | the same | $G - S$ has at most $\lvert S\rvert$ components |
| To find one | [[hierholzer-algorithm]], in linear time | NP-complete |

: In the families
| Graph | Euler circuit | Hamilton cycle |
| --- | :-: | :-: |
| $K_n$, $n \ge 3$ | $n$ odd | always |
| $C_n$ | always | always |
| $K_{m,n}$, $m, n \ge 2$ | $m$ and $n$ even | $m = n$ |
| $Q_d$, $d \ge 2$ | $d$ even | always |
| Petersen | no | no |

### Hierholzer's Algorithm {#hierholzer-algorithm}
kind: technique
prereqs: euler-circuit-theorem

1. from any vertex, follow unused edges until returning to the start, which forms a closed trail;
2. if an unused edge remains, find a vertex on the trail with an unused edge;
3. from it, follow unused edges back to it, forming a second closed trail;
4. splice the second trail into the first at that vertex, and repeat from step 2.

It runs in time proportional to the number of edges.

### Deciding Whether a Graph Can Be Traced {#deciding-eulerian}
kind: skill
prereqs: euler-trail-theorem

1. check that the edges all lie in one component;
2. count the vertices of odd degree;
3. if there are none, there is an Euler circuit, from any vertex;
4. if there are two, there is an Euler trail, from one to the other;
5. otherwise there is neither. There can't be exactly one, as the number [[odd-degree-vertices|is always even]].

```quiz
Q: A connected graph has degrees $4, 4, 3, 3, 2$. What does it have?
- An Euler circuit
+ An Euler trail, not closed
- Neither
Why: Exactly two vertices have odd degree.

Q: A connected graph has degrees $3, 3, 3, 3$. What does it have?
- An Euler circuit
- An Euler trail, not closed
+ Neither
Why: Four vertices have odd degree. This is $K_4$.

Q: What is the fewest edges that must be added to Königsberg's seven bridges to make an Euler circuit?
A: 2
Why: Each new bridge fixes two odd vertices, and there are four.
```

### Nearest Neighbour Tour {#nearest-neighbour-tour}
kind: heuristic
prereqs: travelling-salesman

For a short tour of a complete weighted graph: start anywhere, go each time to the nearest vertex not yet visited, and at the end return to the start.

It is fast, and usually within about a quarter of the best tour, but there is no constant bound: on some inputs it does arbitrarily badly by comparison.

## Planar Graphs {#planar-graphs}
flow: down
rows: kinds
wrap: 6

Graphs that can be drawn in the plane with no edges crossing, and what Euler's formula says about them.

Planarity is a property of the graph and not of a drawing: $K_4$ can be drawn with crossing edges, and it is still planar. Euler's formula is the tool behind everything here. It gives the bound on the number of edges, shows that $K_5$ and $K_{3,3}$ are not planar, and limits the regular solids to five; Kuratowski's Theorem says that those two graphs are, in a precise sense, the only obstructions. The [[eulers-polyhedron-formula|polyhedron formula]] in Geometry is the case of a convex solid.

### Euler's Formula {#euler-planar-formula}
kind: theorem
prereqs: planar-graph, tree-characterization

A connected plane graph with $V$ vertices, $E$ edges and $F$ faces has
$$V - E + F = 2.$$

*Proof*, by [[induction]] on $E$. If $G$ is a tree, then $E = V - 1$ and $F = 1$. Otherwise some edge $e$ lies on a cycle. That cycle separates the two faces on either side of $e$, so deleting $e$ merges them, and $G - e$ is connected with one edge fewer and one face fewer. $\square$

The unbounded face counts. With $k$ components the formula is $V - E + F = 1 + k$.

```network
edges: a-b b-c c-d d-a a-c
at: a(0,1) b(1.4,1) c(1.4,0) d(0,0)
label: 0.95, 0.72 "f₁" 
label: 0.35, 0.22 "f₂"
label: 1.75, 0.5 "f₃"
caption: $4 - 5 + 3 = 2$
```

```quiz
Q: A connected plane graph has 10 vertices and 15 edges. How many faces has it?
A: 7

Q: A connected plane graph has 6 faces and 8 vertices. How many edges has it?
A: 12
```

### Handshaking for Faces {#face-handshaking}
kind: theorem
prereqs: dual-graph, handshaking-lemma

In a plane graph, the degrees of the faces sum to twice the number of edges:
$$\sum_{f} \deg f = 2E.$$

*Proof.* This is the [[handshaking-lemma|Handshaking Lemma]] for the dual graph; directly, each edge has two sides, each on the boundary of a face. $\square$

### Edge Bound for Planar Graphs {#planar-edge-bound}
kind: theorem
prereqs: euler-planar-formula, face-handshaking

A simple planar graph with $V \ge 3$ vertices has
$$E \le 3V - 6,$$
and one with no triangles has
$$E \le 2V - 4.$$
More generally, a connected planar graph with cycles and girth $g$ has $E \le g(V - 2)/(g - 2)$.

*Proof.* It is enough to take the graph connected, adding edges if necessary. Each face of a simple graph has at least 3 sides, so [[face-handshaking|$2E \ge 3F$]]. Substituting $F = 2 - V + E$ into this gives the first bound. With no triangles each face has at least 4 sides, so $2E \ge 4F$, which gives the second; with girth $g$, $2E \ge gF$ gives the third. $\square$

```quiz
Q: What is the greatest number of edges of a simple planar graph with 8 vertices?
A: 18

Q: What is the greatest number of edges of a triangle-free planar graph with 8 vertices?
A: 12

Q: A connected simple planar graph has every face a triangle and 10 vertices. How many faces has it?
A: 16
Why: $E = 3V - 6 = 24$, and $F = 2 - V + E = 16$.
```

### K5 Is Not Planar {#k5-nonplanar}
kind: theorem
prereqs: planar-edge-bound

$K_5$ is not planar.

*Proof.* It has 10 edges, more than $3V - 6 = 9$. $\square$

```network
K5
```

### K3,3 Is Not Planar {#k33-nonplanar}
kind: theorem
prereqs: planar-edge-bound, bipartite-characterization

$K_{3,3}$ is not planar.

*Proof.* It is bipartite, so it has no triangles, and it has 9 edges, more than $2V - 4 = 8$. $\square$

The three utilities problem, to join three houses to three utilities with no crossings, is $K_{3,3}$.

```network
K3,3
classes: 1 2 3 / 4 5 6
```

### Planar Graphs Have a Vertex of Degree at Most 5 {#planar-min-degree}
kind: theorem
prereqs: planar-edge-bound, handshaking-lemma

Every simple planar graph has a vertex of degree at most 5.

*Proof.* If every degree were at least 6, then $2E \ge 6V$, against [[planar-edge-bound|$E \le 3V - 6$]]. $\square$

### Kuratowski's Theorem {#kuratowski-theorem}
kind: theorem
prereqs: k5-nonplanar, k33-nonplanar, graph-minor

A graph is planar if and only if it has no subgraph that is a subdivision of $K_5$ or of $K_{3,3}$.

Kuratowski, 1930. One direction is immediate, since a subdivision of a non-planar graph is non-planar. The other is the deep one: every non-planar graph must contain one of the two.

**Example.** The Petersen graph contains a subdivision of $K_{3,3}$.

### Wagner's Theorem {#wagner-theorem}
kind: theorem
prereqs: k5-nonplanar, k33-nonplanar, graph-minor

A graph is planar if and only if it has neither $K_5$ nor $K_{3,3}$ as a minor.

Wagner, 1937. Equivalent to [[kuratowski-theorem|Kuratowski's Theorem]]. Contracting the five spokes of the Petersen graph gives $K_5$, so it is not planar:

```network
Petersen
heavy: 1-6 2-7 3-8 4-9 5-10
```

### Fáry's Theorem {#fary-theorem}
kind: theorem
prereqs: planar-graph

Every simple planar graph has a drawing in the plane with no crossings in which every edge is a straight line segment.

Fáry, 1948; so nothing is gained by letting edges bend.

### The Five Platonic Solids {#platonic-classification}
kind: theorem
prereqs: euler-planar-formula, face-handshaking, regular-graph

There are exactly five connected plane graphs in which every vertex has degree $p \ge 3$ and every face has $q \ge 3$ sides: those of the tetrahedron, cube, octahedron, dodecahedron and icosahedron.

*Proof.* Counting gives $pV = 2E = qF$. Putting $V = 2E/p$ and $F = 2E/q$ into [[euler-planar-formula|$V - E + F = 2$]] gives
$$\frac{1}{p} + \frac{1}{q} = \frac{1}{2} + \frac{1}{E}.$$
So $1/p + 1/q > 1/2$, which leaves only $(p, q)$ equal to $(3, 3)$, $(3, 4)$, $(4, 3)$, $(3, 5)$ and $(5, 3)$. Each gives one value of $E$, then of $V$ and $F$, and one graph. $\square$

### Planar Graphs {#planar-graph}
kind: definition
prereqs: graph, connected-graph

A graph is **planar** if it can be drawn in the plane with no two edges crossing. Such a drawing is a **plane graph**, and it divides the plane into regions called **faces**, one of them unbounded. The **degree** of a face is the number of edge sides on its boundary.

```network
K4
caption: $K_4$, with a crossing
---
tetrahedron
caption: and without
```

### Subdivisions & Minors {#graph-minor}
kind: definition
prereqs: subgraph, edge-contraction

A **subdivision** of a graph replaces edges by paths, adding new vertices of degree 2 along them. A graph $H$ is a **minor** of $G$ if $H$ can be obtained from $G$ by deleting edges, deleting vertices and [[edge-contraction|contracting edges]].

```network
K4
caption: $K_4$
---
edges: 1-a a-2 2-3 3-b b-4 4-1 1-3 2-c c-4
at: 1(0,1) a(0.5,1) 2(1,1) 3(1,0) b(0.5,0) 4(0,0) c(0.75,0.75)
labels: none
mark: a b c
caption: a subdivision of it
```

### Dual Graph {#dual-graph}
kind: definition
prereqs: planar-graph, multigraph

The **dual** $G^*$ of a plane graph $G$ has a vertex for each face of $G$ and, for each edge of $G$, an edge between the faces on its two sides. It has $V^* = F$, $E^* = E$ and $F^* = V$, and for connected $G$, $(G^*)^* = G$. A map is coloured by colouring the vertices of its dual.

The dual of the cube is the octahedron, the dual of the dodecahedron is the icosahedron, and the tetrahedron is its own.

### Table of Platonic Graphs {#platonic-table}
kind: formula
prereqs: platonic-classification

Each is flattened through one face, which shows that it is planar.

: The five Platonic graphs
| Solid | Drawn | $V$ | $E$ | $F$ | Degree | Face |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| Tetrahedron | {{ network: tetrahedron }} | $4$ | $6$ | $4$ | $3$ | $3$ |
| Cube | {{ network: cube }} | $8$ | $12$ | $6$ | $3$ | $4$ |
| Octahedron | {{ network: octahedron }} | $6$ | $12$ | $8$ | $4$ | $3$ |
| Dodecahedron | {{ network: dodecahedron }} | $20$ | $30$ | $12$ | $3$ | $5$ |
| Icosahedron | {{ network: icosahedron }} | $12$ | $30$ | $20$ | $5$ | $3$ |

### Testing Whether a Graph Is Planar {#testing-planarity}
kind: skill
prereqs: kuratowski-theorem

1. count: if $E > 3V - 6$ the graph is not planar, nor if it has no triangles and $E > 2V - 4$;
2. simplify: delete vertices of degree 1, and replace paths through vertices of degree 2 by single edges;
3. try to draw it, starting from a long cycle, putting the remaining edges inside or outside it;
4. if that fails, look for a subdivision of $K_5$ or $K_{3,3}$, which proves that it is not planar.

> **!** Passing the count proves nothing: the Petersen graph has $15 \le 24$ edges. A count can only show that a graph is not planar.

```quiz
Q: Is $K_{2,5}$ planar?
+ Yes
- No
Why: Put the five vertices in a line, with one of the other two above it and one below.

Q: Is the cube $Q_3$ planar?
+ Yes
- No
Why: It is drawn in the Table of Platonic Graphs with no crossings.

Q: Is the Petersen graph planar?
- Yes
+ No
Why: It has girth 5, and $15 > 5(10 - 2)/3$.

Q: Is $K_6$ with one edge removed planar?
- Yes
+ No
Why: It has 14 edges, and $3V - 6 = 12$. It also contains $K_5$.
```

## Graph Colouring {#graph-colouring}
flow: down
rows: kinds
wrap: 6

Giving adjacent things different colours: the chromatic number, the bounds on it, and the four colour theorem.

To colour a graph is to split its vertices into independent sets, so colouring is the mathematics of conflicts: exams that can't share a time, regions of a map that can't share a colour, registers that can't share a variable. The chromatic number is hard to compute, and most of this topic is bounds on it. The best known result is about [[planar-graphs|planar graphs]]: four colours always suffice, a theorem whose proof needed a computer.

### Greedy Bound {#greedy-bound}
kind: theorem
prereqs: chromatic-number, vertex-degree

For every graph:
$$\chi(G) \le \Delta(G) + 1.$$

*Proof.* Colour the vertices one at a time. Each has at most $\Delta$ neighbours, already coloured or not, so one of $\Delta + 1$ colours is always free. $\square$

### Lower Bounds on the Chromatic Number {#chromatic-lower-bounds}
kind: theorem
prereqs: chromatic-number, clique-independent-set

For every graph on $n$ vertices:
$$\chi(G) \ge \omega(G), \qquad \chi(G) \ge \frac{n}{\alpha(G)}.$$

*Proof.* The vertices of a clique need different colours. Each colour class is an independent set, of at most $\alpha$ vertices, so at least $n / \alpha$ classes are needed. $\square$

Neither bound need be close: see [[mycielski-theorem]].

### Two-Colourable Graphs {#two-colourable}
kind: theorem
prereqs: chromatic-number, bipartite-characterization

A graph has $\chi(G) \le 2$ if and only if it is bipartite, so if and only if it has no odd cycle.

*Proof.* The two colour classes of a proper colouring are the parts of a bipartite graph, and the other way round. $\square$

### Brooks' Theorem {#brooks-theorem}
kind: theorem
prereqs: greedy-bound

If $G$ is connected, and is neither a complete graph nor an odd cycle, then
$$\chi(G) \le \Delta(G).$$

Brooks, 1941. The two exceptions are exactly where the [[greedy-bound|greedy bound]] is attained: $\chi(K_n) = n = \Delta + 1$, and $\chi(C_{2k+1}) = 3 = \Delta + 1$.

*Idea of the proof.* Order the vertices so that each but the last has a later neighbour, by working inwards along a spanning tree towards a final vertex. Then greedy colouring uses at most $\Delta$ colours except possibly on the last vertex, and the proof arranges that two of its neighbours get the same colour.

```quiz
Q: The Petersen graph has $\Delta = 3$. What does Brooks' Theorem give for $\chi$?
A: 3
Hint: It is connected, and is neither complete nor an odd cycle.
Why: $\chi \le \Delta = 3$, and it has 5-cycles, so $\chi = 3$.
```

### Six Colours Suffice {#six-colour-theorem}
kind: theorem
prereqs: planar-min-degree, chromatic-number

Every planar graph has $\chi(G) \le 6$.

*Proof*, by [[induction]] on $V$. A planar graph has a vertex $v$ of [[planar-min-degree|degree at most 5]]. Colour $G - v$ with 6 colours; at most 5 are in use at the neighbours of $v$, so one is free for $v$. $\square$

### Five Colour Theorem {#five-colour-theorem}
kind: theorem
prereqs: planar-min-degree, kempe-chains

Every planar graph has $\chi(G) \le 5$.

*Proof*, by [[induction]] on $V$. Take $v$ of degree at most 5 and colour $G - v$ with 5 colours. If the neighbours of $v$ miss a colour, use it for $v$. Otherwise $v$ has five neighbours $v_1, \dots, v_5$, in order around it, coloured $1, \dots, 5$. Consider the [[kempe-chains|Kempe chain]] of colours 1 and 3 through $v_1$. If it misses $v_3$, swap its colours; $v_1$ becomes 3, and colour 1 is free for $v$. If it reaches $v_3$, then that path with $v$ makes a cycle with $v_2$ on one side and $v_4$ on the other, so the chain of colours 2 and 4 through $v_2$ can't reach $v_4$. Swapping it frees colour 2. $\square$

Heawood, 1890, from the flaw he found in Kempe's attempt at four colours.

### Four Colour Theorem {#four-colour-theorem}
kind: theorem
prereqs: planar-graph, chromatic-number

Every planar graph has $\chi(G) \le 4$. Equivalently, the regions of every map in the plane can be coloured with 4 colours so that regions sharing a border differ.

Proved by Appel and Haken in 1976, with a computer checking some 1,500 configurations, and more simply by Robertson, Sanders, Seymour and Thomas in 1997. No proof by hand is known. The bound is attained, by $K_4$.

```network
K4
classes: 1 / 2 / 3 / 4
```

### Mycielski's Theorem {#mycielski-theorem}
kind: theorem
prereqs: chromatic-number, clique-independent-set

For every $k$ there is a triangle-free graph with chromatic number $k$. So $\chi$ can be far above $\omega$.

*Construction.* From $G$ with vertices $v_1, \dots, v_n$, form a new graph by adding vertices $u_1, \dots, u_n$ and $w$, with $u_i$ joined to the neighbours of $v_i$, and $w$ to every $u_i$. It remains triangle-free, and its chromatic number is one more. Starting from $K_2$ gives $C_5$, and then the Grötzsch graph, with 11 vertices and $\chi = 4$.

### Deletion–Contraction {#deletion-contraction}
kind: theorem
prereqs: chromatic-polynomial, edge-contraction

For an edge $e$ of a simple graph $G$:
$$P(G, k) = P(G - e, k) - P(G / e, k).$$

*Proof.* The proper colourings of $G - e$ are of two kinds. Those giving the two ends of $e$ different colours are the proper colourings of $G$, and those giving them the same colour are the proper colourings of $G / e$. $\square$

So, by [[induction]] on the number of edges, $P(G, k)$ is a polynomial in $k$.

### Vizing's Theorem {#vizing-theorem}
kind: theorem
prereqs: edge-colouring

For every simple graph:
$$\Delta(G) \le \chi'(G) \le \Delta(G) + 1.$$

Vizing, 1964. The lower bound is clear, since the edges at a vertex need different colours. A graph with $\chi' = \Delta$ is of **class 1**, and one with $\chi' = \Delta + 1$ of **class 2**.

```quiz
Q: A simple graph has $\Delta = 7$. What is the largest $\chi'$ can be?
A: 8
```

### König's Line Colouring Theorem {#konig-line-colouring}
kind: theorem
prereqs: edge-colouring, bipartite-graph

If $G$ is bipartite, then $\chi'(G) = \Delta(G)$.

*Proof*, by [[induction]] on the number of edges. Colour $G - uv$ with $\Delta$ colours. Each of $u$ and $v$ then has fewer than $\Delta$ edges, so a colour $a$ is missing at $u$ and a colour $b$ at $v$. If some colour is missing at both, give it to $uv$. Otherwise take the path of edges coloured alternately $a$ and $b$ from $v$, starting with $a$. It can't reach $u$: $u$ and $v$ are in different parts, so it would arrive by an odd number of steps, on an edge of colour $a$, which is missing at $u$. So swapping the two colours along it leaves $a$ missing at both $u$ and $v$, and $uv$ can take it. $\square$

### Proper Colourings {#proper-colouring}
kind: definition
prereqs: graph

A **proper colouring** of a graph with $k$ colours is a function $c : V \to \{1, \dots, k\}$ such that $c(u) \neq c(v)$ for every edge $uv$. The vertices of one colour form a **colour class**, which is an independent set.

```network
Petersen
classes: 1 3 7 / 2 4 6 10 / 5 8 9
```

### Chromatic Number {#chromatic-number}
kind: definition
prereqs: proper-colouring

The **chromatic number** $\chi(G)$ is the least $k$ such that $G$ has a proper colouring with $k$ colours.

```network
C4
classes: 1 3 / 2 4
caption: $\chi = 2$
---
C5
classes: 1 3 / 2 4 / 5
caption: $\chi = 3$
---
W6
classes: 1 / 2 4 / 3 5 / 6
caption: $\chi = 4$
```

```quiz
Q: What is the chromatic number of this graph?
{{ network: C5; edges: 1-3; size: 130, 120 }}
A: 3
Why: It has a triangle, so at least 3, and 3 colours are enough.

Q: What is the chromatic number of this graph?
{{ network: cube; size: 130, 120 }}
A: 2
Why: The cube is bipartite.
```

### Edge Colourings {#edge-colouring}
kind: definition
prereqs: adjacency

An **edge colouring** gives each edge a colour so that edges sharing a vertex differ. The least number of colours needed is the **chromatic index** $\chi'(G)$. Each colour class is a [[matching]].

```network
K4
edge-classes: 1-2 3-4 / 2-3 4-1 / 1-3 2-4
caption: $\chi'(K_4) = 3$
```

### Chromatic Polynomial {#chromatic-polynomial}
kind: definition
prereqs: proper-colouring

The **chromatic polynomial** $P(G, k)$ is the number of proper colourings of $G$ with colours from a set of $k$. So $\chi(G)$ is the least positive integer $k$ with $P(G, k) > 0$.

### Table of Chromatic Polynomials {#chromatic-polynomial-table}
kind: formula
prereqs: deletion-contraction, graph-families, tree-characterization

: Chromatic polynomials
| Graph | $P(G, k)$ |
| --- | :--- |
| Empty, $n$ vertices | $k^n$ |
| $K_n$ | $k(k - 1)(k - 2) \cdots (k - n + 1)$ |
| Tree, $n$ vertices | $k(k - 1)^{n-1}$ |
| Forest, $n$ vertices, $c$ trees | $k^c (k - 1)^{n-c}$ |
| $C_n$ | $(k - 1)^n + (-1)^n (k - 1)$ |
| $W_n$ | $k\big((k - 2)^{n-1} + (-1)^{n-1} (k - 2)\big)$ |

### Table of Colouring Numbers {#colouring-numbers-table}
kind: formula
prereqs: graph-families, chromatic-number, edge-colouring, clique-independent-set

: Colouring numbers of the families
| Graph | $\chi$ | $\chi'$ | $\omega$ | $\alpha$ |
| --- | :-: | :-: | :-: | :-: |
| $K_n$, $n$ even | $n$ | $n - 1$ | $n$ | $1$ |
| $K_n$, $n \ge 3$ odd | $n$ | $n$ | $n$ | $1$ |
| $C_n$, $n$ even | $2$ | $2$ | $2$ | $n/2$ |
| $C_n$, $n \ge 5$ odd | $3$ | $3$ | $2$ | $(n - 1)/2$ |
| $W_n$, $n \ge 5$ odd | $3$ | $n - 1$ | $3$ | $(n - 1)/2$ |
| $W_n$, $n \ge 6$ even | $4$ | $n - 1$ | $3$ | $(n - 2)/2$ |
| $K_{m,n}$, $m \le n$ | $2$ | $n$ | $2$ | $n$ |
| $Q_d$, $d \ge 1$ | $2$ | $d$ | $2$ | $2^{d-1}$ |
| Petersen | $3$ | $4$ | $2$ | $4$ |

### Kempe Chains {#kempe-chains}
kind: technique
prereqs: proper-colouring

Given a proper colouring and two colours $a$ and $b$, the **Kempe chain** through a vertex is its component in the subgraph induced by the vertices coloured $a$ or $b$. Swapping $a$ and $b$ on one chain leaves the colouring proper.

```network
P5
classes: 1 4 / 2 5 / 3
labels: all
caption: two chains of the first two colours: $\{1, 2\}$ and $\{4, 5\}$
```

### Greedy Colouring {#greedy-colouring}
kind: skill
prereqs: greedy-bound

1. put the vertices in some order;
2. give each in turn the smallest colour not used by its neighbours so far.

The result depends on the order. Taking the vertices by degree, largest first (the Welsh–Powell order), usually does well.

**Example.** On $C_6$, going round the cycle uses 2 colours, while taking opposite vertices in pairs, in the order $1, 4, 2, 5, 3, 6$, uses 3.

```quiz
Q: The vertices of the path $a, b, c, d$ are coloured greedily in the order $a, d, b, c$. How many colours are used?
A: 3
Why: $a$ and $d$ get 1, $b$ gets 2, and $c$ sees 2 and 1, so it gets 3.

Q: In which order does greedy colouring use only 2 colours on that path?
+ $a, b, c, d$
- $a, d, b, c$
Why: Along the path the colours just alternate.
```

### Computing a Chromatic Polynomial {#computing-chromatic-polynomial}
kind: skill
prereqs: deletion-contraction, chromatic-polynomial-table

1. look for a graph in the [[chromatic-polynomial-table|table]], or a part that can be counted directly;
2. for a graph made by gluing two graphs along a clique of size $r$, use
$$P(G, k) = \frac{P(G_1, k)\, P(G_2, k)}{P(K_r, k)};$$
3. otherwise apply [[deletion-contraction]] to an edge, and repeat.

**Example.** $C_4$ with a diagonal is two triangles glued along an edge, so
$$P = \frac{k(k-1)(k-2) \cdot k(k-1)(k-2)}{k(k-1)} = k(k - 1)(k - 2)^2.$$

```quiz
Q: In how many ways can the triangle be properly coloured with 4 colours?
A: 24
Why: $4 \cdot 3 \cdot 2 = 24$.

Q: In how many ways can $C_4$ be properly coloured with 3 colours?
A: 18
Why: $(3 - 1)^4 + (3 - 1) = 18$.

Q: In how many ways can a tree on 5 vertices be properly coloured with 3 colours?
A: 48
Why: $3 \cdot 2^4 = 48$.
```

### Scheduling by Colouring {#scheduling-by-colouring}
kind: skill
prereqs: greedy-colouring, chromatic-lower-bounds

To schedule tasks that conflict in pairs, or to colour any map:
1. make a vertex for each task, and an edge between tasks that can't share a slot;
2. colour the graph: each colour class is a slot;
3. show that the number of slots is the least possible with a lower bound, such as a clique.

For a map, the vertices are the regions, and the edges join regions sharing a border.

```quiz
Q: Exams $A, B, C, D$ have students in common for the pairs $AB$, $BC$, $CD$, $DA$ and $AC$. How many time slots are needed?
A: 3
Why: $A, B, C$ form a triangle, so at least 3; and $B$ and $D$ can share a slot.
```

## Matchings & Flows {#matchings-and-flows}
flow: down
rows: kinds
wrap: 6

Pairing vertices off, and sending as much as possible through a network.

A striking pattern runs through this topic: a largest structure of one kind is exactly as big as a smallest obstruction of another. The largest matching in a bipartite graph equals the smallest vertex cover, the largest flow equals the smallest cut, and the most disjoint paths equals the fewest vertices separating their ends. Each of these min-max theorems follows from the one for flows.

### Hall's Marriage Theorem {#hall-theorem}
kind: theorem
prereqs: matching, bipartite-graph

A bipartite graph with parts $X$ and $Y$ has a matching covering all of $X$ if and only if, for every $S \subseteq X$:
$$|N(S)| \ge |S|.$$

*Proof.* A matching sends $S$ to $|S|$ different vertices of $N(S)$, so the condition is needed. Conversely, argue by [[induction]] on $|X|$. If $|N(S)| > |S|$ for every non-empty proper $S \subset X$, match any $x$ to any neighbour, and the condition still holds for the rest. Otherwise some $S$ has $|N(S)| = |S|$. Match $S$ into $N(S)$ by induction. The rest of $X$ still meets the condition in $G - S - N(S)$: if $T$ had too few new neighbours, $S \cup T$ would have too few in $G$. So it can be matched too. $\square$

Hall, 1935.

```network
edges: a-1 a-2 b-1 c-1 c-3 c-4 d-3
classes: a b c d / 1 2 3 4
layout: two-rows
heavy: a-2 b-1 c-4 d-3
```

```quiz
Q: In a bipartite graph, three applicants between them are qualified for only two jobs. Can all the applicants be matched to jobs of their own?
- Yes
+ No
Why: Hall's condition fails for those three.
```

### A Regular Bipartite Graph Has a Perfect Matching {#regular-bipartite-matching}
kind: theorem
prereqs: hall-theorem, regular-graph

Every $k$-regular bipartite graph with $k \ge 1$ has a perfect matching.

*Proof.* The edges leaving a set $S \subseteq X$ number $k|S|$, and they all end in $N(S)$, which can take at most $k|N(S)|$. So $|N(S)| \ge |S|$, and [[hall-theorem|Hall's Theorem]] gives a matching. The parts have the same size, since $k|X| = k|Y|$, so it is perfect. $\square$

### Weak Duality for Matchings {#matching-cover-bound}
kind: theorem
prereqs: matching, vertex-cover

For every graph:
$$\nu(G) \le \beta(G).$$

*Proof.* A vertex cover contains an end of each edge of a matching, and no vertex is an end of two. $\square$

### König's Theorem {#konig-theorem}
kind: theorem
prereqs: matching-cover-bound, max-flow-min-cut, flow-integrality

In a bipartite graph, the largest matching and the smallest vertex cover have the same size:
$$\nu(G) = \beta(G).$$

*Proof.* Add a source $s$ joined to all of $X$, and a sink $t$ joined from all of $Y$, directing edges from $X$ to $Y$, with capacity 1 on the edges at $s$ and $t$ and a large capacity on the rest. An [[flow-integrality|integer flow]] of value $f$ is a matching of size $f$. A cut of finite capacity takes in no large edge, so the $X$ vertices on the $t$ side and the $Y$ vertices on the $s$ side form a vertex cover, of size equal to the cut. So [[max-flow-min-cut|max-flow min-cut]] gives the theorem. $\square$

König, 1931. It fails without bipartiteness: for a triangle, $\nu = 1$ and $\beta = 2$.

```network
edges: a-1 a-2 a-3 b-1 c-1 c-3 d-1
classes: a b c d / 1 2 3
layout: two-rows
heavy: a-2 b-1 c-3
mark: a c 1
```

### Gallai's Identities {#gallai-identities}
kind: theorem
prereqs: matching, vertex-cover, clique-independent-set

For a graph on $n$ vertices:
$$\alpha(G) + \beta(G) = n.$$
If it has no isolated vertices:
$$\nu(G) + \rho(G) = n,$$
where $\rho(G)$ is the fewest edges covering every vertex.

*Proof.* $S$ is an independent set exactly when $V \setminus S$ is a vertex cover, which gives the first. For the second, a largest matching extended by one edge at each unmatched vertex is an edge cover of size $n - \nu$; and a smallest edge cover is a set of stars, as many as $n - \rho$, with one edge from each making a matching. $\square$

```quiz
Q: A graph on 12 vertices has a smallest vertex cover of 7. What is $\alpha$?
A: 5

Q: A bipartite graph has a largest matching of 5 edges. What is its smallest vertex cover?
A: 5
```

### Berge's Theorem {#berge-theorem}
kind: theorem
prereqs: augmenting-path

A matching $M$ of a graph is a largest matching if and only if $G$ has no $M$-augmenting path.

*Proof.* Switching along an augmenting path gives a matching with one edge more. Conversely, if $M'$ is larger than $M$, every vertex has degree at most 2 in the symmetric difference $M \triangle M'$, so it is made of paths and even cycles alternating between the two. It has more edges of $M'$ than of $M$, so some path has too, and this is $M$-augmenting. $\square$

Berge, 1957.

### Tutte's Theorem {#tutte-theorem}
kind: theorem
prereqs: matching, connected-graph

A graph has a perfect matching if and only if, for every set $S$ of vertices, the number $o(G - S)$ of components of $G - S$ with an odd number of vertices satisfies
$$o(G - S) \le |S|.$$

Tutte, 1947. The condition is clearly needed, since an odd component must match at least one of its vertices into $S$, and each vertex of $S$ takes only one. It gives Petersen's theorem of 1891: every cubic graph with no bridge has a perfect matching.

### Weak Duality for Flows {#flow-cut-bound}
kind: theorem
prereqs: flow-network, st-cut

For every flow $f$ and every $s$–$t$ cut $(S, T)$ of a network:
$$|f| \le c(S, T).$$

*Proof.* Summing conservation over the vertices of $S$, the value of $f$ is the flow out of $S$ less the flow into $S$, and that is at most the capacity out of $S$. $\square$

### Max-Flow Min-Cut Theorem {#max-flow-min-cut}
kind: theorem
prereqs: ford-fulkerson

In every network, the greatest value of a flow equals the least capacity of an $s$–$t$ cut.

*Proof.* Let $f$ be a largest flow, and $S$ the set of vertices reachable from $s$ along edges of the [[ford-fulkerson|residual graph]]. If $t \in S$, a path to it would allow a larger flow, so $t \notin S$. Every edge out of $S$ is then full, and every edge into $S$ is empty, so $|f| = c(S, T)$. With [[flow-cut-bound|weak duality]] both are extreme. $\square$

Ford and Fulkerson, 1956.

```network
edges: s>a:3 s>b:2 a>b:1 a>t:2 b>t:3
at: s(0,0) a(1.3,0.8) b(1.3,-0.8) t(2.6,0)
caption: the largest flow and the smallest cut are both 5
```

```quiz
Q: For the network drawn above, what is the capacity of the cut $S = \{s, a\}$?
A: 5
Why: The edges out of $S$ are $sb$, $ab$ and $at$, with capacities $2 + 1 + 2 = 5$.
```

### Integrality Theorem {#flow-integrality}
kind: theorem
prereqs: max-flow-min-cut

If all capacities are integers, there is a largest flow in which every edge carries an integer.

*Proof.* Start from the zero flow. Every step of [[ford-fulkerson|Ford–Fulkerson]] then adds an integer along a path, and the value rises by at least 1, so it stops. $\square$

### Menger's Theorem {#menger-theorem}
kind: theorem
prereqs: max-flow-min-cut, flow-integrality, graph-connectivity-numbers

For non-adjacent vertices $s$ and $t$ of a graph, the most paths from $s$ to $t$ sharing no vertex but their ends equals the fewest vertices whose deletion separates $s$ from $t$. The same holds for paths sharing no edge, and sets of edges. So:
- $G$ is $k$-connected if and only if every two vertices are joined by $k$ paths sharing no other vertex;
- $G$ is $k$-edge-connected if and only if every two vertices are joined by $k$ paths sharing no edge.

*Proof.* For edges, give every edge capacity 1 in each direction: an [[flow-integrality|integer flow]] of value $k$ is $k$ edge-disjoint paths, and a cut is a set of edges separating $s$ from $t$. For vertices, split each vertex into an in-vertex and an out-vertex, joined by an edge of capacity 1. $\square$

Menger, 1927. For $k = 2$, Whitney's theorem: a graph of at least 3 vertices is 2-connected if and only if every two vertices lie on a common cycle.

```network
Q3
path: 1 2 4 8
heavy: 1-3 3-7 7-8 1-5 5-6 6-8
mark: 1 8
caption: three paths between opposite corners of $Q_3$, sharing no other vertex
```

### Matchings {#matching}
kind: definition
prereqs: adjacency

A **matching** is a set of edges no two of which share a vertex. It **covers** the ends of its edges. It is **perfect** if it covers every vertex, and **maximal** if no edge can be added to it. The size of a largest matching is $\nu(G)$.

> **!** A maximal matching need not be a largest one.

```network
P4
heavy: 2-3
caption: maximal, but not largest
---
P4
heavy: 1-2 3-4
caption: largest, and perfect
```

### Vertex Covers {#vertex-cover}
kind: definition
prereqs: adjacency

A **vertex cover** is a set of vertices containing at least one end of every edge. The size of a smallest one is $\beta(G)$.

### Alternating & Augmenting Paths {#augmenting-path}
kind: definition
prereqs: matching, walks

Given a matching $M$, a path is **$M$-alternating** if its edges are in $M$ and not in $M$ in turn. It is **$M$-augmenting** if it also starts and ends at vertices not covered by $M$. Switching the edges of an augmenting path in and out of $M$ makes a matching with one more edge.

```network
P6
heavy: 2-3 4-5
labels: all
caption: an augmenting path for the matching $\{23, 45\}$
---
P6
heavy: 1-2 3-4 5-6
labels: all
caption: after switching
```

### Flow Networks {#flow-network}
kind: definition
prereqs: digraph, weighted-graph

A **network** is a directed graph with a source $s$, a sink $t$, and a capacity $c(e) \ge 0$ on every edge. A **flow** is a function $f$ on the edges with:
1. $0 \le f(e) \le c(e)$ for every edge, the capacity condition;
2. at every vertex other than $s$ and $t$, the flow in equals the flow out, conservation.

The **value** $|f|$ is the net flow out of $s$.

### Cuts {#st-cut}
kind: definition
prereqs: flow-network, partitions

An **$s$–$t$ cut** is a partition of the vertices into sets $S$ and $T$ with $s \in S$ and $t \in T$. Its **capacity** $c(S, T)$ is the sum of the capacities of the edges from $S$ to $T$.

### Ford–Fulkerson Method {#ford-fulkerson}
kind: technique
prereqs: flow-cut-bound

1. start with the zero flow;
2. form the **residual graph**: an edge $uv$ with spare capacity $c - f$, and an edge $vu$ with capacity $f$, able to undo flow;
3. find a path from $s$ to $t$ in the residual graph, and push the least residual capacity along it;
4. repeat until there is no such path. The set reachable from $s$ is then a smallest cut.

Finding each path by [[bfs|breadth-first search]], the Edmonds–Karp rule, makes the number of steps polynomial, whatever the capacities.

### Matching by Augmenting Paths {#matching-by-augmenting}
kind: technique
prereqs: berge-theorem

1. start from any matching, such as the empty one;
2. search from an unmatched vertex of $X$, along non-matching edges to $Y$ and back along matching edges;
3. on reaching an unmatched vertex of $Y$, switch the edges along that path;
4. repeat until no search succeeds. By [[berge-theorem|Berge's Theorem]] the matching is then a largest one.

### Checking Hall's Condition {#checking-hall}
kind: skill
prereqs: hall-theorem

1. for each vertex of $X$, list its neighbours;
2. look for a small set $S$ with few neighbours in all, starting with vertices of low degree, and with vertices that have the same neighbours;
3. if $|N(S)| < |S|$, no matching covers $X$, and $S$ is the proof;
4. otherwise build the matching.

```quiz
Q: Students $a, b, c, d$ can sit in seats: $a$: 1, 2; $b$: 1; $c$: 1, 2; $d$: 2, 3, 4. Can they all be seated?
- Yes
+ No
Why: $\{a, b, c\}$ have only the seats $\{1, 2\}$ between them.

Q: Students $a, b, c$ can sit in seats: $a$: 1, 2; $b$: 2, 3; $c$: 1, 3. Can they all be seated?
+ Yes
- No
Why: $a$ in 1, $b$ in 2 and $c$ in 3.
```

## Directed Graphs {#directed-graphs}
flow: down
rows: kinds
wrap: 6

Graphs whose edges have a direction: one-way streets, dependencies and tournaments.

A directed graph can be connected without it being possible to get from everywhere to everywhere, so connectivity splits in two. The strongly connected components, once contracted, leave a directed acyclic graph, and those are the graphs of dependencies: the arrows of this atlas between concepts are one.

### Handshaking for Digraphs {#digraph-handshaking}
kind: theorem
prereqs: in-and-out-degree, sigma-notation

In every directed graph:
$$\sum_{v} \deg^+ v = \sum_{v} \deg^- v = |A|.$$

*Proof.* Every arc leaves one vertex and enters one vertex. $\square$

### Directed Euler Circuits {#directed-euler-theorem}
kind: theorem
prereqs: in-and-out-degree, euler-circuit-theorem

A directed graph with all its arcs in one weak component has an Euler circuit if and only if $\deg^+ v = \deg^- v$ at every vertex.

*Proof.* As for [[euler-circuit-theorem|Euler's Theorem]]: a closed trail leaves a vertex as often as it enters, and a longest trail must be closed and contain every arc. $\square$

### Sources and Sinks {#dag-source}
kind: theorem
prereqs: dag

Every directed acyclic graph has a vertex with no arcs in, a **source**, and one with no arcs out, a **sink**.

*Proof.* Follow arcs backwards from any vertex. No vertex can repeat, as that would be a directed cycle, so the walk stops, and it stops at a source. For a sink, follow them forwards. $\square$

### Topological Orders Exist {#topological-order-theorem}
kind: theorem
prereqs: dag-source, topological-order

A directed graph has a topological order if and only if it is acyclic.

*Proof.* A directed cycle has no such order, since some arc of it would run backwards. Conversely, an acyclic graph has a [[dag-source|source]]. Put it first, delete it, and order the rest by [[induction]]. $\square$

### The Condensation Is Acyclic {#condensation-dag}
kind: theorem
prereqs: strong-connectivity, dag

Contracting each strongly connected component of a directed graph to a vertex leaves a directed acyclic graph, the **condensation**.

*Proof.* A directed cycle through several components would put all their vertices in one strongly connected set, against their being different components. $\square$

```network
edges: a>b b>c c>a c>d d>e e>d e>f
at: a(0,1.2) b(0,0) c(1,0.6) d(2.4,0.6) e(3.6,0.6) f(4.8,0.6)
size: 330, 104
classes: a b c / d e / f
caption: three strong components, in a line
```

### Rédei's Theorem {#redei-theorem}
kind: theorem
prereqs: tournament, induction

Every tournament has a Hamilton path, a directed path through all its vertices.

*Proof*, by [[induction]] on the number of vertices. Delete a vertex $v$ and take a Hamilton path $u_1, \dots, u_{n-1}$ of the rest. If $v \to u_1$, put $v$ first. Otherwise let $u_i$ be the last vertex with $u_i \to v$. Then $u_i \to v$, and either $v \to u_{i+1}$ or $u_i$ is the end, so $v$ fits in straight after $u_i$. $\square$

Rédei, 1934.

### Kings in a Tournament {#king-theorem}
kind: theorem
prereqs: tournament

In a tournament, a vertex of greatest out-degree reaches every other vertex by a directed path of length at most 2.

*Proof.* Let $v$ have the greatest out-degree. If $u$ beats $v$, and $u$ were not reached in two steps, then $u$ would beat $v$ and everything $v$ beats, for an out-degree greater than that of $v$. $\square$

Landau, 1953, from a study of pecking orders.

### Robbins' Theorem {#robbins-theorem}
kind: theorem
prereqs: orientation, strong-connectivity, bridge-no-cycle, dfs

A connected graph has a strongly connected orientation if and only if it has no bridge.

*Proof.* However a bridge is directed, nothing can cross back. Conversely, run [[dfs|depth-first search]]: direct tree edges away from the root, and back edges towards it. Every vertex is reached from the root. Each tree edge lies on a cycle, so some back edge passes over it, and that shows that the root can be reached back from every vertex. $\square$

Robbins, 1939: a town's streets can all be made one-way, leaving every place reachable from every other, exactly when no street is its only link between two parts of town.

### Directed Graphs {#digraph}
kind: definition
prereqs: graph, cartesian-product

A **directed graph**, or **digraph**, is a pair $D = (V, A)$ of a finite set $V$ of vertices and a set $A \subseteq V \times V$ of **arcs**. The arc $(u, v)$ runs from its **tail** $u$ to its **head** $v$.

```network
edges: a>b b>c c>a c>d
at: a(0,1) b(0,0) c(1,0.5) d(2,0.5)
```

### In- and Out-Degree {#in-and-out-degree}
kind: definition
prereqs: digraph

The **out-degree** $\deg^+ v$ of a vertex is the number of arcs leaving it, and the **in-degree** $\deg^- v$ the number entering it.

### Strong Connectivity {#strong-connectivity}
kind: definition
prereqs: digraph, equivalence-relations

A digraph is **strongly connected** if each vertex has a directed path to each other. It is **weakly connected** if the graph obtained by forgetting the directions is connected. "Each reaches the other" is an [[equivalence-relations|equivalence relation]] on vertices, whose classes are the **strongly connected components**.

### Directed Acyclic Graphs {#dag}
kind: definition
prereqs: digraph

A **directed acyclic graph**, or DAG, is a digraph with no directed cycle.

### Topological Order {#topological-order}
kind: definition
prereqs: digraph

A **topological order** of a digraph is a list of its vertices in which every arc runs from earlier to later.

```network
edges: a>b a>c b>d c>d d>e
at: a(0,0) b(1,0.6) c(2,-0.6) d(3,0) e(4,0)
```

### Tournaments {#tournament}
kind: definition
prereqs: digraph, edge-bound

A **tournament** is a digraph with exactly one arc between each pair of vertices: everyone plays everyone, with no ties. The **score** of a vertex is its out-degree, and the scores sum to $\binom{n}{2}$.

### Orientations {#orientation}
kind: definition
prereqs: digraph

An **orientation** of a graph gives each of its edges a direction.

### Topological Sort {#topological-sort}
kind: technique
prereqs: topological-order-theorem

1. find the in-degree of every vertex;
2. put the vertices of in-degree 0 in a list;
3. take a vertex from the list and write it down next;
4. delete its arcs out, lowering the in-degree of their heads, and add any that reach 0 to the list;
5. repeat until the list is empty. If vertices remain unwritten, the digraph has a directed cycle.

This is Kahn's algorithm, and it runs in time proportional to $|V| + |A|$.

```quiz
Q: A digraph on $\{a, b, c, d\}$ has the arcs $ab$, $ac$, $bd$, $cd$. How many topological orders has it?
A: 2
Why: $a, b, c, d$ and $a, c, b, d$.

Q: Which of these is a topological order of the arcs $ca$, $ab$, $db$?
+ $c, d, a, b$
- $a, c, d, b$
- $b, a, c, d$
Why: $c$ comes before $a$, and $a$ and $d$ before $b$.
```

### Strongly Connected Components {#finding-strong-components}
kind: technique
prereqs: strong-connectivity, dfs

Kosaraju's algorithm:
1. run [[dfs|depth-first search]] over the digraph, and list the vertices in the order in which the search finishes with them;
2. reverse every arc;
3. taking vertices from the end of the list, run a search in the reversed digraph from each one not yet reached. Each search reaches exactly one strongly connected component.

### Reading a Tournament {#reading-tournaments}
kind: skill
prereqs: redei-theorem, digraph-handshaking

1. the scores sum to $\binom{n}{2}$, one for each game;
2. a vertex of top score reaches every other in at most 2 steps;
3. a ranking in which each player beat the next always exists, by [[redei-theorem|Rédei's Theorem]], even when it isn't transitive.

```quiz
Q: In a round robin of 6 teams with no ties, how many games are played?
A: 15

Q: In a round robin of 5 players, four have won $3, 3, 2$ and $1$ games. How many games did the fifth win?
A: 1
Why: The scores sum to $\binom{5}{2} = 10$.
```

## Shortest Paths {#shortest-paths}
flow: down
rows: kinds
wrap: 6

The cheapest way from one vertex to another, in a weighted graph.

With no weights, [[bfs|breadth-first search]] finds shortest paths. With weights, everything turns on one fact, that a piece of a shortest path is a shortest path. The algorithms differ in what they assume about the weights and in whether they need the distances from one vertex or between all pairs.

### Pieces of Shortest Paths Are Shortest {#shortest-path-substructure}
kind: theorem
prereqs: weighted-distance

If a shortest path from $u$ to $v$ passes through $x$ and $y$, in that order, then the part of it from $x$ to $y$ is a shortest path from $x$ to $y$.

*Proof.* A shorter way from $x$ to $y$ could be put in its place, to give a shorter path from $u$ to $v$. $\square$

So $d(s, v) \le d(s, u) + w(uv)$ for every edge $uv$, with equality on shortest paths.

### Dijkstra's Algorithm Is Correct {#dijkstra-correct}
kind: theorem
prereqs: shortest-path-substructure

With non-negative weights, each vertex chosen by [[dijkstra|Dijkstra's algorithm]] has its true distance as its label.

*Proof.* Suppose $v$ is the first vertex chosen with too large a label. A shortest path to $v$ leaves the set of finished vertices at some edge $xy$. Then $y$'s label is at most $d(s, x) + w(xy) = d(s, y) \le d(s, v)$, the last step because weights are not negative. As $v$ was chosen over $y$, its label is at most $y$'s, so it is at most $d(s, v)$, a contradiction. $\square$

### Negative Cycles {#negative-cycles}
kind: theorem
prereqs: weighted-distance

If a directed cycle of negative total weight can be reached from $s$, and can reach $v$, then there is no shortest walk from $s$ to $v$. Otherwise a shortest walk exists and can be taken to be a path, of at most $|V| - 1$ arcs.

*Proof.* Going once more round a negative cycle lowers the weight every time. With no such cycle, deleting a cycle from a walk never raises its weight, so the walk can be cut down to a path. $\square$

### Weighted Distance {#weighted-distance}
kind: definition
prereqs: weighted-graph, walks

The **length** of a path in a weighted graph is the sum of the weights of its edges. The **distance** $d(u, v)$ is the least length of a path from $u$ to $v$.

### Table of Shortest-Path Algorithms {#shortest-path-table}
kind: formula
prereqs: dijkstra, bellman-ford, floyd-warshall

: Which algorithm
| Algorithm | Finds | Weights | Time |
| --- | :--- | :--- | :-: |
| [[bfs]] | from one vertex | none | $V + E$ |
| [[dijkstra]] | from one vertex | non-negative | $E \log V$ |
| [[bellman-ford]] | from one vertex | any, and finds negative cycles | $VE$ |
| [[floyd-warshall]] | between all pairs | any, with no negative cycle | $V^3$ |

### Dijkstra's Algorithm {#dijkstra}
kind: technique
prereqs: shortest-path-substructure

1. label the start $s$ with 0, and every other vertex with $\infty$;
2. choose the unfinished vertex $v$ with the smallest label, and mark it finished;
3. for each neighbour $u$ of $v$, replace the label of $u$ by label$(v) + w(vu)$ if that is smaller;
4. repeat from step 2 until every vertex is finished.

> **!** It fails with negative weights: a finished vertex could later be reached more cheaply.

**Example.** From $a$, the vertices finish in the order $a, c, b, d, e$, with labels $0, 2, 3, 8, 10$. The shortest path to $e$ is drawn.

```network
edges: a-b:4 a-c:2 b-c:1 b-d:5 c-d:8 c-e:10 d-e:2
at: a(0,0.7) b(1.2,1.4) c(1.2,0) d(2.6,1.4) e(2.6,0)
path: a c b d e
```

```quiz
Q: In the graph above, what is the distance from $a$ to $d$?
A: 8
Why: $a, c, b, d$ has length $2 + 1 + 5 = 8$.

Q: In the graph above, what is the distance from $c$ to $e$?
A: 8
Why: $c, b, d, e$ has length $1 + 5 + 2 = 8$, less than the direct edge of 10.
```

### Bellman–Ford Algorithm {#bellman-ford}
kind: technique
prereqs: negative-cycles, digraph

1. label the start $s$ with 0, and every other vertex with $\infty$;
2. $|V| - 1$ times, go through every arc $uv$, and replace the label of $v$ by label$(u) + w(uv)$ if that is smaller;
3. go through the arcs once more: if a label would still fall, there is a negative cycle.

After round $k$ every label is at most the length of the best path of at most $k$ arcs, and by [[negative-cycles]] $|V| - 1$ arcs are enough.

### Floyd–Warshall Algorithm {#floyd-warshall}
kind: technique
prereqs: negative-cycles, shortest-path-substructure

1. start from the matrix $d$ with $d_{ij} = w(v_iv_j)$, with $0$ on the diagonal and $\infty$ where there is no edge;
2. for each $k$ from 1 to $n$, and for all $i, j$, replace $d_{ij}$ by $\min(d_{ij},\ d_{ik} + d_{kj})$.

After step $k$, $d_{ij}$ is the shortest length using only $v_1, \dots, v_k$ as intermediate vertices.

## Extremal Graphs & Ramsey Theory {#extremal-and-ramsey}
flow: down
rows: kinds
wrap: 6

How many edges a graph can have while avoiding a pattern, and why large enough structures can't avoid order.

Extremal graph theory asks how large a graph can be without containing something: Mantel's and Turán's theorems answer it for triangles and cliques. Ramsey theory asks the reverse: how large a graph must be for a pattern to be forced, in it or in its complement. Complete disorder is impossible, but the numbers involved are very hard to pin down.

### Mantel's Theorem {#mantel-theorem}
kind: theorem
prereqs: clique-independent-set, vertex-degree

A triangle-free graph on $n$ vertices has at most $\lfloor n^2/4 \rfloor$ edges, and only $K_{\lfloor n/2 \rfloor, \lceil n/2 \rceil}$ attains this.

*Proof of the bound.* Take a vertex $v$ of degree $\Delta$. Its neighbours are pairwise non-adjacent, so every edge has an end among the $n - \Delta$ other vertices, each of which has degree at most $\Delta$. So
$$|E| \le (n - \Delta)\Delta \le \frac{n^2}{4}. \quad \square$$

Mantel, 1907.

```quiz
Q: What is the greatest number of edges of a triangle-free graph on 9 vertices?
A: 20
Why: $\lfloor 81/4 \rfloor = 20$, from $K_{4,5}$.
```

### Turán's Theorem {#turan-theorem}
kind: theorem
prereqs: turan-graph, clique-independent-set

A graph on $n$ vertices with no $K_{r+1}$ has at most as many edges as the [[turan-graph|Turán graph]] $T(n, r)$, and only $T(n, r)$ attains this. In particular:
$$|E| \le \left(1 - \frac{1}{r}\right)\frac{n^2}{2}.$$

*Proof sketch*, by [[induction]] on $n$ in steps of $r$. A largest $K_{r+1}$-free graph contains a $K_r$. Each vertex outside it has at most $r - 1$ neighbours in it, and the graph outside it is $K_{r+1}$-free. So
$$|E| \le \binom{r}{2} + (n - r)(r - 1) + t_r(n - r) = t_r(n). \quad \square$$

Turán, 1941. The case $r = 2$ is [[mantel-theorem|Mantel's Theorem]].

### Ramsey's Theorem {#ramsey-theorem}
kind: theorem
prereqs: ramsey-number, pigeonhole-principle, combinations

The Ramsey number $R(s, t)$ is finite for all $s, t \ge 2$. In fact
$$R(s, t) \le R(s - 1, t) + R(s, t - 1),$$
and so
$$R(s, t) \le \binom{s + t - 2}{s - 1}.$$

*Proof.* Take $R(s - 1, t) + R(s, t - 1)$ vertices, with every edge red or blue, and a vertex $v$. By the [[pigeonhole-principle|pigeonhole principle]], $v$ has at least $R(s - 1, t)$ red neighbours or at least $R(s, t - 1)$ blue ones. In the first case those contain a blue $K_t$, or a red $K_{s-1}$ that makes a red $K_s$ with $v$; the second case is the same. The binomial bound follows by [[induction]], with Pascal's rule, from $R(2, t) = t$. $\square$

Ramsey, 1930.

```quiz
Q: What upper bound does Ramsey's Theorem give for $R(4, 4)$?
A: 20
Why: $\binom{6}{3} = 20$. The true value is 18.
```

### Six People at a Party {#ramsey-three-three}
kind: theorem
prereqs: ramsey-theorem

$R(3, 3) = 6$: among any 6 people, 3 know each other or 3 are strangers to each other, and 5 people are not enough.

*Proof.* The bound gives $R(3, 3) \le R(2, 3) + R(3, 2) = 6$. For 5, colour the edges of $K_5$ as below: a 5-cycle in one colour and the pentagram in the other, neither of which has a triangle. $\square$

```network
K5
edge-classes: 1-2 2-3 3-4 4-5 5-1 / 1-3 3-5 5-2 2-4 4-1
```

### Lower Bound for Ramsey Numbers {#erdos-ramsey-bound}
kind: theorem
prereqs: ramsey-number, combinations

For every $k \ge 3$:
$$R(k, k) > 2^{k/2}.$$

*Proof.* Take $n \le 2^{k/2}$ vertices. Of the $2^{\binom{n}{2}}$ colourings of the edges in two colours, a given $k$-set is all one colour in $2 \cdot 2^{\binom{n}{2} - \binom{k}{2}}$. So at most a fraction $\binom{n}{k} 2^{1 - \binom{k}{2}}$ of them have any such set, and this is
$$\frac{n^k}{k!} \cdot 2^{1 - \binom{k}{2}} \le \frac{2^{k/2 + 1}}{k!} < 1.$$
So some colouring has none. $\square$

Erdős, 1947, the beginning of the probabilistic method: the proof shows that such colourings exist, without constructing one.

### Turán Graph {#turan-graph}
kind: definition
prereqs: bipartite-graph

The **Turán graph** $T(n, r)$ is the complete $r$-partite graph on $n$ vertices with parts as equal as possible: its parts have sizes $\lfloor n/r \rfloor$ or $\lceil n/r \rceil$, and two vertices are adjacent exactly when they lie in different parts. It has no $K_{r+1}$, as its vertices fall into $r$ independent sets.

Its number of edges is $t_r(n)$. For $n = qr + s$ with $0 \le s < r$:
$$t_r(n) = \left(1 - \frac{1}{r}\right)\frac{n^2 - s^2}{2} + \binom{s}{2}.$$

```network
K2,2,2
classes: 1 2 / 3 4 / 5 6
caption: $T(6, 3)$
---
K3,3
classes: 1 2 3 / 4 5 6
caption: $T(6, 2)$
```

```quiz
Q: How many edges has $T(7, 3)$?
A: 16
Why: Parts of sizes $3, 2, 2$: $3 \cdot 2 + 3 \cdot 2 + 2 \cdot 2 = 16$.

Q: How many edges has $T(6, 3)$?
A: 12
```

### Ramsey Numbers {#ramsey-number}
kind: definition
prereqs: clique-independent-set

The **Ramsey number** $R(s, t)$ is the least $n$ such that every graph on $n$ vertices has a clique of size $s$ or an independent set of size $t$. Equivalently, every colouring of the edges of $K_n$ in red and blue has a red $K_s$ or a blue $K_t$.

It is symmetric, $R(s, t) = R(t, s)$, by taking complements, and $R(2, t) = t$.

### Table of Ramsey Numbers {#ramsey-table}
kind: formula
prereqs: ramsey-number

The known values of $R(s, t)$. For $R(5, 5)$ only bounds are known: $43 \le R(5, 5) \le 46$.

: Ramsey numbers
| $R(s, t)$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ |
| ---: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $2$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ |
| $3$ | $3$ | $6$ | $9$ | $14$ | $18$ | $23$ | $28$ | $36$ |
| $4$ | $4$ | $9$ | $18$ | $25$ | | | | |

### Counting with the Extremal Bounds {#using-extremal-bounds}
kind: skill
prereqs: turan-theorem

1. name what is being avoided, a triangle or a $K_{r+1}$;
2. the most edges possible is that of $T(n, r)$;
3. if a graph has more edges than that, it must contain the pattern.

```quiz
Q: A graph on 10 vertices has 26 edges. Must it contain a triangle?
+ Yes
- No
Why: A triangle-free graph on 10 vertices has at most $\lfloor 100/4 \rfloor = 25$ edges.

Q: A graph on 8 vertices has no $K_4$. What is the greatest number of edges it can have?
A: 21
Why: $T(8, 3)$ has parts $3, 3, 2$: $9 + 6 + 6 = 21$.
```
