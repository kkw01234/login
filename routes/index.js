var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const firstloading = req.query.firstloading;
  console.log(req.validatyCookie);
  if (firstloading) {
    res.send({ title: "메인 페이지", validatyCookie: req.validatyCookie});
  } else
    res.render('index', { title: '메인 페이지', address: "/", validatyCookie: req.validatyCookie});
});

module.exports = router;
