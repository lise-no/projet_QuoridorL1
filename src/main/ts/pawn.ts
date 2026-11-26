import { Position, position } from "./position";
import * as positions from "./position";

/**
 * Defines the structure of a pawn.
 */
export type Pawn = {
    name: string;
    currentPosition: Position;
    validFinalPositions: Array<Position>;
}

/**
 * Checks if a pawn has reached a valid final position.
 * @param pawn The pawn to check.
 * @returns True if the pawn has reached a valid final position, otherwise false.
 */
export function hawPawnReachedAFinalPos(pawn: Pawn): boolean {
    for(let aFinalPos of pawn.validFinalPositions){
        if(positions.equals(pawn.currentPosition, aFinalPos)){
            return true;
        }
    }
    return false;
}

/**
 * Represents a pawn positioned at the top of the board.
 */
export const northernPawn: Pawn = {
    name: "Northern Pawn",
    currentPosition: position(0, 4),
    validFinalPositions: Array.from({ length: 9 }, (_, i) => position(8, i))
};

/**
 * Represents a pawn positioned at the bottom of the board.
 */
export const southernPawn: Pawn = {
    name: "Southern Pawn",
    currentPosition: position(8, 4),
    validFinalPositions: Array.from({ length: 9 }, (_, i) => position(0, i))
};

/**
 * Represents a pawn positioned at the right side of the board.
 */
export const easternPawn: Pawn = {
    name: "Eastern Pawn",
    currentPosition: position(4, 8),
    validFinalPositions: Array.from({ length: 9 }, (_, i) => position(i, 0))
};

/**
 * Represents a pawn positioned at the left side of the board.
 */
export const westernPawn: Pawn = {
    name: "Western Pawn",
    currentPosition: position(4, 0),
    validFinalPositions: Array.from({ length: 9 }, (_, i) => position(i, 8))
};


/**
 * Defines the structure of a player.
 */
export type Player = {
    pawn: Pawn;
    isTurn: boolean;
    nbFencesAvailable: number;
};

/**
 * Assigns pawns and fences to players based on the number of players.
 * @param numPlayers The number of players in the game.
 * @returns An array of players with associated pawns.
 */
export function assignPawnsToPlayers(numPlayers: number): Array<Player> {

    const players: Player[] = [];

    const totalFences = 20;
    const fencesPerPlayer = Math.floor(totalFences / numPlayers);
    const remainingFences = totalFences % numPlayers;

    switch (numPlayers) {
        case 2:
            players.push(
                { pawn: northernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer + remainingFences },
                { pawn: southernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer }
            );
            break;
        case 3:
            players.push(
                { pawn: northernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer + remainingFences },
                { pawn: southernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer },
                { pawn: easternPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer }
            );
            break;
        case 4:
            players.push(
                { pawn: northernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer + remainingFences },
                { pawn: southernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer },
                { pawn: easternPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer },
                { pawn: westernPawn, isTurn: false, nbFencesAvailable: fencesPerPlayer }
            );
            break;
        default:
    }

    return players;
}



