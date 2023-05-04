# Name

Bug's World

## Description

The project consist of website designed to simulate the software-defined behavior of bugs located in a custom field.
The behavior of the bug depends on a special assembler-like language program and represents the
so-called brain of the bug. The user runs the simulation and observes the ants.

## Latest Developments

### Front-End
- All webpages were created and linked (Only exception is the end.html file. This is because game ending should trigger
this page, while all other pages can be accessed through buttons).
- The following files were completed in terms of content and only await minor formatting (design changes) and
integration with the back-end: style.css, index.html, upload.html, game.html, settings.html, quit.html, end.html.
- The style.css file contains our shortcuts for webpage formatting, including convenient classes for creating buttons
of various sizes, clean introduction of webpage links through minimalistic buttons, background optionality for the
webpages, and quick shortcuts for proper display of content through divisions.
- In all pages, we have followed the specifications, except whenever we had suggestions that would improve the design.
Our new improvements include: Adding the possibility of background to the webpages, new buttons for easing the movement
between the pages and increasing the logic (new "back" button in the upload.html, "apply" button in the settings.html,
"pause" button in the game.html). The "apply" button allows the user to either play and check the settings without
changing the game environment or ensuring the changes made to be applied to the current simulation. The "pause" button
allows the user to pause the game in case there is a need to perform another activity without having the simulation run
in the background.
- Defined the language of the files as English to ensure proper visualization of the characters.
- Used buttons containing references (links) to other files, as specified by the specifications provided.
- Used a combination of label and input elements for creating the interactive components of the webpage which make use
of user input in different formats.
- Commented clearly all files, ensuring comprehension for future use.

### Back-End

- All structures stated in the UML diagram were created (bug assembler, game logic, etc.).
- On our discretion, we think the entity "bugs" should not belong to the worldcell as it complicates the system.

## Future Tasks

- Unite front and back-end.
- Implement game and log visualization for game.html.
- Implement the instructions for all structures created.


## Authors and Acknowledgements

Федор Кудрявцев (Fedor Kudriavtsev) and Masson Chacón

## Links

### Link for access to webpage:

http://clabsql.clamv.jacobs-university.de/~mchacon/

### Relevant resources used for creating the front-end:

https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/

Link above was used to learn how to exactly center objects without having to play too much with the objects.

https://www.w3schools.com/howto/howto_css_block_buttons.asp

Link above used for formatting buttons

https://www.youtube.com/watch?v=zHZRFwWQt2w&t=410s

Video for getting the background image.

https://unsplash.com/photos/L-1hBbNj4Ug?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink

Ants photo above

https://www.w3schools.com/html/html_form_input_types.asp

Useful resource for the input types above