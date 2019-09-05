const express = require('express');
const router = express.Router();
const {appDAO} = require("../dao/appdao.js");
const {UserRepository} = require('../repository/userRepository.js');
const userRepository = new UserRepository(appDAO);
/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  res.render("index", {title:`로그인`,address:"loginpage"});
});
router.post('/login',async function(req,res,next){
  const id = req.body.loginid;
  const password = req.body.loginpassword;
  const result = userRepository.checkUser(id, password);
  if(await result.length > 0){

    res.redirect("/");
    // res.render("index",{title: "메인페이지", address:""});
  }else 
    res.send({result : "error"});
    res.redirect("/loginpage");
});

module.exports = router;
