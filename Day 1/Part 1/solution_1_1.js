const fs = require('fs');

function readReportsFromFile() {
    // Read the file and call the callback with the content
    return fs.readFileSync('../resources/input.txt', 'utf-8');
}

function splitListsIntoArrays(listsString) {
    const splitLists = [[], []];

    listsString.split('\n').forEach((pair) =>
        pair.split("   ").forEach((num, i) => splitLists[i].push(parseInt(num)))
    );

    return splitLists;
}

function getDifferences(listsString) {
    const splitLists = splitListsIntoArrays(listsString).map(list => list.sort((a, b) => a - b));
    return splitLists[0].reduce((acc, curr, i) =>  acc + Math.abs(curr - splitLists[1][i]), 0);
}

const lists = readReportsFromFile();
console.log('differences: ', getDifferences(lists));
