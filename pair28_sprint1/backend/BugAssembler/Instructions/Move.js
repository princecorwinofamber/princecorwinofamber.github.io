import {Instructions} from "../Instructions.js";

export class Move extends Instructions {
    constructor(positive, negative) {
        if (!Number.isInteger(positive) || !Number.isInteger(negative)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.positive = positive;
        this.negative = negative;
    }

    perform(world, bug) {
        let current_position = bug.get_position();
        let current_direction = bug.get_direction();
        let next_position = world.adjacent(current_position, current_direction);
        if (world.validate_position(next_position)) {
            if (world.cell_at(next_position).is_obstructed()) {
                return this.negative;
            } else {
                bug.set_position(next_position);
                return this.positive;
            }
        }
        return this.negative;
    }

    check_jumps(last_address) {
        return this.positive >= 0 && this.positive <= last_address && this.negative >= 0 && this.negative <= last_address;
    }
}
