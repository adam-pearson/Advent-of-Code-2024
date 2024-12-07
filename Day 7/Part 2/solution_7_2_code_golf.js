const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split("\n").map(l => l.split(": "));

const start = performance.now();

const backtrack = (goal, numbers, curr = 0, index = 0) => 
    index >= numbers.length
        ? curr === goal
        : backtrack(goal, numbers, curr + numbers[index], index + 1)
        || curr * numbers[index] > 0 && backtrack(goal, numbers, curr * numbers[index], index + 1)
        || backtrack(goal, numbers, curr > 0 ? parseInt(String(curr) + String(numbers[index])) : numbers[index], index + 1);

const result = parsedInput.reduce(
    (acc, [goal, nums]) =>
        acc + (backtrack(+goal, nums.split(" ").map(Number)) ? +goal : 0),
    0
)


console.log('result: ', result);

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);
