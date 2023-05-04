import {BugCondition} from "../../../backend/utils/BugCondition.js";
import {Condition} from "../../../backend/utils/Condition.js";
import {has_value} from "../../../backend/utils/Maybe.js";

describe("Bug condition class", function() {
    let bug_cond_not_marker = new BugCondition(Condition.FOOD);
    it("non-marker contains type", function() {
        expect(bug_cond_not_marker.get_condition_type()).toBe(Condition.FOOD);
    });
    it("non-marker doesn't contain index", function() {
        expect(has_value(bug_cond_not_marker.maybe_marker_index)).toBe(false);
    });

    let marker_bug_cond = new BugCondition(Condition.MARKER, 3);
    it("marker contains type", function() {
        expect(marker_bug_cond.get_condition_type()).toBe(Condition.MARKER);
    });
    it("marker does contain index", function() {
        expect(has_value(marker_bug_cond.maybe_marker_index)).toBe(true);
        expect(marker_bug_cond.get_marker_index()).toBe(3);
    });
});
