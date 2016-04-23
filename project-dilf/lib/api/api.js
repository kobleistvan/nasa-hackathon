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
                        zoneCount: response.restrictedZones.length,
                        zones: response.restrictedZones
                    }
                });
            }
        })

    }

};

module.exports = api;