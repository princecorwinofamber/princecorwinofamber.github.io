import {Just, Nothing} from "./Maybe.js";
import {Condition} from "./Condition.js";

export class BugCondition {
    name;
    maybe_marker_index = new Nothing();
    constructor(name, marker_index = -1) {
        this.name = name;
        if (marker_index !== -1) {
            this.maybe_marker_index = new Just(marker_index);
        }
    }

    get_condition_type() {
        return this.name;
    }

    get_marker_index() {
        return this.maybe_marker_index.get_value();
    }
}

export function bug_condition_from_string(string, optional_operand) {
    const marker_cond = string.split(' ', 2);
    switch (marker_cond[0].toLowerCase()) {
        case "marker":
            let marker_num = Number(optional_operand);
            if (Number.isInteger(marker_num) && marker_num >= 1 && marker_num <= 6) {
                return new BugCondition(Condition.MARKER, marker_num);
            } else {
                throw new Error("Incorrect marker number: " + marker_num.toString());
            }
        case "friend":
            return new BugCondition(Condition.FRIEND);
        case "foe":
            return new BugCondition(Condition.FOE);
        case "friendwithfood":
            return new BugCondition(Condition.FRIEND_WITH_FOOD);
        case "foewithfood":
            return new BugCondition(Condition.FOE_WITH_FOOD);
        case "food":
            return new BugCondition(Condition.FOOD);
        case "fock":
            return new BugCondition(Condition.ROCK);
        case "marker":
            return new BugCondition(Condition.MARKER, parseInt(marker_cond[1]));
        case "foemarker":
            return new BugCondition(Condition.FOE_MARKER);
        case "home":
            return new BugCondition(Condition.HOME);
        case "foehome":
            return new BugCondition(Condition.FOE_HOME);
        default:
            throw new Error("Bad bug condition provided!");
    }
}
