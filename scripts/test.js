const fetch = require('node-fetch');
let fs = require('fs');

async function getStuff()  {
    let res = await (await fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json')).json();
    fs.writeFile('countries.json', JSON.stringify(res), function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}

getStuff();