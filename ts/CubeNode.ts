import { i_neighbors, i_Vector, block_type, Status} from './header'
import * as _ from 'lodash'

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

        //this.parent = null
    }

    get cString(): string {
        return this.coord_string
    }

    get coord(): i_Vector {
        return this.vector
    }

    public vectorCompare(vector: i_Vector): boolean {
        if (this.x === vector.x && this.y === vector.y && this.z === vector.z) {
            return true
        }
        return false
    }

    static calcCost(origin: CubeNode, neighbor: CubeNode): [Status, number] {

        const wayType = origin.neighbors[neighbor.cString]
        const status = _.cloneDeep(origin.status)

        let time = status.time
        let energy = status.energy
        let cooldown = status.cooldown
        let blaster = status.blaster

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
                    time += 0.5
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
                    // --> since everything is a straight line we have to wait here
        
                    time += 3 + cooldown
                    energy -= 1
                    cooldown = 5
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

    static manhattan(start: CubeNode, goal: CubeNode): number {
        const d1 = Math.abs(start.x - goal.x)
        const d2 = Math.abs(start.y - goal.y)
        const d3 = Math.abs(start.z - goal.z)
        return d1 + d2 + d3
    }
}

export { CubeNode }