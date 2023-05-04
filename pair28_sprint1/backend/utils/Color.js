export const Colors = {
    RED: Symbol("red"),
    BLACK: Symbol("black")
};
Object.freeze(Colors);

export function opposite_color(color) {
    if(color === Colors.RED) {
        return Colors.BLACK;
    } else if (color === Colors.BLACK) {
        return Colors.RED;
    } else {
        throw new Error("Color should be either Color.RED or Color.BLACK!");
    }
}