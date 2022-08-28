class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


const breadthFirst = (root) => {
    if (root === null) return []

    const values = []
    const queue = [ root ]

    while (queue.length > 0) {
        const current = queue.shift()
        values.push(current.value)

        if (current.left !== null) queue.push(current.left)
        if (current.right !== null) queue.push(current.right)
    }

    return values
}


const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
const d = new Node('d')
const e = new Node('e')
const f = new Node('f')

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

//          a
//         / \
//        b   c
//       / \   \
//      d   e   f

console.log(breadthFirst(a))