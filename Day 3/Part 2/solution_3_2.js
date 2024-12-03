const fs= require('fs');

function readReportsFromFile() {
    return fs.readFileSync('../resources/input.txt', 'utf-8');
}

function getValidMulInstructions(instructions) {
    const re = new RegExp(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g);

    const matches = instructions.match(re);

    let doing = true;
    return matches.filter(match => {
        if (match === 'do()') {
            doing = true;
            return false;
        } else if (match === 'don\'t()') {
            doing = false;
            return false;
        } else if (doing) {
            return true;
        }

        return false;
    }).map(instruction => instruction
        .replace('mul(', '')
        .replace(')', '')
        .split(',')
    );
}

function sumOfUncorruptedInstructions(instructions) {
    return instructions.reduce((acc, curr) => acc + (+curr[0] * +curr[1]), 0);
}

const input = readReportsFromFile();
const uncorruptedInstructions = getValidMulInstructions(input);

console.log('sumOfUncorruptedInstructions: ', sumOfUncorruptedInstructions(uncorruptedInstructions));