const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const userRepository = require("../repository/userRepository.js");
const sessionRepository = require("../repository/sessionRepository.js");

/* GET registerpage listing. */
router.get('/', function (req, res, next) {
  const firstloading = req.query.firstloading || false;
  if(firstloading){
    res.send({title : "로그인"});
  }else{
    res.render('index',{title:"로그인",address:"/loginpage"});
  }

});
router.post('/login', async function (req, res, next) {
  const id = req.body.loginid;
  const password = req.body.loginpassword;
  const result = await userRepository.checkUser(id, password);
  console.log(result);
  if (result.length > 0) {
    const sessionid = uuidv4();
    await sessionRepository.insertSession(sessionid,result[0].user_id,result[0].user_name);
    res.cookie('sessionid', sessionid,{
      maxAge : 1000 * 60 * 10
    })
    res.send({ result: true });
  } else {
    console.log(false,JSON.stringify(result));
    res.send({ result: false });
  }
});
router.get("/logout",async function(req,res,next){
  const sessionid = req.cookies.sessionid || 0;
  if(!sessionid)
      res.send({result: "error"});
  const result = await sessionRepository.deleteSession(sessionid);
  if(result)
      req.clearCookie('sessionid');
      res.send({result: true});
  // Error 처리 필요
});
module.exports = router;
