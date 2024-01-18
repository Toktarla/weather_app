const defaultCity = { name: 'City1', lat: 51.51, lon: -0.13 }; // Default city (London)
const map = L.map('map').setView([defaultCity.lat, defaultCity.lon], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
 
L.marker([defaultCity.lat, defaultCity.lon]).addTo(map)
    .bindPopup(defaultCity.name);