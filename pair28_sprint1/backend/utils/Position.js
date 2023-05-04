export class Position {
    x; y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `{${(this.x)}, ${(this.y)}}`;
    }
}
Object.freeze(Position);