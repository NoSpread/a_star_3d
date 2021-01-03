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


class PriorityQueue {

    private nodes: CubeNode[]

    constructor() {
        this.nodes = []
    }

    get size(): number {
        return this.nodes.length
    }

    public enqueue(node: CubeNode): void {
        this.nodes.push(node)

        let index = this.nodes.length - 1
        const current = this.nodes[index]

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2)
            const parent = this.nodes[parentIndex]

            if (parent.fScore >= current.fScore) {
                this.nodes[parentIndex] = current
                this.nodes[index] = parent
                index = parentIndex
            } else break
        }
    }

    public dequeue(): CubeNode {
        const min = this.nodes[0]
        const end = this.nodes.pop()
        this.nodes[0] = end

        let index = 0
        const length = this.nodes.length
        const current = this.nodes[0]

        while (true) {
            const leftChildIndex = 2 * index + 1
            const rightChildIndex = 2 * index + 2
            let leftChild: CubeNode
            let rightChild: CubeNode
            let swap = null

            if (leftChildIndex < length) {
                leftChild = this.nodes[leftChildIndex]

                if (leftChild.fScore < current.fScore) swap = leftChildIndex
            }

            if (rightChildIndex < length) {
                rightChild = this.nodes[rightChildIndex]

                if ((swap === null && rightChild.fScore < current.fScore) || (swap !== null && rightChild.fScore < leftChild.fScore))
                    swap = rightChildIndex
            }

            if (swap === null) break

            this.nodes[index] = this.nodes[swap]
            this.nodes[swap] = current
            index = swap
        }

        return min
    }

    public find(coords: string): CubeNode | null {
        for (const node of this.nodes) {
            if (coords === node.cString) {
                return node
            }
        }
        return null
    }

    public reSort(): void {
        this.nodes.sort((a, b) => {
            return a.fScore - b.fScore
        })
    }
}

export { CubeNode, PriorityQueue }