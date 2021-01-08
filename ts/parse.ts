import * as fs from 'fs'
import * as _ from 'lodash'
import {i_coord, block_type, reverse_block_type, i_Vector} from './header'

export function import_data(path: string): i_coord {
    const csv = fs.readFileSync(path).toString().split('\r\n')
    csv.shift()
    
    const data: i_coord = {}

    const vector: i_Vector = {
        "x": 0,
        "y": 0,
        "z": 0
    }

    for (vector.x = -15; vector.x <= 15; vector.x++) {
        for (vector.y = -15; vector.y <= 15; vector.y++) {
            for (vector.z = -15; vector.z <= 15; vector.z++) {

                const coord = _.cloneDeep(vector)
                const default_blocks = {
                    [`${coord.x + 1},${coord.y},${coord.z}`]: block_type.wall,
                    [`${coord.x - 1},${coord.y},${coord.z}`]: block_type.wall,
                    [`${coord.x},${coord.y + 1},${coord.z}`]: block_type.wall,
                    [`${coord.x},${coord.y - 1},${coord.z}`]: block_type.wall,
                    [`${coord.x},${coord.y},${coord.z + 1}`]: block_type.wall,
                    [`${coord.x},${coord.y},${coord.z - 1}`]: block_type.wall
                }

                Object.keys(default_blocks).forEach(key => {
                    if (key.includes('16')) {
                        delete default_blocks[key]
                    }
                })

                data[`${coord.x},${coord.y},${coord.z}`] = default_blocks
            }
        }
    }


    for (const row of csv) {
        // alle Strings die aus der csv eingelesen wurden sind Zahlen, seprariert mit einem Semicolon
        const [x1, y1, z1, x2, y2, z2, door, open, sentinel, ladder] = row.split(';').map(function (x) { if (x) return parseInt(x); return 0 })

        // Eintragen des gegebenen Übergangs von xyz1 nach xyz2
        const walltype = sentinel ? block_type.sentinel : open ? block_type.floor : door ? block_type.door : ladder ? block_type.ladder : block_type.wall
        data[`${x1},${y1},${z1}`][`${x2},${y2},${z2}`] = walltype
        data[`${x2},${y2},${z2}`][`${x1},${y1},${z1}`] = walltype
    }
    
    return data
}