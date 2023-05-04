import {Colors, opposite_color} from "../../../backend/utils/Color.js";


describe("Color class", function() {
    it("red opposite", function() {
        expect(opposite_color(Colors.RED)).toEqual(Colors.BLACK);
    });
    it("black opposite", function() {
        expect(opposite_color(Colors.BLACK)).toEqual(Colors.RED);
    });
});
