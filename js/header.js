"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse_lookup = exports.block_type = void 0;
var block_type;
(function (block_type) {
    block_type[block_type["floor"] = 1] = "floor";
    block_type[block_type["door"] = 2] = "door";
    block_type[block_type["ladder"] = 4] = "ladder";
    block_type[block_type["sentinel"] = 10] = "sentinel";
    block_type[block_type["wall"] = 10000] = "wall";
})(block_type = exports.block_type || (exports.block_type = {}));
exports.reverse_lookup = {
    1: "floor",
    2: "door",
    4: "ladder",
    10: "sentinel",
    10000: "wall"
};
//# sourceMappingURL=header.js.map