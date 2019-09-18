//const fetch = require('node-fetch');
//const cityAndCrimeRate = require('./crimeRates');

async function getAllCountries() {
    let res = await fetch('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.json');
    let countryJson = res.json();
    return countryJson;
}

async function getRandomCity() {
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

    console.log(index[randomNumber]);
    console.log(randomCity);

    return {
        city: randomCity,
        country: index[randomNumber]        
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function count(obj) { return Object.keys(obj).length; }

//run();