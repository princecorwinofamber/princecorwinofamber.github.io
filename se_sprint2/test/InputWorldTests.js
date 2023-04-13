import {validateMap} from "../src/logic/FileValidators/validateMap.js";
import {expect} from "chai";

describe('InputWorldTests', () => {
    it('no border parsing', () => {
        const noBorder =
            "10\n" +
            "10\n" +
            "# . # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - . - # #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# + + + + + 5 . . #\n" +
            "# + + + + + + # . #\n" +
            "# + + + + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";
        expect(validateMap(noBorder)).false;
    });

    it ('incorrect size', () => {
        const incorrectSize =
            "10\n" +
            "11\n" +
            "# # # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - . - # #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# + + + + + 5 . . #\n" +
            "# + + + + + + # . #\n" +
            "# + + + + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";
        expect(validateMap(incorrectSize)).false;
    });

    it ('notConnectedSwarm', () => {
        const notConnectedSwarm =
            "10\n" +
            "10\n" +
            "# # # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - . - # #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# + + . + + 5 . . #\n" +
            "# + + . + + + # . #\n" +
            "# + + . + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";
        expect(validateMap(notConnectedSwarm)).false;
    });

    it('food over 9', () => {
        const foodOver9 =
            "10\n" +
            "10\n" +
            "# # # # # # # # # #\n" +
            "# 9 10 . . . . 3 3 #\n" +
            "# 9 # . - - - . - # #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# + + . + + 5 . . #\n" +
            "# + + . + + + # . #\n" +
            "# + + . + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";
        expect(validateMap(foodOver9)).false;
    });

    it('missingSwarm', () => {
        const missingSwarm =
            "10\n" +
            "10\n" +
            "# # # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - . - # #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# . . . . . 5 . . #\n" +
            "# . . . . . . # . #\n" +
            "# . . . . . . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";
        expect(validateMap(missingSwarm)).false;
    });

    it('valid', () => {
        const correctInput =
            "10\n" +
            "10\n" +
            "# # # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - . - # #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# + + + + + 5 . . #\n" +
            "# + + + + + + # . #\n" +
            "# + + + + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";
        expect(validateMap(correctInput)).true;
    });

    it('valid with crlf', () => {
        const correctInput =
            "10\r\n" +
            "10\r\n" +
            "# # # # # # # # # #\r\n" +
            "# 9 9 . . . . 3 3 #\r\n" +
            "# 9 # . - - - . - # #\r\n" +
            "# . # - - - - - - #\r\n" +
            "# . . 5 - - - - - #\r\n" +
            "# + + + + + 5 . . #\r\n" +
            "# + + + + + + # . #\r\n" +
            "# + + + + + . # 9 #\r\n" +
            "# 3 3 . . . . 9 9 #\r\n" +
            "# # # # # # # # # #";
        expect(validateMap(correctInput)).true;
    });
});
