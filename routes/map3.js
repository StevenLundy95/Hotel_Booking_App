var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('map3', {
        title: 'Map3 Page' });
});

module.exports = router;
