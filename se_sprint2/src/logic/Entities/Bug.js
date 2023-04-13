import {assert} from '../../utils/Assertions.js';
import {Color} from '../GeneralClasses/General.js';
import Position from '../GeneralClasses/Position.js';
import {bugBlack, ctx, bugRed} from "../Script_start.js";
import StateMachine from "../Asembler/StateMachine.js";

const DEFAULT_RESTING = 14;
export default class Bug {
    static curId = 0;

    constructor(color, xPos, yPos, world, instructions) {
        assert(color instanceof Color, "Bug constructor failed: an element of the wrong type was passed in the color field");
        assert(xPos == null || Number.isInteger(xPos), "Bug constructor failed: xPos should be int");
        assert(yPos == null || Number.isInteger(yPos), "Bug constructor failed: yPos should be int");
        this.world = world
        this.bugId = Bug.curId++;
        this.color = color;
        this.position = new Position(xPos, yPos)
        this.resting = DEFAULT_RESTING;
        this.direction = 0;
        this.hasFood = false;
        this.instructionPos = 0;
        this.stateMachine = new StateMachine(instructions, this);
        this.alive = true;
    }

    drawBug() {
        if (this.color == Color.Black) {
            if (this.position.y % 2 === 0) {
                ctx.drawImage(bugBlack[this.direction], this.position.x * 50 + 16 - (bugBlack[this.direction].width - 32) / 2,
                    this.position.y * 44 + 16 - (bugBlack[this.direction].height - 32) / 2, bugBlack[this.direction].width,
                    bugBlack[this.direction].height);
            } else {
                ctx.drawImage(bugBlack[this.direction], this.position.x * 50 + 41 - (bugBlack[this.direction].width - 32) / 2,
                    this.position.y * 44 + 16 - (bugBlack[this.direction].height - 32) / 2, bugBlack[this.direction].width,
                    bugBlack[this.direction].height);
            }
        } else {
            if (this.position.y % 2 === 0) {
                ctx.drawImage(bugRed[this.direction], this.position.x * 50 + 16 - (bugRed[this.direction].width - 32) / 2,
                    this.position.y * 44 + 16 - (bugRed[this.direction].height - 32) / 2, bugRed[this.direction].width,
                    bugRed[this.direction].height);
            } else {
                ctx.drawImage(bugRed[this.direction], this.position.x * 50 + 41 - (bugRed[this.direction].width - 32) / 2,
                    this.position.y * 44 + 16 - (bugRed[this.direction].height - 32) / 2, bugRed[this.direction].width,
                    bugRed[this.direction].height);
            }
        }
    }

    update() {
        if (!this.alive) {
            // don't update if dead
            return;
        }
        this.stateMachine.proceedInstruction();
        this.drawBug()
    }


    /**
     * Kills an enemy bug if it is in the sensed cell
     */
    kill() {
        const cell = this.world.adjacent(this.position, this.direction);
        const bug = cell.bug;
        // if is an enemy bug
        if (bug != null && bug.color !== this.color) {
            // mark as dead
            bug.dead();
        }
    }

    /**
     * Marks the current bug as dead
     *
     * Upon the death the killed bug drops the food (if carried any) onto the cell he was killed on.
     */
    dead() {
        if (!this.alive) {
            return;
        }

        console.log(`Bug #${this.bugId} is dead!`)
        this.alive = false;

        if (!this.world) {
            return;
        }

        // remove bug from the cell
        this.world.removeBugAt(this.position);

        // drop food if carried
        if (this.hasFood) {
            this.world.cellAt(this.position).food++;
        }

        // increment the corresponding statistics counter
        if (this.color === Color.Red) {
            this.world.redBugsKilled++;
        } else {
            this.world.blackBugsKilled++;
        }
    }

    getPosition() {
        return this.position;
    }

    setPosition(pos) {
        this.position = pos
    }

    getColor() {
        return this.color;
    }

    turnLeft() {
        this.direction = (this.direction + 5) % 6;
    }

    turnRight() {
        this.direction = (this.direction + 1) % 6;
    }
}
