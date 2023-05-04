// function assemble(file) {
//
//     // TODO() add parsing of assembler
//     return [];
// }

import {Sense} from "./Instructions/Sense.js";
import {Turn} from "./Instructions/Turn.js";
import {Move} from "./Instructions/Move.js";
import {Mark} from "./Instructions/Mark.js";
import {Unmark} from "./Instructions/Unmark.js";
import {Flip} from "./Instructions/Flip.js";
import {PickUp} from "./Instructions/PickUp.js";
import {get_direction_from_string} from "../utils/Directions.js";
import {Drop} from "./Instructions/Drop.js";
import {bug_condition_from_string} from "../utils/BugCondition.js";
import {Direction} from "./Instructions/Direction.js";
import {get_cell_direction_from_string} from "../utils/CellDirection.js";

// takes a line of Bug Assembly code and returns the corresponding instruction object
export function make_instruction_from_string(s) {
    s = s.split(';', 1)[0].trim(); // remove everything after comment starts
    s = s.split(/\s+/); // split by whitespace, ignoring empty substrings between consequent whitespaces
    let params = s.slice(1);
    switch (s[0]) {
        case "sense":
            return new Sense(get_cell_direction_from_string(params[0]), Number(params[1]), Number(params[2]), bug_condition_from_string(params[3], params[4]));
        case "turn":
            return new Turn(get_direction_from_string(params[0]), Number(params[1]));
        case "move":
            return new Move(Number(params[0]), Number(params[1]));
        case "mark":
            return new Mark(Number(params[0]), Number(params[1]));
        case "unmark":
            return new Unmark(Number(params[0]), Number(params[1]));
        case "flip":
            return new Flip(Number(params[0]), Number(params[1]), Number(params[2]));
        case "pickup":
            return new PickUp(Number(params[0]), Number(params[1]));
        case "direction":
            return new Direction(Number(params[0]), Number(params[1]), Number(params[2]));
        case "drop":
            return new Drop(Number(s[1]));
        // case "label":
        //     return new Label(s[1]);
        default:
            throw new Error("Provided instruction was not in the right format.");
    }
}

// takes a file content (a multiline string) and parses it into an array of instructions
// performs validity checks for all jump instructions
export function parse_text(text) {
    // parse assembly code
    let lines = text.trim().split(/\n/);
    let bytecode = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/\S/)) {
            bytecode.push(make_instruction_from_string(lines[i]));
        }
    }
    // validate the bug code
    if (bytecode.length == 0) {
        throw new Error("lack of commands");
    }
    // validate jump addresses
    for (let i = 0; i < bytecode.length; i++) {
        if (!bytecode[i].check_jumps(bytecode.length - 1)) {
            throw new Error("Jump outside of the program on line " + i);
        }
    }
    return bytecode;
}

// takes a file (uploaded into an input HTML element), reads its content and passes it to the parser
export async function read_code(file) {
    let result = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsText(file);
    });

    return parse_text(result);
}
