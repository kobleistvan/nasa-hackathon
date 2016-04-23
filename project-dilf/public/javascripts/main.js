
$(document).ready(function(){
	var map = L.map('map').setView([ 46.7766092, 23.603842 ], 16);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker([46.7766092, 23.603842]).addTo(map);

	function onMapClick(e) {
	    alert("You clicked the map at " + e.latlng);
	}
	map.on('click', onMapClick);

});

