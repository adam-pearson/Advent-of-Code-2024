const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split("\n").map(l => l.split(": "));

const start = performance.now();

const backtrack = (goal, numbers, curr = 0, index = 0) => {
    if (index === numbers.length) return curr === goal;

    const next = numbers[index];

    const nextSum = curr + next;
    const nextProduct = curr * next;

    return (backtrack(goal, numbers, nextSum, index + 1)
        || backtrack(goal, numbers, nextProduct, index + 1));
}

const getMaxValue = (numbers) => {
    return numbers.reduce((acc, curr) => {
        const sum = acc + curr;
        const product = acc * curr;
        return Math.max(product, sum);
    });
}

const result = parsedInput.reduce((acc, curr) => {
    const goal = +curr[0];
    const numbers = curr[1].split(" ").map(num => +num);

    if (numbers.length === 1) {
        return acc + (numbers[0] === goal ? goal : 0);
    }

    const maxValue = getMaxValue(numbers);

    if (maxValue < goal) {
        return acc;
    }

    if (maxValue === goal || backtrack(goal, numbers))  {
        return acc + goal;
    };

    return acc;
}, 0)

console.log('result: ', result);

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);
