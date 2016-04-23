var express = require('express');
var router = express.Router();
var indexController = require('../../lib/web/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	indexController.greetUser({}, function(err, response) {
		if (err) {
			res.render('index', {
				title: 'an error occured..'
			})
		} else {
		    res.render('index', {
		        title: response.greeting
		    });
		}
	});
});

module.exports = router;