const fs = require('fs');
const input = fs.readFileSync('../resources/input.txt', 'utf-8');

const [rulesSection, updatesSection] = input.trim().split("\n\n");
const rules = rulesSection.split("\n").map(line => line.split('|').map(Number));
const updates = updatesSection.split("\n").map(line => line.split(',').map(Number));

const isValidUpdate = (update) => {
    const pageIndex = new Map();
    update.forEach((page, idx) => pageIndex.set(page, idx));
    
    for (const [from, to] of rules) {
        const fromIndex = pageIndex.get(from);
        const toIndex = pageIndex.get(to);
        if (pageIndex.has(from) && pageIndex.has(to) && fromIndex > toIndex) return false;
    }
    return true;
};

const topologicalSort = (update) => {
    const indegree = new Map();
    const graph = new Map();
    update.forEach(page => {
        graph.set(page, []);
        indegree.set(page, 0);
    });

    rules.forEach(([from, to]) => {
        if (update.includes(from) && update.includes(to)) {
            graph.get(from).push(to);
            indegree.set(to, indegree.get(to) + 1);
        }
    });

    const queue = [];
    const sortedPages = [];
    indegree.forEach((degree, page) => { if (degree === 0) queue.push(page); });

    while (queue.length > 0) {
        const node = queue.shift();
        sortedPages.push(node);
        graph.get(node).forEach(neighbor => {
            indegree.set(neighbor, indegree.get(neighbor) - 1);
            if (indegree.get(neighbor) === 0) queue.push(neighbor);
        });
    }

    return sortedPages.length === update.length ? sortedPages : [];
};

const validMiddlePageSum = updates.reduce((acc, curr) => {
    if (!isValidUpdate(curr)) return acc;
    const sortedUpdate = topologicalSort(curr);
    return sortedUpdate.length ? acc + sortedUpdate[Math.floor(sortedUpdate.length / 2)] : acc
}, 0);

console.log(validMiddlePageSum);
