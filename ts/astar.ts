// nach wiki pseudocode
import { i_coord, block_type, Path, i_Vector, i_Score, i_neighbors } from './header'
import { CubeNode } from './class'
import { PriorityQueue } from './PrioQ'
import { pathToFileURL } from 'url'


export function a_star(graph: i_coord, _start: CubeNode, _goal: CubeNode, h: any) {

    //const pq = new PriorityQueue()
    const pQ = new PriorityQueue<CubeNode>((a, b) => { return a.fScore < b.fScore })
    const nodes: CubeNode[] = []

    const vector: i_Vector = {
        "x": 0,
        "y": 0,
        "z": 0
    }

    for (vector.x = -15; vector.x <= 15; vector.x++) {
        for (vector.y = -15; vector.y <= 15; vector.y++) {
            for (vector.z = -15; vector.z <= 15; vector.z++) {

                if (_start.vectorCompare(vector)) {
                    _start.gScore = 0
                    _start.fScore = CubeNode.manhatten(_start, _goal)
                    _start.neighbors = graph[_start.cString]

                    nodes.push(_start)
                } else if (_goal.vectorCompare(vector)) {
                    _goal.neighbors = graph[_goal.cString]

                    nodes.push(_goal)
                } else {
                    const node = new CubeNode(vector)
                    if (graph[node.cString]) {
                        node.neighbors = graph[node.cString]
                    }

                    nodes.push(node)
                }
            }
        }
    }


    pQ.push(...nodes)

    while (pQ.size > 0) {

        //const currNode = pq.dequeue()
        const currNode = pQ.pop()

        if (currNode === _goal) {
            return pathTo(currNode)
        }


        currNode.closed = true

        for (const neighborString of Object.keys(currNode.neighbors)) {
            const neighbor = nodes.find(node => {
                return neighborString === node.cString
            })

            if (!neighbor || neighbor.closed) continue

            const gScore = currNode.gScore + 1 // real cost here from neighbor to curr
            const visited = neighbor.visited

            if (!visited || gScore < neighbor.gScore) {
                neighbor.visited = true
                neighbor.parent = currNode
                // set neighbor.gScore = gScore
                neighbor.fScore = CubeNode.manhatten(neighbor, _goal) // + gScore
            }
        }

        pQ.rescore((a,b) => { return a.fScore - b.fScore})
    }

    return []
}

function pathTo(node: CubeNode) {
    let curr: CubeNode = node
    let path: CubeNode[] = []

    while (curr.parent) {
        path.unshift(curr)
        curr = curr.parent
    }

    return path
}