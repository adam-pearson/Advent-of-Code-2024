const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/test2.txt', 'utf-8').split("\n").map(l => l.split(""));

const gridWidth = parsedInput[0].length;
const gridHeight = parsedInput.length;

const antennaMap = {};
const antinodes = new Set();

parsedInput.forEach((row, y) => row.forEach((cell, x) => {
  if (cell !== '.') {
      if (!antennaMap[cell]) antennaMap[cell] = [];
      antennaMap[cell].push({x, y});
      antinodes.add(`${x},${y}`)
  }
}));


function inBounds({ x, y }) {
  return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
}


for (const frequency in antennaMap) {
  const positions = antennaMap[frequency];

  positions.forEach(pos1 => positions.forEach(pos2 => {
      const { x: x1, y: y1 } = pos1;
      const { x: x2, y: y2 } = pos2;

      const dx = x2 - x1;
      const dy = y2 - y1;

      if (dx !== 0 && dy !== 0) {
        let xMultiplier = 1;
        let nextXAntinode = () => ({ x: x1 - (dx * xMultiplier), y: y1 - (dy * xMultiplier) });
        while (inBounds(nextXAntinode())) {
          antinodes.add(`${nextXAntinode().x},${nextXAntinode().y}`);
          xMultiplier++;
        }

        let yMultiplier = 1;
        let nextYAntinode =  () => ({x: x2 + (dx * yMultiplier), y: y2 + (dy * yMultiplier)});
        while (inBounds(nextYAntinode())) {

          antinodes.add(`${nextYAntinode().x},${nextYAntinode().y}`);
          yMultiplier++;
        }
      }

  }));
}

console.log(antinodes.size);