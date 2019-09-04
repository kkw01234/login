var express = require('express');
var router = express.Router();

/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  res.render("index", {title:`회원가입 폼`,address:"registerpage"});
});

module.exports = router;
