const {userdao} = require("../dao/userdao.js");
const express = require('express');
const router = express.Router();


/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  res.render("index", {title:`회원가입 폼`,address:"registerpage"});
});
router.post('/checkid',async function(req,res,next){
    const id = req.body.id;
    userdao.makeUser();
    
    const result = await userdao.checkId(id);
    console.log(result);
    res.send({result: result});
});
router.post('/register',function(req,res,next){
  const name= req.body;
  console.log(name);
});

module.exports = router;
