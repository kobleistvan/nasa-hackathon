var express = require('express'),
    router = express.Router(),
    api = require('../../lib/api/api');

router.get('/', function(req, res, next) {
    api.droneTest({
        test: "data"
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