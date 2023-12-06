// https://adventofcode.com/2023/day/6

const input = `Time:      7  15   30
Distance:  9  40  200`;

const [timesRaw, distancesRaw] = input.replace(/(\s)+/g, '$1').split('\n');
const [times, distances] = [timesRaw, distancesRaw].map((rawStr) => rawStr.split(':')[1].trim().split(' ').map((numberStr) => Number(numberStr)));
const racesQnt = distances.length;

function travelledDistanceCalculation(speed, raceDuration) {
  return speed * (raceDuration - speed);
}

// First solution: 

let totalWaysOfWinning = 1;

for (let i = 0; i < racesQnt; i++) {
  const raceDurationSecs = times[i];
  const recordDistanceMts = distances[i];

  let waysOfWinning = 0;
  for (let holdingSeconds = 1; holdingSeconds < raceDurationSecs; holdingSeconds++) {
    const travelledDistance = travelledDistanceCalculation(holdingSeconds, raceDurationSecs);
    if (travelledDistance > recordDistanceMts) {
      waysOfWinning++;
    }
  }

  totalWaysOfWinning = waysOfWinning ? totalWaysOfWinning * waysOfWinning : totalWaysOfWinning;
}

console.log('First solution:', totalWaysOfWinning);

// Second solution:

const raceDurationSecs = Number(times.join(''));
const recordDistanceMts = Number(distances.join(''));

let totalWaysOfWinningPart2 = 0;
for (let holdingSeconds = 1; holdingSeconds < raceDurationSecs; holdingSeconds++) {
  const travelledDistance = travelledDistanceCalculation(holdingSeconds, raceDurationSecs);
  if (travelledDistance > recordDistanceMts) {
    totalWaysOfWinningPart2++;
  }
}

console.log('Second solution:', totalWaysOfWinningPart2);
