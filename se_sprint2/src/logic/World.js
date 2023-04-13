// Importing necessary modules
import {assert} from '../utils/Assertions.js';
import {CellCondition, Color} from './GeneralClasses/General.js';
import Position from './GeneralClasses/Position.js';
import {cell, cellBlack, cellObstructed, cellRed, ctx} from "./Script_start.js";

// Defining the World class
export default class World {
    constructor(width, height, cells) {
        this.width = width; // Setting the width of the World
        this.height = height; // Setting the height of the World
        this.cells = cells; // Setting the cells of the World
        this.redBugsKilled = 0; // Number of killed red bugs
        this.blackBugsKilled = 0; // Number of killed black bugs
        this.updateMapView(); // Updating the map view
    }

    // Drawing the cell at the given position with the given cell type
    drawCell(i, j, cellTyped, food = 0) {
        let pos = new Position(j, i);
        let blackMarkerText = "";
        let redMarkerText = "";
        for (let num = 0; num < 6; num++) {
            if (this.isFriendlyMarkerAt(pos, Color.Red, num)) {
                redMarkerText = redMarkerText + num.toString();
            } else {
                redMarkerText = redMarkerText + " ";
            }
            if (this.isFriendlyMarkerAt(pos, Color.Black, num)) {
                blackMarkerText = blackMarkerText + num.toString();
            } else {
                blackMarkerText = blackMarkerText + " ";
            }
        }
        if (typeof document !== 'undefined') {
            if (i % 2 === 0) { // Checking if the row is even
                ctx.drawImage(cellTyped, j * 50, i * 44, 64, 64); // Drawing the cell at the even position
                // draw food if it is present in the cell
                if (food > 0) {
                    ctx.fillText(food.toString(), j * 50 + 24, i * 44 + 25);
                }
                // draw markers
                let old_fillstyle = ctx.fillStyle;
                ctx.font = "12px Verdana";
                ctx.fillStyle = "#ff0000";
                ctx.fillText(redMarkerText, j * 50 + 9, i * 44 + 35);
                ctx.fillStyle = "#000";
                ctx.fillText(blackMarkerText, j * 50 + 9, i * 44 + 46);
                ctx.font = "20px Verdana";
                ctx.fillStyle = old_fillstyle;
            } else {
                ctx.drawImage(cellTyped, j * 50 + 25, i * 44, 64, 64); // Drawing the cell at the odd position
                // draw food if it is present in the cell
                if (food > 0) {
                    ctx.fillText(food.toString(), j * 50 + 49, i * 44 + 25);
                }
                // draw markers
                let old_fillstyle = ctx.fillStyle;
                ctx.font = "12px Verdana";
                ctx.fillStyle = "#ff0000";
                ctx.fillText(redMarkerText, j * 50 + 34, i * 44 + 35);
                ctx.fillStyle = "#000";
                ctx.fillText(blackMarkerText, j * 50 + 34, i * 44 + 46);
                ctx.font = "20px Verdana";
                ctx.fillStyle = old_fillstyle;
            }
        }
    }

    // Updating the map view of the World
    updateMapView() {
        for (let i = 0; i < this.height; i++) { // Looping through each row
            for (let j = 0; j < this.width; j++) { // Looping through each column
                if (this.cells[i][j].obstructed) this.drawCell(i, j, cellObstructed)
                else if (this.cells[i][j].baseColor === Color.Red) this.drawCell(i, j, cellRed)
                else if (this.cells[i][j].baseColor === Color.Black) this.drawCell(i, j, cellBlack)
                else this.drawCell(i, j, cell, this.getFoodAt(new Position(j, i)))
            }
        }
    }

    // Getting the cell at the given position
    cellAt(position) {
        return (this.cells)[position.y][position.x];
    }

    // Getting the adjacent cell at the given position and direction
    adjacent(position, dir) {
        return (this.cells)[this.sensedCell(position, dir).y][this.sensedCell(position, dir).x];
    }

    // Getting the sensed cell at the given position and direction
    sensedCell(currentPosition, direction) {
        switch (direction) {
            case -1:
                return new Position(currentPosition.x, currentPosition.y);
            case 0:
                return new Position(currentPosition.x + 1, currentPosition.y);
            case 1:
                return new Position(currentPosition.x + 1, currentPosition.y + 1);
            case 2:
                return new Position(currentPosition.x, currentPosition.y + 1);
            case 3:
                return new Position(currentPosition.x - 1, currentPosition.y);
            case 4:
                return new Position(currentPosition.x, currentPosition.y - 1);
            case 5:
                return new Position(currentPosition.x + 1, currentPosition.y - 1);
            default:
                assert(false, "error: wrong direction");
        }
    }

    turn(dir, turn_param) {
        if (turn_param === 0) return (dir + 5) % 6;
        else return (dir + 1) % 6;
    }

    isObstructedAt(pos) {
        return this.cellAt(pos).isObstructed();
    }

    isOccupiedAt(pos) {
        return this.cellAt(pos).isOccupied();
    }

    setBugAt(pos, bug) {
        this.cellAt(pos).setBug(bug);
    }

    getBugAt(pos) {
        return this.cellAt(pos).getBug();
    }

    removeBugAt(pos) {
        this.cellAt(pos).removeBug();
    }

    setFoodAt(pos, food) {
        this.cellAt(pos).setFood(food);
    }

    getFoodAt(pos) {
        return this.cellAt(pos).getFood();
    }

    isFriendlyBaseAt(pos, color) {
        return this.cellAt(pos).cellMatches(color, new CellCondition("Home"));
    }

    isEnemyBaseAt(pos, color) {
        return this.cellAt(pos).cellMatches(color, new CellCondition("FoeHome"));
    }

    setMarkerAt(pos, color, markerType) {
        this.cellAt(pos).setMarker(color, markerType);
    }

    clearMarkerAt(pos, color, markerType) {
        this.cellAt(pos).clearMarker(color, markerType);
    }

    isFriendlyMarkerAt(pos, color, markerType) {
        return this.cellAt(pos).isFriendlyMarker(color, markerType);
    }

    isEnemyMarkerAt(pos, color, markerType) {
        return this.cellAt(pos).isEnemyMarker(color, markerType);
    }

    /**
     * Calculate the remaining food in the world (not secured in the base nor carried by a bug)
     */
    calcFoodRemaining() {
        let result = 0;
        for (let i = 0; i < this.height; i++) { // Looping through each row
            for (let j = 0; j < this.width; j++) { // Looping through each column
                const cell = this.cells[i][j];
                // if a free cell, count
                if (!cell.isBase)
                    result += cell.getFood();
            }
        }
        return result;
    }

    /**
     * Calculates the food secured (in the base, not on a bug) by a specific team
     * @param color Team color
     */
    calcFoodSecured(color) {
        let result = 0;
        for (let i = 0; i < this.height; i++) { // Looping through each row
            for (let j = 0; j < this.width; j++) { // Looping through each column
                const cell = this.cells[i][j];
                if (cell.isBase && cell.baseColor === color) {
                    // if friendly base, count
                    result += cell.getFood();
                }
            }
        }
        return result;
    }

    /**
     * Calculates the number of alive bugs in the team
     * @param color Team color
     */
    calcBugsAlive(color) {
        let result = 0;
        for (let i = 0; i < this.height; i++) { // Looping through each row
            for (let j = 0; j < this.width; j++) { // Looping through each column
                const cell = this.cells[i][j];
                const bug = cell.bug;
                if (bug != null && bug.alive && bug.color === color) {
                    // if of the same color and alive, increment
                    result++;
                }
            }
        }
        return result;
    }

}
Object.freeze(World);
