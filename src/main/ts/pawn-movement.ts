import { Pawn } from "./pawn";
import { Position } from "./position";
import { GameBoard, getSquareAtPosition } from "./game-board";
import { isPawnMovementPossible } from "./movement-validation";

/**
 * Moves a pawn to the specified position on the game board if the movement is valid.
 * 
 * This function attempts to move a pawn to the specified position on the game board 
 * if the movement is valid. It first checks if the movement is possible using the 
 * 'isPawnMovementPossible' function. If the movement is possible, it updates the current 
 * square of the pawn to indicate that it no longer occupies that square, and updates the 
 * new square of the pawn and its previous one. 
 * 
 * @param gameBoard The game board.
 * @param pawn The pawn to be moved.
 * @param nextPosition The position to which the pawn is to be moved.
 * @returns True if the pawn is successfully moved, otherwise false.
 */
export function movePawnToPosition(gameBoard: GameBoard, pawn: Pawn, nextPosition: Position): boolean {

    // Check if the movement is possible
    if (!isPawnMovementPossible(gameBoard, pawn, nextPosition)) { 
        return false; 
    }

    const previousSquare = getSquareAtPosition(gameBoard, pawn.currentPosition);
    const nextSquare = getSquareAtPosition(gameBoard, nextPosition);

    // Update the current square of the pawn
    previousSquare.hasPawn = false;
    previousSquare.pawn = null;

    // Update the new square of the pawn
    nextSquare.hasPawn = true;
    nextSquare.pawn = pawn;

    // Update the current position of the pawn
    pawn.currentPosition = nextPosition;
    gameBoard.board[nextSquare.position.rank][nextSquare.position.file] = nextSquare;

    // Update the previous position of the pawn
    gameBoard.board[previousSquare.position.rank][previousSquare.position.file] = previousSquare;
    
    return true;
}

