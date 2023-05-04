import {Color} from './GeneralClasses/General.js';

/**
 * Class for logging information and statistics generation
 */
export default class Logger {
    /**
     * Create a logger with a given log format
     * @param format Log format
     * @param maxIter Number of iterations
     * @see SelabLogFormat
     */
    constructor(format, maxIter) {
        this.format = format;
        this.maxIter = maxIter;
        this.logOutput = "";
        this.statistics = "";
        this.curIter = 0;
    }

    /**
     * Logs the snapshot. Generates and saves a corresponding log message and statistics text.
     * @param world
     */
    log(world) {
        const iter = this.curIter++;
        // get log message
        const logMessage = this.format.accept(world);
        // save logs
        this.logOutput += `After cycle ${iter}...\n${logMessage}\n`;
        // update statistics
        this.statistics = `Iteration #${iter}/${this.maxIter}\n` +
                          `Amount of undetected food: ${world.calcFoodRemaining()}\n` +
                          `Red bugs remaining: ${world.calcBugsAlive(Color.Red)}\n` +
                          `Red bugs killed: ${world.redBugsKilled}\n` +
                          `Food brought home for red bugs: ${world.calcFoodSecured(Color.Red)}\n` +
                          `Black bugs remaining: ${world.calcBugsAlive(Color.Black)}\n` +
                          `Black bugs killed: ${world.blackBugsKilled}\n` +
                          `Food brought home for black bugs: ${world.calcFoodSecured(Color.Black)}`;
    }

    getOutput() {
        return this.logOutput;
    }

    getStatisticsText() {
        return this.statistics;
    }
}