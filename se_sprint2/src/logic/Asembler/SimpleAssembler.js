import {readTextFile} from "../GeneralClasses/General.js";
import Instruction from "./Instruction.js";

const defaultAssembler = 
"sense ahead 1 3 food ; [ 0]\n" +
"move 2 0        ; [ 1]\n" +
"pickup 8 0              ; [ 2]\n" +
"flip 3 4 5      ; [ 3]\n" +
"turn left 0 ; [ 4]\n" +
"flip 2 6 7 ; [ 5]\n" +
"turn right 0 ; [ 6]\n" +
"move 0 3 ; [ 7]\n" +
"sense ahead 9 11 home ; [ 8]\n" +
"move 10 8 ; [ 9]\n" +
"drop 0 ; [ 10]\n" +
"flip 3 12 13 ; [ 11]\n" +
"turn left 8 ; [ 12]\n" +
"flip 2 14 15 ; [ 13]\n" +
"turn right 8 ; [ 14]\n" +
"move 8 11 ; [ 15]";

export default class SimpleAssembler {
    constructor(assemblerCode, world) {
        this.instructions = []
        let text = assemblerCode || defaultAssembler;
        let sep = text.indexOf("\r") >= 0 ? "\r\n" : "\n";
        let linesOfCode = text.split(sep)
        for (let i = 0; i < linesOfCode.length; i++) {
            this.instructions[i] = new Instruction(linesOfCode[i], world, i)
        }
    }
}
