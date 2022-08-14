const depthFirstPrint = (graph, source) => {
    const stack = [ source ]
    
    while (stack.length > 0) {
        const current = stack.pop()
        console.log("depth: ", current)

        for (let neighbor of graph[current]) {
            stack.push(neighbor)
        }
    }
}


const breadthFirstPrint = (graph, source) => {
    const queue = [ source ]

    while (queue.length > 0) {
        const current = queue.shift()
        console.log("breadth: ", current)

        for (let neighbor of graph[current]) {
            queue.push(neighbor)
        }
    }
}


const depthFirstPrint_recursive = (graph, source) => {
    console.log("depth recursive: ", source)
    for (let neighbor of graph[source]) {
        depthFirstPrint_recursive(graph, neighbor)
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
breadthFirstPrint(graph, 'a')
depthFirstPrint_recursive(graph, 'a')
