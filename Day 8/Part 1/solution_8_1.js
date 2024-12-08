const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split("\n").map(l => l.split(""));

const gridWidth = parsedInput[0].length;
const gridHeight = parsedInput.length;

const antennaMap = {};
const antinodes = new Set();

parsedInput.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
  if (cell !== '.') {
      if (!antennaMap[cell]) antennaMap[cell] = [];
      antennaMap[cell].push({x: colIndex, y: rowIndex});
  }
}));


function inBounds({ x, y }) {
  return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
}

for (const frequency in antennaMap) {
  console.log(frequency, antennaMap[frequency])
  const positions = antennaMap[frequency];

  positions.forEach(pos1 => positions.forEach(pos2 => {
      const { x: x1, y: y1 } = pos1;
      const { x: x2, y: y2 } = pos2;

      const dx = x2 - x1;
      const dy = y2 - y1;

      if (dx !== 0 && dy !== 0) {
        const possibleAntinodes = [];
          possibleAntinodes.push({ x: x1 - dx, y: y1 - dy });
          possibleAntinodes.push({x: x2 + dx, y: y2 + dy});

          possibleAntinodes.forEach(antinode => {
            if (!antinodes.has(`${antinode.x},${antinode.y}`) && inBounds(antinode)) {
              antinodes.add(`${antinode.x},${antinode.y}`);
            }
          });
      }

  }));
}

console.log(antinodes.size);