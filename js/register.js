
const insertSentenceHTML = (errordiv, sentence, color = "black") => {
    errordiv.innerHTML = sentence;
    errordiv.style.color = color;
}

const birth = {
    init() {
        const birthMonth = document.querySelector("select[name=birthMonth]");
        for (let i = 1; i <= 12; i++) {
            birthMonth.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`)
        }

    }
}
birth.init();

const IdError = {
    init() {
        let idchecking =false;
        this.user = ['kkw01234'];
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
        return this.user.every((value) => {
            return id !== value;
        });
    }
}

const passwordError = {
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
            insertSentenceHTML(reconfirmationPasswordError,"")
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
const nameCheck = {
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
const BirthError = {
    init() {
        let yearChecking, monthChecking, dateChecking;
        const birthYearform = document.querySelector('input[name=birthYear]');
        const birthMonthform = document.querySelector('Select[name=birthMonth]');
        const birthDateform = document.querySelector('input[name=birthDate]');
        const errordiv = document.querySelector('#birthError');
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
const genderError = {
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
const emailError = {
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
const phoneError = {

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
            console.log(phone[0],phone[1],phone[2]);
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

    }
}

const initializationButton = {
    init() {
        const initialization = document.querySelector("#initialization-button");
        initialization.addEventListener("click", () => {
            IdError.clearIdForm();
            passwordError.clearPasswordForm();
            nameCheck.clearNameForm();
            BirthError.clearBirthForm();
            genderError.clearGenderform();
            emailError.clearEmailForm();
            phoneError.clearPhoneForm();

        });
    }
}
const registerButton = {
    init(){
        const register = document.querySelector('#register-button');
        register.addEventListener("click", ()=>{
                const id = IdError.getId();
                const password = passwordError.getPassword();
                const name = nameCheck.getName();
                const birth = BirthError.getBirth();
                const gender = genderError.getGender();
                const email = emailError.getEmail();
                const phone = phoneError.getPhone();
                if(id && password && name && birth && gender && email && phone){
                    console.log(id, password, name,birth,gender,email,phone);
                }else
                    console.log("확인하고 읽어주세요");
                

        });
    }
}

IdError.init();
passwordError.init();
nameCheck.init();
BirthError.init();
genderError.init();
emailError.init();
phoneError.init();
interestsError.init();
terms.init();
registerButton.init();
initializationButton.init();