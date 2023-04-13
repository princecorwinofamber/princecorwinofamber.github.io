class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const Color = {
    Friend: 'black',
    Enemy: 'red'
}

class WorldCell {
    position;
    #obstructed = false;
    #bug = null;
    #food = 0;
    #marker = null;
    #base = null;

    constructor(x, y) {
        this.position = new Position(x, y);
    }

    isObstructed() {
        return this.#obstructed;
    }

    isOccupied() {
        return (bug != null);
    }

    setBug(bug) {
        this.#bug = bug;
    }

    getBug() {
        return this.#bug;
    }

    removeBug() {
        this.#bug = null;
    }

    setFood(count) {
        this.#food = count;
    }

    setEnemyBase() {
        this.#base = Color.Enemy;
    }

    setFriendlyBase() {
        this.#base = Color.Friend;
    }

    isEnemyBase() {
        return this.#base == Color.Enemy;
    }

    isFriendlyBase() {
        return this.#base == Color.Friend;
    }

    setObstacle() {
        this.#obstructed = true;
    }

    getBase() {
        return this.#base;
    }

}

class Field {
    #a = 2 * Math.PI / 6;
    #r;
    #leftTopCoordinate;
    
    constructor(r, leftTop) {
        this.#r = r;
        this.#leftTopCoordinate = leftTop;
    }

    // Draws hexagon in specified position with color 'fillColor' inside
    drawHexagon(position, fillColor = 'lightgrey') {
    }

    drawObstacle(position) {
        this.drawHexagon(position, 'black');
    }

    drawFriendlyBase(position) {
        this.drawHexagon(position, 'pink');
    }

    drawEnemyBase(position) {
        this.drawHexagon(position, 'lightblue');
    }
    

    clearHexagon(position) {
        this.drawHexagon(position);
    }

    // @param
    // color is Color.Friend or Color.Enemy
    // 0 <= direction < 6
    drawBug(position, color, direction) {
    }

    // @return 2d array of Cells
    // Draws empty field
    drawField(width, height) {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        const a = this.#a;
        const r = this.#r;
        let x = this.#leftTopCoordinate.x;
        let y = this.#leftTopCoordinate.y;
        const cells = new Array();
        for (let w = 0; w < width; ++w) {
            cells[w] = new Array(height);
        }
        for (let h = 0; h < height; ++h) {
            if (h % 2 == 0) 
                x = this.#leftTopCoordinate.x;
            else
                x = this.#leftTopCoordinate.x + r * Math.sin(a);
            for (let w = 0; w < width; ++w) {
                // this.drawHexagon(new Position(x, y));
                cells[w][h] = new WorldCell(x, y);
                x += 2 * r * Math.sin(a);
            }
            y += r + r * Math.cos(a);
        }
        return cells;
    }

    // Draws circles in specified position with 'fillColor' inside color and specified border color and size
    #drawCircle(x, y, fillColor, borderColor, borderSize = 1) {
    }

    drawMarker(position, color) {
        const x = position.x;
        const y = position.y;
        this.#drawCircle(x, y, color, color);
    }

    drawFood(position, count) {
    }

}

class World {
    // Field is responsible for drawing all the objects
    #field;
    // 2d array of WorldCells. Initialized when called parseInputMap
    #map;
    #width;
    #height;

    constructor() {
        this.#field = new Field(40, new Position(60, 60));
    }
    
    setFoodAt(position, food) {
        const cell = this.getCell(position);
        cell.setFood(food);
        this.#field.drawFood(cell.position, food);
    }

    setFriendlyBase(position) {
        const cell = this.getCell(position);
        cell.setFriendlyBase();
        this.#field.drawFriendlyBase(cell.position);
    }

    setEnemyBase(position) {
        const cell = this.getCell(position);
        cell.setEnemyBase();
        this.#field.drawEnemyBase(cell.position);
    }

    isFriendlyBase(position) {
        const cell = this.getCell(position);
        return cell.isFriendlyBase();
    }

    isEnemyBase(position) {
        const cell = this.getCell(position);
        return cell.isEnemyBase();
    }

    setObstacle(position) {
        const cell = this.getCell(position);
        cell.setObstacle();
        this.#field.drawObstacle(cell.position);
    }

    getCell(position) {
        return this.#map[position.x][position.y];
    }

    getHeight() {
        return this.#height;
    }

    getWidth() {
        return this.#width;
    }

    // tmp function for debug purposes
    getField() {
        return this.#field;
    }

