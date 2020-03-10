
fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')

var mymap = L.map("mapid").setView([44.477376, -73.215679], 15);

L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap);

//////////////// fakeblog script///////////////////////

let listContainer = document.getElementById("rest-list");

async function getRests() {
  let restList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      return jsonObj;
    });

	let imageCount = 1
  restList.forEach(rest => {
    let name = rest.name;
	let id = rest.id;
	let address = rest.address;
	let note = rest.notes[0]
	listContainer.innerHTML += `<div class="rest-list-item"><img class="rest-image" src="https://picsum.photos/150/150?random=${imageCount}"><div class="rest-list-item-info-container"><a class="rest-list-item-name" href='/restaurant.html?${id}'><li>${name}</li></a><div class="rest-list-item-address">${address}</div><div class="rest-list-item-note">"${note}"</div></div></div>`;
	placeMarker(address, name, id);
	imageCount++
  });
}

let restNumber = 1;
fetch("");

// async function getArticle() {
//   let article =
// }

getRests();

////////////// Leaflet placeMarker script //////////////////////

function placeMarker(address, name, id) {
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
		  .bindPopup(`<a href='/restaurant.html?${id}'>${name}</a>`);
	  });
  }