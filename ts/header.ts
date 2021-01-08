
export enum block_type {
    floor = 1,
    door = 2,
    ladder = 5,
    sentinel = 10,
    wall = 100
}

export const reverse_block_type = {
    1: "floor",
    2: "door",
    5: "ladder",
    10: "sentinel",
    100: "wall"
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

export type Status = {
    energy: number,
    blaster: number,
    time: number,
    cooldown: number
}