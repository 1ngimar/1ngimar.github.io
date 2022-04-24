class Step {
    constructor(dx, dy, typeID) {
        this.dx = dx;
        this.dy = dy;
        this.typeID = typeID; // empty = 0, sheep = 1, wolf = 2
    }
}

function allOptions() {
    return [
        new Step(1, 0, 0),     // Right
        new Step(-1, 0, 0),    // Left
        new Step(0, 1, 0),     // Up
        new Step(0, -1, 0)     // Down
    ];
}

function pickRandomOption(validOptions) {
    let size = validOptions.length;
    if (size === 1) {
        return 0;
    }
    let choice = (Math.random()); // * size later
    if (size === 2) {
        if (choice < 0.5) {
            return 0;
        }
        return 1;
    }
    if (size === 3) {
        if (choice < (1.0 / 3.0)) {
            return 0;
        }
        if (choice < (2.0 / 3.0)) {
            return 1;
        }
        return 2;
    }
    if (size === 4) {
        if (choice < (1.0 / 4.0)) {
            return 0;
        }
        if (choice < (0.5)) {
            return 1;
        }
        if (choice < (3.0 / 4.0)) {
            return 2;
        }
        return 3;
    }
    console.log("random function failed");
    return -1;
}

class Spot {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = i * spacing;
        this.y = j * spacing;
        this.options = allOptions();
        this.hasWolf = false;
        this.hasSheep = false;
    }

    sheepEaten() {
        this.hasSheep = false;
        // this.options = allOptions();
    }

    wolfDied() {
        this.hasWolf = false;
    }

    nextSpot(typeID) {
        let validOptions = [];
        let xy = [0, 0];
        for (let option of this.options) {
            let newX = this.i + option.dx;
            let newY = this.j + option.dy;
            if (leavingBoard(newX, newY)) {
                xy = goToOtherSide(newX, newY);
                option.dx = xy[0] - this.i;
                option.dy = xy[1] - this.j;
            }
            validOptions.push(option);
        }

        if (validOptions.length > 0) {
            let choice = pickRandomOption(validOptions);
            let step = validOptions[choice];
            // step.tried = true;
            if (typeID === 1) {
                step.hasSheep = true;
            }
            else if (typeID === 2) {
                step.hasWolf = true;
            }
            return grid[this.i + step.dx][this.j + step.dy];
        }
        return undefined;
    }
}