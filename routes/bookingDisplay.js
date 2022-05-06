var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/', function(req, res, next) {
    const sql = 'SELECT * FROM booking';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
    res.render('bookingDisplay', {
        title: 'bookingDisplay', userData: data });
});
});

module.exports = router;
