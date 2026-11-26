import { Expect, Test, Setup } from 'alsatian';
import { GameBoard, createEmptyGameBoard ,createInitialGameBoard,putPawnOnBoard} from '../../main/ts/game-board';
import { isNextPositionAdjacent,hasPawnAtPosition,isHorizontalMovePossible,isVerticalMovePossible,getNextPossiblePositions,isMovePossible,isPawnMovementPossible} from '../../main/ts/movement-validation';
import { Position, bottom, right, left, top,equals, position } from '../../main/ts/position';
import {westernPawn,easternPawn,northernPawn,southernPawn,Pawn}from '../../main/ts/pawn';

let board: GameBoard;


export class TestMovementValidation {

    @Setup 
    beforeEach() {
        board = createEmptyGameBoard();

    }

    /**
     * Given two adjacent positions
     * Then the function isNextPositionAdjacent() should return true
     */
    @Test()
    testIsNextPositionAdjacentAnswersTrueForAdjacentPositions() {
        // #TODO: Implement this test
        Expect (isNextPositionAdjacent({rank:1,file:2},{rank:1,file:3})).toBe(true);
    }

    /**
    * Given two non-adjacent positions
    * Then the function isNextPositionAdjacent() should return false
    */
    @Test()
    testIsNextPositionAdjacentAnswersFalseForNonAdjacentPositions() {
        // #TODO: Implement this test
        Expect (isNextPositionAdjacent({rank:1,file:1},{rank:5,file:5})).toBe(false);
    }

    /**
     * Given a game board and a position
     * When the position has a pawn on it
     * Then the function hasPawnAtPosition() should return true
     */
    @Test()
    testHasPawnAtOccupiedPosition() {
        // #TODO: Implement this function
        //the case where yhe board is initial position is occupied by a pawn
        let actual:boolean=hasPawnAtPosition( board=createInitialGameBoard([westernPawn,easternPawn,northernPawn,southernPawn]),{rank:4,file:8});
        Expect(actual).toBe(true);
    }

    /**
     * Given a game board and a position
     * When the position is empty
     * Then the function hasPawnAtPosition() should return false
     */
    @Test()
    testHasPawnAtEmptyPosition() {
        // #TODO: Implement this function
        //the case where yhe board is empty
        let actual:boolean=hasPawnAtPosition(board,{rank:4,file:8});
        Expect(actual).toBe(false);
    }

    /**
     * Given a game board, a departure and an arrival positions
     * When the arrival position is horizontally adjacent to the departure
     * Then the function isHorizontalMovePossible() should return true
     */
    @Test()
    testIsHorizontalMovePossible() {
        // #TODO: Implement this function
        board=createInitialGameBoard([westernPawn,easternPawn,northernPawn,southernPawn]);
        let actual :  boolean = isHorizontalMovePossible(board,{rank:4,file:0},{rank:4,file:1});
        Expect(actual).toBe(true);
    }

    /**
     * Given a game board, a departure and an arrival positions
     * When the arrival position is not adjacent to the departure
     * Then the function isHorizontalMovePossible() should return false
     */
    @Test()
    testIsHorizontalMoveImpossible() {
        // #TODO: Implement this function
        board=createInitialGameBoard([westernPawn,easternPawn,northernPawn,southernPawn]);
        let actual :  boolean = isHorizontalMovePossible(board,{rank:4,file:0},{rank:7,file:5});
        Expect(actual).toBe(false);
    }

    /**
     * Given a game board, a departure and an arrival positions
     * When the arrival position is vertically adjacent to the departure
     * Then the function isVerticalMovePossible() should return true
     */
    @Test()
    testIsVerticalMovePossible() {
        // #TODO: Implement this function
       board=createInitialGameBoard([westernPawn,easternPawn,northernPawn,southernPawn]);
        let actual :  boolean = isVerticalMovePossible(board,{rank:2,file:5},{rank:1,file:5});
        Expect(actual).toBe(true);


    }

    /**
    * Given a game board, a departure and an arrival positions
    * When the arrival position is not adjacent to the departure
    * Then the function isVerticalMovePossible() should return false
    */
    @Test()
    testIsVerticalMoveImpossible() {
        // #TODO: Implement this function
        board=createInitialGameBoard([westernPawn,easternPawn,northernPawn,southernPawn]);
        let actual :  boolean = isHorizontalMovePossible(board,{rank:2,file:5},{rank:2,file:3});
        Expect(actual).toBe(false);
    }

    /**
     * Given a board and a pawn in a given position
     * When the position is not in the border
     * Then the function getNextPossiblePositions() should return 4 positions, all adjacent to position
     */
    @Test()
    testGetNextPossiblePositions() {
        // #TODO: Implement this function
        //create a pawn and put it on the nmpty board
        let pawnUsed :Pawn;
        let pawnCurrentPosition:Position={rank:4,file:4};
        let arrayOfPOsitions=[pawnCurrentPosition];
        pawnUsed={name:"Bob",currentPosition:pawnCurrentPosition,validFinalPositions:arrayOfPOsitions};
        putPawnOnBoard(board,pawnUsed);

        let downPosition=bottom(pawnCurrentPosition);
        let rightPosition=right(pawnCurrentPosition);
        let topPosition=top(pawnCurrentPosition);
        let leftPosition=left(pawnCurrentPosition);

        let actual=getNextPossiblePositions(board,pawnUsed);
        let possiblePositions=[topPosition,downPosition,leftPosition,rightPosition];
        Expect(actual).toEqual(possiblePositions);
       

    }

