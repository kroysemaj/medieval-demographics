## Medieval Demographics

A simple node implementation of the rules laid out by S. John Ross in his article [Medieval Demographics Made Easy: Numbers for Fantasy Worlds](http://www222.pair.com/sjohn/blueroom/demog.htm).

### Instructions
Use is intentionally simple and unrobust. 

[NodeJS](http://nodejs.org) is required.

1. Clone the repo
2. Execute `npm start`
3. The stats output will be generated in `output.json`.

It's that simple! There's no need to install any dependencies or anything beyond node. 

If you want to customize the data generated, you can change the numbers in lines 4 & 5 in `src/index.js`
1. `totalSqMiles` is the total area of your kingdom
2. `popDensity` is the population density. Specfically, the number of people per square mile.
3. Example:

```javascript
const totalSqMiles = 30 * oneHex
const popDensity = 100
```

This script assumes using a hex map and calculates according to that assumption. You may simply assign a number for `totalSqMiles`.