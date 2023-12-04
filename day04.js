// https://adventofcode.com/2023/day/4

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const scratchcards = input.replace(/(\s)+/g, '$1').split('\n');

// First solution:

const points = scratchcards.reduce((points, card) => {
  const [_, numbers] = card.split(':');
  const [winningNumbers, myNumbers] = numbers.split('|');
  const cardWorth = myNumbers.split(' ').reduce((cardWorth, number) => {
    if (number && winningNumbers.includes(` ${number} `)) {
      cardWorth = cardWorth ? cardWorth * 2 : 1;
    }
    return cardWorth;
  }, 0)
  return cardWorth + points;
}, 0);


console.log('First solution:', points);

// Second solution:

function cardPoints(numbers) {
  const [winningNumbers, myNumbers] = numbers.split('|');
  const qnt = myNumbers.split(' ').reduce((matchesQnt, number) => {
    matchesQnt = (number && winningNumbers.includes(` ${number} `)) ? matchesQnt + 1 : matchesQnt;
    return matchesQnt
  }, 0);
  return Number(qnt);
}

const games = scratchcards.reduce((games, card) => {
  [game, numbers] = card.split(':');
  [_, gameId] = game.split(' ');
  games[gameId] = {
    numbers,
    quantity: 1,
  };
  return games;
}, {});

Object.keys(games).forEach((gameId) => {
  const {numbers, quantity} = games[gameId];
  let numberMatches = cardPoints(numbers);
  while (numberMatches > 0) {
    const nextGameId = Number(gameId) + numberMatches;
    games[nextGameId].quantity = games[nextGameId].quantity + quantity;
    numberMatches--;
  }
});

const cardQnt = Object.keys(games).reduce((cardQnt, gameId) => cardQnt + games[gameId].quantity, 0);

console.log('Second solution:', cardQnt);