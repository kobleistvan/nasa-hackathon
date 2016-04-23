var express = require('express'),
    router = express.Router(),
    webRoutes = require('./web/webRoutes'),
    apiRoutes = require('./api/apiRoutes');

// Router that encapsulates every routing for the available pages and API. NEVER INTERCHANGE THEM!
router.use('/api', apiRoutes);

// Catch 404 under /api routes
router.use('/api', function(req, res) {
    res.status(404);
    return res.json({
        message: 'These aren\'t the droids you\'re looking for... Move along.'
    });
});

router.use('/', webRoutes);

module.exports = router;