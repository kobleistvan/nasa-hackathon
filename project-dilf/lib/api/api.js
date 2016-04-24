// API CONTROLLER FOR DRONE CONTROLLING APPLICATIONS

var restricted = require('../lib/restricted'),
    weather = require('../lib/weather');

var api = {

    // Return the weather conditions for a specific location
    getWeather: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        weather.getWeatherConditions({
            lat: data.lat,
            lon: data.lon
        }, function(err, response) {
            if (err) {
                return callback(err);
            } else {
                // Filter out useless data
                var weatherConditions = response.result.weather.currently;
                return callback(null, weatherConditions);
            }
        })
    },

    // Return the restricted zones
    getRestrictedZones: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var range = (data.range ? data.range : 5000);

        restricted.getRestrictedZones({
            lat: data.lat,
            lon: data.lon,
            range: range
        }, function(err, response) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {
                    coordonates: {
                        lat: data.lat,
                        lon: data.lon,
                        range: range
                    },
                    restrictedZones: {
                        zones: response
                    }
                });
            }
        })

    },

    // Save a new restricted zone
    saveRestrictedZone: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        restricted.saveRestrictedZone({
            restrictionCategory: data.restrictionCategory,
            lat: data.lat,
            lon: data.lon,
            name1: data.name1,
            name2: data.name2,
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

module.exports = api;