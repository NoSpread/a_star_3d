import { i_coord, block_type, Path, i_Vector, i_Score, i_neighbors, Status } from './header'
import { CubeNode } from './CubeNode'
import { PriorityQueue } from './PriorityQueue'
import * as _ from 'lodash'

export function a_star(graph: i_coord, _start: CubeNode, _goal: CubeNode): CubeNode[] {

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
                    _start.heuristic = CubeNode.manhattan(_start, _goal)
                    _start.neighbors = graph[_start.cString]

                    nodes.push(_start)
                } else if (_goal.vectorCompare(vector)) {
                    _goal.neighbors = graph[_goal.cString]

                    nodes.push(_goal)
                } else {
                    const node = new CubeNode(vector)
                    node.neighbors = graph[node.cString]
                    nodes.push(node)
                }
            }
        }
    }

    pQ.push(_start)
    while (pQ.size > 0) {

        const currNode = pQ.pop()

        //console.log("------------------")

        if (currNode === _goal) {
            
            const vector: i_Vector = {
                x: 0,
                y: 0,
                z: 0
            }
            const vinculum = new CubeNode(vector)

            vinculum.parent = currNode
            
            const status = _.cloneDeep(currNode.status)
            if (currNode.status.blaster > 0) {
                status.blaster--
                status.time++
            } else {
                status.time += 5
            }
            vinculum.status = status

            return pathTo(_start, vinculum)
        }

        currNode.closed = true

        for (const neighborString of Object.keys(currNode.neighbors)) {
            const neighbor = nodes.find(node => {
                return neighborString === node.cString
            })

            if (!neighbor || neighbor.closed) continue

            const [n_status, cost] = CubeNode.calcCost(currNode, neighbor)

            if (cost === Number.MAX_SAFE_INTEGER) continue // no blasters etc

            const gScore = currNode.gScore + cost
            const visited = neighbor.visited

            if (!visited || gScore < neighbor.gScore) {
                neighbor.visited = true
                neighbor.parent = currNode
                neighbor.heuristic = neighbor.heuristic || CubeNode.manhattan(neighbor, _goal)
                neighbor.gScore = gScore
                neighbor.status = n_status // apply changes
                neighbor.fScore = neighbor.gScore + neighbor.heuristic

                if (!visited) {
                    pQ.push(neighbor)
                } else {
                    pQ.nrescore(neighbor)
                }
            }
        }
    }

    return []
}

function pathTo(start: CubeNode, node: CubeNode) {
    let curr: CubeNode = node
    let path: CubeNode[] = []

    while (curr.parent) {
        path.unshift(curr)
        curr = curr.parent
    }
    path.unshift(start)

    return path
}