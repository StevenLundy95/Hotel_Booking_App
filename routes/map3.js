var express = require('express');
const db = require("../database");
var router = express.Router();

router.get('/', function(req, res, next) {
    const sql = 'SELECT * FROM hotels';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('map3', {dropdownVals: data });
    });
});
module.exports = router;


