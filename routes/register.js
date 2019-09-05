const {appDAO} = require("../dao/appdao.js")
const {UserRepository} = require("../repository/userRepository.js");
const express = require('express');
const router = express.Router();
const userRepository = new UserRepository(appDAO);

/* GET registerpage listing. */
router.get('/', function(req, res, next) {
  res.render("index", {title:`회원가입 폼`,address:"registerpage"});
});
router.post('/checkid',async function(req,res,next){
    const id = req.body.id;
    userRepository.makeUser();
    
    const result = await userRepository.checkId(id);
    console.log(result);
    res.send({result: result.length > 0 ? true : false});
});
router.post('/register',function(req,res,next){
    console.log(req.body);
    userRepository.insertUser(req.body);
    
});

module.exports = router;
