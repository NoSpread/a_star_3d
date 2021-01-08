"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.import_data = void 0;
const fs = require("fs");
const header_1 = require("./header");
function import_data(path) {
    const csv = fs.readFileSync(path).toString().split('\r\n');
    csv.shift();
    const data = {};
    for (const row of csv) {
        const [x1, y1, z1, x2, y2, z2, door, open, sentinel, ladder] = row.split(';').map(function (x) { if (x)
            return parseInt(x); return 0; });
        const default_blocks = {
            [`${x1 + 1},${y1},${z1}`]: header_1.block_type.wall,
            [`${x1 - 1},${y1},${z1}`]: header_1.block_type.wall,
            [`${x1},${y1 + 1},${z1}`]: header_1.block_type.wall,
            [`${x1},${y1 - 1},${z1}`]: header_1.block_type.wall,
            [`${x1},${y1},${z1 + 1}`]: header_1.block_type.wall,
            [`${x1},${y1},${z1 - 1}`]: header_1.block_type.wall
        };
        Object.keys(default_blocks).forEach(key => {
            if (key.includes('16')) {
                delete default_blocks[key];
            }
        });
        default_blocks[`${x2},${y2},${z2}`] = sentinel ? header_1.block_type.sentinel : open ? header_1.block_type.floor : door ? header_1.block_type.door : ladder ? header_1.block_type.ladder : header_1.block_type.wall;
        data[`${x1},${y1},${z1}`] = default_blocks;
    }
    for (const coord of Object.keys(data)) {
        const directions = data[coord];
        for (const _coord of Object.keys(directions)) {
            if (data[_coord]) {
                if (data[_coord][coord]) {
                    data[coord][_coord] = data[_coord][coord];
                }
                else if (data[coord][_coord]) {
                    data[_coord][coord] = data[coord][_coord];
                }
            }
        }
    }
    return data;
}
exports.import_data = import_data;
//# sourceMappingURL=parse.js.map