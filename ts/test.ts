
import { CubeNode } from './class'
import {PriorityQueue} from './PrioQ'
import {i_coord, block_type, Path, i_Vector, i_Score} from './header'

const pq = new PriorityQueue<CubeNode>((a, b) => { return a.fScore < b.fScore})

const vector: i_Vector = {
    "x": 0,
    "y": 0,
    "z": 0
}

const start = {
    x: -1,
    y: -2,
    z: 3
}
const _start = new CubeNode(start)
const __start = new CubeNode(start)

if (_start === __start) {
    console.log("test")
}


const end = {
    x: 0,
    y: 0,
    z: 0
}
const _goal = new CubeNode(end)

for (vector.x = 0; vector.x <= 5; vector.x++) {
    for (vector.y = 0; vector.y <= 5; vector.y++) {
        for (vector.z = 0; vector.z <= 5; vector.z++) {

            if (_start.vectorCompare(vector)) {
                _start.gScore = 0
                _start.fScore = CubeNode.manhatten(_start, _goal)
                pq.push(_start)
            } else if (_goal.vectorCompare(vector)) {
                pq.push(_goal)
            } else {
                const node = new CubeNode(vector)
                pq.push(node)
            }
        }
    }
}


console.log("test")