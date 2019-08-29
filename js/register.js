const user = ['kkw01234'];
const insertSentenceHTML = (errordiv, sentence, color = "black") => {
    errordiv.innerHTML = sentence;
    errordiv.style.color = color;
}


const id = {
    init() {
        let idchecking =false;
       
        const idform = document.querySelector("input[name=id]");
        const errordiv = document.querySelector("#nameError");
        idform.addEventListener("input", () => {
            idchecking = false;
            const sentence = this.checkId(idform.value);
            if(sentence === ""){
                idchecking = true;
                insertSentenceHTML(errordiv, "사용가능한 아이디입니다.", "green");
                return;
            }
            insertSentenceHTML(errordiv, sentence, "red");
        });
        this.clearIdForm = ()=>{
            idform.value = "";
            insertSentenceHTML(errordiv,"");
            idchecking =false;
        }
        this.getId = ()=>{
            if(idchecking)
                return idform.value;
        }
    },
    checkId(value) {
       
        if (!this.checkAvailableId(value)) {
            return ` 5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.`;
        }
        if (!this.findUser(value)) {
            return `이미사용중인 아이디 입니다.`;
        }
        return "";

    },
    checkAvailableId(id) {
        if (id.length < 5) {
            return false;
        }
        const regular = /[_0-9a-zA-z-]*/;
        const result = id.replace(regular, "");
        if (result.length === 0) {
            return true;
        } else return false;
    },
    findUser(id) {
        return user.every((value) => {
            return id !== value;
        });
    }
}

