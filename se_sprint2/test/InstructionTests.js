import { expect } from "chai";
import World from "../src/logic/World.js";
import Bug from "../src/logic/Entities/Bug.js";
import {Color} from "../src/logic/GeneralClasses/General.js";
import Instruction from "../src/logic/Asembler/Instruction.js";
import Position from "../src/logic/GeneralClasses/Position.js";
import Cell from "../src/logic/Entities/Cell.js";



describe('Instruction', () => {
    let world;

    beforeEach(() => {
        const cells = [[new Cell(false, 0, true, Color.Red),
            new Cell(false, 0, true, Color.Red)],
            [new Cell(false, 0, true, Color.Red),
                new Cell(false, 0, true, Color.Red)]];
        world = new World(2, 2, cells);
    });

    describe('sense', () => {
        it('should return state1 if adjacent cell matches condition', () => {
            // create a new bug and position it at (0,0)
            const bug = new Bug(Color.Red, 0, 0, world, null);
            // add food to the cell to the right of the bug
            world.setFoodAt(new Position(1, 0), 1);
            // create a new instance of the Instruction class
            const instruction = new Instruction('sense ahead 1 2 food', world, 1);
            // expect the instruction to return state1
            expect(instruction.proceed(bug)).to.equal(1);
        });

        it('should return state2 if adjacent cell does not match condition', () => {
            // create a new bug and position it at (0,0)
            const bug = new Bug(Color.Red, 0, 0, world, null);
            // create a new instance of the Instruction class
            const instruction = new Instruction('sense ahead 1 2 friend', world, 1);
            // expect the instruction to return state2
            expect(instruction.proceed(bug)).to.equal(2);
        });

        it('should throw an error if direction is invalid', () => {
            // create a new bug and position it at (0,0)
            const bug = new Bug(Color.Red, 0, 0, world, null);
            // create a new instance of the Instruction class with an invalid direction
            const instruction = new Instruction('sense invalid 1 2 friend', world, 1);
            // expect the instruction to throw an error
            expect(() => instruction.proceed(bug)).to.throw('Sense: wrong CellDirection');
        });
    });

    describe('pickup', () => {
        it('should add food to bug inventory if present on current cell', () => {
            // create a new bug and position it at (0,0)
            const bug = new Bug(Color.Red, 0, 0, world, null);
            // add food to the cell where the bug is
            world.setFoodAt(new Position(0, 0), 1);
            // create a new instance of the Instruction class
            const instruction = new Instruction('pickup 8 0', world, 1);
            // expect the bug inventory to have 1 food after proceeding with the instruction
            instruction.proceed(bug);
            expect(bug.hasFood).to.equal(true);
        });

        it('should not add food to bug inventory if not present on current cell', () => {
            // create a new bug and position it at (0,0)
            const bug = new Bug(Color.Red, 0, 0, world, null);
            // create a new instance of the Instruction class
            const instruction = new Instruction('pickup 8 0', world, 1);
            // expect the bug inventory to be empty after proceeding with the instruction
            instruction.proceed(bug);
            expect(bug.hasFood).to.equal(false);
        });
    });

    describe('drop', () => {
        it('should remove food from bug inventory and add to current cell', () => {
            // create a new bug and position it at (0,0)
            const bug = new Bug(Color.Red, 0, 0, world, null);
            bug.hasFood = true;
            // add 1 food to the bug inventory
            expect(bug.hasFood).to.equal(true);
            // create a new instance of the Instruction class
            const instruction = new Instruction('drop 0', world, 1);
            // expect the bug inventory to be empty and the current cell to have 1 food after proceeding with the instruction
            instruction.proceed(bug);
            expect(bug.hasFood).to.equal(false);
            expect(world.cellAt(new Position(0, 0)).food).to.equal(1);
        });

    });

});