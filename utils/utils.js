/**
 * 쿠키가 있으면 true, 없으면 false를 반환하는 함수
 * @param {Array} cookie db에서 sessionid에 맞는 cookie를 가져온 함수
 * @returns {Boolean} 쿠키가 있으면 true, 없으면 false를 반환하는 함수
 */

const validateCookie = (cookie)=>{
    if(Array.isArray(cookie) && cookie.length >0)
        return true;
    else return false;
}
/**
 * @returns {Number} return expired cookie timer
 */
const setCookieTime = ()=>{
    return 1000 * 60 * 10;
}

module.exports = {
    validateCookie,
    setCookieTime
}