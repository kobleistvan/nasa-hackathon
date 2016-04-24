var express = require('express'),
    router = express.Router(),
    utils = require('../../lib/utils/useful'),
    api = require('../../lib/api/api');

// Get the restricted zones for a specific coordinate in a range of 5 km
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

    // Retrieve the restricted areas

    api.getRestrictedZones({
        lat: req.query.lat,
        lon: req.query.lon
    }, function(err, response) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                message: "An error occured."
            })
        } else {
            return res.json(response);
        }
    });
});

// Get the restricted zones for a specific coordinate in a custom range
router.get('/range', function(req, res, next) {

    // Validate coordonates

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

    // Validate range

    if (!req.query.range) {
        return res.json({
            success: false,
            message: "Please specify the range in meters."
        })
    }

    if (req.query.range && (req.query.range > 30000 || req.query.range < 500)) {
        return res.json({
            success: false,
            message: "Ranges are in meters. It should be between 500 meters and 30.000 meters."
        })
    }

    // Retrieve the restricted areas

    api.getRestrictedZones({
        lat: req.query.lat,
        lon: req.query.lon,
        range: req.query.range
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: "An error occured."
            })
        } else {
            return res.json(response);
        }
    });

});


// Save a new restricted zone
router.get('/x', function(req, res, next) {

    // Validate coordinates

    // Save the restricted area

    api.saveRestrictedZone({
        restrictionCategory: 'categoryA',
        lat: 33.333,
        lon: 44.444,
        name1: 'batman1',
        name2: 'batman2',
        country: 'transylvania'

    }, function(err, response) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                message: "An error occured."
            })
        } else {
            return res.json(response);
        }
    });
});

module.exports = router;