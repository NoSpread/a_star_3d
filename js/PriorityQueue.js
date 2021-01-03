"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
const _top = 0;
const _parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;
class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }
    get size() {
        return this._heap.length;
    }
    get isEmpty() {
        return this.size == 0;
    }
    get peek() {
        return this._heap[_top];
    }
    push(...values) {
        values.forEach((value) => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size;
    }
    pop() {
        const poppedValue = this.peek;
        const bottom = this.size - 1;
        if (bottom > _top) {
            this._swap(_top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    replace(value) {
        const replacedValue = this.peek;
        this._heap[_top] = value;
        this._siftDown();
        return replacedValue;
    }
    rescore(fnSort) {
        this._heap.sort(fnSort);
    }
    nrescore(value) {
        const idx = this._heap.findIndex(element => {
            return element === value;
        });
        const bottom = this.size - 1;
        if (idx < bottom) {
            this._swap(idx, bottom);
        }
        this._heap.pop();
        this._siftDown();
        this._heap.push(value);
        this._siftUp();
    }
    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
        let node = this.size - 1;
        while (node > _top && this._greater(node, _parent(node))) {
            this._swap(node, _parent(node));
            node = _parent(node);
        }
    }
    _siftDown() {
        let node = _top;
        while ((left(node) < this.size && this._greater(left(node), node)) ||
            (right(node) < this.size && this._greater(right(node), node))) {
            let maxChild = (right(node) < this.size && this._greater(right(node), left(node))) ? right(node) : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map