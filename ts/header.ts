
export enum block_type {
    wall = 0,
    floor = 1,
    door = 2,
    ladder = 3,
    sentinel = 4,
    end = 10,
    start = -1
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