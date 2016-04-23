var leaflet_draw = require('leaflet-draw');

$(document).ready(function(){


	// create map
	var map = L.map('map').setView([ 46.7766092, 23.603842 ], 16);

	// add tile
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// add marker
	L.marker([46.7766092, 23.603842]).addTo(map);

	// Initialise the FeatureGroup to store editable layers
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	var drawControl = new L.Control.Draw({
		draw: {
	        polygon: {
	            allowIntersection: false, // Restricts shapes to simple polygons
	            drawError: {
	                color: '#FF0000', // Color the shape will turn when intersects
	                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
	            },
	            shapeOptions: {
	                color: '#FF0000'
	            }
	        }
	    },
	    edit: {
	        featureGroup: drawnItems
	    }
	});
	map.addControl(drawControl);


	// add newly created items to the map
	map.on('draw:created', function (e) {
		$("#save").removeClass("disabled");

	    var type = e.layerType,
	        layer = e.layer;

	    if (type === 'marker') {
	        // Do marker specific actions
	        console.log("marker set to: ", e.latlng);
	    }

	    // Do whatever else you need to. (save to db, add to map etc)
	    map.addLayer(layer);
	});

	map.on('draw:edited', function (e) {
	    var layers = e.layers;
	    layers.eachLayer(function (layer) {
	        //do whatever you want, most likely save back to db
	    });
	});
	// // action on click
	// function onMapClick(e) {
	//     alert("You clicked the map at " + e.latlng);

	// }
	// map.on('click', onMapClick);

	$("#save").on('click', function(e) {
		if (e.hasClass("disabled")) {
			return;
		}

		var layers = map.eachLayer(function (layer) {
		    layer.toGeoJSON();
		});
		console.log(layers);

		var jqxhr = $.post( "/api/save", {polygons: layers})
		  .done(function() {
		    alert( "success" );
		  })
		  .fail(function() {
		    alert( "error" );
		  });

	});
});

