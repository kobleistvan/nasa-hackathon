var express = require('express'),
    router = express.Router(),
    index = require('./index');

// Router that encapsulates every routing for the available pages
router.use('/', index);

module.exports = router;