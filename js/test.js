"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("./class");
const pq = new class_1.PriorityQueue();
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
const _start = new class_1.CubeNode(start);
const __start = new class_1.CubeNode(start);
if (_start === __start) {
    console.log("test");
}
const end = {
    x: 0,
    y: 0,
    z: 0
};
const _goal = new class_1.CubeNode(end);
for (vector.x = 0; vector.x <= 5; vector.x++) {
    for (vector.y = 0; vector.y <= 5; vector.y++) {
        for (vector.z = 0; vector.z <= 5; vector.z++) {
            if (_start.vectorCompare(vector)) {
                _start.gScore = 0;
                _start.fScore = class_1.CubeNode.manhatten(_start, _goal);
                pq.enqueue(_start);
            }
            else if (_goal.vectorCompare(vector)) {
                pq.enqueue(_goal);
            }
            else {
                const node = new class_1.CubeNode(vector);
                pq.enqueue(node);
            }
        }
    }
}
const __goal = pq.find(_goal.cString);
__goal.fScore = 10;
pq.dequeue();
console.log("test");
//# sourceMappingURL=test.js.map