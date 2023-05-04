import {Instructions} from "../Instructions.js";
import {Directions} from "../../utils/Directions.js";

export class Turn extends Instructions {
    constructor(direction, next) {
        if (!Number.isInteger(next)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.direction = direction
        this.next = next;
    }

    perform(world, bug) {
        switch (this.direction) {
            case Directions.LEFT:
                bug.set_direction(world.turn(bug.get_direction(), -1));
                break;
            case Directions.RIGHT:
                bug.set_direction(world.turn(bug.get_direction(), 1));
                break;
        }
        return this.next;
    }

    check_jumps(last_address) {
        return this.next >= 0 && this.next <= last_address;
    }
}
