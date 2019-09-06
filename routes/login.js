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
  userRepository.checkUser(id, password).then((result)=>{
    if(result.length > 0){
      res.send({result:true});
      // res.render("index",{title: "메인페이지", address:""});
    }else {
      console.log(JSON.stringify(result));
      res.send({result : false});
      // res.redirect("/loginpage");
    }
  
  ;
 
 
  });
});
module.exports = router;
