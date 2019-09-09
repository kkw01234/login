var express = require('express');
var router = express.Router();
const sessionRepository = require('../repository/sessionRepository.js');
const {validateCookie} = require('../utils/utils.js');
/* GET home page. */
router.get('/', async function (req, res, next) {
  const firstloading = req.query.firstloading;
  
  if (firstloading) {
    res.send({ title: "메인 페이지", validatyCookie: req.validatyCookie });
  } else
    res.render('index', { title: 'Main', address: "/", validatyCookie: req.validatyCookie });
});

module.exports = router;
