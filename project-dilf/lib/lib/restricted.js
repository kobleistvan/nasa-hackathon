var restrictedZonesModel = require('../models/restrictedZones'),
    geolib = require('geolib');

var restrictedZones = {

    // Returns all the restricted zones
    getRestrictedZones: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var restrictedZones = restrictedZonesModel.getRestrictedZones({}, function(err, response) {
            if (err) {
                console.error("Error getting restricted zones from DB.", err);
                return callback("Error getting restricted zones from DB.");
            } else {

                var restrictedZones = response.restrictedZones;
                var categoryA = restrictedZones.categoryA;
                var categoryB = restrictedZones.categoryB;
                var noFly = restrictedZones.noFly;

                var filteredRestrictedZones = {
                    categoryA: [],
                    categoryB: [],
                    noFly: []
                };

                for (var i = 0; i < categoryA.length; i++) {
                    var currentPoint = {
                        latitude: categoryA[i][0],
                        longitude: categoryA[i][1],
                    };

                    if (geolib.isPointInCircle(currentPoint, {
                        latitude: data.lat,
                        longitude: data.lon
                    }, data.range)) {
                        filteredRestrictedZones.categoryA.push(categoryA[i]);
                    }
                }


                for (var i = 0; i < categoryB.length; i++) {
                    var currentPoint = {
                        latitude: categoryB[i][0],
                        longitude: categoryB[i][1],
                    };

                    if (geolib.isPointInCircle(currentPoint, {
                        latitude: data.lat,
                        longitude: data.lon
                    }, data.range)) {
                        filteredRestrictedZones.categoryB.push(categoryB[i]);
                    }
                }


                for (var i = 0; i < noFly.length; i++) {
                    var currentPoint = {
                        latitude: noFly[i][0],
                        longitude: noFly[i][1],
                    };

                    if (geolib.isPointInCircle(currentPoint, {
                        latitude: data.lat,
                        longitude: data.lon
                    }, data.range)) {
                        filteredRestrictedZones.noFly.push(noFly[i]);
                    }
                }
                return callback(null, filteredRestrictedZones);
            }

        })
    },

    // Save a new restricted zone
    saveRestrictedZone: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        restrictedZonesModel.saveRestrictedZone({
        	polygonPoints: data.polygonPoints,
        	restrictionCategory: data.restrictionCategory,
            lat: data.lat,
            lon: data.lon,
            name: data.name,
            city: data.city,
            country: data.country
        }, function(err, response) {
            if (err) {
                console.error("Error saving a new restricted zone.", err);
                return callback("Error saving a new restricted zone.");
            } else {
            	return callback(null, response);
            }
        });


    }

};

module.exports = restrictedZones;