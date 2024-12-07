const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split("\n").map(l => l.split(": "));

const start = performance.now();

const backtrack = (goal, numbers, curr = 0, index = 0) => {
    if (index >= numbers.length) return curr === goal;

    const next = numbers[index];

    const nextSum = curr + next;
    const nextProduct = curr * next;
    const nextConcat = curr > 0 ? parseInt(String(curr) + String(next)) : next;

    const sumRes = backtrack(goal, numbers, nextSum, index + 1);
    const prodRes = nextProduct > 0 ? backtrack(goal, numbers, nextProduct, index + 1) : false;
    const concatRes = backtrack(goal, numbers, parseInt(nextConcat), index + 1);

    return (sumRes || prodRes || concatRes);
};

const result = parsedInput.reduce((acc, curr) => {
    const goal = +curr[0];
    const numbers = curr[1].split(" ").map(Number);

    if (numbers.length === 1) {
        return acc + (numbers[0] === goal ? goal : 0);
    }

    if (backtrack(goal, numbers)) {
        return acc + goal;
    };

    return acc;
}, 0);

console.log('result: ', result.toString());

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);
