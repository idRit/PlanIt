async function geocodeCity(city) {
    city = city.split(' ').join('&');
    let res = await (await fetch("https://us1.locationiq.com/v1/search.php?key=bea4a9ec9a2ceb&q=" + city + "&format=json")).json();
    console.log(res);
    return {
        lat: res[0].lat,
        long: res[0].lon
    };
}