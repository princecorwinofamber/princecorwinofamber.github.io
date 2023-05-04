import {Instructions} from "../Instructions.js";

function get_random_int(max) {
    const min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export class Flip extends Instructions {
    constructor(random_maximum, positive, negative) {
        if (!Number.isInteger(positive) || !Number.isInteger(negative)) {
            throw new Error("Provided address was not integer.");
        }
        super();
        this.random_maximum = random_maximum;
        this.positive = positive;
        this.negative = negative;
    }

    perform(world, bug) {
        if (get_random_int(this.random_maximum) === 0) {
            return this.positive;
        } else {
            return this.negative;
        }
    }

    check_jumps(last_address) {
        return this.positive >= 0 && this.positive <= last_address && this.negative >= 0 && this.negative <= last_address;
    }
}
