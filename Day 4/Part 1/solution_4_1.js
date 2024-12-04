const fs= require('fs');
const input = fs.readFileSync('../resources/test.txt', 'utf-8');

const parsedInput = input.split('\n').map(row => row.split(''));
const rowCount = parsedInput.length;
const colCount = parsedInput[0].length;

const directions = [
    { xOffset: 0, yOffset: 1 },  // right
    { xOffset: 1, yOffset: 0 },  // down
    { xOffset: 0, yOffset: -1 }, // left
    { xOffset: -1, yOffset: 0 }, // up
    { xOffset: 1, yOffset: 1 },  // down-right
    { xOffset: 1, yOffset: -1 }, // up-right
    { xOffset: -1, yOffset: -1 },// up-left
    { xOffset: -1, yOffset: 1 }, // down-left
]

let xmasCount = 0;

const isInBounds = (x, y) => x >= 0 && x < rowCount && y >= 0 && y < colCount;

parsedInput.forEach((row, x) => {
    row.forEach((cell, y) => {
        if (cell === 'X') {
            directions.forEach(({xOffset, yOffset}) => {
                if (!(isInBounds(x + xOffset * 3, y + yOffset * 3))) return;

                if (parsedInput[x + xOffset][y + yOffset] === 'M'
                    && parsedInput[x + xOffset * 2][y + yOffset * 2] === 'A'
                    && parsedInput[x + xOffset * 3][y + yOffset * 3] === 'S') {
                    xmasCount++;
                }
            })
        }
    });
});

console.log(xmasCount);
