"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a_star = void 0;
const CubeNode_1 = require("./CubeNode");
const PriorityQueue_1 = require("./PriorityQueue");
const _ = require("lodash");
function a_star(graph, _start, _goal) {
    const pQ = new PriorityQueue_1.PriorityQueue((a, b) => { return a.fScore < b.fScore; });
    const nodes = [];
    const vector = {
        x: 0,
        y: 0,
        z: 0
    };
    for (vector.x = -15; vector.x <= 15; vector.x++) {
        for (vector.y = -15; vector.y <= 15; vector.y++) {
            for (vector.z = -15; vector.z <= 15; vector.z++) {
                if (_start.vectorCompare(vector)) {
                    _start.gScore = 0;
                    _start.heuristic = CubeNode_1.CubeNode.manhattan(_start, _goal);
                    _start.neighbors = graph[_start.cString];
                    nodes.push(_start);
                }
                else if (_goal.vectorCompare(vector)) {
                    _goal.neighbors = graph[_goal.cString];
                    nodes.push(_goal);
                }
                else {
                    const node = new CubeNode_1.CubeNode(vector);
                    node.neighbors = graph[node.cString];
                    nodes.push(node);
                }
            }
        }
    }
    pQ.push(_start);
    while (pQ.size > 0) {
        const currNode = pQ.pop();
        if (currNode === _goal) {
            const vector = {
                x: 0,
                y: 0,
                z: 0
            };
            const vinculum = new CubeNode_1.CubeNode(vector);
            vinculum.parent = currNode;
            const status = _.cloneDeep(currNode.status);
            if (currNode.status.blaster > 0) {
                status.blaster--;
                status.time++;
            }
            else {
                status.time += 5;
            }
            vinculum.status = status;
            return pathTo(_start, vinculum);
        }
        currNode.closed = true;
        for (const neighborString of Object.keys(currNode.neighbors)) {
            const neighbor = nodes.find(node => {
                return neighborString === node.cString;
            });
            if (!neighbor || neighbor.closed)
                continue;
            const [n_status, cost] = CubeNode_1.CubeNode.calcCost(currNode, neighbor);
            if (cost === Number.MAX_SAFE_INTEGER)
                continue;
            const gScore = currNode.gScore + cost;
            const visited = neighbor.visited;
            if (!visited || gScore < neighbor.gScore) {
                neighbor.visited = true;
                neighbor.parent = currNode;
                neighbor.heuristic = neighbor.heuristic || CubeNode_1.CubeNode.manhattan(neighbor, _goal);
                neighbor.gScore = gScore;
                neighbor.status = n_status;
                neighbor.fScore = neighbor.gScore + neighbor.heuristic;
                if (!visited) {
                    pQ.push(neighbor);
                }
                else {
                    pQ.nrescore(neighbor);
                }
            }
        }
    }
    return [];
}
exports.a_star = a_star;
function pathTo(start, node) {
    let curr = node;
    let path = [];
    while (curr.parent) {
        path.unshift(curr);
        curr = curr.parent;
    }
    path.unshift(start);
    return path;
}
//# sourceMappingURL=astar.js.map