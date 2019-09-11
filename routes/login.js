const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const userRepository = require("../repository/userRepository.js");
const sessionRepository = require("../repository/sessionRepository.js");
const {setCookieTime} = require("../utils/utils.js");

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
  try{
    const result = await userRepository.checkUser(id, password);
    console.log(result)
    if (result.length > 0) {
      const session_id = uuidv4();
      await sessionRepository.insertSession(session_id,result[0].user_id,result[0].user_name);
      res.cookie('session_id', session_id,{
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
  }catch(e){
    next(e);
  }
 
});
router.get("/logout",async function(req,res,next){
  try{
    const session_id = req.cookies.sessionid || 0;
    if(!session_id)
        res.send({result: false});
    const result = await sessionRepository.deleteSession(session_id);
    if(result){
      res.clearCookie('sessionid');
      res.send({result: true});
    }else
      res.send({result:false});
  }catch(e){
    next(e);
  }
  
     
  // Error 처리 필요
});
module.exports = router;
