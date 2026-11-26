import * as readline from 'readline';
import { placeFenceAtPositions } from "./fence-placement";
import { GameBoard, createInitialGameBoard } from "./game-board";
import { Pawn, assignPawnsToPlayers } from "./pawn";
import { Player } from "./pawn";
import { movePawnToPosition } from "./pawn-movement";
import { Position } from "./position";
import * as util from "./util"
import { hawPawnReachedAFinalPos } from "./pawn";
import { getNextPossiblePositions } from './movement-validation';
import * as color from './color';


/**
 * Represents a Quoridor game.
 */
export type QuoridorGame = {
    gameBoard: GameBoard; 
    players: Array<Player>;
    firstPlayerIndex: number;
    currentPlayerIndex: number
}


// Readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Asks the user for input and resolves with the provided answer.
 * @param question The question to ask the user.
 * @returns A promise that resolves with the user's input.
 */
function askForInput(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

/**
 * Moves the current player's pawn to a new position on the game board.
 * @param gameBoard The game board.
 * @param currentPlayer The current player.
 */
async function movePawn(gameBoard: GameBoard, currentPlayer: Player): Promise<void> {
    console.log("\n   > Current position: (" 
    + color.gridNum_color(currentPlayer.pawn.currentPosition.rank) 
    + ", " + color.gridNum_color(currentPlayer.pawn.currentPosition.file) + ")");
    console.log("   > Next possible positions : "); 
    console.log(getNextPossiblePositions(gameBoard, currentPlayer.pawn));
    let validMove = false;
    while (!validMove) {
        const rank = Number(await askForInput("   >> Enter the rank of the next position: "));
        const file = Number(await askForInput("   >> Enter the file of the next position: "));
        const nextPosition: Position = { rank, file };

        validMove = movePawnToPosition(gameBoard, currentPlayer.pawn, nextPosition);

        if (validMove) {
            console.log('\n'
            + color.valid_color("   > Pawn Movement success")
            + '\n   > ' + currentPlayer.pawn.name + " is now at : (" 
            + color.gridNum_color(currentPlayer.pawn.currentPosition.rank) 
            + ", " + color.gridNum_color(currentPlayer.pawn.currentPosition.file) + ") \n");
        } else {    
            console.log(color.invalid_color("   >>> Invalid position. Please choose a valid position."));
        }
    }
}

/**
 * Places a fence on the game board at the player's request.
 * @param gameBoard The game board.
 * @param currentPlayer The current player.
 */
async function placeFence(gameBoard: GameBoard, currentPlayer: Player): Promise<void> {
    console.log("\n   > Number of fences left: " + currentPlayer.nbFencesAvailable);
    const wantToPlace = await askForInput("   > Do you want to place a fence? (yes/no): ");
    if (wantToPlace.toLowerCase() === 'yes' && currentPlayer.nbFencesAvailable > 0) {
        let validPlacement = false;
        while (!validPlacement) {
            const startRank = Number(await askForInput("   >> Enter the rank of the starting position of the fence: "));
            const startFile = Number(await askForInput("   >> Enter the file of the starting position of the fence: "));
            const endRank = Number(await askForInput("   >> Enter the rank of the ending position of the fence: "));
            const endFile = Number(await askForInput("   >> Enter the file of the ending position of the fence: "));

            const startPosition: Position = { rank: startRank, file: startFile };
            const endPosition: Position = { rank: endRank, file: endFile };

            validPlacement = placeFenceAtPositions(gameBoard, startPosition, endPosition);

            if (validPlacement) {
                console.log(color.valid_color("   > Fence placement success."));
                currentPlayer.nbFencesAvailable--;
                console.log("   > Number of fences left: " + currentPlayer.nbFencesAvailable + '\n');
                console.log(color.valid_color("_________________________________________________________________________________ \n"));
            } else {
                console.log(color.invalid_color("   >> Invalid fence placement. Please choose valid positions."));
            }
        }   
    } else {
        console.log(color.mildInvalid_color("   >>> Placement impossible, no fences left or player chose not to place a fence."));
        console.log(color.mildInvalid_color("_________________________________________________________________________________ \n"));
    }
}

/** 
* Sets up a new Quoridor game with the specified number of players.
* 
* @param nbPlayers The number of players in the game.
* @returns The initialized game object.
*/
function setNewGame(nbPlayers: number): QuoridorGame {
    const newPlayers: Array<Player> = assignPawnsToPlayers(nbPlayers);
    let pawns: Array<Pawn> = []
    for(let player of newPlayers){
        pawns.push(player.pawn)
    }
    const firstPlayerInd: number = util.getRandomNumber(nbPlayers)
    newPlayers[firstPlayerInd].isTurn = true ; 
    const newGameBoard: GameBoard = createInitialGameBoard(pawns);
    const newGame: QuoridorGame = {gameBoard: newGameBoard, 
                                    players: newPlayers, 
                                    firstPlayerIndex: firstPlayerInd, 
                                    currentPlayerIndex: firstPlayerInd}
    return newGame;
}

/**
 * Proceeds to the next turn in the game.
 * 
 * @param currentGame The current game state.
 * @returns The player whose turn is next.
 */
export function newTurn(currentGame: QuoridorGame) : Player {
    const players = currentGame.players;
    const currentPlayerInd = currentGame.currentPlayerIndex;
    currentGame.players[currentPlayerInd].isTurn = false;
    // Find next player index
    let nextPlayerInd = (currentPlayerInd + 1) % players.length;

    currentGame.currentPlayerIndex = nextPlayerInd;

    currentGame.players[nextPlayerInd].isTurn = true;
    return currentGame.players[nextPlayerInd];
}

/**
 * Checks if the game is over by determining if any pawn has reached a final position.
 * @param currentGame The current game state.
 * @returns True if the game is over, otherwise false.
 */
function isGameOver(currentGame: QuoridorGame): boolean {
    for(let pawn of currentGame.gameBoard.pawns){
        if(hawPawnReachedAFinalPos(pawn)){
            return true ; 
        }
    }
    return false; 
}

/**
 * Starts and manages the Quoridor game.
 * @param numPlayers The number of players participating in the game.
 */
export async function playGame(numPlayers: number){

    // Check if the number of players is within the valid range
    if (numPlayers < 2 || numPlayers > 4) {
        throw new Error('Number of players must be between 2 and 4.');
    }

    // Initialize a new game
    const newGame = setNewGame(numPlayers) ; 

    // Determine the first player to start the game
    var currentPlayer = newGame.players[newGame.firstPlayerIndex];
    console.log("   > Player " + color.currentPlayer_color(currentPlayer.pawn.name) + " starts the game") ; 
    util.displayBoard(newGame);

    await movePawn(newGame.gameBoard, currentPlayer);
    util.displayBoard(newGame);

    await placeFence(newGame.gameBoard, currentPlayer);

    // Main game loop
    while (!isGameOver(newGame)) {

        // Switch to the next player's turn
        currentPlayer = newTurn(newGame);
        console.log("\n   > Player " + color.currentPlayer_color(currentPlayer.pawn.name) + "'s turn.");
        util.displayBoard(newGame);

        // Prompt current player to make a move
        await movePawn(newGame.gameBoard, currentPlayer);
        util.displayBoard(newGame)

        // If the game is not over yet, prompt the current player to place a fence
        if(!isGameOver(newGame)) {
            await placeFence(newGame.gameBoard, currentPlayer);
        }
    }

    // Game over
    console.log("   > Game over!");
    console.log("   > Player " + color.valid_color(currentPlayer.pawn.name) + " is the winner !");
    rl.close();
}

/**
 * Creates a new Quoridor Game
 * @param playerCount  the number of players, between 2 and 4
 * @returns a new Quoridor Game
 */
export function createNewGame(playerCount: number): QuoridorGame {
    return setNewGame(playerCount);
}