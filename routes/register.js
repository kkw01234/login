
const userRepository = require("../repository/userRepository.js");
const sessionRepository = require("../repository/sessionRepository.js");
const express = require('express');
const router = express.Router();
const {validateCookie} = require("../utils/utils.js");
const uuidv4 = require('uuid/v4');
/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  const firstloading = req.query.firstloading || false; 
  const cookie = sessionRepository.selectSession(req.cookies.sessionid||0);
  if(firstloading){
    res.send({title:"회원가입 폼",validatyCookie:validateCookie(cookie)});
  }else
    res.render("index", {title:`회원가입 폼`,address:"/registerpage",validatyCookie:validateCookie(cookie)});
});
router.post('/checkid',async function(req,res,next){
    const id = req.body.id;
    userRepository.makeUser();
    const result = await userRepository.checkId(id);
    res.send({result: result.length > 0 ? true : false});
});
router.post('/register',async function(req,res,next){

    // const sessionid = req.cookies.sessionid || 0;
    // if(sessionid){
    //   res.send({result :"if you want to sign up, log out first"});
    // }
    const userResult = await userRepository.insertUser(req.body);
    const sessionid = uuidv4();
    const sessionResult = await sessionRepository.insertSession(sessionid,req.body.id,req.body.name);
    if(userResult){
      res.cookie('sessionid', sessionid,{
        maxAge : 1000 * 60 * 10
      })
      res.send({result : true,validatyCookie:true});
      // res.render("index",{title: "메인페이지", address:""});
    }else
      res.send({result : false,validatyCookie:false});
});

module.exports = router;
