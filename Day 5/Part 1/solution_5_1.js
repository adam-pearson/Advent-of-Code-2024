const fs = require('fs');
const input = fs.readFileSync('../resources/input.txt', 'utf-8');

const [rulesSection, updatesSection] = input.trim().split("\n\n");
const rules = rulesSection.split("\n").map(line => line.split('|').map(Number));
const updates = updatesSection.split("\n").map(line => line.split(',').map(Number));

const validUpdates = updates.reduce((acc, curr) => {
    const pageIndex = new Map();
    curr.forEach((page, idx) => pageIndex.set(page, idx));

    for (const [from, to] of rules) {
        if (pageIndex.has(from) && pageIndex.has(to)) {
            const fromIndex = pageIndex.get(from);
            const toIndex = pageIndex.get(to);
            
            if (fromIndex > toIndex) {
                return acc;
            }
        }
    }

    return acc + curr[Math.floor(curr.length / 2)];
}, 0);

console.log(validUpdates);
