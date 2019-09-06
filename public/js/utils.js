
const user = {
    id : "kkw01234",
    password : "aaaa"
}
const insertSentenceHTML = (errordiv, sentence, color = "black")=>{
    errordiv.innerHTML = sentence;
    errordiv.style.color = color;
}
const getCookie = ()=>{
    const cookies = document.cookie.split(";");
    const cookie = new Object();
    cookies.reduce((prev,curr)=>{
        const a = curr.split("=");
        prev[a[0].trim()] = a[1];
    },cookie);
    
    return cookie;
    
}


export {
    insertSentenceHTML,
    user,
    getCookie
}