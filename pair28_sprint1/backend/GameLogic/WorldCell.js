import {has_value, Just, Nothing} from "../utils/Maybe.js";
import {MarkersSet} from "../utils/MarkersSet.js";
import {Colors, Colors as Color, opposite_color} from "../utils/Color.js";
import {Condition} from "../utils/Condition.js";

export class WorldCell {
    obstructed = false;
    maybe_bug = new Nothing();
    food = 0;
    markers = {
        red: new MarkersSet(),
        black: new MarkersSet()
    };
    maybe_base = new Nothing();

    constructor(char) {
        switch (char) {
            case '.':
                return;
            case '#':
                this.obstructed = true;
                return;
            case '-':
                this.maybe_base = new Just(Colors.BLACK);
                return;
            case '+':
                this.maybe_base = new Just(Colors.RED);
                return;
            default:
                if (char > '0' && char <= '9') {
                    this.food = Number(char);
                } else {
                    throw new Error("Illegal char");
                }
        }
    }

    is_obstructed() {
        return this.obstructed;
    }

    is_occupied() {
        return has_value(this.maybe_bug);
    }

    set_bug(bug) {
        this.maybe_bug = new Just(bug);
        return true;
    }

    get_bug() {
        return this.maybe_bug;
    }

    remove_bug() {
        this.maybe_bug = new Nothing();
        return true;
    }

    increment_food() {
        this.food += 1;
    }

    decrement_food() {
        this.food -= 1;
    }

    set_food(food_amount) {
        this.food = food_amount;
    }

    get_food() {
        return this.food;
    }

    is_friendly_base(color) {
        if (has_value(this.maybe_base)) {
            return (color === this.maybe_base.get_value());
        }
        return false;
    }

    is_enemy_base(color) {
        if (has_value(this.maybe_base)) {
            return (color !== this.maybe_base.get_value());
        }
        return false;
    }

    #get_markers_set(color) {
        if (color === Color.RED) {
            return this.markers.red;
        } else if (color === Color.BLACK) {
            return this.markers.black;
        }
    }

    set_marker(color, marker_type) {
        this.#get_markers_set(color).set_marker(marker_type);
    }

    clear_marker(color, marker_type) {
        this.#get_markers_set(color).clear_marker(marker_type);
    }

    is_friendly_marker(color, marker_type) {
        return this.#get_markers_set(color).has(marker_type);
    }

    is_enemy_marker(color, marker_type) {
        return this.#get_markers_set(opposite_color(color)).has(marker_type);
    }

    cell_matches(bug_condition, color) {
        switch (bug_condition.get_condition_type()) {
            case Condition.FRIEND:
                return has_value(this.maybe_bug) && (this.maybe_bug.get_value().color === color);
            case Condition.FOE:
                return has_value(this.maybe_bug) && (this.maybe_bug.get_value().color !== color);
            case Condition.FRIEND_WITH_FOOD:
                return has_value(this.maybe_bug) && (this.maybe_bug.get_value().color === color) && (this.maybe_bug.get_value().hasFood);
            case Condition.FOE_WITH_FOOD:
                return has_value(this.maybe_bug) && (this.maybe_bug.get_value().color !== color) && (this.maybe_bug.get_value().hasFood);
            case Condition.FOOD:
                return this.food !== 0;
            case Condition.ROCK:
                return this.is_obstructed();
            case Condition.MARKER:
                return this.is_friendly_marker(color, bug_condition.get_marker_index());
            case Condition.FOE_MARKER:
                return this.#get_markers_set(opposite_color(color)).any();
            case Condition.HOME:
                return has_value(this.maybe_base) && (this.maybe_base.get_value().color === color);
            case Condition.FOE_HOME:
                return has_value(this.maybe_base) && (this.maybe_base.get_value().color !== color);
            default:
                return false;
        }
    }

    toString() {
        return `{
        Obstructed - ${(this.obstructed)}, 
        // Bug - ${(this.maybe_bug)},
        Food - ${(this.food)},
        Markers - ${(this.markers)},
        Base - ${(this.maybe_base)}
        }`;
    }
}

export function compare_world_cells(fst, snd) {
    return fst.toString() === snd.toString();
}
