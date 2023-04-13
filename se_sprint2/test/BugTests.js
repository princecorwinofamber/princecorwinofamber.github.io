import {expect} from "chai";
import Bug from "../src/logic/Entities/Bug.js";
import {Color} from "../src/logic/GeneralClasses/General.js"
import Position from "../src/logic/GeneralClasses/Position.js";
import Cell from "../src/logic/Entities/Cell.js";
import World from "../src/logic/World.js";


describe("Bug", () => {
    describe('#constructor', () => {
        it('should create a new Bug instance with valid parameters', () => {
            const color = new Color(255, 0, 0);
            const xPos = 10;
            const yPos = 20;
            const world = {};
            const instructions = [];
            const bug = new Bug(color, xPos, yPos, world, instructions);

            expect(bug).to.be.an.instanceof(Bug);
            expect(bug.color).to.deep.equal(color);
            expect(bug.position).to.deep.equal(new Position(xPos, yPos));
            expect(bug.resting).to.equal(14);
            expect(bug.direction).to.equal(0);
            expect(bug.hasFood).to.be.false;
            expect(bug.instructionPos).to.equal(0);
        });

        it('should throw an error if an invalid color is passed', () => {
            const invalidColor = 'not a color';
            const xPos = 10;
            const yPos = 20;
            const world = {};
            const instructions = [];

            expect(() => new Bug(invalidColor, xPos, yPos, world, instructions)).to.throw('Bug constructor failed: an element of the wrong type was passed in the color field');
        });

        it('should throw an error if xPos is not an integer', () => {
            const color = new Color(255, 0, 0);
            const invalidXPos = 'not an integer';
            const yPos = 20;
            const world = {};
            const instructions = [];

            expect(() => new Bug(color, invalidXPos, yPos, world, instructions)).to.throw('Bug constructor failed: xPos should be int');
        });

        it('should throw an error if yPos is not an integer', () => {
            const color = new Color(255, 0, 0);
            const xPos = 10;
            const invalidYPos = 'not an integer';
            const world = {};
            const instructions = [];

            expect(() => new Bug(color, xPos, invalidYPos, world, instructions)).to.throw('Bug constructor failed: yPos should be int');
        });
    });

    describe('#getPosition', () => {
        it('should return the Bug\'s position', () => {
            const color = new Color(255, 0, 0);
            const xPos = 10;
            const yPos = 20;
            const world = {};
            const instructions = [];
            const bug = new Bug(color, xPos, yPos, world, instructions);

            expect(bug.getPosition()).to.deep.equal(new Position(xPos, yPos));
        });
    });

    describe('#setPosition', () => {
        it('should set the Bug\'s position to a new Position object', () => {
            const color = new Color(255, 0, 0);
            const xPos = 10;
            const yPos = 20;
            const world = {};
            const instructions = [];
            const bug = new Bug(color, xPos, yPos, world, instructions);
            const newPosition = new Position(5, 15);

            bug.setPosition(newPosition);

            expect(bug.getPosition()).to.deep.equal(newPosition);
        });
    });


    describe('#dead', () => {
        it('should die', () => {
            const cell = new Cell(false);
            const world = new World(1, 1, [[cell]]);
            const bug = new Bug(Color.Red, 0, 0, world, []);

            expect(bug.alive).true;
            cell.setBug(bug);
            expect(cell.bug).is.not.null;
            expect(world.redBugsKilled).equal(0);

            bug.dead();
            expect(bug.alive).false;
            expect(cell.bug).is.null;
            expect(cell.food).equal(0);
            expect(world.redBugsKilled).equal(1);

            expect(() => {
                bug.dead()
            }).not.to.throw();
            expect(bug.alive).false;
            expect(world.redBugsKilled).equal(1);
        });

        it('should die and drop food', () => {
            const initFood = 10;
            const cell = new Cell(false, initFood);
            const world = new World(1, 1, [[cell]]);
            const bug = new Bug(Color.Red, 0, 0, world, []);
            bug.hasFood = true;
            cell.setBug(bug);
            expect(cell.food).equal(initFood);
            bug.dead();
            expect(cell.food).equal(initFood + 1);
            bug.dead();
            expect(cell.food).equal(initFood + 1);
        })
    });

    describe('#kill', () => {
        it('no kill', () => {
            const world = new World(2, 1, [[new Cell(false), new Cell(false)]]);
            const killer = new Bug(Color.Red, 0, 0, world, []);

            killer.direction = 0;
            expect(() => killer.kill()).not.to.throw();
        });

        it('simple kill', () => {
            const world = new World(2, 1, [[new Cell(false), new Cell(false)]]);
            const killer = new Bug(Color.Red, 0, 0, world, []);
            const target = new Bug(Color.Black, 1, 0, world, []);
            world.cellAt(new Position(0, 0)).bug = killer;
            world.cellAt(new Position(1, 0)).bug = target;

            killer.direction = 0;
            expect(target.alive).true;
            killer.kill();
            expect(target.alive).false;
        });
    });
});
