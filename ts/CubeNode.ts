import { i_neighbors, i_Vector, block_type, Status} from './header'
import * as _ from 'lodash'
import { stat } from 'fs'

class CubeNode {

    private x: number
    private y: number
    private z: number

    private vector: i_Vector

    private coord_string: string

    public visited: boolean
    public closed: boolean
    public fScore: number
    public gScore: number
    public heuristic: number

    public parent: CubeNode
    public neighbors: i_neighbors

    public status: Status

    /**
     * Creates a new node in the cubus
     * @param vector Vector position of the node
     */
    constructor(vector: i_Vector) {
        this.x = vector.x
        this.y = vector.y
        this.z = vector.z

        this.vector = _.cloneDeep(vector)

        this.coord_string = `${this.x},${this.y},${this.z}`

        this.fScore = Number.MAX_SAFE_INTEGER
        this.gScore = Number.MAX_SAFE_INTEGER

        this.visited = false
        this.closed = false
    }

    /**
     * @returns a string representation of the coordinates
     */
    get cString(): string {
        return this.coord_string
    }

    /**
     * @returns {i_Vector} vector representation of the coordinates
     */
    get coord(): i_Vector {
        return this.vector
    }

    /**
     * Compares a vector and a node to find out if they are equal
     * May be outdated since i added the coord getter
     * @param vector vector to compare to current node
     */
    public vectorCompare(vector: i_Vector): boolean {
        if (this.x === vector.x && this.y === vector.y && this.z === vector.z) {
            return true
        }
        return false
    }

    /**
     * Calculates the cost needed to travel to a new node
     * @param origin origin node
     * @param neighbor neighbor node
     */
    static calcCost(origin: CubeNode, neighbor: CubeNode): [Status, number] {

        const wayType = origin.neighbors[neighbor.cString]
        const status = _.cloneDeep(origin.status)

        let { time, energy, cooldown, blaster} = status
        let cost = wayType

        if (cooldown > 0) cooldown -= 1

        switch(wayType) {
            case block_type.floor:
                time += 1
                break

            case block_type.door:
                time += 2
                break

            case block_type.ladder:
                if (origin.coord.z > neighbor.coord.z) {
                    if (blaster > 0) {
                        time += 2
                    } else {
                        cost--
                        time += 0.5
                    }
                } else {
                    time += 2
                }
                break

            case block_type.sentinel:
                if (cooldown === 0 && energy > 0) {
                    time += 3
                    energy -= 1
                    cooldown = 5
                    
                } else if (cooldown > 0 && energy > 0){
                    time += 3 + cooldown
                    energy -= 1
                    cooldown = 5
                    cost += cooldown
                } else {
                    // blaster empty, no way
                    cost = Number.MAX_SAFE_INTEGER
                }
                break

            case block_type.wall:
                if (blaster > 0) {
                    time += 3
                    blaster -= 1
                } else {
                    // blaster empty, no way
                    cost = Number.MAX_SAFE_INTEGER
                }
                break
        }

        status.blaster = blaster
        status.cooldown = cooldown
        status.energy = energy
        status.time = time

        return [status, cost]
    }

    /**
     * Calculates the Manhattan distance in 3D
     * @param start start node (current)
     * @param goal goal node (goal node)
     */
    static manhattan(start: CubeNode, goal: CubeNode): number {
        const d1 = Math.abs(start.x - goal.x)
        const d2 = Math.abs(start.y - goal.y)
        const d3 = Math.abs(start.z - goal.z)
        return d1 + d2 + d3
    }
}

export { CubeNode }