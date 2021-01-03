
import { CubeNode } from './class'
import {PriorityQueue} from './PrioQ'
import {i_coord, block_type, Path, i_Vector, i_Score} from './header'

const arr: CubeNode[] = []

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

const end = {
    x: 0,
    y: 0,
    z: 0
}
const _goal = new CubeNode(end)

for (vector.x = -5; vector.x <= 5; vector.x++) {
    for (vector.y = -5; vector.y <= 5; vector.y++) {
        for (vector.z = -5; vector.z <= 5; vector.z++) {

            if (_start.vectorCompare(vector)) {
                _start.gScore = 0
                _start.fScore = CubeNode.manhatten(_start, _goal)
                arr.push(_start)
            } else if (_goal.vectorCompare(vector)) {
                arr.push(_goal)
            } else {
                const node = new CubeNode(vector)
                arr.push(node)
            }
        }
    }
}

const pq = new PriorityQueue<CubeNode>((a, b) => {return a.fScore < b.fScore})

pq.push(...arr)

_goal.fScore = 1

//pq.rescore(_goal)

console.log("test")