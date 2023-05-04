import Initializer from "./Init_PLUG.js";
export var cvs;
export var ctx;
export var cell;
export var cellObstructed;
export var cellRed;
export var cellBlack;
export var simulator;
export var logArea;
export var statsArea;
    
export var bugBlack = [];
export var bugRed = [];

const content = document.getElementById("content");

export function runBoard(world, bug_code_1, bug_code_2, max_iter, is_logging_enabled) {
  content.innerHTML = 
  (`<div class="container">
    <div class="canvas-container" style="float: left;">
        <canvas id="canvas" width="700" height="600"></canvas>
    </div>
    <div class="div2" style="margin-right: 1em; padding-top: 8em;">
        <label for="statsArea">Statistics:</label>
        <br>
        <p id="statsArea">
        </p>
        <br>
    </div>
    <div style="clear: both;"></div>
    </div>
    <div>
    <label for="logArea">Log output:</label>
    <br>
    <textarea style="width: 50%; height: 12em;" id="logArea" placeholder="No logs generated..." readonly>
    </textarea>
    </div>`)
    
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext("2d");
    // Define image elements
    cell = new Image();
    cellObstructed = new Image();
    cellRed = new Image();
    cellBlack = new Image();
    // Set image source files
    cell.src = "img/cell.png";
    cellObstructed.src = "img/cellObstructed.png";
    cellRed.src = "img/cellRed.png";
    cellBlack.src = "img/cellBlack.png";
    
    logArea = document.getElementById("logArea");
    statsArea = document.getElementById("statsArea");
    
    // Create initializer object and start the simulation
    let initializer = new Initializer(world, bug_code_1, bug_code_2, max_iter, is_logging_enabled);
    initializer.world
    initializer.draw();
}