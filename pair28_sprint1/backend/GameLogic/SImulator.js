import {BugWorldConnectionsChecker} from "./ConnectionsChecker.js";
import {WorldCell} from "./WorldCell.js";
import {Position} from "../utils/Position.js";
import {has_value} from "../utils/Maybe.js";
import {Colors} from "../utils/Color.js";
import {World} from "./World.js";

export class Simulator {
    world;
    current_step;
    max_step;
    bug_code1;
    bug_code2;

    constructor(world, step_limit) {
        this.world = world;
        this.max_step = step_limit;
    }
}

