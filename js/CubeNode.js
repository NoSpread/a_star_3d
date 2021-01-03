"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeNode = void 0;
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
//# sourceMappingURL=CubeNode.js.map