import { i_neighbors, i_Vector, block_type} from './header'

class CubeNode {

    private x: number
    private y: number
    private z: number

    private coord_string: string

    public visited: boolean
    public closed: boolean
    public fScore: number
    public gScore: number
    public heuristic: number

    public parent: CubeNode
    public neighbors: i_neighbors

    constructor(vector: i_Vector) {
        this.x = vector.x
        this.y = vector.y
        this.z = vector.z

        this.coord_string = `${this.x},${this.y},${this.z}`

        this.fScore = Number.MAX_SAFE_INTEGER
        this.gScore = Number.MAX_SAFE_INTEGER

        this.visited = false
        this.closed = false

        this.parent = null

        const default_blocks = {
            [`${vector.x + 1},${vector.y},${vector.z}`]: block_type.wall,
            [`${vector.x - 1},${vector.y},${vector.z}`]: block_type.wall,
            [`${vector.x},${vector.y + 1},${vector.z}`]: block_type.wall,
            [`${vector.x},${vector.y - 1},${vector.z}`]: block_type.wall,
            [`${vector.x},${vector.y},${vector.z + 1}`]: block_type.wall,
            [`${vector.x},${vector.y},${vector.z - 1}`]: block_type.wall
        }

        this.neighbors = default_blocks
    }

    get cString(): string {
        return this.coord_string
    }

    public vectorCompare(vector: i_Vector): boolean {
        if (this.x === vector.x && this.y === vector.y && this.z === vector.z) {
            return true
        }
        return false
    }

    public calcCost(neighbor: CubeNode): number {
        return this.neighbors[neighbor.cString]
    }

    static manhattan(start: CubeNode, goal: CubeNode): number {
        const d1 = Math.abs(start.x - goal.x)
        const d2 = Math.abs(start.y - goal.y)
        const d3 = Math.abs(start.z - goal.z)
        return d1 + d2 + d3
    }
}

export { CubeNode }