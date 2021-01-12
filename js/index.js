"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const astar_1 = require("./astar");
const CubeNode_1 = require("./CubeNode");
const header_1 = require("./header");
const chalk = require("chalk");
const data = parse_1.import_data('data/S1_borg_cube.csv');
const start = {
    x: 15,
    y: -1,
    z: -6
};
const status = {
    energy: 21,
    blaster: 5,
    time: 0,
    cooldown: 0
};
const startNode = new CubeNode_1.CubeNode(start);
startNode.status = status;
const end = {
    x: 0,
    y: 0,
    z: 0
};
const endNode = new CubeNode_1.CubeNode(end);
const path = astar_1.a_star(data, startNode, endNode);
console.log(`Starting with: ${JSON.stringify(status)}`);
for (const idx in path) {
    const current = path[idx];
    if (path[Number(idx) + 1]) {
        const next = path[Number(idx) + 1];
        const waytype = current.neighbors[next.cString];
        const waystr = header_1.reverse_block_type[waytype] ? header_1.reverse_block_type[waytype] : "vinculum";
        console.log(` [${chalk.red(current.cString)}]\t-->\t${chalk.magenta(waystr)}    \t-->\t[${chalk.green(next.cString)}]:\t (` + chalk ` {yellow time: ${next.status.time};} {cyan blaster: ${next.status.blaster};} {white energy: ${next.status.energy};} {blue cooldown: ${next.status.cooldown}} )`);
    }
}
//# sourceMappingURL=index.js.map