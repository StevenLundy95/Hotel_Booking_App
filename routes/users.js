var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) {
    const sql = 'SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('users', {
            title: 'Users', userData1: data });
    });
});


module.exports = router;
