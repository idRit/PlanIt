const fetch = require('node-fetch');
const cityAndCrimeRate = require('./crimeRates');

async function getAllCountries() {
    let res = await fetch('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.json');
    let countryJson = res.json();
    return countryJson;
}

async function run() {
    let countries = await getAllCountries();
    let countryCount = count(countries);

    let index = [];

    for (let x in countries) {
        index.push(x);
    }

    index.sort((a, b) => {
        return a == b ? 0 : (a > b ? 1 : -1);
    });

    let randomNumber = getRandomInt(countryCount);

    let cities = countries[index[randomNumber]];
    let randomCity = cities[getRandomInt(cities.length)];

    let cityDetails = {
        city: randomCity,
        crimeRate: -1
    };

    await cityAndCrimeRate.forEach((city) => {
        if (randomCity === city[0]) {
            cityDetails.crimeRate = city[1];
        }
    });

    console.log(cityDetails);

    //console.log(randomCity);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function count(obj) { return Object.keys(obj).length; }

run();