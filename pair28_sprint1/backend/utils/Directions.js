export const Directions = {
    LEFT: "LEFT",
    RIGHT: "RIGHT"
};
Object.freeze(Directions);

export function get_direction_from_string(string) {
    switch (string) {
        case "left":
            return Directions.LEFT;
        case "right":
            return Directions.RIGHT;
        default:
            throw new Error("Bad direction provided!");
    }
}
