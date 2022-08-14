const depthFirstPrint_iterative = (graph, source) => {
    const stack = [ source ]
    console.log(current)

    while (stack.length > 0) {
        const current = stack.pop()

        for (let neighbor of graph[current]) {
            stack.push(neighbor)
        }
    }
}

// recursive
const depthFirstPrint = (graph, source) => {
    console.log(source)
    for (let neighbor of graph[source]) {
        depthFirstPrint(graph, neighbor)
    }
}


const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}

depthFirstPrint(graph, 'a')