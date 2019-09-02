// let page = "login";
const users = {
    id: "kkw01234",
    password: "aaaa"
};
const loginPage = ()=> {
   
    this.loginForm = {
        init() {
            // loginForm.checkIDAndPassword();
        },
        makeLoginPage() {
            const loginContainer = document.createElement("div");
            const logoContainer = document.createElement("div");
            const form = document.createElement('form');
           
            const idContainer = document.createElement("div");
            const passwordContainer = document.createElement("div");
            const loginButtonContainer = document.createElement("div");
            const registerButtonContainer = document.createElement("div");
            const loginError = document.createElement("div");
            logoContainer.innerHTML = `<div class="col-md-3 col-xs-3 col-sm-3"></div><header class="col-md-7 col-xs-7 col-sm-7">BoostCamp Login</header>`;
            loginContainer.className = "container";
            loginContainer.id = "login-container";
            this.getloginContainer = () => {
                return loginContainer;
            }
            // loginContainer.style.textAlign = "center";
            idContainer.className = "row";
            passwordContainer.className = "row";
            loginButtonContainer.className = "row";
            registerButtonContainer.className = "row";
            loginError.innerHTML = `<div class="col-md-3 col-xs-3 col-sm-3"></div><p class="col-md-7 col-xs-7 col-sm-7" id="printError"></p>`;
            this.makeForm(idContainer, "id");
            this.makeForm(passwordContainer, "password");
            this.makeLoginButton(loginButtonContainer, "로그인");
            this.makeRegisterButton(registerButtonContainer, "회원가입");
            loginContainer.appendChild(logoContainer);
            form.appendChild(idContainer);
            form.appendChild(passwordContainer);
            form.appendChild(loginButtonContainer);
            form.appendChild(registerButtonContainer);
            form.setAttribute("action","./main.html");
            form.setAttribute("method","get");
            form.setAttribute("name","login");
            form.setAttribute("onsubmit","return loginForm.checkIDAndPassword()");
            loginContainer.appendChild(form);
            loginContainer.appendChild(loginError);  


            return loginContainer;

        },
        makeForm(container, type) {
            const align1 = document.createElement('div');
            const align2 = document.createElement('div');
            align1.className = "col-md-3 col-xs-3 col-sm-3";
            align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
            align2.innerHTML = `<input type='${type == "id" ? "text" : "password"}' class="form-control input-lg" name="login${type}" placeholder="${type}">`;

            container.appendChild(align1);
            container.appendChild(align2);
        },
        makeLoginButton(container, type) {
            const align1 = document.createElement('div');
            const align2 = document.createElement('div');
            const submit = document.createElement("input");
            submit.setAttribute("type","submit");
            submit.className = "btn btn-success btn-lg";
            submit.id = `loginbutton`;
            submit.textContent = type;
            submit.style.width = "100%";
            align1.className = "col-md-3 col-xs-3 col-sm-3";
            align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
            align2.appendChild(submit);
            container.appendChild(align1);
            container.appendChild(align2);
        },
        makeRegisterButton(container, type) {
            const align1 = document.createElement('div');
            const align2 = document.createElement('div');
            const button = document.createElement("button");
            button.type = "button";
            button.className = "btn btn-success btn-lg";
            button.id = `$passwordbutton`;
            button.textContent = type;
            button.style.width = "100%";
            button.addEventListener("click", () => {
                    window.location.href = "./main.html#register";
            });
            align1.className = "col-md-3 col-xs-3 col-sm-3";
            align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
            align2.appendChild(button);
            container.appendChild(align1);
            container.appendChild(align2);
        },
        checkIDAndPassword(){
            console.log("eee");
             //id, password check;
             const id = document.querySelector("input[name=loginid]");
             const password = document.querySelector("input[name=loginpassword]");
             console.log(users.id,id.value, users.password,password.value);
             if (users.id === id.value && users.password === password.value) {
                 console.log(users.id,id.value, users.password,password.value);
                 return true;
             } else {
                const printError = document.querySelector("#printError");
                printError.style.textAlign = "center";
                printError.innerHTML = "아이디와 비밀번호를 다시 확인해주세요";
                printError.style.color = "red";
                return false;
             }
        }
    }
    
    loginForm.init();
    const body = document.querySelector('#main');
    body.innerHTML = "";
    body.appendChild(loginForm.makeLoginPage());
    body.appendChild(footerForm.makeFooter());
   
}

