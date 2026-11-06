# Linear Algebra
color: #6b6b2a
built-on: algebra

Vectors and matrices: arithmetic with whole lists of numbers at once, for arrows in the plane, systems of equations, and the transformations that move shapes around.

## Axioms {#linear-algebra-axioms}

The axioms of a vector space.

### Vector Space Axioms {#vector-space-axioms}
kind: axiom
prereqs: vector-operations, field-axioms

A vector space over $\mathbb{R}$ is a set $V$ with addition and scalar multiplication such that, for all $u, v, w \in V$ and $a, b \in \mathbb{R}$:
1. $u + v = v + u$;
2. $(u + v) + w = u + (v + w)$;
3. there is $\mathbf{0}$ with $v + \mathbf{0} = v$;
4. every $v$ has $-v$ with $v + (-v) = \mathbf{0}$;
5. $a(u + v) = au + av$;
6. $(a + b)v = av + bv$;
7. $a(bv) = (ab)v$;
8. $1v = v$.

The arrows in the plane, $\mathbb{R}^n$, polynomials and functions are all vector spaces.

## Vectors
rows: kinds
wrap: 6

Quantities with a size and a direction.

### Laws of Vector Arithmetic {#vector-laws}
kind: theorem
prereqs: vector-operations

For vectors $\mathbf{u}$, $\mathbf{v}$ and numbers $c$:
$$\begin{aligned} \mathbf{u} + \mathbf{v} &= \mathbf{v} + \mathbf{u} \\ (\mathbf{u} + \mathbf{v}) + \mathbf{w} &= \mathbf{u} + (\mathbf{v} + \mathbf{w}) \\ c(\mathbf{u} + \mathbf{v}) &= c\mathbf{u} + c\mathbf{v} \end{aligned}$$

### Perpendicular Vectors {#perpendicular-vectors}
kind: theorem
prereqs: dot-product

Non-zero vectors $\mathbf{u}$ and $\mathbf{v}$ are perpendicular if and only if $\mathbf{u} \cdot \mathbf{v} = 0$.

*Proof.* From $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}||\mathbf{v}|\cos\theta$, the product vanishes exactly when $\cos\theta = 0$. $\square$

### Vectors {#vector-basics}
kind: definition
prereqs: coordinate-plane

An arrow with a length and a direction, like a displacement or a force, written in components as $\langle 3, 4 \rangle$. Where it starts doesn't matter.

### The Dot Product {#dot-product}
kind: definition
prereqs: vector-operations, law-of-cosines

A single number from two vectors,
$$\langle a, b \rangle \cdot \langle c, d \rangle = ac + bd,$$
which also equals
$$u \cdot v = |u||v|\cos\theta,$$
where $\theta$ is the angle between them. It is 0 exactly when the vectors are perpendicular.

### Magnitude & Direction {#vector-magnitude-direction}
kind: property
prereqs: vector-basics, distance-formula, inverse-trig-ratios

The length of $\langle a, b \rangle$ and its direction angle $\theta$:
$$\begin{aligned} |\langle a, b \rangle| &= \sqrt{a^2 + b^2}, \\ \tan\theta &= \frac{b}{a}. \end{aligned}$$
So $\langle 3, 4 \rangle$ has length
$$\sqrt{9 + 16} = 5.$$

### Component Form {#vector-component-form}
kind: form
prereqs: vector-basics

$$\mathbf{v} = \langle a, b \rangle.$$

| Reads off | From |
| --- | --- |
| across and up | $a$ and $b$ |
| magnitude | $\sqrt{a^2 + b^2}$ |
| direction | $\tan\theta = \frac{b}{a}$ |

### Magnitude–Direction Form {#vector-polar-form}
kind: form
prereqs: vector-magnitude-direction

$$\mathbf{v} = \langle r\cos\theta, r\sin\theta \rangle.$$

| Reads off | From |
| --- | --- |
| magnitude | $r$ |
| direction from the positive $x$-axis | $\theta$ |

### Adding & Scaling Vectors {#vector-operations}
kind: skill
prereqs: vector-basics

Add vectors tip to tail, or component by component:
$$\langle 1, 2 \rangle + \langle 3, -1 \rangle = \langle 4, 1 \rangle.$$
Multiplying by a number stretches the arrow:
$$2\langle 1, 2 \rangle = \langle 2, 4 \rangle.$$

### Vector Word Problems {#vector-problems}
kind: skill
prereqs: vector-polar-form, vector-operations

