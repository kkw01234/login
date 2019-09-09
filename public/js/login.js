import {user} from "./utils.js"
import { hex_sha512 } from "./sha512.min.js";
import { router } from "./render.js";

export const login = {
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
        form.setAttribute("action", "./loginpage/login");
        form.setAttribute("method", "post");
        // form.setAttribute("name", "login");
        // form.setAttribute("onsubmit", "return login.checkIDAndPassword()");
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
        const submit = document.createElement("button");
        submit.setAttribute("type", "button");
        submit.className = "btn btn-success btn-lg";
        submit.id = `loginbutton`;
        submit.textContent = type;
        submit.style.width = "100%";
        submit.addEventListener('click', this.checkIDAndPassword);
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
            window.location.href = "/registerpage";
        });
        align1.className = "col-md-3 col-xs-3 col-sm-3";
        align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
        align2.appendChild(button);
        container.appendChild(align1);
        container.appendChild(align2);
    },
    checkIDAndPassword() {
        //console.log("eee");
        //id, password check;
        
        const id = document.querySelector("input[name=loginid]");
        const password = document.querySelector("input[name=loginpassword]");
        fetch('/loginpage/login',{
            method:`post`,
            body:JSON.stringify({
                loginid: id.value,
                loginpassword : hex_sha512(id.value+password.value)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response=>{
            response.json().then(res=>{
                console.log(res);
                if(res.result){
                    router("/");
                    history.pushState("",null,"/");
                    return;    
                }
                const printError = document.querySelector("#printError");
                printError.style.textAlign = "center";
                printError.innerHTML = "아이디와 비밀번호를 다시 확인해주세요";
                printError.style.color = "red";
            });
        });
    }
}






