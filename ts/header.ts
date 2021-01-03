
export enum block_type {
    floor = 1,
    door = 2,
    ladder = 4,
    sentinel = 10,
    wall = 10000
}

export interface i_coord {
    [coord: string]: { 
        [coord: string]: block_type 
    } 
}

export interface i_neighbors {
    [coord: string]: block_type
}


export type Path = {
    x: number,
    y: number,
    z: number
}

export interface i_Vector {
    x: number
    y: number
    z: number
}

export interface i_Score { 
    [x: string]: {
        [y: string]: {
            [z: string]: number
        }
    } 
}

export const reverse_lookup = {
    1: "floor",
    2: "door",
    4: "ladder",
    10: "sentinel",
    10000: "wall"
}