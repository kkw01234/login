const validateCookie = (cookie)=>{
    if(cookie.length >0)
        return true;
    else return false;
}
const setCookieTime = ()=>{
    return 1000 * 60 * 10;
}

module.exports = {
    validateCookie,
    setCookieTime
}