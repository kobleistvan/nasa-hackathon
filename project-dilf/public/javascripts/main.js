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

	var polygonOffice = L.polygon([
	    [46.776647798619024, 23.60310137271881],
	    [46.7758322109866, 23.603578805923465],
	    [46.77612244403731, 23.60468924045563],
			[46.776952722354096, 23.604125976562504],
			[46.776647798619024, 23.60310137271881],
	], {color: 'red'}).addTo(map);

	var polygonBRD = L.polygon([
			[46.777048240277416, 23.606132268905643],
			[46.7767469908669, 23.606341481208805],
			[46.77685720426138, 23.60671162605286],
			[46.77715845305531, 23.60648095607758],
			[46.777048240277416, 23.606132268905643],
	], {color: 'red'}).addTo(map);

	var polygonLiceu = L.polygon([
			[46.77857283034822, 23.60046207904816],
			[46.77779400900659, 23.600161671638492],
			[46.777066609089395, 23.60122919082642],
			[46.77765073404244, 23.601862192153934],
			[46.77858385132409, 23.601078987121582],
			[46.77857283034822, 23.60046207904816],
	], {color: 'red'}).addTo(map);

	// var geoJSON = new L.geoJSON();
	var custom_polygons = [];

	map.addControl( new L.Control.Search({
			url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
			jsonpParam: 'json_callback',
			propertyName: 'display_name',
			propertyLoc: ['lat','lon'],
			circleLocation: false,
			markerLocation: false,
			autoType: false,
			autoCollapse: true,
			minLength: 2,
			initial: false,
		}) );

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
