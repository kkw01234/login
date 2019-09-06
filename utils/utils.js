const validateCookie = (cookie)=>{
    if(cookie.length >0)
        return true;
    else return false;
}

module.exports = {
    validateCookie
}