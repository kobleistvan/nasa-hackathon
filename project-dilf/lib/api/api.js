var restrictions = require('../lib/restrictions'),
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
    }

};

module.exports = api;