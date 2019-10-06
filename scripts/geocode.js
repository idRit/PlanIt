async function geocodeCity(country, city) {
    city = city.split(' ').join('&');
    let res = await (await fetch("https://us1.locationiq.com/v1/search.php?key=bea4a9ec9a2ceb&q=" + country + "%20" + city + "&format=json")).json();
    console.log(res);
    return {
        lat: res[0].lat,
        long: res[0].lon
    };
}

async function reverseGeoCode(lat, long) {
    return await (await fetch(`https://us1.locationiq.com/v1/reverse.php?key=bea4a9ec9a2ceb&lat=${lat}&lon=${long}&format=json`)).json();
}