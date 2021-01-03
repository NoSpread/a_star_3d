"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const astar_1 = require("./astar");
const CubeNode_1 = require("./CubeNode");
const header_1 = require("./header");
const data = parse_1.import_data('data/S1_borg_cube.csv');
const start = {
    x: 15,
    y: -1,
    z: -6
};
const startNode = new CubeNode_1.CubeNode(start);
const end = {
    x: 0,
    y: 0,
    z: 0
};
const endNode = new CubeNode_1.CubeNode(end);
const path = astar_1.a_star(data, startNode, endNode, 0);
for (const idx in path) {
    console.log(path[idx].cString);
    if (path[Number(idx) + 1])
        console.log(`---- ${header_1.reverse_lookup[path[idx].neighbors[path[Number(idx) + 1].cString]]} --->`);
}
//# sourceMappingURL=index.js.map