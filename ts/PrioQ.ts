const _top = 0
const _parent = (i: number) => ((i + 1) >>> 1) - 1
const left = (i: number) => (i << 1) + 1
const right = (i: number) => (i + 1) << 1

export class PriorityQueue<T> {

    private _comparator
    private _heap: T[]

    constructor(comparator = (a: T, b: T) => a > b) {
        this._heap = []
        this._comparator = comparator
    }

    get size(): number {
        return this._heap.length
    }

    get isEmpty(): boolean {
        return this.size == 0
    }

    get peek(): T {
        return this._heap[_top]
    }

    public push(...values: T[]): number {
        values.forEach((value: T) => {
            this._heap.push(value)
            this._siftUp()
        })
        return this.size
    }

    public pop(): T {
        const poppedValue = this.peek
        const bottom = this.size - 1
        if (bottom > _top) {
            this._swap(_top, bottom)
        }
        this._heap.pop()
        this._siftDown()
        return poppedValue
    }

    public replace(value: T): T {
        const replacedValue = this.peek
        this._heap[_top] = value
        this._siftDown()
        return replacedValue
    }

    public rescore(fnSort: (a: T,b: T) => number): void {
        this._heap.sort(fnSort)
    }

    private _greater(i: number, j: number) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    private _swap(i: number , j: number) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    private _siftUp() {
        let node = this.size - 1;
        while (node > _top && this._greater(node, _parent(node))) {
            this._swap(node, _parent(node));
            node = _parent(node);
        }
    }

    private _siftDown() {
        let node = _top;
        while (
            (left(node) < this.size && this._greater(left(node), node)) ||
            (right(node) < this.size && this._greater(right(node), node))
        ) {
            let maxChild = (right(node) < this.size && this._greater(right(node), left(node))) ? right(node) : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}