/**
 * Represents a position on the game board.
 */
export type Position = {
    rank: number;
    file: number;
}

/**
 * Creates a new position with the specified row and column numbers.
 * 
 * @param rank The row number.
 * @param file The column number.
 * @returns A new Position object with the given coordinates.
 */
export function position(rank: number, file: number): Position {
    const Position: Position = {rank: rank, file: file}; 
    return Position;
}

/**
 * Returns the position immediately above the given position.
 * 
 * @param myPosition The reference position.
 * @returns The position above the reference position.
 */
export function top(myPosition: Position) : Position {
    const topPosition: Position = {rank: myPosition.rank - 1, file: myPosition.file}; 
    return topPosition; 
}

/**
 * Returns the position immediately below the given position.
 * 
 * @param myPosition The reference position.
 * @returns The position below the reference position.
 */
export function bottom(myPosition: Position) : Position {
    const bottomPosition: Position = {rank: myPosition.rank + 1, file: myPosition.file}; 
    return bottomPosition; 
}

/**
 * Returns the position immediately to the right of the given position.
 * 
 * @param myPosition The reference position.
 * @returns The position to the right of the reference position.
 */
export function right(myPosition: Position) : Position {
    const rightPosition: Position = {rank: myPosition.rank, file: myPosition.file + 1}; 
    return rightPosition; 
}

/**
 * Returns the position immediately to the left of the given position.
 * 
 * @param myPosition The reference position.
 * @returns The position to the left of the reference position.
 */
export function left(myPosition: Position) : Position {
    const leftPosition: Position = {rank: myPosition.rank, file: myPosition.file - 1}; 
    return leftPosition; 
}

/**
 * Checks if two positions are equal.
 * 
 * @param myPosition The first position.
 * @param other The second position.
 * @returns True if the positions are equal, otherwise false.
 */
export function equals(myPosition: Position, other: Position) : boolean {
    return (myPosition.rank == other.rank) && (myPosition.file == other.file);  
}

/**
 * Checks if a target position exists in the given array of positions.
 * 
 * @param positions The array of positions to search.
 * @param targetPosition The position to look for.
 * @returns True if the target position exists in the array, otherwise false.
 */
export function positionExists(positions: Array<Position>, targetPosition: Position): boolean {
    for (const pos of positions) {
        if(equals(pos, targetPosition)){
            return true
        }
    }
    return false
}

/**
 * Counts the number of shared positions between two arrays of positions.
 * 
 * @param arr1 The first array of positions.
 * @param arr2 The second array of positions.
 * @returns The number of shared positions between the two arrays.
 */
export function countSharedPositions(arr1: Array<Position>, arr2: Array<Position>): number {
    let count = 0;
    for (let pos1 of arr1) {
        for (let pos2 of arr2) {
            if (equals(pos1, pos2)) {
                count++;
                break;
            }
        }
    }
    return count;
}

