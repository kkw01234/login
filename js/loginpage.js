const loginPage={
    init(){
        const main = document.querySelector("#register-container");
        main.style.display = "none";
        this.makeLoginPage();
    },
    makeLoginPage(){
        const login = document.createElement("div");
        const newContent = document.createTextNode("ghdksf");
        login.appendChild(newContent);
        document.body.insertAdjacentElement("afterend",login);
    }
}