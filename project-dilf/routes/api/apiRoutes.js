var express = require('express'),
    router = express.Router(),
    // middlewares = require('../middlewares'),
    map = require('./map'),
    drone = require('./drone');

// Define routes to various API related handlers
router.use('/drone', drone);
router.use('/map', map);

module.exports = router;