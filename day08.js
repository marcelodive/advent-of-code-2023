const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const [instructionsRaw, nodesRaw] = input.split('\n\n');
const instructions = instructionsRaw.split('');

const network = nodesRaw.split('\n').reduce((network, nodeRaw) => {
  const [node, directions] = nodeRaw.split(' = ');
  const [L, R] = directions.match(/\b\w+\b/g);
  network[node] = {L,R};
  return network;
}, {})

// First solution:

let node = 'AAA';
let steps = 0;
let intructionIndex = 0;

while(node !== 'ZZZ' && network[node]) {
  const direction = instructions[intructionIndex];
  node = network[node][direction];
  intructionIndex = (intructionIndex + 1) === instructions.length ? 0 : intructionIndex + 1;
  steps++;
}

console.log('First solution:', steps);

// Second solution:

function greatestCommonDivisor (numberA, numberB) {
    if (!numberB) {
      return numberA;
    }
  
    return greatestCommonDivisor(numberB, numberA % numberB);
}

function leastCommonMultiple( num1, num2) {
  let rest = 0;
  let numA = 0;
  let numB = 0;

  numA = num1;
  numB = num2;

  do {
      rest = numA % numB;
      numA = numB;
      numB = rest;
  } while (rest != 0);

  return (num1 * num2) / numA;
}

const startNodes = Object.keys(network).filter((node) => node.slice(-1) === 'A');
const initialNodesState = startNodes.reduce((initialNodesState, node) => {
  initialNodesState[node] = {
    currentNode: node,
    steps:0,
  };
  return initialNodesState;
}, {});

intructionIndex = 0;
while(Object.keys(initialNodesState).find((node) => initialNodesState[node].currentNode.slice(-1) !== 'Z')) {
  const direction = instructions[intructionIndex];
  Object.keys(initialNodesState).filter((node) => initialNodesState[node].currentNode.slice(-1) !== 'Z').forEach((node) => {
    initialNodesState[node].currentNode = network[initialNodesState[node].currentNode][direction];
    initialNodesState[node].steps++;
  })
  intructionIndex = (intructionIndex + 1) === instructions.length ? 0 : intructionIndex + 1;
}

const allSteps = Object.keys(initialNodesState).map((node) => initialNodesState[node].steps);
console.log('Second solution:', allSteps.reduce((lcm, steps) => leastCommonMultiple(lcm, steps), 1));
