import StartPage from "./pages/startpage/StartPage.js";
import {make_instruction_from_string, parse_text} from "./backend/BugAssembler/Parser.js";

const head = document.querySelector("head");
const title = head.querySelector("title");
const content = document.getElementById("content");

const stylesheetsPaths = [
    "./style.css",
    "./pages/startpage/StartPage.css",
    "./pages/uploadpage/UploadPage.css"
];

window.make_instruction_from_string = make_instruction_from_string;
window.parse_text = parse_text;

for (const path of stylesheetsPaths) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;

    head.appendChild(link);
}

export function render([pageName, html, events]) {
    content.innerHTML = html;
    title.innerHTML = pageName;

    for (const elem of events) {
        const node = document.getElementById(elem.id);
        for (const key in elem) {
            if (key === "id") continue;
            node.addEventListener(key, elem[key]);
        }
    }
}

render(StartPage());
