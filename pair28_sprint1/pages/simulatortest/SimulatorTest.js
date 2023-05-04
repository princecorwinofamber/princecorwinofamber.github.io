import { render } from "../../app.js";

import UploadPage from "../uploadpage/UploadPage.js";

import { Button } from "../../ui.js";

export default function SimulatorTestPage() {
    let events = [];

    return ["Simulator Test Page", (`
        <div>
            <h1>Simulator Test</h1>
        </div>
    `), events];
}
