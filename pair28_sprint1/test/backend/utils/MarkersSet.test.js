import {MarkersSet} from "../../../backend/utils/MarkersSet";

describe("MarkersSet class", function() {
    let markers_set = new MarkersSet();
    it("no marker set", function() {
        expect(markers_set.any()).toBe(false);
    });
    markers_set.set_marker(2);
    it("check marker which was set", function() {
        expect(markers_set.has(2)).toBe(true);
    });
    markers_set.set_marker(3);
    markers_set.clear_marker(2);
    it("check marker was cleared", function() {
        expect(markers_set.has(2)).toBe(false);
    });
    it("check marker was set before clear", function() {
        expect(markers_set.has(3)).toBe(true);
    });
});
