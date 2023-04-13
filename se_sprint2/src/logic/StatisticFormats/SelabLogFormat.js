/**
 * Selab log formatter (from the specification).
 *
 * Accepts current world snapshot and produces a log message to be appended to the log file.
 */
export default class SelabLogFormat {
    header =
        "========== cell ========== ======= bug ======\n" +
        "        b b\n" +
        "        a i                    cbd\n" +
        "pos pos s t  red    black      oii\n" +
        " x   y  e s  marks  marks  id  ltr state rest\n" +
        "=== === = == ====== ====== === === ===== ====\n";

    accept(world) {
        // accumulator string
        let result = this.header;
        for (let j = 0; j < world.width; j++) { // Looping through each column
            for (let i = 0; i < world.height; i++) { // Looping through each row
                // get a cell
                const cell = world.cells[i][j];

                // x and y coordinates of the cell (padded to 3 chars)
                const x = i.toString().padStart(3, '0');
                const y = i.toString().padStart(3, '0');
                // get bug base status
                const base = cell.isBase ? cell.baseColor.short : ' ';
                // get bits number (padded to 2 chars)
                const bits = cell.food.toString().padStart(2, '0');
                // get markers
                const redMarks = markersToString(cell.redMarkers);
                const blackMarks = markersToString(cell.blackMarkers);
                // assemble cell entry
                let entry = `${x} ${y} ${base} ${bits} ${redMarks} ${blackMarks}`;

                const bug = cell.bug;
                // if there is a bug in the cell
                if (bug != null) {
                    // get bug id
                    const bugId = bug.bugId.toString().padStart(3, '0');
                    // get bug color short representation
                    const bugColor = bug.color.short;
                    // check carrying food
                    const bugBit = bug.hasFood ? 'X' : '_';
                    // log direction of the bug
                    const bugDir = bug.direction;
                    // state machine state no.
                    const bugState = bug.instructionPos.toString().padStart(5, '0');
                    // resting time
                    const bugRest = bug.resting.toString().padStart(4, '0');
                    // assemble bug entry
                    const bugEntry = `${bugId} ${bugColor}${bugBit}${bugDir} ${bugState} ${bugRest}`;
                    // concatenate with the cell information
                    entry += ` ${bugEntry}`;
                }
                entry += '\n';
                // add to the log message
                result += entry;
            }
        }
        return result;
    }
}

/**
 * Utility function to transform markers array into a string
 */
function markersToString(markers) {
    return markers.map((currElement, index) => {
        return currElement ? (markers.length - index - 1).toString() : '_'
    }).join('')
}

