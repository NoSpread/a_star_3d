import { i_coord, i_Vector } from './header'
import { CubeNode } from './CubeNode'
import { PriorityQueue } from './PriorityQueue'
import * as _ from 'lodash'

/**
 * A* Implementation, finds the shortes route through the cubus
 * @param graph graph, all node connections from csv
 * @param _start start node
 * @param _goal end node
 */
function a_star(graph: i_coord, _start: CubeNode, _goal: CubeNode): CubeNode[] {

    // create a new priority queue where our nodes will be saved
    const pQ = new PriorityQueue<CubeNode>((a, b) => { return a.fScore < b.fScore })
    const nodes: CubeNode[] = []

    /**
     * emtpy vector so the nested for loop is easier to understand
     * and i can pass the modified vector to the CubeNode constructor
     */
    const vector: i_Vector = {
        x: 0,
        y: 0,
        z: 0
    }

    /**
     * nested for loops to go through all coordinates and create a node on that location
     * Grid is 31x31x31 in range -15 to 15
     */
    for (vector.x = -15; vector.x <= 15; vector.x++) {
        for (vector.y = -15; vector.y <= 15; vector.y++) {
            for (vector.z = -15; vector.z <= 15; vector.z++) {
                /**
                 * if we found our star and goal node we add some basics to it
                 * 
                 * instead of vectorcompare we could compare _start.coord with vector, 
                 * but since they are different objects it could cause an error
                 */
                if (_start.vectorCompare(vector)) { 
                    _start.gScore = 0 // gScore for the start node is 0
                    _start.heuristic = CubeNode.manhattan(_start, _goal) // calculate the initial manhatten distance
                    _start.neighbors = graph[_start.cString] // all neighbors from the start node

                    nodes.push(_start) // add the start node to all global nodes
                } else if (_goal.vectorCompare(vector)) {
                    _goal.neighbors = graph[_goal.cString] // all neighbors from the goal node

                    nodes.push(_goal) // add the goal node to all global nodes
                } else {
                    const node = new CubeNode(vector) // create all nodes
                    node.neighbors = graph[node.cString] // find all neighbors to the current node
                    nodes.push(node) // add node to all global nodes
                }
            }
        }
    }

    // init the queue with the start node
    pQ.push(_start) 

    // while we have elements in the pQ we continue
    while (pQ.size > 0) { 

        // pop the first element from the heap and name it currNode
        const currNode = pQ.pop() 

        // we found our goal and return to the main function while adding the viniculum node
        if (currNode === _goal) { 
            
            // empty vector to pass the the viniculum node
            const vector: i_Vector = { 
                x: 0,
                y: 0,
                z: 0
            }
            const vinculum = new CubeNode(vector)

            // parent (linked list) to the other nodes
            vinculum.parent = currNode 
            
            const status = _.cloneDeep(currNode.status)
            if (currNode.status.blaster > 0) {
                status.blaster--
                status.time++
            } else {
                status.time += 5
            }
            vinculum.status = status

            // returns an array of all nodes we need to walk through
            return pathTo(_start, vinculum) 
        }

        // set our current node on the closed list
        currNode.closed = true 

        // go through all neighbors of the current node
        for (const neighborString of Object.keys(currNode.neighbors)) { 
            const neighbor = nodes.find(node => {
                // find all node objects from the cString thats stored in the currNode neighbors element
                return neighborString === node.cString 
            })

            /**
             * if the neighbor does not exists or the neighbor is closed
             * we won't compute anything
             */
            if (!neighbor || neighbor.closed) continue

            /**
             * returns the n_status, an object that includes info stats like time or energy count
             * also returns the cost value thats needed for the a* algorithm
             */
            const [n_status, cost] = CubeNode.calcCost(currNode, neighbor)

            /**
             * cost is only MAX_SAFE_INTEGER when we can't take that route
             * e.g. the blasters are empty and we can't destroy the next wall
             */
            if (cost === Number.MAX_SAFE_INTEGER) continue

            /**
             * gScore: a cost representation, see more in the header enum block_type
             * visiited: a boolean value, if we already visited that node it will be true
             */
            const gScore = currNode.gScore + cost
            const visited = neighbor.visited

            /**
             * we never where here before or the gScore on our current route is cheaper
             * set visited true, and replace the parent
             * set the heuristic to the goal and change the gScore to the new one
             * replace the n_status object with our new values
             * set the final fScore
             */
            if (!visited || gScore < neighbor.gScore) {
                neighbor.visited = true
                neighbor.parent = currNode
                neighbor.heuristic = neighbor.heuristic || CubeNode.manhattan(neighbor, _goal)
                neighbor.gScore = gScore
                neighbor.status = n_status // apply changes
                neighbor.fScore = neighbor.gScore + neighbor.heuristic

                /**
                 * if we have not visited the node yet, we will add it to the heap
                 * else we let the heap rebuild
                 */
                if (!visited) {
                    pQ.push(neighbor)
                } else {
                    pQ.nrescore(neighbor)
                }
            }
        }
    }

    // no routes to the center where found
    return []
}

/**
 * reverses all entries in the linked list to get an orderd list of move instructions
 * @param start start node
 * @param node last node in the linked list
 */
function pathTo(start: CubeNode, node: CubeNode): CubeNode[] {
    let curr: CubeNode = node
    let path: CubeNode[] = []

    /**
     * as long as there are entries in the linked list
     * we continue unfolding the list
     */
    while (curr.parent) {
        path.unshift(curr)
        curr = curr.parent
    }

    // add the element we started list last since it has no parents
    path.unshift(start)

    return path
}

export { a_star }