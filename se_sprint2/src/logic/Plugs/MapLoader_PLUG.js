import Cell from "../Entities/Cell.js";
import {Color, readTextFile} from "../GeneralClasses/General.js";

// Defining the MapLoader class
export default class MapLoader {
    // Constructor function of the class
    constructor(mapText) {
        // Reading the file at the given file path and splitting it into an array of lines
        let text = mapText;
        let sep = text.indexOf("\r") >= 0 ? "\r\n" : "\n";
        let map = text.split(sep);
        // Initializing the cells array
        this.cells = [];
        // TODO: insert assertions here
        // Extracting the width and height of the map from the first two lines of the file
        this.width = parseInt(map[0]);
        this.height = parseInt(map[1]);
        // Removing all spaces from each line in the map array
        for (let i = 0; i < this.height; i++) {
            map[i + 2] = map[i + 2].replace(/ /g, '');
        }
        // Creating the cells array using the values in the map array
        for (let i = 0; i < this.height; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.width; j++) {
                // Getting the cell value from the map array
                let cell = map[i + 2][j];
                // Creating a new cell object based on the cell value
                switch (cell) {
                    case '#':
                        this.cells[i][j] = new Cell(true);
                        break;
                    case '+':
                        this.cells[i][j] = new Cell(false, 0, true, Color.Red);
                        break;
                    case '-':
                        this.cells[i][j] = new Cell(false, 0, true, Color.Black);
                        break;
                    case '.':
                        this.cells[i][j] = new Cell();
                        break;
                    default:
                        this.cells[i][j] = new Cell(false, parseInt(cell), false);
                }
            }
        }
    }
}
