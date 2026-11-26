import { Pawn } from "./pawn";
import { GameBoard, getFencesAtPosition } from "./game-board";
import { isValidPosition} from "./game-board";
import { Position, bottom, right, left, top,equals } from "./position";


/**
 * Checks if the next position is adjacent to the current position.
 *
 * @param currentPosition The current position.
 * @param nextPosition The position to check adjacency with.
 * @returns True if the next position is adjacent to the current position, otherwise false.
 */
 export function isNextPositionAdjacent(currentPosition: Position, nextPosition: Position): boolean {
    /*
    #TODO: Implement this function

    Check that nextPosition is at the right, at the left, at the top, or at the bottom of the current position */
    /** the difference between the distance  */

    return (currentPosition.rank===nextPosition.rank && Math.abs(currentPosition.file-nextPosition.file)==1)|| (
        currentPosition.file===nextPosition.file && Math.abs(currentPosition.rank-nextPosition.rank)==1
    );

}


/*

 * Checks if a pawn movement to the specified position is possible.
 *
 * @param gameBoard The game board.
 * @param position The position to be checked
 * @returns True if the pawn is present at specified position, otherwise false.
 */
export function hasPawnAtPosition(gameBoard: GameBoard, position: Position): boolean {
    /*
    #TODO: Implement this function

    Checks that the Square corresponding to the position has a pawn on it */
    /* checks if the postion is on the board */


    return gameBoard.board[position.rank][position.file].hasPawn;

}


/**
 * Checks if a pawn movement to the specified position is possible.
 *
 * @param gameBoard The game board.
 * @param currentPosition The current position of the pawn.
 * @param direction The direction in which the pawn is to be moved.
 * @returns True if the pawn movement is possible, otherwise false.
 */
export function isMovePossible(gameBoard: GameBoard, currentPosition: Position, direction: Position): boolean {

    if(currentPosition.rank == direction.rank){
        // If the movement is horizontal, check horizontal movement possibility
        return isHorizontalMovePossible(gameBoard, currentPosition, direction);
    } else{
        // If the movement is vertical, check vertical movement possibility
        return isVerticalMovePossible(gameBoard, currentPosition, direction);
    }
}

/**
 * Checks if a horizontal movement is possible for a pawn.
 *
 * @param gameBoard The game board.
 * @param currentPosition The current position of the pawn.
 * @param direction The direction in which the pawn is to be moved.
 * @returns True if the horizontal movement is possible, otherwise false.
 */
export function isHorizontalMovePossible(gameBoard: GameBoard, currentPosition: Position, direction: Position): boolean {
    /*
    #TODO: Implement this function

    This function should iterate through the gameboard's fences to determine if any of
    them blocks the horizontal movement from the current position to the target position. */
    const rightDirection = right(currentPosition);
    const leftDirection = left(currentPosition);

    // verify if the direction is valid and no pawn on it 
    if (!isValidPosition(gameBoard, direction) || hasPawnAtPosition(gameBoard, direction)) {
        return false;
    }

    // check either the direction is left or right
    const movingRight = equals(direction, rightDirection);
    const movingLeft = equals(direction, leftDirection);

    if (!movingRight && !movingLeft) {
        return false; // whereas the direction is neither left or right
    }

    // get fences at the current position or the direction
    const fencesArray = movingRight ? getFencesAtPosition(gameBoard, currentPosition) : getFencesAtPosition(gameBoard, direction);

    // verify if a vertical mouvement bloks the mouvement 
    for (const fence of fencesArray) {
        const fenceAtCurrentPosition = equals(fence.startPosition, currentPosition) || equals(fence.endPosition, currentPosition);
        const fenceAtNextPosition = equals(fence.startPosition, direction) || equals(fence.endPosition, direction);
        if ((fenceAtCurrentPosition || fenceAtNextPosition) && !fence.isHorizontal) {
            return false;
        }
    }

    return true; //if no vertical fence bloks the mouvement is possible 
}



/**
 * Checks if a vertical movement is possible for a pawn.
 *
 * @param gameBoard The game board.
 * @param currentPosition The current position of the pawn.
 * @param direction The direction in which the pawn is to be moved.
 * @returns True if the vertical movement is possible, otherwise false.
 */
