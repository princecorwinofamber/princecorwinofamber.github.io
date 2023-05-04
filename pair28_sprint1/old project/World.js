class World {
    height;
    width;
    map = [];
    directions_odd = [[1,0], [0,1], [-1, 1], [-1, 0], [-1, -1], [0,-1]]
    directions_even = [[1,0], [1,1], [0, 1], [-1, 0], [0, -1], [1,-1]]

    constructor(file) {
        // TODO FIGURE OUT HOW TO READ FROM FILE
        let count = 0;
        while (!file.EOF()) {
            this.map.push([])
            let i = file.readChar()

            while (i !== '\n') {
                this.map[count].push(new WorldCell(i))
                i = file.readChar()
            }
            count++;
        }
        this.height = this.map.length
        this.width = this.map[0].length
    }

    cellAt(position) {
        return this.map[position.x][position.y]
    }
    adjacent(position, direction) {
        if (position.y % 2 !== 0) {
            position.x += this.directions_odd[direction][0]
            position.y += this.directions_odd[direction][1]
        }
        if (position.y % 2 === 0) {
            position.x += this.directions_even[direction][0]
            position.y += this.directions_even[direction][1]
        }
        return position
    }
    turn(direction, number) {
        // TODO
    }
    sensedCell(Position, direction) {}
    isObstructedAt(position) {
        return this.map[position.x][position.y].isObstructed()
    }
    isOccupiedAt(position) {
        return this.map[position.x][position.y].isOccupied()
    }

    setBugAt(position) {
        return this.map[position.x][position.y].setBug()
    }
    getBugAt(position) {
        return this.map[position.x][position.y].isOccupied()
    }

    isFriendlyBaseAt(position, color) {
        return this.map[position.x][position.y].isFriendlyBase(color)
    }

    isEnemyBase(position, color) {
        return this.map[position.x][position.y].isEnemyBase(color)
    }

    setMarkerAt(position, color, number) {
        this.map[position.x][position.y].setMarker(color, number)
    }
    clearMarkerAt(position, color, number) {
        this.map[position.x][position.y].clearMarker(color, number)
    }
    isFriendlyMarkerAt(position, color) {
        this.map[position.x][position.y].isFriendlyMarker(color)
    }
    isEnemyMarkerAt(position, color, number) {
    this.map[position.x][position.y].isEnemyMarker(color)
    }

    toString() {}
}