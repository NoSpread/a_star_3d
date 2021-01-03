"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a_star = void 0;
const class_1 = require("./class");
const PrioQ_1 = require("./PrioQ");
function a_star(graph, _start, _goal, h) {
    const pQ = new PrioQ_1.PriorityQueue((a, b) => { return a.fScore < b.fScore; });
    const nodes = [];
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
                    _start.fScore = class_1.CubeNode.manhattan(_start, _goal);
                    _start.neighbors = graph[_start.cString];
                    nodes.push(_start);
                }
                else if (_goal.vectorCompare(vector)) {
                    _goal.neighbors = graph[_goal.cString];
                    nodes.push(_goal);
                }
                else {
                    const node = new class_1.CubeNode(vector);
                    if (graph[node.cString]) {
                        node.neighbors = graph[node.cString];
                    }
                    nodes.push(node);
                }
            }
        }
    }
    pQ.push(_start);
    while (pQ.size > 0) {
        const currNode = pQ.pop();
        if (currNode === _goal) {
            return pathTo(currNode);
        }
        currNode.closed = true;
        for (const neighborString of Object.keys(currNode.neighbors)) {
            const neighbor = nodes.find(node => {
                return neighborString === node.cString;
            });
            if (!neighbor || neighbor.closed)
                continue;
            const gScore = currNode.gScore + neighbor.calcCost(currNode);
            const visited = neighbor.visited;
            if (!visited || gScore < neighbor.gScore) {
                neighbor.visited = true;
                neighbor.parent = currNode;
                neighbor.heuristic = neighbor.heuristic || class_1.CubeNode.manhattan(neighbor, _goal);
                neighbor.gScore = gScore;
                neighbor.fScore = neighbor.gScore + neighbor.heuristic;
            }
            if (!visited)
                pQ.push(neighbor);
        }
        pQ.rescore((a, b) => { return a.fScore - b.fScore; });
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