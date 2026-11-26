import { GameBoard } from "./game-board";
import { isValidPosition } from "./game-board";
import { Position } from "./position";
import * as positions from "./position";
import { getAdjacentPositions } from "./game-board";
import { Queue } from "./util";
import * as util from "./util"
import { isMovePossible } from "./movement-validation";
import { isHorizontal, Fence, areFencesOverlapping, equals } from "./fence";
import { Pawn } from "./pawn";
/**
 * Checks if the fence is horizontal.
 * 
 * @param start The starting position of the fence.
 * @param end The ending position of the fence.
 * @returns True if the fence is horizontal, otherwise false.
 */
export function isHorizontalFence(start: Position, end: Position): boolean {
    // Check if the positions have the same rank (row) but different files (columns)
    return start.rank === end.rank && start.file !== end.file;
}

/**
 * Checks if the fence is vertical.
 * 
 * @param start The starting position of the fence.
 * @param end The ending position of the fence.
 * @returns True if the fence is vertical, otherwise false.
 */
export function isVerticalFence(start: Position, end: Position): boolean {
    // Check if the positions have the same file (column) but different ranks (rows)
    return start.file === end.file && start.rank !== end.rank;
}

/**
 * Checks if the fence is within the boundaries of the game board.
 * 
 * @param start The starting position of the fence.
 * @param end The ending position of the fence.
 * @returns True if the fence is within the boundaries, otherwise false.
 */
export function isWithinBoundaries(start: Position, end: Position): boolean {
    // Check if the positions are within the boundaries (assuming 9x9 board)
    return start.rank >= 0 && start.rank < 9 &&
           start.file >= 0 && start.file < 9 &&
           end.rank >= 0 && end.rank < 9 &&
           end.file >= 0 && end.file < 9;
}


/*
 * Checks if placing a fence between two positions is possible.
 * 
 * @param gameBoard The game board.
 * @param start The starting position of the fence.
 * @param end The ending position of the fence.
 * @returns True if placing the fence is possible, otherwise false.
 */
export function isFencePlacementPossible(gameBoard: GameBoard, start: Position, end: Position): boolean {

if ((Math.abs(start.file-end.file)>=2)||(Math.abs(start.rank-end.rank)>=2)){
    // If both position is not adjacent
    return false;
}
//if the starting and ending position position of the fence are not valide on the gameboard.
if(!isHorizontalFence(start, end) && !isVerticalFence(start,end)){
    return false
}
//If the starting and ending positions of the fence are not valid on the game board.
if (!isValidPosition(gameBoard, start) ||!isValidPosition(gameBoard, end)) {
    return false
}
// Whether the fence is not within the boundaries of the game board.
if (!isWithinBoundaries(start, end)) {
            return false;
        }
//If placing the fence would intersect with any existing fences
for (let each of gameBoard.fences){ 
   if((positions.equals(each.startPosition,start)&&(positions.equals(each.endPosition,end)))||
   (positions.equals(each.endPosition,start)&&(positions.equals(each.startPosition,end)))){
      return false
   }
}

//Whether placing the fence would leave any pawn without a valid path to reach their final position.
for (const pawn of gameBoard.pawns){ 
    // checks if there is no path between two positions on the 
   if (!existsPath(gameBoard,pawn.currentPosition,start) && !existsPath(gameBoard, pawn.currentPosition, end)) {
        return false
   }
}
return true 
}






 /**
 * Checks if there exists a path between two positions on the game board.
 * 
 * This function performs a breadth-first search (BFS) algorithm to determine if there is a valid path
 * between two specified positions on the game board. It explores adjacent positions starting from the 
 * provided starting position until it reaches the target position or exhausts all possible paths.
 *
 * @param gameBoard The game board.
 * @param start The starting position.
 * @param target The target position.
 * @returns True if a path exists between the positions, otherwise false.
 */
 function existsPath(gameBoard: GameBoard, start: Position, target: Position): boolean {
    // Visited squares
    const visited = new Array<Position>();

    // Create a queue for BFS
    const queue: Queue<Position> = util.queue<Position>();
    util.enqueue(queue, start);

    // BFS loop
    while (!util.isEmpty(queue)) {
        const currentPos = util.dequeue(queue);

        // Check if current position is equal to target
        if (positions.equals(currentPos, target)) {
            return true;
        }
        visited.push(currentPos);
        const adjPositions: Array<Position> = getAdjacentPositions(gameBoard, currentPos);

        // Check each adjacent position
        for (const adjPos of adjPositions) {
            // Check if adjacent position is within bounds and not visited
            if (isValidPosition(gameBoard, adjPos) 
                && isMovePossible(gameBoard, currentPos, adjPos)
                && !util.containsPosition(visited, adjPos)) {
                // Enqueue adjacent position
                util.enqueue(queue, adjPos);
            }
        }
    }
    // No path found
    return false;
}

