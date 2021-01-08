import * as fs from 'fs'
import {i_coord, block_type} from './header'

export function import_data(path: string): i_coord {
    const csv = fs.readFileSync(path).toString().split('\r\n')
    csv.shift()
    
    const data: i_coord = {}
    for (const row of csv) {
        // alle Strings die aus der csv eingelesen wurden sind Zahlen, seprariert mit einem Semicolon
        const [x1, y1, z1, x2, y2, z2, door, open, sentinel, ladder] = row.split(';').map(function (x) { if (x) return parseInt(x); return 0 })

        // jeder Block ist am Anfang von Wänden umgeben
        const default_blocks = {
            [`${x1 + 1},${y1},${z1}`]: block_type.wall,
            [`${x1 - 1},${y1},${z1}`]: block_type.wall,
            [`${x1},${y1 + 1},${z1}`]: block_type.wall,
            [`${x1},${y1 - 1},${z1}`]: block_type.wall,
            [`${x1},${y1},${z1 + 1}`]: block_type.wall,
            [`${x1},${y1},${z1 - 1}`]: block_type.wall
        }

        Object.keys(default_blocks).forEach(key => {
            if (key.includes('16')) {
                delete default_blocks[key]
            }
        })

        // Eintragen des gegebenen Übergangs von xyz1 nach xyz2
        default_blocks[`${x2},${y2},${z2}`] = sentinel ? block_type.sentinel : open ? block_type.floor : door ? block_type.door : ladder ? block_type.ladder : block_type.wall

        data[`${x1},${y1},${z1}`] = default_blocks
    }

    for (const coord of Object.keys(data)) {
        const directions = data[coord]

        // implizietes Eintragen einer Verbindung, wenn es eine Verbindung von [x1, y1, z1] nach [x2, y2, z2] gibt so gibt es auch
        // eine Verbindung von [x2, y2, z2] nach [x1, y1, z1]
        for (const _coord of Object.keys(directions)) {
            if (data[_coord]) {
                if (data[_coord][coord]) {
                    data[coord][_coord] = data[_coord][coord]
                } else if (data[coord][_coord]) {
                    data[_coord][coord] = data[coord][_coord]
                }

            }
        }
    }

    return data
}