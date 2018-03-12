const fs = require('fs')

const oneHex = 3100 // one 60 mile hex is approximately 3100 sq. miles
const totalSqMiles = 3 * oneHex
const popDensity = 80 // range from 30 to 120, 70 - 90 is average

calculate(totalSqMiles, popDensity)

function calculate (sqMiles, popDensity) {
  const totalPop = sqMiles * popDensity
  const workedLand = findSqMilesOfWorkedLand(totalPop)
  const percentOfTotalWorkedLand = Math.round((workedLand / sqMiles) * 100)
  const percentOfTotalWilderness = 100 - percentOfTotalWorkedLand
  const cities = determineCities(totalPop)
  const urbanPop = cities.reduce((prev, next, i, arr) => prev + next, 0)
  const urbanPopPercentage = Math.round((urbanPop / totalPop) * 100)

  const stats = {
    totalPopulation: totalPop,
    workedLand: workedLand,
    percentOfTotalWorkedLand: percentOfTotalWorkedLand + '%',
    percentOfTotalWilderness: percentOfTotalWilderness + '%',
    citiesByPopulation: cities.map((cityPop, index) => {
      const cityObj = {}
      cityObj[++index] = cityPop
      return cityObj
    }),
    urbanPopulation: urbanPop,
    urbanPopPercentage: urbanPopPercentage + '%'
  }
  fs.writeFile('output.json', JSON.stringify(stats), function (err) {
    if (err) console.log(err)
  })
}

function findSqMilesOfWorkedLand (population) {
  // a squre mile of settled land will support 180 people
  const percentWorkedLand = population / 180
  return Math.round(percentWorkedLand / 100) * 100
}

function determineCities (pop) {
  const cities = []
  const p = Math.sqrt(pop)
  const m = roll2d4() + 10
  const highestPop = Math.round(p * m)
  const nextHighest = Math.round(((roll2d4() * 15) / 100) * highestPop)

  // console.log('pushing highest city: ', highestPop)
  cities.push(highestPop)
  // console.log('pushing next highest: ', nextHighest)
  cities.push(nextHighest)

  let nextCity = determineNextLargestCity(nextHighest)

  while (nextCity >= 1000) {
    // console.log('pushing next city: ', nextCity)
    cities.push(nextCity)
    nextCity = determineNextLargestCity(nextCity)
  }
  return cities
}

function determineNextLargestCity (pop) {
  const randomRoll = roll2d4() * 5 / 100
  // console.log('random roll:', randomRoll)
  const nextCity = Math.round(randomRoll * pop)
  // console.log('next city: ', nextCity)
  return nextCity
}

function roll2d4 () {
  return (Math.floor(Math.random() * 8) + 2)
}
