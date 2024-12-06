const fs = require('fs');
const input = fs.readFileSync('../resources/input.txt', 'utf-8');

const inputRows = input.split("\n");
const parsedInput = inputRows.map(row => row.split(""));

const obstaclePos = new Set();
let currentPosition = null

const rowsCount = inputRows.length;
const colsCount = parsedInput[0].length;

parsedInput.forEach((row, y) => row.forEach((cell, x) => {
        if (cell === '#') obstaclePos.add(`${x},${y}`)
        if (cell === '^') currentPosition = {x, y};
    }
));

const uniquePos = new Set();

const DIRECTIONS = {
    up: 1,
    right: 2,
    down: 3,
    left: 4,
}

let currentDirection = DIRECTIONS.up;
let lastObstaclePos = null;

const findUniquePositions = () => {
    let found = false;

    while(found === false) {
        switch (currentDirection) {
            case DIRECTIONS.up:
                if (handleUp()) found = true;
                break;
            case DIRECTIONS.right:
                if (handleRight()) found = true;
                break;
            case DIRECTIONS.down:
                if (handleDown()) found = true;
                break;
            case DIRECTIONS.left:
                if (handleLeft()) found = true;
                break;
        }
    }

    return uniquePos.size

}

const handleUp = () => {
    const rowsBetweenGuardAndTop = currentPosition.y;
    const x = currentPosition.x;
    
    for (let y = rowsBetweenGuardAndTop; y >= 0; y--) {
    
        if (obstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x, y: y + 1}
            currentDirection = DIRECTIONS.right;

            if (lastObstaclePos === `${x},${y},${currentDirection}`) {
                console.log('infinite loop found, must exit');
                return true;
            }

            lastObstaclePos = `${x},${y},${currentDirection}`;
            return false;
        } else if (y <= 0) {
            uniquePos.add(`${x},${y}`)
            console.log('reached end (up)!')
            console.log('unique positions: ', uniquePos.size);
            return true;
        } else {
            uniquePos.add(`${x},${y}`)
        }
    }
}

const handleRight = () => {
    const colsBetweenGuardAndRight = colsCount - 1 - currentPosition.x + 1 ;
    const y = currentPosition.y;

    for (let x = colsCount - colsBetweenGuardAndRight; x <= colsCount - 1; x++) {

        if (obstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x - 1, y: y}
            currentDirection = DIRECTIONS.down;

            if (lastObstaclePos === `${x},${y},${currentDirection}`) {
                console.log('infinite loop found, must exit');
                return true;
            }

            lastObstaclePos = `${x},${y},${currentDirection}`;
            return false;
        } else if (x >= colsCount - 1) {
            uniquePos.add(`${x},${y}`)
            console.log('reached end (right)!')
            console.log('unique positions: ', uniquePos.size);      
            return true;
        } else {
            uniquePos.add(`${x},${y}`)
        }   
    }

    return false;
}

const handleDown = () => {
    const rowsBetweenGuardAndBottom = rowsCount - 1 - currentPosition.y + 1;
    const x = currentPosition.x;

    for (let y = rowsCount - rowsBetweenGuardAndBottom; y <= rowsCount ; y++) {
        if (obstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x, y: y - 1}
            currentDirection = DIRECTIONS.left;

            if (lastObstaclePos === `${x},${y},${currentDirection}`) {
                console.log('infinite loop found, must exit');
                return true;
            }

            lastObstaclePos = `${x},${y},${currentDirection}`;
            return false;
        } else if (y >= rowsCount - 1) {
            uniquePos.add(`${x},${y}`)

            console.log('reached end (down)!')
            console.log('unique positions: ', uniquePos.size);
            return true;
        }{
            uniquePos.add(`${x},${y}`)
        }
    }

    return false
}

const handleLeft = () => {
    const colsBetweenGuardAndLeft = currentPosition.x;
    const y = currentPosition.y;

    for (let x = colsBetweenGuardAndLeft; x >= 0; x--) {
        if (obstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x + 1, y: y}
            currentDirection = DIRECTIONS.up;

            if (lastObstaclePos === `${x},${y},${currentDirection}`) {
                console.log('infinite loop found, must exit');
                return true;
            }

            lastObstaclePos = `${x},${y},${currentDirection}`;
            return false;
        } else if (x <= 0) {
            uniquePos.add(`${x},${y}`)

            console.log('reached end (left)!')
            console.log('unique positions: ', uniquePos.size);
            return true;
        } else {
            uniquePos.add(`${x},${y}`)
        }
    }

    return false;
}

findUniquePositions();