    /**
     * Given a board and a pawn in a given position
     * When the position is one of the four corners
     * Then the function getNextPossiblePositions() should return 2 positions, all adjacent to position
     */
    @Test()
    testGetNextPossiblePositionsInCorner() {
        // #TODO: Implement this function
        let pawnUsed :Pawn;
        let pawnCurrentPosition:Position={rank:0,file:0};
        let arrayOfPOsitions=[pawnCurrentPosition];
        pawnUsed={name:"Bob",currentPosition:pawnCurrentPosition,validFinalPositions:arrayOfPOsitions};
        putPawnOnBoard(board,pawnUsed);

        let downPosition=bottom(pawnCurrentPosition);
        let rightPosition=right(pawnCurrentPosition);
        let possiblePositions=[downPosition,rightPosition];
        let actual=getNextPossiblePositions(board,pawnUsed);
        Expect(actual).toEqual(possiblePositions);  
    }

    /**
     * Given a board and a pawn in a given position
     * When the position is in the border but not in the corner
     * Then the function getNextPossiblePositions() should return 3 positions, all adjacent to position
     */
    @Test()
    testGetNextPossiblePositionsInBorder() {
        // #TODO: Implement this function
        board=createInitialGameBoard([westernPawn,easternPawn,northernPawn,southernPawn]);
        let actual =getNextPossiblePositions(board,westernPawn);
        let possiblePositions:Position[]=[top(westernPawn.currentPosition),bottom(westernPawn.currentPosition),right(westernPawn.currentPosition)];
        Expect(actual).toEqual(possiblePositions);
    }

    /**
     * Given a board, a pawn and a destination position
     * When the pawn's position is valid and adjacent to the destination
     * Then the function isPawnMovementPossible() should return true
     */
    @Test()
    testIsPawnMovementPossible() {
       // #TODO: Implement this function
        /*let pawnUsed:pawns.Pawn;
        pawnUsed.currentPosition={rank:5,file:2};
        pawnUsed.name="Bob";

        pawnUsed.validFinalPositions=Array.from({ length: 9 }, (_, i) => position(8, i));
        putPawnOnBoard(board,pawnUsed);
        let actual=isPawnMovementPossible(board,pawnUsed,{rank:5,file:3});
        Expect(actual).toBe(true);*/

        let departurePosition:Position={rank:3,file:2};
        let direction:Position={rank:3,file:3};
        let arrayFinalPosition:Position[]=[departurePosition];
        let usedPawn:Pawn={name:"paul",currentPosition:departurePosition,validFinalPositions:arrayFinalPosition};
        putPawnOnBoard(board,usedPawn);
        let isPossibleMove= isPawnMovementPossible(board,usedPawn,direction);
        Expect(isPossibleMove).toBe(true);

    }

    /**
     * Given a board, a pawn and a destination position
     * When the pawn's position is not adjacent to the destination
     * Then the function isPawnMovementPossible() should return false
     */
    @Test()
    testIsPawnMovementImpossible() {
        // #TODO: Implement this function
        let departurePosition:Position={rank:3,file:2};
        let direction:Position={rank:3,file:4};
        let arrayFinalPosition:Position[]=[departurePosition];
        let usedPawn:Pawn={name:"paul",currentPosition:departurePosition,validFinalPositions:arrayFinalPosition};
        putPawnOnBoard(board,usedPawn);
        let isPossibleMove= isPawnMovementPossible(board,usedPawn,direction);
        Expect(isPossibleMove).toBe(false);

    }

    /**
     * Given a board, a pawn and a destination position
     * When the the destination is invalid
     * Then the function isPawnMovementPossible() should return false
     */
    @Test()
    testIsPawnMovementInvalid() {
        // #TODO: Implement this function
        /* the first paw enter on board */
        let departurePosition:Position={rank:3,file:2};
        let direction:Position={rank:3,file:4};
        let arrayFinalPosition:Position[]=[departurePosition];
        let usedPawn:Pawn={name:"paul",currentPosition:departurePosition,validFinalPositions:arrayFinalPosition};
        putPawnOnBoard(board,usedPawn);
        /* the first paw enter on board */
        let otherDeparture:Position={rank:3,file:4};
        let otherDirection:Position={rank:3,file:4};
        let otherArrayFinalPosition:Position[]=[departurePosition];
        let otherPawn:Pawn={name:"luka",currentPosition:otherDeparture,validFinalPositions:otherArrayFinalPosition};
        putPawnOnBoard(board,otherPawn);
        
        let isPossibleMove= isPawnMovementPossible(board,usedPawn,direction);
        Expect(isPossibleMove).toBe(false);
    }

}
