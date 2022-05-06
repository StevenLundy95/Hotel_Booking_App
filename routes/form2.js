var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form2', {
        title: 'Form2 Page' });
});

module.exports = router;
