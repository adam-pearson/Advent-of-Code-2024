const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split('');

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const chunked = chunk(parsedInput, 2);

const fileMap = chunked.map((block, i) => {
  return {id: i, fileSpace: block[0], proceedingSpace: Number(block[1]) ? Number(block[1]) :  0}
})

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


for (let i = files.length - 1; i > 0; i--) {
  for (let j = 0; j < files.length; j++) {
    if (files[j] !== null) continue;

    // j is null
    files[j] = files[i];
    files[i] = null;
  }
}

console.log(files.filter(n => n !== null).reduce((acc, curr, i) => {
  return acc + curr * i;
}));