Write each velocity or force in components, add them, and convert the result to a magnitude and direction.

```quiz
Q: A boat heads north at 3 m/s in a current flowing east at 4 m/s. What is its speed, in m/s?
A: 5
Why: $\sqrt{3^2 + 4^2}$.
```

## Matrices
built-on: vectors
rows: kinds
wrap: 6

Rectangular arrays of numbers, and the arithmetic of whole systems at once.

### Inverse Matrices & Systems {#matrix-inverses}
kind: theorem
prereqs: determinants, row-reduction

$A^{-1}$ undoes $A$, so the system
$$A\mathbf{x} = \mathbf{b}$$
has the solution
$$\mathbf{x} = A^{-1}\mathbf{b}.$$

### Matrix Multiplication Is Not Commutative {#matrix-noncommutative}
kind: theorem
prereqs: matrix-operations

In general $AB \ne BA$, even for square matrices. Multiplication is associative and distributes over addition.

*Proof.* With $A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$ and $B = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}$, the entries in the top-left of $AB$ and $BA$ are $1$ and $0$. $\square$

### Determinant as Area {#determinant-area}
kind: theorem
prereqs: determinants, matrix-transformations

A $2 \times 2$ matrix $A$ multiplies every area by $|\det A|$, and $A$ has an inverse if and only if $\det A \ne 0$.

### Matrices {#matrix-basics}
kind: definition
prereqs: counting

A rectangular array of numbers. A system of linear equations can be stored as the matrix of its coefficients.

### Determinants
kind: definition
prereqs: matrix-operations

A single number computed from a square matrix. For a $2 \times 2$ matrix,
$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc.$$
It is the factor by which the matrix scales areas, and it is 0 exactly when the matrix has no inverse.

### Identity & Zero Matrices {#identity-matrix}
kind: definition
prereqs: matrix-operations

The zero matrix $O$ has every entry $0$, so $A + O = A$. The identity matrix $I$ has 1s on the diagonal and 0s elsewhere, so $AI = IA = A$.

### Matrices as Transformations {#matrix-transformations}
kind: property
prereqs: matrix-operations, rigid-motions, dilations

A $2 \times 2$ matrix moves every point of the plane. For example,
- $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ turns it a quarter turn about the origin;
- $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ doubles its distance from it.

Multiplying two matrices does one move after the other.

### Inverse of a 2×2 Matrix {#two-by-two-inverse}
kind: formula
prereqs: determinants, identity-matrix

If $ad - bc \ne 0$:
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}.$$

### Matrix Arithmetic {#matrix-operations}
kind: skill
prereqs: matrix-basics, integer-multiplication

Two operations:
- add matrices entry by entry;
- multiply them row by column, which is not commutative: $AB$ and $BA$ usually differ.

### Row Reduction
kind: technique
prereqs: matrix-basics, elimination-method

1. write the system as an augmented matrix;
2. use row operations to get a leading 1 in the first row;
3. clear everything below it;
4. repeat with the next row and column;
5. solve from the bottom row up.

The elimination method carried out on a system's matrix. Repeat three row operations until the solution can be read straight off:
- swap two rows;
- scale a row;
- add a multiple of one row to another.

### Multiplying Matrices {#multiplying-matrices}
kind: skill
prereqs: matrix-operations

Each entry of $AB$ is a row of $A$ times a column of $B$. The number of columns of $A$ must equal the number of rows of $B$.
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 5 \\ 6 \end{bmatrix} = \begin{bmatrix} 17 \\ 39 \end{bmatrix}.$$

```quiz
Q: What is the top-left entry of $\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 3 & 0 \\ 4 & 1 \end{bmatrix}$?
A: 11
Why: $1 \cdot 3 + 2 \cdot 4$.
```

### Solving a System with an Inverse {#solving-with-inverse}
kind: skill
prereqs: two-by-two-inverse, system-matrix-form

1. write the system as $A\mathbf{x} = \mathbf{b}$;
2. check that $\det A \ne 0$;
3. find $A^{-1}$;
4. multiply on the left: $\mathbf{x} = A^{-1}\mathbf{b}$.

Multiplying both sides on the left by $A^{-1}$ leaves
$$\mathbf{x} = A^{-1}\mathbf{b}.$$

### Transforming Points with a Matrix {#transforming-with-matrix}
kind: skill
prereqs: matrix-transformations, multiplying-matrices

Write the point as a column and multiply. The images of $(1, 0)$ and $(0, 1)$ are the columns of the matrix, which is how to find the matrix of a transformation.