export function isVerticalMovePossible(gameBoard: GameBoard, currentPosition: Position, direction: Position): boolean {
    /*
    #TODO: Implement this function

    This function should iterate through the gameboard's fences to determine if any of them
    blocks the vertical movement from the current position to the target position. */

    const topDirection: Position = top(currentPosition);
    const bottomDirection: Position = bottom(currentPosition);

   // verify if the direction is valid and no pawn on it 
    if (!isValidPosition(gameBoard, direction) || hasPawnAtPosition(gameBoard, direction)) {
        return false;
    }

    // check either the direction is top or bottom
    const movingDown = equals(direction, bottomDirection);
    const movingUp = equals(direction, topDirection);

    if (!movingDown && !movingUp) {
        return false; // whereas the direction is neither top or bottom
    }

    // get fences at the current position or the direction
    const fences = movingDown ? getFencesAtPosition(gameBoard, currentPosition) : getFencesAtPosition(gameBoard, direction);

   // verify if a horizontal mouvement bloks the mouvement 
    for (const fence of fences) {
        const fenceAtCurrentPosition = equals(fence.startPosition, currentPosition) || equals(fence.endPosition, currentPosition);
        const fenceAtNextPosition = equals(fence.startPosition, direction) || equals(fence.endPosition, direction);
        if ((fenceAtCurrentPosition || fenceAtNextPosition) && fence.isHorizontal) {
            return false;
        }
    }

    return true; //if no vertical fence bloks the mouvement is possible 

}


/**
 * Gets the next possible positions that a pawn can move to.
 *
 * This function determines the next possible positions that a pawn can move to based on its current position
 * and the presence of other pawns and fences on the game board.
 *
 * @param gameBoard The game board.
 * @param pawn The pawn whose next possible positions are to be determined.
 * @returns An array of positions representing the next possible positions for the pawn.
 */
export function getNextPossiblePositions(gameBoard: GameBoard, pawn: Pawn): Position[] {
    const currentPosition: Position = pawn.currentPosition;
    const possiblePositions: Position[] = [];

    // Define the directions in which the pawn can move
    const directions: Position[] = [top(currentPosition), bottom(currentPosition), left(currentPosition), right(currentPosition)];

    for (const direction of directions) {
        // Check if the direction is a valid position on the game board and if the pawn can move there
        if (isValidPosition(gameBoard, direction) && isMovePossible(gameBoard, currentPosition, direction)) {

            // If there is no pawn at the direction position, add it to the possible positions
            if (!hasPawnAtPosition(gameBoard, direction)) {
                possiblePositions.push(direction);
            } else {

                // If there is a pawn at the direction position, check the next position
                const nextPosition: Position = direction;

                // Calculate the position after the next position
                const nextNextPosition: Position = {
                    rank: nextPosition.rank + (nextPosition.rank - currentPosition.rank),
                    file: nextPosition.file + (nextPosition.file - currentPosition.file)
                };

                // If the next next position is valid and there is no pawn there, add it to the possible positions
                if (isValidPosition(gameBoard, nextNextPosition) && !hasPawnAtPosition(gameBoard, nextNextPosition)) {
                    possiblePositions.push(nextNextPosition);
                }
            }
        }
    }

    return possiblePositions;
}



/**
 * Checks if a pawn movement to the specified position is possible.
 *
 * @param gameBoard The game board.
 * @param pawn The pawn to be moved.
 * @param nextPosition The position to which the pawn is to be moved.
 * @returns True if the pawn movement is possible, otherwise false.
 */
export function isPawnMovementPossible(gameBoard: GameBoard, pawn: Pawn, nextPosition: Position): boolean {
    /*
    #TODO: Implement this function

    This function should determine whether a pawn can move to the specified position on the
    gameboard if the target position is valid and it is a part of next possible positions for
    the pawn */

    const currentPosition : Position = pawn.currentPosition;
    const possiblePositions:Position[]=getNextPossiblePositions(gameBoard,pawn);

    if(!(Math.abs(currentPosition.rank-nextPosition.rank)===1 || Math.abs(currentPosition.file-nextPosition.file)===1)){
        return false; //the pawn cann't move diagonally 
    }

    if (hasPawnAtPosition(gameBoard, nextPosition)) {
        return false; // Another pawn is present at the next position
    }
   
    if(!(isValidPosition(gameBoard,nextPosition))){
        return false; //check a valid position on board 
    }

    /**checks if the nextPosition is on the proposed positions  */
    if(isNextPositionAdjacent(currentPosition,nextPosition)&&isMovePossible(gameBoard,currentPosition,nextPosition)){
        for(const position of possiblePositions)
    {
        if(equals(position,nextPosition))
        {
            return true;
        }
    }
    }
    return false;
}

