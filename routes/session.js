var express = require('express');
var router = express.Router();

router.use(async function(req,res,next){ 
    setImmediate(()=>{
      sessionRepository.deleteTimeoutSession();
    });
    try{
      const cookie = await sessionRepository.selectSession(req.cookies.sessionid || 0); //get
      sessionRepository.updateSessionTime(cookie[0]);
  
      if(cookie.length > 0){
        res.cookie('sessionid', cookie[0].session_id,{
          maxAge : setCookieTime()
        });
        if(validateCookie(cookie))
            req.validatyCookie = {
              user_id : cookie[0].user_id,
              user_name : cookie[0].user_name
            };
      }else
          req.validatyCookie = {user_id : "", user_name :""};
      console.log(req.validatyCookie);
      next();
    }catch(e){
      next(e);
    }
});