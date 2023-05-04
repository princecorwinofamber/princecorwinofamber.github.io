import { Bug } from "./backend/GameLogic/Bug.js";
import { BugBrain } from "./backend/GameLogic/BugBrain.js";
import { Colors } from "./backend/utils/Color.js";
import { Position } from "./backend/utils/Position.js";
import { makeRandomId } from "./functions.js"
import { ctx, cvs, bugBlack, bugRed } from "./board.js";
import { updateMapView } from "./draw_world.js";

var Color = Colors;

export var world_map = "../../maps/map0";
export var bug_brain_1 = "../../bugScripts/bugBrainStupid";
export var bug_brain_2 = "../../bugScripts/bugBrainStupid";
export var number_of_iter;
export var logging_bool;

// Define Simulator class
export default class Simulator {

    constructor(world, bytecode1, bytecode2, is_logging_enabled) {
        this.is_logging_enabled = is_logging_enabled;
        // Initialize empty bugs array and assign world object
        this.bugs = [];
        let num_of_bugs = 0;

        this.world = world;

        // Add bugs at swarms positions with SimpleAssembler instructions
        for (let i=0; i < world.height; i++){
            for (let j=0; j < world.width; j++) {
                // add red bug
                if (this.world.is_friendly_base_at(new Position(j, i), Color.RED)) {
                    this.bugs[num_of_bugs] = new Bug(makeRandomId(), Color.RED, 0, 0, 0, new Position(j, i), false, new BugBrain(bytecode1));
                    num_of_bugs++;
                }
                // add black bug
                if (this.world.is_friendly_base_at(new Position(j, i), Color.BLACK)) {
                    this.bugs[num_of_bugs] = new Bug(makeRandomId(), Color.BLACK, 0, 0, 0, new Position(j, i), false, new BugBrain(bytecode2));
                    num_of_bugs++;
                }
            }
        }
        // Assign bugs to their respective cells in the world
        for (let i = 0; i < this.bugs.length; i++) {
            this.world.cellAt(this.bugs[i].getPosition()).bug = this.bugs[i];
        }

    }

    // Define method to simulate one cycle of the world
    simulateOneCycle() {
        // Clear canvas context and update world view
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        updateMapView(this.world);
        // Update each bug in the world
        for (let i = 0; i < this.bugs.length; i++) {
            this.bugs[i].perform_current_instruction_if_possible(this.world);
            this.bugs[i].drawBug(ctx, bugBlack, bugRed);
        }

        // log snapshot
        /* this.logger.log(this.world);
        if (window.parent.selected_options.is_logging_enabled === 'on') {
            // display logs if user requested
            logArea.value = this.logger.getOutput();
        }
        // display statistics
        statsArea.innerHTML = this.logger.getStatisticsText().replaceAll('\n', '<br>'); */
    }
}
