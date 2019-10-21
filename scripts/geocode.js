async function geocodeCity(country, city) {
    city = city.split(' ').join('&');
    let res = await (await fetch("https://us1.locationiq.com/v1/search.php?key=bea4a9ec9a2ceb&q=" + country + "%20" + city + "&format=json")).json();
    console.log(res);
    return {
        lat: res[0].lat,
        long: res[0].lon
    };
}

async function geocodeCountry(country) {
    let result = await (await fetch("https://gist.githubusercontent.com/sindresorhus/1341699/raw/84704529d9ee4965df2cddc55e5f2bc3dc686950/countrycode-latlong.min.json")).json();
    let cc = await (await fetch("scripts/2data.json")).json();

    let res = Object.keys(result);



    cc.forEach(el => {
        if (country === el.Name) {
            res.forEach(ele => {
                if (el.Code.toLowerCase() === ele) {
                    console.log([result[ele].lat, result[ele].long]);
                    res =  [result[ele].lat, result[ele].long];
                }
            });
        }
    });

    return res;
}

async function reverseGeoCode(lat, long) {
    return await (await fetch(`https://us1.locationiq.com/v1/reverse.php?key=bea4a9ec9a2ceb&lat=${lat}&lon=${long}&format=json`)).json();
}