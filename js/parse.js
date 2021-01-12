"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.import_data = void 0;
const fs = require("fs");
const _ = require("lodash");
const header_1 = require("./header");
function import_data(path) {
    const csv_raw = fs.readFileSync(path).toString();
    let csv;
    if (csv_raw.includes('\r\n')) {
        csv = csv_raw.split('\r\n');
    }
    else {
        csv = csv_raw.split('\n');
    }
    csv.shift();
    const data = {};
    const vector = {
        x: 0,
        y: 0,
        z: 0
    };
    for (vector.x = -15; vector.x <= 15; vector.x++) {
        for (vector.y = -15; vector.y <= 15; vector.y++) {
            for (vector.z = -15; vector.z <= 15; vector.z++) {
                const coord = _.cloneDeep(vector);
                const default_blocks = {
                    [`${coord.x + 1},${coord.y},${coord.z}`]: header_1.block_type.wall,
                    [`${coord.x - 1},${coord.y},${coord.z}`]: header_1.block_type.wall,
                    [`${coord.x},${coord.y + 1},${coord.z}`]: header_1.block_type.wall,
                    [`${coord.x},${coord.y - 1},${coord.z}`]: header_1.block_type.wall,
                    [`${coord.x},${coord.y},${coord.z + 1}`]: header_1.block_type.wall,
                    [`${coord.x},${coord.y},${coord.z - 1}`]: header_1.block_type.wall
                };
                Object.keys(default_blocks).forEach(key => {
                    if (key.includes('16')) {
                        delete default_blocks[key];
                    }
                });
                data[`${coord.x},${coord.y},${coord.z}`] = default_blocks;
            }
        }
    }
    for (const row of csv) {
        const [x1, y1, z1, x2, y2, z2, door, open, sentinel, ladder] = row.split(';').map(function (x) { if (x)
            return parseInt(x); return 0; });
        const walltype = sentinel ? header_1.block_type.sentinel : open ? header_1.block_type.floor : door ? header_1.block_type.door : ladder ? header_1.block_type.ladder : header_1.block_type.wall;
        data[`${x1},${y1},${z1}`][`${x2},${y2},${z2}`] = walltype;
        data[`${x2},${y2},${z2}`][`${x1},${y1},${z1}`] = walltype;
    }
    return data;
}
exports.import_data = import_data;
//# sourceMappingURL=parse.js.map