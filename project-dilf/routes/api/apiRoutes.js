var express = require('express'),
    router = express.Router(),
    weather = require('./weather'),
    restricted = require('./restricted');

// Define routes to various API related handlers
router.use('/weather', weather);
router.use('/restricted', restricted);

module.exports = router;