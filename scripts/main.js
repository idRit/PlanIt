function validate() {
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;

    if (!/^([A-Z][a-z]+){1,}?(\s*[A-Z][a-z]+)*$/g.test(name)) {
        alert('Name is invalid!');
        return;
    }

    if (!/^[a-zA-Z0-9\.]+@[a-z]+([\.][a-z]*){1,2}$/.test(email)) {
        alert('Email is invalid');
        return;
    }

    localStorage.name = document.getElementById('name').value;
    localStorage.email = document.getElementById('email').value;
    window.location.pathname = '/app.html';
}

var map;
var marker;
var viewer;

var countryy = "";

async function initGlobe() {
    if (typeof localStorage.firstrun === 'undefined') {
        alert("If you want to choose another location then please refresh the page. This message is just a one time message and won't appear again!");
        localStorage.firstrun = true;
    }
    reqFS();

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZTY2NGNlYi1lMjkxLTQyNzUtYWU2ZS1lM2FmOWI1OTM1YWQiLCJpZCI6MTM5NzYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjQ1MDE4MjN9.R3BSQ00pi7GEdbNOFcaGvKzlFbC0OabZW92bZBCHZ0c';
    viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        homeButton: false,
        geocoder: false,
        fullscreenButton: false,
        timeline: false
    });
    var layer = viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 3 })
    );
    document.querySelector('.info').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

function reqFS() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

async function mail() {
    document.querySelector('#placename').style['text-align'] = "none";
    let body = document.querySelector('.innerpane');
    body = `<!DOCTYPE html><div>${body.innerHTML}<a href="https://wikitravel.org/en/${countryy}">Visit Wiki for More Information!</a><br><a href="https://planitearth.netlify.com/contact.html">Contact us!</a></div>`;
    document.querySelector('#placename').style['text-align'] = "center";
    console.log(body);
    const url = 'https://pscr.herokuapp.com/api/sendMail';
    const data = { msg: body, mailTo: localStorage.email };

    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
        alert('Mail sent!');
    } catch (error) {
        console.error('Error:', error);
        alert('Some error!');
    }

    await storeDetails(localStorage.country, countryy);
}

async function getCity() {
    document.querySelector('.stuff').style.display = "none";
    document.querySelector('.loader').style.display = "block";

    let place = await getRandomCity();
    let l = await geocodeCity(place.country, place.city);
    console.log(l);

    let scene = viewer.scene;
    let height = 50000;

    setTimeout(() => {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(l.long, l.lat, height),
            maximumHeight: height
        });
    });

    await prepareRightPane(place, l);
}

async function prepareRightPane(place, l) {
    document.querySelector('#placename').innerHTML = "Random Country : " + place.country;
    countryy = place.country;
    let x = await getDetails(place.country);
    let details = x.details;
    let image = await getImage(place.country);
    console.log(image.image);
    document.querySelector('#cimg').src = image.image;
    document.querySelector('.loader').style.display = "none";
    document.querySelector('.pane').style.display = "flex";
    document.querySelector('.info').style.display = "block";

    console.log(details);
    showDetails(details);
    //document.querySelector('#population').innerHTML = "population: " + await getDetails(place.country)['Population'];
}

function wiki() {
    var win = window.open(`https://wikitravel.org/en/${countryy}`, '_blank');
    win.focus();
}

function showDetails(details) {
    let temp = document.getElementsByTagName("template")[0];
    let params = temp.content.querySelector(".params");
    let cont = temp.content.querySelector('.cont');
    let keys = Object.keys(details);
    keys.forEach(key => {
        let a = document.importNode(params, true);
        a.textContent = key + ': ';
        let b = document.importNode(cont, true);
        b.textContent = details[key];
        document.querySelector('.paramsContainer').appendChild(a);
        document.querySelector('.contContainer').appendChild(b);
    });
}

async function storeDetails(src, dst) {
    
}