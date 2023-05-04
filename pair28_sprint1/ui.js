import { makeRandomId } from "./functions.js"

export function Button(text, click) {
    const id = makeRandomId();

    return [(`
        <div
            class="button"
            id="${id}"
        >${text}</div>
    `), { id, click }];
}

export function InputFile(type, change) {
    const id = makeRandomId();

    return [(`
        <label class="file-input">
            <input
                id="${id}"
                type="file"
                accept="${type}"
            />

            <span></span>
        </label>
    `), { id, change }];
}
