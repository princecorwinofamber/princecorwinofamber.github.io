import {Position} from "../utils/Position.js";

class ConnectionsChecker {
    adjacent(position, direction) {} // get position in direction of direction

    turn(current_direction, delta_direction) {} // get direction after the turn
}

export class BugWorldConnectionsChecker extends ConnectionsChecker {
    directions_amount = 6;
    directions_odd = [[1,0], [0,1], [-1, 1], [-1, 0], [-1, -1], [0,-1]];
    directions_even = [[1,0], [1,1], [0, 1], [-1, 0], [0, -1], [1,-1]];

    adjacent(position, direction) {
        if (position.y % 2 !== 0) {
            return new Position(position.x + this.directions_odd[direction][0], position.y + this.directions_odd[direction][1]);
        } else {
            return new Position(position.x + this.directions_even[direction][0], position.y + this.directions_even[direction][1]);
        }
    }

    turn(current_direction, delta_direction) {
        return (current_direction + delta_direction + this.directions_amount) % this.directions_amount;
    }
}