import { Fence, isHorizontal } from "./fence";
import { isFencePlacementPossible } from "./fence-placement-validation";
import { Position } from "./position";
import { GameBoard, markSquareAsHavingFence } from "./game-board";



/**
 * Places a fence at specified positions on the game board if the placement is valid.
 * 
 * This function checks if placing a fence between the specified start and end positions 
 * is permissible according to the game's rules. If the placement is valid, the fence is 
 * added to the game board and the corresponding squares are marked as having a fence. 
 * If the placement is not valid, no changes are made to the game board.
 * 
 * @param gameboard The game board.
 * @param startPosition The start position of the fence.
 * @param endPosition The end position of the fence.
 * @returns True if the fence is successfully placed, otherwise false.
 */
export function placeFenceAtPositions(gameboard: GameBoard, startPosition: Position, endPosition: Position): boolean {
    if (isFencePlacementPossible(gameboard, startPosition, endPosition)) {
        const newFence: Fence = {
            startPosition: startPosition,
            endPosition: endPosition,
            isHorizontal: isHorizontal(startPosition, endPosition)
        };
        gameboard.fences.push(newFence);
        markSquareAsHavingFence(gameboard, startPosition);
        markSquareAsHavingFence(gameboard, endPosition);
        return true;
    } else {
        return false;
    }
}
