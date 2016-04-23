var express = require('express'),
    router = express.Router(),
    // middlewares = require('../middlewares'),
    weather = require('./weather'),
    drone = require('./drone');

// Define routes to various API related handlers
router.use('/drone', drone);
router.use('/weather', weather);

module.exports = router;