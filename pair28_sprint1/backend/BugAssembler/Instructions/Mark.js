import {Instructions} from "../Instructions.js";

export class Mark extends Instructions {
    constructor(marker_type, next) {
        if (!Number.isInteger(next)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.marker_type = marker_type;
        this.next = next;
    }

    perform(world, bug) {
        let current_bug_position = bug.get_position();
        world.set_marker_at(current_bug_position, bug.get_color(), this.marker_type);
        return this.next;
    }

    check_jumps(last_address) {
        return this.next >= 0 && this.next <= last_address;
    }
}
