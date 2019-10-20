const fetch = require('node-fetch');

const rootURL = "https://opensky-network.org/api";

function getReqURL(city) {
    let icaoCallSign = `airport=${city}`;
    return rootURL + `/flights/departure?` + icaoCallSign;
}

async function run() {
    let res = await (await fetch(getReqURL('VABB'))).json();
    console.log(res);
}

//Dosen't work
//run();