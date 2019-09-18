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

// async function initMap() {
        //     map = L.map('map').setView([-41.2858, 174.78682], 14);
        //     mapLink =
        //         '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        //     //let mt = "https://api.maptiler.com/tiles/satellite-mediumres-2018/{z}/{x}/{y}.jpg?key=j2rAx36UryiEmF0DPq4q";
        //     let tile = "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=j2rAx36UryiEmF0DPq4q";
        //     mapTiler = L.tileLayer(tile, {
        //         tileSize: 512,
        //         zoomOffset: -1,
        //         minZoom: 2,
        //         attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        //         crossOrigin: true
        //     });

        //     mapTiler.addTo(map);
        //     map.setView([19.0216, 72.8707], 2);
        // }