var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('map_2', {
        title: 'Map_2 Page' });
});

module.exports = router;
