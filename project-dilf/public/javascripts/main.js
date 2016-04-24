var leaflet_draw = require('leaflet-draw');

$(document).ready(function(){


	// create map
	var map = L.map('map').setView([ 46.7766092, 23.603842 ], 16);
var latitude = 46.7766092;
var longitude = 23.603842;
	// add tile
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// add marker
	L.marker([46.7766092, 23.603842]).addTo(map);

	// Initialise the FeatureGroup to store editable layers
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	// var geoJSON = new L.geoJSON();
	var custom_polygons = [];

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
 		map.addLayer(layer);

	    var coordonates = layer.getLatLngs();
	    coordonates = coordonates[0];
	    $(coordonates).each(function(index, e){
	    	coordonates[index].lon = coordonates[index].lng;
	    	// $(coordonates[index]).removeProp("lng");
	    });

	    coordonates.push(coordonates[0]);

	    var pol = {
	    	polygonPoints: [],
	    	restrictionCategory: 'categoryA',
	        lat: 33.333,
	        lon: 44.444,
	        name: 'custom',
	        city: 'Cluj-Napoca',
	        country: 'Transylvania'
	    }

		pol.polygonPoints = coordonates;
		pol.lat=coordonates[0].lat;
		pol.lon=coordonates[0].lng;
	    custom_polygons.push(pol);
	    console.log("---", custom_polygons);
	    // geoJSON.addData(layer.toGeoJSON());
	    // Do whatever else you need to. (save to db, add to map etc)
	   
	});
	// L.extend(json.properties, polygon.properties);

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
		if ($(this).hasClass("disabled")) {
			return;
		}

		// console.log("save",custom_polygons);

		var payload = { polygons: JSON.stringify(custom_polygons) };

		var jqxhr = $.post( "/api/restricted", payload)
		  .done(function() {
		    alert( "Area was successfuly saved!" );
		  })
		  .fail(function() {
		    alert( "error" );
		  });
	});
});

