const loginPage={
    init(){
        const main = document.querySelector("#register-container");
        main.style.display = "none";
        this.makeLoginPage();
    },
    makeLoginPage(){
        const login = document.createElement("div");
        
        login.appendChild(newContent);
        document.body.insertAdjacentElement("afterend",login);
    }
}

//loginPage.init();