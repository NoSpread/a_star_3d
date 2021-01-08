const _top = 0
const _parent = (i: number) => ((i + 1) >>> 1) - 1
const left = (i: number) => (i << 1) + 1
const right = (i: number) => (i + 1) << 1

/**
 * Priority Queue Implementation with Heap
 */
class PriorityQueue<T> {

    private _comparator
    private _heap: T[]

    /**
     * Takes a comparator function from your type
     * @param comparator comparator function to build the heap
     */
    constructor(comparator = (a: T, b: T) => a > b) {
        this._heap = []
        this._comparator = comparator
    }

    /**
     * returns the size of the heap
     */
    get size(): number {
        return this._heap.length
    }

    /**
     * if heap size is empty
     */
    get isEmpty(): boolean {
        return this.size == 0
    }

    /**
     * return the first element of the heap without destroying it
     */
    get peek(): T {
        return this._heap[_top]
    }

    /**
     * Push new values to the heap, sorted by the comparator function
     * @param {number} values
     * @returns {number} size of heap
     */
    public push(...values: T[]): number {
        values.forEach((value: T) => {
            this._heap.push(value)
            this._siftUp()
        })
        return this.size
    }

    /**
     * @returns the first value from the heap
     */
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

    /**
     * replace a value in the heap
     * @param value value in the heap
     */
    public replace(value: T): T {
        const replacedValue = this.peek
        this._heap[_top] = value
        this._siftDown()
        return replacedValue
    }

    /**
     * rebuild the entire heap
     * @param value value to rescore
     */
    public nrescore(value: T): void {
        const idx = this._heap.findIndex( element => {
            return element === value
        })
        const bottom = this.size - 1

        if (idx < bottom) {
            this._swap(idx, bottom)
        }
        this._heap.pop()
        this._siftDown()
        this._heap.push(value)
        this._siftUp()
    }

    /**
     * internal function, compares two index values to find the larger one
     * @private
     * @param i index from element one
     * @param j index from element two
     */
    private _greater(i: number, j: number) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    /**
     * swaps to values in heap
     * @param i index from element one
     * @param j index from element two
     */
    private _swap(i: number , j: number) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    /**
     * used to rebuild the heap, siftup a value in the heap
     */
    private _siftUp() {
        let node = this.size - 1;
        while (node > _top && this._greater(node, _parent(node))) {
            this._swap(node, _parent(node));
            node = _parent(node);
        }
    }

    /**
     * used to rebuild the heap, siftdown a value in the heap
     */
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

export { PriorityQueue }