// API CONTROLLER FOR DRONE CONTROLLING APPLICATIONS

var restricted = require('../lib/restricted'),
    weather = require('../lib/weather');

var api = {
    droneTest: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        return callback(null, {
            result: "dronetest"
        });
    },

    weatherTest: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        return callback(null, {
            result: "weathertest"
        });
    },

    // Return the restricted zones
    getRestrictedZones: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        console.log("range is: " + data.range);
        var range = (data.range ? data.range : 5);
        var restrictedZones = [];

        // TODO: GET THE RESTRICTED ZONES

        return callback(null, {
        	coordonates: {
        		lat: data.lat,
        		lon: data.lon,
        		range: range
        	},
            restrictedZones: {
            	zoneCount: restrictedZones.length,
            	zones: restrictedZones
            }
        });
    }

};

module.exports = api;