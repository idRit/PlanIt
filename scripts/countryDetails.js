async function getDetails(country) {
    return await (await fetch(`https://pscr.herokuapp.com/api/getCityDetails/${country}`)).json();
}

async function getImage(country) {
    return await (await fetch(`https://pscr.herokuapp.com/api/getCountryImage/${country}`)).json();
}