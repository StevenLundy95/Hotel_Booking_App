var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form3', {
        title: 'Form3 Page' });
});

module.exports = router;
