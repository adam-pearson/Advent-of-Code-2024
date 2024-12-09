const fs = require('fs');
const parsedInput = fs.readFileSync('../resources/input.txt', 'utf-8').split('');

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const chunked = chunk(parsedInput, 2);

const files = [];
let fileSpaceCounter = 0;
let proceedingSpaceCounter = 0;

chunked.forEach((file, i) => {
  const id = i;
  const fileSpace = file[0];
  const proceedingSpace = file[1];

  if (fileSpaceCounter < fileSpace) {
    for (let i = 0; i < fileSpace; i++) {
      files.push(id);
      fileSpaceCounter++;
    }
    fileSpaceCounter = 0;

  }
  
  if (proceedingSpaceCounter < proceedingSpace) {
    for (let i = 0; i < proceedingSpace; i++) {
      files.push(null);
      proceedingSpaceCounter++;
    }
    proceedingSpaceCounter = 0;

  }
});


for (let i = files.length - 1; i > 0; i--) {
  for (let j = 0; j < files.length; j++) {
    if (files[j] !== null) continue;
    files[j] = files[i];
    files[i] = null;
  }
}

console.log(files.filter(n => n !== null).reduce((acc, curr, i) => {
  return acc + curr * i;
}));