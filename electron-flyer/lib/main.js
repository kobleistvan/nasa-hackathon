var request = require('request');


var main = {

    getWeather: function(data, callback) {

        var lat = data.lat || 46.7712;
        var lon = data.lon || 23.6236;

        request('http://localhost:3000/api/weather?lat=' + lat + '&lon=' + lon, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return callback(null, response.body);
            } else {
            	return callback(error);
            }
        })
    },


    getRestrictedZones: function(data, callback) {

        var lat = data.lat || 46.7712;
        var lon = data.lon || 23.6236;


        request('http://localhost:3000/api/restricted' + (data.range ? '/range' : '') + '?' + (data.range ? 'range=' + data.range + '&' : '') + 'lat=' + lat + '&lon=' + lon, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return callback(null, response.body);
            } else {
            	return callback(error);
            }
        })
    }


}

module.exports = main;