import {expect} from "chai";
import World from "../src/logic/World.js";
import Cell from "../src/logic/Entities/Cell.js";
import Logger from "../src/logic/Logger.js";
import {Color} from "../src/logic/GeneralClasses/General.js";
import Bug from "../src/logic/Entities/Bug.js";
import SelabLogFormat from "../src/logic/StatisticFormats/SelabLogFormat.js";


describe("Logs and Statistics", () => {
    /**
     * Setups a world with most of the elements of bug world
     */
    function setupBigWorld() {
        const world = new World(3, 2, [
            [new Cell(false, 0, false), new Cell(true, 0, false), new Cell(false, 1, false)],
            [new Cell(false, 0, true, Color.Red), new Cell(false, 3, true, Color.Black), new Cell(false, 0, true, Color.Black)]
        ]);
        world.redBugsKilled = 1;
        world.blackBugsKilled = 5;
        const bug1 = new Bug(Color.Red, 0, 0, world, []);
        const bug2 = new Bug(Color.Black, 2, 0, world, []);
        bug2.hasFood = true;
        const bug3 = new Bug(Color.Red, 1, 1, world, []);
        bug3.direction = 3;
        const bug4 = new Bug(Color.Red, 2, 1, world, []);
        bug4.instructionPos = 2;

        world.cellAt(bug1.position).bug = bug1;
        world.cellAt(bug2.position).bug = bug2;
        world.cellAt(bug3.position).bug = bug3;
        world.cellAt(bug4.position).bug = bug4;

        return world;
    }
    describe("Logger", () => {
        function worldToString(world) {
            return `{world: ${world.width}x${world.height}}`;
        }

        class DummyLogFormat {
            accept(world) {
                return worldToString(world);
            }
        }

        it("Dummy logger", () => {
            const world = new World(2, 1, [[new Cell(false), new Cell(false)]]);
            const logger = new Logger(new DummyLogFormat());
            logger.log(world);
            const output = logger.getOutput();
            // check the informative log string
            expect(output.split('\n')[1]).equal(worldToString(world));
        });

        it("Selab logger", () => {
            const world = setupBigWorld();

            const logger = new Logger(new SelabLogFormat());

            logger.log(world);
            logger.log(world);
            const output = logger.getOutput();
            // Note: As bug id counter is global, its value may be different upon different test runs.
            //  Therefore, the easiest resolution is to test log's length
            expect(output.length).equal(952);
        })
    })

    describe("Statistics", () => {
        it("Simple statistics", () => {
            const world = setupBigWorld();

            const logger = new Logger(new SelabLogFormat());
            logger.log(world);
            logger.log(world);

            const expectedText = "Iteration #1\n" +
                "Amount of undetected food: 1\n" +
                "Red bugs remaining: 3\n" +
                "Red bugs killed: 1\n" +
                "Food brought home for red bugs: 0\n" +
                "Black bugs remaining: 1\n" +
                "Black bugs killed: 5\n" +
                "Food brought home for black bugs: 3";
            const statsText = logger.getStatisticsText();
            expect(statsText).equal(expectedText);
        })
    })
});
