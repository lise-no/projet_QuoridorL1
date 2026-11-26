import { Position } from "./position";
import * as positions from "./position";

/**
 * Represents a fence on the game board. 
 * 
 * A fence can be either vertical or horizontal.
 * - A vertical fence is determined by the two positions adjacent to the left.
 * - A horizontal fence is determined by the two positions adjacent above.
 */
export type Fence = {
    startPosition: Position;
    endPosition: Position;
    isHorizontal: boolean;
}

/**
 * Checks if the given fence is horizontal.
 * 
 * @param start The starting position of the fence.
 * @param end The ending position of the fence.
 * @returns True if the fence is horizontal, otherwise false.
 */
export function isHorizontal(start: Position, end: Position): boolean{
    return positions.equals(positions.right(start), end) 
            || positions.equals(positions.left(start), end);
}

/**
 * Checks if two fences are equal.
 * 
 * @param fence The first fence.
 * @param other The second fence.
 * @returns True if the fences are equal, otherwise false.
 */
export function equals(fence: Fence, other: Fence): boolean{
    return (positions.equals(fence.startPosition, other.startPosition) 
            && positions.equals(fence.endPosition, other.endPosition))
            || (positions.equals(fence.startPosition, other.endPosition)
                && positions.equals(fence.endPosition, other.startPosition));
}

/**
 * Gets the adjacent squares to the given fence.
 * 
 * - For a horizontal fence, the adjacent squares are the two positions of the fence 
 * and the two positions directly below. 
 * - For a vertical fence, the adjacent squares are the two positions of the fence and 
 * the two positions directly to the right.
 * 
 * @param fence The fence.
 * @returns An array of adjacent square positions.
 */
export function getAdjacentSquares(fence: Fence): Array<Position>{
    if(fence.isHorizontal){
        return [fence.startPosition, fence.endPosition, 
                positions.bottom(fence.startPosition), positions.bottom(fence.endPosition)];
    }else{
        return [fence.startPosition, fence.endPosition, 
            positions.right(fence.startPosition), positions.right(fence.endPosition)];
    }
}

/**
 * Gets the number of shared squares between two fences.
 * 
 * @param fence The first fence.
 * @param other The second fence.
 * @returns The number of shared squares.
 */
export function getNumberSharedSquares(fence: Fence, other: Fence): number{
    const fenceAdjSquares: Array<Position> = getAdjacentSquares(fence); 
    const othersAdjSquares: Array<Position> = getAdjacentSquares(other); 
    return positions.countSharedPositions(fenceAdjSquares, othersAdjSquares);
}

/**
 * Checks if a fence is located between two positions.
 * 
 * @param fence The fence to check.
 * @param pos1 The first position.
 * @param pos2 The second position.
 * @returns True if the fence is between the positions, otherwise false.
 */
export function isFence(fence: Fence, pos1: Position, pos2: Position): boolean{
    return (positions.equals(fence.startPosition, pos1) && positions.equals(fence.endPosition, pos2))
    || (positions.equals(fence.startPosition, pos2) && positions.equals(fence.endPosition, pos1));
}

/**
 * Checks if the orientation of a fence is the same as another fence.
 * 
 * @param fence The first fence.
 * @param other The second fence.
 * @returns True if the orientation of the fences is the same, otherwise false.
 */
export function isFencePositionSame(fence: Fence, other: Fence): boolean {
    return fence.isHorizontal == other.isHorizontal;
}

/**
 * Checks if two fences overlap.
 * 
 * @param fence The first fence.
 * @param other The second fence.
 * @returns True if the fences overlap, otherwise false.
 */
export function areFencesOverlapping(fence: Fence, other: Fence): boolean{
    return (fence.startPosition == other.endPosition)
            || (fence.endPosition == other.startPosition);
}
