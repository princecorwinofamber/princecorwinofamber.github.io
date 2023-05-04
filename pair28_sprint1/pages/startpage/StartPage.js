import { render } from "../../app.js";

import UploadPage from "../uploadpage/UploadPage.js";

import { Button } from "../../ui.js";

export default function StartPage() {
    let events = [];

    const btnClick = () => render(UploadPage());

    const [btnHTML, ...btnEvents] = Button("Start", btnClick);
    events = [...events, ...btnEvents];

    return ["Start Page", (`
        <div class="start-page">
            <h1>Welcome to Bug's World!</h1>
            ${btnHTML}
        </div>
    `), events];
}