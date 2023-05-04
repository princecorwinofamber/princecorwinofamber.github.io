import {Instructions} from "../Instructions.js";

export class PickUp extends Instructions {
    constructor(positive, negative) {
        if (!Number.isInteger(positive) || !Number.isInteger(negative)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.positive = positive;
        this.negative = negative;
    }

    perform(world, bug) {
        if ((world.get_food_at(bug.get_position()) >= 0) && !bug.get_has_food()) {
            bug.set_has_food(true);
            world.cell_at(bug.get_position()).decrement_food();
            return this.positive;
        }
        return this.negative;
    }

    check_jumps(last_address) {
        return this.positive >= 0 && this.positive <= last_address && this.negative >= 0 && this.negative <= last_address;
    }
}
