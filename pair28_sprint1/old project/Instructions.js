class Instruction {}

function make_instruction(s) {
    s = s.split(' ')
    switch (s[0]) {
        case "sense":
            return new Sense(s[1], s[2], s[3], s[4]);
        case "turn":
            return new Turn(s[1]);
        case "move":
            return new Move(s[1], s[2]);
        case "mark":
            return new Mark(s[1], s[2]);
        case "unmark":
            return new Unmark(s[1], s[2]);
        case "flip":
            return new Flip(s[1], s[2], s[3]);
        case "pickup":
            return new PickUp(s[1], s[2]);
        case "direction":
            return new Direction(s[1], s[2], s[3]);
        case "drop":
            return new Drop(s[1]);
        case "label":
            return new Label(s[1]);
        default:
            console.assert(false);
    }
}
class Sense extends Instruction {
    constructor(dir, cond, then, else_) {
        super();
        this.dir = dir
        this.cond = cond
        this.then = then
        this.else = else_
    }

    execute(bug, world) {

    }
}
class Turn extends Instruction {

    constructor(dir) {
        super();
        this.dir = dir
    }

    execute(bug, world) {
        bug.direction = this.dir
    }
}
class Move extends Instruction {
    constructor(int, then) {
        super();
        this.int = int
        this.then = then
    }
    execute(bug : Bug, world : World) {
        if (world.cellAt(bug.getPosition()).cellMatches()
    }
}

class Mark extends Instruction {
    constructor(then, else_) {
        super();
        this.then = then;
        this.else = else_;
    }
}

class Unmark extends Instruction {
    constructor(int, then) {
        super();
        this.int = int;
        this.then = then;
    }
}
class Flip extends Instruction {
    constructor(int, then, else_) {
        super();
        this.int = int;
        this.then = then;
        this.else = else_
    }
}
class PickUp extends Instruction {
    constructor(then, else_) {
        super();
        this.then = then;
        this.else = else_;
    }
}
class Direction extends Instruction {
    constructor(dir, then, else_) {
        super();
        this.dir = dir;
        this.then = then;
        this.else = else_;
    }
}
class Drop extends Instruction {
    constructor(next) {
        super();
        this.next = next
    }
}
class Label extends Instruction {
    constructor(label) {
        super();
        this.label = label;
    }
}
