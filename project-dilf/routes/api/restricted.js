var express = require('express'),
    router = express.Router(),
    api = require('../../lib/api/api');

// Get the restricted zones for a specific coordonate in a range of 5 km
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

    api.getRestrictedZones({
        lat: req.query.lat,
        lon: req.query.lon
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: "An error occured."
            })
        } else {
            res.json(response);
        }
    });
});

// Get the restricted zones for a specific coordonate in a custom range
router.get('/range', function(req, res, next) {
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

    if (!req.query.range) {
        return res.json({
            success: false,
            message: "Please specify the range in kilometers."
        })
    }

    if (req.query.range && req.query.range > 30) {
        return res.json({
            success: false,
            message: "You don't need a 30+ range."
        })
    }

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
            res.json(response);
        }
    });
});

module.exports = router;