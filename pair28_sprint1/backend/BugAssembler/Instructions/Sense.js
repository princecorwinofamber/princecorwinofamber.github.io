import {Instructions} from "../Instructions.js";
import {CellDirection} from "../../utils/CellDirection.js";

export class Sense extends Instructions {
    constructor(cellDirection, positive, negative, bugCondition) {
        if (!Number.isInteger(positive) || !Number.isInteger(negative)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.cell_direction = cellDirection;
        this.bug_condition = bugCondition;
        this.positive = positive;
        this.negative = negative;
    }

    perform(world, bug) {
        let position_to_look = bug.get_position();
        switch(this.cell_direction) {
            case CellDirection.HERE:
                break;
            case CellDirection.AHEAD:
                position_to_look = world.adjacent(position_to_look, 0);
                break;
            case CellDirection.RIGHT_AHEAD:
                position_to_look = world.adjacent(position_to_look, 1);
                break;
            case CellDirection.LEFT_AHEAD:
                position_to_look = world.adjacent(position_to_look, -1);
                break;
        }
        if (world.cell_at(position_to_look).cell_matches(this.bug_condition, bug.get_color())) {
            return this.positive;
        } else {
            return this.negative;
        }
    }

    check_jumps(last_address) {
        return this.positive >= 0 && this.positive <= last_address && this.negative >= 0 && this.negative <= last_address;
    }
}
