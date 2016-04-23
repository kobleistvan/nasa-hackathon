var express = require('express'),
    router = express.Router(),
    utils = require('../../lib/utils/useful'),
    api = require('../../lib/api/api');

// Return useful weather condition info for specific coordinates
router.get('/', function(req, res, next) {

	// Validate coordinates

    if (!req.query.lat) {
        return res.json({
            success: false,
            message: "Please specify the latitude."
        })
    }

    if (!req.query.lon) {
        return res.json({
            success: false,
            message: "Please specify the longitude."
        })
    }

    if (!utils.isValidLat(req.query.lat) || !utils.isValidLon(req.query.lon)) {
        return res.json({
            success: false,
            message: "Latitude or longitude invalid."
        })
    }

    api.getWeather({
        lat: req.query.lat,
        lon: req.query.lon
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: "An error occured while retrieving weather data."
            })
        } else {
            res.json(response);
        }
    });
});

module.exports = router;