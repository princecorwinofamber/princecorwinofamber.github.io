import {BugWorldConnectionsChecker} from "./ConnectionsChecker.js";
import {WorldCell} from "./WorldCell.js";
import {Position} from "../utils/Position.js";
import {has_value} from "../utils/Maybe.js";
import {Colors} from "../utils/Color.js";
// import fs from "fs";

const connections_checker = new BugWorldConnectionsChecker();


export class World {
    horizontal_size;
    vertical_size;
    height;
    width;
    map;


    constructor(horizontal_size, vertical_size, map) {
        this.width = horizontal_size;
        this.horizontal_size = horizontal_size;
        this.height = vertical_size;
        this.vertical_size = vertical_size;
        this.map = map;
    }

    toString() {
        return `Size is - (${(this.horizontal_size)}, ${(this.vertical_size)})`;
    }

    cellAt(position) {
        return this.map[position.y][position.x];
    }

    cell_at(position) {
        return this.map[position.y][position.x];
    }

    adjacent(position, direction) {
        return connections_checker.adjacent(position, direction);
    }

    validate_position(position) {
        return ((position.x < this.vertical_size) && (position.x >= 0) && (position.y < this.horizontal_size) && (position.y >= 0));
    }

    turn(direction, turn) {
        return connections_checker.turn(direction, turn);
    }

    is_obstructed_at(position) {
        this.cell_at(position).is_obstructed();
    }

    is_occupied_at(position) {
        this.cell_at(position).is_occupied();
    }

    set_bug_at(position, bug) {
        return this.cell_at(position).set_bug(bug);
    }

    get_bug_at(position) {
        return this.cell_at(position).get_bug();
    }

    remove_bug_at(position) {
        return this.cell_at(position).remove_bug();
    }

    set_food_at(position, new_food_amount) {
        this.cell_at(position).set_food(new_food_amount);
    }

    get_food_at(position) {
        return this.cell_at(position).get_food();
    }

    is_friendly_base_at(position, color) {
        return this.cell_at(position).is_friendly_base(color);
    }

    is_enemy_base_at(position, color) {
        return this.cell_at(position).is_enemy_base(color);
    }

    set_marker_at(position, color, marker_type) {
        this.cell_at(position).set_marker(color, marker_type);
    }

    clear_marker_at(position, color, marker_type) {
        this.cell_at(position).clear_marker(color, marker_type);
    }

    is_friendly_marker_at(position, color, marker_type) {
        return this.cell_at(position).is_friendly_marker(color, marker_type);
    }

    is_enemy_marker_at(position, color, marker_type) {
        return this.cell_at(position).is_enemy_marker(color, marker_type);
    }
}

function check_swarms(width, height, map) {
    // console.log(map);
    let black_swarms_amount = 0;
    let red_swarms_amount = 0;
    const queue = [];
    const visited = [];
    for (let i = 0; i < height; i++) {
        let current = [];
        for (let j = 0; j < width; j++) {
            current.push(false);
        }
        visited.push(current);
    }
    for (let start_x = 0; start_x < height; start_x++) {
        for (let start_y = 0; start_y < width; start_y++) {
            let start_position = new Position(start_x, start_y);
            visited[start_position.x][start_position.y] = true;
            if (!has_value(map[start_position.x][start_position.y].maybe_base)) {
                continue;
            }
            if (map[start_position.x][start_position.y].maybe_base.get_value() === Colors.BLACK) {
                black_swarms_amount += 1;
            } else {
                red_swarms_amount += 1;
            }

            queue.push(start_position);

            // Loop until the queue is empty
            while (queue.length > 0) {
                const current_position = queue.shift();

                for (let dir = 0; dir < 6; dir++) {
                    let neighbor_position = connections_checker.adjacent(current_position, dir);
                    if (!((neighbor_position.x >= 0) && (neighbor_position.x < height) && (neighbor_position.y >= 0) && (neighbor_position.y < width))) {
                        continue;
                    }
                    if (!has_value(map[neighbor_position.x][neighbor_position.y].maybe_base)) {
                        continue;
                    }
                    if (!visited[neighbor_position.x][neighbor_position.y] && (map[neighbor_position.x][neighbor_position.y].maybe_base.get_value() === map[current_position.x][current_position.y].maybe_base.get_value())) {
                        queue.push(neighbor_position);
                        visited[neighbor_position.x][neighbor_position.y] = true;
                    }
                }
            }
        }
    }
    if (black_swarms_amount === 0 || red_swarms_amount === 0) {
        throw new Error("One of the bug swarms is missing");
    }
    if (black_swarms_amount !== 1 || red_swarms_amount !== 1) {
        throw new Error("Swarm have to be linked");
    }
}

export function parse_world(data) {
    // console.log(data);
    const lines = data.split("\n");

    if (lines.length < 3) {
        throw new Error("World file must have at least 3 lines");
    }

    const height = parseInt(lines[0].trim());
    const width = parseInt(lines[1].trim());
    if (height <= 0 || width <= 0) {
        throw new Error("Height and width must be greater than 0");
    }
    let map = [];
    if (lines.length - 2 !== height) {
        throw new Error("The field does not correspond to the indicated dimensions");
    }
    for (let i = 0; i < height; i++) {
        let split_string = lines[i + 2].split(' ');
        if (split_string.length !== width) {
            throw new Error("The field does not correspond to the indicated dimensions");
        }
        let current_row = [];
        for (let j = 0; j < width; j++) {
            if (split_string[j].length !== 1) {
                throw new Error("Value out of legal");
            }
            current_row.push(new WorldCell(split_string[j][0]));
            if (((i === 0) || (i === height - 1) || (j === 0) || (j === width - 1)) && split_string[j][0] !== '#') {
                throw new Error("There is no outer border");
            }
        }
        map.push(current_row);
    }
    check_swarms(width, height, map);

    return new World(width, height, map);
}

export async function read_world(file) {
    let result = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsText(file);
    });

    window.parent.selected_options.map_of_world = result;
    return parse_world(result);
}
