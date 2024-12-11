// GIVEN UP. THIS WORKS FOR TEST INPUT BUT NOT REAL INPUT, UNABLE TO FIGURE OUT WHY.

const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split('');

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const chunked = chunk(parsedInput, 2);

const fileMap = chunked.map((block, i) => {
  return {id: i, fileSpace: +block[0], proceedingSpace: +block[1] ? +block[1] :  0}
})

const movedFiles = new Set();
for (let i = fileMap.length -1; i >= 0; i--) {
  let lastValidSpaceIndex = i;
  const fileToMove = fileMap[i];

  if (!movedFiles.has(fileToMove.id)) {
    for (let j = fileMap.length -2; j >= 0; j--) {
      if (fileMap[j].proceedingSpace >= fileToMove.fileSpace) {
        lastValidSpaceIndex = j;
      }
    }

    if (lastValidSpaceIndex < i) {
      const updatedMoveFromSpace = fileToMove.fileSpace + fileToMove.proceedingSpace;
      movedFiles.add(fileToMove.id);

      fileToMove.proceedingSpace = fileMap[lastValidSpaceIndex].proceedingSpace - fileToMove.fileSpace;
      fileMap.splice(i, 1);
      fileMap.splice(lastValidSpaceIndex + 1, 0, fileToMove);
      fileMap[lastValidSpaceIndex].proceedingSpace = 0;
      fileMap[i].proceedingSpace +=  updatedMoveFromSpace;
    }
  }
}

const files = [];
let fileSpaceCounter = 0;
let proceedingSpaceCounter = 0;

fileMap.forEach(file => {
  if (fileSpaceCounter < file.fileSpace) {
    for (let i = 0; i < file.fileSpace; i++) {
      files.push(file.id);
      fileSpaceCounter++;
    }
    fileSpaceCounter = 0;

  }
  
  if (proceedingSpaceCounter < file.proceedingSpace) {
    for (let i = 0; i < file.proceedingSpace; i++) {
      files.push(null);
      proceedingSpaceCounter++;
    }
    proceedingSpaceCounter = 0;

  }
});

console.log(files.reduce((acc, curr, i) => {
  if (curr === null) return acc;
  return acc + curr * i;
}, 0));