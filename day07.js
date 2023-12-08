// https://adventofcode.com/2023/day/7

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const labelStrength = {
  'A': 13,
  'K': 12,
  'Q': 11,
  'J': 10,
  'T': 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1
}

const games = input.split('\n').map((handRaw) => {
  const [hand, bid] = handRaw.split(' ');
  return {hand, bid};
});

function factorial (num) {
  return (num === 0) ? 1 : num * factorial (num - 1);
}

function isFiveOfKind(hand) {
  return (hand.length - hand.replaceAll(hand[0], '').length) === hand.length;
}

function isFourOfKind(hand) {
  return hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 4);
}

function isFullHouse(hand) {
  const hasTreeWithSameLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 3);
  const hasTwoWithSameLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 2);
  return hasTreeWithSameLabel && hasTwoWithSameLabel;
}

function isThreeOfKind(hand) {
  const hasTreeWithSameLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 3);
  const hasTwoWithSameLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 2);
  return hasTreeWithSameLabel && !hasTwoWithSameLabel;
}

function isTwoPair(hand) {
  const firstPairLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 2);
  return firstPairLabel && hand.replaceAll(firstPairLabel, '').split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 2);
}

function isOnePair(hand) {
  const hasTreeWithSameLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 3);
  const hasTwoWithSameLabel = hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) === 2);
  return !hasTreeWithSameLabel && hasTwoWithSameLabel;
}

function isHighCard(hand) {
  return !hand.split('').find((card) => (hand.length - hand.replaceAll(card, '').length) !== 1);
}

const FIVE_OF_KIND = 7;
const FOUR_OF_KIND = 6;
const FULL_HOUSE = 5;
const THREE_OF_KIND = 4;
const TWO_PAIR = 3;
const ONE_PAIR = 2;
const HIGH_CARD = 1;

function replaceJoker(hand) {
  if (!hand.includes('J')) return hand;
  if(isFiveOfKind(hand)) return hand;

  labelStrength['J'] = 0;

  const uniqueCards = [...new Set(hand.split(''))].filter((card) => card !== 'J');

  const qntByCard = uniqueCards.reduce((qntByCard, card) => {
    qntByCard.push({card, quantity: hand.length - hand.replaceAll(card, '').length})
    return qntByCard;
  }, [])
  .sort(({card: cardA}, {card: cardB}) => labelStrength[cardA] - labelStrength[cardB])
  .sort(({quantity: quantityA}, {quantity: quantityB}) => quantityB - quantityA);

  return qntByCard.length ? hand.replaceAll('J', qntByCard[0].card) : hand;
}

function calcHandStrength (hand, isPt2) {
  if (isPt2) {
    hand = replaceJoker(hand);
  }
  if(isFiveOfKind(hand)) return FIVE_OF_KIND;
  if(isFourOfKind(hand)) return FOUR_OF_KIND;
  if(isFullHouse(hand)) return FULL_HOUSE;
  if(isThreeOfKind(hand)) return THREE_OF_KIND;
  if(isTwoPair(hand)) return TWO_PAIR;
  if(isOnePair(hand)) return ONE_PAIR;
  if(isHighCard(hand)) return HIGH_CARD;
}

function compareHands(handA, handB, isPt2 = false) {
  if (handA === handB) return 0;
  
  const handAStrength = calcHandStrength(handA, isPt2);
  const handBStrength = calcHandStrength(handB, isPt2);
  
  if (handAStrength === handBStrength) {
    for(let i = 0; i < handA.length; i++) {
      if (handA[i] === handB[i]) continue;
      if (isPt2) labelStrength['J'] = 0;
      return (labelStrength[handA[i]] > labelStrength[handB[i]]) ? 1 : -1;
    }
  } else {
    return handAStrength > handBStrength ? 1 : -1;
  }
}

// First solution:

const sortedGames = games.sort((gameA, gameB) => compareHands(gameA.hand, gameB.hand));
const totalWinnings = sortedGames.reduce((totalWinnings, game, index) => {
  return totalWinnings + ((index + 1) * game.bid);
}, 0)

console.log('First solution:', totalWinnings);

// Second solution:

const sortedGamesPt2 = games.sort((gameA, gameB) => compareHands(gameA.hand, gameB.hand, true));
const totalWinningsPt2 = sortedGamesPt2.reduce((totalWinnings, game, index) => {
  return totalWinnings + ((index + 1) * game.bid);
}, 0)

console.log('Second solution:', totalWinningsPt2);
