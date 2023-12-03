// https://adventofcode.com/2023/day/2

// 12 red cubes, 13 green cubes, and 14 blue cubes

const input = `Game 1: 7 green, 14 red, 5 blue; 8 red, 4 green; 6 green, 18 red, 9 blue
...
Game 100: 8 green; 2 red, 20 green; 12 green, 1 red, 1 blue; 4 red, 1 blue; 1 blue, 6 red`;

// First solution: 2101

const bag = {
  'red': 12,
  'green': 13,
  'blue': 14,
}

const gameValidityById = {};

input.split('\n').forEach((line) => {
  const [game, setsRaw] = line.split(':');
  const gameId = Number(game.split(' ')[1]);
  const sets = setsRaw.split(';');
  sets.forEach((set) => {
    set.split(',').forEach((cubeRaw) => {
      let [reveledCubeQnt, cubeColor] = cubeRaw.trim().split(' ');
      reveledCubeQnt = Number(reveledCubeQnt);
      cubeColor = cubeColor.trim();
      const bagCubeQnt = bag[cubeColor];
      if (bagCubeQnt < reveledCubeQnt) {
        gameValidityById[gameId] = false;
      }
    })
  })
  
  gameValidityById[gameId] = gameValidityById[gameId] !== false;
})

const gameIdSums = Object.keys(gameValidityById).reduce((sum, gameId) => gameValidityById[gameId] ? sum + Number(gameId) : sum, 0);

console.log(gameIdSums);

// Second solution: 

let powersSum = 0;

input.split('\n').forEach((line) => {
  const minQnt = { 'red': 1, 'green': 1, 'blue': 1 }
  const [_, setsRaw] = line.split(':');
  const sets = setsRaw.split(';');
  sets.forEach((set) => {
    set.split(',').forEach((cubeRaw) => {
      let [revealedCubeQnt, cubeColor] = cubeRaw.trim().split(' ');
      revealedCubeQnt = Number(revealedCubeQnt);
      cubeColor = cubeColor.trim();
      minQnt[cubeColor] = minQnt[cubeColor] < revealedCubeQnt ? revealedCubeQnt : minQnt[cubeColor];
    })
  })
  
  powersSum = powersSum + Object.values(minQnt).reduce((sum, value) => sum * value, 1);
})

console.log(powersSum);

