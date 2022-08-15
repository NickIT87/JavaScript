const hasPath_iterative = (graph, src, dst) => {
    const queue = [ src ]

    while (queue.length > 0) {
        const current = queue.shift()
        
        if (current === dst) return true
        
        for (let neighbor of graph[current]) {
            queue.push(neighbor)
        }
    }

    return false
}


const hasPath_recursive = (graph, src, dst) => {
    if (src === dst) return true

    for (let neighbor of graph[src]) {
        if (hasPath_recursive(graph, neighbor, dst) === true) {
            return true
        }
    }

    return false
}


const graph = {
    f: ['g', 'i'],
    g: ['h'],
    h: [],
    i: ['g', 'k'],
    j: ['i'],
    k: []
}


console.log(hasPath_recursive(graph, 'f', 'k'))    // true
console.log(hasPath_iterative(graph, 'f', 'k'))    // true