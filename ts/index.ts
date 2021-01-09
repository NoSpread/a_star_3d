import { import_data } from './parse'
import { a_star } from './astar'
import { CubeNode } from './CubeNode'
import { Status, reverse_block_type } from "./header"

import * as chalk from 'chalk'

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


console.log(`Starting with: ${JSON.stringify(status)}`)

/**
 * output the path we need to take to reach the center, no output would mean no route
 */
for (const idx in path) {
    const current = path[idx]
    if (path[Number(idx) + 1]) {
        const next = path[Number(idx) + 1]
        const waytype = current.neighbors[next.cString]
        const waystr = reverse_block_type[waytype] ? reverse_block_type[waytype] : "vinculum"

        console.log(` [${chalk.red(current.cString)}]\t-->\t${chalk.magenta(waystr)}    \t-->\t[${chalk.green(next.cString)}]:\t (` + chalk` {yellow time: ${next.status.time};} {cyan blaster: ${next.status.blaster};} {white energy: ${next.status.energy};} {blue cooldown: ${next.status.cooldown}} )`)
    }
}