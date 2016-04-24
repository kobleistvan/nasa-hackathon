var express = require('express'),
    router = express.Router(),
    index = require('./index'),
    faq = require('./faq');

// Router that encapsulates every routing for the available pages
router.use('/', index);
router.use('/faq', faq);

module.exports = router;