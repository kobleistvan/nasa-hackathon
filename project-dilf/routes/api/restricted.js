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
router.post('/', function(req, res, next) {

    // Validate coordinates

    if (!req.body.lat) {
        return res.json({
            success: false,
            message: "Please specify the latitude."
        })
    }

    if (!req.body.lon) {
        return res.json({
            success: false,
            message: "Please specify the longitude."
        })
    }

    if (!utils.isValidLat(req.body.lat) || !utils.isValidLon(req.body.lon)) {
        return res.json({
            success: false,
            message: "Latitude or longitude invalid."
        })
    }

    if (!req.body.name) {
        return res.json({
            success: false,
            message: "Please specify a name."
        })
    }

    if (!req.body.city) {
        return res.json({
            success: false,
            message: "Please specify the city."
        })
    }

    if (!req.body.country) {
        return res.json({
            success: false,
            message: "Please specify the country."
        })
    }

    if (!req.body.restrictionCategory || (req.body.restrictionCategory && (req.body.restrictionCategory !== 'categoryA' && req.body.restrictionCategory !== 'categoryB' && req.body.restrictionCategory !== 'noFly'))) {
        return res.json({
            success: false,
            message: "Please specify the category. (categoryA || categoryB || noFly)"
        })
    }

    if (req.body.polygonPoints && req.body.polygonPoints.length > 0) {
        for (var i = 0; i < req.body.polygonPoints.length; i++) {
            if (!utils.isValidLat(req.body.polygonPoints[i].lat) || !utils.isValidLon(req.body.polygonPoints[i].lon)) {
                return res.json({
                    success: false,
                    message: "Latitude or longitude invalid (polygon)."
                })
            }
        }
    }

    // Save the restricted area

    api.saveRestrictedZone({
        // polygonPoints: [{
        //     lat: 33.1,
        //     lon: 44.1
        // }, {
        //     lat: 34.1,
        //     lon: 45.1
        // }, {
        //     lat: 35.1,
        //     lon: 46.1
        // }, {
        //     lat: 33.1,
        //     lon: 44.1
        // } ],
        // restrictionCategory: 'categoryA',
        // lat: 33.333,
        // lon: 44.444,
        // name: 'batman1',
        // city: 'batman2',
        // country: 'transylvania'

        polygonPoints: req.body.polygonPoints || [],
        restrictionCategory: req.body.restrictionCategory,
        lat: req.body.lat,
        lon: req.body.lon,
        name: req.body.name,
        city: req.body.city,
        country: req.body.country

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