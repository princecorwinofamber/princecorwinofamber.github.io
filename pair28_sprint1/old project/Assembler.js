class Assembler {
    constructor(s1, s2) {}

    interpret_instructions(s, color) {
        const instructions = []
        s = s.split('\n')
        for (let i = 0; i < s.length; i++) {
            instructions.push(make_instruction(s[i]))
        }
        if (color === Colors.RED)
            this.reb_bugs_instructions = instructions
        if (color === Colors.BLACK)
            this.black_bugs_instructions = instructions
    }
}