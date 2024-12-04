const fs= require('fs');
const input = fs.readFileSync('../resources/input.txt', 'utf-8');

const parsedInput = input.split('\n').map(row => row.split(''));
const rowCount = parsedInput.length;
const colCount = parsedInput[0].length;

const directions = [
    {xOffset: 1, yOffset: 1},
    {xOffset: 1, yOffset: -1},
]

let doubleMasCount = 0;

const isInBounds = (x, y) => x >= 0 && x < rowCount && y >= 0 && y < colCount;
const isDiagonalInBounds = (x, y, xOffset, yOffset) =>
    isInBounds(x + xOffset, y + yOffset)
    && isInBounds(x - xOffset, y - yOffset);

parsedInput.forEach((row, x) => {
    row.forEach((cell, y) => {
        if (cell === 'A') {
            let masCount = 0;
            directions.forEach(({xOffset, yOffset}) => {
                if (!isDiagonalInBounds(x, y, xOffset, yOffset)) return;

                if (
                    (parsedInput[x + xOffset][y + yOffset] === 'M'
                    && parsedInput[x - xOffset][y - yOffset] === 'S')
                || (parsedInput[x + xOffset][y + yOffset] === 'S'
                    && parsedInput[x - xOffset][y - yOffset] === 'M')
                ) {
                    masCount++;
                }
            })

            if (masCount === 2) {
                doubleMasCount++;
            }
        }
    });
});

console.log(doubleMasCount);
