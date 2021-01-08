
/**
 * block type enum, the higher the value the more expensiv our 
 * route will be
 */
enum block_type {
    floor = 1,
    door = 2,
    ladder = 5,
    sentinel = 10,
    wall = 100
}

/**
 * used for "fancy" visuals, so we can find the string
 */
const reverse_block_type = {
    1: "floor",
    2: "door",
    5: "ladder",
    10: "sentinel",
    100: "wall"
}

/**
 * the csv export is build on the i_coord interface
 * it explains how the output will be structured
 * 
 * [0,0,0] : { [1,0,0]: 1 } -> from [0,0,0] to [1,0,0] we need to walk normal
 */
interface i_coord {
    [coord: string]: i_neighbors 
}

// see the documentation above, its just the inner part of it
interface i_neighbors {
    [coord: string]: block_type
}

/**
 * vector representation of a 3D coordinate
 */
interface i_Vector {
    x: number
    y: number
    z: number
}

/**
 * status type used to keep track of all details
 */
type Status = {
    energy: number,
    blaster: number,
    time: number,
    cooldown: number
}

export { block_type, reverse_block_type, i_coord, i_neighbors, i_Vector, Status}