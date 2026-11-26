import { Fence } from "./fence";
import { Pawn } from "./pawn";
import { Position, equals, position, top, bottom, left, right} from "./position";
import { Square, square } from "./square";

/**
 * Represents the game board containing squares, pawns, and fences.
 */
export type GameBoard = {
    board: Array<Array<Square>>; 
    pawns: Array<Pawn>; 
    fences: Array<Fence>;
}

/**
 * Creates an empty game board with no pawns or fences.
 * 
 * @returns An empty game board.
 */
export function createEmptyGameBoard(): GameBoard {
    const board: Square[][] = [];
    for (let rank = 0; rank < 9; rank++) {
        const row: Square[] = []; 
        for (let file = 0; file < 9; file++) {
            row.push(square(position(rank, file))); 
        }
        board.push(row); 
    }

    return { board: board, pawns: [], fences: [] };
}

/**
 * Places a pawn on the game board.
 * 
 * @param gameBoard The game board.
 * @param pawn The pawn to be placed.
 */
export function putPawnOnBoard(gameBoard: GameBoard, pawn: Pawn): void {
    const square: Square = {position: pawn.currentPosition, pawn: pawn, 
                            hasFence: false, hasPawn: true};
    gameBoard.board[square.position.rank][square.position.file] = square; 
}


/**
 * Creates the initial game board with provided pawns.
 * 
 * @param myPawns The pawns to be placed on the board.
 * @returns The initial game board.
 */
export function createInitialGameBoard(myPawns: Pawn[]): GameBoard {
    let gameBoard : GameBoard = createEmptyGameBoard() ;
    for (let rank = 0; rank < 9; rank++) {
        for(let file = 0; file < 9; file++){
            const squarePos: Position = position(rank, file);
            gameBoard.board[rank][file] = square(squarePos);
        }
    }

    gameBoard.pawns = myPawns; 

    for(let pawn of gameBoard.pawns){
        putPawnOnBoard(gameBoard, pawn); 
    }
    
    return gameBoard; 
}

/**
 * Retrieves the square at a given position on the game board.
 * 
 * @param gameBoard The game board.
 * @param position The position to retrieve the square from.
 * @returns The square at the specified position.
 */
export function getSquareAtPosition(gameBoard: GameBoard, position: Position): Square {
    const square: Square = gameBoard.board[position.rank][position.file];
    return square;
}

/**
 * Checks if a position is within the boundaries of the game board.
 * 
 * @param gameBoard The game board.
 * @param position The position to check.
 * @returns True if the position is valid, otherwise false.
 */
export function isValidPosition(gameBoard: GameBoard, position: Position): boolean {
    const boardLength: number = gameBoard.board.length;

    // Check if both rank and file are within the boundaries of the board
    const withinBounds: boolean = position.rank >= 0 && position.rank < boardLength 
                        && position.file >= 0 && position.file < boardLength;
    
    return withinBounds;
}

/**
 * Marks a square on the game board as having a fence.
 * 
 * @param gameBoard The game board.
 * @param position The position of the square to mark.
 */
export function markSquareAsHavingFence(gameBoard: GameBoard, position: Position): void {
    const square: Square = getSquareAtPosition(gameBoard, position);
    square.hasFence = true;
    gameBoard.board[position.rank][position.file] = square;
}


/**
 * Retrieves the fences at a given position on the game board.
 * 
 * @param gameBoard The game board.
 * @param position The position to retrieve the fences from.
 * @returns An array of fences at the specified position.
 */
export function getFencesAtPosition(gameBoard: GameBoard, position: Position): Array<Fence> { 
    let fencesAtPosition: Array<Fence> = []; 

    for(let fence of gameBoard.fences){
        if(equals(fence.startPosition, position) || equals(fence.endPosition, position)){
            fencesAtPosition.push(fence);
        }
    }

    return fencesAtPosition;
}

/**
 * Checks if there is a fence between two positions on the game board.
 * 
 * @param gameBoard The game board.
 * @param startPosition The start position of the fence.
 * @param endPosition The end position of the fence.
 * @returns iTrue if there is a fence between the positions, otherwise false.
 */
export function hasFenceAtPositions(gameBoard: GameBoard, startPosition: Position, endPosition): boolean {
    for(let fence of gameBoard.fences){
        if((equals(fence.startPosition, startPosition) && equals(fence.endPosition, endPosition)) 
            || (equals(fence.startPosition, endPosition) && equals(fence.endPosition, startPosition))){
            return true;
        }
    }

    return false;
}


/**
 * Retrieves the adjacent positions of a given position on the game board.
 * 
 * @param gameBoard The game board.
 * @param position The position to retrieve adjacent positions from.
 * @returns An array of adjacent positions.
 */
export function getAdjacentPositions(gameBoard: GameBoard, position: Position): Position[] {
    const adjacentPositions: Array<Position> = [];

    // Check adjacent positions in four directions (up, down, left, right)
    const topNeighbor: Position = top(position);
    const bottomNeighbor: Position = bottom(position);
    const leftNeighbor: Position = left(position);
    const rightNeighbor: Position = right(position);

    // Add valid neighbor positions to the list of adjacent positions
    if (isValidPosition(gameBoard, topNeighbor)) {
        adjacentPositions.push(topNeighbor);
    }
    if (isValidPosition(gameBoard, bottomNeighbor)) {
        adjacentPositions.push(bottomNeighbor);
    }
    if (isValidPosition(gameBoard, leftNeighbor)) {
        adjacentPositions.push(leftNeighbor);
    }
    if (isValidPosition(gameBoard, rightNeighbor)) {
        adjacentPositions.push(rightNeighbor);
    }

    return adjacentPositions;
}
