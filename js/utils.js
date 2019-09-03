
export const utils = {
    insertSentenceHTML(errordiv, sentence, color = "black"){
        errordiv.innerHTML = sentence;
        errordiv.style.color = color;
    }
}
