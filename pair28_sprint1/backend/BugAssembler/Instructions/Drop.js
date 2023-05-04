import {Instructions} from "../Instructions.js";

export class Drop extends Instructions {
    constructor(next) {
        if (!Number.isInteger(next)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.next = next;
    }

    perform(world, bug) {
        if (bug.get_has_food()) {
            bug.set_has_food(false);
            world.cell_at(bug.get_position()).increment_food();
        }
        return this.next;
    }

    check_jumps(last_address) {
        return this.next >= 0 && this.next <= last_address;
    }
}
