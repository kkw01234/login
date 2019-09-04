var express = require('express');
var router = express.Router();

/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  res.render("index", {title:`회원가입 폼`,address:"registerpage"});
});
router.get('/checkid',function(req,res,next){
    const id = req.params;
    console.log(id);
    res.send(false);
});
router.post('/register',function(req,res,next){
  const name = req.params;
  console.log(params);
});

module.exports = router;
