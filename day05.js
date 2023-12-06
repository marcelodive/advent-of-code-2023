// https://adventofcode.com/2023/day/5

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const [seedsRaw, seedToSoilRaw, soilToFertilizerRaw, fertilizerToWaterRaw, waterToLightRaw, lightToTemperatureRaw, temperatureToHumidityRaw, humidityToLocationRaw] = input.split('\n\n');
const seeds = seedsRaw.split(':')[1].trim().split(' ').map((numStr) => Number(numStr));

const conversionRoad = {
  seedToSoilRaw,
  soilToFertilizerRaw,
  fertilizerToWaterRaw,
  waterToLightRaw,
  lightToTemperatureRaw,
  temperatureToHumidityRaw,
  humidityToLocationRaw,
}

function getConversionValue(conversions, fromNumber) {
  let value = fromNumber;

  conversions.forEach(conversion => {
    const [destination, source, rangeLength] = conversion;
    if (fromNumber >= source && fromNumber < (source + rangeLength)) {
      value = destination + (fromNumber - source);
    }
  });

  return value;
}

const conversionSources = {}

function seedToLocation(seed) {
  let conversionValue = Number(seed);
  Object.keys(conversionRoad).forEach((conversionKey) => {
    if (conversionSources[conversionKey]) {
      conversionValue = getConversionValue(conversionSources[conversionKey], conversionValue);
    } else {
      const conversionSource = conversionRoad[conversionKey]
      const [_, conversionsRaw] = conversionSource.split(':');
      const conversions = conversionsRaw.split('\n').filter((conversion) => conversion);
      conversionSources[conversionKey] = conversions.map((conversion) => {
        let [destination, source, rangeLength] = conversion.split(' ');
        destination = Number(destination);
        source = Number(source);
        rangeLength = Number(rangeLength);
        return [destination, source, rangeLength];
      })
      conversionValue = getConversionValue(conversionSources[conversionKey], conversionValue);
    }
  })
  return conversionValue;
}

// First solution:

const seedsToLocation = seeds.reduce((seedsToLocation, seed) => {
  seedsToLocation[seed] = seedToLocation(seed);
  return seedsToLocation;
}, {}); 

const lowestLocation = Math.min(...Object.values(seedsToLocation));

console.log('First solution:', lowestLocation);

// Second solution:

let lowestLocationPart2 = Infinity

for (let i = 0; i < seeds.length; i += 2) {
  const seedStart = seeds[i];
  const seedRange = seeds[i+1];

  for (let j = 0; j < seedRange; j++) {
    const seedNumber = seedStart + j;
    const locationNumber = seedToLocation(seedNumber);
    lowestLocationPart2 = (locationNumber < lowestLocationPart2) ? locationNumber : lowestLocationPart2;
  }
}

console.log('Second solution:', lowestLocationPart2);
