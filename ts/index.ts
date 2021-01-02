import { import_data } from './parse'
import { a_star } from './astar'
import { CubeNode, PriorityQueue } from './class'

const data = import_data('data/S1_borg_cube.csv')
//console.log(data)

//15,-1,-6
const start = {
    x: 15,
    y: -1,
    z: -6
}
const startNode = new CubeNode(start)

const end = {
    x: 0,
    y: 0,
    z: 0
}
const endNode = new CubeNode(end)

const path = a_star(data, startNode, endNode, 0)

for (const node of path) {
    console.log(node.cString)
    console.log("---->")
}