    // Draws inputted map
    // Validates map
    // If not correct, throws exception with error
    // Saves map field
    parseInputMap(map) {
        const lines = map.split('\n');
        const width = Number(lines[0]);
        const height = Number(lines[1]);
        this.#height = height;
        this.#width = width;
        this.#map = this.#field.drawField(width, height);
        const friendlyBaseCells = [];
        const enemyBaseCells = [];
        if (lines.length - 2 < height) {
            throw "height is less than should be";
        }
        for (let y = 2; y < height + 2; ++y) {
            const symbols = lines[y].replaceAll('\r', '').split(' ');
            if (symbols.length < width) {
                throw "width is less than should be";
            }
            for (let x = 0; x < width; ++x) {
                const position = new Position(x, y - 2);
                switch (symbols[x]) {
                    case "#":
                        this.setObstacle(position);
                        break;
                    case "+":
                        friendlyBaseCells.push(position);
                        this.setFriendlyBase(position);
                        break;
                    case "-":
                        enemyBaseCells.push(position);
                        this.setEnemyBase(position);
                        break;
                    default:
                        if (!isNaN(symbols[x])) {
                            const food = Number(symbols[x]);
                            if (food > 9) {
                                throw "Illegal value of food";
                            }
                            this.setFoodAt(position, food);
                            break;
                        }
                        if (symbols[x] != '.') {
                            throw "Invalid symbol \"" + symbols[x] + "\" in field";
                        }
                }
            }
        }
        this.#checkConnectivityFriend(friendlyBaseCells);
        this.#checkConnectivityEnemy(enemyBaseCells);
        this.#checkBorder(width, height);
    }

    // @return list of all not obstructed adjacent positions of cells
    // if cell is obstructed, returns empty list
    #getAdjacentCells(position) {
        const y = position.y;
        const x = position.x;
        const cell = this.getCell(position);
        if (cell.isObstructed()) {
            return [];
        }
        const cells = new Array();
        if (x > 0) {
            cells.push(new Position(x - 1, y));
        }
        if (x < this.#width - 1) {
            cells.push(new Position(x + 1, y));
        }
        if (y > 0) {
            if (y % 2 == 0) {
                cells.push(new Position(x - 1, y - 1));
                cells.push(new Position(x, y - 1));
            } else {
                cells.push(new Position(x + 1, y - 1));
                cells.push(new Position(x, y - 1));
            }
        }
        if (y < this.#height - 1) {
            if (y % 2 == 0) {
                cells.push(new Position(x - 1, y + 1));
                cells.push(new Position(x, y + 1));
            } else {
                cells.push(new Position(x + 1, y + 1));
                cells.push(new Position(x, y + 1));
            }
        }
        const freeCells = cells.filter(cell => !this.getCell(cell).isObstructed());
        return freeCells;
    }

    #checkConnectivityFriend(friendlyBaseCells) {
        const visitedCells = new Array();
        if (friendlyBaseCells.length == 0) {
            throw "No base for friends";
        }
        this.#dfsInFriend(friendlyBaseCells[0], visitedCells);
        if (visitedCells.length != friendlyBaseCells.length) {
            throw "Friendly base is not connected";
        }
    }

    #dfsInFriend(currentPosition, visitedCells) {
        if (this.#contains(currentPosition, visitedCells)) {
            return;
        }
        visitedCells.push(currentPosition);
        const adjacentCells = this.#getAdjacentCells(currentPosition).filter(
            position => this.getCell(position).getBase() == Color.Friend
        );
        adjacentCells.forEach(position => this.#dfsInFriend(position, visitedCells));
    }

    #checkConnectivityEnemy(enemyBaseCells) {
        const visitedCells = new Array();
        if (enemyBaseCells.length == 0) {
            throw "No base for enemy";
        }
        this.#dfsInEnemy(enemyBaseCells[0], visitedCells);
        if (visitedCells.length != enemyBaseCells.length) {
            throw "Enemy base is not connected";
        }
    }

    #dfsInEnemy(currentPosition, visitedCells) {
        if (this.#contains(currentPosition, visitedCells)) {
            return;
        }
        visitedCells.push(currentPosition);
        const adjacentCells = this.#getAdjacentCells(currentPosition).filter(
            position => this.getCell(position).getBase() == Color.Enemy
        );
        adjacentCells.forEach(position => this.#dfsInEnemy(position, visitedCells));
    }

    #contains(pos, positions) {
        let i = positions.length;
        while (i--) {
            if (positions[i].x == pos.x && positions[i].y == pos.y) {
                return true;
            }
        }
        return false;
    }

    #checkBorder(width, height) {
        for (let x = 0; x < width; ++x) {
            if (!this.#map[x][0].isObstructed()) {
                throw "There is no border";
            }
            if (!this.#map[x][height - 1].isObstructed()) {
                throw "There is no border";
            }
        }
        for (let y = 0; y < height; ++y) {
            if (!this.#map[0][y].isObstructed()) {
                throw "There is no border";
            }
            if (!this.#map[width - 1][height - 1].isObstructed()) {
                throw "There is no border";
            }
        }
    }

    getAdjacentCells(position) {
        return this.#getAdjacentCells(position);
    }

}

// accepts the world map as a string
// returns true if it is a valid map, false otherwise
export function validateMap(map_text) {
    let world = new World();
    try {
        world.parseInputMap(map_text);
        return true;
    } catch {
        return false;
    }
}
