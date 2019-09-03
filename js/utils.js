
const user = {
    id : "kkw01234",
    password : "aaaa"
}
const insertSentenceHTML = (errordiv, sentence, color = "black")=>{
    errordiv.innerHTML = sentence;
    errordiv.style.color = color;
}


export {
    insertSentenceHTML,
    user
}