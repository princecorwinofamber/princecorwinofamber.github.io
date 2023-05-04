import {Instructions} from "../Instructions.js";

export class Direction extends Instructions {
    constructor(direction, positive, negative) {
        if (!Number.isInteger(positive) || !Number.isInteger(negative)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.direction = direction;
        this.positive = positive;
        this.negative = negative;
    }

    perform(world, bug) {
        let current_direction = bug.get_direction();
        if (current_direction === this.direction) {
            return this.positive;
        }
        return this.negative;
    }

    check_jumps(last_address) {
        return this.positive >= 0 && this.positive <= last_address && this.negative >= 0 && this.negative <= last_address;
    }
}
