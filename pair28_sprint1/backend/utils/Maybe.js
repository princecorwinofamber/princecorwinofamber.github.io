export class Maybe {
    toString() {
        return "Maybe()"
    }
}
export class Nothing extends Maybe {

    toString() {
        return "Nothing()";
    }
}
export class Just extends Maybe {
    constructor(value) {
        super();
        this.value = value;
    }

    get_value() {
        return this.value;
    }

    toString() {
        return `Just(${(this.value)})`;
    }
}

export function has_value(maybe_object) {
    return maybe_object instanceof Just;
}