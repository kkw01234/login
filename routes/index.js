var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Home");
  res.render('index', { title: '1234', address: `` });
});

module.exports = router;
