// let page = "login";
const users = {
    id: "kkw01234",
    password: "aaaa"
};
function loginPage() {
   
    const loginForm = {
        init() {
    
        },
        makeLoginPage() {
            const loginContainer = document.createElement("div");
            const idContainer = document.createElement("div");
            const passwordContainer = document.createElement("div");
            const loginButtonContainer = document.createElement("div");
            const registerButtonContainer = document.createElement("div");
            loginContainer.className = "container";
            loginContainer.id = "login-container";
            this.getloginContainer = () => {
                return loginContainer;
            }
            // loginContainer.style.textAlign = "center";
            idContainer.className = "row";
            idContainer.style.marginTop = '10%';
            passwordContainer.className = "row";
            loginButtonContainer.className = "row";
            registerButtonContainer.className = "row";
            this.makeForm(idContainer, "id");
            this.makeForm(passwordContainer, "password");
            this.makeLoginButton(loginButtonContainer, "login");
            this.makeRegisterButton(registerButtonContainer, "회원가입");
            loginContainer.appendChild(idContainer);
            loginContainer.appendChild(passwordContainer);
            loginContainer.appendChild(loginButtonContainer);
            loginContainer.appendChild(registerButtonContainer);



            return loginContainer;

        },
        makeForm(container, type) {
            const align1 = document.createElement('div');
            const align2 = document.createElement('div');
            align1.className = "col-md-3 col-xs-3 col-sm-3";
            align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
            align2.innerHTML = `<input type='${type == "id" ? "text" : "password"}' class="form-control" name="${type}" placeholder="${type}">`;

            container.appendChild(align1);
            container.appendChild(align2);
        },
        makeLoginButton(container, type) {
            const align1 = document.createElement('div');
            const align2 = document.createElement('div');
            const button = document.createElement("button");
            button.className = "btn btn-success";
            button.id = `${type}button`;
            button.textContent = type;
            button.style.width = "100%";
            button.addEventListener("click", () => {
                //id, password check;
                const id = document.querySelector("input[name=id]");
                const password = document.querySelector("input[name=password]");
                if (users.id === id.value && users.password === password.value) {
                    window.location.href = "./main.html";
                } else {
                    console.log("error");
                }
            });
            align1.className = "col-md-3 col-xs-3 col-sm-3";
            align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
            align2.appendChild(button);
            container.appendChild(align1);
            container.appendChild(align2);
        },
        makeRegisterButton(container, type) {
            const align1 = document.createElement('div');
            const align2 = document.createElement('div');
            const button = document.createElement("button");
            button.className = "btn btn-success";
            button.id = `${type}button`;
            button.textContent = type;
            button.style.width = "100%";
            button.addEventListener("click", () => {
                    window.location.href = "./main.html#register"
            });
            align1.className = "col-md-3 col-xs-3 col-sm-3";
            align2.className = "col-md-7 col-xs-7 col-sm-7 loginform-container";
            align2.appendChild(button);
            container.appendChild(align1);
            container.appendChild(align2);
        }
    }
    loginForm.init();
    const body = document.querySelector('#main');
    body.innerHTML = "";
    body.appendChild(loginForm.makeLoginPage());
   
}

