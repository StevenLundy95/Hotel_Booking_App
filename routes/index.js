var express = require('express');
const db = require("../database");
var router = express.Router();

router.get('/', function(req, res, next) {
  const sql = 'SELECT * FROM users';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('index', {
      title: 'Index', userData3: data });
  });
});

module.exports = router;
