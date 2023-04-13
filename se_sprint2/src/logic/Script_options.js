import {world_map, bug_brain_1, bug_brain_2, number_of_iter, logging_bool} from "./Simulator.js";
import { validateMap } from "./FileValidators/validateMap.js";
import { validateAsm } from "./FileValidators/validateAsm.js";

var map_of_world = null;
var brain1 = null;
var brain2 = null;
var max_iter_number = 100;
var is_logging_enabled = false;

function upload_file(file_input, on_read_callback) {
    var reader = new FileReader();
    reader.onload = function() {
        on_read_callback(reader.result);
    }
    reader.readAsText(file_input.files[0]);
}

let world_map_file = document.getElementById("world_map");
world_map_file.addEventListener("change", function(event) {
    // Когда происходит изменение элементов управления, значит появились новые файлы
    upload_file(world_map_file, (text) => map_of_world = text);
}, false);

let bug_brain_1_file = document.getElementById("bug_brain_1");
bug_brain_1_file.addEventListener("change", function(event) {
    // Когда происходит изменение элементов управления, значит появились новые файлы
    upload_file(bug_brain_1_file, (text) => brain1 = text);
}, false);


let bug_brain_2_file = document.getElementById("bug_brain_2");
bug_brain_2_file.addEventListener("change", function(event) {
    // Когда происходит изменение элементов управления, значит появились новые файлы
    // bug_brain_2 = bug_brain_2_file.files[0].name;
    upload_file(bug_brain_2_file, (text) => brain2 = text);
}, false);


let number_of_iter_file = document.getElementById("number_of_iter");
number_of_iter_file.addEventListener("change", function(event) {
    // Когда происходит изменение элементов управления, значит появились новые файлы
    max_iter_number = number_of_iter_file.value;
}, false);


let logging_bool_file = document.getElementById("logging_bool").valueOf();
logging_bool_file.addEventListener("change", function(event) {
    // Когда происходит изменение элементов управления, значит появились новые файлы
    is_logging_enabled = logging_bool_file.value;
}, false);

document.getElementById("NextButton").addEventListener("click", function() {
    if (!validateMap(map_of_world) && map_of_world != null) {
        alert("Map is invalid!");
        return;
    }
    if (!validateAsm(brain1 && brain1 != null)) {
        alert("Brain of bug 1 is invalid!");
        return;
    }
    if (!validateAsm(brain2) && brain2 != null) {
        alert("Brain of bug 2 is invalid!");
        return;
    }
    if (!(Number.isInteger(parseFloat(max_iter_number)) && parseInt(max_iter_number) > 0)) {
        alert("Iteration number is not a positive integer!");
        return;
    }
    window.parent.selected_options.map_of_world = map_of_world;
    window.parent.selected_options.brain1 = brain1;
    window.parent.selected_options.brain2 = brain2;
    window.parent.selected_options.max_iter_number = max_iter_number;
    window.parent.selected_options.is_logging_enabled = is_logging_enabled;
    window.parent.target_page = "board.html";
    window.parent.document.getElementById("mainFrame").src = "board.html";
});
