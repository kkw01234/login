var express = require('express');
var router = express.Router();

/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  res.render("index", {title:`로그인`,address:"loginpage"});
});

module.exports = router;
