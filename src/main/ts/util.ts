import { Position } from "./position";
import * as positions from "./position";
import { Square } from "./square";
import { getFencesAtPosition, GameBoard } from "./game-board";
import { Fence} from "./fence";
import { QuoridorGame } from "./game";
import { Pawn } from "./pawn";
import { currentPlayer_color, gridNum_color, fence_color } from './color';

/**
 * Creates a deep copy of the given object.
 * 
 * @param obj The object to be copied.
 * @returns A deep copy of the object.
 */
export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Gets the initial of a pawn.
 * 
 * @param pawn The pawn.
 * @returns The initial of the pawn in uppercase.
 */
function getPawnInitial(pawn: Pawn): string {
    const pawnInitial = pawn.name.charAt(0).toUpperCase();
    return pawnInitial;
}

/**
 * Gets the initial of the pawn on a square.
 * 
 * @param square The square on the game board.
 * @returns The initial of the pawn if present, otherwise '.'.
 */
function getPawnInitialOnSquare(square: Square): string {
    if (square.hasPawn) {
        return getPawnInitial(square.pawn) 
    } else {
        return '.';
    }
}


/**
 * Gets the characters representing the fences at a specific position on the game board.
 * 
 * @param gameBoard The game board.
 * @param position The position to check for fences.
 * @returns An array of characters representing the fences at the given position.
 */
function getFencesChars(gameBoard: GameBoard, position: Position): string[] {
    const fencesAtPosition: Fence[] = getFencesAtPosition(gameBoard, position);
    let fencesChars: string[] = [];
    if (fencesAtPosition.length > 0) {
        for(var fence of fencesAtPosition) {
            if(fence.isHorizontal) {
                fencesChars.push('―――');
            } else {
                fencesChars.push('|');
            }
        } 
    } else {
        fencesChars.push(' ');
    }

    return fencesChars;
}


/**
 * Displays the current state of the game board.
 * 
 * @param game The QuoridorGame instance representing the current game state.
 */
export function displayBoard(game: QuoridorGame): void {
    const gameBoard = game.gameBoard;
    const length = gameBoard.board.length;
    const currentPawn : Pawn = game.players[game.currentPlayerIndex].pawn

    // Display upper grid numbers
    const upperNums = gridNum_color("  0   1   2   3   4   5   6   7   8")
    const upperLowerLine = "+---+---+---+---+---+---+---+---+---+"

    // Display upper horizontal line
    let boardHorizontalLine : string[][] =  [] ; 
    for(let i = 0; i < length - 1; i++){
        let line : string[] = []
        for(let j = 0; j < length; j++){
            if(j == length - 1){
                line.push("+    +");
            }else{
                line.push("+   ");
            }
        }
        boardHorizontalLine.push(line)
    }
    console.log(upperNums)
    console.log(upperLowerLine);

    // Loop through each row
    for (let i = 0; i < length; i++) {
        let fenceChars : string[] = [] ; 
        let row = '|';
        // Loop through each column
        for (let j = 0; j < length; j++) {
            const square = gameBoard.board[i][j];
            const pawnInitial = getPawnInitialOnSquare(square);

            // Highlight current pawn
            if(pawnInitial == getPawnInitial(currentPawn)){
                row += ` ${currentPlayer_color(pawnInitial)} `
            }else{
                row += ` ${pawnInitial} `;
            }
            
            // Get fence characters for the current square
            fenceChars = getFencesChars(gameBoard, square.position);

            // Display fence characters
            for(var fenceChar of fenceChars ){
                if(fenceChar == '―――' && j == length - 1){
                    boardHorizontalLine[i][j] = '+' + fence_color(fenceChar + '-') + '+'
                    row += ' '
                } else if(fenceChar == '―――' && j != length - 1) {
                    boardHorizontalLine[i][j] = '+' + fence_color(fenceChar)
                    row += ' '
                } else if (fenceChar == '|') {
                    row += fence_color(fenceChar);
                } else {
                    row += ' '
                }
            }
        
        }
        row += '| ' + gridNum_color(i) ;
        console.log(row);

        // Display horizontal lines between rows
        let horizontalLine : string = ""
        if(i != length - 1){
            for(let l = 0; l < length; l++ ){
                horizontalLine += boardHorizontalLine[i][l];
            }
            console.log(horizontalLine);
        }
    }
    console.log(upperLowerLine);
}

/**
 * Checks if a given array of positions contains a specific position.
 * 
 * @param posArray The array of positions to search.
 * @param position The position to check for.
 * @returns True if the position is found, otherwise false.
 */
export function containsPosition(posArray: Array<Position>, position: Position): boolean{
    for(let pos of posArray){
        if(positions.equals(pos, position)){
            return true;
        }
    }
    return false;
}

/**
 * Represents a queue data structure.
 */
export type Queue<T> = {
    elements: Array<T>
}

/**
 * Creates a new empty queue.
 * 
 * @returns An empty queue.
 */
export function queue<T>(): Queue<T>{
    const queue: Queue<T> = {elements: []} ;
    return queue;
}

/**
 * Adds an item to the end of the queue.
 * 
 * @param queue The queue.
 * @param item The item to add.
 */
export function enqueue<T>(queue: Queue<T>, item: T): void {
    queue.elements.push(item);
}

/**
 * Removes and returns the item at the front of the queue.
 * 
 * @param queue The queue.
 * @returns The item removed from the queue, or undefined if the queue is empty.
 */
export function dequeue<T>(queue: Queue<T>): T | undefined {
    return queue.elements.shift();
}

/**
 * Checks if the queue is empty.
 * 
 * @param queue The queue.
 * @returns True if the queue is empty, otherwise false.
 */
export function isEmpty<T>(queue: Queue<T>): boolean {
    return queue.elements.length === 0;
}

/**
 * Generates a random number between 0 (inclusive) and n (exclusive).
 * 
 * @param n The upper limit for the random number.
 * @returns A random number.
 */
export function getRandomNumber(n: number): number {
    return Math.floor(Math.random() * n);
}