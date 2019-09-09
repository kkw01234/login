const validateCookie = (cookie)=>{
    if(Array.isArray(cookie) && cookie.length >0)
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