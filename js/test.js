"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CubeNode_1 = require("./CubeNode");
const PriorityQueue_1 = require("./PriorityQueue");
const arr = [];
const vector = {
    "x": 0,
    "y": 0,
    "z": 0
};
const start = {
    x: -1,
    y: -2,
    z: 3
};
const _start = new CubeNode_1.CubeNode(start);
const end = {
    x: 0,
    y: 0,
    z: 0
};
const _goal = new CubeNode_1.CubeNode(end);
for (vector.x = -5; vector.x <= 5; vector.x++) {
    for (vector.y = -5; vector.y <= 5; vector.y++) {
        for (vector.z = -5; vector.z <= 5; vector.z++) {
            if (_start.vectorCompare(vector)) {
                _start.gScore = 0;
                _start.fScore = CubeNode_1.CubeNode.manhattan(_start, _goal);
                arr.push(_start);
            }
            else if (_goal.vectorCompare(vector)) {
                arr.push(_goal);
            }
            else {
                const node = new CubeNode_1.CubeNode(vector);
                arr.push(node);
            }
        }
    }
}
const pq = new PriorityQueue_1.PriorityQueue((a, b) => { return a.fScore < b.fScore; });
pq.push(...arr);
_goal.fScore = 1;
console.log("test");
//# sourceMappingURL=test.js.map