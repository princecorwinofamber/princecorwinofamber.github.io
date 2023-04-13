export default class StateMachine {
    constructor(instructions, bug) {
        this.currentInstruction = 0;
        this.bug = bug;
        this.instructions = instructions;
    }

    proceedInstruction() {
        this.currentInstruction = this.instructions[this.currentInstruction].proceed(this.bug);
        console.assert(this.currentInstruction < this.instructions.length, "Wrong index of state")
    }
}
