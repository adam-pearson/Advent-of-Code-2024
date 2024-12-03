const fs= require('fs');

function readReportsFromFile() {
    return fs.readFileSync('../resources/input.txt', 'utf-8');
}

function splitListsIntoArraysAndStoreRightListCount(listsString) {
    const splitLists = [[], []], rightListHashMap = {};
    listsString.split('\n').forEach(pair => {
        const [left, right] = pair.split('   ').map(value => parseInt(value));
        splitLists[0].push(left);
        splitLists[1].push(right);
        rightListHashMap[right] = (rightListHashMap[right] || 0) + 1;
    });
    return {splitLists, rightListHashMap};
}

function getSimilarityScore(listsString) {
    const {splitLists, rightListHashMap} = splitListsIntoArraysAndStoreRightListCount(listsString);

    return splitLists[0].reduce((acc, curr) =>  acc + curr * (rightListHashMap[curr] || 0), 0)
}

const lists = readReportsFromFile();
console.log('similarityScore: ', getSimilarityScore(lists));