const password = {
    init() {
        let passwordChecking, reconfirmationPasswordChecking;
        const passwordform = document.querySelector("input[name=password]");
        const reconfirmationPasswordform = document.querySelector("input[name=reconfirmationPassword]");
        const passwordError = document.querySelector("#passwordError");
        const reconfirmationPasswordError = document.querySelector("#reconfirmationPasswordError");
        passwordform.addEventListener("input", () => {
            passwordChecking = false;
            const sentence = this.checkPassword(passwordform.value);
            insertSentenceHTML(passwordError, sentence == "" ? " 안전한 비밀번호입니다.": sentence, sentence =="" ? "green": "red");
            if(sentence ==""){
                passwordChecking = true;
                insertSentenceHTML(passwordError, "안전한 비밀번호입니다.", "green");
            }else{
                insertSentenceHTML(passwordError, sentence,"red");
            }
        });
        reconfirmationPasswordform.addEventListener("input", () => {
            reconfirmationPasswordChecking = false;
            const result = this.checkReconfirmationandPassword(passwordform.value, reconfirmationPasswordform.value)
            if(result){
                reconfirmationPasswordChecking = true;
                insertSentenceHTML(reconfirmationPasswordError,"비밀번호가 일치합니다.","green");
            }else
                insertSentenceHTML(reconfirmationPasswordError,"비밀번호가 일치하지 않습니다.", "red");
        });
        this.clearPasswordForm = ()=>{
            passwordform.value = "";
            reconfirmationPasswordform.value = "";
            insertSentenceHTML(passwordError,"");
            insertSentenceHTML(reconfirmationPasswordError,"");
            passwordChecking =false;
        };
        this.getPassword = () =>{
            if(passwordChecking && reconfirmationPasswordChecking){
                return passwordform.value;
            }
            return false;
        }
    },
    checkPassword(value) {
        if (value.length < 8) {
            return `8자 이상 16자 이하로 입력해주세요.`;
        }
        let regExp = /[A-Z]/;
        let result = regExp.test(value);
        if (!result) { 
            return `영문 대문자를 최소 1자 이상 포함해주세요. `;
        };
        regExp = /[0-9]/;
        result = regExp.test(value);
        if (!result) {
            return  `숫자를 최소 1자 이상 포함해주세요.`;
        }
        regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
        result = regExp.test(value);
        if (!result) {
            return `특수문자를 최소 1자 이상 포함해주세요.`;
        }
        return ``;
    },
    checkReconfirmationandPassword(password, reconfirmationPassword) {

        if (password === reconfirmationPassword) {
            return true;
        }
        return false;
    },


}
const name = {
    init(){
        const nameForm = document.querySelector('input[name=name]');
        this.clearNameForm = ()=>{
            nameForm.value = "";
        }
        this.getName = () =>{
            return nameForm.value;
        }
    }
}
const birth = {
    init() {
        let yearChecking, monthChecking, dateChecking;
        const birthYearform = document.querySelector('input[name=birthYear]');
        const birthMonthform = document.querySelector('Select[name=birthMonth]');
        const birthDateform = document.querySelector('input[name=birthDate]');
        const errordiv = document.querySelector('#birthError');
        for (let i = 1; i <= 12; i++) {
            birthMonthform.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`)
        }
        birthYearform.addEventListener("input", () => {
            yearChecking = false;
            const sentence = this.checkBirthYear(birthYearform.value);
            insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
            if(sentence == ""){
                yearChecking = true;
            }

        });
        birthMonthform.addEventListener("input", () => {
            monthChecking = false;
            const sentence = this.checkBirthMonth(birthMonthform.value);
            console.log(birthMonthform.value);
            insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
            if(sentence == ""){
                monthChecking = true;
            }
        });
        birthDateform.addEventListener("input", () => {
            dateChecking =false;
            const sentence = this.checkBirthDate(birthYearform.value, birthMonthform.value, birthDateform.value);
            insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
            if(sentence == ""){
                dateChecking = true;
            }
        });
        this.clearBirthForm = () => {
            birthYearform.value = "";
            birthMonthform.value = "";
            birthDateform.value = "";
            insertSentenceHTML(errordiv,"");
            yearChecking =false;
            monthChecking = false;
            dateChecking = false;
        }
        this.getBirth = ()=>{
            if(yearChecking && monthChecking && dateChecking){
                return [birthYearform.value, birthMonthform.value, birthDateform.value];
            }
            return false;
        }
    },
    checkBirthYear(year) {
        if (year.length != 4) {
            return "태어난 년도 4자리를 정확하게 입력하세요";
        }
        const date = new Date().getFullYear();
        if (date - year < 15 || date - year > 99) {
            return "15세 이상 99세 이하일 경우만 회원가입 하실 수 있습니다.";
        }
        return "";
    },
    checkBirthMonth(month) {
        if (month == "") {
            return "월을 선택해주세요";
        }
        return "";
    },
    checkBirthDate(year, month, date) {
        const birthYear = this.checkBirthYear(year);
        if (!birthYear == "") {
            return birthYear;
        }
        if (date < 0) {
            return `정확히 입력해주세요`;
        }
        switch (month * 1) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if (date > 31) {
                    return `${month}월은 31일까지 있습니다.`;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if (date > 30) {
                    return `${month}월은 30일까지 있습니다.`;
                }
                break;
            case 2:
                if (this.checkLeapYear(year)) {
                    if (date > 29) {
                        return `${year}년 ${month}월은 29일까지 있습니다.`;
                    }
                }
                if (date > 28) {
                    return `${year}년 ${month}월은 28일까지 있습니다.`;
                }
                break;
            default:
                console.log(month)
                return `월을 선택해주세요`;
        }
        return ``;
    },
    checkLeapYear(year) {
        if (year % 4) {
            if (year % 100) {
                if (year % 400) {
                    return true;
                }
                return false;
            }
            return true;
        }
    }
    
}
const gender = {
    init() {
        const genderform = document.querySelector("select[name=gender]");
        this.clearGenderform = ()=>{
            genderform.value = "";
            
        }
        this.getGender = ()=>{
            if(genderform.value !== "")
                return genderform.value;
            return false;
        }
    }
}
const email = {
    init() {
        let emailChecking = false;
        const emailform = document.querySelector("input[name=email]");
        emailform.addEventListener("input", () => {
            emailChecking = false;
            const errordiv = document.querySelector("#emailError");
            const sentence = this.checkEmail(emailform.value);
            insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
            if(sentence === ""){
                emailChecking = true;
            }
        });
        this.clearEmailForm = ()=>{
            emailform.value = "";
            insertSentenceHTML(errordiv,"");
            emailChecking =false;
        };
        this.getEmail = () =>{
            if(emailChecking){
                return emailform.value;
            }
            return false;
        };
    },
    checkEmail(email) {
        const regExp = /[^@]+@[^@]+.[^@]+/;
        const result = regExp.test(email);
        return result ? "" : "이메일 주소를 확인하세요";
    }
}
const phone = {

    init() {
        let phoneChecking =false;
        const phoneform = document.querySelector("input[name=phone]");
        const errordiv = document.querySelector("#phoneError");
        phoneform.addEventListener("input", () => {
            phoneChecking = false;
            const sentence = this.checkPhone(phoneform.value);
            insertSentenceHTML(errordiv, sentence, sentence === "" ? "black" : "red");
            if(sentence === ""){
                phoneChecking = true;
            }
        });
        this.clearPhoneForm =  ()=>{
            phoneform.value = "";
            insertSentenceHTML(errordiv, "");
            phoneChecking =false;
        };
        this.getPhone = ()=>{
            if(phoneChecking){
                return phoneform.value;
            }
            return false;
        }
    },
    checkPhone(phone) {
        if (phone.length < 10 || phone.length > 11) {
            return "형식에 맞지 않는 번호입니다.";
        } else if (!(phone[0]*1 === 0 && phone[1]*1 === 1 && phone[2]*1 === 0)) {
            return "형식에 맞지 않는 번호입니다.";
        }
        const regExp = /[0-9]+/;
        const result = regExp.test(phone);
        console.log(result);
        return result ? "" : "형식에 맞지 않는 번호입니다.";
    }
}
const interestsError = {
    //나중에
    init() {

    }
}
const terms = {
    init() {
        const openingmodal = document.querySelector(".terms-container");
        openingmodal.addEventListener("click",()=>{
            const modalContent = document.querySelectorAll(".modal-content")[0];
            console.log(modalContent)
            modal.style.display = "block";
            modalContent.appendChild(`<p>안녕하세요!!!</p>`);
           
            
        });
    }
}

const initializationButton = {
    init() {
        const initialization = document.querySelector("#initialization-button");
        initialization.addEventListener("click", () => {
            id.clearIdForm();
            password.clearPasswordForm();
            name.clearNameForm();
            birth.clearBirthForm();
            gender.clearGenderform();
            email.clearEmailForm();
            phone.clearPhoneForm();

        });
    }
}
const registerButton = {
    init(){
        const register = document.querySelector('#register-button');
        register.addEventListener("click", ()=>{
                const idValue = id.getId();
                const passwordValue = password.getPassword();
                const nameValue = name.getName();
                const birthValue = birth.getBirth();
                const genderValue = gender.getGender();
                const emailValue = email.getEmail();
                const phoneValue = phone.getPhone();
                console.log(idValue, passwordValue, nameValue,birthValue,genderValue,emailValue,phoneValue);
                if(idValue && passwordValue && nameValue && birthValue && genderValue && emailvalue && phoneValue){
                    console.log(idValue, passwordValue, nameValue,birthValue,genderValue,emailValue,phoneValue);
                }else
                    console.log("확인하고 읽어주세요");
                

        });
    }
}



id.init();
password.init();
name.init();
birth.init();
gender.init();
email.init();
phone.init();
interestsError.init();
terms.init();
registerButton.init();
initializationButton.init();