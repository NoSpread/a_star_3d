"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a_star = void 0;
const class_1 = require("./class");
function a_star(graph, _start, _goal, h) {
    const pq = new class_1.PriorityQueue();
    const vector = {
        "x": 0,
        "y": 0,
        "z": 0
    };
    for (vector.x = -15; vector.x <= 15; vector.x++) {
        for (vector.y = -15; vector.y <= 15; vector.y++) {
            for (vector.z = -15; vector.z <= 15; vector.z++) {
                if (_start.vectorCompare(vector)) {
                    _start.gScore = 0;
                    _start.fScore = class_1.CubeNode.manhatten(_start, _goal);
                    _start.neighbors = graph[_start.cString];
                    pq._enqueue(_start);
                }
                else if (_goal.vectorCompare(vector)) {
                    _goal.neighbors = graph[_goal.cString];
                    pq._enqueue(_goal);
                }
                else {
                    const node = new class_1.CubeNode(vector);
                    if (graph[node.cString]) {
                        node.neighbors = graph[node.cString];
                    }
                    pq._enqueue(node);
                }
            }
        }
    }
    while (pq.size > 0) {
        const currNode = pq._dequeue();
        if (currNode === _goal) {
            return pathTo(currNode);
        }
        currNode.closed = true;
        for (const neighborString of Object.keys(currNode.neighbors)) {
            const neighbor = pq.find(neighborString);
            if (!neighbor || neighbor.closed)
                continue;
            const gScore = currNode.gScore + 10;
            const visited = neighbor.visited;
            if (!visited || gScore < neighbor.gScore) {
                neighbor.visited = true;
                neighbor.parent = currNode;
                neighbor.fScore = class_1.CubeNode.manhatten(neighbor, _goal);
            }
        }
        pq.reSort();
    }
    return [];
}
exports.a_star = a_star;
function pathTo(node) {
    let curr = node;
    let path = [];
    while (curr.parent) {
        path.unshift(curr);
        curr = curr.parent;
    }
    return path;
}
//# sourceMappingURL=astar.js.map