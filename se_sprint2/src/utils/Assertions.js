export function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

export function assertStringShouldBeInt(str, funName) {
    assert(!isNaN(str) && !isNaN(parseFloat(str)), "in " + funName + ": string should be int")
}

export function assertDir(dir, funName) {
    assert(dir >= -1 && dir < 6, funName + ": Dir should be between -1 and 6");
}

export function assertMarker(marker, funName) {
    assert(marker >= 0 && marker < 6, funName + ": Marker should be between 0 and 6");
}
