
const userRepository = require("../repository/userRepository.js");
const sessionRepository = require("../repository/sessionRepository.js");
const express = require('express');
const router = express.Router();
const {validateCookie,setCookieTime} = require("../utils/utils.js");
const uuidv4 = require('uuid/v4');
/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  const firstloading = req.query.firstloading || false; 
  if(firstloading){
    res.send({title:"회원가입 폼",validatyCookie:req.validatyCookie});
  }else
    res.render("index", {title:`회원가입 폼`,address:"/registerpage",validatyCookie:req.validatyCookie});
});
router.post('/checkid',async function(req,res,next){
    const id = req.body.id;
    try{
      await userRepository.makeUser();
      const result = await userRepository.checkId(id);
      res.send({result: result.length > 0 ? true : false});
    }catch(e){
      next(e);
    }
  
});
router.post('/register',async function(req,res,next){

    // const sessionid = req.cookies.sessionid || 0;
    // if(sessionid){
    //   res.send({result :"if you want to sign up, log out first"});
    // }
    console.log(req.body);
    try{
      const userResult = await userRepository.insertUser(req.body);
      console.log(userResult);
      const sessionid = uuidv4();
      const sessionResult = await sessionRepository.insertSession(sessionid,req.body.id,req.body.name);
      if(userResult){
        res.cookie('sessionid', sessionid,{
          maxAge : setCookieTime()
        })
        res.send({result : true,validatyCookie:{user_id : req.body.id, user_name:req.body.name}});
        // res.render("index",{title: "메인페이지", address:""});
      }else
        res.send({result : false,validatyCookie:false});
    }catch(e){
      // console.log(e);
      next(e);
    }
   
});

module.exports = router;
