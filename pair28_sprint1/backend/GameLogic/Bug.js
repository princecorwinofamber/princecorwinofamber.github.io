import {Position} from "../utils/Position.js";
import { Colors } from "../utils/Color.js";

var Color = Colors;

export class Bug {
    id;
    color;
    state;
    resting;
    current_resting = 0;
    direction;
    position;
    has_food;
    brain;
    current_instruction_index = 0;
    constructor(id, color, state, resting, direction, position, has_food, brain) {
        this.id = id;
        this.color = color;
        this.state = state;
        this.resting = resting;
        this.direction = direction;
        this.position = position;
        this.has_food = has_food;
        this.brain = brain;
    }

    getPosition() {
        return this.position;
    }

    toString() {
        return `{${(this.id)}}`;
    }

    kill() {
        this.set_position(new Position(-1, -1));
    }

    get_position() {
        return this.position;
    }

    get_direction() {
        return this.direction;
    }

    set_direction(value) {
        this.direction = value;
    }

    get_color() {
        return this.color;
    }

    set_position(newPosition) {
        this.position = newPosition;
    }

    get_has_food() {
        return this.has_food;
    }

    set_has_food(value) {
        this.has_food = value;
    }

    perform_current_instruction_if_possible(world) {
        if (this.current_resting > 0) {
            this.current_resting -= 1;
            return;
        }
        this.current_instruction_index = this.brain.get_instruction_by_index(this.current_instruction_index).perform(world, this);
        this.current_resting = this.resting;
    }

    drawBug(ctx, bugBlack, bugRed) {
        if (this.color == Color.BLACK) {
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
}