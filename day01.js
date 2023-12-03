// https://adventofcode.com/2023/day/1

const input = `eightfivesssxxmgthreethreeone1sevenhnz
...
dljxl7five6nrzfh5one`;

function getCalibrationValues(line) {
  return Number([...line].find(char => /\d/.test(char)) + [...line].reverse().find(char => /\d/.test(char)));
}

// First solution: 54630

const calibrationSum1 = input.split('\n').reduce((acc, line) => acc + getCalibrationValues(line), 0);

console.log(calibrationSum1);

// Second solution: 54770

const substitutions = {
  'one': 'one1one',
  'two': 'two2two',
  'three': 'three3three',
  'four': 'four4four',
  'five': 'five5five',
  'six': 'six6six',
  'seven': 'seven7seven',
  'eight': 'eight8eight',
  'nine': 'nine9nine',
}

const calibrationSum2 = input.split('\n').reduce((acc, line) => {
  Object.keys(substitutions).forEach((substitution) => line = line.replaceAll(substitution, substitutions[substitution]));
  return acc + getCalibrationValues(line);
}, 0);

console.log(calibrationSum2);
