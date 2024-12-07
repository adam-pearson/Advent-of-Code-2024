const fs = require('fs');
const { start } = require('repl');
const input = fs.readFileSync('../resources/input.txt', 'utf-8');

const inputRows = input.split("\n");
const parsedInput = inputRows.map(row => row.split(""));

const obstaclePos = new Set();

let startingPosition = null;
let currentPosition = null

const rowsCount = inputRows.length;
const colsCount = parsedInput[0].length;

parsedInput.forEach((row, y) => row.forEach((cell, x) => {
        if (cell === '#') obstaclePos.add(`${x},${y}`)
        if (cell === '^') currentPosition = startingPosition = {x, y};
    }
));

let modifiedObstaclePos = new Set(obstaclePos)

const uniquePos = new Set();

const DIRECTIONS = {
    up: 1,
    right: 2,
    down: 3,
    left: 4,
}

let currentDirection = DIRECTIONS.up;
let hitObstaclePositionsWithDirections = new Set();

const findLoops = () => {
    let loopFound = false;
    let exitFound = false

    const limit = Math.max(uniquePos.size * 100, 10) ;
    let i = 0;
    while(loopFound === false && exitFound === false && (uniquePos.size === 0 || i <= limit)) {
        let res = null;

        switch (currentDirection) {
            case DIRECTIONS.up:
                res = handleUp();
                if (res === -1) loopFound = true; // time loop found
                if (res === 1) exitFound = true; // exit found
                break;
            case DIRECTIONS.right:
                res = handleRight();
                if (res === -1) loopFound = true; // time loop found
                if (res === 1) exitFound = true; // exit found
                break;
            case DIRECTIONS.down:
                res = handleDown();
                if (res === -1) loopFound = true; // time loop found
                if (res === 1) exitFound = true; // exit found
                break;
            case DIRECTIONS.left:
                res = handleLeft();
                if (res === -1) loopFound = true; // time loop found
                if (res === 1) exitFound = true; // exit found
                break;
        }

        i++;
    }

    return loopFound;
}

const handleUp = () => {
    const rowsBetweenGuardAndTop = currentPosition.y;
    const x = currentPosition.x;
    
    for (let y = rowsBetweenGuardAndTop; y >= 0; y--) {
    
        if (modifiedObstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x, y: y + 1}
            currentDirection = DIRECTIONS.right;

            if (hitObstaclePositionsWithDirections.has(`${x},${y},${currentDirection}`)) {
                return -1;
            }

            hitObstaclePositionsWithDirections.add(`${x},${y},${currentDirection}`);
            return 0;
        } else if (y <= 0) {
            uniquePos.add(`${x},${y}`)
            return 1;
        } else {
            uniquePos.add(`${x},${y}`)
        }
    }

    return 0;
}

const handleRight = () => {
    const colsBetweenGuardAndRight = colsCount - 1 - currentPosition.x + 1 ;
    const y = currentPosition.y;

    for (let x = colsCount - colsBetweenGuardAndRight; x <= colsCount - 1; x++) {

        if (modifiedObstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x - 1, y: y}
            currentDirection = DIRECTIONS.down;

            if (hitObstaclePositionsWithDirections.has(`${x},${y},${currentDirection}`)) {
                return -1;
            }

            hitObstaclePositionsWithDirections.add(`${x},${y},${currentDirection}`);
            return 0;
        } else if (x >= colsCount - 1) {
            uniquePos.add(`${x},${y}`)      
            return 1;
        } else {
            uniquePos.add(`${x},${y}`)
        }   
    }

    return 0;
}

const handleDown = () => {
    const rowsBetweenGuardAndBottom = rowsCount - 1 - currentPosition.y + 1;
    const x = currentPosition.x;

    for (let y = rowsCount - rowsBetweenGuardAndBottom; y <= rowsCount ; y++) {
        if (modifiedObstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x, y: y - 1}
            currentDirection = DIRECTIONS.left;


            if (hitObstaclePositionsWithDirections.has(`${x},${y},${currentDirection}`)) {
                return -1;
            }

            hitObstaclePositionsWithDirections.add(`${x},${y},${currentDirection}`);
            return 0;
        } else if (y >= rowsCount - 1) {
            uniquePos.add(`${x},${y}`)
            return 1;
        }{
            uniquePos.add(`${x},${y}`)
        }
    }

    return 0
}

const handleLeft = () => {
    const colsBetweenGuardAndLeft = currentPosition.x;
    const y = currentPosition.y;

    for (let x = colsBetweenGuardAndLeft; x >= 0; x--) {
        if (modifiedObstaclePos.has(`${x},${y}`)) {
            currentPosition = {x: x + 1, y: y}
            currentDirection = DIRECTIONS.up;


            if (hitObstaclePositionsWithDirections.has(`${x},${y},${currentDirection}`)) {
                return -1;
            }

            hitObstaclePositionsWithDirections.add(`${x},${y},${currentDirection}`);
            return 0;
        } else if (x <= 0) {
            uniquePos.add(`${x},${y}`)
            return 1;
        } else {
            uniquePos.add(`${x},${y}`)
        }
    }

    return 0;
}

const resetState = () => {
    currentPosition = startingPosition;
    hitObstaclePositionsWithDirections = new Set();
    modifiedObstaclePos = new Set(obstaclePos);
    currentDirection = DIRECTIONS.up;
}

findLoops();
resetState();

let infLoopCount = 0;
uniquePos.forEach(pos => {
    const [x, y] = pos.split(',');

    if (x === startingPosition.x && y == startingPosition.y) return;

    modifiedObstaclePos.add(`${x},${y}`)
    if (findLoops()) {
        infLoopCount++;
    }

    resetState();
})

console.log('possible inf loops: ', infLoopCount);
