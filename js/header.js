"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse_block_type = exports.block_type = void 0;
var block_type;
(function (block_type) {
    block_type[block_type["floor"] = 1] = "floor";
    block_type[block_type["door"] = 2] = "door";
    block_type[block_type["ladder"] = 5] = "ladder";
    block_type[block_type["sentinel"] = 10] = "sentinel";
    block_type[block_type["wall"] = 100] = "wall";
})(block_type || (block_type = {}));
exports.block_type = block_type;
const reverse_block_type = {
    1: "floor",
    2: "door",
    5: "ladder",
    10: "sentinel",
    100: "wall"
};
exports.reverse_block_type = reverse_block_type;
//# sourceMappingURL=header.js.map