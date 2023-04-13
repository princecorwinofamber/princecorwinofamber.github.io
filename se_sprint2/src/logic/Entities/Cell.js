import {assert} from '../../utils/Assertions.js';
import {CellCondition, Color} from "../GeneralClasses/General.js";
import Bug from "./Bug.js";


export default class Cell {
    constructor(obstructed = false, food = 0, isBase = false, baseColor = null) {
        this.obstructed = obstructed;
        this.food = food;
        this.isBase = isBase;
        this.baseColor = baseColor
        this.bug = null;
        this.redMarkers = [false, false, false, false, false, false]; // 6 types of markers
        this.blackMarkers = [false, false, false, false, false, false]; // 6 types of markers
    }

    isObstructed() {
        return this.obstructed;
    }

    isOccupied() {
        let a = !(this.bug === null)
        return a;
    }

    setBug(bug) {
        assert(bug == null || bug instanceof Bug, "setBug failed: wrong bug type");
        if (this.bug != null) {
            return false;
        }
        this.bug = bug;
        return true;
    }

    getBug() {
        return this.bug;
    }

    removeBug() {
        if (this.bug == null) {
            return false;
        }
        this.bug = null;
        return true;
    }

    setFood(food) {
        assert(Number.isInteger(food), "setFood failed: food should be int");
        this.food = food;
    }

    getFood() {
        return this.food;
    }

    markerAssert(funName, color, markerType) {
        assert(color instanceof Color, funName + " failed: wrong color type");
        assert(Number.isInteger(markerType), funName + " failed: food should be int");
        assert(markerType >= 0 && markerType < 6, funName + " failed: marker type not in range 0..5");
    }

    setMarker(color, markerType) {
        this.markerAssert("setMarker", color, markerType)
        if (color === Color.Red) this.redMarkers[markerType] = true;
        if (color === Color.Black) this.blackMarkers[markerType] = true;
    }

    clearMarker(color, markerType) {
        this.markerAssert("clearMarker", color, markerType)
        if (color === Color.Red) this.redMarkers[markerType] = false;
        if (color === Color.Black) this.blackMarkers[markerType] = false;
    }

    isFriendlyMarker(color, markerType) {
        this.markerAssert("isFriendlyMarker", color, markerType)
        if (color === Color.Red) return this.redMarkers[markerType];
        return this.blackMarkers[markerType];
    }

    isEnemyMarker(color, markerType) {
        this.markerAssert("isEnemyMarker", color, markerType)
        if (color === Color.Red) return this.blackMarkers[markerType];
        return this.redMarkers[markerType];
    }

    cellMatches(color, cellCondition) {
        assert(color instanceof Color, "cellMatches failed: wrong color type");
        assert(cellCondition instanceof CellCondition, "cellMatches failed: wrong cellCondition type");
        switch (cellCondition.name) {
            case "Inaccessible":
                return this.isOccupied() || this.isObstructed()
            case "friend":
            case "Friend":
                return this.isOccupied() && this.getBug().color === color;
            case "foe":
            case "Foe":
                return this.isOccupied() && this.getBug().color === color.opposite();
            case "friendwithfood":
            case "FriendWithFood":
                return this.isOccupied() && this.getBug().color === color && this.bug.hasFood;
            case "food":
            case "Food":
                return this.food !== 0;
            case "rock":
            case "Rock":
                return this.isObstructed();
            case "marker":
            case "Marker":
                return this.isFriendlyMarker(color, cellCondition.markerType);
            case "foemarker":
            case "FoeMarker":
                return this.isEnemyMarker(color, cellCondition.markerType);
            case "home":
            case "Home":
                //console.assert(this.isBase, "cell is not a base")
                return this.baseColor === color;
            case "foehome":
            case "FoeHome":
                //console.assert(this.isBase, "cell is not a base")
                return this.baseColor === color.opposite();
            default:
                assert(false, 'wrong condition ' + cellCondition.name);
                return false
        }
    }
}
