import {read_world} from "../../../backend/GameLogic/World";

describe("World class", function() {
    it("bad dimensions", function() {
        expect(read_world("/home/kir/assignments/se/pair28_sprint2/pair28_sprint1/test/res/map_bad_dimensions.txt")).toThrow(new Error("Bad dimensions"));
    });
    it("illegal value", function() {
        expect(read_world("/home/kir/assignments/se/pair28_sprint2/pair28_sprint1/test/res/map_bad_illegal_value.txt")).toThrow(new Error("Illegal char"));
    });
    it("outer border is missing", function() {
        expect(read_world("/home/kir/assignments/se/pair28_sprint2/pair28_sprint1/test/res/map_bad_outer_border.txt")).toThrow(new Error("Outer border is missing"));
    });
    it("bug swarm is missing", function() {
        expect(read_world("/home/kir/assignments/se/pair28_sprint2/pair28_sprint1/test/res/map_bad_bug_swarm_is_missing.txt")).toThrow(new Error("At least one swarm is missing"));
    });
    it("unlinked swamp", function() {
        expect(read_world("/home/kir/assignments/se/pair28_sprint2/pair28_sprint1/test/res/map_bad_unlinked_swamp.txt")).toThrow(new Error("Swarms should be linked."));
    });
    it("unlinked swamp", function() {
        let world = read_world("/home/kir/assignments/se/pair28_sprint2/pair28_sprint1/test/res/map_bad_unlinked_swamp.txt");
        expect(world.vertical_size).toBe(10);
        expect(world.horizontal_size).toBe(10);
    });
});