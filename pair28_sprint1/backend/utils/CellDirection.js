
export const CellDirection = {
    HERE: "HERE",
    LEFT_AHEAD: "LEFT_AHEAD",
    RIGHT_AHEAD: "RIGHT_AHEAD",
    AHEAD: "AHEAD"
};
Object.freeze(CellDirection);

export function get_cell_direction_from_string(string) {
    switch (string) {
        case "here":
            return CellDirection.HERE;
        case "ahead":
            return CellDirection.AHEAD;
        case "left_ahead":
            return CellDirection.LEFT_AHEAD;
        case "right_ahead":
            return CellDirection.RIGHT_AHEAD;
        default:
            throw new Error("Bad cell direction provided!");
    }
}