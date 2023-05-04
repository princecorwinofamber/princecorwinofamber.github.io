// Import required modules
import { updateMapView } from "./draw_world.js";
import {World, parse_world, read_world} from "./backend/GameLogic/World.js";
import Simulator, {world_map} from "./Simulator.js";
import {ctx, bugBlack, bugRed} from "./board.js";

// default map
const defaultMap = 
"10\n" +
"10\n" +
"# # # # # # # # # #\n" +
"# 9 9 . . . . 3 3 #\n" +
"# 9 # . - - - . - #\n" +
"# . # - - - - - - #\n" +
"# . . 5 - - - - - #\n" +
"# + + + + + 5 . . #\n" +
"# + + + + + + # . #\n" +
"# + + + + + . # 9 #\n" +
"# 3 3 . . . . 9 9 #\n" +
"# # # # # # # # # #";

// Define Initializer class
export default class Initializer {
    iter_cnt;
    max_iter;

    constructor(world, bug_code_1, bug_code_2, max_iter, is_logging_enabled) {
        // Load map and create world object
        this.world = parse_world(window.parent.selected_options.map_of_world || defaultMap);
        // Set the last simulation cycle time
        this.last = Date.now();
        // Create simulator object
        this.simulator = new Simulator(world, bug_code_1, bug_code_2, is_logging_enabled);
        // Set font and color for context
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        // Load black bug images
        for (let i = 0; i < 6; i++) {
            bugBlack[i] = new Image();
            bugBlack[i].src = "img/bugBlack" + (i + 1) % 6 + ".png";
        }
        // Load red bug images
        for (let i = 0; i < 6; i++) {
            bugRed[i] = new Image();
            bugRed[i].src = "img/bugRed" + (i + 1) % 6 + ".png";
        }
        this.iter_cnt = 0;
        this.max_iter = max_iter || 500;
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // Define draw method to simulate and draw world
    draw() {
        // Wait time till the next cycle
        this.sleep(500).then( () => {
                if (this.iter_cnt > this.max_iter) {
                    return;
                }
                this.iter_cnt++;
                // Simulate one cycle
                this.simulator.simulateOneCycle();
                // updateMapView(this.world);
                // Update last cycle time
                this.last = Date.now();
            // Request next animation frame for drawing
            requestAnimationFrame(() => this.draw());
        });
    }

}




