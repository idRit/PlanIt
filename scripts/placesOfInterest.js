const apiKey = "AIzaSyDAgPjC189rEesNtYAFf8LjQ-TJO4m1a44";
const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query= +point+of+interest&language=en&key="+apiKey;
const fetch = require('node-fetch');

async function getPointsOfInterest(city) {
    let tempCity = city;
    
    if (tempCity.split(" ") > 0) {
        city.replace(' ', '+');
    }

    url.replace(' ', city);

    let res = await (await fetch(url)).json();
    console.log(res);
}

getPointsOfInterest('mumbai');