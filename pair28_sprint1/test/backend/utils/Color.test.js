import {Colors, opposite_color} from "../../../backend/utils/Color";


describe("Color class", function() {
    it("red opposite", function() {
        expect(opposite_color(Colors.RED)).toBe(Colors.BLACK);
    });
    it("black opposite", function() {
        expect(opposite_color(Colors.BLACK)).toBe(Colors.RED);
    });
    it("none opposite", function() {
        expect(opposite_color(Colors.NONE)).toThrow(new Error("Color should be either Color.RED or Color.BLACK!"));
    });
});
