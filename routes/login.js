const express = require('express');
const router = express.Router();
const { appDAO } = require("../dao/appdao.js");
const { UserRepository } = require('../repository/userRepository.js');
const userRepository = new UserRepository(appDAO);
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

  if (result.length > 0) {
    console.log(true,JSON.stringify(result));
    res.send({ result: true });
  } else {
    console.log(false,JSON.stringify(result));
    res.send({ result: false });
  }
});
module.exports = router;
