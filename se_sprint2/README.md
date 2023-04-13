# pair29_sprint2

Programmers:
- Andrey Kovalevskiy
- Alexander Kovrigin

### What have been implemented
- Supported broswer versions released before 2017 by changing js modules to the classic script loading system
- Added support for drawing red bugs. Previously, all bugs were drawn black.
- Fixed the bug where the bugs were created not in their nests, but in wrong cells.
- Added support for drawing food
- Added support for bug death & killing
  - Due to ambiguity of the tech specification, a bug may attempt to `#kill`
    that is in the cell before him (sensed cell).
  - Upon the death the killed bug drops the food (if carried) onto the cell he was killed on.
- Added logging functionality (both as logic and UI element)
- Added Selab logging format
- Added statistics (connected to the simulator and the matching UI element)
- Restored the original JS module system to restore compatibility with tests
- Added corresponding tests
- Improved user interface and simulation graphical elements
- The files provided on the "options" page are now actually used instead of being discarded. They are passed into the simulator now.
- Added check for correctness of the provided map file
- Added check for correctness of the provided iteration number

---

### How to run project
-clone repository

-open index.html file

# pair29_sprint1

link on clamv:
- http://clabsql.clamv.jacobs-university.de/~rvsemirnov/pair29_sprint1/

Programmers:
- Miron Ganin
- Roman Vsemirnov

### General
The game has three main states: the starting state, running state, and ending state.

### What has been done so far

- start game
- put the files of the world and bugs, set the game parameters(there is a bug that needs to be fixed)
- loading the assembly code of beetles and the world map into the game
- Display game with bugs
- checking the correctness of the files of bugs and the world
- program testing and verification system

### What have been implemented
- Now, some of the functionality of the game has been implemented. 
- The functionality of loading the map from a file has been implemented.
- The loaded map is rendered on canvas. 
- Each cycle the map is redrawn.
- Implemented uploading and parsing of the file describing the brain of the bug.
- The bugs act according to the file describing their brain.
- Tests and code comments are written for the main classes.
- Food and merkers works, but not dysplays
- Entities classes with almost all the functions and fields described,  desribed in specification document. Such as:

```javascript
class World{}
class Cell{}
class Bug{}
```
And several auxiliary classes to create exceptions, general classes like Color and CellCondition, map loading, Position, etc.
```javascript
class Color{}
class CellCondition{}
class Position{}
class Initializer{}
```
Class Simulator, that can simulate cycles of the game.
```javascript
class Simulator{}
```

Now the game has 3 different windows
```
start.html
options.html
board.html
```
and their styling files in directory /ui


![2023-03-24-21-06-53](https://user-images.githubusercontent.com/71932958/227629049-b4d7ef6c-c8ed-4ea6-bb53-9088f6ad3e67.gif)



### what should be done in the future

- bug death to game logic
- add food to game display
- add to the ui the display of the game state, the number of frames, the settings buttons
- add windows with game results and return to the beginning

### How to run project
-clone repository

-open start.html file

-enjoy

### How to run tests

tests use library http://mochajs.org <br>
To install follow the instructions on the library website <br>
When you have cloned the repository, use the "npm install" command to load the necessary dependencies. To run the tests themselves, use the "npm run" command.
