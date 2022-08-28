class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


const depthFirstValues = (root) => {
    if (root === null) return []
    
    const result = []
    const stack = [ root ]

    while (stack.length) {
        const current = stack.pop()
        result.push(current.value)

        if (current.right) stack.push(current.right)
        if (current.left) stack.push(current.left)
    }

    return result
}


const depthFirstValues_recursive = (root) => {
    if (root === null) return []
    const leftValues = depthFirstValues_recursive(root.left)
    const rightValues = depthFirstValues_recursive(root.right)
    return [root.value, ...leftValues, ...rightValues]
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

console.log(depthFirstValues(a))
console.log(depthFirstValues_recursive(a))