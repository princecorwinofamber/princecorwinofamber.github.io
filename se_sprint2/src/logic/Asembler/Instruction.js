import {assert} from "../../utils/Assertions.js";
import {assertStringShouldBeInt} from "../../utils/Assertions.js";
import {assertDir} from "../../utils/Assertions.js";
import {assertMarker} from "../../utils/Assertions.js";
import {CellCondition, getRandomInt} from "../GeneralClasses/General.js";

export default class Instruction {
    constructor(codeLine, world, commandNumber) {
        this.commandNumber = "[" + commandNumber + "]";
        this.words = codeLine.replace(/;.*/, '');
        this.words = this.words.split(" ");
        this.words = this.words.filter(str => str !== "");
        assert(this.words.length !== 0, "Empty line of code in bugScript");
        this.proceededFun = this.check();
        this.check();
        this.world = world;
    }

    check() {
        switch (this.words[0]) {
            case "sense":
                assert(this.words.length == 5, "BugScript: wrong count of arguments in Sense");
                assertStringShouldBeInt(this.words[2], "Sense");
                assertStringShouldBeInt(this.words[3], "Sense");
                return this.sense;
            case "mark":
                assert(this.words.length === 3, "BugScript: wrong count of arguments in Mark");
                assertStringShouldBeInt(this.words[1], "Mark");
                assertStringShouldBeInt(this.words[2], "Mark");
                return this.mark;
            case "unmark":
                assert(this.words.length === 3, "BugScript: wrong count of arguments in Unmark");
                assertStringShouldBeInt(this.words[1], "Unmark");
                assertStringShouldBeInt(this.words[2], "Unmark");
                return this.unmark;
            case "pickup":
                assert(this.words.length === 3, "BugScript: wrong count of arguments in Pickup");
                assertStringShouldBeInt(this.words[1], "Pickup");
                assertStringShouldBeInt(this.words[2], "Pickup");
                return this.pickup;
            case "drop":
                assert(this.words.length === 2, "BugScript: wrong count of arguments in Drop");
                assertStringShouldBeInt(this.words[1], "Drop");
                return this.drop;
            case "turn":
                assert(this.words.length === 3, "BugScript: wrong count of arguments in Turn");
                assertStringShouldBeInt(this.words[2], "Turn");
                return this.turn;
            case "move":
                assert(this.words.length === 3, "BugScript: wrong count of arguments in Move");
                assertStringShouldBeInt(this.words[1], "Move");
                assertStringShouldBeInt(this.words[2], "Move");
                return this.move;
            case "flip":
                assert(this.words.length === 4, "BugScript: wrong count of arguments in Flip");
                assertStringShouldBeInt(this.words[1], "Flip");
                assertStringShouldBeInt(this.words[2], "Flip");
                assertStringShouldBeInt(this.words[3], "Flip");
                return this.flip;
            case "direction":
                assert(this.words.length === 4, "BugScript: wrong count of arguments in Direction");
                assertStringShouldBeInt(this.words[1], "Direction");
                assertStringShouldBeInt(this.words[2], "Direction");
                assertStringShouldBeInt(this.words[3], "Direction");
                return this.direction;
            default:
                assert(false, "Wrong command in bugScript");
                break;
        }
    }

    proceed(bug) {
        return this.proceededFun(bug);
    }

    sense(bug) {
        //console.log(this.commandNumber + "sense");
        let strSenseDirection = this.words[1]
        let senseDirection;
        switch (strSenseDirection) {
            case "here":
                senseDirection = -1;
                break;
            case "ahead":
                senseDirection = bug.direction;
                break;
            case "leftahead":
                senseDirection = (bug.direction + 5) % 6;
                break;
            case "rightahead":
                senseDirection = (bug.direction + 1) % 6;
                break;
            default:
                assert(false, "Sense: wrong CellDirection");
        }
        assertDir(senseDirection, "Sense");
        let state1 = Number.parseInt(this.words[2]);
        let state2 = Number.parseInt(this.words[3]);
        let cond = this.words[4];
        if (this.world.adjacent(bug.getPosition(), senseDirection).cellMatches(bug.getColor(), new CellCondition(cond))) {
            return state1;
        }
        return state2;
    }

    mark(bug) {
        //console.log(this.commandNumber + "mark");
        let marker = Number.parseInt(this.words[1]);
        assertMarker(marker, "Mark");
        let state = Number.parseInt(this.words[2]);
        this.words.setMarkerAt(bug.getPosition(), bug.getColor(), marker);
        return state;
    }

    unmark(bug) {
        //console.log(this.commandNumber + "unmark");
        let marker = Number.parseInt(this.words[1]);
        assertMarker(marker, "Unmark");
        let state = Number.parseInt(this.words[2]);
        this.words.clearMarkerAt(bug.getPosition(), bug.getColor(), marker);
        return state;
    }

    pickup(bug) {
        //console.log(this.commandNumber + "pickup");
        let state1 = Number.parseInt(this.words[1]);
        let state2 = Number.parseInt(this.words[2]);
        let food = this.world.getFoodAt(bug.getPosition());
        if (food === 0 || bug.hasFood) return state2;
        bug.hasFood = true;
        this.world.setFoodAt(bug.getPosition(), food - 1);
        return state1;
    }

    drop(bug) {
        //console.log(this.commandNumber + "drop");
        let state = Number.parseInt(this.words[1]);
        if (!bug.hasFood) {
            return state;
        }
        console.assert(bug.hasFood, "Drop: bug should has food");
        let food = this.world.getFoodAt(bug.getPosition());
        bug.hasFood = false;
        this.world.setFoodAt(bug.getPosition(), food + 1);
        return state;
    }

    turn(bug) {
        //console.log(this.commandNumber + "turn");
        let turnDir = this.words[1];
        assert(turnDir === "right" || turnDir === "left", "Turn: turn dir should be left or right")
        let state = Number.parseInt(this.words[2]);
        if (turnDir === "right") {
            bug.turnRight();
        }
        if (turnDir === "left") {
            bug.turnLeft();
        }
        return state;
    }

    move(bug) {
        //console.log(this.commandNumber + "move");
        let state1 = Number.parseInt(this.words[1]);
        let state2 = Number.parseInt(this.words[2]);
        if (this.world.adjacent(bug.getPosition(), bug.direction).cellMatches(bug.getColor(), new CellCondition("Inaccessible"))) {
            return state2;
        }
        this.world.cellAt(bug.getPosition()).bug = null;
        bug.setPosition(this.world.sensedCell(bug.getPosition(), bug.direction))
        this.world.cellAt(bug.getPosition()).bug = bug;
        return state1;
    }

    flip(bug) {
        //console.log(this.commandNumber + "flip");
        let state1 = Number.parseInt(this.words[2]);
        let state2 = Number.parseInt(this.words[3]);
        let p = Number.parseInt(this.words[1]);
        let rnd = getRandomInt(p - 1);
        console.log(this.commandNumber + rnd);
        if (rnd === 0) {
            return state1;
        }
        return state2;
    }

    direction(bug) {
        //console.log(this.commandNumber + "direction");
        let d = Number.parseInt(this.words[1]);
        assertDir(d, "Direction");
        let state1 = Number.parseInt(this.words[2]);
        let state2 = Number.parseInt(this.words[3]);
        if (bug.direction === d) {
            return state1;
        }
        return state2;
    }
}
