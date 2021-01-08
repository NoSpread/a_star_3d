import { import_data } from './parse'
import { a_star } from './astar'
import { CubeNode } from './CubeNode'
import { Status, reverse_block_type } from "./header";

/**
 * data import from csv
 */
const data = import_data('data/S1_borg_cube.csv')

/**
 * start node, entrypoint for a* algorithm
 */
const start = {
    x: 15,
    y: -1,
    z: -6
}

/**
 * status of start node, includes:
 * @var energy energy of weapon
 * @var blaster tritanium blaster to go through walls and vinculum
 * @var time time needed to reach that node
 * @var cooldown current kill cooldown
 */
const status: Status = {
    energy: 21,
    blaster: 5,
    time: 0,
    cooldown: 0 
}

const startNode = new CubeNode(start)
startNode.status = status

/**
 * end node, our goal
 */
const end = {
    x: 0,
    y: 0,
    z: 0
}
const endNode = new CubeNode(end)

/**
 * calculate the shortes path with a custom
 * A* algorithm
 */
const path = a_star(data, startNode, endNode)

/**
 * output the path we need to take to reach the center, no output would mean no route
 */
for (const idx in path) {
    const current = path[idx]
    if (path[Number(idx) + 1]) {
        const next = path[Number(idx) + 1]
        const waytype = current.neighbors[next.cString]
        const waystr = reverse_block_type[waytype] ? reverse_block_type[waytype] : "vinculum"

        console.log(`${current.cString} --> ${waystr} --> ${next.cString}: (time: ${next.status.time}; blaster: ${next.status.blaster}; energy: ${next.status.energy}; cooldown: ${next.status.cooldown}`)
    }
}