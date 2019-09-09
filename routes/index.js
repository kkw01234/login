var express = require('express');
var router = express.Router();
const sessionRepository = require('../repository/sessionRepository.js');
const {validateCookie,setCookieTime} = require('../utils/utils.js');
/* GET home page. */
router.get('/', async function (req, res, next) {
  const firstloading = req.query.firstloading;
  const validatyCookie = await sessionRepository.selectSession(req.cookies.sessionid || 0);

  if (firstloading) {
    res.send({ title: "메인 페이지", validatyCookie: validateCookie(validatyCookie) });
  } else
    res.render('index', { title: 'Main', address: "/", validatyCookie: validateCookie(validatyCookie) });
});

module.exports = router;
