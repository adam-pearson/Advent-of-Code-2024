const fs= require('fs');
const input = fs.readFileSync('../resources/input.txt', 'utf-8');

let doing = true;
const sum = (input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g))
    .reduce((acc, instruction) =>
        instruction === 'do()' ? (doing = true, acc) :
        instruction === 'don\'t()' ? (doing = false, acc) :
        doing ? acc + instruction.replace('mul(', '').replace(')', '').split(',').reduce((acc, n) => acc * n, 1) : acc, 0
    );

console.log(sum);