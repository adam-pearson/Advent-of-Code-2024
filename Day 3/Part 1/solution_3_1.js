const fs= require('fs');

function readReportsFromFile() {
    return fs.readFileSync('../resources/input.txt', 'utf-8');
}

function getUncorruptedMulInstructions(instructions) {
    return instructions.match(new RegExp(/mul\([0-9]+,[0-9]+\)/g))
        .map(instruction => instruction
            .replace('mul(', '')
            .replace(')', '')
            .split(',')
            .map(n => parseInt(n))
        );
}

function sumOfUncorruptedInstructions(instructions) {
    return instructions.reduce((acc, curr) => acc + (curr[0] * curr[1]), 0);
}

const input = readReportsFromFile();
const uncorruptedInstructions = getUncorruptedMulInstructions(input);

console.log('sumOfUncorruptedInstructions: ', sumOfUncorruptedInstructions(uncorruptedInstructions));