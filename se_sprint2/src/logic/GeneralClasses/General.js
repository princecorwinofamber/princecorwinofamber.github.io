import {assert} from "../../utils/Assertions.js";

export class Color {
    static Red = new Color('Red', 'r');
    static Black = new Color('Black', 'b');

    constructor(color, short='?') {
        this.color = color;
        this.short = short;
    }

    opposite() {
        // Returning the opposite color based on the current color
        if (this.color === 'Red') return Color.Black;
        else return Color.Red;
    }
}

Object.freeze(Color);

// Defining the CellCondition class
export class CellCondition {
    // Constructor function of the class
    constructor(name, markerType = -1) {
        // Setting the name property
        this.name = name;
        // Checking if the name is "Marker" and setting the markerType property if it is
        if (this.name === "Marker") {
            console.assert(markerType !== -1, "CellCondition with marker type error constructor")
            this.markerType = markerType;
        }
    }
}

// Defining a function to generate a random integer
export function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

// Defining a function to read a text file
export function readTextFile(filePath) {
    // Creating a new XMLHttpRequest object
    let rawFile = new XMLHttpRequest();
    // Opening the file using a GET request
    rawFile.open("GET", filePath, false);
    // Setting a callback function for the readystatechange event
    rawFile.onreadystatechange = function () {
        // Checking if the request has been completed and the response is ready
        if (rawFile.readyState === 4) {
            // Checking if the status code is OK (200) or if it's a local file (status code 0)
            if (rawFile.status === 200 || rawFile.status === 0) {
                // Returning the response text
                return rawFile.responseText
            } else assert(true, "problem with file load");
        } else assert(true, "problem with file load");
    }
// Sending the request
    rawFile.send(null);
// Returning the response text
    return rawFile.responseText;
}
