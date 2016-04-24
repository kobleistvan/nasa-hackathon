var express = require('express');
var router = express.Router();
var faqController = require('../../lib/web/faq');

/* GET home page. */
router.get('/', function(req, res, next) {
	faqController.greetUser({}, function(err, response) {
		if (err) {
			res.render('faq', {
				title: 'an error occured..'
			})
		} else {
		    res.render('faq', {
		        title: response.greeting
		    });
		}
	});
});

module.exports = router;