class WorldCell {
    obstructed = false;
    bug;
    food = 0;
    marker_color = Colors.NONE;
    marker = 0
    base = Colors.NONE;

    constructor(char) {
        if (char === '#')
            this.obstructed = true
        if (char === '-')
            this.base = Colors.RED
        if (char === '+')
            this.base = Colors.BLACK
        if (char >= '0' && char <= '9')
            this.food = Number(char)
    }

    isObstructed() { return this.obstructed}
    isOccupied() {
        return this.bug !== Colors.NONE
    }
    getBug() {return this.bug}
    setBug(bug) {
        this.bug = bug
    }
    removeBug() {
        if (this.bug !== 0){
            this.bug = 0
            return true
        }
        return false

    }
    setFood(food) {
        console.assert (typeof food == 'number')
        this.food = food
    }

    isFriendlyBase(color) {
        return color === this.base
    }
    isEnemyBase(color) {
        return color === getOppositeColor(this.base)
    }
    setMarker(color, number) {
        this.marker = number
        this.marker_color = color
    }
    clearMarker() {
        this.marker = 0
        this.marker_color = Colors.NONE
    }
    isFriendlyMarker(color) {
        return this.marker_color === color
    }
    isEnemyMarker(color) {
        return getOppositeColor(this.marker_color) === color
    }
    cellMatches() {
        // TODO I dont understand what it is supposed to do
    }
    toString() {
        // TODO
    }
}