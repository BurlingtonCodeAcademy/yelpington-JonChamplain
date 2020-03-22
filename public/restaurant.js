let path = window.location.search;
console.log(window.location)
let pathArray = path.split("?");

let id = pathArray.pop();

async function getRest(restID) {
  let rest = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${restID}`)
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      return jsonObj;
    });

  let restName = rest.name;
  let restAddress =rest.address
  let restPhone = "802-" + rest.phone
  let restWebsite =rest.website
  let restHours =rest.hours
  let restNotes =rest.notes

  document.getElementById("rest-name").textContent = restName;
  document.getElementById("rest-address").textContent = restAddress;
  document.getElementById("rest-phone").innerHTML =  `<a href="tel:${restPhone.split('-').join('')}">${restPhone}</a>`;
  console.log(`<a href="tel:${restPhone.split('-').join('')}">${restPhone}</a>`)
  document.getElementById("rest-website").innerHTML = `<a class="rest-link" href="${restWebsite}">${restWebsite}</a>`;
  document.getElementById("rest-hours").innerHTML = `<strong>Hours: </strong>  ${restHours}`;

    restNotes.forEach(note => {
      document.getElementById("rest-notes").innerHTML += `<li class='rest-note'>"${note}"</li>`;
    });
  
  placeMarker(restAddress, restName)
}

getRest(id);

/////////////// index.js script ////////////////////////////

fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')

var mymap = L.map("mapid").setView([44.478083, -73.215724], 18);



L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap);

////////////// Leaflet placeMarker script //////////////////////

function placeMarker(address, popupText) {
	fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
	  .then(data => {
		return data.json();
	  })
	  .then(locInfo => {
		let info = locInfo[0];
		let lat = info.lat;
    let lon = info.lon;
     
		let marker = L.marker([lat, lon])
		  .addTo(mymap)
      .bindPopup(popupText);
      marker.openPopup();
      mymap.panTo([lat,lon])
	  });
  }
 