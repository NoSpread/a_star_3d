"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const astar_1 = require("./astar");
const class_1 = require("./class");
const data = parse_1.import_data('data/S1_borg_cube.csv');
const start = {
    x: 15,
    y: -1,
    z: -6
};
const startNode = new class_1.CubeNode(start);
const end = {
    x: 0,
    y: 0,
    z: 0
};
const endNode = new class_1.CubeNode(end);
const path = astar_1.a_star(data, startNode, endNode, 0);
for (const node of path) {
    console.log(node.cString);
    console.log("---->");
}
//# sourceMappingURL=index.js.map