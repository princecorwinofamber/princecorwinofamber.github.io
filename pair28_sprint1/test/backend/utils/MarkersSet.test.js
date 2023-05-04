import {MarkersSet} from "../../../backend/utils/MarkersSet.js";

describe("MarkersSet class", function() {
    it("no marker set", function() {
        let markers_set = new MarkersSet();
        expect(markers_set.any()).toEqual(false);
    });
    it("check marker which was set", function() {
        let markers_set = new MarkersSet();
        markers_set.set_marker(2);
        expect(markers_set.has(2)).toEqual(true);
    });
    it("check marker was cleared", function() {
        let markers_set = new MarkersSet();
        markers_set.set_marker(2);
        markers_set.set_marker(3);
        markers_set.clear_marker(2);
        expect(markers_set.has(2)).toEqual(false);
    });
    it("check marker was set before clear", function() {
        let markers_set = new MarkersSet();
        markers_set.set_marker(2);
        markers_set.set_marker(3);
        markers_set.clear_marker(2);
        expect(markers_set.has(3)).toEqual(true);
    });
});
