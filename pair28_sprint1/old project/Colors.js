const Colors = {
    RED: Symbol("red"),
    BLACK: Symbol("black"),
    NONE: Symbol("none")
};
Object.freeze(Colors);

function getOppositeColor(color) {
    if (color === Colors.RED)
        return Colors.BLACK
    if (color === Colors.BLACK)
        return Colors.RED
    else
        return Colors.NONE
}