var express = require('express'),
    router = express.Router(),
    weather = require('./weather'),
    restricted = require('./restricted'),
    drone = require('./drone');

// Define routes to various API related handlers
router.use('/drone', drone);
router.use('/weather', weather);
router.use('/restricted', restricted);

module.exports = router;