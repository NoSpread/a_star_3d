import { import_data } from './parse'
import { a_star } from './astar'
import { CubeNode } from './CubeNode'
import { Status, reverse_block_type } from "./header";

const data = import_data('data/S1_borg_cube.csv')
//console.log(data)

//15,-1,-6
const start = {
    x: 15,
    y: -1,
    z: -6
}
const status: Status = {
    energy: 21,
    blaster: 5,
    time: 0, //time we start at
    cooldown: 0 //current fight cooldown
}

const startNode = new CubeNode(start)
startNode.status = status

const end = {
    x: 0,
    y: 0,
    z: 0
}
const endNode = new CubeNode(end)

const path = a_star(data, startNode, endNode)

for (const idx in path) {
    const current = path[idx]
    if (path[Number(idx) + 1]) {
        const next = path[Number(idx) + 1]
        const waytype = current.neighbors[next.cString]
        const waystr = reverse_block_type[waytype]

        console.log(`${current.cString} --> ${waystr} --> ${next.cString}: (time: ${next.status.time}; blaster: ${next.status.blaster}; energy: ${next.status.energy}; gScore: ${next.gScore})`)
    }
}