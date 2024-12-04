const wordsToFind = [
    'TEST',
    'TWEET',
    'XMAS',
    'EASTER',
    'BUNNY',
    'NOPE',
];

const foundWordsMeta = [];

const wordSearch = [
    ['T', 'E', 'S', 'T', 'A', 'B', 'C', 'B'],
    ['E', 'A', 'B', 'W', 'D', 'E', 'F', 'U'],
    ['S', 'A', 'C', 'E', 'E', 'F', 'G', 'N'],
    ['T', 'C', 'S', 'E', 'F', 'G', 'H', 'N'],
    ['S', 'D', 'E', 'T', 'G', 'H', 'I', 'Y'],
    ['B', 'A', 'F', 'G', 'E', 'I', 'J', 'K'],
    ['C', 'F', 'M', 'H', 'I', 'R', 'K', 'L'],
    ['D', 'G', 'H', 'X', 'M', 'A', 'S', 'M'],
];

const directions = [
    { xOffset: 0, yOffset: 1 },  // right
    { xOffset: 1, yOffset: 0 },  // down
    { xOffset: 0, yOffset: -1 }, // left
    { xOffset: -1, yOffset: 0 }, // up
    { xOffset: 1, yOffset: 1 },  // down-right
    { xOffset: 1, yOffset: -1 }, // up-right
    { xOffset: -1, yOffset: -1 },// up-left
    { xOffset: -1, yOffset: 1 }, // down-left
];

const rowCount = wordSearch.length;
const colCount = wordSearch[0].length;

const isInBounds = (x, y) => x >= 0 && x < rowCount && y >= 0 && y < colCount;

wordSearch.forEach((row, x) => {
    row.forEach((cell, y) => {
        wordsToFind.forEach(word => {
            if (cell === word[0]) {
                directions.forEach(({ xOffset, yOffset }) => {
                    if (!(isInBounds(x + xOffset * (word.length - 1), y + yOffset * (word.length - 1)))) return;
                    if (word.split('').every((letter, i) =>
                        wordSearch[x + xOffset * i][y + yOffset * i] === letter
                    )) {
                        foundWordsMeta.push({
                            word,
                            start: { x, y },
                            end: { x: x + xOffset * (word.length - 1), y: y + yOffset * (word.length - 1) }
                        });
                    }
                });
            }
        });
    });
});

const visualizeGrid = () => {
    const gridCopy = wordSearch.map(row => row.slice());

    foundWordsMeta.forEach(({ word, start, end }) => {
        let { x: startX, y: startY } = start;
        let { x: endX, y: endY } = end;
        let xOffset = Math.sign(endX - startX);
        let yOffset = Math.sign(endY - startY);

        for (let i = 0; i < word.length; i++) {
            let x = startX + xOffset * i;
            let y = startY + yOffset * i;
            gridCopy[x][y] = `\x1b[31m${gridCopy[x][y]}\x1b[0m`;
        }
    });

    gridCopy.forEach(row => {
        console.log(row.join(' '));
    });

    const foundWords = foundWordsMeta.map(({ word }) => word);
    console.log('Found words:', foundWords.map(word => {
        const wordAppearances = foundWords.filter(w => w === word).length;

        return wordAppearances > 1 ? `${word} (x${wordAppearances})` : word;
    }).filter((word, i, arr) => arr.indexOf(word) === i));
    console.log('Undetected words: ', wordsToFind.filter(word => !foundWords.includes(word)));
};

visualizeGrid();
