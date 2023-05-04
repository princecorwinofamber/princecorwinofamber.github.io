import {make_instruction_from_string} from "../BugAssembler/Parser.js";

export async function read_brain(file) {
    let result = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsText(file);
    });

    const lines = result.split("\n");

    const instructions = [];

    for (let i = 0; i < lines.length; i++) {
        instructions.push(make_instruction_from_string(lines[i]))
    }

    return instructions;
}

export class BugBrain {
    instructions;
    constructor(bytecode) {
        this.instructions = bytecode || [make_instruction_from_string("turn left 0")];
    }

    get_instruction_by_index(index) {
        return this.instructions[index];
    }
}