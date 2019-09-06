var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const firstloading = req.query.firstloading;
  if(firstloading){
    res.send({title:"메인 페이지"})
  }else
     res.render('index', { title: 'Main',address:"/"});
});

module.exports = router;
