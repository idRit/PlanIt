//const fetch = require('node-fetch');
const proxyurl = "https://cors-anywhere.herokuapp.com/";

async function getPicRefs(queryString) {
    const key = "AIzaSyDAgPjC189rEesNtYAFf8LjQ-TJO4m1a44";
    queryString.replace(' ', '%20');
    let res = await fetch(proxyurl + 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=' + key + '&inputtype=textquery&input=' + queryString + '&fields=photos');
    res = await res.json();
    if (res.candidates.length !== 0) {
        let photoRefs = res.candidates[0].photos;
        let photoRef = "";
        if (photoRefs.length !== 0) {
            photoRef = photoRefs[0].photo_reference;
        }
        return photoRef;
    }
    return "";
}

async function getImage(qs) {
    const key = "AIzaSyDAgPjC189rEesNtYAFf8LjQ-TJO4m1a44";
    let ref = await getPicRefs(qs);
    if (ref === "") {
        return {
            success: false
        }
    } else {
        let image = await (await fetch(`${proxyurl}https://maps.googleapis.com/maps/api/place/photo?key=${key}&photoreference=${ref}&maxwidth=400`)).blob();
        return {
            success: true,
            imgUrl: image
        }
    }
}

async function run() {
    console.log(await getImage("Mumbai, India"));
}

//run();