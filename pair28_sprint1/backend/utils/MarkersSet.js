export class MarkersSet {
    markers_size = 6;
    markers = [false, false, false, false, false, false];

    has(index) {
        return this.markers[index];
    }

    any() {
        return this.markers.some((item) => item);
    }

    set_marker(index) {
        this.markers[index] = true;
    }

    clear_marker(index) {
        this.markers[index] = false;
    }
}