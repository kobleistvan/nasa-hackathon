var restrictedZonesModel = require('../models/restrictedZones'),
    geolib = require('geolib');

var restrictedZones = {

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
                var noFlyZone = restrictedZones.noFly;

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
                return callback(null, filteredRestrictedZones);
            }

        })
    }

};

module.exports = restrictedZones;