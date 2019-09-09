const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const userRepository = require("../repository/userRepository.js");
const sessionRepository = require("../repository/sessionRepository.js");
const {validateCookie,setCookieTime} = require("../utils/utils.js");

router.get('/',async function (req, res, next) {
  
  const firstloading = req.query.firstloading || false;
  if(firstloading){
    res.send({title : "로그인", validatyCookie : req.validatyCookie});
  }else{
    res.render('index',{title:"로그인",address:"/loginpage", validatyCookie : req.validatyCookie});
  }

});
router.post('/login', async function (req, res, next) {
  
  const id = req.body.loginid;
  const password = req.body.loginpassword;
  const result = await userRepository.checkUser(id, password);
  if (result.length > 0) {
    const sessionid = uuidv4();
    await sessionRepository.insertSession(sessionid,result[0].user_id,result[0].user_name);
    res.cookie('sessionid', sessionid,{
      maxAge : setCookieTime()
    });
    res.send({ result: true, validatyCookie : {
      user_id : result[0].user_id,
      user_name : result[0].user_name
    } });
  } else {
    res.send({ result: false, validatyCookie : {
      user_id :"",
      user_name : ""
    } });
  }
});
router.get("/logout",async function(req,res,next){
  const sessionid = req.cookies.sessionid || 0;
  if(!sessionid)
      res.send({result: "error"});
  const result = await sessionRepository.deleteSession(sessionid);
  if(result){
    res.clearCookie('sessionid');
    res.send({result: true});
  }else
    res.send({result:false});
     
  // Error 처리 필요
});
module.exports = router;
