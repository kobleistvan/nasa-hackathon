var express = require('express'),
    router = express.Router(),
    api = require('../../lib/api/api');

router.get('/', function(req, res, next) {
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