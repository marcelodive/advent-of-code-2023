// https://adventofcode.com/2023/day/3

const input = `........954......104.......52......70..............206.806........708..........................217...............................440........
...
...152...........236.............95............................517......789.836.....236..194......................................202....720`

const lines = input.split('\n');

function retrieveAdjacentString(fromIndex, lineIndex, needle) {
  return lines[lineIndex]?.slice(fromIndex > 0 ? fromIndex - 1 : 0, fromIndex + needle.length + 1);
}

// First solution: 535235

function containSymbol(string) {
  return /[^A-Za-z0-9.]/.test(string.trim());
}

function isAdjacentToSymbol(fromIndex, numberStr, lineIndex) {
  const adjacentAboveLine = retrieveAdjacentString(fromIndex, lineIndex - 1, numberStr);
  const adjacenteCurrentLine = retrieveAdjacentString(fromIndex, lineIndex, numberStr);
  const adjacenteBelowLine = retrieveAdjacentString(fromIndex, lineIndex + 1, numberStr);
  return containSymbol(adjacentAboveLine + adjacenteCurrentLine + adjacenteBelowLine);
}

let firstSum = 0;

lines.forEach((line, lineIndex) => {
  for (let i = 0; i < line.length; i++) {
    if (/\d/.test(line[i])) {
        const fromIndex = i;
        let numberStr = '';
        while(/\d/.test(line[i])) {
          numberStr += line[i];
          i++;
        };
      if (isAdjacentToSymbol(fromIndex, numberStr, lineIndex)) {
        firstSum += Number(numberStr);
      }
    }
  }
})

console.log(firstSum); 

// Second solution: 79844424

function isAdjacentToTwoPartNumbers(fromIndex, lineIndex) {
  const adjacentAboveLine = retrieveAdjacentString(fromIndex, lineIndex - 1, '*');
  const adjacenteCurrentLine = retrieveAdjacentString(fromIndex, lineIndex, '*');
  const adjacenteBelowLine = retrieveAdjacentString(fromIndex, lineIndex + 1, '*');
  const gatheredLines = (adjacentAboveLine + '.' + adjacenteCurrentLine + '.' + adjacenteBelowLine);
  return gatheredLines.match(/\d+/g).length === 2;
}

function getAdjacentNumbers(fromIndex, lineIndex) {
  const initialFromIndex = fromIndex;
  const adjacentNumbers = [];
  const line = lines[lineIndex];

  if (/\d/.test(line[fromIndex])) {
    while((/\d/.test(line[fromIndex - 1]))) {
      fromIndex--;
    }
  }

  let numberStr = '';
  while(/\d/.test(line[fromIndex])) {
    numberStr += line[fromIndex];
    fromIndex++;
  }

  if (numberStr !== '') {
    adjacentNumbers.push(Number(numberStr));
  }

  numberStr = '';
  while(/\d/.test(line[fromIndex]) || (fromIndex < (initialFromIndex + 2))){
    if(/\d/.test(line[fromIndex])){
      numberStr += line[fromIndex];
    };
    fromIndex++;
  }

  if (numberStr !== '') {
    adjacentNumbers.push(Number(numberStr));
  }
  
  return adjacentNumbers;
}

function retrieveAdjacentNumbers(fromIndex, lineIndex) {
  const adjacentNumbersAboveLine = getAdjacentNumbers(fromIndex - 1, lineIndex - 1, '*');
  const adjacenteNumbersCurrentLine = getAdjacentNumbers(fromIndex - 1, lineIndex, '*');
  const adjacenteNumbersBelowLine = getAdjacentNumbers(fromIndex - 1, lineIndex + 1, '*');
  return [...adjacentNumbersAboveLine, ...adjacenteNumbersCurrentLine, ...adjacenteNumbersBelowLine];
}

let sumGearsRatio = 0;
lines.forEach((line, lineIndex) => {
  for (let i = 0; i < line.length; i++) {
    if (/\*/.test(line[i])) {
      const fromIndex = i;
      if(isAdjacentToTwoPartNumbers(fromIndex, lineIndex)) {
        const adjacentNumbers = retrieveAdjacentNumbers(fromIndex, lineIndex);
        const gearsRatio = adjacentNumbers.reduce((acc, number) => acc * number, 1);
        sumGearsRatio += gearsRatio;
      }
    }
  }
});

console.log(sumGearsRatio);
