var express = require('express');
var router = express.Router();
const sessionRepository = require('../repository/sessionRepository.js');
const {setCookieTime,validateCookie} = require('../utils/utils.js');
router.use(async function(req,res,next){ 
    setImmediate(()=>{
      sessionRepository.deleteTimeoutSession();
    });
    try{
      const cookie = await sessionRepository.selectSession(req.cookies.session_id || 0); //get
      sessionRepository.updateSessionTime(cookie);
  
      if(cookie.session_id){
        res.cookie('session_id', cookie.session_id,{
          maxAge : setCookieTime()
        });
        if(validateCookie(cookie))
            req.validatyCookie = {
              user_id : cookie.user_id,
              user_name : cookie.user_name
            };
      }else
          req.validatyCookie = {user_id : "", user_name :""};
      console.log(req.validatyCookie);
      next();
    }catch(e){
      next(e);
    }
});

module.exports = router;