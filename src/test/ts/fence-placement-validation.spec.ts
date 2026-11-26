import { Expect, Test, Setup } from 'alsatian';
import { GameBoard, createEmptyGameBoard, createInitialGameBoard } from '../../main/ts/game-board';
import { isFencePlacementPossible } from '../../main/ts/fence-placement-validation';
import { Position } from '../../main/ts/position';
import { placeFenceAtPositions } from '../../main/ts/fence-placement';
import { areFencesOverlapping } from '../../main/ts/fence';

let board : GameBoard;

export class TestFacePlacementValidation {

    @Setup
    beforeEach(){
        board = createEmptyGameBoard();
    }

    /**
     * Given an empty fence position,
     * When someone tries to place a fence in this position,
     * Then the function isFencePlacementPossible() should return true
     */
    @Test()
    testIsFencePlacementPossibleWhenPositionIsEmpty() {
        // #TODO: Implement this function  ;
        let start : Position = {rank:1, file:2}; 
        let end: Position = {rank:1, file:3};
        let actual=isFencePlacementPossible(board,start,end);
        Expect(actual).toBe(true);
    }

    /**
     * Given a full fence position,
     * When someone tries to place a fence in this position,
     * Then the function isFencePlacementPossible() should return false
     */
   @Test()
    testIsFencePlacementImpossibleWhenPositionIsFull() {
        // #TODO: Implement this function
        // Place a fence on the board at the given position
        let start: Position = { rank: 1, file: 2 };
        let end: Position = { rank: 1, file: 3 };
        placeFenceAtPositions(board,start, end);
        

        // Try to place another fence at the same position
        let newStart: Position = { rank: 1, file: 2 };
        let newEnd: Position = { rank: 1, file: 3 };
        let actual = isFencePlacementPossible(board, newStart, newEnd);
        Expect(actual).toBe(false);
        
    }
    
}