import { render } from "../../app.js";
import { runBoard } from "../../board.js";

import { makeRandomId } from "../../functions.js";
import { read_world } from "../../backend/GameLogic/World.js";
import { read_code } from "../../backend/BugAssembler/Parser.js";

import StartPage from "../../pages/startpage/StartPage.js";

import { Button, InputFile } from "../../ui.js";

export default function UploadPage() {
    // the following 3 variables are passes to the simulation page
    // if any of these variables is null, it means that the corresponding file was not uploaded yet or the uploaded file was incorrect
    var world = null;
    var bug_code_1 = null;
    var bug_code_2 = null;
    // the same for iteration limit and logging toggle
    var max_iter = 100000;
    var is_logging_enabled = false;

    let events = [];

    let cnt = 0
    const worldMapHandler = ({ target }) => {
        if (target.files.length) {
            target.nextElementSibling.innerHTML = target.files[0].name;
        } else {
            return;
        }
        const file = target.files[0];
        // Write the loaded world into the world variable that will be passed to simulator. Display the error in case of failure.
        read_world(file).then((loaded_world) => {
            console.log("loaded_world", loaded_world);
            world = loaded_world;
        }).catch((error) => {
            alert(error);
        });

        console.log(read_world(file));
        cnt += 1;
    }

    const bugs1Handler = ({ target }) => {
        if (target.files.length) {
            target.nextElementSibling.innerHTML = target.files[0].name;
        } else {
            return;
        }
        const file = target.files[0];
        // Write the loaded code for the first bug into the bug_code_1 variable that will be passed to simulator. Display the error in case of failure.
        read_code(file).then((loaded_code) => {
            bug_code_1 = loaded_code;
            window.bug_code_1 = bug_code_1;
        }).catch((error) => {
            alert(error);
        });
        console.log("bug code 1 was uploaded");

        console.log("bugs 1 was uploaded");
        cnt += 1;
    }

    const bugs2Handler = ({ target }) => {
        if (target.files.length) {
            target.nextElementSibling.innerHTML = target.files[0].name;
        } else {
            return;
        }
        const file = target.files[0];
        // Write the loaded code for the second bug into the bug_code_2 variable that will be passed to simulator. Display the error in case of failure.
        read_code(file).then((loaded_code) => {
            bug_code_2 = loaded_code;
        }).catch((error) => {
            alert(error);
        });
        console.log("bug code 2 was uploaded");
        
        console.log("bugs 2 was uploaded");
        cnt += 1;
    }

    const iterHandler = ({ target }) => {
        if (target.value < 1) target.value = 1;
        max_iter = Number(target.value);
        if (max_iter == NaN) {
            max_iter = 500;
        }
    }

    const loggerHandler = ({ target }) => {
        console.dir(target.checked);
        is_logging_enabled = target.checked;
    }

    const backHandler = () => render(StartPage());
    
    const nextHandler = () => {
        console.log("next button clicked");
        // render(SimulatorTestPage());
        if (world == null || bug_code_1 == null || bug_code_2 == null) {
            alert("Some of the files were not loaded or are incorrect");
        } else {
            runBoard(world, bug_code_1, bug_code_2, max_iter, is_logging_enabled);
        }
    }


    const [wmInputHTML, ...wmInputEvents] = InputFile(".txt", worldMapHandler);
    const [bugs1InputHTML, ...bugs1InputEvents] = InputFile(".txt", bugs1Handler);
    const [bugs2InputHTML, ...bugs2InputEvents] = InputFile(".txt", bugs2Handler);
    events = [...events, ...wmInputEvents, ...bugs1InputEvents, ...bugs2InputEvents];

    const iterInputId = makeRandomId();
    events.push({ id: iterInputId, change: iterHandler });
    const loggerInputId = makeRandomId();
    events.push({ id: loggerInputId, change: loggerHandler });

    const [backBtnHTML, ...backBtnEvents] = Button("Back", backHandler);
    const [nextBtnHTML, ...nextBtnEvents] = Button("Start", nextHandler);
    events = [...events, ...backBtnEvents, ...nextBtnEvents];

    return ["Upload Page", (`
        <div class="upload-page">
            <header><h1>Bug's World</h1></header>

            <main>
                <div class="w-upload">
                    <div class="item">
                        <span>Please upload a world map file:</span>
                        ${wmInputHTML}
                    </div>

                    <div class="item">
                        <span>Please upload bug assembler source code #1:</span>
                        ${bugs1InputHTML}
                    </div>

                    <div class="item">
                        <span>Please upload bug assembler source code #2:</span>
                        ${bugs2InputHTML}
                    </div>

                    <div class="item">
                        <span>Please select the number of iterations: </span>

                        <input id="${iterInputId}" type="number" min="1" value="100000" />
                    </div>

                    <div class="item">
                        <span>Log the results of the session:</span>

                        <input id="${loggerInputId}" type="checkbox" />
                    </div>

                    <div class="w-btn">
                        ${backBtnHTML}
                        ${nextBtnHTML}
                    </div>
                </div>
            </main>
        </div>
    `), events];
}
