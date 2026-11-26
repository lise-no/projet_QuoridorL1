import { Expect, Test, Setup } from 'alsatian';
import { Position, position, equals, top, bottom, left, right } from "../../main/ts/position"

let positionC5: Position; // case : c5 
let otherPosition: Position;

export class PositionTest {
    @Setup
    beforeEach(){
        positionC5 = position(2, 4); 
    }

    @Test('Up')
    testGetUpperPosition(){
        otherPosition = {rank: 1, file: 4} ; 
        Expect(equals(top(positionC5), otherPosition)).toBeTruthy();
    }

    @Test('Down')
    testGetBelowPosition(){
        otherPosition = {rank: 3, file: 4} ; 
        Expect(equals(bottom(positionC5), otherPosition)).toBeTruthy();
    }

    @Test('Left')
    testGetLeftPosition(){
        otherPosition = {rank: 2, file: 3} ; 
        Expect(equals(left(positionC5), otherPosition)).toBeTruthy();
    }

    @Test('Right')
    testGetRightPosition(){
        otherPosition = {rank: 2, file: 5} ; 
        Expect(equals(right(positionC5), otherPosition)).toBeTruthy();
    }
}


