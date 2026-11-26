import { Position } from "./position";
import * as positions from "./position";
import { Pawn } from "./pawn";

/**
 * Represents a square on the game board.
 */
export type Square = {
    position: Position; 
    pawn: Pawn
    hasFence: boolean; 
    hasPawn: boolean; 
}

 /**
 * Constructs a new square with the given position.
 * 
 * @param pos The position of the square on the board.
 * @returns A new Square object with the specified position and default values for pawn, hasFence, and hasPawn.
 */
export function square(pos: Position): Square {
    const mysquare: Square = {position: pos, pawn: null, hasFence: false, hasPawn: false}
    return mysquare; 
}

/**
 * Compares this square to another square to check for equality.
 * 
 * @param square The first square to compare.
 * @param other The other square to compare.
 * @returns True if the squares have the same position, otherwise false.
 */
export function equals(square: Square, other: Square) {
    return positions.equals(square.position, other.position) ;
}

