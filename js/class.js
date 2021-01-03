"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = exports.CubeNode = void 0;
const header_1 = require("./header");
class CubeNode {
    constructor(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        this.coord_string = `${this.x},${this.y},${this.z}`;
        this.fScore = Number.MAX_SAFE_INTEGER;
        this.gScore = Number.MAX_SAFE_INTEGER;
        this.visited = false;
        this.closed = false;
        this.parent = null;
        const default_blocks = {
            [`${vector.x + 1},${vector.y},${vector.z}`]: header_1.block_type.wall,
            [`${vector.x - 1},${vector.y},${vector.z}`]: header_1.block_type.wall,
            [`${vector.x},${vector.y + 1},${vector.z}`]: header_1.block_type.wall,
            [`${vector.x},${vector.y - 1},${vector.z}`]: header_1.block_type.wall,
            [`${vector.x},${vector.y},${vector.z + 1}`]: header_1.block_type.wall,
            [`${vector.x},${vector.y},${vector.z - 1}`]: header_1.block_type.wall
        };
        this.neighbors = default_blocks;
    }
    get cString() {
        return this.coord_string;
    }
    vectorCompare(vector) {
        if (this.x === vector.x && this.y === vector.y && this.z === vector.z) {
            return true;
        }
        return false;
    }
    calcCost(neighbor) {
        return this.neighbors[neighbor.cString];
    }
    static manhattan(start, goal) {
        const d1 = Math.abs(start.x - goal.x);
        const d2 = Math.abs(start.y - goal.y);
        const d3 = Math.abs(start.z - goal.z);
        return d1 + d2 + d3;
    }
}
exports.CubeNode = CubeNode;
class PriorityQueue {
    constructor() {
        this.nodes = [];
    }
    get size() {
        return this.nodes.length;
    }
    enqueue(node) {
        this.nodes.push(node);
        let index = this.nodes.length - 1;
        const current = this.nodes[index];
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            const parent = this.nodes[parentIndex];
            if (parent.fScore >= current.fScore) {
                this.nodes[parentIndex] = current;
                this.nodes[index] = parent;
                index = parentIndex;
            }
            else
                break;
        }
    }
    dequeue() {
        const min = this.nodes[0];
        const end = this.nodes.pop();
        this.nodes[0] = end;
        let index = 0;
        const length = this.nodes.length;
        const current = this.nodes[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild;
            let rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.nodes[leftChildIndex];
                if (leftChild.fScore < current.fScore)
                    swap = leftChildIndex;
            }
            if (rightChildIndex < length) {
                rightChild = this.nodes[rightChildIndex];
                if ((swap === null && rightChild.fScore < current.fScore) || (swap !== null && rightChild.fScore < leftChild.fScore))
                    swap = rightChildIndex;
            }
            if (swap === null)
                break;
            this.nodes[index] = this.nodes[swap];
            this.nodes[swap] = current;
            index = swap;
        }
        return min;
    }
    find(coords) {
        for (const node of this.nodes) {
            if (coords === node.cString) {
                return node;
            }
        }
        return null;
    }
    reSort() {
        this.nodes.sort((a, b) => {
            return a.fScore - b.fScore;
        });
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=class.js.map