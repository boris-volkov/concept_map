# Linear Algebra
color: #6b6b2a

Vectors and matrices: arithmetic with whole lists of numbers at once, for arrows in the plane, systems of equations, and the transformations that move shapes around.

## Axioms {#linear-algebra-axioms}

The axioms of a vector space.

### Vector Space Axioms {#vector-space-axioms}
kind: axiom
prereqs: vector-operations, field-axioms

A vector space over $\mathbb{R}$ is a set $V$ with addition and scalar multiplication such that, for all $u, v, w \in V$ and $a, b \in \mathbb{R}$: $u + v = v + u$; $(u + v) + w = u + (v + w)$; there is $\mathbf{0}$ with $v + \mathbf{0} = v$; every $v$ has $-v$ with $v + (-v) = \mathbf{0}$; $a(u + v) = au + av$; $(a + b)v = av + bv$; $a(bv) = (ab)v$; and $1v = v$.

The arrows in the plane, $\mathbb{R}^n$, polynomials and functions are all vector spaces.

## Vectors

Quantities with a size and a direction.

### Vectors {#vector-basics}
kind: definition
prereqs: coordinate-plane, translations

An arrow with a length and a direction, like a displacement or a force, written in components as $\langle 3, 4 \rangle$. Where it starts doesn't matter.

### Adding & Scaling Vectors {#vector-operations}
kind: skill
prereqs: vector-basics

Add vectors tip to tail, or component by component: $\langle 1, 2 \rangle + \langle 3, -1 \rangle = \langle 4, 1 \rangle$. Multiplying by a number stretches the arrow.

### Magnitude & Direction {#vector-magnitude-direction}
prereqs: vector-basics, distance-formula, inverse-trig-ratios

The length of $\langle a, b \rangle$ is $\sqrt{a^2 + b^2}$, and its direction angle has $\tan\theta = \frac{b}{a}$. $\langle 3, 4 \rangle$ has length 5.

### The Dot Product {#dot-product}
kind: definition
prereqs: vector-operations, law-of-cosines

$\langle a, b \rangle \cdot \langle c, d \rangle = ac + bd$, a single number that also equals $|u||v|\cos\theta$. It is 0 exactly when the vectors are perpendicular.

## Matrices

Rectangular arrays of numbers, and the arithmetic of whole systems at once.

### Matrices {#matrix-basics}
kind: definition
prereqs: linear-systems

A rectangular array of numbers. A system of linear equations can be stored as the matrix of its coefficients.

### Matrix Arithmetic {#matrix-operations}
kind: skill
prereqs: matrix-basics

Add matrices entry by entry. Multiply them row by column, which is not commutative: $AB$ and $BA$ usually differ.

### Row Reduction
kind: technique
prereqs: matrix-basics, elimination-method

The elimination method carried out on a system's matrix: swap two rows, scale a row, or add a multiple of one row to another, until the solution can be read straight off.

### Matrices as Transformations {#matrix-transformations}
prereqs: matrix-operations, rigid-motions, dilations

A $2 \times 2$ matrix moves every point of the plane: $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ turns it a quarter turn about the origin, and $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ doubles its distance from it. Multiplying two matrices does one move after the other.

### Determinants
kind: definition
prereqs: matrix-operations

A single number computed from a square matrix: for a $2 \times 2$ matrix, $\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$. It is the factor by which the matrix scales areas, and it is 0 exactly when the matrix has no inverse.

### Inverse Matrices & Systems {#matrix-inverses}
prereqs: determinants, row-reduction

$A^{-1}$ undoes $A$, so the system $A\mathbf{x} = \mathbf{b}$ has the solution $\mathbf{x} = A^{-1}\mathbf{b}$.
