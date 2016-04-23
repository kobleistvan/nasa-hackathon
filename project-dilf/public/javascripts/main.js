// map = new L.Map('map'); 

//  url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//  opt = {}
//  var layer = new L.TileLayer(url, opt); 

//  map.addLayer(layer);
//  map.setView(new L.LatLng(60.1733244, 24.9410248), 9);
$(document).ready(function(){
	var map = L.map('map').setView([ 46.7766092, 23.603842 ], 16);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker([46.7766092, 23.603842]).addTo(map);

});

