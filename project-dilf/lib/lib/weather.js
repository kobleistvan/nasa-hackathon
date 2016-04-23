var Forecast = require('forecast');

// Initialize the forecast retriever
var forecast = new Forecast({
    service: 'forecast.io',
    key: 'a7da4b553c9358976d78f91c3fdc7e95',
    units: 'celcius',
    cache: false
});

var weather = {

    // Returns the weather conditions for specific coordinates
    getWeatherConditions: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        forecast.get([data.lat, data.lon], function(err, weather) {
            if (err) {
                console.error("An error occured while getting weather data." + err);
                return callback("An error occured while getting weather data." + err);
            } else {
                return callback(null, {
                    success: true,
                    result: {
                        weather: weather
                    }
                });
            }
        });
    }

};

module.exports = weather;