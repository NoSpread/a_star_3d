"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeNode = void 0;
const header_1 = require("./header");
const _ = require("lodash");
class CubeNode {
    constructor(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        this.vector = _.cloneDeep(vector);
        this.coord_string = `${this.x},${this.y},${this.z}`;
        this.fScore = Number.MAX_SAFE_INTEGER;
        this.gScore = Number.MAX_SAFE_INTEGER;
        this.visited = false;
        this.closed = false;
    }
    get cString() {
        return this.coord_string;
    }
    get coord() {
        return this.vector;
    }
    vectorCompare(vector) {
        if (this.x === vector.x && this.y === vector.y && this.z === vector.z) {
            return true;
        }
        return false;
    }
    static calcCost(origin, neighbor) {
        const wayType = origin.neighbors[neighbor.cString];
        const status = _.cloneDeep(origin.status);
        let time = status.time;
        let energy = status.energy;
        let cooldown = status.cooldown;
        let blaster = status.blaster;
        let cost = wayType;
        if (cooldown > 0)
            cooldown -= 1;
        switch (wayType) {
            case header_1.block_type.floor:
                time += 1;
                break;
            case header_1.block_type.door:
                time += 2;
                break;
            case header_1.block_type.ladder:
                if (origin.coord.z > neighbor.coord.z) {
                    if (blaster > 0) {
                        time += 2;
                    }
                    else {
                        cost--;
                        time += 0.5;
                    }
                }
                else {
                    time += 2;
                }
                break;
            case header_1.block_type.sentinel:
                if (cooldown === 0 && energy > 0) {
                    time += 3;
                    energy -= 1;
                    cooldown = 5;
                }
                else if (cooldown > 0 && energy > 0) {
                    time += 3 + cooldown;
                    energy -= 1;
                    cooldown = 5;
                    cost += cooldown;
                }
                else {
                    cost = Number.MAX_SAFE_INTEGER;
                }
                break;
            case header_1.block_type.wall:
                if (blaster > 0) {
                    time += 3;
                    blaster -= 1;
                }
                else {
                    cost = Number.MAX_SAFE_INTEGER;
                }
                break;
        }
        status.blaster = blaster;
        status.cooldown = cooldown;
        status.energy = energy;
        status.time = time;
        return [status, cost];
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