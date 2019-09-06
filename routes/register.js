const {appDAO} = require("../dao/appdao.js")
const userRepository = require("../repository/userRepository.js");
const sessionRepository = require("../repository/sessionRepository.js");
const express = require('express');
const router = express.Router();


/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  const firstloading = req.query.firstloading || false;
  if(firstloading){
    res.send({title:"회원가입 폼"});
  }else
    res.render("index", {title:`회원가입 폼`,address:"/registerpage"});
});
router.post('/checkid',async function(req,res,next){
    const id = req.body.id;
    userRepository.makeUser();
    const result = await userRepository.checkId(id);
    res.send({result: result.length > 0 ? true : false});
});
router.post('/register',async function(req,res,next){

    const sessionid = req.cookies.sessionid || 0;
    if(sessionid){
      res.send({result :"error"});
    }
    const result = await userRepository.insertUser(req.body);
    if(result){
      res.send({result : true});
      // res.render("index",{title: "메인페이지", address:""});
    }else
      res.send({result : "error"});
});

module.exports = router;
